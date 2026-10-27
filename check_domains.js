const fs=require('fs');
const files=['best-mic-for-podcasting.html','wireless-intercom-systems.html','wireless-lapel-mics.html'];
files.forEach(f=>{
  const txt=fs.readFileSync('guides/'+f,'utf8');
  const re=/href="https:\/\/www\.awin1\.com\/cread\.php\?[^"]*"/g;
  let m;
  while(m=re.exec(txt)){
    const url=m[0].match(/href="([^"]+)"/)[1];
    const uedMatch=url.match(/ued=([^&]+)/);
    if(uedMatch){
      try{
        const clean=decodeURIComponent(uedMatch[1]);
        console.log(f, clean);
      }catch(e){}
    }
  }
});
