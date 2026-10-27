import os
root='guides'
has=[]
for fname in os.listdir(root):
    if not fname.endswith('.html'):
        continue
    path=os.path.join(root,fname)
    txt=open(path,'r',encoding='utf-8',errors='ignore').read()
    if '/css/overrides.css?v=59' in txt:
        has.append(fname)
print('has',len(has))
print(has[:20])
