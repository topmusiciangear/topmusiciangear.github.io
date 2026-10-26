import re
out=[]
for p in ['js/translations.v2.min.js','js/translations.v3.min.js']:
    s=open(p,encoding='utf-8').read()
    total=s.count('\ufffd'); sp=s.count(' \ufffd ')
    out.append(f"{p} total {total} space {sp} other {total-sp}")
    n=0
    for m in re.finditer('\ufffd',s):
        i=m.start()
        if not (i>0 and s[i-1]==' ' and i+1<len(s) and s[i+1]==' '):
            out.append('  '+repr(s[max(0,i-50):i+50]))
            n+=1
            if n>=20: break
open('temp/fffd_contexts.txt','w',encoding='utf-8').write('\n'.join(out))
print('ok')
