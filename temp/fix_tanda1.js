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
// dB-A -> dBA en todo el sitio
swap('dB-A', 'dBA');
// caballo de batalla (prohibido por norma del sitio) -> todoterreno / clásico
swap('El Audix i5 es el caballo de batalla hecho en EE. UU.', 'El Audix i5 es el todoterreno hecho en EE. UU.');
swap('El Yamaha MG16XU es el caballo de batalla analógico', 'El Yamaha MG16XU es el todoterreno analógico');
swap('Yamaha CBR12: el caballo de batalla pasivo', 'Yamaha CBR12: el todoterreno pasivo');
swap('Caballo de batalla vocal en vivo', 'Clásico vocal en vivo');
// bundle genérico -> pack (nombres de producto no se tocan)
swap('silencio insignia sin bundle insignia', 'silencio insignia sin pack insignia');
swap('Silencio insignia sin bundle insignia', 'Silencio insignia sin pack insignia');
swap('Bundle (basado en Kontakt)', 'Pack (basado en Kontakt)');
swap('Cada plugin en este bundle es el mejor en su clase. Es caro, pero es el último bundle de m', 'Cada plugin en este pack es el mejor en su clase. Es caro, pero es el último pack de m');
swap('¿Cuál es el mejor bundle de plugins para masterizar para principiantes?', '¿Cuál es el mejor pack de plugins para masterizar para principiantes?');
swap('El bundle es caro, pero cada plugin es de primera clase', 'El pack es caro, pero cada plugin es de primera clase');
swap('con un bundle caro. Compra plugins de pago', 'con un pack caro. Compra plugins de pago');
swap('es el bundle más creativo e inspirador', 'es el pack más creativo e inspirador');
swap('Soundtoys 5.5 es el bundle imprescindible', 'Soundtoys 5.5 es el pack imprescindible');
swap('es el bundle más divertido y con mejor relación calidad-precio', 'es el pack más divertido y con mejor relación calidad-precio');
swap('como el bundle de Soundtoys les dan personalidad', 'como el pack de Soundtoys les dan personalidad');
swap('el bundle Soundtoys 5.5 cubre los tres', 'el pack Soundtoys 5.5 cubre los tres');
swap('un bundle creativo como Soundtoys te da más opciones', 'un pack creativo como Soundtoys te da más opciones');
swap('Soundtoys 5.5 es el bundle clave', 'Soundtoys 5.5 es el pack clave');
swap('Bundle Multi-FX (21 efectos)', 'Pack Multi-FX (21 efectos)');
swap('El bundle UAD Ultimate 14 incluye', 'El pack UAD Ultimate 14 incluye');
swap('El bundle es excesivo si sólo necesitas', 'El pack es excesivo si sólo necesitas');
swap('El bundle tiene sentido cuando quieres el set completo', 'El pack tiene sentido cuando quieres el set completo');
swap('Bundle de plugins', 'Pack de plugins');
fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');
console.log('aplicados: ' + n + '  fallos: ' + fallos.length);
fallos.forEach(f => console.log('  FALLA: ' + f));
const t = JSON.stringify(JSON.parse(fs.readFileSync(F, 'utf8')));
console.log('restos dB-A: ' + (t.match(/dB-A/g) || []).length);
console.log('restos caballo de batalla: ' + (t.match(/caballo de batalla/gi) || []).length);
console.log('mojibake: ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
