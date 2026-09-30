export type Passage = { path: string; title: string; heading: string; section: string; text: string; questions?: string[] };
export type AnswerIndex = { version: number; pageCount: number; chunks: Passage[] };

const stop = new Set('a an the is are was were be been being do does did can could would should will shall i me my we our you your it its this that these those what which who how why when where of for from to in on at by with about and or if as have has had please tell more know want need relief plus clinic office really actually hey hi hello ya offer offers help get much any anything available'.split(' '));
const aliases: Record<string, string> = {
  nerves: 'nerve', discs: 'disc', headaches: 'headache', injuries: 'injury', fridays: 'friday', saturdays: 'saturday', sundays: 'sunday',
  adjust: 'chiropractic', adjusted: 'chiropractic', adust: 'chiropractic', adjusting: 'chiropractic',
  walkins: 'walkin', walkin: 'walkin',
  costs: 'cost', price: 'cost', prices: 'cost', pricing: 'cost', fees: 'cost', fee: 'cost',
  insurance: 'insurance', insurances: 'insurance', coverage: 'insurance', plans: 'insurance',
  location: 'address', located: 'address', directions: 'address', appointments: 'appointment', schedule: 'appointment', scheduling: 'appointment', book: 'appointment', booking: 'appointment',
  treat: 'treatment', treating: 'treatment', treated: 'treatment', treatments: 'treatment', services: 'treatment', service: 'treatment',
  adjustment: 'chiropractic', adjustments: 'chiropractic', chiropractor: 'chiropractic',
  accepts: 'accept', accepted: 'accept', taking: 'accept', take: 'accept',
};
export function tokens(text: string): string[] {
  return [...new Set((text.toLowerCase().replace(/\b(?:y[’']?all|ya[’']?ll)\b/g, 'you').replace(/\bwalk[ -]?ins?\b/g, 'walkin').replace(/\b(open|opening|closed|closing)\b/g, 'hours').replace(/\bphysical therapy|\bpt\b/g, 'physiotherapy').replace(/\bteat\b/g, 'treat').match(/[a-z0-9]+/g) ?? []).filter(t => !stop.has(t)).map(t => aliases[t] ?? t))];
}

const libraryPath = '/faq-lafayette/patient-questions';

function intent(question: string) {
  const text = question.toLowerCase();
  if (/^who\b/.test(text)) return 'provider';
  if (/how much|\bcost|\bpric|\bfees?\b/.test(text)) return 'cost';
  if (/^how (do|would|can) (you|y'all|y’all)|what (treatments|can you do)/.test(text)) return 'treatment';
  if (/^what (is|are) |^explain |^how does /.test(text)) return 'definition';
  if (/^(do|can|does|will|are|is) /.test(text)) return 'availability';
  return 'other';
}

// A priority answer must match the whole question, not merely mention a topic.
// Compare individual question variants; never pool aliases across different FAQs.
function preferredAnswer(index: AnswerIndex, question: string, query: string[]): Passage | undefined {
  const normalizeQuestion = (value: string) => value.toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
  const exact = index.chunks.find(p => p.path === libraryPath && p.questions?.some(q => normalizeQuestion(q) === normalizeQuestion(question)));
  if (exact) return exact;
  if (!query.length) return undefined;
  const ranked = index.chunks.filter(p => p.path === libraryPath && p.questions?.length).flatMap(p => {
    const scores = p.questions!.map(variant => {
      const terms = tokens(variant);
      const matched = query.filter(t => terms.includes(t)).length;
      if (!terms.length || matched / query.length < 0.9) return 0;
      const overlap = 2 * matched / (query.length + terms.length);
      if (overlap < 0.72) return 0;
      return overlap + (intent(question) === intent(variant) ? 0.3 : 0);
    });
    return [{ p, score: Math.max(...scores) }];
  }).filter(d => d.score > 0).sort((a, b) => b.score - a.score);
  return ranked[0]?.p;
}

// Extractive search: output remains verbatim website copy. No model, outside
// knowledge, user-supplied URLs, query logging, or third-party requests.
export function searchSite(index: AnswerIndex, question: string): Passage[] {
  const query = tokens(question.slice(0, 300).replace(/\b(open|opening|closed|closing)\b/gi, 'hours'));
  const preferred = preferredAnswer(index, question, query);
  if (preferred) return [preferred];
  if (!query.length) return [];
  const documents = index.chunks.map(p => ({ p, body: tokens(`${p.heading} ${p.section} ${p.text}`), title: tokens(p.title) }));
  const weights = new Map(query.map(t => [t, Math.log(1 + documents.length / (1 + documents.filter(d => d.body.includes(t)).length))]));
  // Unknown terms must not be silently dropped (e.g. an unlisted insurer).
  if (query.some(t => !documents.some(d => d.body.includes(t) || d.title.includes(t)))) return [];
  // Operational questions are answered from the clinic's contact page, avoiding
  // clinical uses of words such as "address" or "hours" in unrelated articles.
  const contactOnly = query.some(t => ['hours', 'address', 'appointment', 'phone', 'email', 'fax'].includes(t)) && query.length <= 3;
  const ranked = documents.flatMap(({ p, body, title }) => {
    if (contactOnly && p.path !== '/contact') return [];
    const matched = query.filter(t => body.includes(t));
    if (matched.length / query.length < 0.75) return [];
    const weight = matched.reduce((sum, t) => sum + (weights.get(t) ?? 0), 0);
    const score = weight + query.filter(t => tokens(`${p.heading} ${p.section}`).includes(t)).length * 1.5 + query.filter(t => title.includes(t)).length * 0.3 + (p.path === '/contact' ? 0.8 : 0) + (p.heading.toLowerCase().startsWith('what is') ? 0.5 : 0);
    return [{ p, score }];
  }).sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  return ranked.filter(({ p, score }) => {
    if (score < (ranked[0]?.score ?? 0) * 0.75) return false;
    if (seen.has(p.text)) return false;
    seen.add(p.text);
    return true;
  }).slice(0, contactOnly ? 1 : 2).map(({ p }) => p);
}
