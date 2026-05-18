'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Ambient 3D particle butterfly. Thousands of points sampled from the
 * classic butterfly curve form two wings that gently flap, drift, and
 * parallax to the pointer while scroll glides the whole swarm.
 *
 * Deliberately subtle: charcoal points at low opacity on the cream
 * background — reads as ink-dust depth behind the content, never
 * competing with the cards. pointer-events: none, fixed, low z.
 */

const COUNT = 2600;

// Deterministic pseudo-random — pure given the same seed, so it's safe
// to call during render (React 19 purity rule forbids Math.random there).
function rand(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function ButterflySwarm() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  // Sample the butterfly curve (Temple H. Fay, 1989) into a point cloud.
  const { positions, basePositions } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const t = (i / COUNT) * Math.PI * 24;
      const r =
        Math.exp(Math.sin(t)) -
        2 * Math.cos(4 * t) +
        Math.pow(Math.sin((2 * t - Math.PI) / 24), 5);
      // fill the wing area, not just the outline
      const fill = 0.35 + rand(i + 1) * 0.65;
      const x = Math.sin(t) * r * fill;
      const y = Math.cos(t) * r * fill;
      const z = (rand(i + 7.13) - 0.5) * 0.6;
      pos[i * 3] = x * 1.05;
      pos[i * 3 + 1] = y * 1.05 + 0.4;
      pos[i * 3 + 2] = z;
    }
    return { positions: pos, basePositions: pos.slice() };
  }, []);

  useFrame((state) => {
    const g = groupRef.current;
    const pts = pointsRef.current;
    if (!g || !pts) return;
    const time = state.clock.elapsedTime;

    // Wing flap — push points away from the vertical body axis on a sine.
    const flap = Math.sin(time * 2.2);
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      const bx = basePositions[ix];
      arr[ix] = bx + bx * flap * 0.12;
      arr[ix + 1] =
        basePositions[ix + 1] + Math.sin(time * 1.5 + bx) * 0.04;
    }
    attr.needsUpdate = true;

    // Gentle idle drift + pointer parallax.
    g.rotation.y = Math.sin(time * 0.25) * 0.25 + mouse.current.x * 0.35;
    g.rotation.x = Math.cos(time * 0.2) * 0.1 - mouse.current.y * 0.2;
    g.position.y = 0.3 + Math.sin(time * 0.5) * 0.15 - scroll.current * 2.4;
    g.position.x = Math.sin(time * 0.18) * 0.2 + mouse.current.x * 0.4;
  });

  useFrame(({ pointer }) => {
    mouse.current.x += (pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (pointer.y - mouse.current.y) * 0.05;
    if (typeof window !== 'undefined') {
      const max = document.body.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    }
  });

  return (
    <group ref={groupRef} scale={0.62}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.016}
          color="#1a1a1a"
          transparent
          opacity={0.22}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function ButterflyScene() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Particles must only appear OUTSIDE the cards section (the cards have
  // their own full-bleed colour and must stay clean). Fade the whole
  // canvas in once scroll passes the bottom of the cards container.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const cardsEl =
      document.querySelector<HTMLElement>('[data-section="cards"]');

    const update = () => {
      if (!cardsEl) {
        wrap.style.opacity = '1';
        return;
      }
      const cardsBottom = cardsEl.offsetTop + cardsEl.offsetHeight;
      const viewBottom = window.scrollY + window.innerHeight;
      // 0 while over the cards, easing to 1 as we enter the area below.
      const band = window.innerHeight * 0.6;
      const t = (viewBottom - cardsBottom) / band;
      wrap.style.opacity = String(Math.min(1, Math.max(0, t)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return null;

  return (
    <div
      ref={wrapRef}
      className="pointer-events-none fixed inset-0 z-80"
      style={{ opacity: 0, transition: 'opacity 0.4s ease-out' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <ButterflySwarm />
      </Canvas>
    </div>
  );
}
