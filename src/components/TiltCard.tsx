import { useRef, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  intensity?: number;
  glare?: boolean;
}

export default function TiltCard({
  children,
  className = '',
  onClick,
  intensity = 10,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
    glareOpacity.set(0.08);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
      className={`relative ${className}`}
    >
      {children}

      {/* Glare overlay */}
      {glare && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
          style={{ opacity: glareOpacity }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(126,200,200,0.35) 0%, transparent 60%)`,
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
