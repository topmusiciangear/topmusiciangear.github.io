import subprocess, json
rev='f836ef5876^'
raw=subprocess.check_output(['git','show',f'{rev}:data/products.json'])
text=raw.decode('utf-16') if raw[:2]==b'\xff\xfe' else raw.decode('utf-8-sig')
data=json.loads(text)
open('temp/products_full_original.json','w',encoding='utf-8').write(json.dumps(data,ensure_ascii=False,indent=2))
print('saved',len(data))
# length stats
for f in ['desc','desc_es']:
    lens=[len((p.get(f) or '').strip()) for p in data if p.get(f)]
    lens.sort()
    print(f,'median',lens[len(lens)//2],'p90',lens[int(len(lens)*0.9)],'max',lens[-1])