const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
function repAll(gid, oldS, newS) {
  const g = G.find(x => x.id === gid);
  let n = 0;
  const walk = o => {
    if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) { if (typeof o[i] === 'string' && o[i].includes(oldS)) { o[i] = o[i].split(oldS).join(newS); n++; } else walk(o[i]); } }
    else if (o && typeof o === 'object') { for (const k of Object.keys(o)) { if (typeof o[k] === 'string' && o[k].includes(oldS)) { o[k] = o[k].split(oldS).join(newS); n++; } else walk(o[k]); } }
  };
  walk(g);
  console.log(gid + ' replaced in ' + n + ' fields :: ' + oldS.slice(0, 60));
}
// x2 duplicates -> replace everywhere in guide
repAll('budget-monitors', "the JBL 305P MkII is the monitor I recommend when someone says 'I want great sound but I'm on a shoestring budget.", "the JBL 305P MkII is the monitor to recommend for great sound on a shoestring budget.");
repAll('best-5-string-basses', 'How do I stop my low B from sounding floppy?', 'How to stop a low B from sounding floppy?');
repAll('best-bass-home-office', 'Can I practice bass silently in an apartment?', 'Can bass be practiced silently in an apartment?');
repAll('best-bass-home-office', 'Can I take these basses on a plane?', 'Can these basses travel on a plane?');
// x0 actual-string fixes (incl. pdiales typo)
repAll('budget-interfaces', 'He ayudado a principiantes que saturaban cada toma con cajas de pdiales a ciegas, y con una medición así clavaron niveles al instante.', 'Los principiantes que saturan cada toma con cajas de mandos a ciegas clavan los niveles al instante con una medición así.');
repAll('budget-interfaces', 'He mezclado pistas de cajas planas frente a entradas coloreadas SSL, y estas últimas necesitaron menos cirugía para sentirse terminadas.', 'Las pistas de cajas planas frente a entradas coloreadas SSL muestran que estas últimas necesitan menos retoques para sonar terminadas.');
fs.writeFileSync(F, JSON.stringify(G, null, 2));