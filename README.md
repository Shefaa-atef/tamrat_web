# Tamrat — تمرات

A bilingual landing website for Tamrat, a fasting-planning app. The site presents the app's features, screenshots, intended audience, download information, and privacy policy.

[Visit the website](https://shefaa-atef.github.io/tamrat_web/)

## Features

- Arabic and English content with language-aware layout.
- Animated feature sections and app screenshots.
- Responsive navigation and product information.
- A privacy-policy view at `#/privacy-policy`.

This repository contains the promotional website. The fasting planner and account features shown in the screenshots belong to the app being presented.

## Branches

| Branch | Contents |
| --- | --- |
| [main](https://github.com/Shefaa-atef/tamrat_web/tree/main) | React/TypeScript source, package manifest, and Vite configuration. |
| [gh-pages](https://github.com/Shefaa-atef/tamrat_web/tree/gh-pages) | Generated website files used for GitHub Pages; currently the default branch. |

Clone **main** explicitly to work on the source.

## Run locally

Use Node.js 22 and npm.

**Dependency compatibility:** the lockfile includes Drei 9.122, whose peer dependencies require React 18 and React Three Fiber 8, while the manifest uses React 19 and Fiber 9. Resolve this mismatch before installation; a clean `npm ci` can reject the current dependency tree. Avoid treating a forced install as proof of compatibility.

After resolving the dependency versions, the local workflow is:

```sh
git clone --branch main https://github.com/Shefaa-atef/tamrat_web.git
cd tamrat_web
npm ci
npm run dev
```

Open the Vite URL with the `/tamrat_web/` path, typically `http://localhost:5173/tamrat_web/`.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Check TypeScript and build into `dist/`. |
| `npm run preview` | Preview the production build. |
| `npm run deploy` | Build and publish `dist/` to the remote `gh-pages` branch. |

The deploy command publishes changes and requires GitHub write access. There is no lint or test script in the current package manifest.

## Source guide

| Path on `main` | Purpose |
| --- | --- |
| `src/App.tsx` | Main sections and hash-based privacy route. |
| `src/sections/` | Hero, value proposition, screenshots, features, audience, usage, and download sections. |
| `src/components/layout/` | Navigation and footer. |
| `src/lib/i18n.tsx` | Arabic/English translations and language state. |
| `src/pages/PrivacyPolicyPage.tsx` | Privacy-policy content. |
| `vite.config.ts` | Project base path and source alias. |

## Stack and publishing notes

React 19, TypeScript, Vite 6, Tailwind CSS 4, GSAP, and Motion, with Three.js-related packages also declared in the manifest.

Edit the source on `main` and rebuild before publishing. The `gh-pages` files are generated output. Vite uses `base: '/tamrat_web/'`, so preserve that path or update the configuration for another host.

The deployment command replaces generated output. A README added only to `gh-pages` can be removed by a later deployment; keep this documentation on `main` as the maintained copy.
