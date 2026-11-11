const fs = require('fs');
let txt = fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/seo_audit.json', 'utf8');
txt = txt.replace(/^\ufeff/, '').replace(/^\uFEFF/, '');
if (txt.charCodeAt(0) === 0xFFFE || txt.charCodeAt(0) === 0xFEFF) txt = txt.slice(1);
// PowerShell puede escribir UTF-16LE: detectar y decodificar
if (txt.charCodeAt(0) === 0x0D0A || /[\u0000-\u0008\u000E-\u001F]/.test(txt.slice(0, 4))) {
  const buf = fs.readFileSync('C:/Users/Daniel/AppData/Local/Temp/opencode/seo_audit.json');
  if (buf[0] === 0xFF && buf[1] === 0xFE) txt = buf.slice(2).toString('utf16le');
  else if (buf[0] === 0x7B) txt = buf.toString('utf8');
}
const r = JSON.parse(txt);
const byIssue = {};
r.failures.forEach(function (f) {
  f.issues.forEach(function (i) {
    const k = i.replace(/"[^"]*"/, '"X"').replace(/\d+ (chars|px) \([^)]*\)/, 'N').trim();
    byIssue[k] = (byIssue[k] || 0) + 1;
  });
});
console.log(JSON.stringify(byIssue, null, 1));
r.failures.slice(0, 60).forEach(function (f) { console.log(f.file, '|', f.issues.join(' | ')); });
