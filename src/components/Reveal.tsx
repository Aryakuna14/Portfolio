/**
 * Reveal.tsx — Suspenseful scroll-triggered reveal system
 *
 * Usage:
 *   <Reveal>single item with blur+slide</Reveal>
 *   <Reveal delay={0.2}>delayed item</Reveal>
 *
 *   <RevealGroup stagger={0.12}>
 *     <RevealChild>first</RevealChild>
 *     <RevealChild>second</RevealChild>
 *   </RevealGroup>
 */
import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'motion/react';

// ─── Individual Reveal ───────────────────────────────────────────────────────

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.4,
  y = 36,
  blur = true,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: '50px 0px 50px 0px',
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y }
      }
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}

// ─── Staggered Group ─────────────────────────────────────────────────────────

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}

const groupVariants = (stagger: number, delay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const childVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut' as const,
    },
  },
};

export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  once = true,
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: '50px 0px 50px 0px',
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={groupVariants(stagger, delay)}
    >
      {children}
    </motion.div>
  );
}

// ─── Child item (must be inside RevealGroup) ──────────────────────────────────

interface RevealChildProps {
  children: ReactNode;
  className?: string;
}

export function RevealChild({ children, className }: RevealChildProps) {
  return (
    <motion.div className={className} variants={childVariants}>
      {children}
    </motion.div>
  );
}

// ─── Reveal for non-div elements (e.g. section headings) ─────────────────────

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  delay?: number;
  once?: boolean;
}

export function RevealText({
  children,
  className,
  as: Tag = 'div',
  delay = 0,
  once = true,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once,
    margin: '50px 0px 50px 0px',
  });

  const MotionTag = motion[Tag] as typeof motion.div;

  return (
    <MotionTag
      ref={ref as any}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </MotionTag>
  );
}
