import React, { useEffect, useState } from 'react';

interface ProgressIndicatorProps {
  sections: { id: string; label: string }[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ sections }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i); },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop — right side vertical */}
      <nav
        style={{
          position: 'fixed',
          right: '24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
        }}
        className="hidden md:flex"
        aria-label="Section navigation"
      >
        {sections.map((s, i) => (
          <button
            key={s.id}
            id={`nav-dot-${i}`}
            title={s.label}
            onClick={() => scrollTo(s.id)}
            className={`progress-dot ${active === i ? 'active' : ''}`}
            aria-label={s.label}
            aria-current={active === i ? 'true' : undefined}
          />
        ))}
      </nav>

      {/* Mobile — bottom horizontal */}
      <nav
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          padding: '8px 16px',
          borderRadius: '24px',
          background: 'rgba(13,4,9,0.6)',
          backdropFilter: 'blur(12px)',
        }}
        className="flex md:hidden"
        aria-label="Section navigation"
      >
        {sections.map((s, i) => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            style={{
              width: active === i ? '24px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: active === i ? 'var(--color-gold)' : 'rgba(212,169,106,0.3)',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              border: 'none',
              padding: 0,
            }}
            aria-label={s.label}
          />
        ))}
      </nav>
    </>
  );
};

export default ProgressIndicator;
