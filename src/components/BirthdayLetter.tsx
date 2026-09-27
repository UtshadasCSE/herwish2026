import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import { LETTER } from '../data';
import PetalAnimation from './PetalAnimation';

const BirthdayLetter: React.FC = () => {
  const { ref, inView } = useInView(0.15);

  return (
    <section
      id="letter"
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #1a0a14 0%, #0d0409 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 8vw, 100px)',
        overflow: 'hidden',
      }}
    >
      <PetalAnimation count={8} colors={['#f0a8b8', '#f2c4d0', '#e8b4c4']} />

      {/* Warm ambient glow */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(212,104,122,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Letter card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
        className="paper-texture"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: 'clamp(40px, 6vw, 72px)',
          borderRadius: '4px',
          border: '1px solid rgba(253,245,238,0.07)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Corner ornament */}
        <svg
          style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.3 }}
          width="48" height="48" viewBox="0 0 48 48" fill="none"
        >
          <path d="M24 4 L24 44 M4 24 L44 24" stroke="var(--color-gold)" strokeWidth="0.5" />
          <circle cx="24" cy="24" r="8" stroke="var(--color-gold)" strokeWidth="0.5" fill="none" />
          <circle cx="24" cy="24" r="2" fill="var(--color-gold)" />
        </svg>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3, duration: 1 }}
          style={{ marginBottom: '40px' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 200,
            fontSize: '11px',
            letterSpacing: '0.3em',
            color: 'rgba(212,169,106,0.5)',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>
            a letter
          </p>
          <h2 style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(28px, 5vw, 44px)',
            color: 'var(--color-blush)',
            margin: 0,
            fontWeight: 400,
          }}>
            {LETTER.heading}
          </h2>
          <div style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, var(--color-gold), transparent)',
            marginTop: '16px',
            opacity: 0.5,
          }} />
        </motion.div>

        {/* Letter body */}
        {LETTER.body.map((line, i) => {
          const isSignature = i === LETTER.body.length - 2;
          const isClosing = i === LETTER.body.length - 1;
          const isName = line.toLowerCase().startsWith('happy birthday');

          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.25, duration: 1 }}
              style={{
                fontFamily: isSignature || isName ? 'var(--font-script)' : 'var(--font-body)',
                fontWeight: isSignature || isName ? 400 : 200,
                fontSize: isSignature || isName
                  ? 'clamp(20px, 3.5vw, 28px)'
                  : isClosing
                    ? 'clamp(13px, 2vw, 15px)'
                    : 'clamp(15px, 2.5vw, 18px)',
                color: isSignature || isName
                  ? 'var(--color-blush)'
                  : isClosing
                    ? 'rgba(212,169,106,0.6)'
                    : 'rgba(253,245,238,0.78)',
                lineHeight: 1.85,
                marginBottom: isSignature ? '6px' : '20px',
                letterSpacing: isClosing ? '0.08em' : '0.03em',
                fontStyle: isClosing ? 'italic' : 'normal',
              }}
            >
              {line}
            </motion.p>
          );
        })}

        {/* Wax seal style decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.8, duration: 1, ease: [0.19, 1, 0.22, 1] }}
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '32px',
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #a83050, #6a1030)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(168,48,80,0.4)',
          }}>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>✦</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BirthdayLetter;
