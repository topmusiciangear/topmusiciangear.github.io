const fs = require('fs');
const ruta = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
const lineas = fs.readFileSync(ruta, 'utf8').split('\n');
let n = 0;
const salida = lineas.map(l => {
  // una entrada del mapa debe terminar en '}},' (o '}}' solo si es la ultima del bloque)
  if (/^\s*\d+: \{prices:\{/.test(l) && /\}\}$/.test(l)) {
    n++;
    return l + ',';
  }
  return l;
});
fs.writeFileSync(ruta, salida.join('\n'), 'utf8');
console.log('comas finales anadidas: ' + n);

// validacion real: cargar el fichero
try {
  const cp = require('child_process');
  cp.execSync('node -e "require(\'./build-guides.js\')"', { cwd: 'C:/Users/Daniel/projects/topmusiciangear', stdio: 'pipe' });
  console.log('build-guides.js SINTAXIS OK');
} catch (e) {
  console.log('sigue con error: ' + (e.stdout ? e.stdout.toString().split('\n').slice(0, 3).join(' | ') : e.message));
}