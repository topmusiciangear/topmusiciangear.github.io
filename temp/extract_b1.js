const fs = require('fs');
const f = 'C:/Users/Daniel/.local/share/opencode/tool-output/tool_10bd81206001fsKVzep18JjpRQ';
const t = fs.readFileSync(f, 'utf8');
const a = t.indexOf('[{');
const b = t.lastIndexOf('}]');
const s = t.slice(a, b + 2);
function getStr(from, key) {
  const k = '"' + key + '":"';
  const i = s.indexOf(k, from);
  if (i === -1) return null;
  let j = i + k.length, out = '';
  while (j < s.length) {
    const c = s[j];
    if (c === '\\') { out += c + (s[j + 1] || ''); j += 2; continue; }
    if (c === '"') return { val: out, end: j + 1 };
    out += c; j++;
  }
  return null;
}
const out = [];
let pos = 0, n = 0;
while (true) {
  const gi = s.indexOf('"g":"', pos);
  if (gi === -1) break;
  const g = getStr(gi, 'g'); if (!g) break;
  const h = getStr(g.end, 'heading'); if (!h) break;
  const he = getStr(h.end, 'heading_es'); if (!he) break;
  const c = getStr(he.end, 'content'); if (!c) break;
  const ce = getStr(c.end, 'content_es'); if (!ce) break;
  const pi = s.indexOf('"products":', ce.end);
  const pm = s.slice(pi, pi + 40).match(/"products":\[([\d,\s]+)\]/);
  if (!pm) break;
  try {
    out.push({
      g: JSON.parse('"' + g.val + '"'),
      sec: {
        heading: JSON.parse('"' + h.val + '"'),
        heading_es: JSON.parse('"' + he.val + '"'),
        content: JSON.parse('"' + c.val + '"'),
        content_es: JSON.parse('"' + ce.val + '"'),
        products: JSON.parse('[' + pm[1] + ']')
      }
    });
    n++;
  } catch (e) { console.log('BADVAL at entry ' + n + ': ' + e.message); break; }
  pos = pi + 12;
}
console.log('extracted: ' + out.length);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/batch1.json', JSON.stringify(out));