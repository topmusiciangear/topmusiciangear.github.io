import re, glob
titlecase=set()
for f in glob.glob('guides/*_es.html'):
    s=open(f,encoding='utf-8').read()
    for m in re.finditer(r'qf-label">([^<]+)', s):
        lbl=m.group(1)
        words=lbl.split()
        caps=[w for w in words if w and w[0].isupper() and not w.isupper()]
        if len(caps)>=2:
            titlecase.add(lbl)
out='\n'.join(sorted(titlecase)) if titlecase else '(none)'
open('temp/tc.txt','w',encoding='utf-8').write(out)
print('done', len(titlecase))
