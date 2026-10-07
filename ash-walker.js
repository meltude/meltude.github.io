(function () {
  var IDLE_SRC = "./ash-assets/Player_-_idle.webp";
  var WALK_SRC = "./ash-assets/Player_-_walk.webp";

  var SPEED = 110;
  var MARGIN = 8;
  var DISPLAY_WIDTH = 120;
  var ARRIVE_THRESHOLD = 4;
  var IDLE_MIN = 2000;
  var IDLE_RANGE = 3000;

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  var el = document.getElementById("ash-player");
  if (!el) return;

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
  var state = "idle";
  var idleUntil = performance.now() + randomIdleDuration();

  function pickTarget() {
    var b = bounds();
    targetX = b.minX + Math.random() * (b.maxX - b.minX);
    state = "walk";
    el.src = WALK_SRC;
  }

  function render() {
    el.style.transform =
      "translateX(" + x + "px) translateX(-50%) scaleX(" + facing + ")";
  }

  function clampToBounds() {
    var b = bounds();
    x = Math.min(b.maxX, Math.max(b.minX, x));
    targetX = Math.min(b.maxX, Math.max(b.minX, targetX));
  }

  window.addEventListener("resize", clampToBounds);

  var lastT = null;

  function loop(t) {
    if (lastT === null) lastT = t;
    var dt = Math.min(0.05, (t - lastT) / 1000);
    lastT = t;

    if (state === "idle" && t >= idleUntil) {
      pickTarget();
    }

    if (state === "walk") {
      var dx = targetX - x;
      var dist = Math.abs(dx);

      if (dist < ARRIVE_THRESHOLD) {
        state = "idle";
        el.src = IDLE_SRC;
        idleUntil = t + randomIdleDuration();
      } else {
        facing = dx < 0 ? -1 : 1;
        x += (dx < 0 ? -1 : 1) * SPEED * dt;

        var b = bounds();
        if (x <= b.minX || x >= b.maxX) {
          x = Math.min(b.maxX, Math.max(b.minX, x));
          state = "idle";
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
