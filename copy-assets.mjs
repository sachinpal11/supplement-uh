import fs from 'fs';

const src1 = "C:/Users/sachi/.gemini/antigravity-ide/brain/f47f9c33-2473-46b6-b4bd-e0015e993094/macro_shoulder_1787306479633.jpg";
const src2 = "C:/Users/sachi/.gemini/antigravity-ide/brain/f47f9c33-2473-46b6-b4bd-e0015e993094/macro_chest_1787306506664.jpg";

const dest1 = "c:/all stuff/webdev/supplement-uh/main/public/macro-shoulder.jpg";
const dest2 = "c:/all stuff/webdev/supplement-uh/main/public/macro-chest.jpg";

fs.copyFileSync(src1, dest1);
fs.copyFileSync(src2, dest2);
console.log("Copied macro-shoulder.jpg and macro-chest.jpg to public directory successfully.");
