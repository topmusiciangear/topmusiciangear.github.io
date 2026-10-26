import json
p='data/products.json'
d=json.load(open(p,encoding='utf-8'))
pm={x['id']:x for x in d}

data = {
 226: {"bestFor":{"en":"Live vocals","es":"Voz en directo"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"150+ dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"}]},
 227: {"bestFor":{"en":"Live vocals","es":"Voz en directo"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"150+ dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"}]},
 228: {"bestFor":{"en":"Live vocals","es":"Voz en directo"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"150+ dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"}]},
 229: {"bestFor":{"en":"Live vocals & snare","es":"Voz en directo y caja"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"146 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"}]},
 230: {"bestFor":{"en":"Live vocals","es":"Voz en directo"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"147 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"}]},
 231: {"bestFor":{"en":"Live vocals","es":"Voz en directo"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Hypercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"144 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"}]},
 232: {"bestFor":{"en":"Live vocals","es":"Voz en directo"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"143 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"}]},
 249: {"bestFor":{"en":"Content creators","es":"Creadores de contenido"},"facts":[
   {"icon":"microphone","value":"Wireless","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Omni","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"2.4 GHz","label":{"en":"Band","es":"Banda"},"tone":"good"}]},
 250: {"bestFor":{"en":"Content creators","es":"Creadores de contenido"},"facts":[
   {"icon":"microphone","value":"Wireless","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Omni","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"2.4 GHz","label":{"en":"Band","es":"Banda"},"tone":"good"}]},
 251: {"bestFor":{"en":"Content creators","es":"Creadores de contenido"},"facts":[
   {"icon":"microphone","value":"Wireless","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Omni","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"2.4 GHz","label":{"en":"Band","es":"Banda"},"tone":"good"}]},
 252: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 253: {"bestFor":{"en":"Streaming & gaming","es":"Streaming y gaming"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"4 patterns","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 254: {"bestFor":{"en":"Content creators","es":"Creadores de contenido"},"facts":[
   {"icon":"microphone","value":"Wireless","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Omni","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"2.4 GHz","label":{"en":"Band","es":"Banda"},"tone":"good"}]},
 276: {"bestFor":{"en":"Podcast & beginners","es":"Podcast y principiantes"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 277: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
}

for pid, qf in data.items():
    prod = pm[pid]
    prod['bestFor'] = qf['bestFor']
    prod['facts'] = qf['facts']
    print("Updated", pid, prod['title'])

json.dump(d, open(p,'w',encoding='utf-8'), ensure_ascii=False, indent=2)
print("done")
