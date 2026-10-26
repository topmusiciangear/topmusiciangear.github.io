import re
s=open('guides/best-mic-for-guitar-amps_es.html',encoding='utf-8').read()
for m in re.finditer(r'qf-label">([^<]+)', s):
    print(repr(m.group(1)))
for m in re.finditer(r'qf-value">([^<]+)', s):
    print('VAL:', repr(m.group(1)))
