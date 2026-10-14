var fs=require('fs');
var P='C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
var A=JSON.parse(fs.readFileSync(P,'utf8'));
var LOW=function(s){return String(s||'').toLowerCase().replace(/\s+/g,' ').trim();};
var hits=0,applied=0;var R=[];
var IMG={
 'neumann mt 48':'https://r2.gear4music.com/media/91/914604/1200/preview.jpg',
 'apollo x8p':'https://r2.gear4music.com/media/113/1138813/1200/preview.jpg',
 'apogee symphony':'https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/2550/9078/102768-APOGEE-SYMPHONY-IO-MkII-FRONT-VIEW__05827.1714742907.jpg?c=1',
 'audient oria':'https://r2.gear4music.com/media/103/1036441/1200/preview.jpg'
};
var ES_FIX={
 'Voz/inst con Vintage 610, streaming':{en:'Vocal/inst with Vintage 610, streaming'},
 'Bajo coste alto rendimiento, ESS':{en:'Budget high-end performance, ESS'},
 '2 headphone, ADAT, iD scroll':{en:'2 headphone, ADAT, iD scroll'},
 'Podcast/streaming Smartgain, loopback':{en:'Podcast/streaming Smartgain, loopback'},
 'Vocal+76 compressor, MIDI':{en:'Vocal+76 compressor, MIDI'},
 'Smartgain, loopback':{en:'Smartgain, loopback'},
 'Voz/inst con Vintage 610, streaming':{en:'Vocal/inst with Vintage 610, streaming'}
};
function walkObjs(o,path,where){
 if(!o||typeof o!=='object')return;
 if(Array.isArray(o)){
  o.forEach(function(p,pi){ if(p&&typeof p==='object'){
    var nm=String(p.name||p.title||p.productName||'').toLowerCase();
    Object.keys(IMG).forEach(function(k){ if(nm.indexOf(k)>=0){
      hits++;var tgt=IMG[k];
      ['image','imageUrl','img','image_es','imageUrl_es','img_es'].forEach(function(key){
        if(p[key]===undefined)return;
        var lowcur=LOW(p[key]).split('?')[0];
        if(lowcur!==LOW(tgt).split('?')[0] && LOW(tgt).indexOf(lowcur)>=0===false){}
        if(lowcur===LOW(tgt)||lowcur===LOW(tgt).split('?')[0]){R.push(where+'['+pi+'] '+k+' already OK');return;}
        R.push(where+'['+pi+'] '+nm.replace(new RegExp(k,'i'),'['+k+']')+' '+key+' '+p[key]+' -> '+tgt);
        p[key]=tgt;if(!/NULL/i.test(String(p[key])))applied++;
      });
    }});
    walkObjs(p,path+'['+pi+']',where+'['+pi+']');
  }};
 }
 else Object.keys(o).forEach(function(k){ walkObjs(o[k],path+'.'+k,where+'.'+k); });
}
function fixCells(t){
 if(!t||!Array.isArray(t.rows))return;
 t.rows.forEach(function(r,ri){
  var cells=r.cells||r.values||[];
  cells.forEach(function(c,ci){
   var v=c===undefined||c===null?'':String(c.value===undefined?'':c.value);
   var key=ES_FIX[v];
   if(key){R.push('  CELL['+ri+']['+ci+'] EN was ES: '+JSON.stringify(v)+' -> '+JSON.stringify(key.en));c.value=key.en;applied++;}
  });
 });
}
A.forEach(function(g,gi){
 var slug=String(g.slug||g.id||'');
 if(slug!=='portable-interfaces'&&slug!=='premium-interfaces')return;
 R.push('\n### '+slug+' idx='+gi);
 walkObjs(g,slug,slug);
 if(slug==='portable-interfaces'){
   ['productTable','comparison','comparisonTable','productTable_es','comparisonTable_es'].forEach(function(k){ if(g[k]&&g[k].rows)fixCells(g[k]); });
 }
});
fs.writeFileSync(P,JSON.stringify(A,null,2),'utf8');
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/cons_patch/dump3.txt',R.join('\n')+'\n\nhits='+hits+' applied='+applied,'utf8');
console.log('done hits='+hits+' applied='+applied);
