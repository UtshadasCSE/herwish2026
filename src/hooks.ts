import { useEffect, useRef, useState, useCallback } from 'react';

/** Returns a ref + boolean indicating whether the element is in view */
export function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** Audio controller hook */
export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');

  const play = useCallback((src?: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
    }
    if (src && src !== currentSrc) {
      audioRef.current.src = src;
      setCurrentSrc(src);
    }
    audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
  }, [currentSrc]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  }, []);

  const crossfadeTo = useCallback((src: string, duration = 2000) => {
    if (!audioRef.current || src === currentSrc) return;
    const oldAudio = audioRef.current;
    const newAudio = new Audio(src);
    newAudio.loop = true;
    newAudio.volume = 0;
    newAudio.muted = muted;
    newAudio.play().catch(() => {});

    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;
    const fade = setInterval(() => {
      step++;
      oldAudio.volume = Math.max(0, 0.5 - (step / steps) * 0.5);
      newAudio.volume = Math.min(0.5, (step / steps) * 0.5);
      if (step >= steps) {
        clearInterval(fade);
        oldAudio.pause();
        audioRef.current = newAudio;
        setCurrentSrc(src);
      }
    }, stepTime);
  }, [currentSrc, muted]);

  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  return { playing, muted, currentSrc, play, pause, toggleMute, crossfadeTo };
}

/** Parallax offset on scroll */
export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = () => {
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * speed);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [speed]);

  return { ref, offset };
}
