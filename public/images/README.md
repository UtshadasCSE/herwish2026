# Images — How to Add Purnima's Photos

Place photo files in this directory (`/public/images/`) using the filenames below.

The website is configured to use these exact paths (set in `src/data.ts`):

| File | Where it appears |
|------|-----------------|
| `purnima-01.jpg` | Full-screen portrait (Photo Story section) |
| `purnima-02.jpg` | Left-side layout (Photo Story section) |
| `purnima-03.jpg` | Centered overlay (Photo Story section) |
| `purnima-04.jpg` | Right-side layout (Photo Story section) |
| `purnima-05.jpg` | Polaroid layout (Photo Story section) |

Photos also appear in the Quote sections. Update `src/data.ts` → `IMAGES` array to change captions.

## Tips

- **Orientation**: Portrait or square photos work best.
- **Resolution**: Aim for 1200×1600px minimum for quality display.
- **Format**: `.jpg`, `.webp`, or `.png` all work.
- **Renaming**: If you prefer different filenames, update `src/data.ts` → `IMAGES`.

Until you add real photos, the website shows elegant placeholders with her name.
