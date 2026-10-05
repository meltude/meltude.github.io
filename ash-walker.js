// Ash walker: ground-line random walk with window-border limits + 2-5s idle pauses.
(function () {
  var IDLE_SRC = './Player_-_idle.webp';
  var WALK_SRC = './Player_-_walk.webp';

  var SPEED = 110; // px/s
  var MARGIN = 8; // px from window border
  var DISPLAY_WIDTH = 120; // must match #ash-player width in ash-walker.css
  var ARRIVE_THRESHOLD = 4; // px
  var IDLE_MIN = 2000; // ms
  var IDLE_RANGE = 3000; // -> 2-5s random

  // Respect reduced motion: stay idle, no walking
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var el = document.getElementById('ash-player');
  if (!el) return;

  // Preload so src swap has no flicker
  var idleImg = new Image();
  idleImg.src = IDLE_SRC;
  var walkImg = new Image();
  walkImg.src = WALK_SRC;

  function bounds() {
    var half = DISPLAY_WIDTH / 2;
    var minX = half + MARGIN;
    var maxX = Math.max(minX, window.innerWidth - half - MARGIN);
    return { minX: minX, maxX: maxX };
  }

  function randomIdleDuration() {
    return IDLE_MIN + Math.random() * IDLE_RANGE;
  }

  var x = window.innerWidth / 2;
  var targetX = x;
  var facing = 1;
  var state = 'idle';
  var idleUntil = performance.now() + randomIdleDuration();

  function pickTarget() {
    var b = bounds();
    targetX = b.minX + Math.random() * (b.maxX - b.minX);
    state = 'walk';
    el.src = WALK_SRC;
  }

  function render() {
    el.style.transform = 'translateX(' + x + 'px) translateX(-50%) scaleX(' + facing + ')';
  }

  function clampToBounds() {
    var b = bounds();
    x = Math.min(b.maxX, Math.max(b.minX, x));
    targetX = Math.min(b.maxX, Math.max(b.minX, targetX));
  }

  window.addEventListener('resize', clampToBounds);

  var lastT = null;

  function loop(t) {
    if (lastT === null) lastT = t;
    var dt = Math.min(0.05, (t - lastT) / 1000);
    lastT = t;

    if (state === 'idle' && t >= idleUntil) {
      pickTarget();
    }

    if (state === 'walk') {
      var dx = targetX - x;
      var dist = Math.abs(dx);

      if (dist < ARRIVE_THRESHOLD) {
        state = 'idle';
        el.src = IDLE_SRC;
        idleUntil = t + randomIdleDuration();
      } else {
        facing = dx < 0 ? -1 : 1;
        x += (dx < 0 ? -1 : 1) * SPEED * dt;

        // Hard border limit: never walk past window edge
        var b = bounds();
        if (x <= b.minX || x >= b.maxX) {
          x = Math.min(b.maxX, Math.max(b.minX, x));
          state = 'idle';
          el.src = IDLE_SRC;
          idleUntil = t + randomIdleDuration();
        }
      }
    }

    render();
    requestAnimationFrame(loop);
  }

  clampToBounds();
  el.src = IDLE_SRC;
  render();
  requestAnimationFrame(loop);
})();
