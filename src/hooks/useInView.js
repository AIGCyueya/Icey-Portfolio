import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight Intersection Observer hook for scroll-triggered animations.
 * Respects prefers-reduced-motion by marking visible immediately.
 */
export default function useInView(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -8% 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setInView(true);
      return undefined;
    }

    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.unobserve(node);
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, inView];
}
