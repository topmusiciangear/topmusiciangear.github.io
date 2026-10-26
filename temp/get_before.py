import subprocess, json
raw=subprocess.check_output(['git','show','1ed1e5325e:data/products.json'])
# detect encoding
if raw[:2]==b'\xff\xfe':
    text=raw.decode('utf-16')
else:
    text=raw.decode('utf-8-sig')
data=json.loads(text)
open('temp/products_before.json','w',encoding='utf-8').write(json.dumps(data,ensure_ascii=False,indent=2))
print('saved',len(data))