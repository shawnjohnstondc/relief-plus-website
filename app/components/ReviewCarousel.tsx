"use client";

import {
  type FocusEvent,
  type KeyboardEvent,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

const reviews = [
  "I was always nervous about going to a chiropractor. When I went in for my first visit, Dr. Johnston and his staff made me feel welcomed! He treats you like a friend not just a patient. I would recommend him to anyone who asks for a superb doctor!",
  "Dr. Johnston has done great things to my back and neck in just one week! I feel so much better and have noticed a significant improvement in such a short amount of time. He made sure that I was doing the proper stretches and exercises to help me prevent this from happening again.",
  "Great staff. Dr. Johnston is very knowledgeable and experienced. Never thought a Chiropractor was capable of correcting my rotator cuff problem, BUT HE DID!! Couldn't lift or move my arm without pain. I was afraid surgery was the only answer. He used dry needles, heat, tens unit, and massage and now I have one more treatment and I'm done. I'm the #1 fan of the man from Tennessee.",
  "Before I began seeing Dr. Johnston at Relief Plus, I dealt with severe lower back pain for several years. I tried everything from physical therapy to epidural injections. Dr. Johnston is the first chiropractor who correctly identified the source of my pain and has kept me pain free for years! I highly recommend Relief Plus!",
  "This is the best place to receive chiropractic care. I always leave feeling better. Very personable and caring professionals. They take their time and come up with the best plan to get you feeling back to your normal self. Would recommend 100%!",
  "Dr. Johnston is such an amazing Chiropractor. He truly cares about his patients, and goes above and beyond to help you. Dr. Johnston has been one of the only drs not to give up on me. If your looking for a Chiropractor he's the one you need to see. You won't regret it. I highly recommend Dr. Johnston.",
  "I was hesitant of chiropractors but Dr. Johnston and his staff came highly recommended. After the 1st day I felt relief and continue to improve every week. Dr. Johnston and his staff are remarkable. He is a lifesaver literally!",
  "I suffer from back pain and also TMJ. Dr. Johnston has worked with me for over a year and the results have been amazing. My back requires monthly maintenance and my TMJ is getting under control. Dr. Johnston had no problem working with my dentist for my TMJ. He really listens to what your problem is and explains everything. There are no long waiting periods in the office so it's easy to schedule an appointment even during work hours. His staff are some of the best. Always friendly, courteous, very professional and willing to help in any way. I highly recommend Relief Plus to anyone who is suffering with pain issues.",
  "Dr. Shawn Johnston true to his profession and a Blessing to his patients. Dr. Johnston has helped me as a Chiropractor and with my need for Physical Therapy. He can do it all! He has this smile that says I can relieve your pain and he does. He is awesome and I rate him a strong 5!!!!!!! Thanks for everything.",
  "I cannot recommend Dr. Johnston enough. I have always had knots in my shoulders and neck and very recently struggled with tension headaches. After several months of refusing to go to a chiropractor, I finally did, with great results. He takes his time with his patients, is very professional, and is not satisfied until his patients are completely out of pain. For pain relief, this is definitely the place to go!",
  "Relief is the best chiropractic clinic I’ve gone to. I’ve suffered from back pain off and on for years. Dr. Johnston was extremely knowledgeable and explained exactly the source of my pain. I would recommend his clinic to anyone experiencing back pain issues.",
] as const;

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onStoreChange);

  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionPreference() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getServerReducedMotionPreference() {
  return false;
}

export default function ReviewCarousel() {
  const [currentReview, setCurrentReview] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [wasManuallyControlled, setWasManuallyControlled] = useState(false);
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );
  const isPaused =
    isHovered || hasFocus || wasManuallyControlled || prefersReducedMotion;

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentReview((review) => (review + 1) % reviews.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  function showReview(index: number) {
    setWasManuallyControlled(true);
    const nextReview = (index + reviews.length) % reviews.length;
    setExpandedReview(null);
    setCurrentReview(nextReview);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showReview(currentReview - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showReview(currentReview + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      showReview(0);
    } else if (event.key === "End") {
      event.preventDefault();
      showReview(reviews.length - 1);
    }
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    const nextTarget = event.relatedTarget;

    if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
      setHasFocus(false);
    }
  }

  return (
    <section className="bg-[#12233f] px-6 py-24 text-white lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d5b765]">
            Patient Experiences
          </p>
          <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">
            What our patients are saying.
          </h2>
        </div>

        <div
          className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04]"
          role="region"
          aria-label="Patient review carousel"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setHasFocus(true)}
          onBlurCapture={handleBlur}
        >
          <div
            className="grid px-7 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14"
            aria-live={isPaused ? "polite" : "off"}
          >
            {[reviews[currentReview]].map((review) => (
                <article
                  key={review}
                  className="flex flex-col"
                  aria-label={`Review ${currentReview + 1} of ${reviews.length}`}
                  aria-roledescription="slide"
                >
                  <div>
                    <div
                      className="font-serif text-6xl leading-none text-[#d5b765] sm:text-7xl"
                      aria-hidden="true"
                    >
                      “
                    </div>
                    <blockquote className={`mt-1 max-w-5xl font-serif text-xl leading-8 text-white/90 sm:text-2xl sm:leading-9 ${reviews[currentReview].length > 400 && expandedReview !== currentReview ? "line-clamp-6" : ""}`}>
                      {review}
                    </blockquote>
                    {review.length > 400 && (
                      <button
                        type="button"
                        className="mt-5 min-h-11 rounded-full border border-white/20 px-5 text-sm font-semibold text-white transition hover:border-[#d5b765] hover:text-[#d5b765] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b765]"
                        aria-expanded={expandedReview === currentReview}
                        onClick={() => setExpandedReview(expandedReview === currentReview ? null : currentReview)}
                      >
                        {expandedReview === currentReview ? "Show less" : "Read full review"}
                      </button>
                    )}
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="sr-only">5 out of 5 stars</span>
                    <span
                      className="text-base tracking-[0.18em] text-[#d5b765]"
                      aria-hidden="true"
                    >
                      ★★★★★
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/45">
                      Google Review
                    </span>
                  </div>
                </article>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 px-7 py-5 sm:px-10 lg:px-14">
            <p className="text-xs tabular-nums text-white/45" aria-hidden="true">
              {String(currentReview + 1).padStart(2, "0")} / {reviews.length}
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-lg transition hover:border-[#d5b765] hover:text-[#d5b765] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b765]"
                aria-label="Show previous review"
                onClick={() => showReview(currentReview - 1)}
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-lg transition hover:border-[#d5b765] hover:text-[#d5b765] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5b765]"
                aria-label="Show next review"
                onClick={() => showReview(currentReview + 1)}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
