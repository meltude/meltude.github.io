/* Diagonal starfall background — no twinkle, seamless wrap-around loop. */
(function () {
  var canvas = document.getElementById("stars");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0;
  var H = 0;
  var stars = [];

  // Fixed seed so the pattern is identical on every load (repeating figure).
  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Diagonal direction: down-right. Flip sign of VX for down-left.
  var VX = 0.35;
  var VY = 0.75;

  function build() {
    var rand = mulberry32(1337);
    var count = Math.min(140, Math.floor((W * H) / 12000) || 60);
    stars = [];
    for (var i = 0; i < count; i++) {
      var size = rand() < 0.8 ? 1 : 2; // small stars only
      var speed = 0.5 + rand() * 0.9; // slight depth, constant per star
      stars.push({
        x: rand() * W,
        y: rand() * H,
        s: size,
        v: speed,
        // Constant alpha per star — no twinkle animation.
        a: 0.3 + rand() * 0.45,
      });
    }
  }

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    build();
    draw(); // paint one static frame immediately (also covers reduced-motion)
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#ffffff";
    for (var i = 0; i < stars.length; i++) {
      var st = stars[i];
      ctx.globalAlpha = st.a;
      // Square figure: cheap, crisp at 1-2px, no glow.
      ctx.fillRect(st.x, st.y, st.s, st.s);
    }
    ctx.globalAlpha = 1;
  }

  function step() {
    for (var i = 0; i < stars.length; i++) {
      var st = stars[i];
      st.x += VX * st.v;
      st.y += VY * st.v;
      // Wrap around for an infinite repeating cycle.
      if (st.y > H + 2) {
        st.y = -2;
        // keep diagonal flow continuous on wrap
        st.x -= 2;
      }
      if (st.x > W + 2) {
        st.x = -2;
      }
      if (st.x < -4) {
        st.x = W + 2;
      }
    }
    draw();
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timer = null;

  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", function () {
    if (reduceMotion) return;
    if (document.hidden) {
      if (timer) cancelAnimationFrame(timer);
      timer = null;
    } else if (!timer) {
      loop();
    }
  });

  function loop() {
    step();
    timer = requestAnimationFrame(loop);
  }

  resize();
  if (!reduceMotion) {
    loop();
  }
})();
