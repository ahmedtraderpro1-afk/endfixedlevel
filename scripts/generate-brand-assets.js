import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceLogo = path.resolve('public/brand/jewelry-by-nadia-logo.png');

async function generateAssets() {
  console.log('Generating favicon and app icon assets from approved logo...');

  // 1. Favicons & App Icons (Square, centered, padded on solid black #080808)
  const iconConfigs = [
    { name: 'public/favicon-32x32.png', size: 32 },
    { name: 'public/favicon-48x48.png', size: 48 },
    { name: 'public/favicon-96x96.png', size: 96 },
    { name: 'public/apple-touch-icon.png', size: 180 },
    { name: 'public/android-chrome-192x192.png', size: 192 },
    { name: 'public/android-chrome-512x512.png', size: 512 },
  ];

  for (const config of iconConfigs) {
    // The source logo is square 1024x1024. We scale it directly to size maintaining aspect ratio
    await sharp(sourceLogo)
      .resize(config.size, config.size, {
        fit: 'contain',
        background: { r: 8, g: 8, b: 8, alpha: 1 },
      })
      .png()
      .toFile(path.resolve(config.name));
    console.log(`Generated: ${config.name} (${config.size}x${config.size})`);
  }

  // 2. OpenGraph / WhatsApp / Social Share Image (1200 x 630, #080808 background, logo centered)
  // We'll place the approved logo centered inside a 1200x630 canvas with comfortable negative space.
  // Logo size ~ 520x520 or 500x500 inside 1200x630
  const logoForOg = await sharp(sourceLogo)
    .resize(500, 500, {
      fit: 'contain',
      background: { r: 8, g: 8, b: 8, alpha: 1 },
    })
    .toBuffer();

  await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 3,
      background: { r: 8, g: 8, b: 8 },
    },
  })
    .composite([
      {
        input: logoForOg,
        top: Math.round((630 - 500) / 2),
        left: Math.round((1200 - 500) / 2),
      },
    ])
    .jpeg({ quality: 95 })
    .toFile(path.resolve('public/og-image.jpg'));

  console.log('Generated: public/og-image.jpg (1200x630)');
}

generateAssets().catch((err) => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
