const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
['best-synth-vsts', 'best-guitar-plugins', 'autotune-vs-melodyne'].forEach(id => {
  const h = fs.readFileSync(B + 'guides/' + id + '.html', 'utf8');
  const re = /<t[dh]><\/t[dh]>|<t[dh]>-<\/t[dh]>/g;
  let m;
  while ((m = re.exec(h))) {
    console.log('--- ' + id + ': ' + JSON.stringify(h.slice(Math.max(0, m.index - 120), m.index + 40)));
  }
});
