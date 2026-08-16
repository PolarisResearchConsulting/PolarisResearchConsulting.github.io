# Polaris Insights — Publishing Guide

The blog architecture is now separated from the homepage. New articles can be published without redesigning the main Polaris Research website.

## Blog files

```text
blog/
├── index.html
├── posts-data.js
├── AUTHORING_GUIDE.md
└── articles/
    └── _article-template.html
```

## Publishing a new article

### 1. Duplicate the article template

Copy:

`blog/articles/_article-template.html`

Rename it using a lowercase, hyphenated slug, for example:

`understanding-confidence-intervals.html`

### 2. Replace the article placeholders

Update:
- page title
- meta description
- category
- publication date
- reading time
- article headline
- short deck/summary
- article body
- sidebar table of contents
- references

Use one of the current public categories:
- `Epidemiology Simplified`
- `Biostatistics in Practice`
- `Academic Publishing Playbook`

More categories can be added later.

### 3. Register the article in `posts-data.js`

Add an object inside `window.POLARIS_POSTS`:

```javascript
{
  slug: "understanding-confidence-intervals",
  title: "Understanding Confidence Intervals in Clinical Research",
  excerpt: "A practical guide to what confidence intervals mean and how to report them.",
  category: "Biostatistics in Practice",
  date: "2026-08-16",
  readingTime: "7 min read",
  href: "articles/understanding-confidence-intervals.html"
}
```

The blog library will automatically:
- create the article card,
- sort articles newest-first,
- support keyword search,
- support category filters,
- work in light/dark mode and all Polaris accent themes.

## Writing workflow

For now, the easiest workflow is:

1. Write the article in Word, Google Docs, Markdown, or ChatGPT.
2. Convert the final text into the article template.
3. Add its metadata to `posts-data.js`.
4. Upload the two changed files to GitHub.

A CMS can be connected later without changing the public design.

## Direct browser preview

The system deliberately uses `posts-data.js` rather than fetching JSON. This means the blog works when the files are opened directly in a browser as well as on GitHub Pages.

## Important

Do not put confidential client data, patient information, unpublished client datasets, or private manuscript material in public blog files.
