var fs=require('fs');
function chk(n,c){ console.log((c?'PASS':'FAIL')+' '+n); }
var en=fs.readFileSync('guides/best-keyboard.html','utf8');
var es=fs.readFileSync('guides/best-keyboard_es.html','utf8');
chk('EN verdict informative', en.indexOf('The Nord Stage 4 88 is the do-everything flagship')>-1);
chk('ES verdict informative', es.indexOf('El Nord Stage 4 88 es el insignia total')>-1);
chk('EN conclusion per-product', en.indexOf('Every pick in one line')>-1 && en.indexOf('cheapest serious route to 88 weighted keys')>-1);
chk('EN conclusion stage link', en.indexOf('best-stage-keyboards.html')>-1);
chk('ES conclusion stage link', es.indexOf('best-stage-keyboards_es.html')>-1);
chk('EN FAQ q4 action', en.indexOf('synth-action, semi-weighted and hammer-action')>-1);
chk('EN FAQ q5 no sound', en.indexOf('Do MIDI controllers make any sound on their own?')>-1);
chk('EN FAQ q6 live', en.indexOf('Which keyboard should I buy for live shows')>-1);
chk('ES FAQ q4', es.indexOf('de sinte, semipesadas y de martillo')>-1);
chk('ES FAQ q6', es.indexOf('para directo en vez de para casa')>-1);
var stub=fs.readFileSync('guides/midi-keyboards.html','utf8');
chk('redirect stub intact', stub.indexOf('best-stage-keyboards.html')>-1 && stub.indexOf('refresh')>-1);
console.log('done');
