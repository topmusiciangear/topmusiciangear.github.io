const fs=require('fs'), vm=require('vm');
let code=fs.readFileSync('js/shop-buttons.js','utf8');
code += '\n;globalThis.__T=shopButtonsTest;globalThis.__BTN=TEST_SHOP_BTN;';
// replace the SHOP_FLAG def with functional version, as in build-guides
code = code.replace(/const SHOP_FLAG = \{ zzounds: usaFlag\(\), reverb: globeIcon\(\), gear4music: globeIcon\(\), musicstore: globeIcon\(\), andertons: ukFlag\(\) \};/, '');
const sandbox={ window:{}, console, setTimeout,
  SHOP_FLAG:{zzounds:()=>'',reverb:()=>'',gear4music:()=>'',musicstore:()=>'',andertons:()=>''} };
sandbox.storeNames={}; sandbox.SHOP_LOGO_STYLE={};
vm.createContext(sandbox);
vm.runInContext(code,sandbox);
const TSB=sandbox.__BTN, shopButtonsTest=sandbox.__T;
const cases={124:['amazon','gear4music','andertons'],148:['amazon','gear4music','andertons','zzounds'],173:['amazon','gear4music'],216:['amazon','gear4music','andertons'],406:['amazon','gear4music','zzounds','andertons'],408:['amazon','gear4music','zzounds'],384:['musicstore'],163:['amazon','gear4music']};
for(const [id,st] of Object.entries(cases)){
  const pid=parseInt(id); const stores={}; st.forEach(k=>stores[k]='x');
  const p={id:pid,title:'P'+id,category:'accessories',excludeStores:[],stores};
  sandbox.getResolvedStores=()=>stores;
  try{
    const html=shopButtonsTest(p,'en');
    const pr=TSB[pid]&&TSB[pid].prices||{};
    const shown=Object.entries(pr).filter(([k,v])=>html.indexOf(v)!==-1).map(([k,v])=>k+':'+v);
    console.log(id,'->','renders:',html.length>0,'| prices shown:',JSON.stringify(shown));
  }catch(e){ console.log(id,'-> ERROR:',e.message); }
}
