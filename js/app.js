let currentLang = localStorage.getItem("lang") || "en";
let currentCategory = "all";
let searchQuery = "";
let currentGuideId = null;
let initialLoad = true;
let skipDetailScroll = false;

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
  document.querySelector('meta[name="description"]').content = t("metaDescription");
  translatePage();
  renderGuideCats();
  if (currentGuideId) {
    var guide = guides.find(function(g) { return g.id === currentGuideId; });
    if (guide) {
      document.title = (lang === 'es' && guide.title_es ? guide.title_es : guide.title) + ' | TopMusicianGear';
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        var descText = lang === 'es' && guide.intro_es ? guide.intro_es : guide.intro;
        metaDesc.content = descText.substring(0, 200);
      }
    }
    skipDetailScroll = true;
    renderGuideDetail(currentGuideId);
  } else {
    renderGuideGrid();
  }
  renderAbout();
  updateAudioLabel();
  renderMySetup();
  updateLangSwitcher();
}

function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = t(key);
  });
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
    if (sortBar) sortBar.scrollIntoView({ behavior: "smooth", block: "start" });
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
  const allStoreKeys = ['thomann','pluginboutique','gear4music','sweetwater','musikproduktiv','amazon','reverb','andertons','baxmusic','musicstore','fender'];
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
    musicstore: (t) => `https://www.musicstore.com/en_GB/search?SearchText=${encodeURIComponent(t)}`,
    fender: (t) => `https://www.fender.com/en-GB/search?q=${encodeURIComponent(t)}`
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
          <img src="${g.image}" alt="${currentLang === 'es' && g.title_es ? g.title_es : g.title}" loading="lazy">
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
    setTimeout(() => {
      const el = document.getElementById("guideGrid");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
  var lang = currentLang;
  document.title = (lang === 'es' && guide.title_es ? guide.title_es : guide.title) + ' | TopMusicianGear';
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    var descText = lang === 'es' && guide.intro_es ? guide.intro_es : guide.intro;
    metaDesc.content = descText.substring(0, 200);
  }
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = (lang === 'es' && guide.title_es ? guide.title_es : guide.title);
  var ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = descText.substring(0, 200);
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
  const el = document.getElementById("audioMini");
  if (el) el.innerHTML = '<div class="audio-mini-inner"><span class="audio-mini-player"><audio controls preload="none"><source src="audio/solo-tres.mp3" type="audio/mpeg"></audio></span><span class="audio-eq"><i></i><i></i><i></i><i></i></span><span class="audio-mini-label">' + t("audioLabel") + '</span></div>';
  const elm = document.getElementById("audioMiniMobile");
  if (elm) elm.innerHTML = '<div class="audio-mini-inner"><span class="audio-mini-player"><audio controls preload="none"><source src="audio/solo-tres.mp3" type="audio/mpeg"></audio></span><span class="audio-eq"><i></i><i></i><i></i><i></i></span><span class="audio-mini-label">' + t("audioLabel") + '</span></div>';
  setTimeout(() => {
    document.querySelectorAll('#audioMini audio, #audioMiniMobile audio').forEach(audio => {
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
        <img src="img/me.jpg" alt="Top Musician Gear — Founder" onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:64px;color:var(--accent);\\'>🎵</div>'">
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
  var headerH = (document.querySelector('header').offsetHeight || 64) + 24;
  var rect = el.getBoundingClientRect();
  var top = rect.top + window.pageYOffset - headerH;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
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

  const article = {
    "@context": "https://schema.org", "@type": "Article",
    "headline": title,
    "description": intro.substring(0, 200),
    "author": { "@type": "Person", "name": "Daniel" },
    "publisher": { "@type": "Organization", "name": "TopMusicianGear", "url": "https://topmusiciangear.com" },
    "image": image,
    "datePublished": "2026-01-15", "dateModified": "2026-05-15",
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
          "description": (lang === 'es' && p.desc_es ? p.desc_es : p.desc).substring(0, 200),
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
      { q: "What is the best microphone for recording vocals?", q_es: "¿Cuál es el mejor micrófono para grabar voces?" },
      { q: "What microphone is best for home recording?", q_es: "¿Qué micrófono es mejor para grabación casera?" },
      { q: "Do I need a condenser or dynamic microphone?", q_es: "¿Necesito un micrófono de condensador o dinámico?" },
      { q: "How much should I spend on a good microphone?", q_es: "¿Cuánto debería gastar en un buen micrófono?" },
      { q: "What is the best microphone under $200?", q_es: "¿Cuál es el mejor micrófono por menos de $200?" }
    ],
    interfaces: [
      { q: "What is the best audio interface for home recording?", q_es: "¿Cuál es la mejor interfaz de audio para grabación casera?" },
      { q: "How many inputs do I need on an audio interface?", q_es: "¿Cuántas entradas necesito en una interfaz de audio?" },
      { q: "Is USB or Thunderbolt better for audio interfaces?", q_es: "¿Es mejor USB o Thunderbolt para interfaces de audio?" },
      { q: "What is the best budget audio interface?", q_es: "¿Cuál es la mejor interfaz de audio económica?" },
      { q: "Do I need a high-end audio interface as a beginner?", q_es: "¿Necesito una interfaz de audio de alta gama como principiante?" }
    ],
    monitors: [
      { q: "What are the best studio monitors for home recording?", q_es: "¿Cuáles son los mejores monitores de estudio para grabación casera?" },
      { q: "Do I need a subwoofer for studio monitors?", q_es: "¿Necesito un subwoofer para monitores de estudio?" },
      { q: "What size studio monitors should I get?", q_es: "¿De qué tamaño deberían ser mis monitores de estudio?" },
      { q: "How should I position my studio monitors?", q_es: "¿Cómo debería posicionar mis monitores de estudio?" },
      { q: "Are expensive studio monitors worth it?", q_es: "¿Valen la pena los monitores de estudio caros?" }
    ],
    headphones: [
      { q: "What are the best studio headphones for mixing?", q_es: "¿Cuáles son los mejores auriculares de estudio para mezclar?" },
      { q: "Open-back vs closed-back headphones for studio?", q_es: "¿Auriculares abiertos vs cerrados para estudio?" },
      { q: "Can I mix with headphones instead of monitors?", q_es: "¿Puedo mezclar con auriculares en vez de monitores?" },
      { q: "What is the best budget headphones for music production?", q_es: "¿Cuáles son los mejores auriculares económicos para producción musical?" },
      { q: "Do I need a headphone amplifier for studio headphones?", q_es: "¿Necesito un amplificador de auriculares para auriculares de estudio?" }
    ],
    plugins: [
      { q: "What are the essential mixing plugins for beginners?", q_es: "¿Cuáles son los plugins de mezcla esenciales para principiantes?" },
      { q: "Are expensive plugins better than free ones?", q_es: "¿Son los plugins caros mejores que los gratuitos?" },
      { q: "What is the best EQ plugin for mixing?", q_es: "¿Cuál es el mejor plugin de EQ para mezclar?" },
      { q: "Do I need analog modeling plugins?", q_es: "¿Necesito plugins de modelado analógico?" },
      { q: "What plugins do professional mixers use?", q_es: "¿Qué plugins usan los mezcladores profesionales?" }
    ],
    accessories: [
      { q: "What studio accessories do I actually need?", q_es: "¿Qué accesorios de estudio realmente necesito?" },
      { q: "Are expensive XLR cables worth it?", q_es: "¿Valen la pena los cables XLR caros?" },
      { q: "What is the best mic stand for studio recording?", q_es: "¿Cuál es el mejor soporte de micrófono para grabación?" },
      { q: "Do I need monitor stands for my studio?", q_es: "¿Necesito soportes de monitor para mi estudio?" },
      { q: "What is the best MIDI controller for beginners?", q_es: "¿Cuál es el mejor controlador MIDI para principiantes?" }
    ],
    tres: [
      { q: "What is a Cuban tres guitar?", q_es: "¿Qué es un tres cubano?" },
      { q: "What is the best Cuban tres for recording?", q_es: "¿Cuál es el mejor tres cubano para grabación?" },
      { q: "How is a Cuban tres tuned?", q_es: "¿Cómo se afina un tres cubano?" },
      { q: "Is the Cuban tres difficult to learn?", q_es: "¿Es difícil aprender a tocar el tres cubano?" },
      { q: "What is the difference between a tres and a guitar?", q_es: "¿Cuál es la diferencia entre un tres y una guitarra?" }
    ]
  };
  var faqs = faqBase[guide.category] || faqBase.interfaces;
  var faqItems = faqs.map(function(f) {
    return {
      "@type": "Question",
      "name": lang === 'es' && f.q_es ? f.q_es : f.q,
      "acceptedAnswer": { "@type": "Answer", "text": lang === 'es' && f.q_es ? f.q_es : f.q }
    };
  });
  addJsonLd({ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqItems });
}

document.addEventListener("DOMContentLoaded", () => {
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
      requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
      renderGuideGrid();
    }
  } else {
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
    renderGuideGrid();
  }
  renderAudioMini();
  renderMySetup();
  renderAbout();
  initVideoIntro();
  translatePage();

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

  document.getElementById("hamburger").addEventListener("click", () => {
    document.getElementById("mobileNav").classList.toggle("open");
  });

  document.getElementById("disclosureLink").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("disclosureModal").style.display = "flex";
  });
  document.getElementById("disclosureModal").addEventListener("click", e => {
    if (e.target === e.currentTarget) e.target.style.display = "none";
  });

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

  document.addEventListener('pause', e => {
    // bg video was replaced with static image
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

  initialLoad = false;
});
