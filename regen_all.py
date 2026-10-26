import re, hashlib, glob, os

# Read CSS
with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Minify
import re
minified = re.sub(r'/\*.*?\*/', '', open('css/style.css').read(), flags=re.DOTALL)
minified = re.sub(r'\s+', ' ', minified)
minified = re.sub(r'\s*([{}:;,>+~])\s*', r'\1', minified)
minified = minified.strip()

with open('css/style.min.css', 'w', encoding='utf-8') as f:
    f.write(minified)

h = hashlib.md5(minified.encode()).hexdigest()[:10]
print('Minified hash:', h)

# Update all HTML files
import hashlib, glob, os
new_version = hashlib.md5(open('css/style.min.css', 'rb').read()).hexdigest()[:10]
print('New version:', new_version)

for path in ['index.html'] + [os.path.join('guides', f) for f in os.listdir('guides') if f.endswith('.html')]:
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    content = re.sub(r'style\.min\.css\?v=[a-f0-9]+', f'style.min.css?v={hashlib.md5(open("css/style.min.css", "rb").read()).hexdigest()[:10]}', content)
    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(content)

print('All HTML updated')