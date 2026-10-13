var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');

// Fix missing comma after 651 block before 652
src=src.replace(
  'na: ["musicstore","gear4music","andertons","reverb"]\n  }\n  652: {',
  'na: ["musicstore","gear4music","andertons","reverb"]\n  },\n  652: {'
);

fs.writeFileSync(b,src);
console.log('Fixed comma after 651');