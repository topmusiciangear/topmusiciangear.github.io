var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
src=src.replace(
  'musicstore: "https://www.musicstore.com/en_OE/EUR/Bose-T8S-ToneMatch-Mixer/art-PAH0019778-000"\n    }\n  }\n  412: {',
  'musicstore: "https://www.musicstore.com/en_OE/EUR/Bose-T8S-ToneMatch-Mixer/art-PAH0019778-000"\n    }\n  },\n  412: {'
);
fs.writeFileSync(b,src);
console.log('comma fixed');