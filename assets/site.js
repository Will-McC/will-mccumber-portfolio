(() => {
  const $ = (id) => document.getElementById(id);

  // Year
  const y = $("y");
  if (y) y.textContent = String(new Date().getFullYear());

  // Mobile nav
  const header = $("siteHeader");
  const navBtn = $("navToggle");

  const closeNav = () => {
    if (!header || !navBtn) return;
    header.classList.remove("open");
    navBtn.setAttribute("aria-expanded", "false");
    navBtn.textContent = "\u2630";
  };

  if (header && navBtn) {
    navBtn.addEventListener("click", () => {
      const open = !header.classList.contains("open");
      header.classList.toggle("open", open);
      navBtn.setAttribute("aria-expanded", String(open));
      navBtn.textContent = open ? "\u2715" : "\u2630";
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    // Close after clicking any nav link
    header.querySelectorAll('a[href^="#"], a[href^="index.html#"], a[href^="../index.html#"]').forEach((a) => {
      a.addEventListener("click", () => closeNav());
    });
  }

  // Dark mode toggle
  const themeBtn = $("themeToggle");
  if (themeBtn) {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    if (stored === "dark") root.classList.add("dark");
    else if (stored === "light") root.classList.add("light");

    const update = () => {
      const isDark = root.classList.contains("dark") ||
        (!root.classList.contains("light") && matchMedia("(prefers-color-scheme:dark)").matches);
      themeBtn.textContent = isDark ? "\u2600\uFE0F" : "\uD83C\uDF19";
      themeBtn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    };
    update();

    themeBtn.addEventListener("click", () => {
      const isDark = root.classList.contains("dark") ||
        (!root.classList.contains("light") && matchMedia("(prefers-color-scheme:dark)").matches);
      root.classList.toggle("dark", !isDark);
      root.classList.toggle("light", isDark);
      localStorage.setItem("theme", isDark ? "light" : "dark");
      update();
    });

    matchMedia("(prefers-color-scheme:dark)").addEventListener("change", update);
  }

  // Back to top
  const topBtn = $("topBtn");
  if (topBtn) {
    window.addEventListener("scroll", () => {
      topBtn.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
