var fs=require('fs');
var BASE='C:/Users/Daniel/projects/topmusiciangear/';
var b=BASE+'build-guides.js';
var src=fs.readFileSync(b,'utf8');
var key='\n  651: {',i=src.indexOf(key);
if(i===-1){console.log('ANCHOR 651 NOT FOUND');process.exit(1);}
var j=src.indexOf('{',i),depth=0,k=j;
while(k<src.length){if(src[k]==='{')depth++;else if(src[k]==='}'){if(--depth===0)break;}k++;}
var end=k+1;if(src[end]===',')end++;
var nb='  656: {\n    prices: {\n      gear4music: "£1,283.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Sphere-DLX-Modeling-Microphone/5B0C",\n      amazon: "https://www.amazon.com/Universal-Audio-Sphere-Modeling-Microphone/dp/B0C35LC2JZ",\n      zzounds: "https://www.zzounds.com/item--UADSPHEREDLX",\n      andertons: "https://www.andertons.co.uk/universal-audio-sphere-dlx-modelling-microphone"\n    }\n  },\n  657: {\n    prices: {\n      gear4music: "£300.00"\n    },\n    urls: {\n      gear4music: "https://www.gear4music.com/Recording-and-Computers/sE-Electronics-SE2200-Large-Diaphragm-Condenser-Microphone/2CYA",\n      amazon: "https://www.amazon.com/SE-ELECTRONICS-Diaphragm-Condenser-Shockmount/dp/B077HZJJSJ"\n    }\n  },';
src=src.slice(0,end)+'\n'+nb+src.slice(end);
fs.writeFileSync(b,src);
console.log('TEST 656+657 inserted');
