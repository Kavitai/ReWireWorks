# RewireWorks Static Site

Complete static HTML site for GitHub Pages deployment.

## 📁 File Structure

```
rewireworks-site/
├── index.html              # Homepage
├── about.html              # About / Background
├── offer.html              # What's On Offer
├── contact.html            # Contact (Formspree)
├── articles.html           # Humanising Business (Articles)
├── what-to-expect.html     # What to Expect
├── tracked.html            # What's Tracked
├── why-me.html             # Why Me
├── rewire-for-you.html     # Rewire Works For You
├── resources.html          # Resources
├── concertina.html         # Concertina On Offer
├── maldives.html           # Maldives Connect
├── kyrgyzstan.html         # Kyrgyzstan Connect
├── podcast.html            # Fearlessly Human Podcast
├── powerskills.html        # Powerskills Framework
├── for-fun.html            # For Fun
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── main.js             # Interactivity
└── images/                 # Add your images here
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

---

Built for RewireWorks | Organizational Development Consulting & Keynote Speaking
