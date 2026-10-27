const fs=require('fs');
['best-mic-for-podcasting.html','wireless-intercom-systems.html','wireless-lapel-mics.html'].forEach(f=>{
  const txt=fs.readFileSync('guides/'+f,'utf8');
  const pxf=/href="https:\/\/andertonsmusiccompany\.pxf\.io\/[^"]*\?[^"]*u="/.test(txt);
  const awin=/href="https:\/\/www\.awin1\.com\/cread\.php\?[^"]*ued="/.test(txt);
  const cj=/href="https:\/\/www\.anrdoezrs\.net\/click-[^"]*\?[^"]*url="/.test(txt);
  console.log(f, pxf, awin, cj);
});
