const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
let bg = fs.readFileSync(B + 'build-guides.js', 'utf8');

// Fix the malformed 684 block: normalize to compact format and add trailing comma
const old684 = `  684: {
     prices: { amazon: "$149.99", gear4music: "£115.00", andertons: "£105.00", zzounds: "$149.99", musicstore: "€138.00" }
   }`;
const new684 = `  684: {prices:{amazon:"$149.99",gear4music:"£115.00",andertons:"£105.00",zzounds:"$149.99",musicstore:"€138.00"}},`;

if (bg.includes(old684)) {
  bg = bg.replace(old684, new684);
  console.log('Fixed 684 block');
} else {
  console.log('684 block not found exactly, trying line-by-line...');
  const lines = bg.split('\n');
  const idx = lines.findIndex(l => l.includes('684:'));
  if (idx !== -1) {
    // Replace lines idx through idx+2 with the fixed version
    lines.splice(idx, 3, new684);
    bg = lines.join('\n');
    console.log('Fixed 684 via line splice');
  }
}

fs.writeFileSync(B + 'build-guides.js', bg, 'utf8');

try {
  new Function(bg);
  console.log('SYNTAX OK');
} catch(e) {
  console.log('SYNTAX ERROR: ' + e.message);
  // Show context around error
  const match = e.message.match(/line (\d+)/i);
}
