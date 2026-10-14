const fs = require('fs');
let src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');

// The bug: primary button label shows "Amazon" when hasAmazon is true, even if primary is zzounds
// Fix: replace the ternary logic to show the correct primary store name

const oldLabelLogic = "hasAmazon ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>Amazon</span>' : isDaw ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>' + SHOP_LOGO_TEXT.gear4music + '</span>' : isPlugins ? '<span style=\\' + SHOP_PRIMARY_FONT + '\\'>PluginBoutique</span>' : (hasAmazon ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>Amazon</span>' : '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>')";

const newLabelLogic = "primaryStoreKey === 'zzounds' ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>zZounds</span>' : primaryStoreKey === 'gear4music' ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>' + SHOP_LOGO_TEXT.gear4music + '</span>' : primaryStoreKey === 'amazon' ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>Amazon</span>' : primaryStoreKey === 'pluginboutique' ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>PluginBoutique</span>' : primaryStoreKey === 'official' ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>Official Store</span>' : primaryStoreKey === 'hollyland' ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>Hollyland</span>' : '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>'";

if (src.indexOf(oldLabelLogic) > -1) {
  src = src.replace(oldLabelLogic, newLabelLogic);
  console.log('Label logic fixed');
} else {
  console.log('Pattern not found, searching...');
  // search for the pattern more flexibly
  const idx = src.indexOf("hasAmazon ? '<span style=' + SHOP_PRIMARY_FONT + '>Amazon</span>' : isDaw");
  if (idx > -1) {
    console.log('Found at:', idx);
    console.log(src.slice(idx, idx+500));
  }
}

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', src);
try { new Function(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8')); console.log('parsea OK'); }
catch (e) { console.log('ROTO:', e.message); }