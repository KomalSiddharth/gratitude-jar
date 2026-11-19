# Gratitude Jar 2027

A small, cute website: write what you're grateful for on chart paper, stick stickers, and drop it in a jar that stays sealed until 31 Dec 2027.

Plain HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html        page structure and content
css/styles.css    all styling (colors are CSS variables at the top)
js/app.js         the practice desk: paper shapes, stickers, photo, moods, jar, preview
```

## Run it on your computer

Double-click `index.html`, or serve the folder:

```
npx serve .
```

## Push to GitHub

1. Create an empty repository on github.com (no README, no .gitignore). Name it `gratitude-jar-2027`.
2. In this folder:

```
git init
git add .
git commit -m "Gratitude Jar 2027: landing page and practice desk"
git branch -M main
git remote add origin https://github.com/<your-username>/gratitude-jar-2027.git
git push -u origin main
```

Using the GitHub CLI instead: `gh repo create gratitude-jar-2027 --public --source=. --push`

## Put it online (free)

GitHub Pages: repository, Settings, Pages, Source "Deploy from a branch", branch `main`, folder `/ (root)`. The site appears at `https://<your-username>.github.io/gratitude-jar-2027/`.

Or Netlify / Vercel / Cloudflare Pages: import the GitHub repository, no build command, publish directory `.`.

## Later: connect Supabase

The practice jar lives in memory only. When you build the real jar, do these in `js/app.js`:

1. Keep the jar on the device first (`localStorage` or IndexedDB), so it works offline and with no account.
2. Create a Supabase project and add the `@supabase/supabase-js` client (CDN script tag or npm).
3. Tables to start with: a global counter (a single number that only goes up), anonymous usage events, thank-you links with an expiry, and optional encrypted backups.
4. Turn on Row Level Security for every table, and use Supabase anonymous sign-in so people still need no account.
5. Never store note text in plain form. If you offer cloud backup, encrypt on the device before upload.
6. The anon key is meant to be public, but never put the `service_role` key in this project.
