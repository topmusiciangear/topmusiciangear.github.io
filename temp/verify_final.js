var fs=require('fs');
var en=fs.readFileSync('guides/best-mic-for-guitar-amps.html','utf8');
var es=fs.readFileSync('guides/best-mic-for-guitar-amps_es.html','utf8');
function chk(n,c){ console.log((c?'PASS':'FAIL')+' '+n); }
chk('EN zero PD200X', en.indexOf('PD200X')===-1);
chk('EN zero XM8500', en.indexOf('XM8500')===-1);
chk('ES zero PD200X', es.indexOf('PD200X')===-1);
chk('ES zero XM8500', es.indexOf('XM8500')===-1);
chk('EN 7 th new', (en.match(/<th>Sennheiser e906<\/th>/g)||[]).length===1 && (en.match(/<th>Audix i5<\/th>/g)||[]).length===1);
chk('EN JSONLD e906 zz $219', en.indexOf('item--SENE906')>-1);
chk('EN JSONLD i5 amz $94.63', en.indexOf('B0002IHNA0')>-1);
chk('EN JSONLD beta amz', en.indexOf('B0002BACAK')>-1);
chk('EN JSONLD M201 $349.99', en.indexOf('349.99')>-1);
chk('EN verdict 7 cols', (en.match(/verdict-product-name/g)||[]).length===7);
chk('ES verdict 7 cols', (es.match(/verdict-product-name/g)||[]).length===7);
chk('EN sec count e906', en.indexOf('Hang It and Forget It')>-1);
chk('ES sec M201', es.indexOf('el micro de ampli más fiel')>-1);
console.log('done');
