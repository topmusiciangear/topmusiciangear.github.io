var g=JSON.parse(require('fs').readFileSync('data/guides.json','utf8'));
var r=g.find(function(x){return x.id==='best-keyboard'});

// Section 1 (digital pianos) - remove beginner callout from end
var s2=r.sections[1];
var marker='</div>';
var calloutStart=s2.content.lastIndexOf('<div class="guide-callout"');
if(calloutStart!==-1) s2.content=s2.content.substring(0,calloutStart);
var calloutStartEs=s2.content_es.lastIndexOf('<div class="guide-callout"');
if(calloutStartEs!==-1) s2.content_es=s2.content_es.substring(0,calloutStartEs);

// Section 4 (GO:KEYS 3) - remove recommendation callout from start
var s5=r.sections[4];
var calloutEnd=s5.content.indexOf('</div>',s5.content.indexOf('<div class="guide-callout"'));
if(calloutEnd!==-1) s5.content=s5.content.substring(calloutEnd+6);
var calloutEndEs=s5.content_es.indexOf('</div>',s5.content_es.indexOf('<div class="guide-callout"'));
if(calloutEndEs!==-1) s5.content_es=s5.content_es.substring(calloutEndEs+6);

require('fs').writeFileSync('data/guides.json',JSON.stringify(g,null,2));
console.log('done');
