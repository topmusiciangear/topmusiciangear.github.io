const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const t = id => { const g = guides.find(x => x.id === id); return { en: g.title, es: g.title_es }; };
['vocal-plugins', 'best-audio-repair-plugins', 'vocalign-vs-revoice-pro'].forEach(id => {
  const x = t(id);
  console.log(id + ' EN: ' + x.en);
  console.log(id + ' ES: ' + x.es);
});
