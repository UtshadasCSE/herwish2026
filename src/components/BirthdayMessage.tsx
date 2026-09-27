import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import { OPENING_MESSAGE } from '../data';
import PetalAnimation from './PetalAnimation';

const BirthdayMessage: React.FC = () => {
  const { ref, inView } = useInView(0.2);

  return (
    <section
      id="message"
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px',
        background: 'linear-gradient(180deg, #0d0409 0%, #1a0a14 40%, #200c18 100%)',
        overflow: 'hidden',
      }}
    >
      <PetalAnimation count={10} />

      {/* Background glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 30% 60%, rgba(212,104,122,0.07) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', textAlign: 'center' }}>
        {/* Decorative ornament */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          style={{ marginBottom: '48px' }}
        >
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
            <line x1="0" y1="20" x2="44" y2="20" stroke="rgba(212,169,106,0.3)" strokeWidth="0.5" />
            <circle cx="60" cy="20" r="4" fill="none" stroke="rgba(212,169,106,0.5)" strokeWidth="0.5" />
            <circle cx="60" cy="20" r="2" fill="rgba(212,169,106,0.6)" />
            <line x1="76" y1="20" x2="120" y2="20" stroke="rgba(212,169,106,0.3)" strokeWidth="0.5" />
            <circle cx="44" cy="20" r="2" fill="none" stroke="rgba(212,169,106,0.3)" strokeWidth="0.5" />
            <circle cx="76" cy="20" r="2" fill="none" stroke="rgba(212,169,106,0.3)" strokeWidth="0.5" />
          </svg>
        </motion.div>

        {OPENING_MESSAGE.map((paragraph, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ delay: 0.2 + i * 0.4, duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
            style={{
              fontFamily: i === 0 ? 'var(--font-display)' : 'var(--font-body)',
              fontStyle: i === 0 ? 'italic' : 'normal',
              fontWeight: i === 0 ? 300 : 200,
              fontSize: i === 0
                ? 'clamp(20px, 4vw, 32px)'
                : 'clamp(15px, 2.5vw, 19px)',
              color: i === 0 ? 'var(--color-cream)' : 'rgba(253,245,238,0.72)',
              lineHeight: i === 0 ? 1.4 : 1.85,
              marginBottom: '28px',
              letterSpacing: i === 0 ? '0.02em' : '0.04em',
            }}
          >
            {paragraph}
          </motion.p>
        ))}

        {/* Gold accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: 1.4, duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
            margin: '40px auto 0',
          }}
        />
      </div>
    </section>
  );
};

export default BirthdayMessage;
