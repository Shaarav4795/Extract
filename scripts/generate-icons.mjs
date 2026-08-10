import { accessSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const iconsDirectory = join(root, "public", "icons");

mkdirSync(iconsDirectory, { recursive: true });

for (const size of [16, 32, 48, 128]) {
  const icon = join(iconsDirectory, `icon${size}.png`);
  accessSync(icon);
  console.log(`preserved ${icon} (${size}x${size})`);
}
