import hashlib, re, glob, os

# read and minify css
with open('css/style.css','r',encoding='utf-8') as f:
    css = f.read()

import re
minified = re.sub(r'/\*.*?\*/', '', open('css/style.css').read(), flags=re.DOTALL)
minified = re.sub(r'\s+', ' ', minified)
minified = re.sub(r'\s*([{}:;,>+~])\s*', r'\1', minified)
minified = minified.strip()

with open('css/style.min.css','w',encoding='utf-8') as f:
    f.write(minified)

h = hashlib.md5(minified.encode()).hexdigest()[:10]
print('hash', h)

# update index.html and all guide html files
new_version = hashlib.md5(minified.encode()).hexdigest()[:10]
print('new version', new_version)

for path in ['index.html'] + [os.path.join('guides', f) for f in os.listdir('guides') if f.endswith('.html')]:
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        c = f.read()
    c = re.sub(r'style\.min\.css\?v=[a-f0-9]+', f'style.min.css?v={hashlib.md5(minified.encode()).hexdigest()[:10]}', c)
    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(c)
print('All HTML updated')