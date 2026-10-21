var fs = require('fs');
var vm = require('vm');

// Pre-render the home category carousel so it is visible on the first paint
// instead of waiting for guides.json to load and leaving an empty gap.
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

var ctx = {};
vm.createContext(ctx);
vm.runInContext(
  fs.readFileSync('js/constants.min.js', 'utf8') +
  '\nglobalThis.__categoryInfo = categoryInfo;',
  ctx
);
vm.runInContext(
  fs.readFileSync('js/translations.v4.min.js', 'utf8') +
  '\nglobalThis.__translations = translations;',
  ctx
);

var categoryInfo = ctx.__categoryInfo;
var translations = ctx.__translations;

function buildCats(lang) {
  function t(key) {
    return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
  }
  function getCatName(catId) {
    if (catId === 'all') return t('allGuides');
    var key = 'catName_' + catId;
    return t(key) !== key ? t(key) : (categoryInfo[catId] && categoryInfo[catId].name) || catId;
  }

  var catMap = {};
  guides.forEach(function (g) { catMap[g.category] = (catMap[g.category] || 0) + 1; });

  var cats = [
    {
      id: 'all',
      name: t('allGuides'),
      icon: '<svg data-fa="music" class="icon fa-solid fa-music" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>',
      count: guides.length
    }
  ];

  Object.keys(categoryInfo).forEach(function (id) {
    if (!catMap[id]) return;
    cats.push({ id: id, name: getCatName(id), icon: categoryInfo[id].icon, count: catMap[id] });
  });

  return cats.map(function (c) {
    return `
      <div class="cat-card${c.id === 'all' ? ' active' : ''}" data-cat="${c.id}">
      <span class="icon">${c.icon}</span>
      <div class="name">${c.name}</div>
      <div class="count">${c.count} ${t('guides')}</div>
    </div>`;
  }).join('');
}

var START = '<!-- home-cats:start -->';
var END = '<!-- home-cats:end -->';

['index.html', 'es/index.html'].forEach(function (file) {
  var lang = file.indexOf('es/') === 0 ? 'es' : 'en';
  var html = fs.readFileSync(file, 'utf8');
  var block = START + buildCats(lang) + END;

  if (html.indexOf(START) !== -1) {
    html = html.replace(new RegExp(START + '[\\s\\S]*?' + END), block);
  } else {
    var empty = '<div id="guideCats" class="cat-grid"></div>';
    if (html.indexOf(empty) === -1) throw new Error('guideCats container not found in ' + file);
    html = html.replace(empty, '<div id="guideCats" class="cat-grid">' + block + '</div>');
  }
  fs.writeFileSync(file, html);
  console.log(file + ': ' + buildCats(lang).match(/class="cat-card/g).length + ' categories pre-rendered');
});
