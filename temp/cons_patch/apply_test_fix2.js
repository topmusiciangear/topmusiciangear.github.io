var fs=require('fs');
var BG=fs.readFileSync('build-guides.js','utf8');
var TEST=JSON.parse(fs.readFileSync('temp/cons_patch/TEST_SHOP_BTN_updated.json','utf8'));

// Find the exact TEST_SHOP_BTN block
var startIdx = BG.indexOf('const TEST_SHOP_BTN = {');
if(startIdx<0){ console.log('Block not found'); process.exit(1); }

// Find the matching closing brace + semicolon
var brace=0, endIdx=-1;
for(var i=startIdx;i<BG.length;i++){
  if(BG[i]==='{') brace++;
  else if(BG[i]==='}'){ brace--; if(brace===0){ endIdx=i; break; } }
}
if(endIdx<0){ console.log('No matching brace'); process.exit(1); }

// Include the semicolon after the closing brace
while(endIdx+1<BG.length && BG[endIdx+1]!==';') endIdx++;
if(BG[endIdx+1]===';') endIdx++;

var before = BG.slice(0, startIdx);
var after = BG.slice(endIdx+1);

// Serialize TEST with same formatting style as original (2-space indent, single quotes for keys)
function serialize(obj, depth){
  if(obj===null) return 'null';
  if(obj===undefined) return 'undefined';
  if(typeof obj==='string') return '"'+obj.replace(/"/g,'\\"')+'"';
  if(typeof obj==='number' || typeof obj==='boolean') return String(obj);
  if(Array.isArray(obj)){
    if(obj.length===0) return '[]';
    var items = obj.map(function(v){ return '  '.repeat(depth+1)+serialize(v, depth+1); });
    return '[\n'+items.join(',\n')+'\n'+'  '.repeat(depth)+']';
  }
  if(typeof obj==='object'){
    var keys = Object.keys(obj);
    if(keys.length===0) return '{}';
    var items = keys.map(function(k){
      var v = obj[k];
      if(v===undefined) return '';
      return '  '.repeat(depth+1)+k+': '+serialize(v, depth+1);
    }).filter(Boolean);
    return '{\n'+items.join(',\n')+'\n'+'  '.repeat(depth)+'}';
  }
  return String(obj);
}

var serialized = serialize(TEST, 0);
var newBlock = 'const TEST_SHOP_BTN = '+serialized+';';

var newBG = BG.slice(0, startIdx) + newBlock + BG.slice(endIdx+1);

fs.writeFileSync('build-guides.js', newBG, 'utf8');
console.log('build-guides.js updated successfully');