var cp=require('child_process');
var d=cp.execSync('git diff data/guides.json',{encoding:'utf8',maxBuffer:50*1024*1024});
var lines=d.split('\n').filter(function(l){return l[0]==='+'&&l[1]!=='+';});
var bad=lines.filter(function(l){return /\b(midi|usb|dsp|eq|adat|xlr|trs|thunderbolt|bluetooth|wifi|ios|mac|pc)\b/.test(l)&&/label_es|val\d?_es/.test(l);});
console.log('added-lines='+lines.length+' suspicious='+bad.length);
bad.slice(0,8).forEach(function(l){console.log(l.slice(0,120));});
