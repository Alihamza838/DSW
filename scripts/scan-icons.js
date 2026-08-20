import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TARGET_DIR = path.resolve(__dirname, "../src/components");

// Emoji regex matching most unicode emojis and symbols
const EMOJI_REGEX = /([\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}])/gu;

function scanDir(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath, results);
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      const lines = content.split("\n");
      const matches = [];

      lines.forEach((line, index) => {
        // Find emojis
        let match;
        const emojiRegex = new RegExp(EMOJI_REGEX);
        while ((match = emojiRegex.exec(line)) !== null) {
          // Ignore flag emojis inside CountryFlag component definitions if intended
          matches.push({
            lineNumber: index + 1,
            char: match[0],
            lineSnippet: line.trim()
          });
        }
      });

      if (matches.length > 0) {
        results.push({
          filePath: path.relative(path.resolve(__dirname, ".."), fullPath),
          matches
        });
      }
    }
  }

  return results;
}

console.log(`\n🔍 Scanning ${TARGET_DIR} for non-Lucide emoji & icon usage...\n`);

const results = scanDir(TARGET_DIR);

if (results.length === 0) {
  console.log("✨ All clean! No non-standard emojis or raw icons found in src/components.");
} else {
  let totalMatches = 0;
  results.forEach(({ filePath, matches }) => {
    console.log(`📄 \x1b[33m${filePath}\x1b[0m (${matches.length} found):`);
    matches.forEach(({ lineNumber, char, lineSnippet }) => {
      totalMatches++;
      console.log(`   Line ${lineNumber}: [${char}] -> "${lineSnippet.slice(0, 80)}"`);
    });
    console.log("");
  });

  console.log(`--------------------------------------------------`);
  console.log(`📊 Summary: ${totalMatches} emoji/raw-icon occurrences across ${results.length} files in src/components.\n`);
}
