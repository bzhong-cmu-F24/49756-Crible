# DataFit Validation Lab

Next.js-powered landing page for a **buy-side data cleaning + validation** concept. It mirrors the value proposition & customer segment canvas shown in the assignment screenshot:

- ✅ Custom identity (PulseFunnel logo reused as the DataFit mark in `public/pulsefunnel-logo.svg`).
- ✅ Interactive landing page with analyst personas, pipeline scope toggles, reliability pulse, validation sprint builder, and intake form.
- ✅ Tailwind CSS aesthetic with gradients, chips, and screenshot-ready hero/analytics sections tailored to data preparation workflows.

## Tech stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- React + TypeScript
- Tailwind CSS
- Optional UI spice via `lucide-react` icons and gradients (shadcn-ready theme tokens)

## Getting started

```bash
cd 49756-Crible
npm install
npm run dev
```

Open http://localhost:3000 to explore the landing page.

## Deploying

```bash
npm run build
npm start
```

- Deploy on Vercel/Netlify (or your platform of choice) and copy the live URL.
- Capture at least two screenshots (hero + analytics cards) for your coursework submission.

## Submission checklist

- [ ] Repository pushed to GitHub with the public URL documented in your report.
- [ ] Landing page deployed + screenshots (hero + reliability pulse) stored in the submission package.
- [ ] Value proposition slide references the on-page blueprint + intake form outputs.
- [ ] Receipts/logs collected if you run any prototype spend or tooling credits.

## Customization hooks

- Edit analyst profiles, data sources, and deliverables in `app/page.tsx`.
- Update styles/gradients in `app/globals.css` and `tailwind.config.ts`.
- Swap copy or KPIs as you refine the problem statement or canvas artifacts.