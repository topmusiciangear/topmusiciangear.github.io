const fs = require('fs');
const productsContent = fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\products.json', 'utf8');
const products = JSON.parse(productsContent);

const allProductIds = new Set([
  // best-stage-keyboards
  11, 637, 638, 639, 640, 641, 642, 643, 644,
  // best-synth-vsts
  1001, 1002, 1003, 1004, 1005, 1006,
  // best-synthesizers
  639, 142, 143, 475, 476, 477, 478, 174,
  // best-wireless-iems
  349, 267, 266, 347, 348, 350, 362,
  // blues-junior-vs-ac30
  71, 73,
  // blx288-vs-ewd
  91, 93,
  // bridge-cast-x-vs-rodecaster-pro2
  240, 248,
  // budget-bass-like-expensive
  157, 163, 161, 159, 160, 164, 165, 441, 442, 162, 467, 683,
  // budget-headphones
  426, 26, 198, 427, 420, 428, 604, 419,
  // budget-interfaces
  15, 54, 55, 18, 53, 262, 550, 263, 551,
  // budget-mics
  431, 432, 433, 434, 5, 435, 436, 330, 437, 276, 278, 50, 226, 227, 228, 230, 232, 197, 277, 297, 196, 438, 298,
  // budget-monitors
  116, 117, 199, 307, 20, 19,
  // budget-pa-systems
  105, 493, 151, 153, 154,
  // budget-usb-mics
  276, 279, 292, 284, 287, 429, 277, 278, 430, 280, 289, 281,
  // c414-vs-u87
  2, 4,
  // channel-strip-plugins
  119, 29, 60, 62, 121, 379,
  // compact-rhythm-devices
  617, 615, 621, 622, 618, 623, 624, 625, 144, 128,
  // daw-guide
  110, 112, 113, 114, 111, 115,
  // di-box
  445, 446, 447, 448, 450, 449, 451,
  // digitakt-ii-vs-tr8s
  127, 33,
  // dt770-vs-dt990
  23, 56
]);

const productMap = {};
products.forEach(p => {
  if (allProductIds.has(p.id)) {
    productMap[p.id] = {
      title: p.title,
      title_es: p.title_es,
      score: p.score,
      category: p.category,
      price: p.price,
      badge: p.badge
    };
  }
});

Object.keys(productMap).sort((a,b) => a-b).forEach(id => {
  const p = productMap[id];
  console.log(`ID ${id}: ${p.title_es} (${p.title}) - Score: ${p.score} - Category: ${p.category} - Price: $${p.price} - Badge: ${p.badge}`);
});