const fs = require('fs');
const d = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-monitors-for-small-rooms.html', 'utf8');
[...d.matchAll(/.{0,200}516.{0,200}/g)].forEach(m =>
  console.log('...' + m[0].replace(/\s+/g, ' ').trim().slice(0, 400) + '...\n'));
