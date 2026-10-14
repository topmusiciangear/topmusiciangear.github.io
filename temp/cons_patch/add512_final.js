var fs=require('fs');
var s=fs.readFileSync('build-guides.js','utf8');
var entry='  512: {prices:{amazon:"$1,995.00",zzounds:"$1,995.00",gear4music:"£1,525.00",andertons:"£1,525.00",musicstore:"€1,812.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Neumann-MT48-Premium-Audio-Interface/5E3S",amazon:"https://www.amazon.com/Neumann-MT-48-US-Connectivity/dp/B0BTGVGCJN",andertons:"https://www.andertons.co.uk/Neumann-MT-48-Audio-Interface-Universal-PSU-inc-USB-Connection/"},oos:["zzounds"]},';
if(s.indexOf('512:')>=0){
  console.log('already has 512');
} else {
  s=s.split('  152:').join(entry+'\n  152:');
  fs.writeFileSync('build-guides.js', s);
  console.log('inserted 512');
}
console.log('now has', (s.match(/512:/g)||[]).length);
