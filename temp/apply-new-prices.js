const fs = require('fs');
const file = 'build-guides.js';
let src = fs.readFileSync(file, 'utf8');

// id -> store -> price string
const updates = {
  113:{gear4music:'£549.00'},114:{gear4music:'£479.00'},123:{gear4music:'£1124.00'},
  124:{gear4music:'£729.00'},126:{gear4music:'£1742.00'},130:{gear4music:'£125.00'},
  139:{gear4music:'£3050.00'},144:{gear4music:'£286.00'},148:{gear4music:'£2009.00'},
  149:{gear4music:'£504.00'},150:{gear4music:'£188.50'},151:{gear4music:'£407.00'},
  163:{gear4music:'£419.00'},173:{gear4music:'£17.99'},174:{gear4music:'£3499.00'},
  175:{gear4music:'£4337.00'},186:{gear4music:'£2599.00'},187:{gear4music:'£2599.00'},
  191:{gear4music:'£363.50'},193:{gear4music:'£369.00'},
  198:{gear4music:'£106.50'},199:{gear4music:'£319.00'},204:{gear4music:'£284.00'},
  205:{gear4music:'£419.00'},211:{gear4music:'£372.00'},212:{gear4music:'£193.50'},
  214:{gear4music:'£112.75'},215:{gear4music:'£532.00'},216:{gear4music:'£1,016.00'},
  217:{gear4music:'£918.00'},219:{gear4music:'£568.00'},220:{gear4music:'£666.63'},
  328:{gear4music:'£139.99'},375:{gear4music:'£88.00'},377:{gear4music:'£99.00'},
  383:{gear4music:'£62.00'},389:{gear4music:'£126.55'},390:{gear4music:'£39.30'},
  406:{zzounds:'$1,599.99'},408:{zzounds:'$1,399.99'},
  384:{musicstore:'€125'}
};

function applyPrice(line, id, store, price) {
  const p = '"' + price + '"';
  return line.replace(/(\bprices:\s*\{)([^}]*)(\})/, (m, a, body, c) => {
    if (new RegExp('\\b' + store + '\\s*:').test(body)) {
      return a + body.replace(new RegExp(store + '\\s*:\\s*"[^"]*"'), store + ': ' + p) + c;
    }
    return a + store + ': ' + p + (body ? ', ' : '') + body + c;
  });
}

const lines = src.split('\n');
let ok = 0; const fail = {};
const newLines = lines.map((line) => {
  const m = line.match(/^\s*(\d+):\s*\{/);
  if (!m) return line;
  const id = parseInt(m[1]);
  if (!updates[id]) return line;
  let out = line;
  for (const [store, price] of Object.entries(updates[id])) {
    const nxt = applyPrice(out, id, store, price);
    if (nxt === out) (fail[id] = fail[id] || []).push(store);
    else out = nxt;
  }
  if (out !== line) ok++;
  return out;
});
src = newLines.join('\n');
fs.writeFileSync(file, src, 'utf8');
console.log('Applied entries:', ok, '| fails:', JSON.stringify(fail));
