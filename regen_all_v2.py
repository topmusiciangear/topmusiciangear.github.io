import re, hashlib, glob, os

# Read and minify CSS
with open('css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Minify
minified = re.sub(r'/\*.*?\*/', '', open('css/style.css').read(), flags=re.DOTALL)
minified = re.sub(r'\s+', ' ', minified)
minified = re.sub(r'\s*([{}:;,>+~])\s*', r'\1', minified)
minified = minified.strip()

with open('css/style.min.css', 'w', encoding='utf-8') as f:
    f.write(minified)

h = hashlib.md5(minified.encode()).hexdigest()[:10]
print('New minified hash:', h)

# Get version from minified file
with open('css/style.min.css', 'rb') as f:
    new_version = hashlib.md5(f.read()).hexdigest()[:10]
print('New version:', new_version)

# Update all HTML files
import re, glob, os
for path in ['index.html'] + [os.path.join('guides', f) for f in os.listdir('guides') if f.endswith('.html')]:
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    content = re.sub(r'style\.min\.css\?v=[a-f0-9]+', 'style.min.css?v=' + new_version, content)
    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print('Updated', path)

print('All HTML files updated with new version:', new_version)