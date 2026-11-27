/* © Transfer. Transfer Team offline helper: network first, the last good copy only when there is no internet.
   Only the app's own files under /team/ (no API calls, no personal data). One copy per file (query strings ignored). */
var C = "team-v1";
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== C; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var r = e.request;
  if (r.method !== "GET") return;
  var u = new URL(r.url);
  if (u.origin !== self.location.origin || u.pathname.indexOf("/team/") !== 0 || /\.apk$/.test(u.pathname)) return;
  var key = u.origin + (u.pathname.slice(-1) === "/" ? u.pathname + "index.html" : u.pathname);
  e.respondWith(fetch(r).then(function (res) {
    if (res && res.ok && res.type === "basic") { var cp = res.clone(); caches.open(C).then(function (c) { c.put(key, cp); }); }
    return res;
  }).catch(function () {
    return caches.open(C).then(function (c) { return c.match(key); }).then(function (m) {
      if (m) return m;
      if (r.mode === "navigate") return caches.open(C).then(function (c) { return c.match(u.origin + "/team/index.html"); }).then(function (x) { return x || Response.error(); });
      return Response.error();
    });
  }));
});
