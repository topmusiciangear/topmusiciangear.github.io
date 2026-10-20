(async () => {
  const t = await (await fetch('https://topmusiciangear.com/guides/best-monitors.html?cb=' + Date.now())).text();
  const count = (re) => (t.match(re) || []).length;
  console.log('length', t.length);
  console.log('card-img total', count(/class="guide-product-card-img/g));
  console.log('cutout', count(/guide-product-card-img--cutout/g));
  console.log('section-img', count(/guide-section-img/g));
  console.log('detail-img', count(/guide-detail-img/g));
  console.log('featured imgs', count(/featured-product-img/g));

  const iCut = t.indexOf('guide-product-card-img--cutout');
  const iSec = t.indexOf('guide-section-imgs');
  const iDet = t.indexOf('guide-detail-img');
  console.log({ iDet, iSec, iCut });

  if (iSec > -1) console.log('SECTION BLOCK:\n' + t.slice(iSec - 200, iSec + 700));
  if (iDet > -1) console.log('DETAIL BLOCK:\n' + t.slice(iDet - 100, iDet + 400));
})();
