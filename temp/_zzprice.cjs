var fs=require('fs');
var files={
  'SPARK MINI':'C:/Users/Daniel/.local/share/opencode/tool-output/tool_07dbb47030011xSVH6t4D0l8BA',
  'RUMBLE 40':'C:/Users/Daniel/.local/share/opencode/tool-output/tool_07dbb4693001qOg8NFYV0ApEuP',
  'CRUSH 25':'C:/Users/Daniel/.local/share/opencode/tool-output/tool_07dbb484b001e9RR9CJJs7W93S',
  'WAZA BASS':'C:/Users/Daniel/.local/share/opencode/tool-output/tool_07dbb48610019tqUv5gHmQE7Yg'
};
Object.keys(files).forEach(function(k){
  var s=fs.readFileSync(files[k],'utf8');
  var m=s.match(/itemprop="price"[^>]*>\s*([\$\d.,\s]+)/);
  var m2=s.match(/\$\s*\d{1,3}(?:,\d{3})?(?:\.\d{2})?/g);
  console.log('==',k);
  console.log('priceprop:',m&&m[1]);
  console.log('dollars:',m2?m2.slice(0,6).join(' | '):'none');
  var mm=s.match(/priceTagLinePrice[^>]*>([\s\S]{0,40}?)\$/);
  if(mm) console.log('tagCtx:',JSON.stringify(mm[1].slice(-25)));
});