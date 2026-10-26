import subprocess, json
for rev in ['6e362a2','906f88d','1ed1e5325e']:
    try:
        raw=subprocess.check_output(['git','show',f'{rev}:data/products.json'])
    except Exception as e:
        print(rev,'ERR',e); continue
    if raw[:2]==b'\xff\xfe':
        text=raw.decode('utf-16')
    else:
        text=raw.decode('utf-8-sig')
    data=json.loads(text)
    if rev=='6e362a2':
        open('temp/products_original_full.json','w',encoding='utf-8').write(json.dumps(data,ensure_ascii=False,indent=2))
    for f in ['desc','desc_es']:
        lens=[len((p.get(f) or '').strip()) for p in data if p.get(f)]
        lens.sort()
        print(rev, f, 'n',len(lens),'median',lens[len(lens)//2],'p90',lens[int(len(lens)*0.9)],'max',lens[-1],'>160',sum(1 for x in lens if x>160),'>250',sum(1 for x in lens if x>250))