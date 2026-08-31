// Test shopButtonsTest in isolation
var fs = require('fs');

// Mock browser globals
global.window = { currentGuideCategory: '' };
global.document = { documentElement: { lang: 'en' } };

// Evaluate shop-buttons.js (defines flagBadge, SHOP_LOGO_TEXT, etc.)
eval(fs.readFileSync('js/shop-buttons.js', 'utf8'));

// Mock getResolvedStores (from app.js)
function getResolvedStores(product) {
  var allStoreKeys = ['pluginboutique','gear4music','amazon','reverb','andertons','musicstore','zzounds','official','macappstore'];
  var searchUrls = {
    pluginboutique: function(t) { return 'https://www.pluginboutique.com/search?q=' + encodeURIComponent(t) + '&a_aid=6a01e859cbe1a'; },
    gear4music: function(t) { return 'https://www.gear4music.com/search?q=' + encodeURIComponent(t); },
    amazon: function(t) { return 'https://www.amazon.com/s?k=' + encodeURIComponent(t) + '&tag=topmusicg-20'; },
    reverb: function(t) { return 'https://reverb.com/marketplace?query=' + encodeURIComponent(t); },
    andertons: function(t) { return 'https://www.andertons.co.uk/search.php?search_query=' + encodeURIComponent(t) + '&irgwc=1&irpid=7292297'; },
    musicstore: function(t) { return 'https://www.musicstore.com/en_GB/search?SearchText=' + encodeURIComponent(t); },
    zzounds: function() { return 'https://www.zzounds.com/a--925521/'; }
  };
  var s = {};
  var excluded = product.excludeStores || [];
  allStoreKeys.forEach(function(key) {
    if (excluded.includes(key)) return;
    if (key === 'amazon' && product.category === 'plugins') return;
    if (key === 'pluginboutique' && product.category !== 'plugins' && product.category !== 'daw') return;
    var specificUrl = product.stores[key];
    if (specificUrl) {
      s[key] = specificUrl;
    } else if (searchUrls[key]) {
      s[key] = searchUrls[key](product.title);
    }
  });
  if (s.reverb) {
    s.reverb = 'https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=' + encodeURIComponent(s.reverb);
  }
  return s;
}

// Test products
var testProducts = [
  { id: 189, title: 'EVH 5150III 100W Head', category: 'amplifiers', stores: { gear4music: 'https://www.gear4music.com/Guitar-and-Bass/EVH-5150III-100W-Head-Black/18A8', andertons: 'https://www.andertons.co.uk/evh-5150-iii/', amazon: 'https://www.amazon.com/dp/B001R2NRYG', musicstore: 'https://www.musicstore.com/en_OE/EUR/EVH-5150III-100W-Head/art-GIT0032423-000', zzounds: 'https://www.zzounds.com/a--925521/item--EVH2251000' }, excludeStores: [] },
  { id: 1, title: 'Shure SM7B', category: 'microphones', stores: { amazon: 'https://amazon.com/dp/B0002E4Z8M', zzounds: 'https://zzounds.com/item--SHUSM7B' }, excludeStores: [] },
  { id: 386, title: 'FabFilter Pro-Q 4', category: 'plugins', stores: { pluginboutique: 'https://www.pluginboutique.com/product/4-Effects/39-FX-Bundle/11094-FabFilter-Pro-Q-4', amazon: 'https://amazon.com/dp/B0D5' }, excludeStores: [] },
  { id: 112, title: 'Test DAW', category: 'daw', stores: { gear4music: 'https://www.gear4music.com/DAW', official: 'https://www.apple.com/logic-pro/' }, excludeStores: [] },
];

testProducts.forEach(function(p) {
  try {
    var result = shopButtonsTest(p, false);
    console.log('ID ' + p.id + ' (' + p.title.substring(0, 30) + '): ' + (result ? 'OK (length=' + result.length + ')' : 'EMPTY'));
    if (result) {
      console.log('  Has shop-btn-primary:', result.includes('shop-btn-primary'));
    }
  } catch(e) {
    console.log('ID ' + p.id + ' ERROR: ' + e.message);
    console.log('  Stack: ' + e.stack.split('\n').slice(0, 3).join(' | '));
  }
});
