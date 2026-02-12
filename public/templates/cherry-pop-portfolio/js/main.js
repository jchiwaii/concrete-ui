const PROJECT_DATA = {
  lumen: {
    title: "Lumen Dashboard",
    summary:
      "A real-time analytics workspace for growth teams to monitor activation, retention, and revenue in one place.",
    role: "Lead Frontend Engineer",
    timeline: "12 weeks",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    challenge:
      "The legacy dashboard mixed six disconnected tools with slow refresh cycles and inconsistent definitions across teams.",
    solution:
      "I rebuilt the frontend architecture around typed data contracts and modular visualization blocks while introducing a shared metric glossary.",
    impact:
      "Decision latency dropped from days to hours, and daily active internal users grew by 52% in the first quarter.",
    hero: "images/project-lumen.svg",
    gallery: [
      "images/project-lumen.svg",
      "images/project-zen.svg",
      "images/project-nova.svg",
      "images/project-orbit.svg"
    ]
  },
  bloom: {
    title: "Bloom Commerce",
    summary:
      "A mobile-first e-commerce experience focused on fast checkout and delightful browsing patterns.",
    role: "Senior Software Engineer",
    timeline: "10 weeks",
    stack: ["Next.js", "GraphQL", "Redis", "Playwright"],
    challenge:
      "Cart abandonment was high on smaller devices and release quality dropped during peak campaigns.",
    solution:
      "I introduced a resilient checkout state machine, image delivery optimization, and a CI quality gate with visual and E2E tests.",
    impact:
      "Checkout completion improved 18%, while production incidents were reduced by 44% over two release cycles.",
    hero: "images/project-bloom.svg",
    gallery: [
      "images/project-bloom.svg",
      "images/project-zen.svg",
      "images/project-orbit.svg",
      "images/project-nova.svg"
    ]
  },
  orbit: {
    title: "Orbit Care Portal",
    summary:
      "A scheduling and care coordination portal designed for accessibility and complex role permissions.",
    role: "Software Engineer",
    timeline: "14 weeks",
    stack: ["Vue", "TypeScript", "Node.js", "AWS"],
    challenge:
      "Care teams needed a single source of truth for appointments, notes, and escalation workflows.",
    solution:
      "I built reusable workflow primitives, audit-ready event tracking, and integrated role-aware action states.",
    impact:
      "Support tickets dropped by 33% and average task completion time improved by 27%.",
    hero: "images/project-orbit.svg",
    gallery: [
      "images/project-orbit.svg",
      "images/project-lumen.svg",
      "images/project-bloom.svg",
      "images/project-zen.svg"
    ]
  },
  nova: {
    title: "Nova Design System",
    summary:
      "A neobrutalist-inspired component platform used across product, marketing, and internal tooling teams.",
    role: "Frontend Architect",
    timeline: "6 weeks",
    stack: ["React", "Storybook", "TypeScript", "Figma Tokens"],
    challenge:
      "Different squads shipped duplicate UI with conflicting behavior and accessibility gaps.",
    solution:
      "I created tokenized theming, composable primitives, and practical docs with copy-paste patterns for engineers.",
    impact:
      "UI implementation time decreased by 40% and visual consistency issues dropped by 68%.",
    hero: "images/project-nova.svg",
    gallery: [
      "images/project-nova.svg",
      "images/project-lumen.svg",
      "images/project-bloom.svg",
      "images/project-orbit.svg"
    ]
  },
  zen: {
    title: "Zen Dev Platform",
    summary:
      "An internal deployment and quality control console to speed up shipping across engineering teams.",
    role: "Full-Stack Engineer",
    timeline: "8 weeks",
    stack: ["Node.js", "PostgreSQL", "Docker", "GitHub Actions"],
    challenge:
      "Release coordination happened manually in chat threads with inconsistent rollback procedures.",
    solution:
      "I built a release orchestration layer with environment snapshots and one-click rollback flows.",
    impact:
      "Mean time to recovery fell by 57% and release confidence improved across 5 product squads.",
    hero: "images/project-zen.svg",
    gallery: [
      "images/project-zen.svg",
      "images/project-lumen.svg",
      "images/project-orbit.svg",
      "images/project-bloom.svg"
    ]
  }
};

const currentPath = window.location.pathname;

function setActiveLinks() {
  const allLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
  allLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    if (!href) return;

    const normalized = href.replace(/\/$/, "");
    let matches = currentPath.endsWith(normalized);

    if (!matches && currentPath.endsWith("/project.html") && normalized.endsWith("projects.html")) {
      matches = true;
    }

    link.classList.toggle("active", matches);
  });
}

function initMobileMenu() {
  const button = document.querySelector("[data-menu-button]");
  const menu = document.querySelector("[data-mobile-nav]");
  if (!button || !menu) return;

  button.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function initCounters() {
  const counters = Array.from(document.querySelectorAll("[data-count]"));
  if (counters.length === 0) return;

  const animate = (element) => {
    const end = Number(element.getAttribute("data-count"));
    if (Number.isNaN(end)) return;

    const startTime = performance.now();
    const duration = 950;

    const update = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      element.textContent = Math.floor(end * progress).toString();
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = end.toString();
      }
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initProjectFilters() {
  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const cards = Array.from(document.querySelectorAll("[data-project-card]"));
  if (filterButtons.length === 0 || cards.length === 0) return;

  const applyFilter = (filter) => {
    cards.forEach((card) => {
      const category = card.getAttribute("data-category");
      const show = filter === "all" || category === filter;
      card.style.display = show ? "block" : "none";
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter") || "all";
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      applyFilter(filter);
    });
  });
}

function initCaseStudyPage() {
  const shell = document.querySelector("[data-case-page]");
  if (!shell) return;

  const params = new URLSearchParams(window.location.search);
  const rawId = params.get("id") || "lumen";
  const project = PROJECT_DATA[rawId] || PROJECT_DATA.lumen;

  const title = document.querySelector("[data-case-title]");
  const summary = document.querySelector("[data-case-summary]");
  const role = document.querySelector("[data-case-role]");
  const timeline = document.querySelector("[data-case-timeline]");
  const stack = document.querySelector("[data-case-stack]");
  const challenge = document.querySelector("[data-case-challenge]");
  const solution = document.querySelector("[data-case-solution]");
  const impact = document.querySelector("[data-case-impact]");
  const hero = document.querySelector("[data-case-hero]");
  const gallery = document.querySelector("[data-case-gallery]");

  if (title) title.textContent = project.title;
  if (summary) summary.textContent = project.summary;
  if (role) role.textContent = project.role;
  if (timeline) timeline.textContent = project.timeline;
  if (stack) stack.textContent = project.stack.join(" · ");
  if (challenge) challenge.textContent = project.challenge;
  if (solution) solution.textContent = project.solution;
  if (impact) impact.textContent = project.impact;
  if (hero) {
    hero.setAttribute("src", project.hero);
    hero.setAttribute("alt", `${project.title} preview`);
  }

  if (gallery) {
    gallery.innerHTML = "";
    project.gallery.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `${project.title} detail ${index + 1}`;
      gallery.appendChild(img);
    });
  }

  document.title = `${project.title} | Cherry Pop Portfolio`;
}

function initForms() {
  const forms = Array.from(document.querySelectorAll("[data-demo-form]"));
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const note = form.querySelector("[data-form-note]");
      form.reset();
      if (note) {
        note.textContent = "Thanks! Your message has been staged in demo mode.";
      }
    });
  });
}

function initYear() {
  const yearTargets = Array.from(document.querySelectorAll("[data-year]"));
  const year = new Date().getFullYear().toString();
  yearTargets.forEach((target) => {
    target.textContent = year;
  });
}

function initSmoothAnchors() {
  const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

setActiveLinks();
initMobileMenu();
initCounters();
initProjectFilters();
initCaseStudyPage();
initForms();
initYear();
initSmoothAnchors();
