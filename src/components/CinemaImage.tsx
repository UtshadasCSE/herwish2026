import React, { useState } from 'react';

interface CinemaImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  objectPosition?: string;
}

/** Renders an image with an elegant placeholder shown while loading / on error */
export const CinemaImage: React.FC<CinemaImageProps> = ({
  src, alt, className = '', style, objectPosition = 'center',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Placeholder */}
      {(!loaded || error) && (
        <div className="img-placeholder absolute inset-0 z-10">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(212,169,106,0.4)" strokeWidth="1">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          <span style={{ fontFamily: 'var(--font-script)', color: 'rgba(212,169,106,0.5)', fontSize: '14px' }}>
            {alt}
          </span>
        </div>
      )}
      {!error && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            objectFit: 'cover',
            objectPosition,
            width: '100%',
            height: '100%',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        />
      )}
    </div>
  );
};
