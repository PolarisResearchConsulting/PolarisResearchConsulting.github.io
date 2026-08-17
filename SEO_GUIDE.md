# Phase 3 — SEO and Google Discoverability

The website now contains the technical SEO basics needed before submitting it to Google Search Console.

## Added

- Canonical URL for the homepage
- Canonical URL for Polaris Insights
- Open Graph metadata for link previews
- Twitter/X card metadata
- Schema.org structured data for Polaris Research
- Schema.org Blog data for Polaris Insights
- `robots.txt`
- `sitemap.xml`
- `site.webmanifest`
- SEO placeholders in the article template

## Live URLs

Main website:
https://polarisresearchconsulting.github.io/

Polaris Insights:
https://polarisresearchconsulting.github.io/blog/

SampleSize Studio:
https://polarisresearchconsulting.github.io/SampleSizeStudio/

Sitemap:
https://polarisresearchconsulting.github.io/sitemap.xml

Robots file:
https://polarisresearchconsulting.github.io/robots.txt

## Important

Do not add `_article-template.html` to the sitemap. It is a template, not a public article.

Every time a new article is published:
1. give it a unique title and meta description,
2. add its canonical URL,
3. add the article URL to `sitemap.xml`,
4. add it to `blog/posts-data.js`.

## Google Search Console

After this Phase 3 version is uploaded to GitHub, the next step is to add the site to Google Search Console and submit the sitemap.

The exact verification token is unique to your Google account, so it should not be guessed or hard-coded in advance.
