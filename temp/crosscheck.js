const { execSync } = require('child_process');
function getGuides(rev) {
  const raw = execSync('git show ' + rev + ':data/guides.json', { maxBuffer: 300 * 1024 * 1024 }).toString();
  return JSON.parse(raw);
}
// Era limpia (antes de la corrupcion) vs era corrupta vs HEAD actual
const clean = getGuides('302f1377d6');
const corrupt = getGuides('70f22f5173');
const head = JSON.parse(require('fs').readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8'));

function fieldDiff(a, b) {
  const diffs = [];
  const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
  keys.forEach(k => {
    if (['sections', 'verdictProsCons', 'productTable', 'featuredProducts'].includes(k)) return;
    const va = JSON.stringify(a ? a[k] : undefined);
    const vb = JSON.stringify(b ? b[k] : undefined);
    if (va !== vb) diffs.push(k);
  });
  return diffs;
}

console.log('=== 302f1377d6 (limpio) vs 70f22f5173 (corrupto): que cambio ADEMAS de nulos? ===');
clean.forEach(gc => {
  const gx = corrupt.find(x => x.id === gc.id);
  if (!gx) { console.log(gc.id + ': ELIMINADA en era corrupta'); return; }
  const fd = fieldDiff(gc, gx);
  const secN0 = (gc.sections || []).length, secN1 = (gx.sections || []).length;
  const vpc0 = (gc.verdictProsCons || []).length, vpc1 = (gx.verdictProsCons || []).length;
  const extra = [];
  if (secN0 !== secN1) extra.push('sections ' + secN0 + '->' + secN1);
  if (vpc0 !== vpc1) extra.push('vpc ' + vpc0 + '->' + vpc1);
  if (fd.length || extra.length) console.log(gc.id + ': campos [' + fd.join(',') + '] ' + extra.join(' '));
});
console.log('');
console.log('=== HEAD actual vs 302f1377d6: diferencias INTENCIONALES? ===');
let ndiff = 0;
clean.forEach(gc => {
  const gh = head.find(x => x.id === gc.id);
  if (!gh) { console.log(gc.id + ': FALTA en HEAD!!'); return; }
  const fd = fieldDiff(gc, gh);
  const secD = (gc.sections || []).length !== (gh.sections || []).length;
  const vpcD = (gc.verdictProsCons || []).length !== (gh.verdictProsCons || []).length;
  // comparar tablas
  const t0 = JSON.stringify(gc.productTable?.columns?.map(c => c.title));
  const t1 = JSON.stringify(gh.productTable?.columns?.map(c => c.title));
  if (fd.length || secD || vpcD || t0 !== t1) {
    ndiff++;
    console.log(gc.id + ': campos[' + fd.join(',') + '] secs:' + (gc.sections || []).length + '->' + (gh.sections || []).length + ' vpc:' + (gc.verdictProsCons || []).length + '->' + (gh.verdictProsCons || []).length + ' tabla:' + (t0 === t1 ? 'igual' : 'CAMBIO'));
  }
});
console.log('guias con diferencias HEAD vs limpio: ' + ndiff);