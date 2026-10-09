const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-plugins');

const imgs = {
  62: 'https://r2.gear4music.com/media/116/1163240/1200/preview.jpg',
  63: 'https://r2.gear4music.com/media/70/702613/1200/preview_1.jpg',
  32: 'https://r2.gear4music.com/media/125/1252735/1200/preview.jpg',
  121: 'https://r2.gear4music.com/media/141/1419477/1200/preview.jpg'
};

guide.sections.forEach(s => {
  const pid = s.products && s.products[0];
  if (imgs[pid] && !s.content.includes('<img')) {
    const imgDiv = '<div class="guide-section-imgs"><img src="' + imgs[pid] + '" alt="' + s.heading + '" class="guide-section-img lb-img" style="cursor:zoom-in"><div class="guide-video-thumb guide-video-placeholder" aria-hidden="true"></div></div>';
    s.content = imgDiv + s.content;
    s.content_es = imgDiv + s.content_es;
    console.log('Added img:', s.heading);
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
