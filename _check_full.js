var g = require('./data/guides.json');
['open-headphones','tracking-headphones','scarlett-vs-volt'].forEach(function(id){
  var guide = g.find(function(x){return x.id === id});
  if (guide) {
    console.log('--- ' + id + ' ---');
    console.log('intro: "' + guide.intro + '"');
    console.log('');
    console.log('intro_es: "' + guide.intro_es + '"');
    console.log('');
  }
});
