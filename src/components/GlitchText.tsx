import { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  scrambleDuration?: number;
}

const GLITCH_CHARS = '!@#$%^&*?<>[]{}|/\\~`01';

function scramble(target: string, progress: number): string {
  const revealCount = Math.floor(target.length * progress);
  return target
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' ';
      if (i < revealCount) return char;
      return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
    })
    .join('');
}

export default function GlitchText({
  text,
  className = '',
  as: Tag = 'span',
  delay = 0,
  scrambleDuration = 800,
}: GlitchTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-50px' });
  const [displayed, setDisplayed] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    let startTime: number | null = null;
    let raf: number;
    let delayTimeout: ReturnType<typeof setTimeout>;

    delayTimeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / scrambleDuration, 1);

        setDisplayed(scramble(text, progress));

        if (progress < 1) {
          raf = requestAnimationFrame(animate);
        } else {
          setDisplayed(text);
          setHasAnimated(true);
        }
      };
      raf = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
      cancelAnimationFrame(raf);
    };
  }, [isInView, text, delay, scrambleDuration, hasAnimated]);

  return (
    // @ts-ignore
    <Tag ref={ref} className={`${className} font-mono`} aria-label={text}>
      {displayed}
    </Tag>
  );
}
