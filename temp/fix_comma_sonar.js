var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');

// Fix missing comma after 647 block before 649
src=src.replace(
  'andertons: "https://www.andertons.co.uk/sonarworks-soundid-reference-for-speakers--headphones-esd/"\n    }\n  }\n  649: {',
  'andertons: "https://www.andertons.co.uk/sonarworks-soundid-reference-for-speakers--headphones-esd/"\n    }\n  },\n  649: {'
);

fs.writeFileSync(b,src);
console.log('Fixed comma after 647');