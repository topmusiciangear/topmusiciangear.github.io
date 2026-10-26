import re, glob
labels=set()
for f in glob.glob('guides/*_es.html'):
    s=open(f,encoding='utf-8').read()
    for m in re.finditer(r'qf-label">([^<]+)', s):
        labels.add(m.group(1))
out='\n'.join(sorted(labels))
open('temp/all_qf.txt','w',encoding='utf-8').write(out)
print('done', len(labels))
