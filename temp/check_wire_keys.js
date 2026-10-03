const G = require('../data/guides.json');
const s = JSON.stringify(G.find(x => x.id === 'wireless-intercom-systems'));
let i = -1;
while ((i = s.indexOf('inalámbrico real', i + 1)) > -1) {
  const seg = s.slice(Math.max(0, i - 250), i);
  const last = seg.match(/"([a-zA-Z_0-9]+)":"[^"]*$/);
  console.log(last ? last[1] : '??' + seg.slice(-60));
}