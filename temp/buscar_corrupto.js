const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/tabla_nueva.js', 'utf8');

const patrones = ['-+', 'a|', '|a', 'argumentsNg', 'LengthNg', 'remortgating', 'remortajar'];
patrones.forEach(p => {
  let i = s.indexOf(p);
  while (i > -1) {
    console.log('\n"' + p + '" @' + i);
    console.log('   ...' + s.slice(Math.max(0, i - 90), i + 90).replace(/\n/g, '\\n') + '...');
    i = s.indexOf(p, i + 1);
  }
});
