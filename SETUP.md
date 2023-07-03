## Project Setup


### Create a Next.js app using the [ShadCN Next.js template](https://github.com/shadcn/next-template)
```
npx create-next-app -e https://github.com/shadcn/next-template
```

### Install [Radix UI](https://www.radix-ui.com/) components
```
npm i @radix-ui/react-hover-card
npm i @radix-ui/react-popover
```

### Install [ShadCN UI](https://ui.shadcn.com/docs/components/) components
- button
- hover-card
- input
- popover

### Setup Google Analytics 4
```
npm i react-ga4
```

In `.env`, add your GA4 ID
```
NEXT_PUBLIC_GA4_ANALYTICS_ID='YOUR_GA4_ID'
```
_Alternatively, override the variable via `.env.$(NODE_ENV).local.`, `.env.local` or `.env.$(NODE_ENV)` files where `$(NODE_ENV) = development | production | test`_

In `app/layout.tsx`:
```
import ReactGA from "react-ga4"
```
Under `RootLayout()` add:
```
ReactGA.initialize(process.env.NEXT_PUBLIC_GA4_ANALYTICS_ID);
```

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
