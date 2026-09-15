(function () {
  "use strict";

  var STORE_URL = "";
  var CYCLE_MS = 5200;
  var I18N = window.RIZI_I18N;
  var SCENES = [
    { theme: "exam-sprint", texture: "ruled", offset: 12, nameKey: "sceneExam", pro: false },
    { theme: "birthday-party", texture: "dots", offset: 6, nameKey: "sceneBirthday", pro: false },
    { theme: "love-memorial", texture: "gradient", offset: 0, nameKey: "sceneLove", pro: true },
    { theme: "travel-depart", texture: "grid", offset: -30, nameKey: "sceneTravel", pro: true },
    { theme: "job-countdown", texture: "grid", offset: 3, nameKey: "sceneJob", pro: true },
    { theme: "graduation", texture: "ruled", offset: -90, nameKey: "sceneGrad", pro: true }
  ];

  var currentLang = "zh-Hans";

  function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function isoFromOffset(offset) {
    var d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + offset);
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "." + m + "." + day;
  }

  function phrase(offset) {
    if (I18N && I18N.countPhrase) return I18N.countPhrase(currentLang, offset);
    if (offset === 0) return currentLang === "en" ? "Today" : "就是今天";
    if (offset > 0) {
      return currentLang === "en"
        ? (offset === 1 ? "1 day left" : offset + " days left")
        : "还剩 " + offset + " 天";
    }
    var n = Math.abs(offset);
    return currentLang === "en"
      ? (n === 1 ? "1 day ago" : n + " days ago")
      : "已过 " + n + " 天";
  }

  function sceneName(scene) {
    if (I18N && I18N.t) {
      var named = I18N.t(currentLang, scene.nameKey);
      if (named) return named;
    }
    return scene.theme;
  }

  function applyText() {
    if (!I18N || !I18N.t) {
      document.querySelectorAll("[data-lang]").forEach(function (el) {
        var show = currentLang === "en" ? el.getAttribute("data-lang") === "en" : el.getAttribute("data-lang") === "zh";
        el.toggleAttribute("hidden", !show);
      });
      return;
    }
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var value = I18N.t(currentLang, el.getAttribute("data-i18n"));
      if (value == null) return;
      if (el.hasAttribute("data-i18n-html")) el.innerHTML = value;
      else el.textContent = value;
    });
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      if (el.hasAttribute("data-i18n") || el.querySelector("[data-i18n]")) {
        el.removeAttribute("hidden");
        return;
      }
      el.toggleAttribute("hidden", true);
    });
    var title = I18N.t(currentLang, document.body.getAttribute("data-title-key") || "homeTitle");
    var desc = I18N.t(currentLang, document.body.getAttribute("data-desc-key") || "homeDesc");
    if (title) document.title = title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta && desc) meta.setAttribute("content", desc);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDesc = document.querySelector('meta[property="og:description"]');
    var ogLocale = document.querySelector('meta[property="og:locale"]');
    var metaInfo = I18N.localeMeta(currentLang);
    if (ogTitle && title) ogTitle.setAttribute("content", title);
    if (ogDesc && desc) ogDesc.setAttribute("content", desc);
    if (ogLocale && metaInfo) ogLocale.setAttribute("content", metaInfo.og);
  }

  function applyLang(lang, skipHistory) {
    currentLang = I18N && I18N.normalize ? (I18N.normalize(lang) || "zh-Hans") : (lang === "en" ? "en" : "zh-Hans");
    var info = I18N && I18N.localeMeta ? I18N.localeMeta(currentLang) : { html: currentLang, dir: "ltr" };
    document.documentElement.lang = info.html || currentLang;
    document.documentElement.dir = info.dir || "ltr";
    var select = document.querySelector("[data-lang-select]");
    if (select) select.value = currentLang;
    document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang-switch") === currentLang));
    });
    try {
      localStorage.setItem("rizi-lang", currentLang);
    } catch (e) {}
    if (!skipHistory) {
      try {
        var url = new URL(window.location.href);
        url.searchParams.set("lang", currentLang);
        history.replaceState({}, "", url);
      } catch (e2) {}
    }
    applyText();
    refreshLeaves();
  }

  function setLang(lang) {
    if (I18N && I18N.loadLocale) {
      I18N.loadLocale(lang, function (id) {
        applyLang(id);
      });
      return;
    }
    applyLang(lang);
  }

  function fillLeaf(el, scene) {
    if (!el || !scene) return;
    el.setAttribute("data-theme", scene.theme);
    el.setAttribute("data-texture", scene.texture);
    var count = el.querySelector("[data-leaf-count]");
    var name = el.querySelector("[data-leaf-name]");
    var date = el.querySelector("[data-leaf-date]");
    var badge = el.querySelector("[data-leaf-badge]");
    var label = sceneName(scene);
    if (count) count.textContent = phrase(scene.offset);
    if (name) name.textContent = label;
    if (date) date.textContent = isoFromOffset(scene.offset);
    if (badge) {
      badge.hidden = !scene.pro;
      badge.textContent = "Pro";
    }
    el.setAttribute("aria-label", label + ", " + phrase(scene.offset));
  }

  function sceneByTheme(id) {
    for (var i = 0; i < SCENES.length; i += 1) {
      if (SCENES[i].theme === id) return SCENES[i];
    }
    return SCENES[0];
  }

  var heroIndex = 0;
  var heroTimer = null;
  var heroPaused = false;

  function showHero(index) {
    var hero = document.getElementById("hero-leaf");
    if (!hero) return;
    heroIndex = (index + SCENES.length) % SCENES.length;
    fillLeaf(hero, SCENES[heroIndex]);
    document.querySelectorAll("[data-scene]").forEach(function (btn) {
      var scene = sceneByTheme(btn.getAttribute("data-scene"));
      if (scene.theme === SCENES[heroIndex].theme) btn.setAttribute("aria-current", "true");
      else btn.removeAttribute("aria-current");
      btn.setAttribute("aria-label", sceneName(scene) + ", " + phrase(scene.offset));
    });
  }

  function refreshLeaves() {
    var hero = document.getElementById("hero-leaf");
    if (hero) fillLeaf(hero, SCENES[heroIndex]);
    document.querySelectorAll("[data-scene-leaf]").forEach(function (el) {
      fillLeaf(el, sceneByTheme(el.getAttribute("data-scene-leaf")));
    });
    document.querySelectorAll("[data-count-offset]").forEach(function (el) {
      el.textContent = phrase(Number(el.getAttribute("data-count-offset")));
    });
    document.querySelectorAll("[data-date-offset]").forEach(function (el) {
      el.textContent = isoFromOffset(Number(el.getAttribute("data-date-offset")));
    });
    document.querySelectorAll("[data-scene]").forEach(function (btn) {
      var scene = sceneByTheme(btn.getAttribute("data-scene"));
      btn.setAttribute("aria-label", sceneName(scene) + ", " + phrase(scene.offset));
    });
  }

  function startCycle() {
    stopCycle();
    if (prefersReducedMotion() || !document.getElementById("hero-leaf")) return;
    heroTimer = window.setInterval(function () {
      if (!heroPaused) showHero(heroIndex + 1);
    }, CYCLE_MS);
  }

  function stopCycle() {
    if (heroTimer) window.clearInterval(heroTimer);
    heroTimer = null;
  }

  function bindHero() {
    var hero = document.getElementById("hero-leaf");
    if (!hero) return;
    showHero(0);
    document.querySelectorAll("[data-scene]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        heroPaused = true;
        showHero(SCENES.indexOf(sceneByTheme(btn.getAttribute("data-scene"))));
      });
    });
    hero.addEventListener("mouseenter", function () { heroPaused = true; });
    hero.addEventListener("mouseleave", function () { heroPaused = false; });
    hero.addEventListener("focusin", function () { heroPaused = true; });
    hero.addEventListener("focusout", function () { heroPaused = false; });
    startCycle();
  }

  function fillLangSelect() {
    var select = document.querySelector("[data-lang-select]");
    if (!select) return;
    if (I18N && I18N.LOCALES && !select.options.length) {
      I18N.LOCALES.forEach(function (locale) {
        var opt = document.createElement("option");
        opt.value = locale.id;
        opt.textContent = locale.name;
        select.appendChild(opt);
      });
    }
    select.addEventListener("change", function () {
      setLang(select.value);
    });
  }

  function bindLang() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lang-switch]");
      if (!btn) return;
      setLang(btn.getAttribute("data-lang-switch"));
    });
  }

  function bindNav() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.setAttribute("data-open", String(open));
      document.body.setAttribute("data-nav-open", String(open));
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function bindStore() {
    if (!STORE_URL) return;
    document.querySelectorAll("[data-store]").forEach(function (el) {
      el.setAttribute("href", STORE_URL);
      el.removeAttribute("aria-disabled");
    });
  }

  function initialLang() {
    var query = "";
    var stored = "";
    try { query = new URLSearchParams(location.search).get("lang") || ""; } catch (e) {}
    try { stored = localStorage.getItem("rizi-lang") || ""; } catch (e2) {}
    if (I18N && I18N.detect) return I18N.detect(query, stored, navigator.language || "");
    if (query === "en" || (!query && (stored === "en" || (!stored && (navigator.language || "").indexOf("en") === 0)))) {
      return "en";
    }
    return "zh-Hans";
  }

  fillLangSelect();
  bindLang();
  bindNav();
  bindStore();
  setLang(initialLang());
  bindHero();
})();
