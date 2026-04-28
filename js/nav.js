/**
 * EllaDekkerSeries.com — Shared Navigation
 * Include this script in every page. It injects the nav bar,
 * highlights the active page, and handles mobile menu toggle.
 *
 * Usage in any HTML file:
 *   <script src="js/nav.js"></script>  (or ../js/nav.js from a subfolder)
 */

(function () {

  const PAGES = [
    { href: 'index.html',       label: 'Home' },
    { href: 'characters.html',  label: 'Characters' },
    { href: 'districts.html',   label: 'The Intrepid' },
    { href: 'settlements.html', label: 'First Reach' },
    { href: 'about.html',        label: 'About' },
    { href: 'beta.html',        label: 'Beta Readers', cta: true },
  ];

  // ── Detect current page ──
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';

  // ── Build nav links ──
  function buildLinks(mobile) {
    return PAGES.map(p => {
      const isActive = (currentFile === p.href) || (currentFile === '' && p.href === 'index.html');
      const cls = [
        isActive ? 'active' : '',
        p.cta && !mobile ? 'nav-cta' : '',
      ].filter(Boolean).join(' ');
      return `<li><a href="${p.href}"${cls ? ` class="${cls}"` : ''}>${p.label}</a></li>`;
    }).join('');
  }

  // ── Inject nav ──
  const nav = document.createElement('nav');
  nav.id = 'site-nav';
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Site navigation');
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-logo" aria-label="Ella Dekker Series home">
        Ella Dekker
      </a>
      <ul class="nav-links" role="list">
        ${buildLinks(false)}
      </ul>
      <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" aria-controls="nav-mobile">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  `;
  document.body.insertBefore(nav, document.body.firstChild);

  // ── Inject mobile menu ──
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'nav-mobile';
  mobileMenu.className = 'nav-mobile';
  mobileMenu.setAttribute('role', 'menu');
  mobileMenu.innerHTML = `<ul style="list-style:none;display:flex;flex-direction:column;gap:4px">${buildLinks(true)}</ul>`;
  document.body.insertBefore(mobileMenu, nav.nextSibling);

  // ── Toggle handler ──
  const toggle = nav.querySelector('.nav-toggle');
  toggle.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger to X
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu on outside click
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      const spans = toggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // ── Inject footer ──
  const footer = document.createElement('footer');
  footer.id = 'site-footer';
  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-logo">Ella Dekker</div>
      <ul class="footer-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="characters.html">Characters</a></li>
        <li><a href="districts.html">The Intrepid</a></li>
        <li><a href="settlements.html">First Reach</a></li>
        <li><a href="beta.html">Beta Readers</a></li>
      </ul>
      <p class="footer-copy">EllaDekkerSeries.com · World Bible &amp; Series Site · All content &copy; the author</p>
    </div>
  `;
  document.body.appendChild(footer);

})();
