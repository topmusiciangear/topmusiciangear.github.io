import json
guides_path='data/guides.json'
clean_path='temp/budget-mics-cleaned.json'
guides=json.load(open(guides_path,'r',encoding='utf-8'))
clean=json.load(open(clean_path,'r',encoding='utf-8'))
for i,g in enumerate(guides):
    if g.get('id')=='budget-mics':
        guides[i]=clean
        break
else:
    print('not found')
    raise SystemExit(1)
open(guides_path,'w',encoding='utf-8').write(json.dumps(guides,ensure_ascii=False))
print('replaced')
