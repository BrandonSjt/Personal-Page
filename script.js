const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sections = Array.from(document.querySelectorAll('[data-section]'));
const consoleLines = document.querySelector('[data-console-lines]');
const repoList = document.querySelector('[data-repo-list]');
const githubProfileLink = document.querySelector('[data-github-profile]');

const GITHUB_USERNAME = 'your-username';

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
const escapeHTML = (value = '') => String(value).replace(/[&<>"]/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
}[char]));

const renderRepoMessage = (title, message) => {
  if (!repoList) return;

  repoList.innerHTML = `
    <article class="repo-card repo-card-empty">
      <span class="repo-status">Setup needed</span>
      <h3>${escapeHTML(title)}</h3>
      <p>${escapeHTML(message)}</p>
    </article>
  `;
};

const renderRepositories = (repositories) => {
  if (!repoList) return;

  repoList.innerHTML = repositories.map((repo) => {
    const description = repo.description || 'No description yet.';
    const language = repo.language || 'Code';

    return `
      <article class="repo-card">
        <span class="repo-status">Updated ${new Date(repo.updated_at).getFullYear()}</span>
        <h3>${escapeHTML(repo.name)}</h3>
        <p>${escapeHTML(description)}</p>
        <div class="repo-meta" aria-label="Repository metadata">
          <span>${escapeHTML(language)}</span>
          <span>${repo.stargazers_count} stars</span>
          <span>${repo.forks_count} forks</span>
        </div>
        <a class="repo-link" href="${repo.html_url}" target="_blank" rel="noreferrer">View repository</a>
      </article>
    `;
  }).join('');
};

const loadGitHubRepositories = async () => {
  if (!repoList) return;

  const username = GITHUB_USERNAME.trim();
  const isConfigured = username && username !== 'your-username';

  if (!isConfigured) {
    renderRepoMessage('Add your GitHub username', 'Update GITHUB_USERNAME in script.js to show public repositories here.');
    return;
  }

  if (githubProfileLink) {
    githubProfileLink.href = `https://github.com/${encodeURIComponent(username)}`;
  }

  try {
    repoList.setAttribute('aria-busy', 'true');
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=12`);

    if (!response.ok) {
      throw new Error('GitHub request failed');
    }

    const repositories = await response.json();
    const visibleRepos = repositories
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6);

    if (visibleRepos.length === 0) {
      renderRepoMessage('No public repositories found', 'Public repositories will appear here after they are available on GitHub.');
      return;
    }

    renderRepositories(visibleRepos);
  } catch (error) {
    renderRepoMessage('GitHub repos unavailable', 'Check the GitHub username in script.js or try again when the browser has internet access.');
  } finally {
    repoList.removeAttribute('aria-busy');
  }
};

loadGitHubRepositories();
