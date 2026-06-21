import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

/**
 * Zero-React-state cursor — all dynamics driven by MotionValues.
 * This eliminates re-renders on every mousemove, making it buttery smooth.
 */
export default function CyberCursor() {
  // --- Position ---
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Dot: instant
  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 80, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 80, mass: 0.1 });

  // Ring: lagged
  const ringX = useSpring(mouseX, { stiffness: 180, damping: 22, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 22, mass: 0.5 });

  // --- State as MotionValues (no re-renders!) ---
  const isHovering = useMotionValue(0);
  const isClicking = useMotionValue(0);
  const isVisible  = useMotionValue(0);

  // Derived: ring scale
  const ringScale = useTransform(
    [isHovering, isClicking] as any,
    ([h, c]: number[]) => c ? 0.7 : h ? 1.7 : 1
  );
  // Derived: dot scale
  const dotScale = useTransform(
    [isHovering, isClicking] as any,
    ([h, c]: number[]) => c ? 2.2 : h ? 0 : 1
  );
  // Derived: ring border color
  const ringBorderColor = useTransform(
    isHovering,
    [0, 1],
    ['rgba(126,200,200,0.28)', 'rgba(126,200,200,0.75)']
  );

  useEffect(() => {
    // Only show custom cursor on devices with a precise pointer (mouse)
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      isVisible.set(1);

      const target = e.target as HTMLElement;
      const interactive =
        target.matches('button, a, input, textarea, select, label, [role="button"]') ||
        !!target.closest('button, a, [role="button"]');
      isHovering.set(interactive ? 1 : 0);
    };

    const onDown = () => isClicking.set(1);
    const onUp   = () => isClicking.set(0);
    const onLeave = () => isVisible.set(0);
    const onEnter = () => isVisible.set(1);

    // passive: true → no janky scroll blocking
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown, { passive: true });
    document.addEventListener('mouseup',   onUp,   { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup',   onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []); // stable — MotionValues are refs, no deps needed

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Outer lagged ring */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: ringX, y: ringY,
          translateX: '-50%', translateY: '-50%',
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1px solid',
          borderColor: ringBorderColor,
          scale: ringScale,
          opacity: isVisible,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* Inner instant dot */}
      <motion.div
        style={{
          position: 'fixed', top: 0, left: 0,
          x: dotX, y: dotY,
          translateX: '-50%', translateY: '-50%',
          width: 5, height: 5,
          borderRadius: '50%',
          backgroundColor: '#7ec8c8',
          boxShadow: '0 0 8px rgba(126,200,200,0.9)',
          scale: dotScale,
          opacity: isVisible,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
