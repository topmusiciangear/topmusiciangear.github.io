const fs = require('fs');
const h = fs.readFileSync('guides/premium-interfaces.html', 'utf8');
['Apogee', 'Lynx'].forEach(w => {
  let i = -1, n = 0;
  while ((i = h.indexOf(w, i + 1)) > -1 && n < 4) {
    console.log(w + ': ...' + h.slice(Math.max(0, i - 150), i + 60).replace(/\n/g, ' '));
    n++;
  }
});
