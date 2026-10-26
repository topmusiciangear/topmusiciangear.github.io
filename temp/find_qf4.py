import re
s=open('guides/best-mic-for-guitar-amps_es.html',encoding='utf-8').read()
for m in re.finditer(r'qf-(?:label|value)">([^<]+)', s):
    print(repr(m.group(0)))
