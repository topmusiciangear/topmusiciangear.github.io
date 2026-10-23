const {execFileSync}=require('child_process');
const out=execFileSync('curl',['-s','https://raw.githubusercontent.com/topmusiciangear/topmusiciangear.github.io/main/js/app.min.js'],{encoding:'utf8'});
console.log('raw min ends with quote:', out.endsWith('"'));
console.log('raw min has topSearchToggle:', out.includes('topSearchToggle'));