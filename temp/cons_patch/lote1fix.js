var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
function G(id){ return A.find(function(x){return x&&x.id===id;}); }
function setFeat(id, arr){ var g=G(id); g.featuredProducts=arr; console.log(id+' feat=['+arr.join(',')+']'); }
setFeat('best-shotgun-mics',[339,340,342,344,345,346,358,359,360]);
setFeat('best-acoustic-guitars-for-beginners',[68,102,315,314,316,460,461]);
setFeat('best-wireless-iems',[267,349,347,348,350,362,266]);
setFeat('streaming-interfaces',[239,240,262,263,328,327]);
setFeat('mics-for-creators',[194,252,253,195,196]);
setFeat('best-samplers-drum-computers',[256,33,127]);
setFeat('best-mic-for-podcasting',[508,50,197,329,1,3]);
setFeat('best-mic-for-guitar-amps',[5,1,51]);
setFeat('best-grooveboxes',[129,144,33]);
setFeat('m50x-vs-mdr7506',[25,26]);
setFeat('best-reverb-delay',[97,100,135,200]);
// stream-controllers: add 264
var sc=G('stream-controllers');
if(sc.featuredProducts.indexOf(264)<0){ sc.featuredProducts.push(264); console.log('stream-controllers feat+=264'); }
// digitakt row7 Sound Engine swap val1<->val2 (+es)
var dg=G('digitakt-ii-vs-tr8s');
var r7=dg.comparison.rows[7];
var t1=r7.val1, t1e=r7.val1_es;
r7.val1=r7.val2; r7.val1_es=r7.val2_es;
r7.val2=t1; r7.val2_es=t1e;
r7.label_es='Motor de sonido';
console.log('digitakt row7 swapped: val1='+r7.val1.slice(0,40)+' | val2='+r7.val2.slice(0,40));
// scarlett-vs-motu MIDI row verified CORRECT (Scarlett=No, M2=Yes) — no change
fs.writeFileSync('data/guides.json', JSON.stringify(A,null,2),'utf8');
console.log('saved');
