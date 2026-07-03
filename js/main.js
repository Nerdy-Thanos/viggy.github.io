(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  /* ---- theme toggle ---- */
  var toggle = document.getElementById('theme-toggle');

  function syncToggleLabel() {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    toggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  }

  toggle.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
    syncToggleLabel();
  });
  syncToggleLabel();

  /* ---- active nav link ---- */
  var sections = Array.prototype.slice.call(
    document.querySelectorAll('main section[id]')
  );
  var navLinks = {};
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    navLinks[a.getAttribute('href').slice(1)] = a;
  });

  var current = null;
  var navObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        if (!navLinks[id] || id === current) return;
        if (current && navLinks[current]) navLinks[current].classList.remove('active');
        navLinks[id].classList.add('active');
        current = id;
      });
    },
    { rootMargin: '-25% 0px -65% 0px' }
  );
  sections.forEach(function (s) { navObserver.observe(s); });

  /* ---- reveal on scroll ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ---- project filters ---- */
  var chips = Array.prototype.slice.call(document.querySelectorAll('.filter-chip'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('.project'));
  var emptyNote = document.querySelector('.filter-empty');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) {
        var isActive = c === chip;
        c.classList.toggle('active', isActive);
        c.setAttribute('aria-pressed', String(isActive));
      });
      var filter = chip.dataset.filter;
      var shown = 0;
      cards.forEach(function (card) {
        var match =
          filter === 'all' ||
          card.dataset.tags.split(' ').indexOf(filter) !== -1;
        card.hidden = !match;
        if (match) shown += 1;
      });
      emptyNote.hidden = shown > 0;
    });
  });

  /* ---- copy email ---- */
  var copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    var copyTimer = null;
    copyBtn.addEventListener('click', function () {
      var email = copyBtn.dataset.email;
      var done = function () {
        copyBtn.textContent = 'Copied';
        copyBtn.classList.add('copied');
        clearTimeout(copyTimer);
        copyTimer = setTimeout(function () {
          copyBtn.textContent = 'Copy address';
          copyBtn.classList.remove('copied');
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(done, function () {
          window.prompt('Copy the address:', email);
        });
      } else {
        window.prompt('Copy the address:', email);
      }
    });
  }
})();
