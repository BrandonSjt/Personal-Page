# My Page

A single-page personal website for a student focused on web interfaces and AI systems.

## Files

- `index.html` - page structure and content
- `styles.css` - Dark AI lab visual design and responsive layout
- `script.js` - navigation and small interactive effects
- `assets/profile-photo.svg` - starter profile image placeholder
- `docs/superpowers/specs/2026-06-21-personal-page-design.md` - approved design spec

## Local Preview

Open `index.html` directly in a browser, or run a local static server from this folder if Python is available:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Profile Photo

The page currently uses `assets/profile-photo.svg` as a starter profile image for Brandon Deandra.

To use a real photo:

1. Add your photo to the `assets` folder.
2. Use a square image if possible, for example `profile-photo.jpg` or `profile-photo.png`.
3. Update the `src` in `index.html` from `assets/profile-photo.svg` to your photo file.

## Customize Before Publishing

Replace the starter contact URLs in `index.html`:

- `https://github.com/your-username`
- `https://www.linkedin.com/in/your-username`
- `mailto:you@example.com`
- `https://www.instagram.com/your-username`

## GitHub Pages

After pushing this repository to GitHub, enable GitHub Pages from the repository settings and choose the main branch as the source.
