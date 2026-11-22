# Giryeong (Daniel) Park — Personal Profile

Personal academic & professional portfolio website for **Giryeong (Daniel) Park**, Bachelor of Nutrition Science student and Undergraduate Research Fellow at Monash University.

**Live site:** [https://giryeong1234.github.io/giryeong/](https://giryeong1234.github.io/giryeong/)

## Structure

- `index.html` — Semantic HTML5 profile page (About, Experience, Projects, Leadership, Education & Certifications, Recent Highlights)
- `styles.css` — Responsive light/dark design system
- `script.js` — Theme switcher, experience category filter, mobile navigation, scrollspy, and reveal animations
- `favicon.svg` — Monogram SVG icon
- `.github/workflows/deploy-pages.yml` — Automated GitHub Pages deployment on every push to `main`
- `.nojekyll` — Serves static assets directly on GitHub Pages

## Local Preview

Open `index.html` directly in a browser, or run any local static server from this directory:

```bash
npx serve .
```

## Updating Content

Edit `index.html` directly and push to `main` — GitHub Actions will automatically redeploy the site to GitHub Pages.
