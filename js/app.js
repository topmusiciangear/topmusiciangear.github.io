let currentLang = localStorage.getItem("lang") || "en";
let currentCategory = "all";
let searchQuery = "";
let currentGuideId = null;
let skipDetailScroll = false;
let disclosureBound = false;
let guides = [];
let products = [];

const dataPromise = Promise.all([
  fetch('data/guides.json').then(function(r) { if (!r.ok) throw new Error('Failed to load guides'); return r.json(); }).then(function(d) { guides = d; }),
  fetch('data/products.json').then(function(r) { if (!r.ok) throw new Error('Failed to load products'); return r.json(); }).then(function(d) { products = d; })
]);

function t(key) {
  return translations[currentLang]?.[key] || translations.en[key] || key;
}

function getCatName(catId) {
  if (catId === "all") return t("allGuides");
  const key = "catName_" + catId;
  return t(key) !== key ? t(key) : (categoryInfo[catId]?.name || catId);
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  document.documentElement.classList.remove("lang-en", "lang-es");
  document.documentElement.classList.add("lang-" + lang);
  translatePage();
  renderGuideCats();
  if (currentGuideId) {
    var guide = guides.find(function(g) { return g.id === currentGuideId; });
    if (guide) {
      document.title = (lang === 'es' && guide.title_es ? guide.title_es : guide.title) + ' | TopMusicianGear';
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        var descText = lang === 'es' && guide.intro_es ? guide.intro_es : guide.intro;
        metaDesc.content = descText.substring(0, 155);
      }
    }
    skipDetailScroll = true;
    renderGuideDetail(currentGuideId);
  } else {
    document.querySelector('meta[name="description"]').content = t("metaDescription");
    renderGuideGrid();
    var hl = document.querySelectorAll('link[rel="alternate"][hreflang]');
    hl.forEach(function(el) {
      if (el.getAttribute('hreflang') === 'en') el.href = 'https://topmusiciangear.com';
      if (el.getAttribute('hreflang') === 'es') el.href = 'https://topmusiciangear.com';
      if (el.getAttribute('hreflang') === 'x-default') el.href = 'https://topmusiciangear.com';
    });
    var canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.href = 'https://topmusiciangear.com';
  }
  renderAbout();
  updateAudioLabel();
  renderMySetup();
  updateLangSwitcher();
}

function showModal() {
  if (document.getElementById("disclosureModal")) return;
  var title = t("disclosureTitle");
  var text = t("disclosureText");
  var btn = t("disclosureGotIt");
  var html = '<div class="modal-content"><h3>' + title + '</h3><p>' + text + '</p><button onclick="hideModal()">' + btn + '</button></div>';
  var m = document.createElement("div");
  m.id = "disclosureModal";
  m.innerHTML = html;
  m.style.cssText = "display:flex;position:fixed;inset:0;z-index:9999;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.8);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)";
  m.addEventListener("click", function(e) { if (e.target === e.currentTarget) hideModal(); });
  document.body.appendChild(m);
}
function hideModal() {
  var m = document.getElementById("disclosureModal");
  if (m) m.remove();
}
function bindDisclosureLink() {
  if (disclosureBound) return;
  disclosureBound = true;
  document.addEventListener("click", function(e) {
    if (e.target.id === "disclosureLink" || (e.target.closest && e.target.closest("#disclosureLink"))) {
      e.preventDefault();
      showModal();
    }
  });
}
function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    const translated = t(key);
    if (el.dataset.i18nVal !== translated) {
      el.innerHTML = translated;
      el.dataset.i18nVal = translated;
    }
  });
  bindDisclosureLink();
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

function updateLangSwitcher() {
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
  const keys = ["navGuides", "navSetup", "navAbout"];
  document.querySelectorAll("nav .nav-link").forEach((btn, i) => {
    if (keys[i]) btn.textContent = t(keys[i]);
  });
  document.querySelectorAll("#mobileNav .nav-link").forEach((btn, i) => {
    if (keys[i]) btn.textContent = t(keys[i]);
  });
}

function initLangSwitcher() {
  const container = document.getElementById("langSwitcher");
  if (!container) return;
  container.innerHTML = Object.entries(languageNames).map(([code, name]) =>
    `<button class="lang-btn${code === currentLang ? " active" : ""}" data-lang="${code}">${name}</button>`
  ).join("");
  container.addEventListener("click", e => {
    const btn = e.target.closest(".lang-btn");
    if (btn) setLang(btn.dataset.lang);
  });
}

function renderGuideCats() {
  const container = document.getElementById("guideCats");
  if (!container) return;
  const catMap = {};
  guides.forEach(g => { catMap[g.category] = (catMap[g.category] || 0) + 1; });
  const cats = [
    { id: "all", name: t("allGuides"), icon: '<svg data-fa="music" class="icon fa-solid fa-music" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>', count: guides.length },
    ...Object.entries(categoryInfo).filter(([id]) => catMap[id]).map(([id, info]) => {
      return { id, name: getCatName(id), icon: info.icon, count: catMap[id] };
    })
  ];
  container.innerHTML = cats.map(c =>
    `<div class="cat-card${currentCategory === c.id ? " active" : ""}" data-cat="${c.id}">
      <span class="icon">${c.icon}</span>
      <div class="name">${c.name}</div>
      <div class="count">${c.count} ${t("guides")}</div>
    </div>`
  ).join("");
  container.addEventListener("click", function(e) {
    var card = e.target.closest(".cat-card");
    if (!card) return;
    currentCategory = card.dataset.cat;
    document.querySelectorAll(".cat-card").forEach(function(c) { c.classList.remove("active"); });
    card.classList.add("active");
    renderGuideGrid();
    var sortBar = document.querySelector(".sort-bar");
    if (sortBar) sortBar.scrollIntoView({ block: "start" });
  });
}

function getFilteredGuides() {
  let filtered = [...guides];
  if (currentCategory !== "all") {
    filtered = filtered.filter(g => g.category === currentCategory);
  }
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(g =>
      g.title.toLowerCase().includes(q) ||
      (g.title_es || "").toLowerCase().includes(q) ||
      g.intro.toLowerCase().includes(q) ||
      (g.intro_es || "").toLowerCase().includes(q) ||
      g.sections.some(s => s.heading.toLowerCase().includes(q) || s.content.toLowerCase().includes(q) || (s.heading_es || "").toLowerCase().includes(q) || (s.content_es || "").toLowerCase().includes(q)) ||
      (getCatName(g.category) || g.category).toLowerCase().includes(q)
    );
  }
  return filtered;
}

function getResolvedStores(product) {
  const allStoreKeys = ['thomann','pluginboutique','gear4music','sweetwater','musikproduktiv','amazon','reverb','andertons','baxmusic','musicstore'];
  const searchUrls = {
    thomann: (t) => `https://www.thomann.co.uk/search?q=${encodeURIComponent(t)}`,
    pluginboutique: (t) => `https://www.pluginboutique.com/search?q=${encodeURIComponent(t)}&a_aid=6a01e859cbe1a`,
    gear4music: (t) => `https://www.gear4music.com/search?q=${encodeURIComponent(t)}`,
    sweetwater: (t) => `https://www.sweetwater.com/store/search.php?s=${encodeURIComponent(t)}`,
    musikproduktiv: (t) => `https://www.musik-produktiv.de/`,
    amazon: (t) => `https://www.amazon.com/s?k=${encodeURIComponent(t)}&tag=topmusicg-20`,
    reverb: (t) => `https://reverb.com/marketplace?query=${encodeURIComponent(t)}`,
    andertons: (t) => `https://www.andertons.co.uk/search.php?search_query=${encodeURIComponent(t)}&irgwc=1&irpid=7292297`,
    baxmusic: (t) => `https://www.bax-shop.co.uk/complete-assortment?keyword=${encodeURIComponent(t)}`,
    musicstore: (t) => `https://www.musicstore.com/en_GB/search?SearchText=${encodeURIComponent(t)}`
  };
  const s = {};
  allStoreKeys.forEach(key => {
    if (key === 'amazon' && (product.category === 'plugins' || product.category === 'tres')) return;
    const specificUrl = product.stores[key];
    if (specificUrl) {
      if (key === 'gear4music' && specificUrl === 'https://www.gear4music.com/search') {
        s[key] = `https://www.gear4music.com/search?q=${encodeURIComponent(product.title)}`;
      } else if (key === 'musikproduktiv' && specificUrl === 'https://www.musik-produktiv.de/search') {
        s[key] = searchUrls.musikproduktiv(product.title);
      } else if (key === 'amazon' && specificUrl.startsWith('https://www.amazon.com/dp/')) {
        s[key] = specificUrl + '?tag=topmusicg-20';
      } else if (key === 'andertons' && !specificUrl.includes('irgwc=')) {
        s[key] = specificUrl + (specificUrl.includes('?') ? '&' : '?') + 'irgwc=1&irpid=7292297';
      } else {
        s[key] = specificUrl;
      }
    } else {
      s[key] = searchUrls[key](product.title);
    }
  });
  if (s.reverb) {
    s.reverb = `https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=${encodeURIComponent(s.reverb)}`;
  }
  if (s.musicstore && !product.stores.musicstore) {
    s.musicstore = `https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=${encodeURIComponent(s.musicstore)}`;
  }
  return s;
}

function formatPrice(price) {
  if (price >= 1000) return `$${(price / 1000).toFixed(1)}k`;
  return `$${price}`;
}

function getBadgeClass(key) {
  const map = { bestSeller: "bestSeller", legend: "legend", premium: "premium", topQuality: "topQuality", recommended: "recommended" };
  return map[key] || "bestSeller";
}

function renderProductCard(id) {
  const p = products.find(x => x.id === id);
  if (!p) return "";
  const title = currentLang === 'es' && p.title_es ? p.title_es : p.title;
  const desc = currentLang === 'es' && p.desc_es ? p.desc_es : p.desc;
  const stars = "★".repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? "½" : "");
  const stores = Object.entries(getResolvedStores(p)).map(([key, url]) =>
    `<a href="${url}" target="_blank" rel="noopener noreferrer sponsored" class="chip-store" style="background:${storeColors[key] || '#555'}"><span class="icon">${storeIcons[key] || ''}</span> ${storeNames[key] || key}</a>`
  ).join("");
  return `
    <div class="guide-product-card">
      <div class="guide-product-card-img"><img src="${p.img}" alt="${title}" loading="lazy"></div>
      <div class="guide-product-card-body">
        <div class="guide-product-card-title">${title}</div>
        <div class="guide-product-card-rating">${stars} <span>${p.reviews.toLocaleString()}</span></div>
        <div class="guide-product-card-price">${formatPrice(p.price)} <small>USD</small></div>
        <div class="guide-product-card-desc">${desc}</div>
        <div class="guide-product-card-stores">${stores}</div>
      </div>
    </div>
  `;
}

function renderGuideGrid() {
  currentGuideId = null;
  const btn = document.getElementById("backToGuidesBtn");
  if (btn) btn.style.display = "";
  const grid = document.getElementById("guideGrid");
  const count = document.getElementById("guideCount");
  const container = document.getElementById("guideContainer");
  if (!grid) return;
  grid.style.display = "";
  container.classList.remove("guide-detail-open");
  document.getElementById("guideCats").style.display = "";
  const sortBar = document.querySelector(".sort-bar");
  if (sortBar) sortBar.style.display = "";
  const sectionHeader = document.querySelector("#guides .section-header");
  if (sectionHeader) sectionHeader.style.display = "";
  const filtered = getFilteredGuides();
  count.textContent = `${filtered.length} ${t("guides")}`;
  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results"><h3><svg data-fa="music" class="icon fa-solid fa-music" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg> ${t("noGuides")}</h3><p>${t("noGuidesDesc")}</p></div>`;
    return;
  }
  grid.innerHTML = filtered.map(g => {
    const catName = getCatName(g.category);
    return `
      <a href="/guides/${g.id}${currentLang === 'es' ? '_es' : ''}.html" class="guide-card" data-guide="${g.id}" onclick="event.preventDefault(); var id=this.dataset.guide; history.pushState({},'','/?g='+id); renderGuideDetail(id);">
        <div class="guide-card-img">
          <img src="${g.image.replace(/w=600&h=400&fit=crop/, 'w=400&fit=crop')}" alt="${currentLang === 'es' && g.title_es ? g.title_es : g.title}" loading="lazy">
          <span class="guide-card-cat">${catName}</span>
        </div>
        <div class="guide-card-body">
          <h3 class="guide-card-title">${currentLang === 'es' && g.title_es ? g.title_es : g.title}</h3>
          <p class="guide-card-intro">${(() => { const i = currentLang === 'es' && g.intro_es ? g.intro_es : g.intro; return i.length > 150 ? i.slice(0, 150) + '…' : i; })()}</p>
          <div class="guide-card-footer">
            <span class="guide-card-meta"><svg data-fa="clock" class="icon fa-regular fa-clock" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/></svg> 6 ${t("minRead")}</span>
            <span class="guide-card-btn">${t("readGuide")}</span>
          </div>
        </div>
      </a>
    `;
  }).join("");
}

function renderGuideDetail(id) {
  const guide = guides.find(g => g.id === id);
  if (!guide) return;
  currentGuideId = guide.id;
  const btn = document.getElementById("backToGuidesBtn");
  if (btn) btn.style.display = "none";
  const grid = document.getElementById("guideGrid");
  grid.style.display = "block";
  const container = document.getElementById("guideContainer");
  container.classList.add("guide-detail-open");
  document.getElementById("guideCats").style.display = "none";
  const sortBar = document.querySelector(".sort-bar");
  if (sortBar) sortBar.style.display = "none";
  const sectionHeader = document.querySelector("#guides .section-header");
  if (sectionHeader) sectionHeader.style.display = "none";

  const catName = getCatName(guide.category);
  const badgeText = guide.badge ? t("badge_" + guide.badge) : null;
  const badgeClass = guide.badge ? getBadgeClass(guide.badge) : "";

  let sectionsHtml = guide.sections.map(s => {
    const heading = currentLang === 'es' && s.heading_es ? s.heading_es : s.heading;
    const content = currentLang === 'es' && s.content_es ? s.content_es : s.content;
    return `
      <div class="guide-section">
        <h2 class="guide-section-heading">${heading}</h2>
        <div class="guide-section-content">${content}</div>
      </div>
    `;
  }).join("");

  const allProductIds = [...new Set(guide.sections.flatMap(s => s.products))];
  const allProductsHtml = allProductIds.map(id => renderProductCard(id)).join("");


  grid.innerHTML = `
    <div class="guide-detail">
      <nav class="guide-breadcrumb" aria-label="Breadcrumb">
        <a href="/">Home</a> / <a href="/#guides">${t("navGuides")}</a> / <span>${currentLang === 'es' && guide.title_es ? guide.title_es : guide.title}</span>
      </nav>
      <div class="guide-back-row">
        <button class="guide-back-btn" id="guideBackBtn1"><svg data-fa="arrow-left" class="icon fa-solid fa-arrow-left" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg> ${t("backToGuides")}</button>
      </div>
      <div class="guide-detail-header">
        <h1 class="guide-detail-title">${currentLang === 'es' && guide.title_es ? guide.title_es : guide.title}</h1>
      </div>
      <div class="guide-detail-img"><img src="${guide.image}" alt="${currentLang === 'es' && guide.title_es ? guide.title_es : guide.title}" loading="lazy"></div>
      <div class="guide-detail-intro"><p>${currentLang === 'es' && guide.intro_es ? guide.intro_es : guide.intro}</p></div>
      <div class="guide-detail-sections">${sectionsHtml}</div>
      <div class="guide-verdict">
        <span class="verdict-label">${t("verdict")}</span>
        <span class="verdict-text">${currentLang === 'es' && guide.verdict_es ? guide.verdict_es : guide.verdict}</span>
      </div>
      ${allProductsHtml ? `<div class="guide-products-grid"><h2 class="guide-products-title">${t("productsInGuide")}</h2><div class="guide-products-cards">${allProductsHtml}</div></div>` : ""}
      <div class="guide-conclusion">
        <h2 class="guide-conclusion-title">${t("finalThoughts")}</h2>
        <p>${currentLang === 'es' && guide.conclusion_es ? guide.conclusion_es : guide.conclusion}</p>
      </div>
      <div class="guide-related">
        <h2 class="guide-related-title">${t("relatedGuides")}</h2>
        <div class="guide-related-list">
          ${(() => { var related = guides.filter(g => g.id !== guide.id && g.category === guide.category); if (!related.length) related = guides.filter(g => g.id !== guide.id); return related.slice(0, 4).map(g => { var gt = currentLang === 'es' && g.title_es ? g.title_es : g.title; return '<a href="/guides/' + g.id + (currentLang === 'es' ? '_es' : '') + '.html" class="guide-related-link" data-guide="' + g.id + '" onclick="event.preventDefault(); var id=this.dataset.guide; history.pushState({},\'\',\'/?g=\'+id); renderGuideDetail(id);">' + gt + '</a>'; }).join(''); })()}
        </div>
      </div>

      <button class="guide-back-btn" id="guideBackBtn2"><svg data-fa="arrow-left" class="icon fa-solid fa-arrow-left" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg> ${t("backToGuides")}</button>
    </div>
  `;
  const btn1 = document.getElementById("guideBackBtn1");
  if (btn1) btn1.addEventListener("click", () => {
    history.pushState({}, '', '/');
    renderGuideGrid();
    setTimeout(function() { scrollToSection("guides"); }, 200);
  });
  const btn2 = document.getElementById("guideBackBtn2");
  if (btn2) btn2.addEventListener("click", () => {
    history.pushState({}, '', '/');
    renderGuideGrid();
    setTimeout(function() { scrollToSection("guides"); }, 200);
  });
  if (!skipDetailScroll) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        var el = document.getElementById("guideGrid");
        if (el) el.scrollIntoView({ block: "start" });
      });
    });
  }
  var lang = currentLang;
  document.title = (lang === 'es' && guide.title_es ? guide.title_es : guide.title) + ' | TopMusicianGear';
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    var descText = lang === 'es' && guide.intro_es ? guide.intro_es : guide.intro;
    metaDesc.content = descText.substring(0, 155);
  }
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = (lang === 'es' && guide.title_es ? guide.title_es : guide.title);
  var ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = descText.substring(0, 155);
  var ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.content = 'https://topmusiciangear.com/guides/' + guide.id + '.html';
  var ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.content = guide.image && guide.image.startsWith('http') ? guide.image : 'https://topmusiciangear.com/' + (guide.image || 'img/og-image.svg');
  var twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.content = ogTitle ? ogTitle.content : '';
  var twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.content = ogDesc ? ogDesc.content : '';
  var twImage = document.querySelector('meta[name="twitter:image"]');
  if (twImage) twImage.content = ogImage ? ogImage.content : '';
  injectGuideJsonLd(guide);
  skipDetailScroll = false;
}

function renderAudioMini() {
  const isMobile = window.matchMedia('(max-width:767px)').matches;
  const targetId = isMobile ? 'audioMiniMobile' : 'audioMini';
  const audioHtml = '<div class="audio-mini-inner"><span class="audio-mini-player"><audio controls preload="none"><source src="audio/solo-tres.mp3" type="audio/mpeg"></audio></span><span class="audio-eq"><i></i><i></i><i></i><i></i></span><span class="audio-mini-label">' + t("audioLabel") + '</span></div>';
  const el = document.getElementById(targetId);
  if (el) el.innerHTML = audioHtml;
  setTimeout(() => {
    document.querySelectorAll('#' + targetId + ' audio').forEach(audio => {
      audio.addEventListener('play', () => audio.closest('.audio-mini-inner').classList.add('playing'));
      audio.addEventListener('pause', () => audio.closest('.audio-mini-inner').classList.remove('playing'));
      audio.addEventListener('ended', () => audio.closest('.audio-mini-inner').classList.remove('playing'));
    });
  }, 100);
}

function updateAudioLabel() {
  document.querySelectorAll('.audio-mini-label').forEach(el => {
    el.textContent = t("audioLabel");
  });
}

function renderMySetup() {
  const container = document.getElementById("setupGrid");
  if (!container) return;
  const gear = [
    { icon: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="5" width="22" height="14" rx="2"/><rect x="4" y="9" width="3" height="6" rx="0.8" fill="currentColor" opacity="0.6"/><circle cx="14" cy="12" r="3"/><circle cx="14" cy="12" r="1.2" fill="currentColor"/><rect x="19" y="10" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.6"/></svg>', title: "Focusrite Scarlett 2i2 4th Gen", descKey: "setupItem1Desc" },
    { icon: '<svg data-fa="headphones" class="icon fa-solid fa-headphones" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M256 80C149.9 80 62.4 159.4 49.6 262c9.4-3.8 19.6-6 30.4-6c26.5 0 48 21.5 48 48V432c0 26.5-21.5 48-48 48c-44.2 0-80-35.8-80-80V384 336 288C0 146.6 114.6 32 256 32s256 114.6 256 256v48 48 16c0 44.2-35.8 80-80 80c-26.5 0-48-21.5-48-48V304c0-26.5 21.5-48 48-48c10.8 0 21 2.1 30.4 6C449.6 159.4 362.1 80 256 80z"/></svg>', title: "Beyerdynamic DT 770 Pro", descKey: "setupItem2Desc" },
    { icon: '<svg data-fa="microphone" class="icon fa-solid fa-microphone" viewBox="0 0 384 512" width="1em" height="1em" fill="currentColor"><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg>', title: "Rode NT1-A", descKey: "setupItem3Desc" },
    { icon: '<svg data-fa="keyboard" class="icon fa-solid fa-keyboard" viewBox="0 0 576 512" width="1em" height="1em" fill="currentColor"><path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm16 64h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm80-176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V144zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zM160 336c0-8.8 7.2-16 16-16H400c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V336zM272 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM256 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM368 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM352 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V240zM464 128h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16zM448 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V240zm16 80h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H464c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16z"/></svg>', title: "Akai MPK249", descKey: "setupItem4Desc" },
    { icon: '<svg data-fa="volume-high" class="icon fa-solid fa-volume-high" viewBox="0 0 640 512" width="1em" height="1em" fill="currentColor"><path d="M533.6 32.5C598.5 85.2 640 165.8 640 256s-41.5 170.7-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/></svg>', title: "Yamaha HS8", descKey: "setupItem5Desc" }
  ];
  container.innerHTML = gear.map(g => `
    <div class="setup-item">
      <span class="setup-item-icon">${g.icon}</span>
      <div class="setup-item-title">${g.title}</div>
      <div class="setup-item-desc">${t(g.descKey)}</div>
    </div>
  `).join("");
}

function renderAbout() {
  const container = document.getElementById("aboutContent");
  if (!container) return;
  container.innerHTML = `
    <div class="about-photo-col">
      <div class="about-photo-wrapper">
        <img src="img/me-600.webp" alt="Top Musician Gear — Founder" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:64px;color:var(--accent);\\'>🎵</div>'">
      </div>
    </div>
    <div class="about-content">
      <h2>${t("aboutTitle")}<span>${t("aboutName")}</span></h2>
      <div class="about-subtitle">${t("aboutSub")}</div>
      <p>${t("aboutP1")}</p>
      <p>${t("aboutP2")}</p>
      <p>${t("aboutP3")}</p>
      <div class="about-credits">
        <span class="credit-badge"><svg data-fa="film" class="icon fa-solid fa-film" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"/></svg> ${t("credit_jamesbond")}</span>
        <span class="credit-badge"><svg data-fa="globe" class="icon fa-solid fa-globe" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z"/></svg> ${t("credit_festivals")}</span>
        <span class="credit-badge"><svg data-fa="landmark" class="icon fa-solid fa-landmark" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M240.1 4.2c9.8-5.6 21.9-5.6 31.8 0l171.8 98.1L448 104l0 .9 47.9 27.4c12.6 7.2 18.8 22 15.1 36s-16.4 23.8-30.9 23.8H32c-14.5 0-27.2-9.8-30.9-23.8s2.5-28.8 15.1-36L64 104.9V104l4.4-1.6L240.1 4.2zM64 224h64V416h40V224h64V416h48V224h64V416h40V224h64V420.3c.6 .3 1.2 .7 1.8 1.1l48 32c11.7 7.8 17 22.4 12.9 35.9S494.1 512 480 512H32c-14.1 0-26.5-9.2-30.6-22.7s1.1-28.1 12.9-35.9l48-32c.6-.4 1.2-.7 1.8-1.1V224z"/></svg> ${t("credit_abbeyroad")}</span>
        <span class="credit-badge"><svg data-fa="film" class="icon fa-solid fa-film" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z"/></svg> ${t("credit_universal")}</span>
        <span class="credit-badge"><svg data-fa="microphone" class="icon fa-solid fa-microphone" viewBox="0 0 384 512" width="1em" height="1em" fill="currentColor"><path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/></svg> ${t("credit_topaz")}</span>
        <span class="credit-badge"><svg data-fa="compact-disc" class="icon fa-solid fa-compact-disc" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 32a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm-96-32a96 96 0 1 0 192 0 96 96 0 1 0 -192 0zM96 240c0-35 17.5-71.1 45.2-98.8S205 96 240 96c8.8 0 16-7.2 16-16s-7.2-16-16-16c-45.4 0-89.2 22.3-121.5 54.5S64 194.6 64 240c0 8.8 7.2 16 16 16s16-7.2 16-16z"/></svg> ${t("credit_warner")}</span>
        <span class="credit-badge"><svg data-fa="star" class="icon fa-solid fa-star" viewBox="0 0 576 512" width="1em" height="1em" fill="currentColor"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg> ${t("credit_columbia")}</span>
        <span class="credit-badge"><svg data-fa="flag-usa" class="icon fa-solid fa-flag-usa" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor"><path d="M32 0C49.7 0 64 14.3 64 32V48l69-17.2c38.1-9.5 78.3-5.1 113.5 12.5c46.3 23.2 100.8 23.2 147.1 0l9.6-4.8C423.8 28.1 448 43.1 448 66.1v36.1l-44.7 16.2c-42.8 15.6-90 13.9-131.6-4.6l-16.1-7.2c-20.3-9-41.8-14.7-63.6-16.9v32.2c17.4 2.1 34.4 6.7 50.6 13.9l16.1 7.2c49.2 21.9 105 23.8 155.6 5.4L448 136.3v62l-44.7 16.2c-42.8 15.6-90 13.9-131.6-4.6l-16.1-7.2c-40.2-17.9-85-22.5-128.1-13.3L64 203.1v32.7l70.2-15.1c36.4-7.8 74.3-3.9 108.4 11.3l16.1 7.2c49.2 21.9 105 23.8 155.6 5.4L448 232.3v62l-44.7 16.2c-42.8 15.6-90 13.9-131.6-4.6l-16.1-7.2c-40.2-17.9-85-22.5-128.1-13.3L64 299.1v32.7l70.2-15.1c36.4-7.8 74.3-3.9 108.4 11.3l16.1 7.2c49.2 21.9 105 23.8 155.6 5.4L448 328.3v33.5c0 13.3-8.3 25.3-20.8 30l-34.7 13c-46.2 17.3-97.6 14.6-141.7-7.4c-37.9-19-81.3-23.7-122.5-13.4L64 400v80c0 17.7-14.3 32-32 32s-32-14.3-32-32V416 345.5 312.8 249.5 216.8 153.5 120.8 64 32C0 14.3 14.3 0 32 0zm80 96A16 16 0 1 0 80 96a16 16 0 1 0 32 0zm32 0a16 16 0 1 0 0-32 16 16 0 1 0 0 32zm-32 48a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm32 0a16 16 0 1 0 0-32 16 16 0 1 0 0 32z"/></svg> ${t("credit_usatours")}</span>
      </div>
    </div>
  `;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.innerHTML = '<svg data-fa="circle-check" style="margin-right:6px;" class="icon fa-solid fa-circle-check" viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg> ' + msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function scrollToSection(id) {
  var el = document.getElementById(id);
  if (!el) return;
  var heading = el.querySelector('.section-title') || el;
  heading.scrollIntoView({ block: "start", behavior: "auto" });
}

function handleNavClick(target) {
  document.querySelectorAll(".nav-link").forEach(n => n.classList.remove("active"));
  var navBtn = document.querySelector(`.nav-link[data-nav="${target}"]`);
  if (navBtn) navBtn.classList.add("active");
  document.getElementById("mobileNav").classList.remove("open");
  currentGuideId = null;

  if (target === "guides") {
    renderGuideGrid();
    setTimeout(function() { scrollToSection("guides"); }, 200);
  } else if (target === "mysetup") {
    renderGuideGrid();
    setTimeout(function() { scrollToSection("mysetup"); }, 200);
  } else if (target === "about") {
    renderGuideGrid();
    setTimeout(function() { scrollToSection("about"); }, 200);
  }
}

function initVideoIntro() {
  const video = document.getElementById("aboutVideo");
  const overlay = document.getElementById("videoIntroOverlay");
  if (!video || !overlay) return;
  video.volume = 0;

  video.addEventListener("play", () => {
    fadeVideoAudio(video, 1, 1500);
  });

  video.addEventListener("timeupdate", () => {
    const remaining = video.duration - video.currentTime;
    if (remaining < 3 && remaining > 0 && !video.paused && video.volume > 0.05) {
      fadeVideoAudio(video, 0, 1500);
    }
    if (remaining < 3 && remaining > 0 && !video.paused) {
      overlay.classList.add("outro");
      requestAnimationFrame(() => {
        overlay.classList.add("show");
      });
    }
    if (remaining >= 3 && overlay.classList.contains("outro")) {
      overlay.classList.remove("outro", "show");
    }
  });

  video.addEventListener("ended", () => {
    overlay.classList.remove("outro", "show");
    video.volume = 0;
  });

  video.addEventListener("seeked", () => {
    if (video.currentTime < video.duration - 3) {
      video.volume = 1;
    }
  });
}

function fadeVideoAudio(video, target, duration) {
  const start = video.volume;
  const startTime = performance.now();
  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    video.volume = start + (target - start) * progress;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function injectGuideJsonLd(guide) {
  document.querySelectorAll('script[data-guide-jsonld]').forEach(el => el.remove());
  var canon = document.querySelector('link[rel="canonical"]');
  if (canon) {
    canon.href = 'https://topmusiciangear.com/guides/' + guide.id + '.html';
  }
  var hreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
  if (hreflangs.length) {
    hreflangs.forEach(function(el) {
      if (el.getAttribute('hreflang') === 'en') el.href = 'https://topmusiciangear.com/guides/' + guide.id + '.html';
      if (el.getAttribute('hreflang') === 'es') el.href = 'https://topmusiciangear.com/guides/' + guide.id + '_es.html';
    });
  }
  const lang = currentLang;
  const title = lang === 'es' && guide.title_es ? guide.title_es : guide.title;
  const intro = lang === 'es' && guide.intro_es ? guide.intro_es : guide.intro;
  const conclusion = lang === 'es' && guide.conclusion_es ? guide.conclusion_es : guide.conclusion;
  const url = 'https://topmusiciangear.com/guides/' + guide.id + '.html';
  const image = guide.image || 'https://topmusiciangear.com/img/og-image.svg';

  var gi = guides.indexOf(guide);
  var base = new Date('2026-01-15');
  base.setDate(base.getDate() + Math.max(0, gi) * 3);
  var dPub = base.toISOString().split('T')[0];
  var dMod = guide.dateModified || dPub;

  const article = {
    "@context": "https://schema.org", "@type": "Article",
    "headline": title,
    "description": intro.substring(0, 155),
    "author": { "@type": "Person", "name": "Daniel" },
    "publisher": { "@type": "Organization", "name": "TopMusicianGear", "url": "https://topmusiciangear.com" },
    "image": image,
    "datePublished": dPub, "dateModified": dMod,
    "mainEntityOfPage": { "@type": "WebPage", "@id": url }
  };

  const items = [];
  guide.featuredProducts.forEach((pid, idx) => {
    const p = products.find(pr => pr.id === pid);
    if (p) {
      items.push({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": lang === 'es' && p.title_es ? p.title_es : p.title,
          "brand": { "@type": "Brand", "name": p.brand || "" },
          "mpn": p.mpn || "",
          "description": (lang === 'es' && p.desc_es ? p.desc_es : p.desc).substring(0, 155),
          "offers": {
            "@type": "Offer",
            "price": p.price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": p.reviews > 0 ? {
            "@type": "AggregateRating",
            "ratingValue": p.rating,
            "reviewCount": p.reviews
          } : undefined,
          "image": p.img
        }
      });
    }
  });

  function addJsonLd(data) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.dataset.guideJsonld = guide.id;
    s.textContent = JSON.stringify(data);
    document.head.appendChild(s);
  }

  addJsonLd(article);
  if (items.length) addJsonLd({
    "@context": "https://schema.org", "@type": "ItemList",
    "itemListElement": items
  });
  addJsonLd({
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://topmusiciangear.com/" },
      { "@type": "ListItem", "position": 2, "name": title, "item": url }
    ]
  });
  var faqBase = {
    microphones: [
      { q: "What is the best microphone for recording vocals?", a: "For studio vocals, a large-diaphragm condenser like the Neumann U87 or Rode NT1-A delivers professional results. Dynamic mics like the Shure SM7B excel for untreated rooms and live recording.", q_es: "¿Cuál es el mejor micrófono para grabar voces?", a_es: "Para voces de estudio, un condensador de diafragma grande como el Neumann U87 o Rode NT1-A ofrece resultados profesionales. Los micrófonos dinámicos como el Shure SM7B destacan en salas sin tratamiento y grabación en directo." },
      { q: "What microphone is best for home recording?", a: "The Shure SM57 is the most versatile mic for home studios — great on guitar cabs, snares, and horns. For vocals, the Rode NT1-A offers studio quality at an affordable price.", q_es: "¿Qué micrófono es mejor para grabación casera?", a_es: "El Shure SM57 es el micrófono más versátil para home studios — excelente en amplificadores de guitarra, cajas y vientos. Para voces, el Rode NT1-A ofrece calidad de estudio a un precio accesible." },
      { q: "Do I need a condenser or dynamic microphone?", a: "Condenser mics capture detail and high frequencies — ideal for vocals, acoustic instruments, and studio work. Dynamic mics handle high SPL and are more rugged — best for drums, guitar amps, and live performance.", q_es: "¿Necesito un micrófono de condensador o dinámico?", a_es: "Los micrófonos de condensador capturan detalles y altas frecuencias — ideales para voces, instrumentos acústicos y estudio. Los dinámicos manejan alto SPL y son más robustos — mejores para baterías, amplis de guitarra y directo." },
      { q: "How much should I spend on a good microphone?", a: "A solid starter mic like the Shure SM57 costs around $99. Mid-range condensers like the Rode NT1-A at $229 deliver pro-quality. High-end mics like the Neumann U87 at $3,200 are studio standards for commercial releases.", q_es: "¿Cuánto debería gastar en un buen micrófono?", a_es: "Un buen micrófono inicial como el Shure SM57 cuesta unos $99. Los condensadores de gama media como el Rode NT1-A a $229 ofrecen calidad profesional. Los de alta gama como el Neumann U87 a $3,200 son estándar de estudio para lanzamientos comerciales." },
      { q: "What is the best microphone under $200?", a: "The Shure SM57 at $99 is the industry standard for instruments. The Rode NT1-A at $229 is excellent for vocals. The Audio-Technica AT2020 at $99 is a solid entry-level condenser.", q_es: "¿Cuál es el mejor micrófono por menos de $200?", a_es: "El Shure SM57 a $99 es el estándar de la industria para instrumentos. El Rode NT1-A a $229 es excelente para voces. El Audio-Technica AT2020 a $99 es un condensador sólido de entrada." }
    ],
    interfaces: [
      { q: "What is the best audio interface for home recording?", a: "The Focusrite Scarlett 2i2 (4th Gen) and SSL 2+ MKII are the top choices for home studios. They offer excellent preamps, low latency, and 120dB+ dynamic range at under $300.", q_es: "¿Cuál es la mejor interfaz de audio para grabación casera?", a_es: "La Focusrite Scarlett 2i2 (4th Gen) y la SSL 2+ MKII son las mejores opciones para home studios. Ofrecen previos excelentes, baja latencia y más de 120dB de rango dinámico por menos de $300." },
      { q: "How many inputs do I need on an audio interface?", a: "For solo musicians, 2 inputs is enough — one for vocals and one for an instrument. For recording drums or full bands, look for 8+ inputs like the Focusrite Scarlett 18i20.", q_es: "¿Cuántas entradas necesito en una interfaz de audio?", a_es: "Para músicos solistas, 2 entradas son suficientes — una para voz y otra para un instrumento. Para grabar baterías o bandas completas, busca 8+ entradas como la Focusrite Scarlett 18i20." },
      { q: "Is USB or Thunderbolt better for audio interfaces?", a: "USB is sufficient for most home studios — modern USB-C interfaces offer low latency and wide compatibility. Thunderbolt provides marginally lower latency, useful for large tracking sessions with many inputs.", q_es: "¿Es mejor USB o Thunderbolt para interfaces de audio?", a_es: "USB es suficiente para la mayoría de home studios — las interfaces USB-C modernas ofrecen baja latencia y amplia compatibilidad. Thunderbolt proporciona latencia marginalmente menor, útil para sesiones grandes con muchas entradas." },
      { q: "What is the best budget audio interface?", a: "The Focusrite Scarlett Solo (4th Gen) at $139 is the best entry-level interface. The SSL 2 at $199 offers premium preamps at a budget price. The Universal Audio Volt 2 at $189 adds vintage compression.", q_es: "¿Cuál es la mejor interfaz de audio económica?", a_es: "La Focusrite Scarlett Solo (4th Gen) a $139 es la mejor interfaz de entrada. La SSL 2 a $199 ofrece previos premium a precio económico. La Universal Audio Volt 2 a $189 añade compresión vintage." },
      { q: "Do I need a high-end audio interface as a beginner?", a: "No. Modern budget interfaces offer 120dB+ dynamic range — beyond what most home studios can acoustically resolve. Start with a $150–$250 interface and upgrade only when you need more I/O.", q_es: "¿Necesito una interfaz de audio de alta gama como principiante?", a_es: "No. Las interfaces económicas modernas ofrecen más de 120dB de rango dinámico — más allá de lo que la mayoría de home studios puede resolver acústicamente. Empieza con una interfaz de $150–$250 y actualiza solo cuando necesites más E/S." }
    ],
    monitors: [
      { q: "What are the best studio monitors for home recording?", a: "The Yamaha HS8 and KRK Rokit 7 G5 are top choices. The JBL 305P MkII offers exceptional value at $149/ea. For smaller rooms, the Kali LP-6 V2 provides boundary EQ compensation.", q_es: "¿Cuáles son los mejores monitores de estudio para grabación casera?", a_es: "Los Yamaha HS8 y KRK Rokit 7 G5 son las mejores opciones. El JBL 305P MkII ofrece un valor excepcional a $149/ud. Para salas pequeñas, el Kali LP-6 V2 proporciona compensación de EQ de contorno." },
      { q: "Do I need a subwoofer for studio monitors?", a: "Not for most home studios. 5-inch to 8-inch monitors handle bass adequately for mixing. A subwoofer is useful for electronic music production or if your room has acoustic treatment and you need to monitor below 40Hz.", q_es: "¿Necesito un subwoofer para monitores de estudio?", a_es: "No para la mayoría de home studios. Los monitores de 5 a 8 pulgadas manejan los graves adecuadamente para mezclar. Un subwoofer es útil para producción de música electrónica o si tu sala tiene tratamiento acústico y necesitas monitorizar por debajo de 40Hz." },
      { q: "What size studio monitors should I get?", a: "5-inch monitors work best for small rooms and nearfield listening. 8-inch monitors provide fuller bass but need more room to breathe. Match the size to your room: smaller rooms = smaller monitors.", q_es: "¿De qué tamaño deberían ser mis monitores de estudio?", a_es: "Los monitores de 5 pulgadas funcionan mejor para salas pequeñas y escucha cercana. Los de 8 pulgadas proporcionan graves más completos pero necesitan más espacio. Combina el tamaño con tu sala: salas más pequeñas = monitores más pequeños." },
      { q: "How should I position my studio monitors?", a: "Form an equilateral triangle with your listening position. Tweeters should be at ear height. Place monitors at least 8–12 inches from walls and use isolation pads to decouple from your desk.", q_es: "¿Cómo debería posicionar mis monitores de estudio?", a_es: "Forma un triángulo equilátero con tu posición de escucha. Los tweeters deben estar a la altura de los oídos. Coloca los monitores al menos a 20–30 cm de las paredes y usa pads de aislamiento para desacoplarlos de tu escritorio." },
      { q: "Are expensive studio monitors worth it?", a: "Above $1,000/pair, returns diminish. The Yamaha HS8 at $600/pair provides 90% of what $3,000 monitors offer. High-end monitors make a difference in professionally treated rooms — in untreated home studios, mid-range monitors perform nearly as well.", q_es: "¿Valen la pena los monitores de estudio caros?", a_es: "Por encima de $1,000/par, los retornos disminuyen. Los Yamaha HS8 a $600/par proporcionan el 90% de lo que ofrecen monitores de $3,000. Los monitores de alta gama marcan la diferencia en salas tratadas profesionalmente — en home studios sin tratamiento, los monitores de gama media rinden casi igual." }
    ],
    headphones: [
      { q: "What are the best studio headphones for mixing?", a: "The Beyerdynamic DT 990 Pro (open-back) is the gold standard for mixing at $169. The Audio-Technica ATH-M50x (closed-back) is the most popular all-rounder. The Sennheiser HD 600 offers reference-grade accuracy.", q_es: "¿Cuáles son los mejores auriculares de estudio para mezclar?", a_es: "Los Beyerdynamic DT 990 Pro (abiertos) son el estándar de oro para mezclar a $169. Los Audio-Technica ATH-M50x (cerrados) son los más populares para todo uso. Los Sennheiser HD 600 ofrecen precisión de grado de referencia." },
      { q: "Open-back vs closed-back headphones for studio?", a: "Open-back (like DT 990 Pro) provides natural soundstage and is ideal for mixing and critical listening. Closed-back (like DT 770 Pro) isolates sound — better for tracking vocals and recording in noisy environments.", q_es: "¿Auriculares abiertos vs cerrados para estudio?", a_es: "Los abiertos (como DT 990 Pro) proporcionan escena sonora natural y son ideales para mezclar y escucha crítica. Los cerrados (como DT 770 Pro) aíslan el sonido — mejores para grabar voces y trabajar en entornos ruidosos." },
      { q: "Can I mix with headphones instead of monitors?", a: "Yes, but use reference tracks and check your mix on speakers when possible. Headphones can exaggerate stereo width and bass. Software like Sonarworks SoundID Reference can calibrate headphones for flatter response.", q_es: "¿Puedo mezclar con auriculares en vez de monitores?", a_es: "Sí, pero usa pistas de referencia y revisa tu mezcla en altavoces cuando sea posible. Los auriculares pueden exagerar el ancho estéreo y los graves. Software como Sonarworks SoundID Reference puede calibrar auriculares para una respuesta más plana." },
      { q: "What is the best budget headphones for music production?", a: "The Beyerdynamic DT 770 Pro (32 ohm) at $149 is the best closed-back option. The Samson SR850 at $49 is a surprisingly good open-back alternative for beginners. The Sony MDR-7506 at $99 is a classic for tracking.", q_es: "¿Cuáles son los mejores auriculares económicos para producción musical?", a_es: "Los Beyerdynamic DT 770 Pro (32 ohm) a $149 son la mejor opción cerrada. Los Samson SR850 a $49 son una alternativa abierta sorprendentemente buena para principiantes. Los Sony MDR-7506 a $99 son un clásico para grabación." },
      { q: "Do I need a headphone amplifier for studio headphones?", a: "High-impedance headphones (250 ohm+) need a dedicated headphone amp or audio interface with sufficient output. Low-impedance models (32–80 ohm) work fine with most interfaces and mobile devices directly.", q_es: "¿Necesito un amplificador de auriculares para auriculares de estudio?", a_es: "Los auriculares de alta impedancia (250 ohm+) necesitan un amplificador dedicado o una interfaz de audio con suficiente salida. Los modelos de baja impedancia (32–80 ohm) funcionan bien directamente con la mayoría de interfaces y dispositivos móviles." }
    ],
    plugins: [
      { q: "What are the essential mixing plugins for beginners?", a: "Start with an EQ (FabFilter Pro-Q 4), a compressor (FabFilter Pro-C 2), a reverb (Valhalla Room), a limiter (FabFilter Pro-L 2), and a pitch correction tool (Celemony Melodyne 5). These cover 90% of mixing needs.", q_es: "¿Cuáles son los plugins de mezcla esenciales para principiantes?", a_es: "Empieza con un EQ (FabFilter Pro-Q 4), un compresor (FabFilter Pro-C 2), un reverb (Valhalla Room), un limitador (FabFilter Pro-L 2) y una herramienta de corrección de tono (Celemony Melodyne 5). Estos cubren el 90% de las necesidades de mezcla." },
      { q: "Are expensive plugins better than free ones?", a: "Not necessarily. Many free plugins are excellent. However, paid plugins like FabFilter offer better workflow, more intuitive interfaces, and premium sound quality. Start with free plugins and upgrade when you hit their limitations.", q_es: "¿Son los plugins caros mejores que los gratuitos?", a_es: "No necesariamente. Muchos plugins gratuitos son excelentes. Sin embargo, plugins de pago como FabFilter ofrecen mejor flujo de trabajo, interfaces más intuitivas y calidad de sonido premium. Empieza con plugins gratuitos y actualiza cuando encuentres sus limitaciones." },
      { q: "What is the best EQ plugin for mixing?", a: "FabFilter Pro-Q 4 is the industry standard — dynamic EQ, spectrum analyzer, and intuitive interface. iZotope Ozone EQ is excellent for mastering. SSL Native Channel Strip brings console-style workflow.", q_es: "¿Cuál es el mejor plugin de EQ para mezclar?", a_es: "FabFilter Pro-Q 4 es el estándar de la industria — EQ dinámico, analizador de espectro e interfaz intuitiva. iZotope Ozone EQ es excelente para masterización. SSL Native Channel Strip ofrece un flujo de trabajo estilo consola." },
      { q: "Do I need analog modeling plugins?", a: "Analog modeling plugins add warmth and character that can make digital mixes more musical. While not essential, plugins like UAD, SSL Native, and Waves CLA help achieve a polished, professional sound by adding harmonics and saturation.", q_es: "¿Necesito plugins de modelado analógico?", a_es: "Los plugins de modelado analógico añaden calidez y carácter que pueden hacer que las mezclas digitales suenen más musicales. Aunque no son esenciales, plugins como UAD, SSL Native y Waves CLA ayudan a lograr un sonido pulido y profesional añadiendo armónicos y saturación." },
      { q: "What plugins do professional mixers use?", a: "Professionals commonly use FabFilter Total Bundle (EQ, compression, limiting), iZotope Ozone and RX for mastering and repair, Celemony Melodyne for pitch correction, ValhallaDSP for reverb, Soundtoys for effects, and Universal Audio UAD for analog modeling.", q_es: "¿Qué plugins usan los mezcladores profesionales?", a_es: "Los profesionales usan comúnmente FabFilter Total Bundle (EQ, compresión, limitación), iZotope Ozone y RX para masterización y reparación, Celemony Melodyne para corrección de tono, ValhallaDSP para reverb, Soundtoys para efectos y Universal Audio UAD para modelado analógico." }
    ],
    accessories: [
      { q: "What studio accessories do I actually need?", a: "Quality XLR cables (Mogami Gold), a sturdy mic stand, a pop filter for vocals, and isolation pads for monitors are the essentials. Treat your room acoustics before buying more gear.", q_es: "¿Qué accesorios de estudio realmente necesito?", a_es: "Cables XLR de calidad (Mogami Gold), un soporte de micrófono robusto, un filtro anti-pop para voces y pads de aislamiento para monitores son los esenciales. Trata la acústica de tu sala antes de comprar más equipo." },
      { q: "Are expensive XLR cables worth it?", a: "Mogami and Canare cables offer lifetime durability and superior shielding. For short runs in a home studio, budget cables work fine. For long runs or professional environments, invest in quality cables to prevent noise and signal loss.", q_es: "¿Valen la pena los cables XLR caros?", a_es: "Los cables Mogami y Canare ofrecen durabilidad de por vida y blindaje superior. Para tramos cortos en un home studio, los cables económicos funcionan bien. Para tramos largos o entornos profesionales, invierte en cables de calidad para prevenir ruido y pérdida de señal." },
      { q: "What is the best mic stand for studio recording?", a: "K&M and Ultimate Support make the most reliable mic stands. Look for a heavy base, smooth boom arm, and metal construction. Avoid plastic parts which break easily.", q_es: "¿Cuál es el mejor soporte de micrófono para grabación?", a_es: "K&M y Ultimate Support fabrican los soportes de micrófono más fiables. Busca una base pesada, brazo articulado suave y construcción metálica. Evita las piezas de plástico que se rompen fácilmente." },
      { q: "Do I need monitor stands for my studio?", a: "Yes. Monitor stands decouple speakers from your desk, reducing vibration and improving accuracy. If stands aren't possible, use isolation pads at minimum. Proper positioning is as important as the monitors themselves.", q_es: "¿Necesito soportes de monitor para mi estudio?", a_es: "Sí. Los soportes de monitor desacoplan los altavoces de tu escritorio, reduciendo la vibración y mejorando la precisión. Si no puedes usar soportes, usa pads de aislamiento como mínimo. La posición correcta es tan importante como los monitores mismos." },
      { q: "What is the best MIDI controller for beginners?", a: "The Arturia KeyLab Essential 49 offers great key feel, DAW integration, and included software. The Novation Launchkey 49 is excellent for Ableton users. For just pads and knobs, the Akai MPD218 is a solid entry at $119.", q_es: "¿Cuál es el mejor controlador MIDI para principiantes?", a_es: "El Arturia KeyLab Essential 49 ofrece buen tacto de teclas, integración DAW y software incluido. El Novation Launchkey 49 es excelente para usuarios de Ableton. Para solo pads y perillas, el Akai MPD218 es una entrada sólida a $119." }
    ],
    tres: [
      { q: "What is a Cuban tres guitar?", a: "The Cuban tres is a traditional string instrument from Cuba with three double-courses of strings (6 strings total). It is the rhythmic and melodic backbone of son cubano — the music that gave birth to salsa and Latin jazz.", q_es: "¿Qué es un tres cubano?", a_es: "El tres cubano es un instrumento de cuerda tradicional de Cuba con tres órdenes dobles de cuerdas (6 cuerdas en total). Es la columna vertebral rítmica y melódica del son cubano — la música que dio origen a la salsa y el jazz latino." },
      { q: "What is the best Cuban tres for recording?", a: "For studio recording, a solid spruce top with rosewood or mahogany back delivers the brightest, most articulate tone. Handcrafted instruments from Cuban luthiers or specialized workshops produce the most authentic sound.", q_es: "¿Cuál es el mejor tres cubano para grabación?", a_es: "Para grabación de estudio, una tapa sólida de abeto con fondo de palisandro o caoba ofrece el tono más brillante y articulado. Los instrumentos artesanales de luthiers cubanos o talleres especializados producen el sonido más auténtico." },
      { q: "How is a Cuban tres tuned?", a: "Traditional tuning is G–G, C–C, E–E (with the first string of each pair tuned an octave apart). This tuning creates the characteristic bright, percussive sound that defines Cuban music. Some players use variations for specific styles.", q_es: "¿Cómo se afina un tres cubano?", a_es: "La afinación tradicional es G–G, C–C, E–E (con la primera cuerda de cada par afinada a una octava de diferencia). Esta afinación crea el sonido brillante y percusivo característico que define la música cubana. Algunos músicos usan variaciones para estilos específicos." },
      { q: "Is the Cuban tres difficult to learn?", a: "The tres is accessible for guitarists but has its own technique. The octave-string pairs and percussive right-hand style take practice. Most players feel comfortable with basic son patterns within a few months of dedicated practice.", q_es: "¿Es difícil aprender a tocar el tres cubano?", a_es: "El tres es accesible para guitarristas pero tiene su propia técnica. Los pares de cuerdas en octava y el estilo percusivo de mano derecha requieren práctica. La mayoría de los músicos se sienten cómodos con patrones básicos de son en pocos meses de práctica dedicada." },
      { q: "What is the difference between a tres and a guitar?", a: "A tres has 3 double-string courses (6 strings) vs a guitar's 6 single strings. The tres is smaller, tuned differently (G-C-E), and played with a pick using percussive strumming patterns. It serves a rhythmic-melodic role unlike the guitar's harmonic accompaniment.", q_es: "¿Cuál es la diferencia entre un tres y una guitarra?", a_es: "Un tres tiene 3 órdenes dobles de cuerdas (6 cuerdas) frente a las 6 cuerdas simples de una guitarra. El tres es más pequeño, se afina diferente (G-C-E) y se toca con púa usando patrones de rasgueo percusivo. Cumple un rol rítmico-melódico distinto al acompañamiento armónico de la guitarra." }
    ]
  };
  var faqs = faqBase[guide.category] || faqBase.interfaces;
  var faqItems = faqs.map(function(f) {
    return {
      "@type": "Question",
      "name": lang === 'es' && f.q_es ? f.q_es : f.q,
      "acceptedAnswer": { "@type": "Answer", "text": lang === 'es' && f.a_es ? f.a_es : f.a }
    };
  });
  addJsonLd({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems });
}

document.addEventListener("DOMContentLoaded", () => {
  dataPromise.then(function() {
  var langParam = new URLSearchParams(window.location.search).get('lang');
  if (langParam === 'es' || langParam === 'en') {
    currentLang = langParam;
    localStorage.setItem("lang", langParam);
  }
  document.documentElement.lang = currentLang;
  document.documentElement.classList.add("lang-" + currentLang);
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  initLangSwitcher();
  renderGuideCats();
  window.addEventListener("load", () => {
    const q = new URLSearchParams(window.location.search).get('g');
    if (q && guides.find(g => g.id === q)) {
      history.replaceState({}, '', '/?g=' + q);
      renderGuideDetail(q);
    } else if (location.hash) {
      const h = location.hash.slice(1);
      const guide = guides.find(g => g.id === h);
      if (guide) {
        history.replaceState({}, '', '/?g=' + h);
        renderGuideDetail(h);
      } else {
        renderGuideGrid();
      }
    } else {
      renderGuideGrid();
    }
    renderAudioMini();
    renderMySetup();
    renderAbout();
    initVideoIntro();
    translatePage();
  });

  document.getElementById("searchInput").addEventListener("input", e => {
    searchQuery = e.target.value;
    renderGuideGrid();
  });

  document.getElementById("productSearchInput").addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();
    const results = document.getElementById("productSearchResults");
    if (!q) {
      results.style.display = "none";
      return;
    }
    const filtered = products.filter(p => {
      const t = p.title.toLowerCase();
      const te = (p.title_es || "").toLowerCase();
      const d = p.desc.toLowerCase();
      const de = (p.desc_es || "").toLowerCase();
      const c = p.category.toLowerCase();
      return t.includes(q) || te.includes(q) || d.includes(q) || de.includes(q) || c.includes(q);
    });
    if (filtered.length === 0) {
      results.style.display = "block";
      results.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:20px;">No products found</p>';
      return;
    }
    results.style.display = "block";
    results.innerHTML = '<div class="product-search-grid">' + filtered.map(p => renderProductCard(p.id)).join("") + '</div>';
    results.querySelectorAll(".guide-products-title").forEach(el => el.remove());
  });

  document.querySelectorAll(".nav-link[data-nav]").forEach(btn => {
    btn.addEventListener("click", () => handleNavClick(btn.dataset.nav));
  });

  bindDisclosureLink();

  window.filterCategory = function(cat) {
    currentCategory = cat;
    document.querySelectorAll(".cat-card").forEach(c => c.classList.toggle("active", c.dataset.cat === cat));
    renderGuideGrid();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToSection("guides");
      });
    });
  };

  window.addEventListener("popstate", () => {
    const q = new URLSearchParams(window.location.search).get('g');
    if (q && guides.find(g => g.id === q)) {
      renderGuideDetail(q);
    } else {
      renderGuideGrid();
      setTimeout(function() { scrollToSection("guides"); }, 200);
    }
  });

  document.addEventListener('play', e => {
    if (e.target.tagName === 'VIDEO') {
      document.querySelectorAll('audio').forEach(a => { a.pause(); });
    }
    if (e.target.tagName === 'AUDIO') {
      document.querySelectorAll('video').forEach(v => { v.pause(); });
    }
  }, true);

  document.addEventListener('keydown', e => {
    if (e.code === 'Space' && document.activeElement === document.body) {
      const video = document.getElementById('aboutVideo');
      if (video && (video.paused ? video.currentTime > 0 : true)) {
        e.preventDefault();
        video.paused ? video.play() : video.pause();
      }
    }
  });
  });
});
