import re

s = open('js/icons.js', encoding='utf-8').read()
m = re.search(r'var __icons\s*=\s*\{', s)
start = m.start()
depth = 0
i = s.index('{', start)
while i < len(s):
    c = s[i]
    if c == '{':
        depth += 1
    elif c == '}':
        depth -= 1
        if depth == 0:
            break
    i += 1
obj = s[start:i+1]
keys = re.findall(r'"([A-Za-z0-9-]+)"\s*:', obj)
print(len(keys))
print(keys)
