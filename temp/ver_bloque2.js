const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.min.js', 'utf8');
console.log('A (}}),var): ' + s.includes('},250)}}),var tmgPSF='));
console.log('B (tmgSyncSearchClear + document): ' + s.includes('tmgSyncSearchClear(),document.querySelectorAll'));
const i = s.indexOf('tmgPSF=');
console.log('ctx: ' + s.slice(Math.max(0, i - 60), i + 200).replace(/\s+/g, ' '));
