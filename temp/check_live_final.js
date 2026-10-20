(async () => {
  const pages = {
    'https://topmusiciangear.com/guides/best-home-studio-speakers_es.html': [
      ['Alesis heading', 'Alesis ELEVATE 4: guía de ondas + salida sub en par económico'],
      ['foto G4M', 'r2.gear4music.com/media/109/1096267/1200/preview.jpg'],
      ['ASIN real', 'B01IR7CFJG'],
      ['precio G4M', '£142'],
      ['precio MS', '€119'],
      ['tabla 68 Hz', '68 Hz - 20 kHz'],
      ['tabla sin publicar', 'No publicada']
    ],
    'https://topmusiciangear.com/guides/best-home-studio-speakers.html': [
      ['Alesis heading', 'Alesis ELEVATE 4: Elliptical Waveguide and a Sub Out Under $150'],
      ['foto G4M', 'r2.gear4music.com/media/109/1096267/1200/preview.jpg'],
      ['ASIN real', 'B01IR7CFJG'],
      ['tabla 68 Hz', '68 Hz - 20 kHz'],
      ['tabla sin publicar', 'Not published']
    ],
    'https://topmusiciangear.com/guides/beginner-bass-guitars_es.html': [
      ['Ibanez seccion', 'Ibanez GSR200 GIO'],
      ['ASIN usuario', 'B003CK5EOC'],
      ['Sire V5R', 'Sire Marcus Miller V5R'],
      ['tabla sin undefined', 'undefined']
    ]
  };
  for (const [u, checks] of Object.entries(pages)) {
    const h = await (await fetch(u + '?cb=' + Date.now(), { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
    console.log('=== ' + u.split('/').pop() + ' ===');
    for (const [name, needle] of checks) {
      const found = h.includes(needle);
      const ok = name === 'tabla sin undefined' ? !found : found;
      console.log((ok ? 'OK   ' : 'FALLA') + ' ' + name);
    }
    console.log('');
  }
})();
