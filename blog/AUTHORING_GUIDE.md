# Polaris Insights — Publishing Guide

Polaris Insights is the editorial section of the Polaris Research website.

## Permanent categories

Use one of these four categories for every article:

- `Research Methodology`
- `Epidemiology Simplified`
- `Biostatistics in Practice`
- `Academic Publishing Playbook`

Each category has its own pastel card treatment on the blog homepage.

## Blog files

```text
blog/
├── index.html
├── posts-data.js
├── AUTHORING_GUIDE.md
└── articles/
    ├── _article-template.html
    └── published-article.html
```

## Publishing a new article

### 1. Duplicate the article template

Copy:

`blog/articles/_article-template.html`

Rename it using a lowercase, hyphenated slug, for example:

`understanding-confidence-intervals.html`

### 2. Replace the placeholders

Update:

- page title
- meta description
- canonical URL
- category
- publication date
- reading time
- article headline
- short deck
- article body
- sidebar table of contents
- references

For the article hero color, use the matching class:

- Research Methodology → `category-research`
- Epidemiology Simplified → `category-epidemiology`
- Biostatistics in Practice → `category-biostatistics`
- Academic Publishing Playbook → `category-publishing`

### 3. Register the article in `posts-data.js`

Add an object inside `window.POLARIS_POSTS`:

```javascript
{
  slug: "understanding-confidence-intervals",
  title: "Understanding Confidence Intervals in Clinical Research",
  excerpt: "A practical guide to what confidence intervals mean and how to report them.",
  category: "Biostatistics in Practice",
  date: "2026-10-20",
  readingTime: "7 min read",
  href: "articles/understanding-confidence-intervals.html",
  featured: false
}
```

Set `featured: true` only for the article that should be highlighted most prominently.

### 4. Add the public URL to `sitemap.xml`

Every published article should have its own sitemap entry.

## What the blog does automatically

The blog homepage will:

- display the first matching article as the featured story,
- display remaining articles as pastel magazine cards,
- sort articles newest-first,
- search title, excerpt and category,
- filter by the four permanent categories,
- retain the Polaris light/dark/accent system,
- remain responsive on tablets and phones.

## Writing workflow

1. Finalize the article in Word or another writing tool.
2. Convert the final text into the article template.
3. Add its metadata to `posts-data.js`.
4. Add its URL to `sitemap.xml`.
5. Upload the changed files to GitHub.
6. Confirm the GitHub Pages deployment succeeds.
7. Test the article and blog homepage on desktop and mobile.

## Important

Do not publish confidential client information, patient identifiers, private datasets, unpublished client manuscripts or other sensitive material.
