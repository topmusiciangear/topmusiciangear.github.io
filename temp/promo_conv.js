const guides = require('C:/Users/Daniel/projects/topmusiciangear/data/guides.json');
const g = guides.find(x => x.id === 'repitch-vs-melodyne');
const s = JSON.stringify(g);
['149', '$99', '150.25'].forEach(k => {
  let i = -1;
  while ((i = s.indexOf(k, i + 1)) > -1) console.log(k + ': ...' + s.slice(Math.max(0, i - 70), i + 30) + '...');
});
console.log('--- fin');
