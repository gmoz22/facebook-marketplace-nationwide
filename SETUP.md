## Project Setup

### Run the existing app

Use Node.js 20.9 or newer (Node.js 22 LTS is recommended) and npm.
The app uses Next.js 16.4.2, React 19, TypeScript 5, and Tailwind CSS 3.

```sh
npm ci
npm run dev
```

Copy any required analytics configuration into `.env.local` before building.
Next.js loads environment files automatically. Analytics IDs and script URLs
prefixed with `NEXT_PUBLIC_` are embedded at build time and must be public.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

The build uses Turbopack and exports the static site to `out/`.
Deploy that directory to a static host. `npm start` serves an existing export;
`npm run preview` builds and serves it. `next start` is not compatible with
`output: "export"`.

Linting uses the ESLint CLI and `eslint.config.mjs`; Next.js 16 no longer
provides `next lint` or runs ESLint during builds. ESLint stays on version 9
because the React plugin used by Next.js does not support ESLint 10 yet.


### Analitycs

In `.env`, add your GA4 ID
```
NEXT_PUBLIC_GA4_ANALYTICS_ID='YOUR_GA4_ID'
```
_Alternatively, override the variable via `.env.$(NODE_ENV).local.`, `.env.local` or `.env.$(NODE_ENV)` files where `$(NODE_ENV) = development | production | test`_

GA4 is initialized once in the client-side `Analytics` component, after hydration. Leave the ID unset to run without GA4.

Umami analytics uses `NEXT_PUBLIC_UMAMI_SCRIPT_URL` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.

---

## Search URL template parameters

```& [operand from below] = [variable]```

```
itemCondition { new,used_like_new,used_good,used_fair }
sortBy {best_match,distance_ascend,creation_time_descend,price_ascend,price_descend}
exact {true, false}
daysSinceListed { number }
minPrice { number }
maxPrice { number }
radius { number } // THIS IS FOR COUNTRIES THAT USE MILES
radiusKM { number } // THIS IS FOR COUNTRIES THAT USE KMS
```
