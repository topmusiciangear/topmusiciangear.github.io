const fs = require('fs');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/125.0';
const chk = (label, src) => {
  try { new Function(src); console.log(label + ': PARSE OK (' + src.length + ' bytes)'); return true; }
  catch (e) { console.log(label + ': PARSE FAIL -> ' + e.message); return false; }
};
(async () => {
  chk('LOCAL  js/shop-buttons.js', fs.readFileSync('js/shop-buttons.js', 'utf8'));
  const r = await fetch('https://topmusiciangear.com/js/shop-buttons.js?v=' + Date.now(), { headers: { 'User-Agent': UA } });
  chk('LIVE   js/shop-buttons.js', await r.text());
  const src = fs.readFileSync('temp/gen-shop-buttons.js', 'utf8');
  console.log('gen script references: ' + (src.match(/writeFileSync\([^)]*\)/g) || []).join(' | '));
  const dep = fs.readFileSync('temp/deploy.js', 'utf8');
  console.log('deploy mentions shop-buttons: ' + /shop-buttons/.test(dep));
  (dep.match(/.*shop-buttons.*/g) || []).slice(0, 6).forEach(l => console.log('  deploy> ' + l.trim().slice(0, 140)));
})();
