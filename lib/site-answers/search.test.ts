import { describe, expect, it } from 'vitest';
import { answerGroups, libraryPath } from './library';
import { searchSite, type AnswerIndex } from './search';

const entries = answerGroups.flatMap(g => g.items);
const index: AnswerIndex = { version: 1, pageCount: 3, chunks: [
  { path: '/contact', title: 'Contact', heading: 'Hours', section: 'Hours', text: 'Monday and Wednesday 7 AM–4 PM. Tuesday and Thursday 8:30 AM–4 PM. Friday–Sunday closed.' },
  { path: '/blog/test', title: 'Desk breaks', heading: 'How do desk breaks help?', section: 'Desk breaks', text: 'Vary sustained desk tasks and take movement breaks to build tolerance.' },
  ...entries.map(e => ({ path: libraryPath, title: 'Patient Questions & Answers', heading: e.question, section: 'Questions', text: e.answer, questions: [e.question, ...e.aliases] })),
] };

describe('preferred patient answers', () => {
  for (const entry of entries) {
    for (const question of [entry.question, ...entry.aliases]) {
      it(`answers: ${question}`, () => {
        expect(searchSite(index, question)[0]?.text).toBe(entry.answer);
      });
    }
  }
  it.each([
    ['Are you open on Friday?', 'No. Relief Plus is closed on Friday.'],
    ["Where are ya'll located?", 'Relief Plus is at 112 Arabian Dr., Lafayette, LA 70507.'],
    ['Do you adust on the first visit?', 'Yes. If the examination finds no contraindications'],
    ['Do you do laser therapy?', 'Yes. Relief Plus offers laser therapy.'],
    ['What is laser therapy?', 'Class IV laser therapy uses specific'],
    ['Do you treat sciatica?', 'Yes. Relief Plus evaluates and treats sciatica'],
    ['How do you treat sciatica?', 'We first check the cause'],
    ['Do you take walkins?', 'Call 337-565-4200'],
  ])('matches everyday phrasing: %s', (question, expected) => {
    const match = searchSite(index, question)[0];
    expect(match?.path).toBe(libraryPath);
    expect(match?.text).toContain(expected);
  });
  it('keeps blog-only topics available', () => {
    expect(searchSite(index, 'How do desk breaks help?')[0]?.path).toBe('/blog/test');
  });
  it('does not infer acceptance of an unlisted insurer', () => {
    expect(searchSite(index, 'Do you take Aetna insurance?')).toEqual([]);
  });
  it('does not replace a specific unknown laser question with a generic answer', () => {
    expect(searchSite(index, 'Does laser cure glaucoma?')).toEqual([]);
  });
});

// Condition explanations remain retrievable when Sources links include anchors.
describe('condition-library answers', () => {
  const conditionIndex: AnswerIndex = { ...index, chunks: [...index.chunks,
    { path: '/faq-lafayette/condition-library#carpal-tunnel-syndrome-symptoms', title: 'Condition Library', heading: 'What are the symptoms of carpal tunnel syndrome?', section: 'Carpal tunnel syndrome', text: 'Tingling or numbness can affect the thumb, index and middle fingers.', questions: ['What are the symptoms of carpal tunnel?', 'Carpal tunnel symptoms'] },
    { path: '/faq-lafayette/condition-library#carpal-tunnel-syndrome-definition', title: 'Condition Library', heading: 'What is carpal tunnel syndrome?', section: 'Carpal tunnel syndrome', text: 'Compression of the median nerve at the wrist.', questions: ['What is carpal tunnel?', 'Explain carpal tunnel'] },
  ] };
  it('returns symptoms rather than a definition for a symptom question', () => {
    expect(searchSite(conditionIndex, 'What are the symptoms of carpal tunnel?')[0]?.path).toBe('/faq-lafayette/condition-library#carpal-tunnel-syndrome-symptoms');
  });
  it('preserves existing clinic-specific answers', () => {
    expect(searchSite(conditionIndex, 'Do you treat sciatica?')[0]?.text).toContain('Yes. Relief Plus evaluates');
  });
  it('does not turn an unknown treatment claim into a general condition answer', () => {
    expect(searchSite(conditionIndex, 'Does carpal tunnel treatment cure glaucoma?')).toEqual([]);
  });
});
