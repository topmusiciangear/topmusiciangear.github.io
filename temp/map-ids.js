var fs = require('fs');
var p = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// All confirmed prices from searches
var raw = {
  "Neumann U 87 Ai": "€2,999.00",
  "Rode NT1 5th Generation": "€199.00",
  "Audio-Technica AT2020": "€98.00",
  "Audio-Technica AT2035": "€179.00",
  "Shure SM57": "€105.00",
  "Sennheiser e 835": "€80.00",
  "AKG C214": "€398.00",
  "Rode NTG5": "€569.00",
  "Lewitt LCT 1040": "€3,190.00",
  "Beyerdynamic M 160": "€798.00",
  "sE Electronics Voodoo VR2": "€539.00",
  "MXL R144": "€137.00",
  "Royer R-121": "€1,935.00",
  "Coles 4038": "€1,279.00",
  "Sennheiser MD 421 Kompakt": "€395.00",
  "Shure SM7B": "€389.00",
  "Electro-Voice RE20": "€522.00",
  "Shure MV7+": "€309.00",
  "Shure SM7dB": "€522.00",
  "Rode PodMic USB": "€239.00",
  "Shure BLX288/PG58": "€595.00",
  "Sennheiser EW-D 835-S": "€675.00",
  "Sony MDR-7506": "€89.00",
  "Beyerdynamic DT 770 Pro": "€149.00",
  "Sennheiser HD 490 Pro": "€333.00",
  "Sennheiser HD 600": "€359.00",
  "Audio-Technica AT2020USB+": "€139.00",
  "Rode NT-USB Mini": "€109.00",
  "Shure MV7+ Podcast Kit": "€329.00",
  "Samson Q2U": "€89.00",
  "Audio-Technica AT2020USB-X": "€129.00",
  "Rode NT-USB": "€109.00",
  "Yamaha HS8": "€289.00",
  "Yamaha HS5": "€165.00",
  "KRK Rokit 7 G5": "€266.00",
  "KRK Rokit 5 G5": "€199.00",
  "JBL 305P MkII": "€159.00",
  "Kali LP-6 V2": "€199.00",
  "Adam Audio A7V": "€629.00",
  "Genelec 8040B": "€879.00",
  "Focal Alpha 65 Evo": "€329.00",
  "Presonus Eris 3.5": "€97.00",
  "Yamaha P-225": "€500.00",
  "Roland FP-30X": "€520.00",
  "Casio CDP-S110": "€319.00",
  "Nord Stage 4 88": "€4,199.00",
  "Yamaha Montage M8x": "€4,728.00",
  "Korg Minilogue XD": "€611.00",
  "Moog Subsequent 37": "€1,992.00",
  "Arturia KeyLab Essential 61 MkIII": "€249.00",
  "Novation Launchkey 61 Mk3": "€279.00",
  "Akai MPK Mini MK3": "€90.00",
  "Focusrite Scarlett 2i2 4th Gen": null,
  "Focusrite Scarlett Solo 4th Gen": null,
  "Universal Audio Volt 2": null,
  "SSL 2+ MKII": null,
  "Audient iD14 MkII": null,
  "MOTU M2": null,
  "RME Babyface Pro FS": null,
  "Steinberg UR22C": null,
};

// Map product titles to IDs using fuzzy matching
var results = {};
Object.keys(raw).forEach(function(title) {
  var price = raw[title];
  if (!price) return;
  
  // Try exact match first
  var match = p.find(function(x) { return x.title === title; });
  
  // Try partial match
  if (!match) {
    var lower = title.toLowerCase();
    match = p.find(function(x) { return x.title && x.title.toLowerCase().indexOf(lower) > -1; });
  }
  
  // Try matching key words
  if (!match) {
    var words = title.toLowerCase().split(' ');
    match = p.find(function(x) {
      if (!x.title) return false;
      var t = x.title.toLowerCase();
      return words.every(function(w) { return t.indexOf(w) > -1; });
    });
  }
  
  if (match) {
    results[match.id] = price;
  } else {
    console.log('NOT FOUND: ' + title);
  }
});

// Output in format for TEST_SHOP_BTN
var lines = [];
Object.keys(results).sort(function(a,b) { return a - b; }).forEach(function(id) {
  lines.push('  ' + id + ': { musicstore: "' + results[id] + '" },');
});
console.log('\n// Music Store prices to add to TEST_SHOP_BTN:');
console.log(lines.join('\n'));
console.log('\nTotal: ' + Object.keys(results).length + ' products');
