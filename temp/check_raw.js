const {execFileSync}=require('child_process');
const out=execFileSync('curl',['-s','https://raw.githubusercontent.com/topmusiciangear/topmusiciangear.github.io/main/js/app.js'],{encoding:'utf8'});
console.log('raw ends with quote:', out.endsWith('"'));
console.log('raw has topSearchToggle:', out.includes('topSearchToggle'));