import React, { useMemo } from 'react';

interface PetalAnimationProps {
  count?: number;
  colors?: string[];
}

/** Renders floating petals across the screen */
const PetalAnimation: React.FC<PetalAnimationProps> = ({
  count = 18,
  colors = ['#f0a8b8', '#e8b4c4', '#f2c4d0', '#d4687a', '#e8a0b4'],
}) => {
  const petals = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: colors[i % colors.length],
      size: 6 + Math.random() * 10,
      duration: `${7 + Math.random() * 8}s`,
      delay: `${Math.random() * 12}s`,
      drift: `${(Math.random() - 0.5) * 120}px`,
      spin: `${Math.random() * 720}deg`,
      opacity: 0.4 + Math.random() * 0.4,
    }))
  ), [count, colors]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {petals.map(p => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            top: '-10px',
            width: p.size,
            height: p.size * 0.85,
            background: p.color,
            opacity: p.opacity,
            '--duration': p.duration,
            '--delay': p.delay,
            '--drift': p.drift,
            '--spin': p.spin,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

/** Glowing particle field */
export const ParticleField: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const particles = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${20 + Math.random() * 70}%`,
      size: 1 + Math.random() * 3,
      dur: `${3 + Math.random() * 5}s`,
      del: `${Math.random() * 8}s`,
      op: 0.3 + Math.random() * 0.5,
      color: i % 3 === 0 ? '#d4a96a' : i % 3 === 1 ? '#f2b8c6' : '#c9b8d4',
    }))
  ), [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            '--dur': p.dur,
            '--del': p.del,
            '--op': p.op,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

/** Star field */
export const StarField: React.FC<{ count?: number }> = ({ count = 50 }) => {
  const stars = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      dur: `${2 + Math.random() * 4}s`,
      del: `${Math.random() * 6}s`,
    }))
  ), [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            '--dur': s.dur,
            '--del': s.del,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default PetalAnimation;
