# Audio — How to Add Music

Place your audio files in this directory (`/public/audio/`) using the filenames below.

The website is configured to use these exact paths (set in `src/data.ts`):

| File | When it plays | Suggested style |
|------|--------------|-----------------|
| `hero-ambient.mp3` | Opening / Hero section | Soft piano or ambient intro |
| `romantic-instrumental.mp3` | Photo Story + Quotes | Warm romantic instrumental |
| `dreamy-atmosphere.mp3` | Flower Garden + Memories | Dreamy atmospheric / gentle |
| `emotional-piano.mp3` | Birthday Letter + Final Reveal | Emotional solo piano |

The website crossfades smoothly between tracks as the user scrolls into each section.

## Finding Free Music

Suggested sources for royalty-free music:
- **Pixabay**: https://pixabay.com/music/ (free, no attribution required)
- **Free Music Archive**: https://freemusicarchive.org/
- **Incompetech**: https://incompetech.com/music/ (CC license)

Search for: "romantic piano ambient", "soft cinematic music", "dreamy instrumental"

## Renaming

If you prefer different filenames, update `src/data.ts` → `AUDIO_TRACKS`.

## Without Audio Files

The website works perfectly without audio files — the audio controller will appear but will gracefully handle missing files. Only add audio when you're ready.
