import React from 'react';
import { TICKER_PHRASES } from '../data';

const Ticker: React.FC = () => {
  const repeated = [...TICKER_PHRASES, ...TICKER_PHRASES, ...TICKER_PHRASES, ...TICKER_PHRASES];

  return (
    <section id="ticker" style={{ overflow: 'hidden', padding: '0', background: 'transparent' }}>
      {/* Top band — moves left */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(168,48,80,0.15), rgba(212,104,122,0.1), rgba(168,48,80,0.15))',
        borderTop: '1px solid rgba(212,104,122,0.15)',
        borderBottom: '1px solid rgba(212,104,122,0.15)',
        padding: '14px 0',
        overflow: 'hidden',
      }}>
        <div className="ticker-track-left" style={{ display: 'flex', gap: '0', whiteSpace: 'nowrap', width: 'max-content' }}>
          {repeated.map((phrase, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '0.3em',
                color: 'var(--color-blush)',
                opacity: 0.8,
                padding: '0 20px',
                textTransform: 'uppercase',
              }}
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: '2px', background: 'transparent' }} />

      {/* Bottom band — moves right */}
      <div style={{
        background: 'linear-gradient(90deg, rgba(212,169,106,0.08), rgba(212,169,106,0.12), rgba(212,169,106,0.08))',
        borderTop: '1px solid rgba(212,169,106,0.12)',
        borderBottom: '1px solid rgba(212,169,106,0.12)',
        padding: '14px 0',
        overflow: 'hidden',
      }}>
        <div className="ticker-track-right" style={{ display: 'flex', gap: '0', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...TICKER_PHRASES].reverse().concat([...TICKER_PHRASES].reverse()).concat([...TICKER_PHRASES].reverse()).concat([...TICKER_PHRASES].reverse()).map((phrase, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '0.3em',
                color: 'rgba(212,169,106,0.65)',
                padding: '0 20px',
                textTransform: 'uppercase',
              }}
            >
              {phrase}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ticker;
