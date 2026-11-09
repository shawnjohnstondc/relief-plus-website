import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { blogPosts } from './blog-posts';
import { chiropracticPage, physicalTherapyPage } from './pillar-pages';
import { backPainPage } from './condition-pages';
import { answerGroups } from './site-answers/library';
import { chiropracticReferralGuidance, physicalTherapyReferralGuidance } from './referral-guidance';

describe('approved November 9 article and booking guidance', () => {
  it('registers one complete sourced article with the approved warning signs', () => {
    const posts = blogPosts.filter(p => p.slug === 'leg-pain-walking-spinal-stenosis');
    expect(posts).toHaveLength(1);
    const post = posts[0];
    expect(post.sections).toHaveLength(7);
    expect(post.sources).toHaveLength(6);
    expect(post.reviewedBy).toBeUndefined();
    const text = JSON.stringify(post.sections);
    for (const phrase of ['inability to empty your bladder', 'New loss of bladder or bowel control', 'circulation problems', 'acute loss of blood flow', 'not a promise to reverse spinal narrowing']) expect(text).toContain(phrase);
    expect(post.description).toBe('Leg pain when walking can have several causes. Learn how spinal stenosis may feel, warning signs to watch for, and when to seek an evaluation.');
  });
  it('links from relevant PT and back pain pages', () => {
    const href = '/blog/leg-pain-walking-spinal-stenosis';
    expect(physicalTherapyPage.relatedServices.some(l => l.href === href)).toBe(true);
    expect(JSON.stringify(backPainPage)).toContain(href);
  });
  it('keeps service, FAQ, contact and answer-library guidance aligned', () => {
    expect(chiropracticPage.bookingGuidance).toBe(chiropracticReferralGuidance);
    expect(physicalTherapyPage.bookingGuidance).toBe(physicalTherapyReferralGuidance);
    expect(chiropracticPage.faqs.some(f => f.answer === chiropracticReferralGuidance)).toBe(true);
    expect(physicalTherapyPage.faqs.some(f => f.answer === physicalTherapyReferralGuidance)).toBe(true);
    const answers = answerGroups.flatMap(g => g.items);
    expect(answers.some(a => a.answer === chiropracticReferralGuidance)).toBe(true);
    expect(answers.some(a => a.answer === physicalTherapyReferralGuidance)).toBe(true);
    for (const file of ['app/contact/page.tsx', 'app/faq-lafayette/page.tsx']) {
      const source = readFileSync(file, 'utf8');
      expect(source).toContain('chiropracticReferralGuidance');
      expect(source).toContain('physicalTherapyReferralGuidance');
      expect(source).not.toContain('No referral is needed to see Dr. Johnston or Dr. Reed');
    }
  });
});
