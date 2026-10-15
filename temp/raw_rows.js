const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
['beatmaker-plugins','ai-tools-plugins','best-hardware-samplers'].forEach(id => {
  const c = guides.find(x=>x.id===id).comparison;
  console.log('\n############ ' + id);
  console.log('headers: ' + JSON.stringify(c.headers));
  c.rows.forEach((r,i) => {
    const partes = [];
    ['val','val2','val3','val4','val5','val6'].forEach(k => { if (r[k] !== undefined) partes.push(k + '="' + r[k] + '"'); });
    console.log('  [' + i + '] ' + (r.label||'?') + ':');
    console.log('        ' + (partes.join('  ') || '(sin valores)'));
  });
});
console.log('\n\n=== PRECIOS REALES EN EL CATALOGO (para contrastar) ===');
const P = JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json','utf8'));
const arr = Array.isArray(P)?P:P.products;
const b = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js','utf8');
const byTitle = {}; arr.forEach(p=>byTitle[p.title]=p);
['XLN Audio RC-20 Retro Color','Baby Audio Transit 2','Plugin Boutique Scaler 3','Excite Audio Lifeline Expanse','D16 Group Repeater Delay','Excite Audio Motion: Harmonic',
 'Sonible smart:EQ 4','iZotope Neutron 5','Mastering The Mix MIXVAULT','Sonible smart:limit','iZotope Trash'].forEach(t=>{
  const p = byTitle[t]; if(!p) return;
  const m = b.match(new RegExp('(^|\\n)\\s*'+p.id+':\\s*\\{[\\s\\S]*?\\n\\s*\\},','m'));
  const pb = m && m[0].match(/pluginboutique:\s*"([^"]+)"/);
  console.log('  ' + t.padEnd(34) + ' catalogo $' + String(p.price).padEnd(8) + ' PB: ' + (pb?pb[1]:'-'));
});