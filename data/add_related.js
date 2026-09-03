var fs = require('fs');
var text = fs.readFileSync('data/guides.json', 'utf8');
// Strip BOM if present
if (text.charCodeAt(0) === 0xFEFF) text = text.substring(1);
var data = JSON.parse(text);

var relatedMap = {
  "pro-headphones": ["budget-headphones", "open-headphones", "tracking-headphones", "best-headphones", "best-headphones-for-mixing", "pro-monitors"],
  "pro-microphones": ["budget-mics", "usb-mics", "stage-mics", "best-condenser-mics", "best-microphone", "sm57-vs-sm58"],
  "pro-monitors": ["budget-monitors", "best-monitors", "monitor-setup", "studio-subwoofers", "small-room-monitors", "hs8-vs-rokit-7"],
  "pro-interfaces": ["budget-interfaces", "best-interface", "portable-interfaces", "scarlett-vs-ssl", "scarlett-vs-volt", "apollo-vs-babyface"],
  "pro-guitars": ["best-electric-guitar", "beginner-guitar", "fender-guide", "american-pro-vs-les-paul", "player-strat-vs-pacifica", "best-electric-under-500"],
  "pro-synths": ["best-synthesizers", "best-keyboard", "nord-stage-4-vs-montage-m8x", "best-digital-pianos"],
  "pro-drum-machines": ["best-drum-machine", "best-grooveboxes", "digitakt-ii-vs-tr8s", "beat-making"],
  "pro-plugins": ["best-plugins", "mixing-plugins", "fx-plugins", "vocal-plugins", "channel-strip-plugins", "fabfilter-vs-ozone"],
  "pro-keyboards": ["best-keyboard", "best-digital-pianos", "best-synthesizers", "nord-stage-4-vs-montage-m8x"],
  "pro-live-sound": ["best-live-sound-mixers", "best-pa-speakers", "active-vs-passive-pa", "zlx-vs-k12", "dxr-vs-prx"],
  "pro-mixers": ["best-analog-mixers", "best-digital-mixers", "best-compact-mixers", "xr18-vs-m32r", "xr18-vs-cq18t"],
  "pro-daw": ["daw-guide", "best-daw-for-beginners", "ableton-vs-fl-studio", "pro-tools-vs-cubase", "ableton-vs-logic"]
};

data.forEach(function(g) {
  if (relatedMap[g.id]) {
    g.relatedGuides = relatedMap[g.id];
  }
});

var out = JSON.stringify(data, null, 2) + '\n';
fs.writeFileSync('data/guides.json', out, 'utf8');
console.log('Done - added relatedGuides to ' + Object.keys(relatedMap).length + ' pro-guides');
