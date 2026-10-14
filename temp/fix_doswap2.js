const fs = require('fs');
let src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');

// Find the exact line
const idx = src.indexOf("ml.insertAdjacentHTML('afterbegin',dispRow)");
console.log('Found at:', idx);
if (idx > -1) {
  const oldText = "ml.insertAdjacentHTML('afterbegin',dispRow);";
  const newText = `
       var orderArr=['amazon','reverb','zzounds','gear4music','andertons','musicstore'];
       var curIdx=orderArr.indexOf(curStore);
       var insertBefore=null;
       for(var oi=curIdx+1;oi<orderArr.length;oi++){var c=ml.querySelector('[data-store="'+orderArr[oi]+'"]');if(c){insertBefore=c;break;}}
       var tmpD=document.createElement('div');tmpD.innerHTML=dispRow;var dNode=tmpD.firstChild;
       if(insertBefore)ml.insertBefore(dNode,insertBefore);else ml.appendChild(dNode);`;
  src = src.replace(oldText, newText);
  console.log('Fixed');
}

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', src);
try { new Function(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8')); console.log('parsea OK'); }
catch (e) { console.log('ROTO:', e.message); }