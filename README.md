# Teknical Solutionz — Static Site (Astro)

## Prereqs
- Node.js 18+ (Node 20 recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
Output is in `dist/`.

---

## Contact form (Formspree)
This repo includes a Formspree-ready form on `/contact`.

1. Create a form at Formspree and copy the endpoint URL (looks like `https://formspree.io/f/abcdwxyz`)
2. Update `src/pages/contact.astro` and replace:
```html
<form action="https://formspree.io/f/xxxxxx" method="POST">
```
with your endpoint.

---

## Deploy to Azure Static Web Apps (recommended)
1. Push this repo to GitHub
2. Azure Portal → **Static Web Apps** → Create
3. Source: GitHub
4. Preset: Astro
5. App location: `/`
6. Output location: `dist`

Azure will auto-build + auto-deploy on pushes to your default branch.

---

## Deploy to AWS S3 + CloudFront (optional)
1. `npm run build`
2. Upload contents of `dist/` to an S3 bucket
3. Add CloudFront for HTTPS + performance
