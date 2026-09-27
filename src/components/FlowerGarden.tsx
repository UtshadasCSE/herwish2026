import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ParticleField } from './PetalAnimation';

interface FlowerProps {
  x: number;
  delay: number;
  scale: number;
  color: string;
  progress: number; // 0-1
}

const Flower: React.FC<FlowerProps> = ({ x, delay, scale, color, progress }) => {
  const stemHeight = 80 * scale;
  const petalCount = 6;
  const petalProgress = Math.max(0, (progress - 0.3) / 0.7);
  const stemProgress = Math.min(1, progress / 0.4);

  return (
    <g transform={`translate(${x}, 0)`} style={{ transformOrigin: `${x}px 100%` }}>
      {/* Stem */}
      <motion.line
        x1="0" y1="0"
        x2="0" y2={-stemHeight}
        stroke="#4a6741"
        strokeWidth={1.5 * scale}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: stemProgress, opacity: stemProgress }}
        transition={{ delay, duration: 1.5, ease: 'easeOut' }}
      />

      {/* Left leaf */}
      {stemProgress > 0.4 && (
        <motion.ellipse
          cx={-10 * scale} cy={-stemHeight * 0.4}
          rx={10 * scale} ry={5 * scale}
          fill="#4a6741"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ delay: delay + 0.4, duration: 0.8 }}
          style={{ transformOrigin: `${x}px ${-stemHeight * 0.4}px` }}
        />
      )}

      {/* Right leaf */}
      {stemProgress > 0.6 && (
        <motion.ellipse
          cx={10 * scale} cy={-stemHeight * 0.6}
          rx={10 * scale} ry={5 * scale}
          fill="#5a7a4f"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ delay: delay + 0.6, duration: 0.8 }}
          style={{ transformOrigin: `${x}px ${-stemHeight * 0.6}px` }}
        />
      )}

      {/* Petals */}
      {Array.from({ length: petalCount }, (_, i) => {
        const angle = (i / petalCount) * 360;
        const petalLen = 14 * scale;
        const px = Math.cos((angle * Math.PI) / 180) * petalLen;
        const py = Math.sin((angle * Math.PI) / 180) * petalLen;
        return (
          <motion.ellipse
            key={i}
            cx={px}
            cy={-stemHeight + py}
            rx={7 * scale * petalProgress}
            ry={4 * scale * petalProgress}
            fill={color}
            opacity={petalProgress * 0.85}
            transform={`rotate(${angle}, 0, ${-stemHeight})`}
          />
        );
      })}

      {/* Center */}
      {petalProgress > 0.3 && (
        <motion.circle
          cx={0} cy={-stemHeight}
          r={5 * scale * petalProgress}
          fill="rgba(212,169,106,0.9)"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 1, duration: 0.6 }}
        />
      )}
    </g>
  );
};

const FLOWER_DATA = [
  { x: 60, scale: 1.2, color: '#f0a8b8', delay: 0 },
  { x: 160, scale: 0.9, color: '#d4687a', delay: 0.3 },
  { x: 260, scale: 1.4, color: '#c9b8d4', delay: 0.6 },
  { x: 360, scale: 1.0, color: '#f2b8c6', delay: 0.9 },
  { x: 460, scale: 1.3, color: '#e8a0b4', delay: 0.2 },
  { x: 550, scale: 0.85, color: '#d4a96a', delay: 0.7 },
  { x: 640, scale: 1.1, color: '#f0a8b8', delay: 0.4 },
  { x: 730, scale: 1.0, color: '#c9b8d4', delay: 1.0 },
];

const FlowerGarden: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const p = Math.max(0, Math.min(1, 1 - rect.top / viewH));
      setProgress(p);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section
      id="flowers"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0d0409 0%, #0f0b14 40%, #150820 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        overflow: 'hidden',
      }}
    >
      <ParticleField count={20} />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={progress > 0.1 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
        style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', zIndex: 1 }}
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 200,
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: 'rgba(212,169,106,0.5)',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          blooming for you
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(28px, 5vw, 52px)',
          color: 'var(--color-cream)',
          letterSpacing: '0.04em',
          margin: 0,
        }}>
          A Garden of Wishes
        </h2>
      </motion.div>

      {/* SVG Flower garden */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        position: 'relative',
        zIndex: 1,
        overflow: 'visible',
      }}>
        <svg
          viewBox="0 -120 800 150"
          style={{ width: '100%', overflow: 'visible' }}
          preserveAspectRatio="xMidYMax meet"
        >
          {/* Ground line */}
          <line
            x1="0" y1="0" x2="800" y2="0"
            stroke="rgba(212,169,106,0.15)"
            strokeWidth="1"
          />

          {FLOWER_DATA.map((f, i) => (
            <Flower
              key={i}
              x={f.x}
              delay={f.delay}
              scale={f.scale}
              color={f.color}
              progress={progress}
            />
          ))}
        </svg>
      </div>

      {/* Floating petal overlay */}
      {progress > 0.5 && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="petal"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-5px',
                width: 8,
                height: 7,
                background: ['#f0a8b8', '#d4687a', '#c9b8d4'][i % 3],
                opacity: 0.5,
                '--duration': `${6 + Math.random() * 4}s`,
                '--delay': `${Math.random() * 4}s`,
                '--drift': `${(Math.random() - 0.5) * 80}px`,
                '--spin': `${Math.random() * 540}deg`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Quote below flowers */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={progress > 0.7 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
        style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(16px, 3vw, 22px)',
          color: 'var(--color-blush)',
          textAlign: 'center',
          marginTop: '48px',
          opacity: 0.85,
          position: 'relative',
          zIndex: 1,
          maxWidth: '480px',
        }}
      >
        "Like flowers, may you always find your way toward the light."
      </motion.p>
    </section>
  );
};

export default FlowerGarden;
