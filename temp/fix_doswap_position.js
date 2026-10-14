const fs = require('fs');
let src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');

// Fix the doSwap function: insert displaced store at correct position, not at top
// The order is: amazon, reverb, zzounds, gear4music, andertons, musicstore
const oldLine = "       ml.insertAdjacentHTML('afterbegin',dispRow);";

// dispRow is a string, so we need to create a DOM node from it first
const newCode = `
       var orderArr=['amazon','reverb','zzounds','gear4music','andertons','musicstore'];
       var curIdx=orderArr.indexOf(curStore);
       var insertBefore=null;
       for(var oi=curIdx+1;oi<orderArr.length;oi++){var c=ml.querySelector('[data-store="'+orderArr[oi]+'"]');if(c){insertBefore=c;break;}}
       var tmpD=document.createElement('div');tmpD.innerHTML=dispRow;var dNode=tmpD.firstChild;
       if(insertBefore)ml.insertBefore(dNode,insertBefore);else ml.appendChild(dNode);`;

if (src.indexOf(oldLine) > -1) {
  src = src.replace(oldLine, newCode);
  console.log('Fixed doSwap insertion order');
} else {
  console.log('Old line not found');
}

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', src);
try { new Function(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8')); console.log('parsea OK'); }
catch (e) { console.log('ROTO:', e.message); }