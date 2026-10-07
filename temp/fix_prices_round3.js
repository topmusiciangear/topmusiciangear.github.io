const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const byId = id => {
  const g = G.find(v => v.id === id);
  if (!g) throw new Error('guide not found: ' + id);
  return g;
};
const V = (value, value_es) => ({ value, value_es });

// --- best-overdrive-distortion: cols 4-8 prices (verified: SW/GC/Fulltone) ---
{
  const g = byId('best-overdrive-distortion');
  const row = g.productTable.rows.find(r => r.label === 'Estimated Price');
  const want = ['—', '—', '—', '—', '—'];
  row.values.slice(3, 8).forEach((c, k) => { if (c.value !== want[k]) throw new Error('od cell ' + k + ': ' + c.value); });
  const set = (i, p) => { row.values[i].value = p; row.values[i].value_es = p; };
  set(3, '$179.00');            // OCD v2: Sweetwater $179 + Fulltone official $179
  set(4, '$193.41–$199.97');    // Tumnus Deluxe: SW $193.41, GC $199.97
  set(5, '$199.00');            // Morning Glory V4: SW + zzounds $199
  set(6, '$99.99');             // Distortion+: GC + SW $99.99
  set(7, '$184.99');            // BD-2W: Sweetwater $184.99
  console.log('overdrive prices filled');
}

// --- best-looper-pedals: cols 3-8 (Infinity->Infinity 2 rename, Looperboard stays —) ---
{
  const g = byId('best-looper-pedals');
  let t = JSON.stringify(g);
  const n = t.split('"Pigtronix Infinity Looper"').length - 1;
  if (n !== 4) throw new Error('expected 4x Infinity Looper, found ' + n);
  t = t.split('"Pigtronix Infinity Looper"').join('"Pigtronix Infinity 2"');
  const ng = JSON.parse(t);
  G[G.findIndex(v => v.id === 'best-looper-pedals')] = ng;
  const row = ng.productTable.rows.find(r => r.label === 'Estimated Price');
  const want = ['—', '—', '—', '—', '—', '—'];
  row.values.slice(2, 8).forEach((c, k) => { if (c.value !== want[k]) throw new Error('lp cell ' + k + ': ' + c.value); });
  const set = (i, p) => { row.values[i].value = p; row.values[i].value_es = p; };
  set(2, '$319.99–$349.99');    // RC-500: SW $319.99 sale / $349.99
  set(3, '$219.00–$229.00');    // Ditto X4: GC $219, SW $229 (zzounds: no longer available)
  set(4, '$181.40');            // EHX 720: SW/GC $181.40 (EHX MAP)
  set(5, '$199.00');            // Infinity 2: Pigtronix official + SW $199
  // 6 Looperboard: discontinued, no verified new price -> stays —
  set(7, '$149.99–$159.99');    // Clone: SW/GC $149.99, zzounds $159.99
  console.log('looper prices filled (+Infinity 2 rename)');
}

// --- best-multi-effects-pedals: cols 5-8 ---
{
  const g = byId('best-multi-effects-pedals');
  const row = g.productTable.rows.find(r => r.label === 'Estimated Price');
  const want = ['—', '—', '—', '—'];
  row.values.slice(4, 8).forEach((c, k) => { if (c.value !== want[k]) throw new Error('mfx cell ' + k + ': ' + c.value); });
  const set = (i, p) => { row.values[i].value = p; row.values[i].value_es = p; };
  set(4, '$799.99');            // G11: GC $799.99 + Zoom official $799.99
  set(5, '$599.99–$659.99');    // GT-1000CORE: SW $599.99, GC $659.99
  set(6, '$1,799.00');          // QC: SW/Amazon/CME $1,799
  set(7, '$475.00');            // GE300: Thomann $475
  console.log('multi-effects prices filled');
}

fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('guides.json written');
