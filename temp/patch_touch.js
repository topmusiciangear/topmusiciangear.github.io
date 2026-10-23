const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = "@media(max-width:768px){.mobile-social{padding:36px 16px 0!important}.audio-mini-mobile{padding-bottom:12px!important}}";
const neu = "@media(max-width:768px){.mobile-social{padding:36px 16px 0!important}.audio-mini-mobile{padding-bottom:12px!important}html,body{touch-action:pan-y pinch-zoom!important}}";
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
s = s.replace(old, neu);
fs.writeFileSync('build-guides.js', s);
console.log('done');