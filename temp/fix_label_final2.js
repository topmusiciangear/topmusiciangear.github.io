const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const lines = src.split('\n');
const i = 6141;

const oldLine = lines[i];

// Exact search string from the file
const searchPart = "hasAmazon ? '<span style=\\' + SHOP_PRIMARY_FONT + '\\'>Amazon</span>' : '<span style=\"' + SHOP_PRIMARY_FONT + '\">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>'))";

const replacePart = "primaryStoreKey === 'zzounds' ? '<span style=' + SHOP_PRIMARY_FONT + '>zZounds</span>' : primaryStoreKey === 'gear4music' ? '<span style=' + SHOP_PRIMARY_FONT + '>' + SHOP_LOGO_TEXT.gear4music + '</span>' : primaryStoreKey === 'amazon' ? '<span style=' + SHOP_PRIMARY_FONT + '>Amazon</span>' : primaryStoreKey === 'pluginboutique' ? '<span style=' + SHOP_PRIMARY_FONT + '>PluginBoutique</span>' : primaryStoreKey === 'official' ? '<span style=' + SHOP_PRIMARY_FONT + '>Official Store</span>' : primaryStoreKey === 'hollyland' ? '<span style=' + SHOP_PRIMARY_FONT + '>Hollyland</span>' : '<span style=\"' + SHOP_PRIMARY_FONT + '\">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>'))";

if (lines[i].includes(searchPart)) {
  lines[i] = lines[i].replace(searchPart, replacePart);
  console.log('Replaced successfully');
} else {
  console.log('Search part not found');
  console.log('Line contains search:', lines[i].includes("hasAmazon ? '<span style=\\' + SHOP_PRIMARY_FONT + '\\'>Amazon</span>'"));
}

const newSrc = lines.join('\n');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', lines.join('\n'));
try { new Function(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8')); console.log('parsea OK'); }
catch (e) { console.log('ROTO:', e.message); }