import json
g=json.load(open('data/guides.json', encoding='utf-8'))
guide=next(x for x in g if x.get('id')=='channel-strip-plugins')
vpc=guide.get('verdictProsCons', [])
for item in vpc:
    print(item.get('productId'))
    print('pros', item.get('pros'))
    print('cons', item.get('cons'))
    print('---')
