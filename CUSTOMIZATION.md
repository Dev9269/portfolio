# Quick Customization Guide

Get your portfolio ready in 15 minutes.

## 1. Update Your Name (2 min)

### Navbar
**File**: `src/components/Navbar.jsx` - Line 11

Change:
```jsx
Portfolio
```

To:
```jsx
Your Name
```

### Footer
**File**: `src/components/Footer.jsx` - Line 15

Change:
```jsx
Portfolio
```

To:
```jsx
Your Name
```

## 2. Update Hero Headline (2 min)

**File**: `src/components/Hero.jsx` - Lines 15-17

Change:
```jsx
I build websites that <span className="text-accent italic">bring customers</span>
```

To your own value proposition.

Example:
```jsx
I create digital products that <span className="text-accent italic">drive growth</span>
```

## 3. Add Your Projects (5 min)

**File**: `src/components/Projects.jsx` - Lines 5-38

Replace the projects array with your own:

```jsx
const projects = [
  {
    title: "Your Project Name",
    description: "Brief description of what you built",
    image: "https://your-image-url.jpg",
    link: "https://project-link.com",
  },
  {
    title: "Another Project",
    description: "What this project does",
    image: "https://another-image.jpg",
    link: "https://another-link.com",
  },
  // Add more...
];
```

**Tips for images:**
- Use unsplash.com for free images
- Size: minimum 800x600px
- Use HTTPS URLs
- Projects show in grid (2-3 columns)

## 4. Update Skills (2 min)

**File**: `src/components/Skills.jsx` - Lines 4-12

```jsx
const skillGroups = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    category: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL"]
  },
  {
    category: "Tools",
    skills: ["Vercel", "Docker", "Git"]
  }
];
```

Add/remove skills as needed.

## 5. Update About Section (2 min)

**File**: `src/components/About.jsx`

Update paragraphs (lines 20-26) and bullet points (lines 33-45).

**About paragraph:**
```jsx
<p className="text-text-secondary text-lg leading-relaxed mb-6">
  Your introduction here. What do you do?
</p>
```

**Bullet points:**
```jsx
<li>• Your skill or service</li>
<li>• Another thing you do</li>
```

## 6. Update Social Links (2 min)

**File**: `src/components/Footer.jsx` - Lines 52-62

Replace:
```jsx
<a href="#" className="...">Twitter</a>
```

With your URLs:
```jsx
<a href="https://twitter.com/yourhandle" className="...">Twitter</a>
<a href="https://linkedin.com/in/yourprofile" className="...">LinkedIn</a>
<a href="https://github.com/yourprofile" className="...">GitHub</a>
```

## 7. Update Contact Email (1 min)

**File**: `src/components/Contact.jsx` - Line 105

Change:
```jsx
<a href="mailto:hello@example.com">
  hello@example.com
</a>
```

To:
```jsx
<a href="mailto:your@email.com">
  your@email.com
</a>
```

## Optional: Change Colors

**File**: `tailwind.config.js`

Modify colors object (lines 10-15):

```javascript
colors: {
  dark: "#0E0E0E",        // Background
  surface: "#1A1A1A",     // Cards
  accent: "#C2A878",      // Gold (change this)
  secondary: "#6A8D92",   // Teal (or this)
  "text-primary": "#EDEDED",
  "text-secondary": "#A8A8A8",
}
```

Try these accent colors:
- Gold: `#C2A878` (default)
- Silver: `#B8B8B8`
- Blue: `#6B9FD6`
- Green: `#7BA98E`

## Test Locally

```bash
npm run dev
```

Visit: `http://localhost:5173`

- Check all sections
- Test on mobile (DevTools - Ctrl+Shift+M)
- Click all links
- Test form

## Build & Deploy

```bash
npm run build
```

Then deploy `dist/` folder to:
- **Vercel** (recommended): `vercel`
- **Netlify**: `netlify deploy --prod --dir=dist`
- **GitHub Pages**: Push to `gh-pages` branch
- **Your server**: Upload `dist/` folder

## Verification Checklist

- [ ] Name updated in Navbar
- [ ] Name updated in Footer
- [ ] Hero headline customized
- [ ] Projects added (at least 3)
- [ ] Project images are loading
- [ ] Skills updated
- [ ] About section updated
- [ ] Social links working
- [ ] Email in contact section updated
- [ ] Tested on mobile
- [ ] All links working
- [ ] Form submits

## Common Issues

**Projects not showing?**
- Check image URLs are HTTPS
- Verify image URLs are correct
- Check browser console for errors

**Styles look wrong?**
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear cache and rebuild

**Form not working?**
- Currently logs to console
- Need backend service to send emails (Formspree, SendGrid, etc.)

## What's Working

- ✅ Display all projects
- ✅ Smooth scrolling
- ✅ Hover effects
- ✅ Responsive design
- ✅ Contact form (local)
- ✅ Navigation links

## Need More Help?

Check `README.md` for detailed documentation.

---

**That's it! Your portfolio is ready to customize and deploy!** 🚀
