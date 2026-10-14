const fs = require('fs');
// 1. Cambio acotado en build-guides.js: solo las secciones con comparePhotos:true
//    muestran fotos aunque pertenezcan a otra seccion, y sin consumir renderedProducts
const bj = 'C:/Users/Daniel/projects/topmusiciangear/build-guides.js';
let src = fs.readFileSync(bj, 'utf8');
const oldLines = "        if ((p.id in photoOwner) && photoOwner[p.id] !== si) return '';\n        renderedProducts.add(p.id);";
const newLines = "        var ownedElsewhere = (p.id in photoOwner) && photoOwner[p.id] !== si;\n        if (ownedElsewhere && !s.comparePhotos) return '';\n        if (!ownedElsewhere) renderedProducts.add(p.id);";
if (!src.includes(oldLines)) { console.log('!! patron no encontrado en build-guides.js'); process.exit(1); }
src = src.split(oldLines).join(newLines);
fs.writeFileSync(bj, src);
try { new Function(fs.readFileSync(bj, 'utf8')); console.log('build-guides.js OK'); }
catch (e) { console.log('ROTO:', e.message); process.exit(1); }

// 2. Guia: quitar fotos incrustadas + activar splitProducts/comparePhotos (sin sideProducts = apilado)
const gj = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'beginner-guitar');
const s = g.sections.find(x => x && x.heading && x.heading.includes('Head-to-Head'));
s.content = s.content.split('<div class="guide-section-imgs"><img src="https://r2.gear4music.com/media/71/719445/1200/preview.jpg" alt="Fender CN-60S (Nylon)" class="guide-section-img lb-img" style="cursor:zoom-in"><img src="https://r2.gear4music.com/media/52/527882/1200/preview.jpg" alt="Takamine GC1 (Nylon)" class="guide-section-img lb-img" style="cursor:zoom-in"></div>').join('');
s.content_es = s.content_es.split('<div class="guide-section-imgs"><img src="https://r2.gear4music.com/media/71/719445/1200/preview.jpg" alt="Fender CN-60S (Nylon)" class="guide-section-img lb-img" style="cursor:zoom-in"><img src="https://r2.gear4music.com/media/52/527882/1200/preview.jpg" alt="Takamine GC1 (Nylon)" class="guide-section-img lb-img" style="cursor:zoom-in"></div>').join('');
s.splitProducts = true;
s.comparePhotos = true;
console.log('sideProducts:', s.sideProducts === true ? 'SI (lado a lado)' : 'no (apilado)');
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('guia OK');