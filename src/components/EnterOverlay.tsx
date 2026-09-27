import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BIRTHDAY_INFO } from '../data';

interface EnterOverlayProps {
  onEnter: () => void;
}

const EnterOverlay: React.FC<EnterOverlayProps> = ({ onEnter }) => {
  const [exiting, setExiting] = useState(false);

  const handleEnter = () => {
    setExiting(true);
    setTimeout(onEnter, 1200);
  };

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          id="enter-overlay"
          key="overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            background: 'radial-gradient(ellipse at 50% 60%, #2a0e1a 0%, #0d0409 70%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {/* Ambient glow */}
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,104,122,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }} />

          {/* Rose SVG */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="24" r="12" fill="rgba(212,104,122,0.3)" />
              <circle cx="32" cy="24" r="8" fill="rgba(212,104,122,0.5)" />
              <circle cx="32" cy="24" r="4" fill="#d4687a" />
              <path d="M32 36 Q28 48 24 56" stroke="#4a6741" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M32 42 Q26 40 22 38" stroke="#4a6741" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M32 46 Q38 44 42 42" stroke="#4a6741" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
            style={{ textAlign: 'center', maxWidth: '380px', padding: '0 24px' }}
          >
            <p style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(13px, 3vw, 16px)',
              color: 'rgba(212,169,106,0.7)',
              letterSpacing: '0.1em',
              marginBottom: '8px',
            }}>
              for {BIRTHDAY_INFO.name}
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(22px, 5vw, 32px)',
              color: 'var(--color-cream)',
              letterSpacing: '0.05em',
              margin: '0 0 8px',
            }}>
              Something beautiful
            </h1>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(22px, 5vw, 32px)',
              color: 'var(--color-blush)',
              letterSpacing: '0.05em',
              margin: '0 0 24px',
            }}>
              is waiting for you.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 200,
              fontSize: 'clamp(12px, 2.5vw, 14px)',
              color: 'rgba(253,245,238,0.4)',
              letterSpacing: '0.12em',
            }}>
              turn the sound on for the full experience
            </p>
          </motion.div>

          <motion.button
            id="enter-button"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleEnter}
            style={{
              background: 'none',
              border: '1px solid rgba(212,169,106,0.4)',
              borderRadius: '40px',
              padding: '14px 36px',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: '13px',
              letterSpacing: '0.2em',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              backdropFilter: 'blur(10px)',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,169,106,0.8)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(212,169,106,0.15)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(212,169,106,0.4)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
            }}
          >
            Enter the surprise ✦
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default EnterOverlay;
