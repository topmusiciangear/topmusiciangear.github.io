import re, glob, json
for p in ['js/translations.v2.min.js','js/translations.v3.min.js']:
    s=open(p,encoding='utf-8').read()
    total=s.count('\ufffd')
    sp=s.count(' \ufffd ')
    other=total-sp
    print(p,'total',total,'space-surrounded',sp,'other',other)
    # contexts for non-space-surrounded
    for m in re.finditer('\ufffd',s):
        i=m.start()
        if not (i>0 and s[i-1]==' ' and i+1<len(s) and s[i+1]==' '):
            print('  ctx:',repr(s[max(0,i-40):i+40]))
# references
for p in ['index.html','js/app.js','js/app.min.js']:
    s=open(p,encoding='utf-8').read()
    hits=[m.start() for m in re.finditer('translations', s)]
    print(p,'translations refs',len(hits))
    for i in hits[:6]:
        print('  ',repr(s[max(0,i-80):i+80]))
