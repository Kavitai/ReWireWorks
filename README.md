# RewireWorks Static Site

Complete static HTML site for GitHub Pages deployment.

## 📁 File Structure

```
rewireworks-site/
├── index.html                     Home
├── how-the-diagnostic-works.html  How It Works
├── what-is-measured.html          What Is Measured
├── advance-access.html            Advance Access (info page)
├── advance-access-form.html       Advance Access application form
├── behind-the-diagnostic.html     About / founder page
├── ask-a-question-first.html      General enquiry form
├── contact-us.html                Contact page (3-column layout)
├── css/
│   └── style.css                  All styling — one file, no preprocessor
├── js/
│   └── main.js                    Nav, card expand/collapse, image rotation, form validation, scroll reveal
└── images/
    ├── logo-rww-wordmark.svg      Nav logo
    ├── logo-rww-full.png          Home page hero logo
    ├── logo-rww-monogram.png      Favicon
    ├── Home.jpg                   Home page card image
    ├── How-it-works.jpg           How It Works page card image
    ├── what-is-measured.jpg       What Is Measured page card image
    ├── Advance-access.jpg         Advance Access page card image
    └── behind-the-diagnostic.jpg  Behind the Diagnostic page card image
```

## 🚀 GitHub Pages Deployment

1. **Create a new repository** on GitHub (e.g., `rewireworks-site`)
2. **Upload all files** from this folder to the repository
3. **Go to Settings > Pages** in your repo
4. **Select "Deploy from a branch"** and choose `main` branch, `/ (root)` folder
5. **Your site will be live** at `https://yourusername.github.io/rewireworks-site/`

## 🔗 Custom Domain (rewireworks.com)

1. In your repo, go to **Settings > Pages > Custom domain**
2. Enter `rewireworks.com`
3. Add a `CNAME` file in the root with `rewireworks.com` as its only content
4. In GoDaddy DNS, add:
   - **A records** pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or **CNAME** record: `www` → `yourusername.github.io`

## 🎨 Brand Colors Setup

Open `css/style.css` and update these CSS variables at the top:

```css
:root {
  --primary: #1a365d;      /* Replace with your brand primary */
  --secondary: #2d3748;      /* Replace with your brand secondary */
  --accent: #d69e2e;         /* Replace with your brand accent */
  --dark: #1a202c;           /* Replace with your brand dark */
  --light: #f7fafc;          /* Replace with your brand light */
}
```

## 📧 Formspree Setup

1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form and copy your **Form ID**
3. Open `contact.html` and replace `YOUR_FORM_ID` in this line:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
## Forms

Each form submits via Formspree:

Page                                 Endpoint
advance-access-form.html         formspree.io/f/xwvdnvqw
ask-a-question-first.html         formspree.io/f/maqgdqjr
contact-us.html                  formspree.io/f/mpqewlrv

All three IDs belong to your Formspree account — check the dashboard there if a form stops receiving submissions.

## 🖼️ Adding Images

Replace the placeholder divs (e.g., `[Your Image: ...]`) with actual `<img>` tags:

```html
<img src="images/your-image.jpg" alt="Description">
```

Recommended image sizes:
- Hero images: 1200x600px
- Card thumbnails: 600x400px
- Profile photos: 400x500px

## 📱 Features

- ✅ Mobile-responsive design
- ✅ Fast loading (no external dependencies except Formspree)
- ✅ SEO meta tags optimized for "organizational development consultant" and "keynote speaker"
- ✅ Smooth scroll navigation
- ✅ Accordion (concertina) sections
- ✅ Scroll reveal animations
- ✅ Dropdown navigation for mobile
- ✅ Clean, professional design

## 🔍 SEO

Each page has unique meta descriptions and keywords. Update the Open Graph tags in each HTML file's `<head>` section with your actual social media images.

## ⚡ Performance Tips

- Compress images before adding to `/images/`
- Use WebP format where possible
- Minify CSS/JS for production (optional)
- Enable GitHub Pages caching (automatic)
- Key behaviours to know about before editing

Card images rotate automatically — don't hand-set position classes.
Every page's expanded cards carry a class like image-left, image-right, image-top, or image-bottom in the HTML, but main.js overwrites these on every page load, cycling through top → bottom → left → right in document order (skipping any card with no-image). If you add a new card, whatever position class you type in the HTML will be replaced automatically — you don't need to think about it, but don't be surprised when it doesn't match what you wrote.

Each page has exactly one image, reused across its cards. Position varies per card via the rotation above; the image itself doesn't.

Two responsive breakpoints, intentionally different — don't merge them:


900px — nav switches to the hamburger menu
768px — card layout forces to stacked top/bottom (left/right positions are disabled below this width)


These are split on purpose so the nav never gets squeezed into an awkward in-between zone. main.js also checks window.innerWidth <= 900 in two places (closing the mobile menu, dropdown toggles) — keep this in sync with the CSS breakpoint if you ever change one.

One-image-per-card-set design rule. Cards without an image use the no-image layout class and just show text full-width — this is intentional for content like process diagrams or box grids that need the full card width, not a bug to "fix" by adding an image.

Cards pair into 2-column grids automatically. Any two .card elements sharing one .cards-grid container will lay out side-by-side (.cards-grid uses CSS Grid auto-fit, minmax(300px, 1fr)) — no extra CSS needed, just wrap the cards you want paired in one grid container in the HTML.

---

Built for RewireWorks | Organizational Development Consulting & Keynote Speaking
