import re
for p in ['guides/best-monitors_es.html']:
    s=open(p,encoding='utf-8').read()
    i=s.find('legendario monitor')
    chunk=s[i:i+120]
    print(p, repr(chunk))
    print(' '.join(f'U+{ord(c):04X}' for c in chunk if ord(c)>127))
for p in ['js/translations.v2.min.js','js/translations.v3.min.js']:
    s=open(p,encoding='utf-8').read()
    print('\n===',p,'FFFD count',s.count('\ufffd'))
    idx=[m.start() for m in re.finditer('\ufffd',s)][:8]
    for i in idx:
        print(repr(s[max(0,i-60):i+60]))
