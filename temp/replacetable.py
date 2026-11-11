import json
p = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json'
with open(p, 'r', encoding='utf-8') as f:
    data = json.load(f)
for g in data:
    if g['id'] == 'best-audio-repair-plugins':
        g['productTable'] = {
            "title": "Audio Repair Plugins Compared",
            "title_es": "Comparativa de plugins de reparación",
            "columns": [
                {"title": "iZotope RX 12 Standard", "title_es": "iZotope RX 12 Standard"},
                {"title": "Waves Clarity Vx Pro", "title_es": "Waves Clarity Vx Pro"},
                {"title": "Sonible smart:deess", "title_es": "Sonible smart:deess"},
                {"title": "Acon Digital Acon Restoration Suite 2", "title_es": "Acon Digital Acon Restoration Suite 2"},
                {"title": "Zynaptiq Unveil", "title_es": "Zynaptiq Unveil"}
            ],
            "rows": [
                {"label": "Best For", "label_es": "Ideal para", "values": [
                    {"value": "Spectral repair of any audio problem", "value_es": "Reparación espectral de cualquier problema de audio"},
                    {"value": "Real-time dialogue isolation", "value_es": "Aislamiento de diálogos en tiempo real"},
                    {"value": "Natural AI de-essing for vocals", "value_es": "De-essing natural con IA para voces"},
                    {"value": "Everyday cleanup on a budget", "value_es": "Limpieza diaria con presupuesto"},
                    {"value": "Removing room acoustics from bad spaces", "value_es": "Eliminar acústica de salas problemáticas"}
                ]},
                {"label": "Type", "label_es": "Tipo", "values": [
                    {"value": "Audio repair suite", "value_es": "Suite de reparación de audio"},
                    {"value": "AI voice isolation processor", "value_es": "Procesador de aislamiento de voz por IA"},
                    {"value": "AI de-esser", "value_es": "De-esser con IA"},
                    {"value": "4-tool restoration suite", "value_es": "Suite de 4 herramientas"},
                    {"value": "De-reverb processor", "value_es": "Procesador de-reverb"}
                ]},
                {"label": "Format", "label_es": "Formato", "values": [
                    {"value": "VST3/AU/AAX", "value_es": "VST3/AU/AAX"},
                    {"value": "VST3/AU/AAX", "value_es": "VST3/AU/AAX"},
                    {"value": "VST2/VST3/AU/AAX", "value_es": "VST2/VST3/AU/AAX"},
                    {"value": "VST/VST3/AU/AAX", "value_es": "VST/VST3/AU/AAX"},
                    {"value": "VST/VST3/AU/AAX", "value_es": "VST/VST3/AU/AAX"}
                ]},
                {"label": "Platforms", "label_es": "Plataformas", "values": [
                    {"value": "macOS & Windows", "value_es": "macOS y Windows"},
                    {"value": "macOS & Windows", "value_es": "macOS y Windows"},
                    {"value": "macOS & Windows", "value_es": "macOS y Windows"},
                    {"value": "macOS & Windows", "value_es": "macOS y Windows"},
                    {"value": "macOS & Windows", "value_es": "macOS y Windows"}
                ]},
                {"label": "Standout Feature", "label_es": "Característica destacada", "values": [
                    {"value": "Visual spectral editor with dialogue tools", "value_es": "Editor espectral visual con herramientas de diálogo"},
                    {"value": "Real-time neural noise removal", "value_es": "Eliminación de ruido por red neuronal en tiempo real"},
                    {"value": "Neural network finds exact sibilant events", "value_es": "La red neuronal localiza eventos sibilantes exactos"},
                    {"value": "DeNoise, DeHum, DeClick and DeReverb in one", "value_es": "DeNoise, DeHum, DeClick y DeReverb en uno"},
                    {"value": "Phase-cancellation room reflection removal", "value_es": "Eliminación de reflexiones de sala por cancelación de fase"}
                ]}
            ]
        }
        break
with open(p, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print('done')
