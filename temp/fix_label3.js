const fs = require('fs');
let src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');

// Find the exact location and do a precise replacement
const searchStr = "hasAmazon ? '<span style=' + SHOP_PRIMARY_FONT + '>Amazon</span>' : '<span style=\"' + SHOP_PRIMARY_FONT + '\">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>')";

const replaceStr = "primaryStoreKey === 'zzounds' ? '<span style=' + SHOP_PRIMARY_FONT + '>zZounds</span>' : primaryStoreKey === 'gear4music' ? '<span style=' + SHOP_PRIMARY_FONT + '>' + SHOP_LOGO_TEXT.gear4music + '</span>' : primaryStoreKey === 'amazon' ? '<span style=' + SHOP_PRIMARY_FONT + '>Amazon</span>' : primaryStoreKey === 'pluginboutique' ? '<span style=' + SHOP_PRIMARY_FONT + '>PluginBoutique</span>' : primaryStoreKey === 'official' ? '<span style=' + SHOP_PRIMARY_FONT + '>Official Store</span>' : primaryStoreKey === 'hollyland' ? '<span style=' + SHOP_PRIMARY_FONT + '>Hollyland</span>' : '<span style=\"' + SHOP_PRIMARY_FONT + '\">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>')";

if (src.indexOf(searchStr) > -1) {
  src = src.replace(searchStr, replaceStr);
  console.log('Replaced successfully');
} else {
  console.log('Search string not found exactly');
  // Find it with a more flexible approach
  const idx = src.indexOf("hasAmazon ? '<span style=' + SHOP_PRIMARY_FONT + '>Amazon</span>'");
  if (idx > -1) {
    console.log('Found at index:', idx);
    // Get the full expression
    let parenCount = 0;
    let start = idx;
    let end = -1;
    for (let i = idx; i < src.length; i++) {
      if (src[i] === '(') parenCount++;
      else if (src[i] === ')') { parenCount--; if (parenCount === 0) { end = i; break; } }
    }
    if (end > -1) {
      const fullExpr = src.slice(idx, end + 1);
      console.log('Full expression:', fullExpr);
    }
  }
}

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', src);
try { new Function(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8')); console.log('parsea OK'); }
catch (e) { console.log('ROTO:', e.message); }