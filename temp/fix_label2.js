const fs = require('fs');
let src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');

const oldLogic = "hasAmazon ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>Amazon</span>' : '<span style=\"' + SHOP_PRIMARY_FONT + '">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>')";

const newLogic = "primaryStoreKey === 'zzounds' ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>zZounds</span>' : primaryStoreKey === 'gear4music' ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>' + SHOP_LOGO_TEXT.gear4music + '</span>' : primaryStoreKey === 'amazon' ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>Amazon</span>' : primaryStoreKey === 'pluginboutique' ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>PluginBoutique</span>' : primaryStoreKey === 'official' ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>Official Store</span>' : primaryStoreKey === 'hollyland' ? '<span style=\\'' + SHOP_PRIMARY_FONT + '\\'>Hollyland</span>' : '<span style=\"' + SHOP_PRIMARY_FONT + '\">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>')";

if (src.indexOf(oldLogic) > -1) {
  src = src.replace(oldLogic, newLogic);
  console.log('Label logic fixed');
} else {
  console.log('Old logic not found exactly, trying flexible search...');
  const idx = src.indexOf("hasAmazon ? '<span style=' + SHOP_PRIMARY_FONT + '>Amazon</span>' : '<span style=\"");
  if (idx > -1) {
    console.log('Found at:', idx);
    const before = src.slice(0, idx);
    const after = src.slice(idx + oldLogic.length);
    // We need to find the exact oldLogic in the source
    console.log('Context:', src.slice(idx-50, idx+200));
  }
}

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', src);
try { new Function(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8')); console.log('parsea OK'); }
catch (e) { console.log('ROTO:', e.message); }