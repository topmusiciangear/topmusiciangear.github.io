const u='https://topmusiciangear.com';
(async()=>{
  const h=await (await fetch(u+'/guides/hd490-pro-vs-dt990.html')).text();
  const i=h.indexOf('guide-search-wrap\">');
  console.log(h.slice(i-5, i+180));
})();