# PWA Icons Required

⚠️ **IMPORTANT**: You need to generate PNG icon files for the PWA to work!

## Quick Fix (2 minutes):

1. Open `generate-pwa-icons.html` in your browser
2. Click **"Download 192×192"** button
3. Click **"Download 512×512"** button  
4. Move both downloaded PNG files to this `public/` folder:
   - `pwa-192x192.png`
   - `pwa-512x512.png`

5. **Delete the temporary SVG files** (optional):
   - `pwa-192x192.svg`
   - `pwa-512x512.svg`

## Then Test:

```bash
npm run build
npm run preview
```

Open http://localhost:4173 and check for the install button!

---

**Note**: The SVG files currently in this folder are temporary placeholders and won't work properly for PWA installation.
