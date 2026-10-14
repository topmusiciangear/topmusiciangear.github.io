const fs = require('fs');
// Solo la parte de la guia (el motor ya esta editado)
const gj = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'beginner-guitar');
const s = g.sections.find(x => x && x.heading && x.heading.includes('Head-to-Head'));
const imgs = '<div class="guide-section-imgs"><img src="https://r2.gear4music.com/media/71/719445/1200/preview.jpg" alt="Fender CN-60S (Nylon)" class="guide-section-img lb-img" style="cursor:zoom-in"><img src="https://r2.gear4music.com/media/52/527882/1200/preview.jpg" alt="Takamine GC1 (Nylon)" class="guide-section-img lb-img" style="cursor:zoom-in"></div>';
s.content = s.content.split(imgs).join('');
s.content_es = s.content_es.split(imgs).join('');
s.splitProducts = true;
s.comparePhotos = true;
console.log('incrustadas restantes:', (s.content.includes('719445') || s.content_es.includes('719445')) ? 'SI' : 'no');
console.log('splitProducts:', s.splitProducts, '| comparePhotos:', s.comparePhotos, '| sideProducts:', s.sideProducts === true ? 'SI' : 'no (apilado)');
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('guia OK');