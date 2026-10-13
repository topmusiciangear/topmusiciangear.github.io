const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
let s = fs.readFileSync(BASE + 'build-guides.js', 'utf8');

// --- 671: remove invented prices + dead URLs, mark all stores unavailable ---
const old671 = s.substring(s.indexOf('\n  671: {'), s.indexOf('\n  666: {'));
const new671 = `
  671: {
    // Samson G-Track Pro: specs verified on samsontech.com, but not carried by any of
    // the 5 shops (zZounds / Andertons 404, Gear4Music + Music Store no product page).
    // No price or URL can be verified, so every row renders as "No disponible".
    oos: ["amazon", "zzounds", "andertons", "gear4music", "musicstore"]
  },`;
s = s.replace(old671, new671);

// --- 291 (AT2020USB-X): drop andertons + musicstore (those URLs pointed at the AT2020USB-XP) ---
const old291 = s.substring(s.indexOf('\n  291: {'), s.indexOf('\n  292: {'));
const new291 = `
  291: {
    prices: {
      gear4music: "£149.00",
      amazon: "$168.00",
      zzounds: "$169.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Audio-Technica-AT2020USBX-Cardioid-Condenser-Microphone/528M"
    },
    oos: [
      "gear4music"
    ]
  },`;
s = s.replace(old291, new291);

fs.writeFileSync(BASE + 'build-guides.js', s);
console.log('build-guides.js patched (671 + 291)');