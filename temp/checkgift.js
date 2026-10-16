const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const plug = guides.filter(g => g.category === 'plugins');
console.log('guias plugins: ' + plug.length);
plug.forEach(g => {
  const en = (g.conclusion || '').includes('articles/2073');
  const es = (g.conclusion_es || '').includes('articles/2073');
  if (!en || !es) console.log('FALTA: ' + g.id + ' (EN:' + en + ' ES:' + es + ')');
});
console.log('chequeo listo');
