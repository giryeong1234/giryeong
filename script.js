(function () {
  "use strict";

  // 1. Theme Toggle
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("gp-theme", next);
      } catch (e) {}
    });
  }

  // 2. Mobile Navigation Drawer
  const menuToggle = document.getElementById("menu-toggle");
  const siteNav = document.getElementById("site-nav");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));

  function closeMenu() {
    if (!siteNav || !menuToggle) return;
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = siteNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  // 3. Experience Category Filter
  const filterButtons = Array.from(document.querySelectorAll(".filter-btn"));
  const expCards = Array.from(document.querySelectorAll("#experience-list .exp-card"));

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach(function (other) {
        const active = other === btn;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-selected", String(active));
      });

      expCards.forEach(function (card) {
        const category = card.getAttribute("data-category");
        const shouldShow = filter === "all" || category === filter;
        card.classList.toggle("is-hidden", !shouldShow);
        if (shouldShow) {
          card.classList.add("is-visible");
        }
      });
    });
  });

  // 4. Scroll Reveal
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // 5. Active Navigation Scrollspy
  const sections = navLinks
    .map(function (link) {
      const id = link.getAttribute("href");
      return id && id.startsWith("#") ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 0) {
    const spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const id = "#" + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach(function (sec) {
      spyObserver.observe(sec);
    });
  }

  // 6. Dynamic Year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(Math.max(2026, new Date().getFullYear()));
  }

  // 7. Scroll Progress Bar
  const progressBar = document.getElementById("scroll-progress");
  if (progressBar) {
    const updateProgress = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      progressBar.style.width = pct.toFixed(1) + "%";
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  // 8. Print / Save CV
  const printBtn = document.getElementById("print-cv");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  // 9. Bilingual EN / KO Language Toggle
  const langToggle = document.getElementById("lang-toggle");
  const i18n = {
    en: {
      "nav.about": "About",
      "nav.experience": "Experience",
      "nav.projects": "Projects",
      "nav.leadership": "Leadership",
      "nav.education": "Education",
      "nav.highlights": "Highlights",
      "hero.status": "Undergraduate Research Fellow · Monash University",
      "hero.degree": "Bachelor of Nutrition Science",
      "hero.location": "Melbourne, Australia",
      "hero.lead":
        "Second-year Bachelor of Nutrition Science student at <strong>Monash University</strong> with experience across nutrition education, food-service operations, and student leadership. Passionate about <em>evidence-based practice</em>, chrononutrition research, and building healthier student communities.",
      "hero.linkedin": "LinkedIn Profile",
      "hero.print": "Print / Save CV",
      "hero.explore": "Explore Experience",
      "proj.eyebrow": "03 · Featured Projects",
      "proj.title": "Community initiatives turning nutrition and education into action.",
      "lead.eyebrow": "04 · Leadership & Volunteering",
      "lead.title": "Serving the Monash student and nutrition community."
    },
    ko: {
      "nav.about": "소개",
      "nav.experience": "경력",
      "nav.projects": "프로젝트",
      "nav.leadership": "리더십",
      "nav.education": "학력",
      "nav.highlights": "하이라이트",
      "hero.status": "학부 연구 펠로우 · 모나쉬 대학교 (Monash University)",
      "hero.degree": "영양학 학사 (Bachelor of Nutrition Science)",
      "hero.location": "호주 멜버른",
      "hero.lead":
        "<strong>모나쉬 대학교(Monash University)</strong> 영양학 학사 2학년으로, 영양 교육, F&amp;B 운영 및 학생 리더십 경험을 보유하고 있습니다. <em>근거 기반 영양학</em>, 시간영양학(Chrononutrition) 연구, 그리고 건강한 학생 커뮤니티 구축에 열정을 가지고 있습니다.",
      "hero.linkedin": "LinkedIn 프로필",
      "hero.print": "CV 인쇄 / PDF 저장",
      "hero.explore": "경력 살펴보기",
      "proj.eyebrow": "03 · 주요 프로젝트",
      "proj.title": "영양학과 교육을 실천으로 연결하는 커뮤니티 프로젝트.",
      "lead.eyebrow": "04 · 리더십 및 봉사활동",
      "lead.title": "모나쉬 학생 및 영양학 커뮤니티를 위한 활동."
    }
  };

  function applyLang(lang) {
    const dict = i18n[lang] || i18n.en;
    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });
    if (langToggle) {
      langToggle.textContent = lang === "ko" ? "EN" : "한국어";
    }
    try {
      localStorage.setItem("gp-lang", lang);
    } catch (e) {}
  }

  if (langToggle) {
    let savedLang = "en";
    try {
      savedLang = localStorage.getItem("gp-lang") || "en";
    } catch (e) {}
    if (savedLang === "ko") applyLang("ko");

    langToggle.addEventListener("click", function () {
      const current = document.documentElement.getAttribute("lang") === "ko" ? "ko" : "en";
      applyLang(current === "ko" ? "en" : "ko");
    });
  }
})();
