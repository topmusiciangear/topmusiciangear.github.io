var fs=require('fs');
var en=fs.readFileSync('guides/best-stage-keyboards.html','utf8');
// find all Grandstage-related price spans: locate Korg-Grandstage-X-Stage-Piano (andertons) row
var ai=en.indexOf('Korg-Grandstage-X-Stage-Piano');
console.log('ANDERTONS ROW: '+JSON.stringify(en.slice(Math.max(0,ai-900),ai+500)));
