const fs = require('fs');
const p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
let s = fs.readFileSync(p, 'utf8');
const needle = `        {
          "title": "Zynaptiq Unveil",
          "title_es": "Zynaptiq Unveil"
        }
      ],`;
const insert = `        {
          "title": "Zynaptiq Unveil",
          "title_es": "Zynaptiq Unveil"
        },
        {
          "title": "Waves Clarity Vx Pro",
          "title_es": "Waves Clarity Vx Pro"
        }
      ],`;
if (s.includes(needle)) {
  s = s.replace(needle, insert);
  fs.writeFileSync(p, s);
  console.log('done');
} else {
  console.log('target not found');
}
