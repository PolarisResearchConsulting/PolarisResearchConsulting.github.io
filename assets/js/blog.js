
(function () {
  const posts = Array.isArray(window.POLARIS_POSTS) ? window.POLARIS_POSTS : [];
  const grid = document.getElementById('articleGrid');
  const search = document.getElementById('articleSearch');
  const filters = Array.from(document.querySelectorAll('.blog-filter'));
  let activeCategory = 'All';

  function escapeHTML(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  function filteredPosts() {
    const term = (search?.value || '').trim().toLowerCase();
    return posts
      .filter(post => activeCategory === 'All' || post.category === activeCategory)
      .filter(post => {
        if (!term) return true;
        return [post.title, post.excerpt, post.category]
          .join(' ')
          .toLowerCase()
          .includes(term);
      })
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }

  function render() {
    if (!grid) return;
    const items = filteredPosts();

    if (!items.length) {
      grid.innerHTML = `
        <div class="blog-empty">
          <h2>${posts.length ? 'No articles match this search.' : 'Polaris Insights is being prepared.'}</h2>
          <p>${posts.length
            ? 'Try another keyword or category.'
            : 'The publishing system is now ready. New articles on epidemiology, biostatistics and academic publishing can be added without changing the homepage.'}</p>
        </div>`;
      return;
    }

    grid.innerHTML = items.map(post => `
      <article class="article-card">
        <div class="article-meta">
          <span class="article-category">${escapeHTML(post.category || '')}</span>
          <span>•</span>
          <span>${escapeHTML(formatDate(post.date))}</span>
          ${post.readingTime ? `<span>•</span><span>${escapeHTML(post.readingTime)}</span>` : ''}
        </div>
        <h2>${escapeHTML(post.title || '')}</h2>
        <p>${escapeHTML(post.excerpt || '')}</p>
        <a class="article-link" href="${escapeHTML(post.href || '#')}">Read article →</a>
      </article>
    `).join('');
  }

  if (search) {
    search.addEventListener('input', render);
  }

  filters.forEach(button => {
    button.addEventListener('click', function () {
      activeCategory = this.dataset.category || 'All';
      filters.forEach(btn => btn.classList.toggle('active', btn === this));
      render();
    });
  });

  render();
})();
