document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    nav.classList.toggle("open");
  });
  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("open");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".page-hero-video").forEach(function (video) {
    function reveal() {
      video.classList.add("is-ready");
    }
    if (video.readyState >= 2) {
      reveal();
    } else {
      video.addEventListener("loadeddata", reveal, { once: true });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".img-compare").forEach(function (el) {
    var afterWrap = el.querySelector(".img-after-wrap");
    var handle = el.querySelector(".handle");
    var dragging = false;

    function setPosition(percent) {
      percent = Math.max(0, Math.min(100, percent));
      afterWrap.style.clipPath = "inset(0 " + (100 - percent) + "% 0 0)";
      handle.style.left = percent + "%";
    }

    function move(clientX) {
      var rect = el.getBoundingClientRect();
      var percent = ((clientX - rect.left) / rect.width) * 100;
      setPosition(percent);
    }

    el.addEventListener("mousedown", function (e) {
      dragging = true;
      move(e.clientX);
    });
    window.addEventListener("mousemove", function (e) {
      if (dragging) move(e.clientX);
    });
    window.addEventListener("mouseup", function () {
      dragging = false;
    });
    el.addEventListener("touchstart", function (e) {
      dragging = true;
      move(e.touches[0].clientX);
    }, { passive: true });
    el.addEventListener("touchmove", function (e) {
      if (dragging) move(e.touches[0].clientX);
    }, { passive: true });
    el.addEventListener("touchend", function () {
      dragging = false;
    });

    setPosition(50);
  });
});
