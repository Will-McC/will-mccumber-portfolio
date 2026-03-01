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
    navBtn.textContent = "☰";
  };

  if (header && navBtn) {
    navBtn.addEventListener("click", () => {
      const open = !header.classList.contains("open");
      header.classList.toggle("open", open);
      navBtn.setAttribute("aria-expanded", String(open));
      navBtn.textContent = open ? "✕" : "☰";
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
})();
