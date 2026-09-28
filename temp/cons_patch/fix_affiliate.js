var fs=require('fs');
var s=fs.readFileSync('affiliate-disclosure.html','utf8');
var old = '<div class="partner"><strong>zZounds</strong>US-based instrument retailer</div>\n\n      </div>';
var newS = '<div class="partner"><strong>zZounds</strong>US-based instrument retailer</div>\n        <div class="partner"><strong>Hollyland</strong>Wireless audio & intercom systems</div>\n\n      </div>';
if(s.includes(old)){
  s=s.replace(old, newS);
  fs.writeFileSync('affiliate-disclosure.html', s, 'utf8');
  console.log('affiliate-disclosure.html updated with Hollyland');
}else{
  console.log('Pattern not found');
  console.log('Looking for:', JSON.stringify(old));
}