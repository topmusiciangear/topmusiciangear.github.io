var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/monitor-setup.html','guides/monitor-setup_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  var cards=(h.match(/guide-product-card-img/g)||[]).length;
  console.log(f+' cards='+cards);
  chk(f+' 9 cards',cards>=9);
  ['IsoAcoustics ISO-200','Sonarworks SoundID Reference','MiniDSP UMIK-1','Genelec GLM Kit','Auralex MoPADs','Ultimate Support MS-100'].forEach(function(nm){
    chk(f+' card '+nm,h.indexOf('alt="'+nm)>-1||h.indexOf(nm)>-1);
  });
  chk(f+' iso img',h.indexOf('ISO-200-hero-new.jpg')>-1);
  chk(f+' sonar img',h.indexOf('soundid-reference-speaker-and-headphone-calibration-software-meta.jpg')>-1);
  chk(f+' umik img',h.indexOf('282A1844.jpg')>-1);
  chk(f+' glm img',h.indexOf('glm-kit.jpg')>-1);
  chk(f+' mopad img',h.indexOf('MoPAD-Set-1k-web')>-1);
  chk(f+' ms100 img',h.indexOf('MS-100B_01_LG.jpg')>-1);
  chk(f+' review buttons',h.indexOf('guide-review-write-btn')>-1);
});
console.log('done');
