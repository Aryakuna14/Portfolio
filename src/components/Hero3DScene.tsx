import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField({ active }: { active: boolean }) {
  const ref = useRef<THREE.Points>(null!);

  // 400 particles — lightweight but visually rich
  const positions = useMemo(() => {
    const arr = new Float32Array(400 * 3);
    for (let i = 0; i < 400; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current || !active) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.018;
    ref.current.rotation.x = Math.sin(t * 0.12) * 0.06;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#7ec8c8"
        size={0.035}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        dpr={1}
        style={{ background: 'transparent' }}
        frameloop={active ? 'always' : 'demand'}
      >
        <ParticleField active={active} />
      </Canvas>
    </div>
  );
}
