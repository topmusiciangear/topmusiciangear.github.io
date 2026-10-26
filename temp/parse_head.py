raw=open('temp/head_products.json','rb').read()
if raw[:2]==b'\xff\xfe':
    text=raw.decode('utf-16')
else:
    text=raw.decode('utf-8')
import json
data=json.loads(text)
pr=[x for x in data if x['id']==116][0]
s=pr['desc_es']
pos=s.find('est')
chunk=s[pos:pos+8]
out=repr(chunk)+'\n'+' '.join(f'U+{ord(c):04X}' for c in chunk)
open('temp/head_parsed.txt','w',encoding='utf-8').write(out)