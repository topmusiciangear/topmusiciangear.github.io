const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8');
const guideStart = s.indexOf('"id": "best-audio-repair-plugins"');
const verdictIdx = s.indexOf('"verdict_es": "<p>', guideStart);
const endIdx = s.indexOf('</p>"', verdictIdx);
console.log(JSON.stringify(s.substring(endIdx-80, endIdx+10)));
