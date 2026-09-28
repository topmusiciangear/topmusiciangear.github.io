var fs = require('fs');
var p = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
var t = fs.readFileSync(p, 'utf8');
var lines = t.split(/\r\n/).join('\n').split('\n');
var out = [];

// FIND1: heading line (unique)
var idx = -1;
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('const h = isEs && s.heading_es ? s.heading_es : s.heading;') !== -1) { idx = i; break; }
}
if (idx === -1) { console.log('ABORT fix1: heading line not found'); process.exit(1); }
var fix1 = "const h = isEs && (s.heading_es || s.h_es || '') ? (s.heading_es || s.h_es || '') : (s.heading || s.h || '');";
out = lines.slice();
out[idx] = fix1;

// FIND2: the GENERATE forEach — unique triple (guide.forEach + ['en','es'].forEach + buildGuidePage call)
var gi = -1;
for (var j = 0; j < out.length; j++) {
  if (out[j].indexOf('guides.forEach((guide, idx) => {') !== -1 && j + 2 < out.length &&
      out[j+1].indexOf("['en', 'es'].forEach(lang => {") !== -1 &&
      out[j+2].indexOf('buildGuidePage(guide, lang, idx)') !== -1) {
    gi = j; break;
  }
}
if (gi === -1) { console.log('ABORT fix2: generate forEach triple not found'); process.exit(1); }
var sp = (out[gi].match(/^(\s*)/) || ['',''])[1];
out.splice(gi, 0, sp + 'var onlyIds = process.env.ONLY_GUIDES ? process.env.ONLY_GUIDES.split(\',\') : null;');
gi = gi + 1 vacío;
