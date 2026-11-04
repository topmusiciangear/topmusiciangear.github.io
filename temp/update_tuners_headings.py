import json
path='data/guides.json'
with open(path,'r',encoding='utf-8') as f:
    guides=json.load(f)
for g in guides:
    if g.get('id')=='tuners-bass-guitar':
        sections=g.get('sections',[])
        mappings=[
            {
                'heading':'Peterson StroboStomp HD: Surgical precision in pedal format',
                'heading_es':'Peterson StroboStomp HD: Precisión quirúrgica en formato de pedal',
                'content':'<p><strong>The definitive standard for players who want absolute strobe accuracy on their pedalboard.</strong> Stands out for its high-definition color LCD, customizable modes and exclusive optimized tunings. Its response speed guarantees perfect tuning both in demanding live situations and in critical studio recording sessions.</p>',
                'content_es':'<p><strong>El estándar definitivo para quienes buscan la exactitud absoluta de un sistema estroboscópico en su pedalera.</strong> Destaca por su pantalla LCD a color de alta definición, modos personalizables y afinaciones optimizadas exclusivas. Su velocidad de respuesta garantiza un ajuste perfecto tanto en riguroso directo como en sesiones críticas de grabación en estudio.</p>'
            },
            {
                'heading':'TC Electronic PolyTune 3: Polyphonic speed for live use',
                'heading_es':'TC Electronic PolyTune 3: Velocidad polifónica para el directo',
                'content':'<p><strong>The ideal choice to speed up your workflow on stage.</strong> This pedal lets you check all strings at once with a single strum. It also includes a premium buffer circuit that maintains signal fidelity and integrity over long cable runs without altering tone.</p>',
                'content_es':'<p><strong>La opción ideal para acelerar el flujo de trabajo sobre el escenario.</strong> Este pedal permite verificar la afinación de todas las cuerdas simultáneamente con un solo rasgueo. Además, incorpora un circuito de buffer premium que mantiene la fidelidad e integridad de la señal a lo largo de cables extensos sin alterar el tono.</p>'
            },
            {
                'heading':'Boss TU-3 Chromatic: The indestructible tank of the stage',
                'heading_es':'Boss TU-3 Cromático: El tanque indestructible de los escenarios',
                'content':'<p><strong>Considered the industry standard for bomb-proof reliability.</strong> Offers precise chromatic tuning via a high-visibility screen, ideal for adverse lighting or dark stages. Its rugged construction is complemented by buffered bypass and a power output to feed other pedals.</p>',
                'content_es':'<p><strong>Considerado el estándar de la industria por su resistencia a prueba de bombas.</strong> Ofrece una afinación cromática precisa mediante una pantalla de alta visibilidad, ideal para condiciones lumínicas adversas o escenarios oscuros. Su construcción robusta se complementa con funciones de bypass con buffer y salida de corriente para alimentar otros pedales.</p>'
            },
            {
                'heading':'Korg Pitchblack X: Maximum visibility in a compact design',
                'heading_es':'Korg Pitchblack X: Visibilidad máxima en un diseño compacto',
                'content':'<p><strong>A tuner pedal that optimizes pedalboard space without sacrificing legibility.</strong> Its huge LED screen covers the entire front of the chassis, ensuring perfect control under any outdoor lighting. Features advanced buffer technology and completely silent switching for intense tours.</p>',
                'content_es':'<p><strong>Un pedal afinador que optimiza el espacio de la pedalera sin sacrificar legibilidad.</strong> Su enorme pantalla LED ocupa todo el frontal del chasis, asegurando un control perfecto bajo cualquier iluminación exterior. Cuenta con tecnología de buffer avanzada y una conmutación completamente silenciosa para giras intensas.</p>'
            },
            {
                'heading':'Walrus Audio Canvas Tuner: Boutique aesthetics and modern customization',
                'heading_es':'Walrus Audio Canvas Tuner: Estética boutique y personalización moderna',
                'content':'<p><strong>Designed for musicians seeking advanced visual control and a cutting-edge aesthetic.</strong> Its high-resolution screen lets you adjust image orientation to fit any pedalboard layout. Includes studio-grade true bypass that respects signal purity and offers a completely flat frequency response.</p>',
                'content_es':'<p><strong>Diseñado para músicos que buscan un control visual avanzado y una estética vanguardista.</strong> Su pantalla de alta resolución permite ajustar la orientación de la imagen para adaptarse a cualquier disposición de la pedalera. Incorpora un true bypass de calidad de estudio que respeta la pureza de la señal y ofrece una respuesta de frecuencia totalmente plana.</p>'
            },
            {
                'heading':'TC Electronic PolyTune Clip: Pocket-sized polyphonic performance',
                'heading_es':'TC Electronic PolyTune Clip: Rendimiento polifónico de bolsillo',
                'content':'<p><strong>This device brings the polyphonic algorithms of its bigger brothers to a compact, elegant clip with stainless steel finish.</strong> Its screen rotates automatically according to neck position and its ultrasensitive sensor detects the vibrations of the lowest strings instantly.</p>',
                'content_es':'<p><strong>Este dispositivo traslada los algoritmos polifónicos de sus hermanos mayores a un formato de pinza compacto y elegante con acabado en acero inoxidable.</strong> Su pantalla gira de manera automática según la posición del mástil y su sensor ultrasensible es capaz de detectar las vibraciones de las cuerdas más graves al instante.</p>'
            },
            {
                'heading':'Peterson StroboClip HD: High-fidelity strobe clip-on accuracy',
                'heading_es':'Peterson StroboClip HD: Alta fidelidad estroboscópica de pinza',
                'content':'<p><strong>The perfect alternative for bench calibrations and maximum accuracy without cables.</strong> Its high-definition strobe screen provides flawless tracking on the lowest frequencies of guitars and basses, while protective pads ensure a firm grip that doesn\'t damage the instrument finish.</p>',
                'content_es':'<p><strong>La alternativa perfecta para calibraciones de banco y máxima exactitud sin necesidad de cables.</strong> Su pantalla estroboscópica de alta definición brinda un rastreo impecable en las frecuencias más bajas de guitarras y bajos, mientras que sus almohadillas protectoras aseguran un agarre firme que no daña el acabado del instrumento.</p>'
            },
            {
                'heading':'Korg AW-LT100B: The low-frequency specialist',
                'heading_es':'Korg AW-LT100B: El especialista en frecuencias graves',
                'content':'<p><strong>A clip-on tuner developed specifically for the demands of electric bass.</strong> Its modified piezo circuit natively ignores ambient noise to focus on the low register. Its high-sensitivity needle facilitates fast tunings in chaotic environments and offers up to one hundred hours of continuous use.</p>',
                'content_es':'<p><strong>Un afinador de clip desarrollado específicamente para las exigencias del bajo eléctrico.</strong> Su circuito piezoeléctrico modificado ignora de forma nativa los ruidos ambientales para centrarse en el registro grave. Su aguja de alta sensibilidad facilita afinaciones rápidas en entornos caóticos y ofrece una autonomía de hasta cien horas de uso continuo.</p>'
            },
            {
                'heading':'Snark ST-2 Super Tight: Chromatic efficiency at the best price',
                'heading_es':'Snark ST-2 Super Tight: Eficiencia cromática al mejor precio',
                'content':'<p><strong>The most competitive budget option on the market without compromising response speed.</strong> Its reinforced mechanical clip minimizes reading errors by transmitting vibrations smoothly. Features a rotating high-contrast circular screen to find the perfect viewing angle in any situation.</p>',
                'content_es':'<p><strong>La opción de presupuesto más competitiva del mercado sin comprometer la velocidad de respuesta.</strong> Su pinza mecánica reforzada minimiza los errores de lectura transmitiendo las vibraciones con fluidez. Dispone de una pantalla circular giratoria de alto contraste para encontrar el ángulo de visión perfecto en cualquier situación.</p>'
            }
        ]
        for i,m in enumerate(mappings):
            if i < len(sections):
                sec=sections[i]
                sec['heading']=m['heading']
                sec['heading_es']=m['heading_es']
                sec['content']=m['content']
                sec['content_es']=m['content_es']
        with open(path,'w',encoding='utf-8') as f:
            json.dump(guides,f,ensure_ascii=False,indent=2)
        print('done')
