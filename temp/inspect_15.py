import json
g = json.load(open('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', encoding='utf8'))
for x in g:
    if x['id'] in ('precision-vs-jazz', 'beginner-guitar', 'best-keyboard'):
        v = x.get('description_es', '')
        print(x['id'], '(' + str(len(v)) + ')')
        print('   ', repr(v))
