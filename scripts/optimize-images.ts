import fs from "fs";
import path from "path";
import sharp from "sharp";

async function processDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) return;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if ([".png", ".jpg", ".jpeg"].includes(ext)) {
        const baseName = path.basename(entry.name, ext);
        const webpPath = path.join(dirPath, `${baseName}.webp`);
        const avifPath = path.join(dirPath, `${baseName}.avif`);

        try {
          const image = sharp(fullPath);
          const metadata = await image.metadata();

          if (!fs.existsSync(webpPath)) {
            await image.clone().webp({ quality: 80 }).toFile(webpPath);
            console.log(`🖼️  Generated WebP: ${path.relative(process.cwd(), webpPath)} (${metadata.width}x${metadata.height})`);
          }

          if (!fs.existsSync(avifPath)) {
            await image.clone().avif({ quality: 65 }).toFile(avifPath);
            console.log(`🖼️  Generated AVIF: ${path.relative(process.cwd(), avifPath)} (${metadata.width}x${metadata.height})`);
          }
        } catch (err) {
          console.error(`Error processing image ${fullPath}:`, err);
        }
      }
    }
  }
}

async function generatePwaIcons(publicDir: string) {
  const svgPath = path.join(publicDir, "icon.svg");
  if (!fs.existsSync(svgPath)) return;

  try {
    const iconSizes = [16, 32, 48, 72, 96, 128, 144, 180, 192, 384, 512];

    for (const size of iconSizes) {
      await sharp(svgPath)
        .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(path.join(publicDir, `icon-${size}.png`));
    }

    await sharp(svgPath).resize(16, 16).png().toFile(path.join(publicDir, "favicon-16x16.png"));
    await sharp(svgPath).resize(32, 32).png().toFile(path.join(publicDir, "favicon-32x32.png"));
    await sharp(svgPath).resize(48, 48).png().toFile(path.join(publicDir, "favicon-48x48.png"));
    await sharp(svgPath).resize(64, 64).png().toFile(path.join(publicDir, "favicon.png"));

    await sharp(svgPath).resize(180, 180).png().toFile(path.join(publicDir, "apple-touch-icon.png"));
    await sharp(svgPath).resize(180, 180).png().toFile(path.join(publicDir, "apple-touch-icon-precomposed.png"));

    // Maskable icon with 10% safe zone padding and solid dark background
    await sharp(svgPath)
      .resize(410, 410, { fit: "contain", background: { r: 15, g: 23, b: 41, alpha: 0 } })
      .extend({
        top: 51,
        bottom: 51,
        left: 51,
        right: 51,
        background: { r: 15, g: 23, b: 41, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, "icon-maskable.png"));

    console.log("🎨 Generated comprehensive PWA PNG icons for all device viewports!");
  } catch (err) {
    console.error("Error generating PWA icons:", err);
  }
}

async function main() {
  console.log("⚡ Running pre-build Image Optimization Script (WebP & AVIF & PWA Icons)...");
  const publicDir = path.resolve(process.cwd(), "public");
  await generatePwaIcons(publicDir);
  await processDirectory(publicDir);
  console.log("✅ Image optimization complete.");
}

main();
