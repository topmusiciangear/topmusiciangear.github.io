const fs = require('fs');
// index.html: remove the top-search-actions block containing only the close button
for (const f of ['index.html', 'es/index.html']) {
  let s = fs.readFileSync(f, 'utf8');
  // Remove the close button line and the actions wrapper if it only had close
  s = s.replace(/          <div class="top-search-actions">\s*\n            <button type="button" id="topSearchClose"[^>]*>&times;<\/button>\s*\n          <\/div>\s*\n/, '');
  fs.writeFileSync(f, s);
  console.log(f, 'done');
}