// © Transfer. "Put Transfer on your home screen": on iPhone a short how-to (Safari has no install button),
// on Android Chrome the real install button. Shown once a visitor has looked around; "Later" hides it for 14 days.
(function () {
  var standalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  if (standalone) { document.documentElement.classList.add("as-app"); return; }
  var ua = navigator.userAgent;
  // ?ins=1 shows the iPhone hint anywhere (for testing).
  var ios = /[?&]ins=1/.test(location.search) || (/iPhone|iPad|iPod/.test(ua) && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua));
  var key = "transfer-install-later";
  function later() { try { return Date.now() < +(localStorage.getItem(key) || 0); } catch (e) { return false; } }
  function hide(el) { el.classList.remove("on"); setTimeout(function () { el.remove(); }, 400);
    try { localStorage.setItem(key, String(Date.now() + 14 * 864e5)); } catch (e) {} }
  var lang = (document.documentElement.lang || navigator.language || "de").slice(0, 2);
  var T = {
    de: { t: "Transfer als App", ios: "Tippe auf <b>Teilen</b> <span class=ins-share></span> und dann <b>„Zum Home-Bildschirm“</b>.", and: "Mit einem Tipp installieren – ohne App Store.", add: "Installieren", no: "Später" },
    en: { t: "Transfer as an app", ios: "Tap <b>Share</b> <span class=ins-share></span>, then <b>“Add to Home Screen”</b>.", and: "Install with one tap – no app store.", add: "Install", no: "Later" },
    el: { t: "Το Transfer σαν εφαρμογή", ios: "Πάτα <b>Κοινοποίηση</b> <span class=ins-share></span> και μετά <b>«Προσθήκη στην οθόνη Αφετηρίας»</b>.", and: "Εγκατάσταση με ένα πάτημα – χωρίς store.", add: "Εγκατάσταση", no: "Αργότερα" }
  }[lang] || null;
  var t = T || { t: "Transfer als App", ios: "", and: "", add: "Installieren", no: "Später" };
  var deferred = null;

  function show(text, withButton) {
    if (later() || document.querySelector(".ins")) return;
    var el = document.createElement("div");
    el.className = "ins"; el.setAttribute("role", "dialog"); el.setAttribute("aria-label", t.t);
    el.innerHTML = '<img src="assets/apple-touch-icon.png" alt="" width="44" height="44"><div class=ins-txt><strong>' + t.t +
      "</strong><span>" + text + "</span></div>" + (withButton ? '<button class=ins-add type=button>' + t.add + "</button>" : "") +
      '<button class=ins-no type=button aria-label="' + t.no + '">' + (withButton ? "✕" : t.no) + "</button>";
    document.body.appendChild(el);
    requestAnimationFrame(function () { requestAnimationFrame(function () { el.classList.add("on"); }); });
    el.querySelector(".ins-no").onclick = function () { hide(el); };
    var add = el.querySelector(".ins-add");
    if (add) add.onclick = function () { if (deferred) { deferred.prompt(); deferred = null; } hide(el); };
  }

  // Not at once: after 12 seconds or the first scroll down, when the visitor has seen what Transfer is.
  function soon(fn) {
    var done = false; function go() { if (done) return; done = true; fn(); }
    setTimeout(go, 12000);
    window.addEventListener("scroll", function s() { if (window.scrollY > 600) { window.removeEventListener("scroll", s); go(); } }, { passive: true });
  }
  if (ios) soon(function () { show(t.ios, false); });
  window.addEventListener("beforeinstallprompt", function (e) { e.preventDefault(); deferred = e; soon(function () { show(t.and, true); }); });
})();
