const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = g.find(x => x.id === 'best-plugins');

const sectionImgs = {
  'Pro-C': 'https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE',
  'Soundtoys': 'https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE',
  'UAD': 'https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE'
};

guide.sections.forEach(s => {
  if (s.heading && !s.content.includes('<img')) {
    if (s.heading.includes('Pro-Q') || s.heading.includes('Pro-C') || s.heading.includes('Soundtoys') || s.heading.includes('UAD')) {
      const imgDiv = '<div class="guide-section-imgs"><img src="https://www.pluginboutique.com/product/2-Effects/71-Dynamics-Processor/4657-TDR-Kotelnikov-GE" alt="' + s.heading + '" class="guide-section-img lb-img" style="cursor:zoom-in"><div class="guide-video-thumb guide-video-placeholder" aria-hidden="true"></div></div>';
      s.content = imgDiv + s.content;
      s.content_es = s.content;
      console.log('Added img to:', s.heading);
    }
  }
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2) + '\n');
console.log('Done.');
