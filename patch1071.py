import json
p='data/products.json'
d=json.load(open(p,'r',encoding='utf-8'))
for prod in d:
    if prod.get('id')==1071:
        prod['bestFor']={'en':'Neve 1073 color with Air band and M/S','es':'Color Neve 1073 con banda Air y M/S'}
        prod['score']=9.1
        prod['facts']=[
            {'icon':'sliders','value':'Console emulation channel strip','label':{'en':'Type','es':'Tipo'},'tone':'good'},
            {'icon':'compactDisc','value':'VST2/VST3/AU/AAX','label':{'en':'Format','es':'Formato'},'tone':'good'},
            {'icon':'signal','value':'macOS & Windows','label':{'en':'Platforms','es':'Plataformas'},'tone':'good'},
            {'icon':'lock','value':'iLok','label':{'en':'Copy protection','es':'Protección anticopia'},'tone':'good'}
        ]
        break
json.dump(d, open(p,'w',encoding='utf-8'), indent=2)
print('done')