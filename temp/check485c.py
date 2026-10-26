import re

s = open('guides/best-bass-amps_es.html', encoding='utf-8').read()
for m in re.finditer(r'TMG-AMPS-485', s):
    print('at', m.start(), repr(s[max(0, m.start()-300):m.start()+120]))
    print()
