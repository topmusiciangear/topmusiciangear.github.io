const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(BASE+'data/guides.json','utf8'));
const P = JSON.parse(fs.readFileSync(BASE+'data/products.json','utf8'));
const arr = Array.isArray(P)?P:P.products;
const byId = {}; arr.forEach(p=>byId[p.id]=p);

const CASOS = [
  ['pro-microphones', ['Austrian Audio OC818','Sennheiser e 906','Beyerdynamic M 201 TG'], 'Neumann U 87 Ai', 'Lewitt LCT1040 Ultimate Microphone System'],
  ['pro-monitors', ['Neumann KH 120-II','Dynaudio Core 7','Focal Trio6 ST6','Focal Twin6 ST6'], 'ADAM Audio S3H', 'Focal Trio11 Be'],
];

CASOS.forEach(([gid, fuera, queda1, queda2]) => {
  const g = guides.find(x=>x.id===gid);
  const idFuera = fuera.map(t => (arr.find(p=>p.title===t)||{}).id);
  console.log('\n############################################ ' + gid);
  console.log('   ' + g.title);
  console.log('   deben quedar: ' + queda1 + '  vs  ' + queda2);
  console.log('   sobran: ' + fuera.join(' , ') + '   (ids ' + idFuera.join(',') + ')');

  console.log('\n   SECCIONES QUE SE BORRAN:');
  g.sections.forEach((s,i)=>{
    if ((s.products||[]).some(p=>idFuera.indexOf(p)>-1)) {
      const txt = String(s.content||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
      console.log('     [' + i + '] ' + (s.heading||s.h));
      console.log('         ES: ' + (s.heading_es||s.h_es));
      console.log('         texto EN (' + txt.length + ' car): ' + txt.slice(0,170) + '...');
    }
  });
  console.log('\n   VEREDICTOS QUE SE BORRAN:');
  g.verdictProsCons.forEach(v=>{
    const p = arr.find(x=>x.title===(v.name||v.title));
    if (p && idFuera.indexOf(p.id)>-1) console.log('     - ' + (v.name||v.title) + '  [' + v.pros.length + ' pros / ' + v.cons.length + ' contras, EN+ES]');
  });
  console.log('\n   TARJETAS QUE DESAPARECEN:');
  fuera.forEach(t=>{ const p=arr.find(x=>x.title===t); console.log('     - ' + t + ' (id ' + (p?p.id:'?') + ')'); });
  console.log('\n   SECCIONES QUE SE QUEDAN:');
  g.sections.forEach((s,i)=>{ if (!(s.products||[]).some(p=>idFuera.indexOf(p)>-1)) console.log('     [' + i + '] ' + (s.heading||s.h)); });
  console.log('\n   featuredProducts actual: ' + JSON.stringify(g.featuredProducts));
  const f = g.featuredSnippet||{};
  console.log('   tabla vs: ' + (f.name1_en||'-') + ' | ' + (f.name2_en||'-'));
  if (f.name2_en && f.name2_en.indexOf('Lewitt')>-1) console.log('   !! el titulo de la tabla dice "' + f.name2_en + '" y el producto es "Lewitt LCT1040 Ultimate Microphone System"');
});