import { useState, useEffect } from 'react';
import EnterOverlay from './components/EnterOverlay';
import HeroSection from './components/HeroSection';
import BirthdayMessage from './components/BirthdayMessage';
import Ticker from './components/Ticker';
import PhotoStory from './components/PhotoStory';
import QuoteSection from './components/QuoteSection';
import FlowerGarden from './components/FlowerGarden';
import MemoryCards from './components/MemoryCards';
import BirthdayLetter from './components/BirthdayLetter';
import FinalReveal from './components/FinalReveal';
import AudioController from './components/AudioController';
import ProgressIndicator from './components/ProgressIndicator';
import { useAudio } from './hooks';
import { AUDIO_TRACKS } from './data';
import './index.css';

const SECTIONS = [
  { id: 'hero',     label: 'Welcome' },
  { id: 'message',  label: 'Birthday Message' },
  { id: 'photos',   label: 'Photo Story' },
  { id: 'quotes',   label: 'Quotes' },
  { id: 'flowers',  label: 'Garden' },
  { id: 'memories', label: 'Memories' },
  { id: 'letter',   label: 'Letter' },
  { id: 'final',    label: 'Finale' },
];

export default function App() {
  const [entered, setEntered] = useState(false);
  const { playing, muted, play, pause, toggleMute, crossfadeTo } = useAudio();

  const handleEnter = () => {
    setEntered(true);
    // Start with the hero audio track
    play(AUDIO_TRACKS[0].src);
  };

  // Crossfade audio as sections come into view
  useEffect(() => {
    if (!entered) return;

    const audioMap: Record<string, string> = {
      photos:   AUDIO_TRACKS[1].src,
      quotes:   AUDIO_TRACKS[1].src,
      flowers:  AUDIO_TRACKS[2].src,
      memories: AUDIO_TRACKS[2].src,
      letter:   AUDIO_TRACKS[3].src,
      final:    AUDIO_TRACKS[3].src,
    };

    const observers: IntersectionObserver[] = [];

    Object.entries(audioMap).forEach(([sectionId, audioSrc]) => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) crossfadeTo(audioSrc);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [entered, crossfadeTo]);

  const handleTogglePlay = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  return (
    <>
      {/* Enter overlay */}
      {!entered && <EnterOverlay onEnter={handleEnter} />}

      {/* Main content */}
      <main id="main-content" style={{ opacity: entered ? 1 : 0, transition: 'opacity 1s ease' }}>
        <HeroSection />
        <BirthdayMessage />
        <Ticker />
        <PhotoStory />
        <Ticker />
        <QuoteSection />
        <FlowerGarden />
        <MemoryCards />
        <BirthdayLetter />
        <FinalReveal />
      </main>

      {/* UI overlays — only show after entering */}
      {entered && (
        <>
          <ProgressIndicator sections={SECTIONS} />
          <AudioController
            playing={playing}
            muted={muted}
            onTogglePlay={handleTogglePlay}
            onToggleMute={toggleMute}
          />
        </>
      )}
    </>
  );
}
