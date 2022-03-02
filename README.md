# `@aaronmbos/streak-counter` - a basic streak counter
This is a basic streak counter - inspired by Duolingo - written in TypeScript and meant for the browser (uses `localStorage`).

## Install

```shell
yarn add @aaronmbos/streak-counter
```

```shell
npm install @aaronmbos/streak-counter
```

### Usage

```typescript
import { streakCounter } from "@aaronmbos/streak-counter";

const today = new Date();
const streak = streakCounter(localStoreage, today);
// streak returns an object:
// {
//   currentCount: 1,
//   lastLoginDate: "11/11/2021",
//   startDate: "11/11/2021"
// }
```

