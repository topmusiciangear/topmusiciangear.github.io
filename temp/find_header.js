const fs = require('fs');
const js = fs.readFileSync('js/app.js','utf8');
for(const term of ['hidden','scrolled','translateY']){
  const re=new RegExp(term,'g'); let m;
  while((m=re.exec(js))){
    console.log(term, 'at', m.index, js.slice(Math.max(0,m.index-40), m.index+40).replace(/\s+/g,' '));
  }
}