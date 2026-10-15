// Mayusculas indebidas REALES en titulos ES.
// Solo palabras COMUNES (no marcas, no productos, no siglas).
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const gf = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gf, 'utf8'));

// Palabras comunes que deben ir en minuscula dentro de un titulo espanol
const COMUNES_MAL = [
  'Compresor','Mastering','Productores','Muebles','Escritorios','Racks',
  'Cajas','Ritmos','Grooveboxes','Genelec','Válvulas','Válvulas',
  'Arreglar','Clipping','Podcast','Samplers','Creación','Practicar',
  'Overdrive','Distorsión','Reverb','Delay','Sintetizadores','Compact',
  'Muebles','Equipo','Beat-Making','Loop','Multi-Efectos','Instrumento',
  'Cuñas','Subwoofers','Streaming','Hardware','Beatmakers','Modeladores',
  'Shotgun','In-Ear','Parlor','Herramientas','Sidechain','Modulación',
  'Creator','Controller','Cuñas','Cantos','Codificación','Formación'
];

const cambios = [];
guides.forEach(g => {
  ['title_es','titleTag_es'].forEach(campo => {
    let v = g[campo];
    if (typeof v !== 'string') return;
    const original = v;
    COMUNES_MAL.forEach(pal => {
      // reemplazar solo si NO esta al inicio del titulo y NO forma parte de un nombre de producto
      // caso: "Overdrive" dentro de "pedales de Overdrive y Distorsion" -> debe bajar
      // caso: "Overdrive" en "duelo de Overdrive" -> tambien baja
      // no tocar si es la primera palabra
      const re = new RegExp('(?<![\\w\\u00C0-\\u017F])' + pal.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '(?![\\w\\u00C0-\\u017F])', 'g');
      v = v.replace(re, (match, offset) => {
        // no tocar si es la primera palabra del titulo
        const antes = v.slice(0, offset);
        if (!/[\\s:¿?¡!—-]/.test(antes.slice(-1)) && antes.trim() === '') return match; // primera palabra
        return match.charAt(0).toLowerCase() + match.slice(1);
      });
    });
    if (v !== original) {
      g[campo] = v;
      cambios.push({ guia: g.id, campo, antes: original, despues: v });
    }
  });
});

console.log('titulos ES con palabras comunes capitalizadas -> corregidos: ' + cambios.length);
cambios.forEach(c => {
  console.log('  ' + c.guia + ' [' + c.campo + ']');
  console.log('    antes: ' + c.antes);
  console.log('    ahora: ' + c.despues);
});

fs.writeFileSync(gf, JSON.stringify(guides, null, 2), 'utf8');
console.log('\nguides.json escrito');