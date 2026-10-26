import re
s = open('js/icons.js', encoding='utf-8').read()
names = re.findall(r'^\s*([a-zA-Z0-9]+):\s*\{\s*path:', s, re.M)
print(len(names))
print(sorted(names))
