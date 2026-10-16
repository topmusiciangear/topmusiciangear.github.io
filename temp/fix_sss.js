const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const gg = g.find(x => x.id === 'studio-subwoofers-setup');
let S = JSON.stringify(gg);
let n = 0; const fallos = [];
function swap(de, a) {
  if (!S.includes(de)) { fallos.push(de.slice(0, 70)); return; }
  n += S.split(de).length - 1;
  S = S.split(de).join(a);
}
swap('su amplificador de 180W llegan hasta 16 Hz', 'su amplificador de 180 W llegan hasta 16 Hz');
swap('impulsado por un amplificador MOSFET Clase AB de 300W enfriado', 'impulsado por un amplificador MOSFET en Clase AB de 300 W enfriado');
swap('El amplificador BASH Clase G de 600W RMS / 1000W de pico', 'El amplificador BASH en Clase G de 600 W RMS / 1.000 W de pico');
swap('su amplificador Clase D de 400W llegan hasta 19 Hz', 'su amplificador en Clase D de 400 W llegan hasta 19 Hz');
swap('Cada gabinete entrega 500W (1000W el par)', 'Cada gabinete entrega 500 W (1.000 W el par)');
swap('su amplificador Clase-D de 256W llegan hasta 16 Hz', 'su amplificador en Clase D de 256 W llegan hasta 16 Hz');
swap('si sube, empareja con nivel, no con EQ.', 'si sube, empareja con nivel, no con ecualización.');
swap('y mueve el control de fase caminando entre los monitores.', 'y ajusta el control de fase mientras caminas entre los monitores.');
swap('>mejores subwoofers de estudio por menos de $700</a>', '>Mejores subwoofers de estudio por menos de $700</a>');
swap('>KH 750 DSP vs Genelec 7050C</a>', '>Neumann KH 750 DSP vs Genelec 7050C: duelo</a>');
swap('>comparativas de monitores pro</a>', '>ADAM S3H vs Focal Trio11 Be: monitores de tres vías</a>');
g[g.indexOf(gg)] = JSON.parse(S);
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('\naplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
