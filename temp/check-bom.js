const {execFileSync}=require('child_process');
const git='C:\\Users\\Daniel\\projects\\topmusiciangear';
const head=execFileSync('git',['show','HEAD:index.html'],{cwd:git}).toString('utf8').replace(/^\uFEFF/,'');
const cur=require('fs').readFileSync(git+'\\index.html','utf8').replace(/^\uFEFF/,'');
const norm=s=>(s.replace(/\r\n/g,'\n').replace(/\r/g,'\n'));
const hv=(head.match(/shop-buttons\.js\?v=([a-z0-9]+)/)||[])[1];
const cv=(cur.match(/shop-buttons\.js\?v=([a-z0-9]+)/)||[])[1];
const a=norm(head).replace(hv,'X'), b=norm(cur).replace(cv,'X');
console.log('Identical after normalizing line-endings + version swap:', a===b);
if(a!==b){ for(let i=0;i<Math.max(a.length,b.length);i++){ if(a[i]!==b[i]){ console.log('first diff at',i); console.log('HEAD:',JSON.stringify(a.slice(i-40,i+40))); console.log('CUR :',JSON.stringify(b.slice(i-40,i+40))); break; } } }
