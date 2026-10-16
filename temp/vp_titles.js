const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
['best-plugins', 'mixing-plugins', 'best-audio-repair-plugins'].forEach(id => {
  const g = guides.find(x => x.id === id);
  console.log(id + ' EN: ' + g.title);
  console.log(id + ' ES: ' + g.title_es);
});
