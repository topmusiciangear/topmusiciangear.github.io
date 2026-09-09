const fs=require('fs');
const d=require('../data/guides.json');
const mine=['ableton-vs-fl-studio','apollo-vs-babyface','beginner-guitar','best-bass-under-700','best-digital-pianos','best-headphones','best-live-sound-mixers','best-monitors-for-small-rooms','best-practice-amps','best-wireless-iems','budget-usb-mics','dt770-vs-dt990','fix-clipping-scarlett','jbl-vs-kali','me90-vs-mx5','nx912-vs-pxm12mp','pro-guitars','pro-monitors','scarlett-vs-motu','stage-mics','studio-furniture','xr18-vs-m32r'];
const guides=d.filter(g=>mine.includes(g.id));
// Write each guide as a separate file for easy reading
guides.forEach(g=>{
  fs.writeFileSync(__dirname+'/guide_'+g.id+'.json', JSON.stringify(g,null,2),'utf8');
});
console.log('Written '+guides.length+' guide files');
