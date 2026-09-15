(function () {
  "use strict";

  var STORE_URL = "";
  var CYCLE_MS = 5200;
  var SCENES = [
    { theme: "exam-sprint", texture: "ruled", offset: 12, zh: "期末考试", en: "Final exam", pro: false },
    { theme: "birthday-party", texture: "dots", offset: 6, zh: "生日派对", en: "Birthday party", pro: false },
    { theme: "love-memorial", texture: "gradient", offset: 0, zh: "恋爱纪念日", en: "Anniversary", pro: true },
    { theme: "travel-depart", texture: "grid", offset: -30, zh: "旅行出发", en: "Trip departure", pro: true },
    { theme: "job-countdown", texture: "grid", offset: 3, zh: "入职倒计时", en: "First day at work", pro: true },
    { theme: "graduation", texture: "ruled", offset: -90, zh: "毕业季", en: "Graduation", pro: true }
  ];

  function isEnglish() {
    return document.documentElement.lang === "en";
  }

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

  function countPhrase(offset, en) {
    if (offset === 0) return en ? "Today" : "就是今天";
    if (offset > 0) {
      if (en) return offset === 1 ? "1 day left" : offset + " days left";
      return "还剩 " + offset + " 天";
    }
    var n = Math.abs(offset);
    if (en) return n === 1 ? "1 day ago" : n + " days ago";
    return "已过 " + n + " 天";
  }

  function applyLang(lang) {
    var en = lang === "en";
    document.documentElement.lang = en ? "en" : "zh-Hans";
    document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
      var target = btn.getAttribute("data-lang-switch");
      btn.setAttribute("aria-pressed", String(target === (en ? "en" : "zh-Hans")));
    });
    document.querySelectorAll("[data-lang]").forEach(function (el) {
      var show = el.getAttribute("data-lang") === (en ? "en" : "zh");
      el.toggleAttribute("hidden", !show);
    });
    try {
      localStorage.setItem("rizi-lang", en ? "en" : "zh-Hans");
    } catch (e) {}
    var title = document.documentElement.getAttribute(en ? "data-title-en" : "data-title-zh");
    var desc = document.documentElement.getAttribute(en ? "data-desc-en" : "data-desc-zh");
    if (title) document.title = title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta && desc) meta.setAttribute("content", desc);
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDesc = document.querySelector('meta[property="og:description"]');
    var ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogTitle && title) ogTitle.setAttribute("content", title);
    if (ogDesc && desc) ogDesc.setAttribute("content", desc);
    if (ogLocale) ogLocale.setAttribute("content", en ? "en_US" : "zh_CN");
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("lang", en ? "en" : "zh-Hans");
      history.replaceState({}, "", url);
    } catch (e2) {}
    refreshLeaves();
  }

  function fillLeaf(el, scene) {
    if (!el || !scene) return;
    var en = isEnglish();
    el.setAttribute("data-theme", scene.theme);
    el.setAttribute("data-texture", scene.texture);
    var count = el.querySelector("[data-leaf-count]");
    var name = el.querySelector("[data-leaf-name]");
    var date = el.querySelector("[data-leaf-date]");
    var badge = el.querySelector("[data-leaf-badge]");
    if (count) count.textContent = countPhrase(scene.offset, en);
    if (name) name.textContent = en ? scene.en : scene.zh;
    if (date) date.textContent = isoFromOffset(scene.offset);
    if (badge) {
      badge.hidden = !scene.pro;
      badge.textContent = "Pro";
    }
    el.setAttribute(
      "aria-label",
      (en ? scene.en : scene.zh) + ", " + countPhrase(scene.offset, en)
    );
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
      var en = isEnglish();
      var active = scene.theme === SCENES[heroIndex].theme;
      if (active) btn.setAttribute("aria-current", "true");
      else btn.removeAttribute("aria-current");
      btn.setAttribute("aria-label", (en ? scene.en : scene.zh) + ", " + countPhrase(scene.offset, en));
    });
  }

  function refreshLeaves() {
    var hero = document.getElementById("hero-leaf");
    if (hero) fillLeaf(hero, SCENES[heroIndex]);
    document.querySelectorAll("[data-scene-leaf]").forEach(function (el) {
      fillLeaf(el, sceneByTheme(el.getAttribute("data-scene-leaf")));
    });
    document.querySelectorAll("[data-count-offset]").forEach(function (el) {
      var offset = Number(el.getAttribute("data-count-offset"));
      el.textContent = countPhrase(offset, isEnglish());
    });
    document.querySelectorAll("[data-date-offset]").forEach(function (el) {
      el.textContent = isoFromOffset(Number(el.getAttribute("data-date-offset")));
    });
    document.querySelectorAll("[data-scene]").forEach(function (btn) {
      var scene = sceneByTheme(btn.getAttribute("data-scene"));
      var en = isEnglish();
      btn.setAttribute("aria-label", (en ? scene.en : scene.zh) + ", " + countPhrase(scene.offset, en));
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
    hero.addEventListener("mouseenter", function () {
      heroPaused = true;
    });
    hero.addEventListener("mouseleave", function () {
      heroPaused = false;
    });
    hero.addEventListener("focusin", function () {
      heroPaused = true;
    });
    hero.addEventListener("focusout", function () {
      heroPaused = false;
    });
    startCycle();
  }

  function bindLang() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-lang-switch]");
      if (!btn) return;
      applyLang(btn.getAttribute("data-lang-switch") === "en" ? "en" : "zh-Hans");
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
      link.addEventListener("click", function () {
        setOpen(false);
      });
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

  bindLang();
  bindNav();
  bindStore();
  applyLang(document.documentElement.lang === "en" ? "en" : "zh-Hans");
  bindHero();
})();
