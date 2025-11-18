This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started (Creating App)

run `npx create-next-app@latest`

AVOID using create-react-app- DEPRECIATED and NOT MAINTAINED.

## Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Installations

1. Tailwind through prompts
2. Typescript
3. Next.js(App Router)

### Creating Layout

1. create a Page.tsx
2. Import components from /components.
   Example:

```
import { useState, useEffect } from 'react';
import HotdogForm from '../components/HotdogForm';
import HotdogList from '../components/HotdogList';

```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Setting up CSS

1. Create module css files.
2. Create global css file.
3. Import css files to page.tsx

```
import { useState, useEffect } from 'react';
import HotdogForm from '../components/HotdogForm';
import HotdogList from '../components/HotdogList';
import styles from '../styles/Home.module.css';
import '../styles/styles.css'
import Image from 'next/image';

```

Note: `import` is global. `import styles` is modular.

Example:

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# hotdog-tracker
