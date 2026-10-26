import json, re
data=json.load(open('data/products.json',encoding='utf-8'))
en_bad=[]; es_bad=[]; short=[]; long=[]
en_stop=set('a an the and or but for with of to in on at by from as is are was were be been being this that these those per'.split())
es_stop=set('a al con de del el en es la las lo los para por que se un una y o su sus'.split())
for pr in data:
    for field,lang,stop,bad in [('desc','EN',en_stop,en_bad),('desc_es','ES',es_stop,es_bad)]:
        s=(pr.get(field) or '').strip()
        if not s: continue
        if s.endswith('...') or s.endswith('…'):
            bad.append((pr['id'],field,'ellipsis',s))
        if not re.search(r'[.!?]$', s):
            bad.append((pr['id'],field,'no punctuation',s))
        last=re.findall(r"[\wÁÉÍÓÚÜÑáéíóúüñ]+", s)
        if last and last[-1].lower() in stop:
            bad.append((pr['id'],field,'stopword '+last[-1],s))
        if len(s)<60: short.append((pr['id'],field,len(s),s))
        if len(s)>180: long.append((pr['id'],field,len(s),s))
print('bad:',len(en_bad)+len(es_bad),'short:',len(short),'long:',len(long))
# write details
with open('temp/desc_audit.txt','w',encoding='utf-8') as f:
    f.write('=== BAD ===\n')
    for x in en_bad+es_bad: f.write(repr(x)+'\n')
    f.write('=== SHORT ===\n')
    for x in short: f.write(repr(x)+'\n')
    f.write('=== LONG ===\n')
    for x in long: f.write(repr(x)+'\n')