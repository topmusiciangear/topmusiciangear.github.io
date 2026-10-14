var fs = require('fs');
var p = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
var raw = fs.readFileSync(p, 'utf8');
var eol = raw.indexOf('\r\n') >= 0 ? '\r\n' : '\n';
var lines = raw.split(eolome);

// FIX 1 - heading fallback (single line, no newline -> used indexOf for safety)
var sHead = 0;
for (var i = 0; i < lines.length; i++) {
  if (lines[i].indexOf('const h = isEs && s.heading_es ? s.heading_es : s.heading;') >= 0) { sHead++; if (sHead != 1) { console.log('ABORT fix1 multi=' + sHead); process.exit(1); } lines[i] = lines[i].replace('s.heading_es ? s.heading_es : s.heading', "(s.heading_es || s.h_es || '') ? (s.heading_es || s.h_es || '') : (s.heading || s.h || '')"); }
}
if (sHead !== 1) { console.log('ABORT fix1 missing'); process.exit(1); }
console.log('fix1 OK');

// FIX 2 - generate-loop guard, line-based, anchored to 'buildGuidePage(' call
var genIdx = -1;
for (var j = 0; j < lines.length; j++) {
  if (lines[j].indexOf('const html = buildGuidePage(guide, lang, idx);') >= 0) { genIdx = j; break; }
}
if (genIdx === -1) { console.log('ABORT fix2 callline not found'); process.exit(1); }
// walk back to the guides.forEach( for THIS loop
var forEachIdx = -1;
for (var k = genIdx; k >= 0; k--) {
  var tl = lines[k].trim();
  if (tl === 'guides.forEach((guide, idx) => {') { forEachIdx = k; break; }
}
if (forEachIdx === -1) { console.log('ABORT fix2 forEach not found'); process.exit(1); }
console.log('forEach at line ' + (forEachIdx + 1) + ', call at line ' + (genIdx + 1));
var spacer = lines[forEachIdx].replace(/\S.*$/, '');
var guardLines = [
  spacer + "var onlyIds = process.env.ONLY_GUIDES ? process.env.ONLY_GUIDES.split(',') : null;",
  lines[forEachIdx],
  spacer + "if (onlyIds && onlyIds.indexOf(guide.id) === -1) return;"
];
var newLines = [];
for (var x = 0; x < lines.length; x++) {
  if (x === forEachIdx) { newLines = newLines.concat(guardLines); } else { newLines.push(lines[x]); }
}
fs.writeFileSync(pgn, newLines.join(eol), 'utf8');
console.log('patched OK');
