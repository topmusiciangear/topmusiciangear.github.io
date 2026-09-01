var fs = require('fs');
var products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Products with Andertons prices in TEST_SHOP_BTN but potentially no direct URL
var ids = [20, 62, 63, 67, 112, 120, 122, 125, 203, 220, 223, 224, 294, 310, 311, 325, 429, 430, 431, 434, 438];

// Known Andertons direct URLs
var andertonsUrls = {
  20: 'https://www.andertons.co.uk/krk-rokit-rp7-g5-in-black-monitor-speaker-7-bass-driver/',
  62: 'https://www.andertons.co.uk/fabfilter-pro-q4-24band-e-qesd/',
  63: 'https://www.andertons.co.uk/fabfilter-pro-c-3-high-quality-professional-compressor-esd/',
  112: 'https://www.andertons.co.uk/fl-studio-20-producer-edition-esd/',
  120: 'https://www.andertons.co.uk/celemony-melodyne-5-studio-esd/',
  203: 'https://www.andertons.co.uk/boss-gx-1-guitar-effects-processor/',
  220: 'https://www.andertons.co.uk/Neumann-KH120-II-Active-Studio-Monitor-EACH/',
  223: 'https://www.andertons.co.uk/focal-trio6-st6-studio-monitor-3-way-speaker-with-1-tweeter-a-5-woofer-8-subwoofer/',
  294: 'https://www.andertons.co.uk/Positive-Grid-Spark-2-50w-Practice-Amp/',
  310: 'https://www.andertons.co.uk/squier-affinity-stratocaster-black/',
  311: 'https://www.andertons.co.uk/squier-classic-vibe-50s-stratocaster-in-black/',
  325: 'https://www.andertons.co.uk/m-audio-hammer-88-88-key-hammer-action-usb-midi-controller/',
  431: 'https://www.andertons.co.uk/se-electronics-v7-super-cardioid-dynamic-vocal-mic/',
  434: 'https://www.andertons.co.uk/akg-project-studio-p120-condenser-microphone/',
  438: 'https://www.andertons.co.uk/samson-c01-condenser-mic/'
};

ids.forEach(function(id) {
  var p = products.find(function(x) { return x.id === id; });
  if (!p) { console.log('ID ' + id + ': NOT FOUND in products.json'); return; }
  var hasUrl = p.stores && p.stores.andertons;
  var hasUrlOverride = andertonsUrls[id];
  console.log('ID ' + id + ' (' + p.title.substring(0, 40) + '): ' +
    (hasUrl ? 'HAS URL: ' + p.stores.andertons.substring(0, 60) : 'NO URL') +
    (hasUrlOverride ? ' -> NEW: ' + hasUrlOverride.substring(0, 60) : ''));
});
