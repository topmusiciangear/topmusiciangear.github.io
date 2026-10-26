import os
suspicious = ['Ã','Â','â','ð','�','├','│','╗','┐','Ã©','Ã³','Ã¡','Ã­','Ãº','Ã±']
badfiles=0
for fn in os.listdir('guides'):
    if not fn.endswith('.html'): continue
    txt=open(os.path.join('guides',fn),encoding='utf-8').read()
    hits={c:txt.count(c) for c in suspicious if c in txt}
    if hits:
        badfiles+=1
        if badfiles<=5:
            print(fn, hits)
print('guides with suspicious chars:', badfiles)