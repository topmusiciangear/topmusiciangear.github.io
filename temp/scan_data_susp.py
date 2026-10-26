import os, json, re
# scan data json for suspicious mojibake-like sequences
suspicious = ['Ã','Â','â','ð','�','├','│','╗','┐']
for fn in os.listdir('data'):
    if not fn.endswith('.json'): continue
    p=os.path.join('data',fn)
    txt=open(p,encoding='utf-8').read()
    hits={c:txt.count(c) for c in suspicious if c in txt}
    if hits:
        print(fn, hits)