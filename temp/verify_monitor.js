var fs=require('fs');
function chk(n,c){console.log((c?'PASS':'FAIL')+' '+n);}
['guides/monitor-setup.html','guides/monitor-setup_es.html'].forEach(function(f){
  var h=fs.readFileSync(f,'utf8');
  // Check Sonarworks
  chk(f+' Sonarworks musicstore link',h.indexOf('art-PCM0017394')>-1);
  chk(f+' Sonarworks zzounds link',h.indexOf('SNWSOUNDIDSPHP')>-1);
  chk(f+' Sonarworks gear4music link',h.indexOf('Sonarworks-SoundID-Reference-Speaker-and-Headphone')>-1);
  chk(f+' Sonarworks price €299',h.indexOf('299')>-1);
  // Check MiniDSP UMIK-1
  chk(f+' UMIK-1 amazon link',h.indexOf('B00N4Q25R8')>-1);
  chk(f+' UMIK-1 price $79',h.indexOf('79')>-1);
  // Check Genelec GLM Kit
  chk(f+' GLM musicstore link',h.indexOf('art-REC0012270')>-1);
  chk(f+' GLM gear4music link',h.indexOf('Genelec-GLM-3')>-1);
  chk(f+' GLM price €264',h.indexOf('264')>-1);
  // Check Auralex MoPADs
  chk(f+' MoPADs musicstore link',h.indexOf('art-REC0004624')>-1);
  chk(f+' MoPADs amazon link',h.indexOf('B0002D0B4K')>-1);
  chk(f+' MoPADs price €39',h.indexOf('39')>-1);
  // Check Ultimate Support MS-100
  chk(f+' MS-100 zzounds link',h.indexOf('ULTMS100B')>-1);
  chk(f+' MS-100 amazon link',h.indexOf('B005OWHATS')>-1);
  chk(f+' MS-100 price $399',h.indexOf('399')>-1);
  // Check table
  chk(f+' table has 9 columns',h.indexOf('Ultimate Support MS-100')>-1);
});
console.log('done');