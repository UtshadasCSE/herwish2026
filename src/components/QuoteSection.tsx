import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import { QUOTES } from '../data';
import { CinemaImage } from './CinemaImage';

const QuoteSection: React.FC = () => {
  return (
    <section
      id="quotes"
      style={{ background: 'linear-gradient(180deg, #0d0409 0%, #150810 50%, #0d0409 100%)' }}
    >
      {QUOTES.map((quote, i) => {
        const isEven = i % 2 === 0;
        return (
          <QuoteBlock key={quote.id} quote={quote} index={i} isEven={isEven} />
        );
      })}
    </section>
  );
};

interface QuoteBlockProps {
  quote: { id: string; text: string; image: { src: string; alt: string } };
  index: number;
  isEven: boolean;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({ quote, index, isEven }) => {
  const { ref, inView } = useInView(0.2);

  // Alternate between full-screen quote and side-by-side
  if (index % 3 === 2) {
    // Full-screen centered
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px',
          background: `radial-gradient(ellipse at ${isEven ? '30%' : '70%'} 50%, rgba(168,48,80,0.1) 0%, transparent 60%)`,
          overflow: 'hidden',
        }}
      >
        {/* Background image (faded) */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12 }}>
          <CinemaImage src={quote.image.src} alt="" className="absolute inset-0" />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,4,9,0.6)' }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          animate={inView ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            maxWidth: '700px',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(24px, 5vw, 52px)',
            color: 'var(--color-cream)',
            lineHeight: 1.4,
            letterSpacing: '0.02em',
          }}>
            "{quote.text}"
          </p>
          <div style={{
            width: '40px',
            height: '1px',
            background: 'var(--color-gold)',
            margin: '32px auto 0',
            opacity: 0.5,
          }} />
        </motion.div>
      </div>
    );
  }

  // Side-by-side
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        display: 'flex',
        flexDirection: isEven ? 'row' : 'row-reverse',
        minHeight: '80vh',
        flexWrap: 'wrap',
      }}
    >
      {/* Image panel */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
        style={{ flex: '1 1 300px', minHeight: '400px', position: 'relative' }}
      >
        <CinemaImage src={quote.image.src} alt={quote.image.alt} className="absolute inset-0" />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: isEven
            ? 'linear-gradient(to right, transparent, rgba(13,4,9,0.6))'
            : 'linear-gradient(to left, transparent, rgba(13,4,9,0.6))',
        }} />
      </motion.div>

      {/* Quote panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 1.2 }}
        style={{
          flex: '1 1 300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(48px, 6vw, 80px) clamp(32px, 6vw, 80px)',
          background: `linear-gradient(${isEven ? '135deg' : '225deg'}, #1a0a14, #0d0409)`,
        }}
      >
        <div style={{ maxWidth: '420px' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 200,
            fontSize: '11px',
            letterSpacing: '0.3em',
            color: 'rgba(212,169,106,0.4)',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            ✦ {String(index + 1).padStart(2, '0')}
          </p>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(20px, 3.5vw, 34px)',
            color: 'var(--color-cream)',
            lineHeight: 1.5,
            marginBottom: '28px',
          }}>
            "{quote.text}"
          </p>
          <div style={{
            width: '32px',
            height: '1px',
            background: 'var(--color-rose)',
            opacity: 0.5,
          }} />
        </div>
      </motion.div>
    </div>
  );
};

export default QuoteSection;
