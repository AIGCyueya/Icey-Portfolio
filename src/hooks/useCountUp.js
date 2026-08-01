import { useEffect, useState } from 'react';

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

/**
 * Animate a number from 0 to target when active becomes true.
 */
export default function useCountUp(target, active, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || target == null) {
      setValue(0);
      return undefined;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setValue(target);
      return undefined;
    }

    let start = null;
    let frameId;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setValue(target * easeOutCubic(progress));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [target, active, duration]);

  return value;
}
