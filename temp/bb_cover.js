const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const die = (m) => { console.log('!! ' + m); process.exit(1); };
const IMG = 'https://r2.gear4music.com/media/27/272785/1200/preview.jpg?_gl=1*8ljvoj*_gcl_aw*R0NMLjE3OTE5OTMyNzcuQ2p3S0NBancwTHpXQmhCT0Vpd0FLUWQwY0VaVTQyR1Q0MEJBNm5jNEZod0x3ek9XRVJrbnpqajdUc1Q3S043MlVCcDZkZ1BaaDhMcEVSb0NVMkVRQXZEX0J3RQ..';

const gj = BASE + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(gj, 'utf8'));
const g = guides.find(x => x.id === 'beginner-bass-guitars');
const old = g.image;
if (!old) die('guia sin image');
g.image = IMG;
fs.writeFileSync(gj, JSON.stringify(guides, null, 2));
console.log('portada guia: ' + old + '\n           -> ' + IMG);
console.log('ES usa la misma (no hay campo image_es): OK');