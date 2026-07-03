# my-portfolio-website

Personal portfolio of **Vignesh Girish** — Senior Data Platform Engineer, London.

**Live site:** https://nerdy-thanos.github.io/my-portfolio-website/

Built with plain HTML, CSS and JavaScript — no frameworks, no build step. Dark and light themes (follows system preference, toggleable), an animated "pipeline" rail tying the sections together, expandable experience and project cards, and tag-based project filtering.

## Structure

```
index.html        — the whole site, one page
css/style.css     — theme tokens + all styles
js/main.js        — theme toggle, nav highlighting, reveals, filters
assets/           — favicon + résumé PDF
```

## Local preview

Any static server works:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploying

Pushed to `main`; GitHub Pages serves the repo root (`.nojekyll` disables Jekyll processing).
