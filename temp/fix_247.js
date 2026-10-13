var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
var re=/  247: \{\r?\n    prices: \{\r?\n      gear4music: "£699\.00",\r?\n      amazon: "\$799\.99",\r?\n      zzounds: "\$799\.99",\r?\n      andertons: "£521\.00",\r?\n      musicstore: "€649\.00"\r?\n    \}\r?\n  \},/;
console.log('match:'+re.test(src));
src=src.replace(re,'  247: {\r\n    prices: {\r\n      amazon: "$799.99",\r\n      zzounds: "$799.00",\r\n      andertons: "£521.00",\r\n      musicstore: "€649.00"\r\n    },\r\n    urls: {\r\n      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Mackie-DLZ-Creator-Digital-Streaming-Mixer/5NE6"\r\n    }\r\n  },');
fs.writeFileSync(b,src);
console.log('done');