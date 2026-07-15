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
  document.querySelectorAll(".page-hero-video, .hero-video").forEach(function (video) {
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
  var video = document.querySelector(".hero-video");
  var toggle = document.querySelector(".sound-toggle");
  if (!video || !toggle) return;

  function setState(muted) {
    video.muted = muted;
    toggle.setAttribute("aria-pressed", muted ? "true" : "false");
    toggle.setAttribute("aria-label", muted ? "Activer le son" : "Couper le son");
  }

  video.muted = false;
  video.play().catch(function () {
    setState(true);
    video.play().catch(function () {});
  });

  toggle.addEventListener("click", function () {
    setState(!video.muted);
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

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".compare-carousel").forEach(function (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-slide"));
    var dots = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-dot"));
    var prevBtn = carousel.querySelector(".carousel-arrow.prev");
    var nextBtn = carousel.querySelector(".carousel-arrow.next");
    var current = 0;

    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === current);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === current);
      });
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { show(current - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { show(current + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { show(i); });
    });
  });
});
