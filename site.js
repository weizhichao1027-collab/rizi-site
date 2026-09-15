(function () {
  function apply(lang) {
    var en = lang === "en";
    document.documentElement.lang = en ? "en" : "zh-Hans";
    document.querySelectorAll("[data-lang-switch]").forEach(function (btn) {
      var target = btn.getAttribute("data-lang-switch");
      btn.setAttribute("aria-pressed", String(target === (en ? "en" : "zh-Hans")));
    });
    try {
      localStorage.setItem("rizi-lang", en ? "en" : "zh-Hans");
    } catch (e) {}
    var title = document.documentElement.getAttribute(en ? "data-title-en" : "data-title-zh");
    var desc = document.documentElement.getAttribute(en ? "data-desc-en" : "data-desc-zh");
    if (title) document.title = title;
    var meta = document.querySelector('meta[name="description"]');
    if (meta && desc) meta.setAttribute("content", desc);
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-lang-switch]");
    if (!btn) return;
    apply(btn.getAttribute("data-lang-switch"));
  });

  var q = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try {
    saved = localStorage.getItem("rizi-lang");
  } catch (e) {}
  if (q === "en" || q === "zh-Hans") apply(q);
  else if (saved === "en" || saved === "zh-Hans") apply(saved);
  else if ((navigator.language || "").toLowerCase().indexOf("en") === 0) apply("en");
})();
