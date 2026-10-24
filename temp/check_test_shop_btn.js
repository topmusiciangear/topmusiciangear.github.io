const fs = require('fs');
const content = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/shop-buttons.js', 'utf8');

const match = content.match(/TEST_SHOP_BTN\s*=\s*(\{[\s\S]*?\n\});/);
if (match) {
  const testShopBtn = JSON.parse(match[1]);
  
  // Verificar IDs de productos de best-monitors
  const ids = [116, 117, 20, 19, 21, 199, 303, 305, 331, 304, 307, 1054];
  ids.forEach(id => {
    const btn = testShopBtn[id];
    if (btn) {
      console.log('ID ' + id + ': prices=' + Object.keys(btn.prices || {}).join(',') + ', urls=' + Object.keys(btn.urls || {}).join(','));
    } else {
      console.log('ID ' + id + ': NO ENCONTRADO EN TEST_SHOP_BTN');
    }
  });
}