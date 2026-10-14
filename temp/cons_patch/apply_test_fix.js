var fs=require('fs');
var BG=fs.readFileSync('build-guides.js','utf8');
var TEST=JSON.parse(fs.readFileSync('temp/cons_patch/TEST_SHOP_BTN_updated.json','utf8'));

// Find and replace TEST_SHOP_BTN block
var idx = BG.indexOf('TEST_SHOP_BTN');
var braceIdx = BG.indexOf('{', idx);
var brace=0, endIdx=-1;
for(var i=braceIdx;i<BG.length;i++){
  if(BG[i]==='{') brace++;
  else if(BG[i]==='}'){ brace--; if(brace===0){ endIdx=i; break; } }
}

// Use JSON.stringify with replacer for formatting
var newBlock = 'const TEST_SHOP_BTN = '+JSON.stringify(TEST, null, 2)+';';

// Need to match original formatting (single quotes, etc.) - but JSON.stringify uses double quotes
// Just replace the block
var newBG = BG.slice(0,braceIdx) + newBlock + BG.slice(endIdx+1);

fs.writeFileSync('build-guides.js', newBG, 'utf8');
console.log('build-guides.js updated with fixed TEST_SHOP_BTN');