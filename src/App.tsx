import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import EnterOverlay from './components/EnterOverlay';
import HeroSection from './components/HeroSection';
import BirthdayMessage from './components/BirthdayMessage';

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

  { id: 'quotes',   label: 'Quotes' },
  { id: 'flowers',  label: 'Garden' },
  { id: 'memories', label: 'Memories' },
  { id: 'letter',   label: 'Letter' },
  { id: 'final',    label: 'Finale' },
];

export default function App() {
  const [entered, setEntered] = useState(false);
  const { playing, muted, play, pause, toggleMute } = useAudio();

  const handleEnter = () => {
    setEntered(true);
    // Start with the hero audio track
    play(AUDIO_TRACKS[0].src);
  };



  const handleTogglePlay = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  return (
    <>
      <Analytics />
      {/* Enter overlay */}
      {!entered && <EnterOverlay onEnter={handleEnter} />}

      {/* Main content */}
      <main id="main-content" style={{ opacity: entered ? 1 : 0, transition: 'opacity 1s ease' }}>
        <HeroSection />
        <BirthdayMessage />

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
