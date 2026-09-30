// Index only public, sitemap-listed HTML from this build. Never crawl external
// links or index staff routes, source files, scripts, or structured data.
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('.next/server/app');
const sitemap = await readFile(path.join(root, 'sitemap.xml.body'), 'utf8');
const decode = (text) => text.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (_, value) => {
  if (value.startsWith('#')) return String.fromCodePoint(value[1].toLowerCase() === 'x' ? parseInt(value.slice(2), 16) : parseInt(value.slice(1), 10));
  return ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' })[value.toLowerCase()];
});
const plain = (html) => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const chunks = [];
let pageCount = 0;
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(decode(match[1]));
  if (url.origin !== 'https://www.myreliefplus.com' || url.pathname.startsWith('/time-card')) throw new Error('Non-public sitemap entry');
  const file = path.join(root, url.pathname === '/' ? 'index.html' : `${url.pathname.slice(1)}.html`);
  const html = await readFile(file, 'utf8');
  const title = plain(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? 'Relief Plus').replace(/\s*\| Relief Plus$/, '');
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  if (!main) throw new Error(`Missing main content: ${url.pathname}`);
  const content = main.replace(/<(script|style|header|nav|footer)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  let section = title;
  let heading = title;
  let paragraphs = [];
  let questions;
  function flush() {
    const text = [...new Set(paragraphs)].join('\n\n');
    if (text.length >= (questions ? 1 : 70)) chunks.push({ path: url.pathname, title, heading, section, text, ...(questions ? { questions: [heading, ...questions] } : {}) });
    paragraphs = [];
  }
  for (const block of content.matchAll(/<(h[1-6]|p|li)\b([^>]*)>([\s\S]*?)<\/\1>/gi)) {
    const text = plain(block[3]);
    if (!text) continue;
    if (block[1] === 'p' && (/uppercase/.test(block[2]) || /^[\d\s]+$/.test(text))) continue;
    if (block[1] === 'h1' || block[1] === 'h2' || (url.pathname.startsWith('/faq-lafayette') && block[1] === 'h3')) {
      flush();
      heading = text;
      const aliases = block[2].match(/data-answer-questions="([^"]*)"/);
      questions = aliases ? JSON.parse(decode(aliases[1])) : undefined;
      if (block[1] === 'h1' || block[1] === 'h2') section = text;
    } else {
      if (paragraphs.join(' ').length > 1000) flush();
      paragraphs.push(text);
    }
  }
  flush();
  pageCount++;
}
if (pageCount < 10 || chunks.length < 50) throw new Error('Public answer index unexpectedly incomplete');
await writeFile('public/site-answers.json', JSON.stringify({ version: 1, pageCount, chunks }));
console.log(`Site answers: ${chunks.length} passages from ${pageCount} public pages.`);
