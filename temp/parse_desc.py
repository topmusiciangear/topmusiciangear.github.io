import json
data=open('data/products.json','rb').read().decode('utf-8')
obj=json.loads(data)
pr=[x for x in obj if x['id']==116][0]
s=pr['desc_es']
pos=s.find('est')
chunk=s[pos:pos+12]
with open('temp/parsed.txt','w',encoding='utf-8') as f:
    f.write(repr(chunk)+'\n')
    f.write(' '.join(f'U+{ord(c):04X}' for c in chunk)+'\n')