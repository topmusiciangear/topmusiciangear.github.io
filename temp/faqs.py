import json
g=json.load(open('data/guides.json',encoding='utf-8'))
guide=next(x for x in g if x['id']=='budget-mics')
fs=guide['featuredSnippet']
qs=[k for k in fs if k.startswith('faq_q')]
print(qs)
for k in qs:
    print(k, fs[k])
