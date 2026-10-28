const fs = require('fs');
const t = fs.readFileSync('data/products.json', 'utf8');
const re = /"musicstore": "[^"]*"/g;
let m, i = 0;
while ((m = re.exec(t))) {
  if (/awin1|art-GIT00(1234|05678|12345|98765|87654)/.test(m[0]) || /art-GIT0012346/.test(m[0])) {
    console.log(m[0]);
  }
}
