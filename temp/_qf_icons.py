import re

build = open('build-guides.js', encoding='utf-8').read()
s = build.find('function _qfIcon')
seg = build[s:build.find('_cardBase', s)]
names = sorted(set(re.findall(r"name === '([a-zA-Z]+)'", seg)))
print(len(names))
print(names)
