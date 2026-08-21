import fs from 'fs';
import path from 'path';
import https from 'https';

const publicProductsDir = "c:/all stuff/webdev/supplement-uh/main/public/products";

if (!fs.existsSync(publicProductsDir)) {
  fs.mkdirSync(publicProductsDir, { recursive: true });
}

const items = [
  { id: "mk677", url: "https://unitedhormone.com/wp-content/uploads/2026/01/Ibutamoren-MK-677-United-Hormone-280x280.webp", filename: "mk677.webp" },
  { id: "yk11", url: "https://unitedhormone.com/wp-content/uploads/2026/01/Mutant-YK-11-United-Hormone-280x280.webp", filename: "yk11.webp" },
  { id: "mk2866", url: "https://unitedhormone.com/wp-content/uploads/2026/01/Ostarine-MK-2866-United-Hormone-280x280.webp", filename: "mk2866.webp" },
  { id: "bulkmass", url: "https://unitedhormone.com/wp-content/uploads/2026/01/Bulk-Mass-United-Hormone-280x280.webp", filename: "bulkmass.webp" },
  { id: "lgd4033", url: "https://unitedhormone.com/wp-content/uploads/2026/01/Ligandrol-LGD-4033-United-Hormone-280x280.webp", filename: "lgd4033.webp" }
];

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const item of items) {
    const dest = path.join(publicProductsDir, item.filename);
    try {
      await downloadFile(item.url, dest);
      console.log(`Downloaded ${item.filename}`);
    } catch (e) {
      console.error(`Failed to download ${item.filename}:`, e.message);
    }
  }
}

main();
