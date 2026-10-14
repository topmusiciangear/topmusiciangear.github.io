const fs = require('fs');
const P = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(P, 'utf8'));
const g = guides.find(x => x.id === 'beginner-guitar');
const s = g.sections.find(x => x && x.heading && x.heading.includes('Head-to-Head'));
if (!s) { console.log('seccion no encontrada'); process.exit(1); }

const imgsEn = '<div class="guide-section-imgs"><img src="https://r2.gear4music.com/media/71/719445/1200/preview.jpg" alt="Fender CN-60S (Nylon)" class="guide-section-img lb-img" style="cursor:zoom-in"><img src="https://r2.gear4music.com/media/52/527882/1200/preview.jpg" alt="Takamine GC1 (Nylon)" class="guide-section-img lb-img" style="cursor:zoom-in"></div>';
const imgsEs = imgsEn; // mismas fotos, alt en ingles como el resto del sitio

if (!s.content.includes('719445')) s.content += imgsEn;
if (!s.content_es.includes('719445')) s.content_es += imgsEs;

fs.writeFileSync(P, JSON.stringify(guides, null, 2));
console.log('fotos anadidas:', s.content.includes('719445') && s.content.includes('527882') && s.content_es.includes('719445') && s.content_es.includes('527882') ? 'OK EN+ES' : 'FALLO');