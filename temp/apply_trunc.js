const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
function sub(gid, get, oldS, newS) {
  const g = G.find(x => x.id === gid);
  const obj = get(g);
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'string' && obj[key].includes(oldS)) {
      obj[key] = obj[key].split(oldS).join(newS);
      console.log('OK ' + gid + ' ' + key);
      return;
    }
  }
  console.log('MISS ' + gid + ' ' + oldS.slice(0, 50));
}
sub('best-interface', g => g.featuredSnippet, "I've recor...", 'Recording-tested reliability with clean preamps and stable drivers...');
sub('stage-mics', g => g.featuredSnippet, "I've tested them all on real stages...", 'Tested on real stages for feedback rejection and output...');
sub('stage-mics', g => g.featuredSnippet, 'Los he probado todos en escenarios reales...', 'Probados en escenarios reales en rechazo y nivel de salida...');
sub('fx-plugins', g => g.featuredSnippet, 'Decapitator is my secret weapon for adding analog warmth, grit, and harmonic saturation to...', 'Decapitator is a go-to tool for adding analog warmth, grit, and harmonic saturation to...');
sub('fx-plugins', g => g.featuredSnippet, 'Decapitator es mi arma secreta para añadir calidez analógica, textura y saturación armónica a c...', 'Decapitator es una herramienta clave para añadir calidez analógica, textura y saturación armónica a c...');
fs.writeFileSync(F, JSON.stringify(G, null, 2));