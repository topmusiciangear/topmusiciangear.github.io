var fs=require('fs');
var https=require('https');
var imgs=[
 'https://cf1.zzounds.com/media/productmedia/fit%2C1200by1200/quality%2C85/spark-mini-black-front-001_940570-c659b0ec9eceb9f48ef85543cd3345fe.jpg',
 'https://cf1.zzounds.com/media/productmedia/fit%2C1200by1200/quality%2C85/2370300000v1_hi-aa7adf08704212633e12cdacc49d0b96.jpg',
 'https://cf1.zzounds.com/media/productmedia/fit%2C1200by1200/quality%2C85/ga-2b658f109489a1c60c38626c494f7530.jpg',
 'https://cf1.zzounds.com/media/productmedia/fit%2C1200by1200/quality%2C85/WAZA-AIR-B_D2_838866-d318928d32daf2ffbb915cf7aa278329.jpg'
];
var i=0;
function next(){
  if(i>=imgs.length){console.log('DONE');return;}
  var u=imgs[i++];
  https.get(u,function(r){console.log('status',r.statusCode, r.headers['content-type']||'', u.slice(60,140)); r.resume(); next();}).on('error',function(e){console.log('ERR',e.message,u);next();});
}
next();
var P=JSON.parse(fs.readFileSync('data/products.json','utf8'));
var zz=[];
P.forEach(function(p){ if(p.stores.zzounds) zz.push(p.stores.zzounds); });
console.log('total zzound urls:',zz.length);
console.log('with a--925521:',zz.filter(function(u){return u.indexOf('a--925521')>0}).length);
console.log('sample:',zz.slice(0,3));
console.log('sample no-prefix:',zz.filter(function(u){return u.indexOf('a--925521')<0}).slice(0,5));