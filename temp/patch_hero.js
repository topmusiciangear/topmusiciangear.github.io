const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const img = 'https://r2.gear4music.com/media/121/1211824/1200/preview.jpg';
fetch(img, { method: 'HEAD' })
  .then(r => {
    const ct = r.headers.get('content-type');
    console.log('portada G4M: ' + r.status + ' | ' + ct);
    if (r.status !== 200 || !/^image\//.test(ct || '')) { console.log('RECHAZADA, no se aplica'); return; }
    const gp = B + 'data/guides.json';
    const guides = JSON.parse(fs.readFileSync(gp, 'utf8'));
    const g = guides.find(x => x.id === 'best-piano-keyboard-vsts');
    const old = g.image;
    g.image = img;
    fs.writeFileSync(gp, JSON.stringify(guides, null, 2), 'utf8');
    console.log('guide.image: ' + (old || '(sin valor)') + '\n           -> ' + g.image);
  })
  .catch(e => console.log('ERROR ' + e.message));