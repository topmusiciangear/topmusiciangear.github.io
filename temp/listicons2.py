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
keys = re.findall(r'([A-Za-z][A-Za-z0-9]*)\s*:\s*\{\s*path:', obj)
print(len(keys))
# print keys containing relevant substrings
needle = ['volume','wave','sine','gauge','piano','stack','weight','chart','microphone','mic','arrow','exchange','music','keyboard','meter','gain','pad','cut','bass','poly','note']
for k in keys:
    if any(n in k.lower() for n in needle):
        print(k)
print('--- all keys count', len(keys))
print(keys[:80])
