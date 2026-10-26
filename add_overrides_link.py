import re, os
paths = ['index.html'] + [os.path.join('guides', f) for f in os.listdir('guides') if f.endswith('.html')]
for path in paths:
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        c = f.read()
    def repl(m):
        return m.group(0) + '\n  <link rel="stylesheet" href="/css/overrides.css?v=1">'
    new_c = re.sub(r'<link[^>]+style\.min\.css[^>]+>', repl, c, count=1)
    if new_c != c:
        with open(path, 'w', encoding='utf-8', newline='') as f:
            f.write(new_c)
        print('updated', path)
