/* ============================================================
   La Palapa de Don Margaro -- main.js
   Loader, parallax, scroll-reveal, nav, hamburger, hero cue
   ============================================================ */
"use strict";

/* ── Loader ─────────────────────────────────────────────────── */
(function () {
  const loader = document.getElementById("loader");
  if (!loader) return;

  // Hold 1.2s then fade out 0.4s
  setTimeout(() => {
    loader.classList.add("fade-out");
    loader.addEventListener("transitionend", () => {
      loader.style.display = "none";
    }, { once: true });
  }, 1200);
})();

/* ── Nav wordmark: expand to full name on desktop ────────────── */
(function () {
  const logoText = document.querySelector(".nav-logo-text");
  if (!logoText) return;
  const fullName = logoText.dataset.full || "LA PALAPA DE DON MARGARO";
  const shortName = "LA PALAPA";

  function updateLogoText() {
    if (window.innerWidth >= 1024) {
      logoText.textContent = fullName;
    } else {
      logoText.textContent = shortName;
    }
  }

  updateLogoText();
  window.addEventListener("resize", updateLogoText, { passive: true });
})();

/* ── Nav scroll behavior ─────────────────────────────────────── */
(function () {
  const nav = document.querySelector("nav.site-nav");
  if (!nav) return;

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();
})();

/* ── Hamburger drawer ────────────────────────────────────────── */
(function () {
  const btn = document.querySelector(".nav-hamburger");
  const drawer = document.getElementById("nav-drawer");
  if (!btn || !drawer) return;

  btn.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
    btn.setAttribute(
      "aria-label",
      isOpen ? "Cerrar men&#250;" : "Abrir men&#250;"
    );
  });

  // Close drawer on any link click
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();

/* ── Hero scroll cue (hide on first scroll) ──────────────────── */
(function () {
  const cue = document.querySelector(".hero-scroll-cue");
  if (!cue) return;

  function hideCue() {
    if (window.scrollY > 20) {
      cue.style.opacity = "0";
      window.removeEventListener("scroll", hideCue);
    }
  }
  window.addEventListener("scroll", hideCue, { passive: true });
})();

/* ── Hero parallax (JS, not background-attachment:fixed) ──────── */
(function () {
  const heroImg = document.querySelector(".hero-img");
  if (!heroImg) return;

  // Only run on non-reduced-motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    // 0.88x rate: image moves up at 12% of page scroll speed
    heroImg.style.transform = `translateY(${scrollY * 0.12}px)`;
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
})();

/* ── Scroll-reveal (IntersectionObserver) ────────────────────── */
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
})();
