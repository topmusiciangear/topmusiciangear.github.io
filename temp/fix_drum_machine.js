const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const p = B + 'data/guides.json';
let t = fs.readFileSync(p, 'utf8');

// 1. FAQ: 64-step sequencer → Elektron's legendary sequencer
const old1 = 'Both share the 64-step sequencer with parameter locks and song mode.';
const new1 = "Both share Elektron's legendary sequencer with parameter locks and song mode.";
if (t.includes(old1)) {
  t = t.split(old1).join(new1);
  console.log('✓ Fix 1: 64-step sequencer → Elektron\'s legendary sequencer');
} else {
  console.log('✗ Fix 1 NOT FOUND');
}

// 2. Verdict: analog overdrive → digital overdrive
const old2 = 'analog overdrive per track';
const new2 = 'digital overdrive per track';
if (t.includes(old2)) {
  t = t.split(old2).join(new2);
  console.log('✓ Fix 2: analog overdrive → digital overdrive');
} else {
  console.log('✗ Fix 2 NOT FOUND');
}

// 3. pound spent → dollar spent
const old3 = 'most fun per pound spent';
const new3 = 'most fun per dollar spent';
if (t.includes(old3)) {
  t = t.split(old3).join(new3);
  console.log('✓ Fix 3: pound spent → dollar spent');
} else {
  console.log('✗ Fix 3 NOT FOUND');
}

try { JSON.parse(t); console.log('✓ JSON parse OK'); } catch(e) { console.error('✗ JSON roto: ' + e.message); process.exit(1); }
fs.writeFileSync(p, t, 'utf8');
console.log('✓ data/guides.json actualizado');
