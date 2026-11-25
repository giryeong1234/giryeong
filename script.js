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
  const expEntries = Array.from(document.querySelectorAll("#experience-list .exp-entry"));

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach(function (other) {
        const active = other === btn;
        other.classList.toggle("is-active", active);
        other.setAttribute("aria-selected", String(active));
      });

      expEntries.forEach(function (entry) {
        const category = entry.getAttribute("data-category");
        const shouldShow = filter === "all" || category === filter;
        entry.classList.toggle("is-hidden", !shouldShow);
        if (shouldShow) {
          entry.classList.add("is-visible");
        }
      });
    });
  });

  // 4. Subtle Scroll Reveal
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
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
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
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
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

  // 7. Scroll Progress Hairline
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

  // 9. Bilingual EN / KO Switcher
  const langToggle = document.getElementById("lang-toggle");
  const i18n = {
    en: {
      "nav.experience": "Experience",
      "nav.leadership": "Leadership",
      "nav.projects": "Projects",
      "nav.about": "Profile",
      "nav.education": "Education",
      "nav.highlights": "Highlights",
      "nav.connect": "Connect",
      "hero.status": "Undergraduate Research Fellow · Monash University",
      "hero.degree": "Bachelor of Nutrition Science",
      "hero.location": "Melbourne, Australia",
      "hero.lead":
        "Nutrition Science undergraduate and Summer Vacation Research Scholar at <strong>Monash University</strong>, combining <em>chrononutrition research</em>, bilingual Korean&ndash;English interpreting, and hands-on operational leadership across Australia, South Korea, and Cambodia.",
      "hero.linkedin": "LinkedIn",
      "hero.print": "Print / Save CV",
      "dossier.eyebrow": "Current Dossier",
      "dossier.research": "Research",
      "dossier.institution": "Institution",
      "dossier.governance": "Governance",
      "dossier.languages": "Languages",
      "metric.scholar": "Summer Vacation Research Fellowship",
      "metric.countries": "Work experience across AU, KR & KH",
      "metric.bilingual": "Bilingual & KOTRA B2B Interpreter",
      "metric.roles": "SEEC, MNDS Treasurer, AIS & UMAC",
      "exp.eyebrow": "Experience",
      "exp.title": "Research, B2B interpreting, and operational leadership.",
      "exp.filter.all": "All Roles",
      "exp.filter.research": "Research & Interpreting",
      "exp.filter.ops": "Hospitality & Operations",
      "lead.eyebrow": "Leadership & Governance",
      "lead.title": "Representing students and stewarding the Monash nutrition community.",
      "proj.eyebrow": "Selected Projects",
      "proj.title": "Translating nutrition science, web tools, and education into practice.",
      "about.eyebrow": "Profile & Focus",
      "about.title": "Bridging clinical nutrition science, food literacy, and operational discipline.",
      "cap.skills": "Core Competencies",
      "cap.languages": "Languages",
      "edu.eyebrow": "Education & Credentials",
      "edu.title": "Academic foundation and continuous professional learning.",
      "high.eyebrow": "Recent Dispatches",
      "high.title": "Stories and milestones from campus & community.",
      "contact.eyebrow": "Correspondence",
      "contact.title": "Open to nutrition research collaborations, community initiatives, and graduate opportunities.",
      "contact.desc":
        "Whether you’re researching chrononutrition, developing food literacy programs, or connecting across Monash and Melbourne’s nutrition community, I’d welcome a conversation.",
      "contact.linkedin": "Message on LinkedIn",
      "contact.github": "GitHub Profile"
    },
    ko: {
      "nav.experience": "경력",
      "nav.leadership": "리더십",
      "nav.projects": "프로젝트",
      "nav.about": "프로필",
      "nav.education": "학력",
      "nav.highlights": "소식",
      "nav.connect": "연락하기",
      "hero.status": "학부 연구 펠로우 · 모나쉬 대학교 (Monash University)",
      "hero.degree": "영양학 학사 (Bachelor of Nutrition Science)",
      "hero.location": "호주 멜버른",
      "hero.lead":
        "<strong>모나쉬 대학교(Monash University)</strong> 영양학 학사 및 하계 연구 장학생으로, <em>시간영양학(Chrononutrition) 연구</em>, 한영 B2B 통역, 그리고 호주·한국·캄보디아에서의 현장 운영 리더십 경험을 결합해 나가고 있습니다.",
      "hero.linkedin": "LinkedIn",
      "hero.print": "CV 인쇄 / PDF 저장",
      "dossier.eyebrow": "핵심 프로필 요약",
      "dossier.research": "연구",
      "dossier.institution": "소속",
      "dossier.governance": "교내 활동",
      "dossier.languages": "언어",
      "metric.scholar": "하계 연구 장학 펠로우십 (Monash)",
      "metric.countries": "호주 · 한국 · 캄보디아 실무 경험",
      "metric.bilingual": "한영 이중언어 및 KOTRA B2B 통역",
      "metric.roles": "SEEC · MNDS 재무 · AIS · UMAC",
      "exp.eyebrow": "주요 경력",
      "exp.title": "연구, B2B 통역, 그리고 현장 운영 리더십.",
      "exp.filter.all": "전체 경력",
      "exp.filter.research": "연구 & 통역",
      "exp.filter.ops": "F&B & 운영",
      "lead.eyebrow": "리더십 및 거버넌스",
      "lead.title": "학생 대표이자 모나쉬 영양학 커뮤니티의 실무 리더.",
      "proj.eyebrow": "주요 프로젝트",
      "proj.title": "영양학 지식, 웹 플랫폼, 그리고 교육을 실천으로 연결.",
      "about.eyebrow": "프로필 및 전문 분야",
      "about.title": "임상 영양학, 식생활 문해력, 그리고 운영 역량의 결합.",
      "cap.skills": "핵심 역량",
      "cap.languages": "구사 언어",
      "edu.eyebrow": "학력 및 자격",
      "edu.title": "학문적 기반과 지속적인 전문 역량 개발.",
      "high.eyebrow": "최근 소식",
      "high.title": "캠퍼스와 커뮤니티에서의 주요 기록.",
      "contact.eyebrow": "연락하기",
      "contact.title": "영양학 연구 협업, 커뮤니티 프로젝트 및 졸업 후 기회에 열려 있습니다.",
      "contact.desc":
        "시간영양학 연구, 식생활 문해력 프로그램, 또는 모나쉬·멜버른 영양학 커뮤니티 협업에 관심이 있으시다면 언제든 편하게 연락해 주세요.",
      "contact.linkedin": "LinkedIn 메시지 보내기",
      "contact.github": "GitHub 프로필"
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
