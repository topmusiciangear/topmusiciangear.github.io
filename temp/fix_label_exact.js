const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const lines = src.split('\n');
const i = 6141;

const oldLine = lines[i];

// The exact search string from the file (with escaped single quotes \')
const searchPart = "(hasAmazon ? '<span style=\\' + SHOP_PRIMARY_FONT + '\\'>Amazon</span>' : '<span style=\"' + SHOP_PRIMARY_FONT + '\">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>'))";

const replacePart = "(primaryStoreKey === 'zzounds' ? '<span style=' + SHOP_PRIMARY_FONT + '>zZounds</span>' : primaryStoreKey === 'gear4music' ? '<span style=' + SHOP_PRIMARY_FONT + '>' + SHOP_LOGO_TEXT.gear4music + '</span>' : primaryStoreKey === 'amazon' ? '<span style=' + SHOP_PRIMARY_FONT + '>Amazon</span>' : primaryStoreKey === 'pluginboutique' ? '<span style=' + SHOP_PRIMARY_FONT + '>PluginBoutique</span>' : primaryStoreKey === 'official' ? '<span style=' + SHOP_PRIMARY_FONT + '>Official Store</span>' : primaryStoreKey === 'hollyland' ? '<span style=' + SHOP_PRIMARY_FONT + '>Hollyland</span>' : '<span style=\"' + SHOP_PRIMARY_FONT + '\">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>'))";

if (lines[i].includes(searchPart)) {
  lines[i] = lines[i].replace(searchPart, replacePart);
  console.log('Replaced successfully');
} else {
  console.log('Search part not found');
  // Debug: find the exact substring
  const idx = lines[i].indexOf("hasAmazon ?");
  if (idx > -1) {
    console.log('Found "hasAmazon ?" at:', idx);
    console.log('Context:', lines[i].slice(idx, idx + 150));
  }
}

const newSrc = lines.join('\n');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', lines.join('\n'));
try { new Function(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8')); console.log('parsea OK'); }
catch (e) { console.log('ROTO:', e.message); }