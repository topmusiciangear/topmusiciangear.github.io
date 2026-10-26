# Generate new version hash from current CSS content
import hashlib

with open('css/style.min.css', 'rb') as f:
    content = f.read()
new_version = hashlib.md5(content).hexdigest()[:10]
print(f'New version: {new_version}')

# Update index.html
with open('index.html', encoding='utf-8') as f:
    c = f.read()

import re
# Replace all occurrences of the old version
c = re.sub(r'style\.min\.css\?v=[a-f0-9]+', f'style.min.css?v={new_version}', c)

with open('index.html', 'w', encoding='utf-8', newline='') as f:
    f.write(c)

print('Updated index.html with new version')