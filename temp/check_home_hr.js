const u='https://topmusiciangear.com';
(async()=>{
  const h=await (await fetch(u+'/')).text();
  const i=h.indexOf('header-right">');
  console.log(h.slice(i-10, i+220));
})();