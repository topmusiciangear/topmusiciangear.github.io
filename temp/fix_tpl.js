const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
function rep(gid, oldS, newS) {
  const g = G.find(x => x.id === gid);
  let n = 0;
  const walk = o => {
    if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) { if (typeof o[i] === 'string' && o[i].includes(oldS)) { o[i] = o[i].split(oldS).join(newS); n++; } else walk(o[i]); } }
    else if (o && typeof o === 'object') { for (const k of Object.keys(o)) { if (typeof o[k] === 'string' && o[k].includes(oldS)) { o[k] = o[k].split(oldS).join(newS); n++; } else walk(o[k]); } }
  };
  walk(g);
  console.log((n ? 'OK x' + n : 'MISS') + ' ' + gid + ' :: ' + oldS.slice(0, 60));
}
rep('best-mic-for-podcasting', 'The honest trade-off: it is a different shape of podcasting.', 'The other side of the coin: this is a different shape of podcasting.');
rep('nx912-vs-pxm12mp', 'That is the honest trade.', 'Small stage, coaxial; big stage, horn — pick your battlefield.');
rep('stream-controllers', "<strong>The honest catch:</strong> it controls software, it does not mix audio.", '<strong>What it will never do:</strong> mix audio. It has no XLR input and no preamp.');
rep('stream-controllers', "<strong>The honest trade-offs.</strong> It's, so it's not an impulse buy,", '<strong>The practical check:</strong> at this price it is no impulse buy,');
rep('stream-controllers', '<strong>The honest trade-offs:</strong> there is no XLR input.', '<strong>The missing piece:</strong> there is no XLR input.');
rep('stream-controllers', 'The honest trade-off is the UNIFY software, which can be unstable upon reboots', 'The weak spot is the UNIFY software, which can be unstable upon reboots');
rep('streaming-interfaces', '<strong>The honest trade-offs are the fixed compression presets and the two inputs.</strong>', '<strong>The limits are fixed compression presets and just two inputs.</strong>');
rep('best-hardware-samplers', '<strong>The honest trade-offs are the screen and the sequencer.</strong>', '<strong>The compromises live in the screen and the sequencer.</strong>');
rep('best-amp-modelers', '<strong>The honest trade-off is flexibility.</strong>', '<strong>Flexibility is where it gives ground.</strong>');
rep('budget-usb-mics', "The honest trade-off: there's no headphone jack,", "The gap: there's no headphone jack,");
rep('budget-usb-mics', 'The honest trade-offs: as a condenser it picks up room noise', 'The downsides: as a condenser it picks up room noise');
rep('best-32-channel-digital-mixers', 'is the honest tradeoff against 96 kHz rivals', 'is the measurable gap against 96 kHz rivals');
fs.writeFileSync(F, JSON.stringify(G, null, 2));