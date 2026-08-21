import fs from 'fs';
import path from 'path';

const brainDir = "C:/Users/sachi/.gemini/antigravity-ide/brain/f47f9c33-2473-46b6-b4bd-e0015e993094";
const publicDir = "c:/all stuff/webdev/supplement-uh/main/public";

const files = fs.readdirSync(brainDir);

const p1 = files.find(f => f.startsWith("product_01"));
const p2 = files.find(f => f.startsWith("product_02"));
const p3 = files.find(f => f.startsWith("product_03"));

if (p1) {
  fs.copyFileSync(path.join(brainDir, p1), path.join(publicDir, "product-01.png"));
  fs.copyFileSync(path.join(brainDir, p1), path.join(publicDir, "product-01.jpg"));
  console.log("Copied product-01");
}

if (p2) {
  fs.copyFileSync(path.join(brainDir, p2), path.join(publicDir, "product-02.png"));
  fs.copyFileSync(path.join(brainDir, p2), path.join(publicDir, "product-02.jpg"));
  console.log("Copied product-02");
}

if (p3) {
  fs.copyFileSync(path.join(brainDir, p3), path.join(publicDir, "product-03.png"));
  fs.copyFileSync(path.join(brainDir, p3), path.join(publicDir, "product-03.jpg"));
  console.log("Copied product-03");
}
