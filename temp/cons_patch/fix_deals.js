var fs=require('fs');
var s=fs.readFileSync('deals.html','utf8');
// Find the deals-stores div and add Hollyland before closing
var old = '<a data-aff="https://www.anrdoezrs.net/click-101857888-10439229?url=https%3A%2F%2Fwww.zzounds.com%2F" href="https://www.zzounds.com/" target="_blank" rel="noopener noreferrer sponsored" class="deals-store" style="--store-color:#1a3a5c"><img src="img/zzounds-icon.png" alt="zZounds" width="20" height="20"><span>zZounds</span></a>        </div>';
var newA = '<a data-aff="https://www.anrdoezrs.net/click-101857888-10439229?url=https%3A%2F%2Fwww.zzounds.com%2F" href="https://www.zzounds.com/" target="_blank" rel="noopener noreferrer sponsored" class="deals-store" style="--store-color:#1a3a5c"><img src="img/zzounds-icon.png" alt="zZounds" width="20" height="20"><span>zZounds</span></a><a href="https://www.hollyland.com/" target="_blank" rel="noopener noreferrer sponsored" class="deals-store" style="--store-color:#1e40af"><img src="img/hollyland-icon.png" alt="Hollyland" width="20" height="20"><span>Hollyland</span></a>        </div>';
if(s.includes(old)){
  s=s.replace(old, newA);
  fs.writeFileSync('deals.html', s, 'utf8');
  console.log('deals.html updated with Hollyland');
}else{
  console.log('Pattern not found in deals.html');
}