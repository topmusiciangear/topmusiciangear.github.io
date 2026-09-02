const fs=require('fs');
let c=fs.readFileSync('build-guides.js','utf8');

const oosIds=[22,39,57,59,64,66,67,92,100,101,102,104,116,119,125,138,139,145,148,150,151,154,157,162,166,201,209,215,216,231,271,275,303,304,330,338,354,355,372,396,399,402,403];
const prices={301:'$599.99',107:'$469.00',451:'$249.00'};

let fixes=0;

oosIds.forEach(id=>{
  // Match the entry for this id
  const re=new RegExp(id+':\\s*\\{([\\s\\S]*?)\\},?\\s*(?=\\d+:|$)');
  const m=c.match(re);
  if(!m) return;
  let block=m[0];
  // Already has zzounds in oos?
  const oosMatch=block.match(/oos:\s*\[([^\]]*)\]/);
  if(oosMatch){
    if(oosMatch[1].includes('"zzounds"')) return;
    const newOos='oos:['+oosMatch[1].replace(/,\s*/,'').trim()+',"zzounds"]';
    c=c.replace(oosMatch[0],newOos);
    fixes++;
  } else {
    // Add oos:["zzounds"] before the closing }
    const closeIdx=m[0].lastIndexOf('}');
    const before=m[0].substring(0,closeIdx);
    const after=m[0].substring(closeIdx);
    const hasTrailingComma=before.trimEnd().endsWith(',');
    const insert=hasTrailingComma?'oos:["zzounds"]':',oos:["zzounds"]';
    c=c.replace(block, before+insert+after);
    fixes++;
  }
});

// Add zzounds prices for in-stock products
Object.entries(prices).forEach(([id,price])=>{
  const re=new RegExp('('+id+':\\s*\\{prices:\\{)');
  if(re.test(c)){
    c=c.replace(re, '$1zzounds:"'+price+'",');
    fixes++;
  }
});

fs.writeFileSync('build-guides.js',c);
console.log('Applied',fixes,'fixes');
