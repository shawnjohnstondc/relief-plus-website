import { describe, expect, it } from 'vitest';
import { blogPosts } from './blog-posts';
import { physicalTherapyPage } from './pillar-pages';
import { dryNeedlingPage } from './treatment-pages';
import { backPainPage } from './condition-pages';
import { answerGroups, libraryPath } from './site-answers/library';
import { searchSite, type AnswerIndex } from './site-answers/search';
import { imagingAnswer, exerciseResponseAnswer, dryNeedlingAftercareAnswer } from './patient-care-answers';
const index: AnswerIndex = { version: 1, pageCount: 1, chunks: answerGroups.flatMap(g => g.items.map((i,n) => ({path: `${libraryPath}#${g.id}-${n+1}`, title: 'Patient Questions', heading:i.question, section:g.title,text:i.answer,questions:[i.question,...i.aliases]}))) };
describe('approved November 16 content', () => {
 it('registers a sourced MRI article and incoming link', () => {
  const posts = blogPosts.filter(p => p.slug === 'when-back-pain-needs-mri');
  expect(posts).toHaveLength(1); expect(posts[0].sources).toHaveLength(4);
  expect(posts[0].reviewedBy).toBeUndefined();
  expect(JSON.stringify(backPainPage)).toContain(posts[0].path);
 });
 it('shares approved answers across pages and Ask Anything', () => {
  expect(physicalTherapyPage.faqs.some(f=>f.answer===exerciseResponseAnswer)).toBe(true);
  expect(dryNeedlingPage.faqs.some(f=>f.answer===dryNeedlingAftercareAnswer)).toBe(true);
  expect(searchSite(index,'Do I need an MRI before starting care for back pain?')[0]?.text).toBe(imagingAnswer);
  expect(searchSite(index,'What is normal after dry needling?')[0]?.text).toBe(dryNeedlingAftercareAnswer);
  expect(searchSite(index,'What if my home exercises make pain worse?')[0]?.text).toBe(exerciseResponseAnswer);
 });
 it('answers clinic-specific questions without pretending to access records or schedule', () => {
  expect(searchSite(index,'Can this chat book me?')[0]?.text).toContain('does not access the office schedule');
  expect(searchSite(index,'Can you access my medical records?')[0]?.text).toContain('not a personal diagnosis');
  expect(searchSite(index,'How do I know PT is helping?')[0]?.text).toContain('At Relief Plus');
  expect(searchSite(index,'Are you open Friday?')[0]?.text).toContain('closed on Friday');
 });
});
