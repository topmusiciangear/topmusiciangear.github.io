const fs = require('fs');
const h = fs.readFileSync('guides/stream-controllers.html', 'utf8');
const idx = h.indexOf('What Products Are in This Guide');
if (idx > -1) {
  const section = h.slice(idx, idx + 20000);
  const j = section.indexOf('data-id="671"');
  if (j > -1) console.log('data-id 671 EN:', j, section.slice(j, j + 500));
  else console.log('data-id 671 NO');
  
  const k = section.indexOf('Behringer FLOW 8');
  if (k > -1) console.log('Behringer FLOW 8 EN:', k, section.slice(k, k + 500));
  else console.log('Behringer FLOW 8 NO');
  
  const l = section.indexOf('FLOW 8');
  if (l > -1) console.log('FLOW 8 EN:', l, section.slice(l, l + 500));
  else console.log('FLOW 8 NO');
}