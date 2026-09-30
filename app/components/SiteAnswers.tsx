"use client";

import { useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { searchSite, type AnswerIndex, type Passage } from "@/lib/site-answers/search";
import "./site-answers.css";

const suggestions = ["What are your hours?", "Do you accept Medicare?", "What is dry needling?"];

export default function SiteAnswers() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const index = useRef<AnswerIndex | null>(null);
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");
  const [passages, setPassages] = useState<Passage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  if (pathname?.startsWith("/time-card")) return null;

  async function ask(value: string) {
    const trimmed = value.trim().slice(0, 300);
    if (!trimmed || busy) return;
    setQuestion(trimmed);
    setAsked(trimmed);
    setBusy(true);
    setError(false);
    setPassages([]);
    try {
      if (!index.current) {
        const response = await fetch("/site-answers.json", { cache: "no-cache" });
        if (!response.ok) throw new Error("Unable to load site information");
        const data: AnswerIndex = await response.json();
        if (data.version !== 1 || !Array.isArray(data.chunks)) throw new Error("Invalid index");
        index.current = data;
      }
      setPassages(searchSite(index.current, trimmed));
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void ask(question);
  }

  return (
    <div className="site-answers">
      <div className="site-answers-space" aria-hidden="true" />
      <button className="site-answers-launcher" onClick={() => { dialog.current?.showModal(); input.current?.focus(); }} aria-haspopup="dialog" aria-controls="site-answers-dialog">
        <span>Ask anything…</span>
        <span className="site-answers-send" aria-hidden="true">↗</span>
      </button>
      <dialog ref={dialog} id="site-answers-dialog" className="site-answers-dialog" aria-labelledby="site-answers-title" onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
        <div className="site-answers-panel">
          <header className="site-answers-header">
            <div><span className="site-answers-brand">RELIEF <b>+</b></span><h2 id="site-answers-title">Ask about Relief Plus</h2></div>
            <button className="site-answers-close" type="button" aria-label="Close answers" onClick={() => dialog.current?.close()}>×</button>
          </header>
          <div className="site-answers-content">
            <p className="site-answers-intro">Find information from our website, with links to the original pages.</p>
            <div className="site-answers-suggestions" aria-label="Suggested questions">{suggestions.map(suggestion => <button key={suggestion} disabled={busy} onClick={() => void ask(suggestion)}>{suggestion}</button>)}</div>
            <div role="status" aria-live="polite" aria-busy={busy}>
              {asked && <p className="site-answers-question">{asked}</p>}
              {busy ? <p>Finding information on our site…</p> : error ? <p>We couldn’t load the website information. Please try again or <a href="tel:+13375654200">call 337-565-4200</a>.</p> : asked && passages.length === 0 ? <p>I couldn’t find a clear match on our website. Please <a href="tel:+13375654200">call 337-565-4200</a> so our team can help.</p> : passages.length > 0 ? <>
                <p className="site-answers-caption">Related passages from our website</p>
                {passages.map((passage, i) => <article className="site-answers-result" key={`${passage.path}-${i}`}>
                  <h3>{passage.heading}</h3>
                  <p>{passage.text}</p>
                  <a href={passage.path} onClick={() => dialog.current?.close()}>Source: {passage.title}</a>
                </article>)}
              </> : null}
            </div>
          </div>
          <footer className="site-answers-footer">
            <form onSubmit={submit} className="site-answers-form">
              <label htmlFor="site-answers-question" className="sr-only">Your question about Relief Plus</label>
              <input ref={input} id="site-answers-question" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask anything…" maxLength={300} autoComplete="off" enterKeyHint="search" />
              <button type="submit" disabled={busy || !question.trim()} className="site-answers-send" aria-label="Find answers">↗</button>
            </form>
            <p>Website information only. Not a diagnosis. Please don’t enter personal medical details.</p>
          </footer>
        </div>
      </dialog>
    </div>
  );
}
