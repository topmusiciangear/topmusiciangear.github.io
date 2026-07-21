var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var guide = data.find(function(x) { return x.id === 'live-sound-pa'; });

// Expand EN section 1
guide.sections[1].content = '<strong>The ZLX-12P revolutionized affordable PA speakers.</strong> 1000W peak power delivers clear, powerful sound that fills medium venues. The built-in DSP includes presets for music, speech, and DJ use. At just 30 lbs, it is easy to transport. The best value in live sound. <p><strong>For small gigs and events:</strong> A single ZLX-12P easily covers a bar or cafe. A pair covers medium-sized rooms. Sound quality exceeds the price, with clear highs and punchy lows that do not distort even at high volumes. Setup is simple - plug in, select a preset, and adjust the volume.</p><p>The ZLX-12P is the right choice if you need reliable PA sound on a budget. There are better speakers, but not at this price.</p>';

// Expand EN section 2
guide.sections[2].content = '<strong>The K12.2 is the most popular powered speaker in live sound.</strong> 2000W of power with dedicated DSP delivers clear, powerful audio that works in any venue. The patented DMT (Directivity Management Technology) ensures consistent coverage across the entire listening area. At 52 lbs, it is built to survive years of touring. <p><strong>For professional sound:</strong> The K12.2 is the industry standard for a reason. It sounds great in any space, handles anything you throw at it, and keeps working gig after gig. The built-in EQ lets you tune the speaker to the room. The K Series has been the benchmark for powered speakers since the original K12.</p><p>If you want the most reliable, best-sounding powered speaker that professionals trust worldwide, the K12.2 is the choice. It costs more than budget options, but the reliability and sound quality justify every dollar.</p>';

fs.writeFileSync('data/guides.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Fixed live-sound-pa sections 1 and 2');
