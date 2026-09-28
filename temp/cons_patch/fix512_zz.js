var fs=require('fs');
var s=fs.readFileSync('build-guides.js','utf8');
var old='  512: {prices:{amazon:"$1,995.00",zzounds:"$1,995.00",gear4music:"£1,525.00",andertons:"£1,525.00",musicstore:"€1,812.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Neumann-MT48-Premium-Audio-Interface/5E3S",amazon:"https://www.amazon.com/dp/B0BTGVGCJN",andertons:"https://www.andertons.co.uk/Neumann-MT-48-Audio-Interface-Universal-PSU-inc-USB-Connection/"},oos:["zzounds"]},';
var neu='  512: {prices:{amazon:"$1,995.00",zzounds:"$1,995.00",gear4music:"£1,525.00",andertons:"£1,525.00",musicstore:"€1,812.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Neumann-MT48-Premium-Audio-Interface/5E3S",amazon:"https://www.amazon.com/dp/B0BTGVGCJN",andertons:"https://www.andertons.co.uk/Neumann-MT-48-Audio-Interface-Universal-PSU-inc-USB-Connection/",zzounds:"https://www.zzounds.com/item--NEMMT48"},oos:["zzounds"]},';
if(s.indexOf(old)>=0){
  s=s.replace(old, neu);
  fs.writeFileSync('build-guides.js', s);
  console.log('fixed');
} else {
  console.log('old not found');
  var i=s.indexOf('512:');
  console.log(s.slice(i,i+800));
}
