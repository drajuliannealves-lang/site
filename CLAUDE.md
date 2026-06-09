# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static, single-page professional landing page for **Dra. Julianne Alves**, a nurse specializing
in **wound care (feridas), ostomy care (ostomias), and laser therapy (laserterapia)**. Content is
in **Portuguese (pt-BR)**. The site is SEO-first and has no backend — it is plain HTML/CSS/vanilla JS
deployable to any static host (Vercel, Netlify, GitHub Pages).

## Architecture

Everything is one page driven by `index.html`. There is no framework, no build step, and no bundler —
files are served as-is.

- `index.html` — the entire page. Sections are anchored by `id` (`#sobre`, `#atuacao`, `#servicos`,
  `#abordagem`, `#diferenciais`, `#missao`, `#faq`, `#contato`) and the nav links / smooth-scroll
  depend on these IDs. Key content blocks: a pull-quote band (`.quote-band`), the Áreas de Atuação
  chip grid (`.areas`), an image+text **carousel** (`.carousel`, `[data-carousel]`), and the Missão
  band (`.mission`).
- `css/styles.css` — all styles. Driven by CSS custom properties under `:root` (colors, fonts,
  `--max` width, radius, shadows). Change the palette/spacing there, not inline. Mobile breakpoints
  are at 920px, 720px (nav collapses to hamburger), and 480px.

  **Design system — "Botânica Clínica de Luxo" (luxury/refined):** dominant deep emerald
  `--c-green #0D4440`, accent gold `--c-gold #BAA672`, neutral cream `--c-cream #F8F4E1`. The
  recurring brand anchor is the **gold-white-gold gradient** (`--grad-gold` / `--rule-gold`), used on
  hairline rules under titles, the `.eyebrow` tick, the `JA` monogram (`.brand-mark`), card top
  borders, and the primary button. Typography: **Amiri** display serif (headings) + **Alegreya Sans**
  body, both from Google Fonts. Sections alternate cream / `--c-cream-deep` / emerald (`.section-dark`).
  Keep contrast intact: body text uses `--c-ink` on light, `--c-cream` on emerald — gold is decorative,
  not for body copy.
- `js/main.js` — four small, dependency-free behaviors: footer year, mobile menu toggle, the
  contact-form submit handler, and the `[data-carousel]` slider (dots, arrows, keyboard, swipe,
  autoplay paused on hover/focus and disabled under `prefers-reduced-motion`). IIFE, no modules.
  No-JS fallback: carousel slides 2+ carry `hidden`, which JS removes on init.
- SEO files live at root and must stay there to be served correctly: `robots.txt`, `sitemap.xml`,
  `site.webmanifest`.
- `assets/images/` and `assets/icons/` — referenced with **absolute** paths (`/assets/...`), so the
  site must be served from a domain root. Several image/icon files are still placeholders (see below).

### Three things that are coupled — change them together

1. **WhatsApp number** appears in 3 places in `index.html`: the floating button (`.whatsapp-float`
   href), the contact-list link, and should match `telephone` in the JSON-LD. Format: `wa.me/55DDDNUMBER`.
2. **Section IDs** in `index.html` are referenced by the nav menu and by smooth-scroll. Renaming a
   section means updating its nav `<a href>` too.
3. **JSON-LD structured data** (the `<script type="application/ld+json">` in `<head>`) mirrors real
   contact/address/specialty info shown on the page. Keep it in sync with visible content — Google
   uses it for rich results, and mismatches hurt SEO.

### Contact form

The form posts to **Web3Forms** (`https://api.web3forms.com/submit`). `js/main.js` intercepts submit,
validates, and sends via `fetch` so the user stays on the page. A hidden `botcheck` honeypot field
guards against spam. To make it work, replace `YOUR_WEB3FORMS_ACCESS_KEY` in `index.html` with a real
key from https://web3forms.com (free).

## Placeholders to replace before going live

These are intentionally fake and must be filled in:

- `YOUR_WEB3FORMS_ACCESS_KEY` — Web3Forms access key (in `index.html`).
- `5500000000000` — WhatsApp number (floating button + contact list); also the `telephone` in JSON-LD.
- `https://www.juliannealves.com.br/` — production domain (canonical, OG/Twitter URLs, JSON-LD,
  `robots.txt`, `sitemap.xml`). Find-and-replace if the domain changes.
- `contato@juliannealves.com.br` — contact e-mail.
- `COREN-UF 000000` — professional registration number (footer).
- Address fields in JSON-LD (`streetAddress`, `addressLocality`, `addressRegion`, `postalCode`).
- Images: all real now. The page uses `assets/images/julianne-hero.jpg` (hero) and
  `julianne-sobre.jpg` (Sobre). The folder also holds an unused photo library for future
  sections/swaps: `julianne-azul-01/02/03`, `julianne-azul-banco`, `julianne-branco-01/02/03/04`,
  `julianne-bege-01`, `julianne-mala`, plus `logo-banner.jpg` (the logo on a green landscape band).
  Portraits are 1000×1500; the hero/sobre slots crop them with `object-fit: cover` (face-centered).

## Brand logo & favicons

The brand mark is the client's circular monogram logo (gold "JA" + "Dra. Julianne Alves Silva" /
"Tratamento especializado em feridas"). Master source: `assets/icons/WhatsApp Image 2026-06-09 at
00.10.59.jpeg` (1600×1600, black background). All derived assets were generated with ImageMagick by
recoloring the black background to the brand emerald `#0D4440` (`-fuzz 5% -fill "#0D4440" -opaque
black`), so the seal sits cleanly on both the cream header and the dark footer:

- `assets/images/logo-julianne.png` — 600px emerald logo used in the header (`.brand-mark`, circular
  56px) and footer (`.footer-logo`, 150px).
- `favicon.ico` (root) + `assets/icons/favicon-16/32.png` — **center-cropped JA monogram** only (the
  full logo is illegible at 16–32px).
- `assets/icons/apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` — full emerald logo.
- `assets/images/og-image.jpg` (1200×630) — logo centered on an emerald canvas.

To regenerate after a logo change, re-run the same ImageMagick pipeline against the new source.

## Local preview

No build/lint/test tooling. Serve the folder over HTTP (don't open via `file://` — absolute `/assets`
paths and the form fetch won't resolve):

```bash
python3 -m http.server 8000   # then open http://localhost:8000
# or: npx serve .
```

## Conventions

- Keep the site dependency-free and buildless — no npm packages, frameworks, or bundlers unless the
  scope genuinely changes. Fonts load from Google Fonts via `<link>`.
- All copy is pt-BR. Maintain a humanized, professional healthcare tone.
- Preserve semantic HTML and accessibility: heading hierarchy, `alt` text, `aria-*` on the nav toggle
  and form status, and the `prefers-reduced-motion` block in CSS.
- Use absolute asset paths (`/assets/...`) consistently.
