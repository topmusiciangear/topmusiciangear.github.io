import json, statistics
d=json.load(open('temp/products_before.json',encoding='utf-8'))
for f in ['desc','desc_es']:
    lens=[len((p.get(f) or '').strip()) for p in d if p.get(f)]
    lens.sort()
    print(f, 'n',len(lens),'min',lens[0],'p25',lens[len(lens)//4],'median',lens[len(lens)//2],'p75',lens[3*len(lens)//4],'p90',lens[int(len(lens)*0.9)],'max',lens[-1])
    # count > 200, >250, >300
    for t in [150,180,200,250,300]:
        print(' >',t,sum(1 for x in lens if x>t))