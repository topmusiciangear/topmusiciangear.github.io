import json
g = json.load(open('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', encoding='utf8'))
for x in g:
    if x['id'] in ('best-parlor-guitars', 'rodecaster-pro2-vs-dlz-creator'):
        v = x.get('description_es', x.get('description', ''))
        # codepoints no-ascii usados
        chars = sorted(set(c for c in v if ord(c) > 127))
        print(x['id'], '->', [hex(ord(c)) + '=' + c for c in chars])
