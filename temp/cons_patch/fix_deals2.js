var fs=require('fs');
var s=fs.readFileSync('deals.html','utf8');
// Find the closing of deals-stores div
var idx = s.indexOf('</div>      </div>      </div>');
if(idx<0) idx = s.indexOf('</div>\n      </div>\n    </div>');
if(idx<0) idx = s.indexOf('</div>        </div>\n      </div>');
if(idx<0) idx = s.indexOf('</div>\n        </div>\n      </div>');
console.log('idx:', idx);
if(idx>=0){
  var before = s.slice(0, idx);
  var after = s.slice(idx);
  // Find the last </a> before the closing
  var lastA = before.lastIndexOf('</a>');
  if(lastA>=0){
    var hollyland = '<a href="https://www.hollyland.com/" target="_blank" rel="noopener noreferrer sponsored" class="deals-store" style="--store-color:#1e40af"><img src="img/hollyland-icon.png" alt="Hollyland" width="20" height="20"><span>Hollyland</span></a>';
    var newBefore = before.slice(0, lastA+4) + hollyland + before.slice(lastA+4);
    var newS = newBefore + after;
    fs.writeFileSync('deals.html', newS, 'utf8');
    console.log('deals.html updated with Hollyland');
  }else{
    console.log('last </a> not found');
  }
}else{
  console.log('closing div not found');
}