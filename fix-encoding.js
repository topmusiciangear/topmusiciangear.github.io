var fs=require('fs');
var idx=fs.readFileSync('index.html','utf8');
var m={
  'TopMusicianGear \uFFFD Honest':'TopMusicianGear — Honest',
  'TopMusicianGear \uFFFD Music':'TopMusicianGear — Music',
  'Gu\uFFFDas':'Guías',
  'Sobre M\uFFFD':'Sobre Mí',
  'Cont\uFFFDctanos':'Contáctanos',
  'Configuraci\uFFFDn':'Configuración',
  'Grabaci\uFFFDn':'Grabación',
  'Micr\uFFFDfono':'Micrófono',
  'Join us on Telegram \uFFFD daily':'Join us on Telegram — daily',
  '\uFFFDnete a Telegram \uFFFD ofertas':'Únete a Telegram — ofertas',
  '\uFFFDnete':'Únete',
  'econ\uFFFDmica':'económica',
  'El\uFFFDctrica':'Eléctrica',
  'el\uFFFDctrica':'eléctrica',
  'inal\uFFFDmbricos':'inalámbricos',
  'v\uFFFDlvulas':'válvulas',
  'peque\uFFFDas':'pequeñas',
  'M\uFFFDquinas':'Máquinas',
  'Bater\uFFFD':'Batería',
  '\uFFFDrea':'área',
  'Anal\uFFFDticas':'Analíticas',
  'caracter\uFFFDsticas':'características',
  'tambi\uFFFDn':'también',
  'Pol\uFFFDtica':'Política',
  'informaci\uFFFDn':'información',
  'funcionalidad':'funcionalidad',
  'funcionalidad principal':'funcionalidad principal',
  '\uFFFDCu\uFFFDl':'¿Cuál',
  '\uFFFD':'',
};
var out=idx;
for(var k in m){
  out=out.split(k).join(m[k]);
}
fs.writeFileSync('index.html',out);
var n=(idx.match(/\uFFFD/g)||[]).length;
var m2=(out.match(/\uFFFD/g)||[]).length;
console.log('Fixed '+(n-m2)+' encoding issues. Remaining: '+m2);
