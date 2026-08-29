const fs=require('fs'), vm=require('vm');
let code=fs.readFileSync('js/shop-buttons.js','utf8');
code += '\n;globalThis.__T=shopButtonsTest;globalThis.__BTN=TEST_SHOP_BTN;';
code = code.replace(/const SHOP_FLAG = \{ zzounds: usaFlag\(\), reverb: globeIcon\(\), gear4music: globeIcon\(\), musicstore: globeIcon\(\), andertons: ukFlag\(\) \};/,'');
const sandbox={ window:{}, console, setTimeout,
  SHOP_FLAG:{zzounds:()=>'',reverb:()=>'',gear4music:()=>'',musicstore:()=>'',andertons:()=>''} };
sandbox.getResolvedStores=()=>({});
sandbox.storeNames={};
sandbox.SHOP_LOGO_STYLE={};
vm.createContext(sandbox);
vm.runInContext(code,sandbox);
const TSB=sandbox.__BTN, shopButtonsTest=sandbox.__T;
function test(id,title,stores){
  const p={id,title,stores,category:'accessories',excludeStores:[]};
  sandbox.getResolvedStores=()=>stores;
  try{
    const html=shopButtonsTest(p,'en');
    if(html.length===0){ console.log(id,title,'-> EMPTY'); return; }
    const prices=sandbox.__BTN[id]&&sandbox.__BTN[id].prices||{};
    const oos=sandbox.__BTN[id]&&sandbox.__BTN[id].oos||[];
    // check the string contains each price currency value
    const shows=[];
    for(const st of Object.keys(prices)) if(html.indexOf(prices[st])!==-1) shows.push(st+':'+prices[st]);
    console.log(id,title,'-> OK',JSON.stringify(shows),'oos:',JSON.stringify(oos));
  }catch(e){ console.log(id,title,'-> ERROR:',e.message); }
}
test(395,'PreSonus FaderPort 8',{amazon:'a',zzounds:'z',reverb:'r',gear4music:'g',andertons:'an',musicstore:'m'});
test(396,'Behringer X-Touch',{amazon:'a',gear4music:'g',andertons:'an',musicstore:'m',zzounds:'z'});
test(397,'SSL UF1',{amazon:'a',zzounds:'z',reverb:'r',gear4music:'g',andertons:'an',musicstore:'m'});
test(398,'Avid S1',{zzounds:'z',musicstore:'m',amazon:'a',andertons:'an'});
test(399,'iCON Platform M+',{zzounds:'z',musicstore:'m',reverb:'r',amazon:'a'});
test(400,'Mackie MCU Pro',{zzounds:'z',andertons:'an',musicstore:'m',amazon:'a'});
test(427,'ATH-R30x',{amazon:'a',gear4music:'g'});
test(428,'Samson SR850',{amazon:'a',zzounds:'z',reverb:'r'});
