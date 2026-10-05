const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
['ableton-vs-fl-studio', 'ew-iem-g4-twin-vs-psm300', 'me90-vs-mx5', 'rodecaster-pro2-vs-dlz-creator'].forEach(gid => {
  const h = fs.readFileSync(DIR + 'guides/' + gid + '.html', 'utf8');
  console.log('### ' + gid);
  h.split('<h2 class="guide-section-heading"').slice(1).forEach((p, i) => {
    const hm = p.match(/>([^<]{5,80})</);
    const imgs = [];
    const re = /<img src="([^"]+)"[^>]*class="guide-section-img/g;
    let m;
    while ((m = re.exec(p)) !== null) imgs.push(m[1].split('/').pop().slice(0, 35));
    console.log(' S' + (i + 1) + ' ' + (hm ? hm[1].slice(0, 45) : '?') + ' | ' + JSON.stringify(imgs));
  });
});