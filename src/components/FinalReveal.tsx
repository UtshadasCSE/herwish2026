import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks';
import { FINAL_MESSAGE } from '../data';
import PetalAnimation, { ParticleField, StarField } from './PetalAnimation';

/** Hidden easter egg — click the small star 5 times */
const EasterEgg: React.FC = () => {
  const [clicks, setClicks] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) setRevealed(true);
  };

  return (
    <>
      <button
        id="easter-egg-star"
        onClick={handleClick}
        title="✦"
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '60px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          color: 'rgba(212,169,106,0.2)',
          padding: '8px',
          transition: 'color 0.3s, opacity 0.3s',
          zIndex: 20,
          fontFamily: 'monospace',
        }}
        aria-label="Secret"
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(212,169,106,0.5)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(212,169,106,0.2)'; }}
      >
        ✦
      </button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            key="easter"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '24px',
              zIndex: 2000,
              padding: '20px 28px',
              background: 'rgba(26,10,20,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212,169,106,0.3)',
              borderRadius: '4px',
              maxWidth: '280px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <button
              onClick={() => { setRevealed(false); setClicks(0); }}
              style={{
                position: 'absolute',
                top: '8px',
                right: '12px',
                background: 'none',
                border: 'none',
                color: 'rgba(253,245,238,0.3)',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              ×
            </button>
            <p style={{
              fontFamily: 'var(--font-script)',
              fontSize: '14px',
              color: 'rgba(212,169,106,0.7)',
              marginBottom: '8px',
            }}>
              one more thing...
            </p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '18px',
              color: 'var(--color-cream)',
              lineHeight: 1.5,
              margin: 0,
            }}>
              You are more special than you probably realize. ♥
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/** Large blooming SVG rose for the final section */
const FinalRose: React.FC<{ inView: boolean }> = ({ inView }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6 }}
    animate={inView ? { opacity: 0.22, scale: 1 } : {}}
    transition={{ delay: 0.3, duration: 2.5, ease: [0.19, 1, 0.22, 1] }}
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: 0,
    }}
  >
    <svg width="500" height="500" viewBox="0 0 200 200" fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.ellipse
          key={i}
          cx={100 + Math.cos((angle * Math.PI) / 180) * 36}
          cy={100 + Math.sin((angle * Math.PI) / 180) * 36}
          rx={22} ry={34}
          fill={i % 2 === 0 ? '#d4687a' : '#a83050'}
          opacity={0.6}
          transform={`rotate(${angle}, 100, 100)`}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.5 + i * 0.08, duration: 1.4 }}
          style={{ transformOrigin: '100px 100px' }}
        />
      ))}
      <circle cx="100" cy="100" r="20" fill="#6a1030" opacity="0.8" />
      <circle cx="100" cy="100" r="10" fill="#a83050" opacity="0.9" />
    </svg>
  </motion.div>
);

const FinalReveal: React.FC = () => {
  const { ref, inView } = useInView(0.2);

  return (
    <section
      id="final"
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 50%, #2a0e1a 0%, #150810 40%, #0d0409 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 8vw, 80px)',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <StarField count={70} />
      <PetalAnimation count={25} />
      <ParticleField count={20} />
      <FinalRose inView={inView} />

      {/* Light glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(168,48,80,0.15) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
        {/* Gold ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.5 }}
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
            margin: '0 auto 48px',
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.3, duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(32px, 7vw, 76px)',
            letterSpacing: '0.04em',
            lineHeight: 1.15,
            color: 'var(--color-cream)',
            margin: '0 0 8px',
          }}
        >
          Happy Birthday,
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.6, duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(32px, 7vw, 76px)',
            letterSpacing: '0.04em',
            lineHeight: 1.15,
            background: 'linear-gradient(135deg, #f2b8c6 0%, #d4a96a 50%, #f2b8c6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 48px',
          }}
        >
          Purnima.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 1.4 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 200,
            fontSize: 'clamp(15px, 2.5vw, 20px)',
            color: 'rgba(253,245,238,0.7)',
            lineHeight: 1.85,
            letterSpacing: '0.04em',
            marginBottom: '48px',
            maxWidth: '560px',
            margin: '0 auto 48px',
          }}
        >
          {FINAL_MESSAGE.subheading}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4, duration: 1.2 }}
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(20px, 3.5vw, 30px)',
            color: 'var(--color-blush)',
            marginBottom: '64px',
          }}
        >
          {FINAL_MESSAGE.closing}
        </motion.p>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <div style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
            margin: '0 auto 24px',
          }} />
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 200,
            fontSize: '12px',
            letterSpacing: '0.4em',
            color: 'rgba(212,169,106,0.5)',
            textTransform: 'uppercase',
          }}>
            {FINAL_MESSAGE.date}
          </p>
        </motion.div>
      </div>

      {/* Easter egg */}
      <EasterEgg />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '120px',
        background: 'linear-gradient(to bottom, transparent, #0d0409)',
        pointerEvents: 'none',
      }} />
    </section>
  );
};

export default FinalReveal;
