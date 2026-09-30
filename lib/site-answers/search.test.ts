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
