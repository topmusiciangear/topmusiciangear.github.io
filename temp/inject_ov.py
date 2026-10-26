import re, os
v='58'
paths = ['index.html'] + [os.path.join('guides', f) for f in os.listdir('guides') if f.endswith('.html')]
n=0
for path in paths:
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        c = f.read()
    if 'overrides.css' in c:
        # just update version
        new_c = re.sub(r'/css/overrides\.css\?v=\d+', f'/css/overrides.css?v={v}', c)
    else:
        def repl(m):
            return m.group(0) + '\n  <link rel="stylesheet" href="/css/overrides.css?v='+v+'">'
        new_c = re.sub(r'<link[^>]+style\.min\.css[^>]+>', repl, c, count=1)
    if new_c != c:
        with open(path, 'w', encoding='utf-8', newline='') as f:
            f.write(new_c)
        n+=1
print('updated', n)
