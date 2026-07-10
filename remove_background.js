const sharp = require('sharp');

const inputPath = 'C:\\Users\\Asus\\.gemini\\antigravity-ide\\brain\\ec249eea-9c5b-44c9-af6c-5b4c65580bfc\\media__1783585014494.png';
const outputPath = 'd:\\TAP_ACADAMY\\portfolio\\public\\pixel-avatar.png';

async function removeBackground() {
  try {
    const image = sharp(inputPath);
    const { data, info } = await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Top-left pixel color
    const baseR = data[0];
    const baseG = data[1];
    const baseB = data[2];
    console.log(`Top-left pixel color: RGB(${baseR}, ${baseG}, ${baseB})`);

    const totalPixels = info.width * info.height;
    for (let i = 0; i < totalPixels; i++) {
      const idx = i * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      // Calculate distance to the top-left background color
      const dist = Math.sqrt(
        Math.pow(r - baseR, 2) +
        Math.pow(g - baseG, 2) +
        Math.pow(b - baseB, 2)
      );

      // If the pixel color is very close to the background color, make it transparent
      if (dist < 45) {
        data[idx + 3] = 0;
      }
    }

    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .png()
    .toFile(outputPath);

    console.log('Saved processed transparent image to:', outputPath);
  } catch (err) {
    console.error('Error:', err);
  }
}

removeBackground();
