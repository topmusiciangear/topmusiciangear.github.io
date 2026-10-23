const fs = require('fs');
let s = fs.readFileSync('build-guides.js', 'utf8');
const old = "@media(max-width:768px){.mobile-social{padding:36px 16px 0!important}.audio-mini-mobile{padding-bottom:12px!important}html,body{touch-action:manipulation!import";
const neu = "@media(max-width:768px){.mobile-social{padding:36px 16px 0!important}.audio-mini-mobile{padding-bottom:12px!important}html,body{touch-action:manipulation!import";
// append nav-dd-mobile hide before the closing brace of that media query
// The media query ends with '!important}}' after touch-action. Let's target the full ending.
const old2 = "html,body{touch-action:manipulation!important}}";
const neu2 = "html,body{touch-action:manipulation!important}.nav-dd-mobile{display:none!important}}";
if (!s.includes(old2)) { console.log('NOT FOUND old2'); process.exit(1); }
s = s.replace(old2, neu2);
fs.writeFileSync('build-guides.js', s);
console.log('done');