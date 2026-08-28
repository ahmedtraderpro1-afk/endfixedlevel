import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

async function main() {
  console.log('Fetching high-definition fonts...');
  
  // Download TrueType fonts for exact rendering
  const [cinzel700Res, montserrat300Res, montserrat400Res] = await Promise.all([
    fetch('https://fonts.gstatic.com/s/cinzel/v26/8vIU7ww63mVu7gtR-kwKxNvkNOjw-jHgTYo.ttf'),
    fetch('https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Ew-.ttf'),
    fetch('https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf'),
  ]);

  const cinzel700Buffer = Buffer.from(await cinzel700Res.arrayBuffer());
  const montserrat300Buffer = Buffer.from(await montserrat300Res.arrayBuffer());
  const montserrat400Buffer = Buffer.from(await montserrat400Res.arrayBuffer());

  // 1200 x 630 Standard Open Graph Dimensions with large, bold, prominent typography
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <!-- Background Pure Obsidian Luxury Gradient -->
    <radialGradient id="ogBg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#0c0c0c"/>
      <stop offset="65%" stop-color="#050505"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>

    <!-- Luxury Antique Gold Gradient for NADIA text -->
    <linearGradient id="goldTextGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF9EA"/>
      <stop offset="18%" stop-color="#F5E0B3"/>
      <stop offset="50%" stop-color="#D9B76A"/>
      <stop offset="85%" stop-color="#BD9544"/>
      <stop offset="100%" stop-color="#936F28"/>
    </linearGradient>

    <!-- Metallic Gold Gradient for Flourish -->
    <linearGradient id="goldOrnamentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#A27D34"/>
      <stop offset="25%" stop-color="#F3DCAC"/>
      <stop offset="50%" stop-color="#FFF8E7"/>
      <stop offset="75%" stop-color="#F3DCAC"/>
      <stop offset="100%" stop-color="#A27D34"/>
    </linearGradient>

    <!-- Soft Glow Filter -->
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.95"/>
      <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#D9B76A" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Solid Obsidian Background -->
  <rect width="1200" height="630" fill="url(#ogBg)"/>

  <!-- Centered Brand Identity Container (Prominent, Large, High Readability) -->
  <g transform="translate(600, 310)" text-anchor="middle">
    
    <!-- Top Text: Jewelry By -->
    <text
      y="-90"
      font-family="Montserrat"
      font-size="58"
      font-weight="300"
      letter-spacing="18"
      fill="#F9F6F0"
      opacity="0.98"
    >
      Jewelry By
    </text>

    <!-- Main Heading: NADIA -->
    <text
      y="95"
      font-family="Cinzel"
      font-size="205"
      font-weight="700"
      letter-spacing="10"
      fill="url(#goldTextGrad)"
      filter="url(#goldGlow)"
    >
      NADIA
    </text>

    <!-- Symmetrical Luxury Underline Flourish -->
    <g transform="translate(0, 175)">
      <!-- Left Horizontal Line -->
      <line
        x1="-460"
        y1="0"
        x2="-130"
        y2="0"
        stroke="url(#goldOrnamentGrad)"
        stroke-width="3.5"
        stroke-linecap="round"
      />

      <!-- Left & Center Filigree Ribbon Loops -->
      <path
        d="M -130,0 C -110,-24 -78,-24 -52,0 C -28,20 0,20 0,0 C 0,20 28,20 52,0 C 78,-24 110,-24 130,0"
        fill="none"
        stroke="url(#goldOrnamentGrad)"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- Intertwining Counter Curve -->
      <path
        d="M -115,0 C -92,22 -64,22 -38,0 C -20,-12 0,-12 0,0 C 0,-12 20,-12 38,0 C 64,22 92,22 115,0"
        fill="none"
        stroke="url(#goldOrnamentGrad)"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <!-- Central Jewel / Teardrop Accent -->
      <path
        d="M 0,-6 C -5,4 0,10 0,10 C 0,10 5,4 0,-6 Z"
        fill="url(#goldOrnamentGrad)"
      />

      <!-- Right Horizontal Line -->
      <line
        x1="130"
        y1="0"
        x2="460"
        y2="0"
        stroke="url(#goldOrnamentGrad)"
        stroke-width="3.5"
        stroke-linecap="round"
      />
    </g>
  </g>
</svg>
`;

  console.log('Rendering SVG with Resvg...');
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
    font: {
      fontBuffers: [cinzel700Buffer, montserrat300Buffer, montserrat400Buffer],
      defaultFontFamily: 'Cinzel',
    },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  // Save the requested final OG PNG files
  const outPngPath = path.resolve('public/jewelry-by-nadia-og-final.png');
  const outBrandPngPath = path.resolve('public/brand/jewelry-by-nadia-og-final.png');
  const outOgPngPath = path.resolve('public/og-image.png');
  
  fs.writeFileSync(outPngPath, pngBuffer);
  fs.writeFileSync(outBrandPngPath, pngBuffer);
  fs.writeFileSync(outOgPngPath, pngBuffer);
  console.log('Saved PNG to:', outPngPath);
  console.log('Saved PNG to:', outBrandPngPath);
  console.log('Saved PNG to:', outOgPngPath);

  // Convert to high-quality JPEG for standard og-image.jpg (1200x630)
  const jpgBuffer = await sharp(pngBuffer)
    .jpeg({ quality: 96, mozjpeg: true })
    .toFile(path.resolve('public/og-image.jpg'));

  console.log('Saved JPEG to: public/og-image.jpg');
  console.log('All OG images generated successfully!');
}

main().catch((err) => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});
