const fs = require('fs');
const OLD = 'margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic';
const NEW = 'margin-left:auto;font-weight:700;color:#fff';
for (const f of ['build-guides.js', 'temp/gen-shop-buttons.js']) {
  let s = fs.readFileSync(f, 'utf8');
  const n = s.split(OLD).length - 1;
  s = s.split(OLD).join(NEW);
  fs.writeFileSync(f, s);
  console.log(f + ': ' + n + ' reemplazos');
}
