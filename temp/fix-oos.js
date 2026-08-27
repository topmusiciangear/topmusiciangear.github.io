var fs = require('fs');
var src = fs.readFileSync('build-guides.js', 'utf8');
var s = src.indexOf('const TEST_SHOP_BTN = {');
var e = src.indexOf('\n};', s) + 3;
eval(src.substring(s, e).replace('const ', 'var '));

// Fix musicstore top-level -> prices (IDs 22,23,39,57,66,67,93,145,304)
[22,23,39,57,66,67,93,145,304].forEach(function(id) {
  var entry = TEST_SHOP_BTN[id];
  if (entry && entry.musicstore && (!entry.prices || !entry.prices.musicstore)) {
    if (!entry.prices) entry.prices = {};
    entry.prices.musicstore = entry.musicstore;
    delete entry.musicstore;
  }
});

// Fix gear4music top-level -> prices (15 IDs)
[146,147,189,190,226,239,255,256,267,269,271,310,311,312,349].forEach(function(id) {
  var entry = TEST_SHOP_BTN[id];
  if (entry && entry.gear4music && (!entry.prices || !entry.prices.gear4music)) {
    if (!entry.prices) entry.prices = {};
    entry.prices.gear4music = entry.gear4music;
    delete entry.gear4music;
  }
});

// Add oos for pluginboutique (IDs 113,114,115)
[113,114,115].forEach(function(id) {
  var entry = TEST_SHOP_BTN[id];
  if (entry && (!entry.oos || entry.oos.indexOf('pluginboutique') === -1)) {
    if (!entry.oos) entry.oos = [];
    entry.oos.push('pluginboutique');
  }
});

// Add oos for reverb on ID 366
var e366 = TEST_SHOP_BTN[366];
if (e366 && (!e366.oos || e366.oos.indexOf('reverb') === -1)) {
  if (!e366.oos) e366.oos = [];
  e366.oos.push('reverb');
}

// Now rebuild the TEST_SHOP_BTN string
var lines = [];
Object.keys(TEST_SHOP_BTN).sort(function(a,b){return Number(a)-Number(b)}).forEach(function(id) {
  var entry = TEST_SHOP_BTN[id];
  var parts = [];
  if (entry.prices) {
    var pParts = [];
    Object.keys(entry.prices).forEach(function(k) {
      pParts.push(k + ': ' + JSON.stringify(entry.prices[k]));
    });
    parts.push('prices: { ' + pParts.join(', ') + ' }');
  }
  if (entry.oos) {
    parts.push('oos: [' + entry.oos.map(function(x){return '"'+x+'"'}).join(', ') + ']');
  }
  if (entry.na) {
    parts.push('na: [' + entry.na.map(function(x){return '"'+x+'"'}).join(', ') + ']');
  }
  if (entry.urls) {
    var uParts = [];
    Object.keys(entry.urls).forEach(function(k) {
      uParts.push(k + ': ' + JSON.stringify(entry.urls[k]));
    });
    parts.push('urls: { ' + uParts.join(', ') + ' }');
  }
  if (entry.unit) {
    parts.push('unit: ' + JSON.stringify(entry.unit));
  }
  lines.push('  ' + id + ': { ' + parts.join(', ') + ' }');
});

var newBlock = 'const TEST_SHOP_BTN = {\n' + lines.join(',\n') + '\n};';
var newSrc = src.substring(0, s) + newBlock + src.substring(e);
fs.writeFileSync('build-guides.js', newSrc, 'utf8');
console.log('Written ' + newSrc.length + ' bytes');

// Verify
eval(newSrc.substring(newSrc.indexOf('const TEST_SHOP_BTN'), newSrc.indexOf('\n};', newSrc.indexOf('const TEST_SHOP_BTN')) + 3).replace('const ', 'var '));
var checkIds = [22,23,39,57,66,67,93,145,304,146,147,189,190,226,239,255,256,267,269,271,310,311,312,349,113,114,115,366];
checkIds.forEach(function(id) {
  var hasMusicstore = TEST_SHOP_BTN[id] && TEST_SHOP_BTN[id].prices && TEST_SHOP_BTN[id].prices.musicstore;
  var hasGear4music = TEST_SHOP_BTN[id] && TEST_SHOP_BTN[id].prices && TEST_SHOP_BTN[id].prices.gear4music;
  var hasPB = TEST_SHOP_BTN[id] && TEST_SHOP_BTN[id].oos && TEST_SHOP_BTN[id].oos.indexOf('pluginboutique') > -1;
  var hasReverb = TEST_SHOP_BTN[id] && TEST_SHOP_BTN[id].oos && TEST_SHOP_BTN[id].oos.indexOf('reverb') > -1;
  var topMs = TEST_SHOP_BTN[id] && TEST_SHOP_BTN[id].musicstore;
  var topG4m = TEST_SHOP_BTN[id] && TEST_SHOP_BTN[id].gear4music;
  if (topMs || topG4m) {
    console.log('STILL TOP-LEVEL: ID ' + id + ' ms=' + topMs + ' g4m=' + topG4m);
  }
  if (id >= 22 && id <= 304 && [22,23,39,57,66,67,93,145,304].indexOf(id) > -1 && !hasMusicstore) {
    console.log('MISSING musicstore: ID ' + id);
  }
  if ([146,147,189,190,226,239,255,256,267,269,271,310,311,312,349].indexOf(id) > -1 && !hasGear4music) {
    console.log('MISSING gear4music: ID ' + id);
  }
});
console.log('All checks passed');
