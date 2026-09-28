var fs=require('fs');
var A=JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var g=A.find(x=>x.id==='premium-interfaces');
// Polishes for natural Spanish
function repl(o,k,from,to){ if(o[k] && o[k].indexOf(from)>=0) o[k]=o[k].split(from).join(to); }

g.sections.forEach(s=>{
  repl(s,'content_es','cuando vives en UAD','si trabajas con UAD');
  repl(s,'content_es','Es USB-C por ADAT o tarjeta opcional AoIP Dante — brillante','Se conecta por USB-C y amplía por ADAT o tarjeta opcional AoIP Dante — brillante');
  repl(s,'content_es','Pide Thunderbolt 3','Necesita Thunderbolt 3');
  repl(s,'content_es','cuéntalo en el presupuesto','tenlo en cuenta en el presupuesto');
  repl(s,'content_es','TotalMix es profundo al principio','TotalMix impone al principio');
  repl(s,'content_es','trasera densa 2U que pide planificar el rack','trasera densa en 2U que obliga a planificar el rack');
  repl(s,'content_es','DB25 pide breakout','La conexión DB25 requiere cables breakout');
  repl(s,'content_es','La E/S AES pide el LM-DIG opcional','La E/S AES requiere el módulo opcional LM-DIG');
});

// verdict: make slightly more conversational
g.verdict_es=g.verdict_es.replace('¿Quieres color UAD al grabar?','¿Buscas color UAD al grabar?');
g.verdict_es=g.verdict_es.replace('¿Un controlador de sobremesa con audio en red?','¿Un controlador de sobremesa con red?');

// conclusion: already natural, tiny polish
repl(g,'conclusion_es','cuando naces en Atmos','cuando tu sala ya nace pensada para Atmos');

// productTable: check a few literal values
var rows=g.productTable.rows;
rows.forEach(r=>{
  r.values.forEach(v=>{
    if(v.value_es) {
      v.value_es=v.value_es.replace('Grabación de banda con 8 previos Unison y DSP HEXA Core','Grabación de conjunto con 8 previos Unison y DSP HEXA Core');
      v.value_es=v.value_es.replace('Thunderbolt/USB-C (TB obligatorio para DSP)','Thunderbolt/USB-C (imprescindible para el DSP)');
    }
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(A,null,2),'utf8');
console.log('polished');
