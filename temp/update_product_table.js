const fs=require('fs');
const path='data/guides.json';
const data=JSON.parse(fs.readFileSync(path,'utf8'));
const g=data.find(x=>x.id==='best-monitors');
if(g && g.productTable){
  const cols=g.productTable.columns;
  const idx=cols.findIndex(c=>c.title.includes('LP-UNF'));
  if(idx!==-1){
    // replace column
    cols[idx]={title:'Focal Twin6 ST6', title_es:'Focal Twin6 ST6'};
    // remove corresponding values from each row
    for(const row of g.productTable.rows){
      if(Array.isArray(row.values) && row.values.length>idx){
        // replace with placeholder empty string
        row.values[idx]='';
      }
    }
  }
  fs.writeFileSync(path, JSON.stringify(data,null,2));
  console.log('updated');
}
