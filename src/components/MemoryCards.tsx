import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import { MEMORIES } from '../data';

const MemoryCard: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  const { ref, inView } = useInView(0.2);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 1.0, ease: [0.19, 1, 0.22, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        padding: 'clamp(28px, 4vw, 40px)',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(212,169,106,0.12)',
        borderRadius: '4px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,169,106,0.3)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 40px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(212,169,106,0.12)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '30px',
        height: '1px',
        background: 'var(--color-gold)',
        opacity: 0.4,
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '1px',
        height: '30px',
        background: 'var(--color-gold)',
        opacity: 0.4,
      }} />

      <p style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 200,
        fontSize: '10px',
        letterSpacing: '0.3em',
        color: 'rgba(212,169,106,0.4)',
        textTransform: 'uppercase',
        marginBottom: '16px',
      }}>
        ✦ {String(index + 1).padStart(2, '0')}
      </p>

      <p style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: 'clamp(18px, 3vw, 26px)',
        color: 'var(--color-cream)',
        lineHeight: 1.4,
        margin: 0,
      }}>
        {text}
      </p>
    </motion.div>
  );
};

const MemoryCards: React.FC = () => {
  const { ref: headRef, inView: headInView } = useInView(0.2);

  return (
    <section
      id="memories"
      style={{
        background: 'linear-gradient(180deg, #150820 0%, #0d0409 50%, #1a0a14 100%)',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 8vw, 100px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse, rgba(201,184,212,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Heading */}
      <motion.div
        ref={headRef as React.RefObject<HTMLDivElement>}
        initial={{ opacity: 0, y: 24 }}
        animate={headInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
        style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 80px)' }}
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
          a quiet collection
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(26px, 5vw, 48px)',
          color: 'var(--color-cream)',
          letterSpacing: '0.04em',
          margin: '0 0 12px',
        }}>
          Little things that deserve
        </h2>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(26px, 5vw, 48px)',
          color: 'var(--color-lavender)',
          letterSpacing: '0.04em',
          margin: 0,
        }}>
          to be remembered.
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
        gap: 'clamp(16px, 3vw, 28px)',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        {MEMORIES.map((m, i) => (
          <MemoryCard key={m.id} text={m.text} index={i} />
        ))}
      </div>
    </section>
  );
};

export default MemoryCards;
