// Page behaviour: full-screen menu (focus trap, Esc, focus return), active anchor in the nav,
// phone contact bar after the hero call button leaves the viewport, direction accordions on phones.
// Everything here is an enhancement: without scripts the content stays visible and anchors still work.

const menu = document.getElementById("menu");
const openers = document.querySelectorAll<HTMLAnchorElement>("[data-menu-open]");
let lastFocus: HTMLElement | null = null;

function focusables(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'));
}
function openMenu(trigger: HTMLElement) {
  if (!menu) return;
  lastFocus = trigger;
  menu.hidden = false;
  document.documentElement.style.overflow = "hidden";
  openers.forEach((o) => o.setAttribute("aria-expanded", "true"));
  focusables(menu)[0]?.focus();
}
function closeMenu(restore = true) {
  if (!menu || menu.hidden) return;
  menu.hidden = true;
  document.documentElement.style.overflow = "";
  openers.forEach((o) => o.setAttribute("aria-expanded", "false"));
  if (restore) lastFocus?.focus();
}
openers.forEach((o) => {
  o.setAttribute("role", "button");
  o.addEventListener("click", (e) => { e.preventDefault(); openMenu(o); });
});
menu?.querySelector("[data-menu-close]")?.addEventListener("click", () => closeMenu());
menu?.querySelectorAll("[data-menu-link]").forEach((a) => a.addEventListener("click", () => closeMenu(false)));
menu?.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { closeMenu(); return; }
  if (e.key !== "Tab") return;
  const f = focusables(menu);
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
});
window.matchMedia("(min-width: 1280px)").addEventListener("change", (m) => { if (m.matches) closeMenu(false); });

// Active section in the desktop nav (underline = the waterline colour).
const links = new Map<string, HTMLAnchorElement>();
document.querySelectorAll<HTMLAnchorElement>(".site-nav a[href^='#']").forEach((a) => links.set(a.hash.slice(1), a));
if ("IntersectionObserver" in window && links.size) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((a, id) => a.classList.toggle("is-active", id === e.target.id));
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((_a, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  const hero = document.getElementById("hero");
  if (hero) {
    const clear = new IntersectionObserver((es) => { if (es[0]?.isIntersecting) links.forEach((a) => a.classList.remove("is-active")); }, { rootMargin: "-45% 0px -50% 0px" });
    clear.observe(hero);
  }
}

// Phone contact bar: appears when the hero call button is out of view.
const bar = document.querySelector<HTMLElement>("[data-contact-bar]");
const heroCall = document.querySelector<HTMLElement>("[data-hero-call]");
if (bar && heroCall && "IntersectionObserver" in window) {
  new IntersectionObserver((es) => {
    const e = es[0];
    if (!e) return;
    const above = e.boundingClientRect.top < 0;
    bar.classList.toggle("is-shown", !e.isIntersecting && above);
  }).observe(heroCall);
} else bar?.classList.add("is-shown");

// Direction accordions (phones only; on wider screens everything is open).
document.querySelectorAll<HTMLButtonElement>("[data-dir-toggle]").forEach((btn) => {
  const dir = btn.closest<HTMLElement>(".dir");
  btn.hidden = false;
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    dir?.classList.toggle("is-open", open);
    const label = btn.querySelector("[data-dir-toggle-label]");
    if (label) label.textContent = open ? "Згорнути" : "Послуги і фото об'єкта";
  });
});
