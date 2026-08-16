(function() {
      const root = document.documentElement;
      const themeButton = document.getElementById('themeButton');
      const themePanel = document.getElementById('themePanel');
      const menuButton = document.getElementById('menuButton');
      const mobileMenu = document.getElementById('mobileMenu');
      const contactModal = document.getElementById('contactModal');
      const closeModal = document.getElementById('closeModal');

      function safeGet(key, fallback) {
        try { return localStorage.getItem(key) || fallback; }
        catch (e) { return fallback; }
      }

      function safeSet(key, value) {
        try { localStorage.setItem(key, value); } catch (e) {}
      }

      function resolveSystemMode() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      function applyMode(mode) {
        const resolved = mode === 'system' ? resolveSystemMode() : mode;
        root.setAttribute('data-mode', resolved);
        root.setAttribute('data-mode-choice', mode);
        safeSet('polaris-mode', mode);
        refreshActiveChips();
      }

      function applyAccent(accent) {
        root.setAttribute('data-accent', accent);
        safeSet('polaris-accent', accent);
        refreshActiveChips();
      }

      function refreshActiveChips() {
        const modeChoice = root.getAttribute('data-mode-choice') || 'system';
        const accentChoice = root.getAttribute('data-accent') || 'ocean';

        document.querySelectorAll('[data-mode]').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.mode === modeChoice);
        });

        document.querySelectorAll('[data-accent]').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.accent === accentChoice);
        });
      }

      const savedMode = safeGet('polaris-mode', 'system');
      const savedAccent = safeGet('polaris-accent', 'ocean');
      applyMode(savedMode);
      applyAccent(savedAccent);

      if (window.matchMedia) {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const syncSystem = () => {
          if ((root.getAttribute('data-mode-choice') || 'system') === 'system') {
            root.setAttribute('data-mode', resolveSystemMode());
          }
        };
        if (media.addEventListener) media.addEventListener('change', syncSystem);
        else if (media.addListener) media.addListener(syncSystem);
      }

      themeButton.addEventListener('click', function(event) {
        event.stopPropagation();
        const open = themePanel.classList.toggle('open');
        themePanel.setAttribute('aria-hidden', String(!open));
      });

      themePanel.addEventListener('click', function(event) {
        event.stopPropagation();
      });

      document.querySelectorAll('[data-mode]').forEach(btn => {
        btn.addEventListener('click', () => applyMode(btn.dataset.mode));
      });

      document.querySelectorAll('[data-accent]').forEach(btn => {
        btn.addEventListener('click', () => applyAccent(btn.dataset.accent));
      });

      menuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('open');
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove('open'));
      });


      const legalModal = document.getElementById('legalModal');
      const legalClose = document.getElementById('legalClose');
      const legalCardBody = document.getElementById('legalCardBody');

      function openLegal(event) {
        if (event) event.preventDefault();
        const targetId = event && event.currentTarget ? event.currentTarget.getAttribute('data-legal-target') : 'legal-information';
        legalModal.classList.add('open');
        legalModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
          const target = document.getElementById(targetId || 'legal-information');
          if (target) {
            legalCardBody.scrollTop = Math.max(0, target.offsetTop - 12);
          } else {
            legalCardBody.scrollTop = 0;
          }
        });
      }

      function closeLegal() {
        legalModal.classList.remove('open');
        legalModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      document.querySelectorAll('.legal-trigger').forEach(el => {
        el.addEventListener('click', openLegal);
      });

      legalClose.addEventListener('click', closeLegal);

      legalModal.addEventListener('click', function(event) {
        if (event.target === legalModal) closeLegal();
      });

      function openContact(event) {
        if (event) event.preventDefault();
        contactModal.classList.add('open');
        contactModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }

      function closeContact() {
        contactModal.classList.remove('open');
        contactModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      document.querySelectorAll('.contact-trigger').forEach(el => {
        el.addEventListener('click', openContact);
      });

      closeModal.addEventListener('click', closeContact);

      contactModal.addEventListener('click', function(event) {
        if (event.target === contactModal) closeContact();
      });

      document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
          closeContact();
          closeLegal();
          themePanel.classList.remove('open');
          themePanel.setAttribute('aria-hidden', 'true');
          mobileMenu.classList.remove('open');
        }
      });

      document.addEventListener('click', function() {
        themePanel.classList.remove('open');
        themePanel.setAttribute('aria-hidden', 'true');
      });
    })();
