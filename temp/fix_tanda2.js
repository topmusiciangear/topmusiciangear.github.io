const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
let n = 0; const fallos = [];
function swap(de, a) {
  const t0 = JSON.stringify(g);
  if (!t0.includes(de)) { fallos.push(de.slice(0, 60)); return; }
  n += t0.split(de).length - 1;
  (function rec(o) {
    if (typeof o === 'string') return o.split(de).join(a);
    if (Array.isArray(o)) return o.map(rec);
    if (o && typeof o === 'object') { Object.keys(o).forEach(k => { o[k] = rec(o[k]); }); }
    return o;
  })(g);
}
swap('Antes de los foros, antes del hype, estaba el HD 600', 'Antes de los foros, antes de la moda, estaba el HD 600');
swap('El tono es limpio y sin hype en vez de broadcast grueso', 'El tono es limpio y sin artificios en vez de un broadcast grueso');
swap('Elige la caja según tu proceso, no según el hype', 'Elige la caja según tu proceso, no según la moda');
swap('El micro streamer que cubre tu setup actual y el futuro', 'El micro streamer que cubre tu equipo actual y el futuro');
swap('Depende de tu setup. El Shure MV7+', 'Depende de tu equipo. El Shure MV7+');
swap('sin recablear para cambiar de setup', 'sin recablear para cambiar de configuración');
swap('¿Cuál es mejor para un setup de streaming con doble PC?', '¿Cuál es mejor para un equipo de streaming con doble PC?');
swap('cabe en cualquier pedalboard o bolsillo de bolsa de gig', 'cabe en cualquier pedalera o bolsillo de la funda');
swap('puedes tirar en una bolsa de gig', 'puedes tirar en una funda de transporte');
swap('Tiene ese carácter punchy y medio que corta en la mezcla', 'Tiene ese carácter contundente y medio que corta en la mezcla');
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('aplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
