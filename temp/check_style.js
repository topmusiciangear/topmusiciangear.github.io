const u='https://topmusiciangear.com';
(async()=>{
  const h=await (await fetch(u+'/')).text();
  const i=h.indexOf('hf-overrides');
  const j=h.indexOf('</style>', i);
  console.log(h.slice(i-7, j+8));
})();