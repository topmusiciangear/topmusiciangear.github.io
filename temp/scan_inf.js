const fs = require('fs');
const d = 'C:/Users/Daniel/.local/share/opencode/tool-output/';
// Infinity 2 page
{
  const s = fs.readFileSync(d + 'tool_116e45a11001jOMDBZOrm6qdRn', 'utf8');
  const imgs = [...new Set(s.match(/https?:\/\/[^)"'\s]*infinity[^)"'\s]*\.(png|jpg|jpeg|webp)[^)"'\s]*/gi) || [])];
  console.log('INF2: ' + (imgs.slice(0, 8).join(' | ') || 'NONE'));
}
// newest file = X4 jina fetch
{
  const files = fs.readdirSync(d).map(f => ({ f, t: fs.statSync(d + f).mtimeMs })).sort((a, b) => b.t - a.t);
  console.log('newest: ' + files.slice(0, 4).map(x => x.f).join(', '));
}
