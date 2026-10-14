(function () {
  const posts = Array.isArray(window.POLARIS_POSTS) ? window.POLARIS_POSTS : [];

  const grid = document.getElementById('articleGrid');
  const featured = document.getElementById('featuredArticle');
  const search = document.getElementById('articleSearch');
  const categoryButtons = Array.from(document.querySelectorAll('[data-category]'));
  const summary = document.getElementById('resultsSummary');
  const featuredHeading = document.getElementById('featuredHeading');

  const showAllButton = document.getElementById('showAllArticles');
  const closeAllButton = document.getElementById('closeAllArticles');
  const allSection = document.getElementById('all-articles-list');
  const allSearch = document.getElementById('allArticlesSearch');
  const allCategory = document.getElementById('allArticlesCategory');
  const allSort = document.getElementById('allArticlesSort');
  const allList = document.getElementById('allArticlesList');
  const allCount = document.getElementById('allArticlesCount');

  let activeCategory = 'All';

  const categoryClasses = {
    'Research Methodology': 'category-research',
    'Epidemiology Simplified': 'category-epidemiology',
    'Biostatistics in Practice': 'category-biostatistics',
    'Academic Publishing Playbook': 'category-publishing'
  };

  function escapeHTML(value) {
    return String(value ?? '')
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

  function categoryClass(category) {
    return categoryClasses[category] || 'category-research';
  }

  function matchesSearch(post, term) {
    if (!term) return true;
    return [post.title, post.excerpt, post.category]
      .join(' ')
      .toLowerCase()
      .includes(term.toLowerCase());
  }

  function filteredHomepagePosts() {
    const term = (search?.value || '').trim();

    return posts
      .filter(post => activeCategory === 'All' || post.category === activeCategory)
      .filter(post => matchesSearch(post, term))
      .sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }

  function renderFeatured(post) {
    if (!featured) return;

    if (!post) {
      featured.innerHTML = `
        <div class="blog-empty magazine-empty">
          <h2>No articles match this selection.</h2>
          <p>Try another category or search term.</p>
        </div>`;
      return;
    }

    featured.innerHTML = `
      <article class="featured-story ${categoryClass(post.category)}">
        <div class="featured-story-top">
          <span class="magazine-category">${escapeHTML(post.category)}</span>
          ${post.featured ? '<span class="featured-label">Featured</span>' : ''}
        </div>
        <h3><a href="${escapeHTML(post.href)}">${escapeHTML(post.title)}</a></h3>
        <p>${escapeHTML(post.excerpt)}</p>
        <div class="story-footer">
          <span>${escapeHTML(formatDate(post.date))}</span>
          ${post.readingTime ? `<span>•</span><span>${escapeHTML(post.readingTime)}</span>` : ''}
          <a class="story-arrow" href="${escapeHTML(post.href)}" aria-label="Read ${escapeHTML(post.title)}">→</a>
        </div>
      </article>`;
  }

  function renderGrid(items) {
    if (!grid) return;

    if (!items.length) {
      grid.innerHTML = `
        <div class="blog-empty magazine-empty">
          <h2>More articles are on the way.</h2>
          <p>Polaris Insights will continue to grow across research methodology, epidemiology, biostatistics and academic publishing.</p>
        </div>`;
      return;
    }

    grid.innerHTML = items.map(post => `
      <article class="article-card magazine-card ${categoryClass(post.category)}">
        <span class="magazine-category">${escapeHTML(post.category)}</span>
        <h2><a href="${escapeHTML(post.href)}">${escapeHTML(post.title)}</a></h2>
        <p>${escapeHTML(post.excerpt)}</p>
        <div class="story-footer">
          <span>${escapeHTML(formatDate(post.date))}</span>
          ${post.readingTime ? `<span>•</span><span>${escapeHTML(post.readingTime)}</span>` : ''}
          <a class="story-arrow" href="${escapeHTML(post.href)}" aria-label="Read ${escapeHTML(post.title)}">→</a>
        </div>
      </article>
    `).join('');
  }

  function renderHomepage() {
    const items = filteredHomepagePosts();
    const lead = items[0] || null;
    const rest = items.slice(1);

    if (featuredHeading) {
      featuredHeading.textContent = activeCategory === 'All'
        ? 'Featured article'
        : activeCategory;
    }

    renderFeatured(lead);
    renderGrid(rest);

    if (summary) {
      summary.textContent = `${items.length} article${items.length === 1 ? '' : 's'}`;
    }

    categoryButtons.forEach(button => {
      button.classList.toggle('active', (button.dataset.category || 'All') === activeCategory);
    });
  }

  function chooseCategory(category) {
    activeCategory = category || 'All';
    renderHomepage();

    const library = document.getElementById('all-articles');
    if (library && activeCategory !== 'All') {
      library.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function getAllArticleResults() {
    const term = (allSearch?.value || '').trim();
    const category = allCategory?.value || 'All';
    const sort = allSort?.value || 'newest';

    const result = posts
      .filter(post => category === 'All' || post.category === category)
      .filter(post => matchesSearch(post, term));

    result.sort((a, b) => {
      return sort === 'oldest'
        ? String(a.date).localeCompare(String(b.date))
        : String(b.date).localeCompare(String(a.date));
    });

    return result;
  }

  function renderAllArticles() {
    if (!allList) return;

    const items = getAllArticleResults();

    if (allCount) {
      allCount.textContent = `${items.length} article${items.length === 1 ? '' : 's'} found`;
    }

    if (!items.length) {
      allList.innerHTML = `
        <div class="all-articles-empty">
          <h3>No matching articles found.</h3>
          <p>Try changing the search term, category, or sort option.</p>
        </div>`;
      return;
    }

    allList.innerHTML = items.map(post => `
      <article class="all-article-row ${categoryClass(post.category)}">
        <div class="all-article-main">
          <span class="magazine-category">${escapeHTML(post.category)}</span>
          <h3><a href="${escapeHTML(post.href)}">${escapeHTML(post.title)}</a></h3>
          <p>${escapeHTML(post.excerpt)}</p>
        </div>
        <div class="all-article-meta">
          <span>${escapeHTML(formatDate(post.date))}</span>
          ${post.readingTime ? `<span>${escapeHTML(post.readingTime)}</span>` : ''}
          <a class="story-arrow" href="${escapeHTML(post.href)}" aria-label="Read ${escapeHTML(post.title)}">→</a>
        </div>
      </article>
    `).join('');
  }

  function openAllArticles() {
    if (!allSection) return;
    allSection.hidden = false;
    renderAllArticles();
    requestAnimationFrame(() => {
      allSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function closeAllArticles() {
    if (!allSection) return;
    allSection.hidden = true;
  }

  if (search) {
    search.addEventListener('input', renderHomepage);
  }

  categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
      chooseCategory(this.dataset.category || 'All');
    });
  });

  if (showAllButton) {
    showAllButton.addEventListener('click', openAllArticles);
  }

  if (closeAllButton) {
    closeAllButton.addEventListener('click', closeAllArticles);
  }

  [allSearch, allCategory, allSort].forEach(control => {
    if (!control) return;
    control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', renderAllArticles);
  });

  renderHomepage();
})();
