const fs = require('fs');
const file = 'build-guides.js';
let src = fs.readFileSync(file, 'utf8');

const g4mPrices = {
  223:'£2,149.99',224:'£1,786.00',227:'£150.00',228:'£151.25',229:'£249.00',230:'£75.00',
  236:'£1,139.00',237:'£1,452.00',240:'£358.00',244:'£239.50',247:'£699.00',250:'£261.50',
  252:'£177.00',257:'£339.00',258:'£249.99',259:'£414.00',264:'£229.99',266:'£1,135.00',
  274:'£309.00',275:'£349.00',276:'£95.00',286:'£135.50',290:'£99.99',291:'£149.00',
  292:'£85.30',293:'£302.50',294:'£279.00',299:'£120.00',300:'£499.00',302:'£499.00',
  303:'£293.50',305:'£504.42',306:'£267.50',308:'£650.00',313:'£149.00',314:'£398.00',
  315:'£295.00',318:'£1,690.00',320:'£799.00',321:'£508.00',322:'£599.00',325:'£380.00',
  330:'£16.80',332:'£540.00',333:'£246.00',334:'£1,708.00',337:'£1,565.79',339:'£739.00',
  345:'£189.00',346:'£173.75',347:'£180.82',348:'£482.39',352:'£179.00',353:'£499.00',
  354:'£499.00',355:'£339.00',356:'£189.00',357:'£515.00',359:'£87.70',361:'£886.00',
  395:'£428.00',396:'£289.00',397:'£544.00',406:'£1,510.00'
};

function setG4mPrice(line, id, price) {
  const p = '"' + price + '"';
  // if prices object already has gear4music key, replace it
  const withG = /(\bprices:\s*\{)([^}]*)(\})/;
  return line.replace(withG, (m, a, body, c) => {
    if (/\bgear4music\s*:/.test(body)) {
      return a + body.replace(/gear4music\s*:\s*"[^"]*"/, 'gear4music: ' + p) + c;
    }
    // insert right after prices: {
    return a + 'gear4music: ' + p + (body ? ', ' : '') + body + c;
  });
}

const lines = src.split('\n');
let ok = 0, fail = [];
const newLines = lines.map((line) => {
  const m = line.match(/^\s*(\d+):\s*\{/);
  if (!m) return line;
  const id = parseInt(m[1]);
  if (!g4mPrices[id]) return line;
  const updated = setG4mPrice(line, id, g4mPrices[id]);
  if (updated === line) { fail.push(id); return line; }
  ok++;
  return updated;
});
src = newLines.join('\n');
fs.writeFileSync(file, src, 'utf8');
console.log('Applied g4m prices:', ok, '| no-change/fail:', fail.join(','));
