// ============================================================
// CENTRAL DATA — replace content here to personalise the site
// ============================================================

export const BIRTHDAY_INFO = {
  name: 'Purnima',
  date: '2 October',
  year: 2026,
  tagline: 'Some people make ordinary days feel a little more beautiful.',
};

// ── Images ──────────────────────────────────────────────────
// Drop Purnima's photos into /public/images/ and update these paths.
export const IMAGES = [
  { src: '/images/purnima_2.png', alt: 'Purnima — Portrait 1', caption: 'A smile that lights up any room.' },
  { src: '/images/purnima_1.png', alt: 'Purnima — Portrait 2', caption: 'Beautiful, always.' },
  { src: '/images/purnima_3.png', alt: 'Purnima — Portrait 3', caption: 'Soft moments worth remembering.' },
  { src: '/images/purnima_4.png', alt: 'Purnima — Portrait 4', caption: 'The person she is becoming.' },
];

// ── Quotes ───────────────────────────────────────────────────
export const QUOTES = [
  {
    id: 'q1',
    text: "Some people don't need to try to be special. They simply are.",
    image: IMAGES[0],
  },
  {
    id: 'q2',
    text: 'May you always find reasons to smile, even on ordinary days.',
    image: IMAGES[1],
  },
  {
    id: 'q3',
    text: 'Your existence is a quiet reminder that beautiful things can happen unexpectedly.',
    image: IMAGES[2],
  },
  {
    id: 'q4',
    text: "May this year bring you closer to everything you've ever wished for.",
    image: IMAGES[3],
  },
];

// ── Memory cards ─────────────────────────────────────────────
export const MEMORIES = [
  { id: 'm1', text: 'Your smile.' },
  { id: 'm2', text: 'Your voice.' },
  { id: 'm3', text: 'The way you make ordinary moments feel special.' },
  { id: 'm4', text: 'Your little habits.' },
  { id: 'm5', text: 'The person you are becoming.' },
  { id: 'm6', text: 'The warmth you bring to every room.' },
];

// ── Birthday messages ─────────────────────────────────────────
export const OPENING_MESSAGE = [
  "Today isn't just another date on the calendar.",
  "It's the day the world became a little more beautiful because you were born.",
  'I hope this new year of your life brings you peaceful mornings, unexpected happiness, beautiful memories, and every little thing your heart quietly wishes for.',
];

export const LETTER = {
  heading: 'For Purnima',
  body: [
    "On your birthday, I don't have a thousand perfect words.",
    'I just hope life gives you more reasons to smile, more moments worth remembering, and more dreams that slowly become real.',
    'Wherever life takes you, I hope you continue to grow, laugh, dream, and become even more of the person you are meant to be.',
    'Happy Birthday, Purnima.',
    'May 2 October always remind you that your existence is something worth celebrating.',
  ],
};

export const FINAL_MESSAGE = {
  heading: 'Happy Birthday, Purnima',
  subheading:
    'May your life be filled with beautiful beginnings, unforgettable moments, and people who make your heart feel at home.',
  closing: 'Keep shining. Keep smiling. Keep being you.',
  date: '2 \u2022 10 \u2022 2026',
};


// ── Audio ─────────────────────────────────────────────────────
// Place your audio files in /public/audio/ and update these paths.
// Supported formats: mp3, ogg, wav
export const AUDIO_TRACKS = [
  {
    id: 'main',
    label: 'Herwish',
    src: '/audio/herwish.mp3',
  }
];
