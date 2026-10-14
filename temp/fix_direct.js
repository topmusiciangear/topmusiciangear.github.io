const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const lines = src.split('\n');
const i = 6141;

// Extract the EXACT substring from the file to use as search key
const line = lines[6141];
const idx = line.indexOf('hasAmazon ?');
const searchPart = line.slice(idx, idx + 180); // Get exact 180 chars from file

console.log('Extracted searchPart:', searchPart);
console.log('Length:', searchPart.length);

// Verify it exists
console.log('Line includes extracted:', lines[6141].includes(searchPart));

const replacePart = "primaryStoreKey === 'zzounds' ? '<span style=' + SHOP_PRIMARY_FONT + '>zZounds</span>' : primaryStoreKey === 'gear4music' ? '<span style=' + SHOP_PRIMARY_FONT + '>' + SHOP_LOGO_TEXT.gear4music + '</span>' : primaryStoreKey === 'amazon' ? '<span style=' + SHOP_PRIMARY_FONT + '>Amazon</span>' : primaryStoreKey === 'pluginboutique' ? '<span style=' + SHOP_PRIMARY_FONT + '>PluginBoutique</span>' : primaryStoreKey === 'official' ? '<span style=' + SHOP_PRIMARY_FONT + '>Official Store</span>' : primaryStoreKey === 'hollyland' ? '<span style=' + SHOP_PRIMARY_FONT + '>Hollyland</span>' : '<span style=\"' + SHOP_PRIMARY_FONT + '\">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>')";

if (lines[6141].includes(searchPart)) {
  lines[6141] = lines[6141].replace(searchPart, replacePart);
  console.log('Replaced successfully');
} else {
  console.log('Search part not found');
}

const newSrc = lines.join('\n');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', lines.join('\n'));
try { new Function(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8')); console.log('parsea OK'); }
catch (e) { console.log('ROTO:', e.message); }