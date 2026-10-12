var fs=require('fs');
var en=fs.readFileSync('guides/budget-usb-mics.html','utf8');
var es=fs.readFileSync('guides/budget-usb-mics_es.html','utf8');
function chk(name,cond){ console.log((cond?'PASS':'FAIL')+' '+name); }
// Section 10 no longer Rode-corrupted
chk('EN sec10 has HyperX no-frills', en.indexOf("HyperX's no-frills compact USB condenser")>-1);
chk('EN no UNIFY leftover', en.indexOf('UNIFY')===-1);
chk('EN no Rode-brand-in-SoloCast', en.indexOf('If you want the Rode brand')===-1);
chk('ES sec10 rewritten', es.indexOf('sin complicaciones de HyperX')>-1);
chk('ES no UNIFY leftover', es.indexOf('UNIFY')===-1);
// Section 3 headphone fix
chk('EN no adds-a-headphone-jack', en.indexOf('adds a headphone jack')===-1);
chk('EN has no-jack correction', en.indexOf('no headphone jack on the body')>-1);
chk('ES no añade-salida', es.indexOf('el 2 añade una salida de auriculares')===-1);
// Table Best For
chk('EN SoloCast Gaming & streaming', en.indexOf('Gaming &amp; streaming')>-1 || en.indexOf('Gaming & streaming')>-1);
chk('EN Q2U Professional podcasting', en.indexOf('Professional podcasting')>-1);
chk('ES SoloCast Gaming y streaming', es.indexOf('Gaming y streaming')>-1);
chk('ES Q2U Podcasting profesional', es.indexOf('Podcasting profesional')>-1);
// Verdict SoloCast bit depth
chk('EN no 24/96-Hi-Res-SoloCast', en.indexOf('24-bit/96kHz Hi-Res audio')===-1);
chk('EN has 16/48 SoloCast', en.indexOf('Up to 16-bit/48 kHz audio over USB-C')>-1);
chk('ES no Hi-Res-24/96', es.indexOf('Audio Hi-Res de 24 bits/96 kHz')===-1);
// Untouched correct cells still present
chk('EN Seiren HP still No', /Razer Seiren V3[\s\S]{0,3000}?Headphone Monitoring/.test(en));
console.log('done');
