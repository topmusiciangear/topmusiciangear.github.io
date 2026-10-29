import json
path='data/guides.json'
data=json.load(open(path,'r',encoding='utf-8'))
guide=None
for g in data:
    if g.get('id')=='channel-strip-plugins':
        guide=g
        break
if not guide:
    print('not found')
    exit()
pt=guide.get('productTable',{})
# helper to find row by label
def find_row(label):
    for r in pt.get('rows',[]):
        if r.get('label')==label:
            return r
    return None

# Best For
bf=find_row('Best For')
bf['values'][0]['value']='Flexible hybrid workflows'
bf['values'][0]['value_es']='Flujos de trabajo híbridos flexibles'
bf['values'][1]['value']='Classic SSL 4K aggressive punch'
bf['values'][1]['value_es']='Golpe agresivo clásico SSL 4K'
bf['values'][2]['value']='Clinical modern digital separation'
bf['values'][2]['value_es']='Separación digital moderna clínica'
bf['values'][3]['value']='Fast mid-range transient snap'
bf['values'][3]['value_es']='Golpe de transitorios rápidos en medios'
bf['values'][4]['value']='Musical harmonic Neve weight'
bf['values'][4]['value_es']='Peso Neve armónico y musical'
bf['values'][5]['value']='Fast analog tube coloration'
bf['values'][5]['value_es']='Coloración de tubo analógico rápida'

# Type
tp=find_row('Type')
tp['values'][0]['value']='Modular Hybrid Channel Strip'
tp['values'][0]['value_es']='Channel strip híbrido modular'
tp['values'][1]['value']='Console Emulation'
tp['values'][1]['value_es']='Emulación de consola'
tp['values'][2]['value']='Official Digital Console'
tp['values'][2]['value_es']='Consola digital oficial'
tp['values'][3]['value']='Console Emulation'
tp['values'][3]['value_es']='Emulación de consola'
tp['values'][4]['value']='Vintage Preamp & EQ'
tp['values'][4]['value_es']='Preamp y EQ vintage'
tp['values'][5]['value']='Minimalist Tube Channel Strip'
tp['values'][5]['value_es']='Channel strip de tubo minimalista'

# Copy Protection
cp=find_row('Copy Protection')
cp['values'][0]['value']='Waves License Center'
cp['values'][0]['value_es']='Waves License Center'
cp['values'][1]['value']='iLok (Native / Cloud)'
cp['values'][1]['value_es']='iLok (Nativo / Cloud)'
cp['values'][2]['value']='iLok (Machine / Dongle)'
cp['values'][2]['value_es']='iLok (Máquina / Dongle)'
cp['values'][3]['value']='iLok (Native / Cloud)'
cp['values'][3]['value_es']='iLok (Nativo / Cloud)'
cp['values'][4]['value']='Waves License Center'
cp['values'][4]['value_es']='Waves License Center'
cp['values'][5]['value']='Waves License Center'
cp['values'][5]['value_es']='Waves License Center'

# Latency
lat=find_row('Latency')
lat['values'][0]['value']='Zero Latency'
lat['values'][0]['value_es']='Latencia cero'
lat['values'][1]['value']='Near-Zero (DSP) / Low (Native)'
lat['values'][1]['value_es']='Casi nula (DSP) / Baja (Nativo)'
lat['values'][2]['value']='Zero Latency'
lat['values'][2]['value_es']='Latencia cero'
lat['values'][3]['value']='Near-Zero (DSP) / Low (Native)'
lat['values'][3]['value_es']='Casi nula (DSP) / Baja (Nativo)'
lat['values'][4]['value']='Zero Latency'
lat['values'][4]['value_es']='Latencia cero'
lat['values'][5]['value']='Zero Latency'
lat['values'][5]['value_es']='Latencia cero'

# Standout Feature
sf=find_row('Standout Feature')
sf['values'][0]['value']='Swappable modules & Thump saturation'
sf['values'][0]['value_es']='Módulos intercambiables y saturación Thump'
sf['values'][1]['value']='Jensen transformer & Black Knob EQ'
sf['values'][1]['value_es']='Transformador Jensen y EQ Black Knob'
sf['values'][2]['value']='Switchable E/G curves, Anti-cramping'
sf['values'][2]['value_es']='Curvas E/G conmutables, Anti-cramping'
sf['values'][3]['value']='Proportional Q, 2520 op-amps, Unison'
sf['values'][3]['value_es']='Q proporcional, op-amps 2520, Unison'
sf['values'][4]['value']='Class-A transform emul + M/S matrix'
sf['values'][4]['value_es']='Emulación transformador Clase A + matriz M/S'
sf['values'][5]['value']='Asymmetric tube drive, 3-knob workflow'
sf['values'][5]['value_es']='Drive de tubo asimétrico, flujo 3 perillas'

json.dump(data, open(path,'w',encoding='utf-8'), ensure_ascii=False, indent=2)
print('done')