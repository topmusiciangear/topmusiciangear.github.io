import os, re
root='guides'
missing=[]
for fname in os.listdir(root):
    if not fname.endswith('.html'):
        continue
    path=os.path.join(root,fname)
    txt=open(path,'r',encoding='utf-8',errors='ignore').read()
    if '/css/overrides.css?v=59' not in txt:
        # check if overrides.css exists at all
        if 'overrides.css' not in txt:
            missing.append(fname)
        else:
            # maybe different version
            # still consider missing correct version
            missing.append(fname+' (version mismatch)')
print('Missing count:',len(missing))
for f in sorted(missing):
    print(f)
