import json
g = json.load(open('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', encoding='utf8'))
for x in g:
    if x['id'] in ('precision-vs-jazz', 'beginner-guitar'):
        v = x.get('description_es', '')
        tail = v[-14:]
        print(x['id'], '->', [hex(ord(c)) for c in tail], repr(tail.encode('unicode_escape').decode()))
