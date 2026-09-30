"use client";

import { useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { searchSite, type AnswerIndex } from "@/lib/site-answers/search";

type ChatAnswer = { bullets: string[]; sources: { title: string; path: string }[] };
import "./site-answers.css";

type Turn = { question: string; answer?: ChatAnswer; error?: string };
function Arrow() {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

export default function SiteAnswers() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const inFlight = useRef(false);
  const index = useRef<AnswerIndex | null>(null);
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);

  if (pathname?.startsWith("/time-card")) return null;

  function scrollToLatest() {
    requestAnimationFrame(() => content.current?.lastElementChild?.scrollIntoView({ block: "start", behavior: "instant" }));
  }

  async function ask(value: string) {
    const trimmed = value.trim();
    if (!trimmed || inFlight.current) return;
    inFlight.current = true;
    dialog.current?.showModal();
    setQuestion("");
    setTurns(current => [...current.slice(-7), { question: trimmed }]);
    setBusy(true);
    scrollToLatest();
    try {
      if (!index.current) {
        const response = await fetch("/site-answers.json", { cache: "no-cache", signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw new Error("Unable to load website information. Please try again.");
        const data: AnswerIndex = await response.json();
        if (data.version !== 1 || !Array.isArray(data.chunks)) throw new Error("Unable to load website information.");
        index.current = data;
      }
      const matches = searchSite(index.current, trimmed).slice(0, 1);
      const data: ChatAnswer = {
        bullets: matches.length ? matches[0].text.split(/\n\n/).filter(Boolean) : ["I couldn’t find a clear match on our website. Try a specific topic, such as the treatment or condition name."],
        sources: matches.map(p => ({ title: p.title, path: p.path })),
      };
      setTurns(current => current.map((turn, i) => i === current.length - 1 ? { ...turn, answer: data } : turn));
    } catch (error) {
      const message = error instanceof Error && error.name === "TimeoutError" ? "That took too long. Please try again." : error instanceof Error ? error.message : "Website information is temporarily unavailable. Please try again.";
      setTurns(current => current.map((turn, i) => i === current.length - 1 ? { ...turn, error: message } : turn));
      setQuestion(trimmed);
    } finally {
      inFlight.current = false;
      setBusy(false);
      input.current?.focus({ preventScroll: true });
    }
  }

  function submit(event: FormEvent) { event.preventDefault(); void ask(question); }

  return <div className="site-answers">
    <div className="site-answers-space" aria-hidden="true" />
    <form className="site-answers-launcher site-answers-form" onSubmit={submit}>
      <label htmlFor="site-answers-dock" className="sr-only">Ask Relief Plus</label>
      <input id="site-answers-dock" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask anything…" maxLength={600} autoComplete="off" enterKeyHint="send" />
      <button type="submit" disabled={busy || !question.trim()} className="site-answers-send" aria-label="Send question"><Arrow /></button>
    </form>
    <dialog ref={dialog} id="site-answers-dialog" className="site-answers-dialog" aria-labelledby="site-answers-title" onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
      <div className="site-answers-panel">
        <header className="site-answers-header">
          <h2 id="site-answers-title">Relief <span>+</span></h2>
          <button className="site-answers-close" type="button" aria-label="Close chat" onClick={() => dialog.current?.close()}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg></button>
        </header>
        <div ref={content} className="site-answers-content" role="log" aria-live="polite" aria-busy={busy}>
          {turns.map((turn, i) => <article className="site-answers-turn" key={i}>
            <h3 className="site-answers-question">{turn.question}</h3>
            {turn.answer ? <>
              <ul className="site-answers-bullets">{turn.answer.bullets.map((bullet, j) => <li key={j}>{bullet}</li>)}</ul>
              {turn.answer.sources.length > 0 && <details className="site-answers-sources"><summary>Sources</summary><ul>{turn.answer.sources.map(source => <li key={source.path}><a href={source.path} onClick={() => dialog.current?.close()}>{source.title}</a></li>)}</ul></details>}
            </> : turn.error ? <p className="site-answers-error" role="alert">{turn.error}</p> : <p className="site-answers-loading">Reading our website…</p>}
          </article>)}
        </div>
        <footer className="site-answers-footer">
          <form onSubmit={submit} className="site-answers-form">
            <label htmlFor="site-answers-question" className="sr-only">Your question about Relief Plus</label>
            <input ref={input} id="site-answers-question" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask anything…" maxLength={600} autoComplete="off" enterKeyHint="send" />
            <button type="submit" disabled={busy || !question.trim()} className="site-answers-send" aria-label="Send question"><Arrow /></button>
          </form>
          <p>Information from our website. No personal medical details. <a href="/privacy-policy">Privacy</a></p>
        </footer>
      </div>
    </dialog>
  </div>;
}
