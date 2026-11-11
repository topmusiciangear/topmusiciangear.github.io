import json, re, glob

g = json.load(open('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', encoding='utf8'))
for x in g:
    if x['id'] in ('best-parlor-guitars', 'channel-strip-plugins', 'rodecaster-pro2-vs-dlz-creator', 'best-amp-modelers'):
        print(x['id'], '::', x.get('description_es', x.get('description', ''))[:110])
