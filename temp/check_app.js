const u='https://topmusiciangear.com';
(async()=>{
  const s=await (await fetch(u+'/js/app.js')).text();
  console.log('ends with quote:', s.endsWith('"'));
  console.log('has topSearchToggle:', s.includes('topSearchToggle'));
  console.log('has topSearchDrop:', s.includes('topSearchDrop'));
})();