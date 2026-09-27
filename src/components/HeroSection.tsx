import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BIRTHDAY_INFO } from '../data';
import PetalAnimation, { ParticleField, StarField } from './PetalAnimation';

const HeroSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at 50% 40%, #2a0e1a 0%, #1a0812 40%, #0d0409 100%)',
      }}
    >
      {/* Stars */}
      <StarField count={60} />

      {/* Moon / light source */}
      <div
        className="moon"
        style={{
          position: 'absolute',
          top: '12%',
          right: '15%',
          width: '160px',
          height: '160px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,212,160,0.25) 0%, rgba(212,169,106,0.08) 50%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle light leak */}
      <div className="light-leak" style={{ top: '-10%', left: '10%' }} />

      {/* Petals */}
      <PetalAnimation count={20} />

      {/* Particles */}
      <ParticleField count={25} />

      {/* Hero content with parallax */}
      <motion.div
        style={{ y, opacity, position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px' }}
      >
        {/* Decorative line above */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
            margin: '0 auto 28px',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(14px, 3vw, 18px)',
            color: 'var(--color-gold)',
            letterSpacing: '0.1em',
            marginBottom: '12px',
          }}
        >
          {BIRTHDAY_INFO.date}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.8, duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(36px, 8vw, 88px)',
            letterSpacing: '0.04em',
            lineHeight: 1.1,
            color: 'var(--color-cream)',
            margin: '0 0 8px',
          }}
        >
          Happy Birthday,
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 1.0, duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(36px, 8vw, 88px)',
            letterSpacing: '0.04em',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, #f2b8c6, #d4a96a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 36px',
          }}
        >
          Purnima.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.2 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 200,
            fontSize: 'clamp(14px, 2.5vw, 18px)',
            color: 'rgba(253,245,238,0.65)',
            letterSpacing: '0.06em',
            maxWidth: '480px',
            margin: '0 auto 48px',
            lineHeight: 1.7,
          }}
        >
          {BIRTHDAY_INFO.tagline}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 200,
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: 'rgba(253,245,238,0.35)',
            textTransform: 'uppercase',
            margin: 0,
          }}>
            Scroll slowly ↓
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(212,169,106,0.6), transparent)',
            }}
          />
        </motion.div>

        {/* Decorative bottom line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
            margin: '32px auto 0',
          }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
