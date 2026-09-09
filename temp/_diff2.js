const fs = require('fs');
const orig = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\data\\guides.json', 'utf8'));
const nid = new Set(['acoustic-guitars-guide','audient-vs-motu','best-amp-modelers','best-compact-mixers','best-electric-guitar','best-in-ear-monitors','best-looper-pedals','best-overdrive-distortion','best-ribbon-mics','budget-interfaces','channel-strip-plugins','ew-iem-g4-twin-vs-psm300','guitar-bass-amps','katana-vs-dsl','midi-controllers','precision-vs-jazz','pro-interfaces','pro-synths','sidechain-modulation-plugins','stage-wireless','tracking-headphones','zlx-vs-k12']);
const guid = JSON.parse(fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\temp\\_nat_chunk3.json', 'utf8'));
const oById = {};
orig.filter(g => nid.has(g.id)).forEach(g => oById[g.id] = g);

// Verify order matches guides.json relative order
const origOrder = orig.filter(g => nid.has(g.id)).map(g => g.id);
const outOrder = guid.map(g => g.id);
console.log('Order matches guides.json:', JSON.stringify(outOrder) === JSON.stringify(origOrder));
if (JSON.stringify(outOrder) !== JSON.stringify(origOrder)) {
  console.log('expected:', origOrder.join(','));
  console.log('output:  ', outOrder.join(','));
}

let count = 0;
guid.forEach(ng => {
  const og = oById[ng.id];
  function walk(o, n, path) {
    if (typeof o === 'string' && typeof n === 'string') {
      if (o !== n) {
        count++;
        console.log('### ' + ng.id + ' :: ' + path + '\n  OLD: ' + o + '\n  NEW: ' + n + '\n');
      }
    } else if (Array.isArray(o) && Array.isArray(n)) {
      o.forEach((x, idx) => walk(x, n[idx], path + '[' + idx + ']'));
    } else if (o && n && typeof o === 'object' && typeof n === 'object') {
      Object.keys(o).forEach(k => {
        if (k in n) walk(o[k], n[k], path + '.' + k);
      });
    } else if (o !== n) {
      console.log('!!! TYPE/STRUCTURE MISMATCH at ' + ng.id + ' :: ' + path);
    }
  }
  walk(og, ng, '');
});
console.log('Total changed strings:', count);