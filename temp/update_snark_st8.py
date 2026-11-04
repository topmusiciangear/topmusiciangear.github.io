import json

# Update product
prod_path='data/products.json'
with open(prod_path, encoding='utf-8') as f:
    prods=json.load(f)
for p in prods:
    if p.get('id')==9008:
        p['title']='Snark ST-8 Super Tight Rechargable Tuner, Titanium'
        p['title_es']='Snark ST-8 Super Tight Afinador Recargable, Titanio'
        p['desc']='The rechargeable king with next-generation noise shield. Its titanium-armored clip grips the wood firmly to isolate vibrations without errors. High-definition color screen that facilitates the perfect angle under any light.'
        p['desc_es']='El rey recargable con escudo anti-ruido de última generación. Su pinza blindada de titanio se agarra firmemente a la madera para aislar las vibraciones sin errores. Pantalla de alta definición a color que facilita el ángulo perfecto bajo cualquier luz.'
        # keep img as is
        break
with open(prod_path,'w',encoding='utf-8') as f:
    json.dump(prods,f,ensure_ascii=False,indent=2)

# Update guide
guide_path='data/guides.json'
with open(guide_path, encoding='utf-8') as f:
    guides=json.load(f)
for g in guides:
    if g.get('id')=='tuners-bass-guitar':
        # Update sections for Snark (index 8)
        secs=g.get('sections',[])
        if len(secs)>8:
            sec=secs[8]
            sec['heading']='Snark ST-8 Titanium: Rechargeable innovation at the best price'
            sec['heading_es']='Snark ST-8 Titanium: Innovación recargable al mejor precio'
            sec['content']='<p><strong>The most advanced budget option on the market that eliminates annoying batteries thanks to its USB battery.</strong> Its titanium-armored chassis minimizes reading errors by isolating vibrations from external noise. Features an HD high-contrast screen to find the perfect viewing angle in any situation.</p>'
            sec['content_es']='<p><strong>La opción de presupuesto más avanzada del mercado que elimina las molestas pilas gracias a su batería USB.</strong> Su chasis blindado con titanio minimiza los errores de lectura aislando las vibraciones del ruido externo. Dispone de una pantalla HD de alto contraste para encontrar el ángulo de visión perfecto en cualquier situación.</p>'
        # Update verdictProsCons for Snark
        vpc=g.get('verdictProsCons',[])
        for v in vpc:
            if 'snark' in v.get('name','').lower():
                v['name']='Snark ST-8 Titanium'
                v['name_es']='Snark ST-8 Titanium'
                v['pros']=[
                    'Rechargeable battery eliminates button cells',
                    'Titanium-reinforced joints resist breakage',
                    'Effective acoustic shield blocks ambient noise',
                    'Instant response on low frequencies',
                    'High definition color screen for fast reading'
                ]
                v['pros_es']=[
                    'Batería recargable: Elimina por completo el gasto continuo en molestas pilas de botón CR2032 mediante su cómoda carga por USB.',
                    'Blindaje de titanio: Sus uniones y articulaciones están reforzadas para evitar las roturas accidentales que sufrían los modelos plásticos anteriores.',
                    'Escudo acústico eficaz: Bloquea el ruido ambiental del entorno y de otros instrumentos, capturando únicamente la vibración pura del mástil.',
                    'Respuesta instantánea en graves: Su chip optimizado detecta las frecuencias más bajas de guitarras y bajos de rango extendido sin demoras.',
                    'Pantalla HD de alta visibilidad: Ofrece una lectura a color extremadamente nítida y brillante, ideal para ajustarse rápido en escenarios totalmente oscuros.'
                ]
                v['cons']=[
                    'No microphone tuning',
                    'Dependent on charging',
                    'Showy aesthetic',
                    'Stiff angle adjustment'
                ]
                v['cons_es']=[
                    'Sin afinación por micrófono: Al depender exclusivamente de la lectura por vibración, no sirve para afinar instrumentos al aire o voces.',
                    'Dependencia del cable: Si olvidas cargarlo o no llevas un cable USB a mano antes de un concierto, no podrás usarlo si se agota.',
                    'Estética llamativa: Su diseño circular y sobresaliente en el clavijero puede resultar demasiado vistoso para músicos de corte muy tradicional.',
                    'Ajuste de ángulo rígido: Aunque la pantalla gira de forma fluida, la pinza blindada puede sentirse algo más dura de posicionar al principio.'
                ]
        # Update conclusion
        g['conclusion']='<p>A good tuner is invisible until you need it — and then it has to be perfect. The Boss TU-3 remains the undisputed king of stage durability; the Peterson line leads with analytical studio precision, and the Snark ST-8 Titanium consolidates as the most innovative and comfortable everyday alternative thanks to its rechargeable design. Evaluate your rehearsals and performances to choose the tool that best fits your workflow, whether fixed on your pedalboard or ready on your headstock.</p>'
        g['conclusion_es']='<p>Un buen afinador pasa desapercibido hasta que se le necesita, y en ese instante su rendimiento debe ser impecable. El Boss TU-3 se mantiene como el rey indiscutible de la resistencia en el escenario; la línea Peterson lidera con contundencia el terreno de la precisión analítica de estudio, y el Snark ST-8 Titanium se consolida como la alternativa más innovadora y cómoda para el día a día gracias a su diseño recargable. Evalúa la dinámica de tus ensayos y actuaciones para elegir la herramienta que mejor se adapte a tu flujo de trabajo, ya sea fija en tu pedalera o lista en el clavijero de tu instrumento.</p>'
        # Update FAQs
        faq=[
            {
                'q':'What is the best tuner for electric bass?',
                'q_es':'¿Cuál es el mejor afinador para bajo eléctrico?',
                'a':'For bass you need a device optimized for the low register and, for clip-ons, a sensor that reads wood vibration flawlessly. The Boss TU-3 stands out as the most robust and reliable pedal option for live use, while the Korg AW-LT100B offers a piezoelectric circuit designed specifically for bass frequencies. If you want maximum studio accuracy for calibration, the Peterson StroboClip HD is unbeatable in clip-on format.',
                'a_es':'Para el bajo se requiere un dispositivo optimizado para el registro grave y, en el caso de los modelos de pinza, un sensor que lea de forma impecable la vibración de la madera. El Boss TU-3 destaca como la opción de pedal más robusta y fiable para el directo, mientras que el Korg AW-LT100B ofrece un circuito piezoeléctrico diseñado específicamente para las frecuencias del bajo. Si buscas la máxima exactitud de estudio para calibración, el Peterson StroboClip HD es insuperable en formato clip-on.'
            },
            {
                'q':'Pedal tuner or clip-on tuner, which should I buy?',
                'q_es':'¿Afinador de pedal o de pinza (clip-on)? ¿Cuál debería comprar?',
                'a':'The choice depends mainly on your use environment. A pedal is essential for live playing, as it cuts the signal completely (mute function) to tune silently and offers much more visible screens on dark stages. Clip-on tuners are ideal for acoustic instruments, home practice sessions or quick adjustments without altering the audio chain. In fact, the optimal setup for many musicians combines both: pedal on the live pedalboard and clip-on in the travel case.',
                'a_es':'La elección depende principalmente de tu entorno de uso. El pedal es imprescindible si tocas en directo, ya que corta la señal por completo (función mute) para afinar en silencio y ofrece pantallas mucho más visibles en escenarios oscuros. Los afinadores de pinza son ideales para instrumentos acústicos, sesiones de práctica en casa o ajustes rápidos sin alterar la cadena de audio. De hecho, la configuración óptima para muchos músicos combina ambos: el pedal en la pedalera de directo y la pinza en la funda de viaje.'
            },
            {
                'q':'What level of accuracy is needed for studio recording?',
                'q_es':'¿Qué nivel de precisión se necesita para grabar en estudio?',
                'a':'For recording and intonation or octave adjustment, aim for a tolerance of ±0.5 cents or lower. Strobe-based tuners, such as Peterson models, reach surgical accuracy of ±0.1 cents, revealing micro-deviations that will stand out in a professional mix. For live playing, a margin of ±1 cent is more than enough and allows fast tuning between songs.',
                'a_es':'Para grabar y ajustar la entonación o el octavado de un instrumento, lo ideal es buscar una tolerancia de ±0.5 cents o inferior. Los afinadores de tecnología estroboscópica, como los modelos de Peterson, alcanzan una precisión quirúrgica de ±0.1 cents, revelando microdesviaciones que saltarían a la vista en una mezcla profesional. Para tocar en vivo, un margen de ±1 cent es más que suficiente y facilita una afinación rápida en mitad de un repertorio.'
            },
            {
                'q':'Can I use a guitar tuner for bass?',
                'q_es':'¿Es posible utilizar un afinador de guitarra para un bajo?',
                'a':'Yes, as long as it is a modern chromatic tuner capable of registering the frequencies of the lowest strings (such as low E or B). Standard pedals like the Boss TU-3 include specific bass modes that speed up detection of these long waves. For clip-ons, the key is that the clip applies enough pressure to transmit vibration from denser, heavier headstocks.',
                'a_es':'Sí, siempre y cuando sea un afinador cromático moderno capaz de registrar las frecuencias de las cuerdas más graves (como el Mi o el Si bajo). Pedales estándar como el Boss TU-3 integran modos específicos para bajo que agilizan la detección de estas ondas largas. En el caso de los afinadores de clip, la clave está en que su pinza ejerza la presión suficiente para transmitir la vibración de palas más densas y pesadas.'
            },
            {
                'q':'What is the difference between chromatic and strobe tuning?',
                'q_es':'¿Qué diferencia hay entre la afinación cromática y la estroboscópica (strobe)?',
                'a':'Traditional chromatic tuners use a virtual needle or LED scale that stabilises in the centre when the note is correct; they are very intuitive but tend to average small fluctuations. Stroboscopic systems use rotating bands that stop completely only when the frequency is exact. The strobe method offers much higher resolution, being the preferred tool for luthiers and technicians for instrument maintenance.',
                'a_es':'Los afinadores cromáticos tradicionales utilizan una aguja virtual o una escala de LEDs que se estabiliza en el centro cuando la nota es correcta; son muy intuitivos pero tienden a promediar las pequeñas fluctuaciones. Los sistemas estroboscópicos emplean un patrón de bandas rotatorias que se detiene por completo únicamente cuando la frecuencia es exacta. El método strobe ofrece una resolución muchísimo mayor, siendo la herramienta preferida por luthiers y técnicos para el mantenimiento técnico del instrumento.'
            }
        ]
        g['faq']=faq
    with open(guide_path,'w',encoding='utf-8') as f:
        json.dump(guides,f,ensure_ascii=False,indent=2)
print('done')
