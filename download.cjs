const fs = require('fs');
const ytdl = require('@distube/ytdl-core');

const url = 'https://youtu.be/7maJOI3QMu0';
const outputPath = 'public/audio/river-flows-in-you.mp3';

console.log('Downloading...');

ytdl(url, { filter: 'audioonly' })
  .pipe(fs.createWriteStream(outputPath))
  .on('finish', () => {
    console.log('Download complete!');
  })
  .on('error', (err) => {
    console.error('Error downloading:', err);
  });
