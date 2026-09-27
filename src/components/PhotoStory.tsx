import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks';
import { IMAGES } from '../data';
import { CinemaImage } from './CinemaImage';
import PetalAnimation from './PetalAnimation';

interface PhotoEntry {
  src: string;
  alt: string;
  caption: string;
}

const PhotoCard: React.FC<{
  photo: PhotoEntry;
  index: number;
  layout: 'full' | 'left' | 'right' | 'polaroid' | 'overlay' | 'float';
}> = ({ photo, index, layout }) => {
  const { ref, inView } = useInView(0.15);

  if (layout === 'full') {
    return (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
        style={{
          width: '100%',
          height: 'clamp(400px, 70vh, 700px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <CinemaImage src={photo.src} alt={photo.alt} className="absolute inset-0" />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(13,4,9,0.8) 0%, transparent 50%)',
        }} />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(16px, 3vw, 22px)',
            color: 'var(--color-cream)',
            whiteSpace: 'nowrap',
          }}
        >
          {photo.caption}
        </motion.p>
      </motion.div>
    );
  }

  if (layout === 'left' || layout === 'right') {
    const isLeft = layout === 'left';
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{
          display: 'flex',
          flexDirection: isLeft ? 'row' : 'row-reverse',
          alignItems: 'center',
          gap: 'clamp(24px, 5vw, 80px)',
          padding: 'clamp(60px, 8vw, 120px) clamp(24px, 8vw, 100px)',
          flexWrap: 'wrap',
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40, filter: 'blur(6px)' }}
          animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          style={{ flex: '1 1 300px', maxWidth: '480px' }}
        >
          <CinemaImage
            src={photo.src}
            alt={photo.alt}
            style={{ width: '100%', height: 'clamp(280px, 45vw, 480px)', borderRadius: '4px' }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 1.2 }}
          style={{ flex: '1 1 240px', textAlign: isLeft ? 'left' : 'right' }}
        >
          <div style={{
            width: '40px',
            height: '1px',
            background: 'var(--color-gold)',
            marginBottom: '24px',
            marginLeft: isLeft ? 0 : 'auto',
            opacity: 0.5,
          }} />
          <p style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(20px, 3.5vw, 28px)',
            color: 'var(--color-blush)',
            lineHeight: 1.5,
            marginBottom: '12px',
          }}>
            {photo.caption}
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 200,
            fontSize: '12px',
            letterSpacing: '0.2em',
            color: 'rgba(212,169,106,0.5)',
            textTransform: 'uppercase',
          }}>
            ✦ {String(index + 1).padStart(2, '0')}
          </p>
        </motion.div>
      </div>
    );
  }

  if (layout === 'polaroid') {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        style={{ display: 'flex', justifyContent: 'center', padding: 'clamp(60px, 8vw, 100px) 24px' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -3 }}
          animate={inView ? { opacity: 1, y: 0, rotate: -1.5 } : {}}
          transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          style={{
            background: 'rgba(253,245,238,0.06)',
            border: '1px solid rgba(253,245,238,0.12)',
            padding: '16px 16px 48px',
            maxWidth: '360px',
            width: '100%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            borderRadius: '2px',
          }}
        >
          <CinemaImage
            src={photo.src}
            alt={photo.alt}
            style={{ width: '100%', height: '300px', borderRadius: '1px' }}
          />
          <p style={{
            fontFamily: 'var(--font-script)',
            fontSize: '18px',
            color: 'var(--color-cream)',
            textAlign: 'center',
            marginTop: '20px',
            opacity: 0.85,
          }}>
            {photo.caption}
          </p>
        </motion.div>
      </div>
    );
  }

  if (layout === 'overlay') {
    return (
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.6 }}
        style={{
          position: 'relative',
          height: 'clamp(400px, 65vh, 600px)',
          overflow: 'hidden',
          margin: '0',
        }}
      >
        <CinemaImage src={photo.src} alt={photo.alt} className="absolute inset-0" />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(13,4,9,0.3) 0%, rgba(13,4,9,0.75) 100%)',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ delay: 0.6, duration: 1.2 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(22px, 4.5vw, 42px)',
            color: 'var(--color-cream)',
            maxWidth: '560px',
            lineHeight: 1.4,
          }}>
            {photo.caption}
          </p>
        </motion.div>
      </motion.div>
    );
  }

  // float layout
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        padding: 'clamp(40px, 6vw, 80px) clamp(24px, 6vw, 80px)',
        display: 'flex',
        justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, rotate: index % 2 === 0 ? 2 : -2 }}
        animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
        style={{ width: 'clamp(260px, 45%, 420px)' }}
      >
        <CinemaImage
          src={photo.src}
          alt={photo.alt}
          style={{ width: '100%', height: 'clamp(280px, 40vw, 440px)', borderRadius: '3px' }}
        />
        <p style={{
          fontFamily: 'var(--font-script)',
          fontSize: '15px',
          color: 'rgba(201,184,212,0.7)',
          marginTop: '14px',
          paddingLeft: '4px',
        }}>
          {photo.caption}
        </p>
      </motion.div>
    </div>
  );
};

const LAYOUTS: Array<'full' | 'left' | 'right' | 'polaroid' | 'overlay' | 'float'> = [
  'full', 'left', 'overlay', 'right', 'polaroid',
];

const PhotoStory: React.FC = () => {
  return (
    <section
      id="photos"
      style={{
        background: 'linear-gradient(180deg, #1a0a14 0%, #0d0409 30%, #1a0812 70%, #0d0409 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <PetalAnimation count={8} />

      {/* Section heading */}
      <div style={{ textAlign: 'center', padding: 'clamp(80px, 10vw, 140px) 24px 0' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 200,
          fontSize: '11px',
          letterSpacing: '0.35em',
          color: 'rgba(212,169,106,0.5)',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          a glimpse of her
        </p>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(28px, 5vw, 50px)',
          color: 'var(--color-cream)',
          letterSpacing: '0.04em',
        }}>
          Beautiful, always.
        </p>
        <div style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--color-rose), transparent)',
          margin: '24px auto 0',
        }} />
      </div>

      {IMAGES.map((img, i) => (
        <PhotoCard
          key={img.src + i}
          photo={img}
          index={i}
          layout={LAYOUTS[i % LAYOUTS.length]}
        />
      ))}
    </section>
  );
};

export default PhotoStory;
