const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = Array.from(document.querySelectorAll('[data-section]'));
const consoleLines = document.querySelector('[data-console-lines]');

const closeMenu = () => {
  document.body.classList.remove('nav-open');
  navMenu?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
};

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navMenu?.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('nav-open', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const activeId = entry.target.getAttribute('id');
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeId}`;
      link.classList.toggle('is-active', isActive);
    });
  });
}, {
  rootMargin: '-35% 0px -55% 0px',
  threshold: 0
});

sections.forEach((section) => observer.observe(section));

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (consoleLines && !reduceMotion) {
  const messages = [
    'syncing notes: web foundations',
    'mapping concept: human + AI workflow',
    'queued task: ship a cleaner interface',
    'checking output: accessible by default'
  ];

  let index = 0;
  window.setInterval(() => {
    const line = document.createElement('p');
    line.innerHTML = `<span>&gt;</span> ${messages[index % messages.length]}`;
    consoleLines.appendChild(line);

    while (consoleLines.children.length > 5) {
      consoleLines.removeChild(consoleLines.firstElementChild);
    }

    index += 1;
  }, 3200);
}
