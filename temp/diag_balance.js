const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const get = (g, path) => {
  let v = g;
  for (const part of path.split('.')) {
    const m = part.match(/^(\w+)\[(\d+)\]$/);
    if (m) v = v[m[1]][Number(m[2])];
    else v = v[part];
  }
  return v;
};

const cases = [
  ['best-monitors-for-small-rooms', 'conclusion'],
  ['best-monitors-for-small-rooms', 'conclusion_es'],
  ['budget-mics', 'sections[15].content'],
  ['budget-mics', 'sections[15].content_es'],
];

for (const [id, path] of cases) {
  const v = get(guides.find(x => x.id === id), path);
  console.log('\n########## ' + id + '.' + path + ' ##########');
  console.log(v);
  console.log('\n[ocurrencias de <p>]位置:');
  let i = -1;
  while ((i = v.indexOf('<p', i + 1)) !== -1) {
    if (v[i + 1] !== '/' && v.slice(i + 2, i + 3) !== '>') console.log('  <p> en ' + i);
    if (v[i + 1] === '/') console.log('  </p> en ' + i);
  }
}
