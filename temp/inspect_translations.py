import re
out=[]
for p in ['js/translations.v2.min.js','js/translations.v3.min.js']:
    s=open(p,encoding='utf-8').read()
    out.append(f"=== {p} FFFD count {s.count(chr(0xfffd))}")
    idx=[m.start() for m in re.finditer(chr(0xfffd),s)][:10]
    for i in idx:
        out.append(repr(s[max(0,i-70):i+70]))
open('temp/translations_context.txt','w',encoding='utf-8').write('\n'.join(out))
print('written')
