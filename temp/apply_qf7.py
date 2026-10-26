import json
p='data/products.json'
d=json.load(open(p,encoding='utf-8'))
pm={x['id']:x for x in d}

data = {
 439: {"bestFor":{"en":"Streaming & podcasting","es":"Streaming y podcasting"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 504: {"bestFor":{"en":"Wireless lav & interview","es":"Lavalier e interview inalámbrico"},"facts":[
   {"icon":"microphone","value":"Wireless","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Omni","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"2.4 GHz","label":{"en":"Band","es":"Banda"},"tone":"good"}]},
 505: {"bestFor":{"en":"Wireless lav & interview","es":"Lavalier e interview inalámbrico"},"facts":[
   {"icon":"microphone","value":"Wireless","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Omni","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"2.4 GHz","label":{"en":"Band","es":"Banda"},"tone":"good"}]},
 506: {"bestFor":{"en":"2-person wireless","es":"Inalámbrico de 2 personas"},"facts":[
   {"icon":"microphone","value":"Wireless","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Omni","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"2.4 GHz","label":{"en":"Band","es":"Banda"},"tone":"good"}]},
 508: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 509: {"bestFor":{"en":"Wireless intercom","es":"Intercom inalámbrico"},"facts":[
   {"icon":"microphone","value":"Wireless","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"UHF","label":{"en":"Band","es":"Banda"},"tone":"good"}]},
 510: {"bestFor":{"en":"Wireless intercom","es":"Intercom inalámbrico"},"facts":[
   {"icon":"microphone","value":"Wireless","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"UHF","label":{"en":"Band","es":"Banda"},"tone":"good"}]},
 511: {"bestFor":{"en":"Wireless intercom","es":"Intercom inalámbrico"},"facts":[
   {"icon":"microphone","value":"Wireless","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"UHF","label":{"en":"Band","es":"Banda"},"tone":"good"}]},
 518: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 635: {"bestFor":{"en":"Snare & guitar amps","es":"Caja y amplis de guitarra"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 636: {"bestFor":{"en":"Instruments & amps","es":"Instrumentos y amplis"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 652: {"bestFor":{"en":"Studio vocals","es":"Voz en estudio"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"7 dB-A","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"}]},
 654: {"bestFor":{"en":"Studio vocals","es":"Voz en estudio"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"7 dB-A","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"}]},
 655: {"bestFor":{"en":"Studio vocals","es":"Voz en estudio"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 656: {"bestFor":{"en":"Studio vocals & modeling","es":"Voz y modelado en estudio"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Multi-pattern","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 657: {"bestFor":{"en":"Studio vocals","es":"Voz en estudio"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"16 dB-A","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"}]},
 666: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 670: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 672: {"bestFor":{"en":"Home studio vocals","es":"Voz en home studio"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 673: {"bestFor":{"en":"Studio vocals","es":"Voz en estudio"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 674: {"bestFor":{"en":"Studio vocals","es":"Voz en estudio"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 675: {"bestFor":{"en":"Home studio","es":"Home studio"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
}

for pid, qf in data.items():
    prod = pm[pid]
    prod['bestFor'] = qf['bestFor']
    prod['facts'] = qf['facts']
    print("Updated", pid, prod['title'])

json.dump(d, open(p,'w',encoding='utf-8'), ensure_ascii=False, indent=2)
print("done")
