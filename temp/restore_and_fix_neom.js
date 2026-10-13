const fs = require('fs');
const { execSync } = require('child_process');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'build-guides.js';

// Recover the 669 + 670 blocks that were accidentally dropped
const prev = execSync('git show HEAD~2:build-guides.js', { cwd: BASE, maxBuffer: 1 << 28 }).toString();

function extractBlock(src, key) {
  const needle = '\n  ' + key + ': {';
  const i = src.indexOf(needle);
  if (i === -1) throw new Error(key + ' not found in prev');
  const b = src.indexOf('{', i);
  let depth = 0, k = b;
  while (k < src.length) {
    if (src[k] === '{') depth++;
    else if (src[k] === '}') { depth--; if (depth === 0) break; }
    k++;
  }
  let end = k + 1;
  if (src[end] === ',') end++;
  return src.substring(i, end);
}

const b669 = extractBlock(prev, '669');
const b670 = extractBlock(prev, '670');
console.log('--- recovered 669 ---'); console.log(b669);
console.log('--- recovered 670 (will be updated with user data) ---'); console.log(b670);

// Current file
let s = fs.readFileSync(F, 'utf8');
if (s.indexOf('\n  669: {') !== -1) throw new Error('669 already present, abort');
if (s.indexOf('\n  670: {') !== -1) throw new Error('670 already present, abort');

// New 670 with the user-verified URLs + prices
const new670 = `
  670: {
    prices: {
      amazon: "$169.00",
      zzounds: "$169.00",
      andertons: "£69.00",
      gear4music: "£69.00",
      musicstore: "€115.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/sE-Electronics-NEOM-USB-Condenser-Microphone/4OZA",
      andertons: "https://www.andertons.co.uk/se-electronics-neom-usb-cardioid-condenser-microphone/?search_query=sE%20Electronics%20NEOM%20USB",
      musicstore: "https://www.musicstore.com/en_OE/EUR/sE-electronics-NEOM/art-REC0015955-000"
    }
  },`;

// Insert both right before the 671 block
const anchor = s.indexOf('\n  671: {');
if (anchor === -1) throw new Error('671 anchor not found');
s = s.substring(0, anchor) + b669 + new670 + s.substring(anchor);

fs.writeFileSync(F, s);
console.log('\nInserted 669 + updated 670.');

// Verify syntax
new (require('vm').Script)(s, { filename: 'build-guides.js' });
console.log('SYNTAX OK');

['669', '670', '671'].forEach(k => {
  const i = s.indexOf('\n  ' + k + ': {');
  console.log(k + ' @' + i + ' present=' + (i !== -1));
});