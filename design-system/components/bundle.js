/* @ds-bundle: {"format":4,"namespace":"TheRide","components":[{"name":"IgnitionControl"},{"name":"BikeLane"},{"name":"Milestone"},{"name":"StopHeader"},{"name":"TapedPhoto"},{"name":"ScannedDocument"},{"name":"Correction"},{"name":"MarginNote"},{"name":"VoiceNote"},{"name":"BigStat"},{"name":"NightStop"},{"name":"InkReveal"},{"name":"Signboard"},{"name":"ExperimentCard"},{"name":"Garage"}]} */
(function () {
  "use strict";
  var R = (window.TheRide = window.TheRide || {});
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function rng(seed) {
    var s = (seed >>> 0) || 7;
    return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return ((s >>> 0) % 1000) / 1000; };
  }
  function fmt(t) { t = Math.max(0, Math.round(t)); return Math.floor(t / 60) + ":" + ("0" + (t % 60)).slice(-2); }

  /* Speech-shaped peaks: phrases with pauses. Replace with real peaks from the audio file. */
  R.peaks = function (n, seed) {
    var r = rng(seed || 7), out = [], phrase = 0;
    for (var i = 0; i < n; i++) {
      if (phrase <= 0) phrase = 6 + Math.floor(r() * 12);
      phrase--;
      var gap = phrase === 0 && r() > 0.4;
      var v = gap ? 0.12 : 0.22 + 0.78 * Math.pow(r(), 0.8) * (0.55 + 0.45 * Math.sin(Math.PI * (i + 0.5) / n));
      out.push(Math.round(v * 100) / 100);
    }
    return out;
  };
  R.waveform = function (el, peaks) {
    el.innerHTML = "";
    for (var i = 0; i < peaks.length; i++) {
      var b = document.createElement("i");
      b.style.height = Math.max(10, peaks[i] * 100) + "%";
      el.appendChild(b);
    }
    return el;
  };

  /* Voice: the hero ignition. Demo cycle off → listening → heard → on. Wire real speech recognition in place of the timers. */
  R.IgnitionControl = function (root) {
    var key = root.querySelector(".rd-ignition__key");
    var status = root.querySelector(".rd-ignition__status");
    var wave = root.querySelector(".rd-wave");
    if (wave) R.waveform(wave, R.peaks(22, 11));
    var copy = { off: "Engine off.", listening: "Listening…", heard: "Heard you.", on: "Engine on. Scroll to ride." };
    function set(s) { root.setAttribute("data-state", s); if (status) status.textContent = copy[s]; key.setAttribute("aria-pressed", s === "on" ? "true" : "false"); }
    key.addEventListener("click", function () {
      var s = root.getAttribute("data-state") || "off";
      if (s === "on") return set("off");
      if (s !== "off") return;
      set("listening");
      setTimeout(function () { set("heard"); setTimeout(function () { set("on"); }, 900); }, 1700);
    });
    set(root.getAttribute("data-state") || "off");
    return root;
  };

  R.VoiceNote = function (root) {
    var btn = root.querySelector(".rd-voice__play");
    var wave = root.querySelector(".rd-wave");
    var time = root.querySelector(".rd-voice__time");
    var dur = parseFloat(root.getAttribute("data-duration")) || 15;
    var audio = root.querySelector("audio");
    R.waveform(wave, R.peaks(parseInt(root.getAttribute("data-bars"), 10) || 44, parseInt(root.getAttribute("data-seed"), 10) || 3));
    var bars = wave.children, pos = 0, raf = 0, last = 0;
    function paint() {
      var p = pos / dur, n = Math.round(p * bars.length);
      for (var i = 0; i < bars.length; i++) bars[i].classList.toggle("is-played", i < n);
      time.textContent = fmt(pos) + " / " + fmt(dur);
    }
    function tick(ts) {
      if (!last) last = ts;
      pos = audio ? audio.currentTime : Math.min(dur, pos + (ts - last) / 1000);
      last = ts; paint();
      if (pos >= dur) return stop(true);
      raf = requestAnimationFrame(tick);
    }
    function play() { root.classList.add("is-playing"); btn.setAttribute("aria-label", "Pause voice note"); if (audio) audio.play(); last = 0; raf = requestAnimationFrame(tick); }
    function stop(ended) { root.classList.remove("is-playing"); btn.setAttribute("aria-label", "Play voice note, " + Math.round(dur) + " seconds"); if (audio) audio.pause(); cancelAnimationFrame(raf); if (ended) { pos = 0; paint(); } }
    btn.addEventListener("click", function () { root.classList.contains("is-playing") ? stop(false) : play(); });
    var det = root.querySelector(".rd-voice__transcript"), txt = root.querySelector(".rd-voice__text");
    if (det && txt) det.addEventListener("toggle", function () { txt.hidden = !det.open; });
    paint();
    return root;
  };

  /* Demo: "Ride on" rolls the road and brings the next stone in. On the site, drive this from scroll progress. */
  R.BikeLane = function (root) {
    var btn = root.querySelector(".rd-lane__ride");
    var ticks = root.querySelectorAll(".rd-lane__ticks i");
    var year = root.querySelector(".rd-lane__stone .rd-milestone__year");
    var cap = root.querySelector(".rd-lane__stone .rd-milestone__cap");
    var stopNo = root.querySelector(".rd-lane__stopno");
    var stops = [["2016", "CLASS 9"], ["2017", "CLASS 10"], ["2018", "THE BIKE"], ["2019", "CLASS 12"], ["2021", "COLLEGE"], ["2022", "2 AM"]];
    var i = 2;
    root.classList.add("is-idle");
    if (!btn) return root;
    btn.addEventListener("click", function () {
      if (root.classList.contains("is-riding")) return;
      i = (i + 1) % stops.length;
      root.classList.remove("is-idle");
      if (!reduce) { root.classList.add("is-riding"); }
      year.textContent = stops[i][0]; cap.textContent = stops[i][1];
      for (var k = 0; k < ticks.length; k++) ticks[k].classList.toggle("is-past", k <= i);
      if (stopNo) stopNo.textContent = "STOP " + ("0" + (i + 1)).slice(-2) + " / 12";
      setTimeout(function () { root.classList.remove("is-riding"); root.classList.add("is-idle"); }, reduce ? 0 : 1600);
    });
    return root;
  };

  R.InkReveal = function (root) {
    var btn = root.querySelector(".rd-ink__replay");
    function run() { root.classList.remove("is-open"); void root.offsetWidth; requestAnimationFrame(function () { root.classList.add("is-open"); }); }
    if (btn) btn.addEventListener("click", run);
    setTimeout(run, 400);
    return root;
  };

  /* Draws strike-throughs once when they scroll into view. */
  R.Correction = function (root) {
    var fixes = root.classList.contains("rd-fix") ? [root] : root.querySelectorAll(".rd-fix");
    if (reduce || !("IntersectionObserver" in window)) return root;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-drawing"); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    for (var i = 0; i < fixes.length; i++) io.observe(fixes[i]);
    return root;
  };

  /* CSS-only components: no behaviour; these return the element so every component can be mounted the same way. */
  ["Milestone", "StopHeader", "TapedPhoto", "ScannedDocument", "MarginNote", "BigStat", "NightStop", "Signboard", "ExperimentCard", "Garage"].forEach(function (n) {
    R[n] = function (root) { return root; };
  });

  R.mount = function (scope) {
    var els = (scope || document).querySelectorAll("[data-rd]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i], k = el.getAttribute("data-rd");
      if (R[k] && !el.__rd) { el.__rd = 1; R[k](el); }
    }
  };
})();
