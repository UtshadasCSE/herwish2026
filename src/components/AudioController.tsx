import React from 'react';

interface AudioControllerProps {
  playing: boolean;
  muted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
}

const AudioController: React.FC<AudioControllerProps> = ({
  playing, muted, onTogglePlay, onToggleMute,
}) => {
  return (
    <div
      id="audio-controller"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1001,
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        padding: '10px 14px',
        borderRadius: '40px',
        background: 'rgba(13,4,9,0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(212,169,106,0.2)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
      }}
    >
      {/* Animated bars indicator */}
      <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '18px' }}>
        {[0.4, 0.7, 1, 0.6, 0.8].map((h, i) => (
          <div
            key={i}
            style={{
              width: '3px',
              height: `${h * 18}px`,
              background: 'var(--color-gold)',
              borderRadius: '2px',
              opacity: playing && !muted ? 1 : 0.2,
              animation: playing && !muted ? `audioBar${i} 0.8s ease-in-out infinite alternate` : 'none',
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>

      {/* Play/Pause */}
      <button
        id="audio-play-pause"
        onClick={onTogglePlay}
        aria-label={playing ? 'Pause music' : 'Play music'}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--color-gold)',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>

      {/* Mute/Unmute */}
      <button
        id="audio-mute"
        onClick={onToggleMute}
        aria-label={muted ? 'Unmute' : 'Mute'}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: muted ? 'rgba(212,169,106,0.3)' : 'var(--color-gold)',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 5L6 9H2v6h4l5 4V5zm9.07 3.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
            <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes audioBar0 { to { height: 8px; } }
        @keyframes audioBar1 { to { height: 14px; } }
        @keyframes audioBar2 { to { height: 6px; } }
        @keyframes audioBar3 { to { height: 16px; } }
        @keyframes audioBar4 { to { height: 10px; } }
      `}</style>
    </div>
  );
};

export default AudioController;
