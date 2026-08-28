import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

const svgPath = path.resolve('public/jewelry-by-nadia-logo.svg');
const svg = fs.readFileSync(svgPath, 'utf-8');

const resvg = new Resvg(svg, {
  fitTo: {
    mode: 'width',
    value: 1024,
  },
});

const pngData = resvg.render();
const pngBuffer = pngData.asPng();

fs.writeFileSync(path.resolve('public/jewelry-by-nadia-logo.png'), pngBuffer);
console.log('Successfully generated public/jewelry-by-nadia-logo.png (1024x1024)');
