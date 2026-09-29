const { execSync } = require('child_process');
const fs = require('fs');
const vm = require('vm');
const revs = process.argv.slice(2);
revs.forEach(r => {
  let src;
  try { src = execSync('git show ' + r + ':js/shop-buttons.js', { maxBuffer: 1 << 28 }).toString('utf8'); }
  catch (e) { console.log(r + ': cannot read -> ' + String(e.message).slice(0, 60)); return; }
  let status;
  try { new vm.Script(src); status = 'PARSE OK'; }
  catch (e) { status = 'PARSE FAIL: ' + e.message.slice(0, 70); }
  console.log(r + '  ' + src.length + ' bytes  ' + status);
});
