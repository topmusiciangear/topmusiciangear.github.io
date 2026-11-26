const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = guides.find(g => g.id === 'best-interface');

// 1. Audient iD2 (Cons): Change "No onboard compressor like the Volt 276" → "No MIDI I/O for hardware synths"
guide.verdictProsCons[4].cons[3] = "No MIDI I/O for hardware synths";
guide.verdictProsCons[4].cons_es[3] = "Sin MIDI I/O para sintetizadores hardware";

// 2. Universal Audio Volt 2 Gen 2 (Cons): Change "No MIDI I/O (removed from the original Volt 2 Gen 2)" → "No MIDI I/O (removed from the original Volt 2)"
guide.verdictProsCons[6].cons[0] = "No MIDI I/O (removed from the original Volt 2)";
guide.verdictProsCons[6].cons_es[0] = "Sin MIDI I/O (eliminado del Volt 2 original)";

// 3. Universal Audio Volt 276 (Cons): Change "$100 more" → "$70–$80 more"
guide.verdictProsCons[7].cons[3] = "Costs about $70–$80 more than the Volt 2 Gen 2, essentially for the compressor";
guide.verdictProsCons[7].cons_es[3] = "Cuesta unos $70–$80 más que el Volt 2 Gen 2, básicamente por el compresor";

// 4. Focusrite Scarlett 2i2 4th Gen (Pros): Change "56dB" → "69dB"
guide.verdictProsCons[0].pros[0] = guide.verdictProsCons[0].pros[0].replace('56dB', '69dB');
guide.verdictProsCons[0].pros_es[0] = guide.verdictProsCons[0].pros_es[0].replace('56dB', '69dB');

// Update the guide in the array
const idx = guides.findIndex(g => g.id === 'best-interface');
guides[idx] = guide;
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

// Verify
const updated = guides.find(g => g.id === 'best-interface');
console.log('=== VERIFICATION ===');
console.log('Audient iD2 Cons[3]:', updated.verdictProsCons[4].cons[3]);
console.log('Volt 2 Gen 2 Cons[0]:', updated.verdictProsCons[6].cons[0]);
console.log('Volt 276 Cons[3]:', updated.verdictProsCons[7].cons[3]);
console.log('Scarlett Pros[0]:', updated.verdictProsCons[0].pros[0]);
console.log('Scarlett Pros_es[0]:', updated.verdictProsCons[0].pros_es[0]);