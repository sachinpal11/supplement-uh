import fs from 'fs';
import path from 'path';

const publicDir = "c:/all stuff/webdev/supplement-uh/main/public";

const file1 = path.join(publicDir, "third-component.png");
const file2 = path.join(publicDir, "thirdcomponent.png");

if (fs.existsSync(file1)) {
  fs.copyFileSync(file1, file2);
  console.log("Copied third-component.png to thirdcomponent.png");
} else if (fs.existsSync(file2)) {
  fs.copyFileSync(file2, file1);
  console.log("Copied thirdcomponent.png to third-component.png");
}
