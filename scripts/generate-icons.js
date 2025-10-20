// Simple script to create placeholder PWA icons
// This creates basic PNG files for testing purposes

const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// SVG template for the icon
const createSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff7043;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e35f0f;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size*0.35}" fill="white"/>
  <text x="${size/2}" y="${size/2 + size*0.12}" font-family="Arial" font-size="${size*0.3}" text-anchor="middle" fill="#e35f0f">🍴</text>
  <text x="${size/2}" y="${size*0.88}" font-family="Arial" font-size="${size*0.08}" font-weight="bold" text-anchor="middle" fill="white">KOLIOS</text>
</svg>
`;

// Create SVG files
const svg192 = createSVG(192);
const svg512 = createSVG(512);

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.svg'), svg192);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.svg'), svg512);

console.log('✅ SVG icons created successfully!');
console.log('📁 Location: public/pwa-192x192.svg and public/pwa-512x512.svg');
console.log('\n⚠️  NOTE: For production, please generate proper PNG files using:');
console.log('   Open generate-pwa-icons.html in your browser and download the icons');
