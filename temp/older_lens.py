import subprocess, json
revs=['f836ef5876^','ef65c1c7ab^','3a02d0e964^','9f819ec6dc^','2e7c062233^','03afe393e6^','b0d477428a^']
for rev in revs:
    try:
        raw=subprocess.check_output(['git','show',f'{rev}:data/products.json'])
    except Exception as e:
        print(rev,'ERR'); continue
    text=raw.decode('utf-16') if raw[:2]==b'\xff\xfe' else raw.decode('utf-8-sig')
    data=json.loads(text)
    lens=[len((p.get('desc') or '').strip()) for p in data if p.get('desc')]
    lens.sort()
    print(rev,'median',lens[len(lens)//2],'p90',lens[int(len(lens)*0.9)],'max',lens[-1],'>250',sum(1 for x in lens if x>250))