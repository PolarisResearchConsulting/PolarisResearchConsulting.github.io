# Polaris Research — Production Website

This folder is the production-structured version of the approved Polaris Research baseline website.

## Structure

```text
polaris-research-production/
├── index.html
├── 404.html
├── .nojekyll
├── README.md
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── app.js
    └── images/
        └── polaris-logo.jpg
```

## What changed from the single-file prototype

The appearance and user-facing behavior were preserved, while the code was separated into maintainable production assets:

- HTML → `index.html`
- CSS → `assets/css/styles.css`
- JavaScript → `assets/js/app.js`
- Logo → `assets/images/`
- Added a lightweight `404.html`
- Added `.nojekyll` for frictionless GitHub Pages deployment
- Added basic production metadata and favicon linkage

## Local preview

Because the site uses normal relative asset paths, it can be opened directly by double-clicking `index.html`.

For the most reliable local preview, especially before later adding blog routes, serve the folder with a small local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages deployment

1. Create or open the GitHub repository for the main Polaris Research website.
2. Upload the **contents** of this folder to the repository root.
3. Commit the files.
4. In GitHub: **Settings → Pages**.
5. Select **Deploy from a branch**.
6. Choose the main branch and `/ (root)`.
7. Save.

The current SampleSize Studio links already point to the live application.

## Before custom-domain launch

The next production tasks should include:
- canonical URL after the final domain is chosen,
- Open Graph/social sharing metadata,
- sitemap.xml and robots.txt,
- dedicated blog routes,
- dedicated legal URLs if desired,
- analytics/search-console integration,
- final accessibility and performance audit.

## Contact

The public website uses email-only contact:
`polarisresearch2025@gmail.com`

No public phone number or WhatsApp contact is included.


## Phase 2 — Polaris Insights

A dedicated static blog architecture is now included under `/blog/`.

Features:
- separate blog landing page,
- keyword search,
- category filtering,
- responsive article cards,
- dark mode and pastel accent themes,
- reusable long-form article template,
- lightweight metadata registry in `blog/posts-data.js`,
- no database or CMS dependency,
- direct-browser and GitHub Pages compatibility.

See `blog/AUTHORING_GUIDE.md` for the publishing workflow.
