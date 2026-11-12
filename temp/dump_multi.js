// Contextos de multitrack, mothership, Staging de ganancia en guides.json para clasificar EN vs ES
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const t = fs.readFileSync(B + 'data/guides.json', 'utf8');
const NEEDLES = ['multitrack', 'mothership', 'Staging de ganancia'];
const out = [];
for (const needle of NEEDLES) {
  let idx = 0;
  while ((idx = t.indexOf(needle, idx)) >= 0) {
    const a = Math.max(0, idx - 130), b = Math.min(t.length, idx + needle.length + 130);
    out.push('### «' + needle + '» @' + idx + '\n' + t.slice(a, b).replace(/\s+/g, ' ') + '\n');
    idx += needle.length;
  }
}
fs.writeFileSync(B + 'temp/multi_mothership_ctx.txt', out.join('\n'), 'utf8');
console.log('total: ' + out.length);
