var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');

// Fix missing comma after 649 block before 650
src=src.replace(
  'na: ["zzounds","reverb","amazon"]\n  }\n  650: {',
  'na: ["zzounds","reverb","amazon"]\n  },\n  650: {'
);

fs.writeFileSync(b,src);
console.log('Fixed comma after 649');