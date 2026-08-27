var h=require('fs').readFileSync('guides/pro-monitors.html','utf8');
var re=/data-store="([^"]+)"/g;
var m;
var stores={};
while((m=re.exec(h))!==null){
  var v=m[1];
  stores[v]=(stores[v]||0)+1;
}
console.log('data-store counts:',JSON.stringify(stores));

// Check primary buttons
var re2=/<a[^>]*data-store="([^"]+)"[^>]*class="shop-btn-primary"/g;
var primaries=[];
while((m=re2.exec(h))!==null){
  primaries.push(m[1]);
}
console.log('Primary buttons with data-store:',primaries);

// Check if geo script has correct regex
var hasAmerica=h.indexOf('America[/]')>=0;
var hasHrefCheck=h.indexOf("zRow.getAttribute('href')")>=0;
console.log('Has America regex:',hasAmerica);
console.log('Has href check:',hasHrefCheck);

// Check zZounds rows
var re3=/data-store="zzounds"[^>]*href="([^"]*)"/g;
var zzounds=[];
while((m=re3.exec(h))!==null){
  zzounds.push(m[1]?'HAS_URL':'NO_URL');
}
console.log('zZounds rows:',zzounds);
