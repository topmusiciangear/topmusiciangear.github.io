import json

for n, pid in (('11', 580), ('12', 579)):
    inp = {x['id']: x for x in json.load(open('temp/enrich_batches/in_%s.json' % n, encoding='utf-8'))}
    out = {x['id']: x for x in json.load(open('temp/enrich_batches/out_%s.json' % n, encoding='utf-8'))}
    x = out[pid]
    i = inp[pid]
    print('===', n, pid, i['title'])
    print('ADD_EN:', x['add_en'])
    print('FULL_EN:', (i['desc'] + ' ' + x['add_en']).strip())
    print('ADD_ES:', x['add_es'])
    print('FULL_ES:', (i['desc_es'] + ' ' + x['add_es']).strip() if x['add_es'] else i['desc_es'])
    print()
