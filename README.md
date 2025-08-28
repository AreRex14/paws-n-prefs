# Paws & Preferences 🐾

A fun Vue 3 app where you discover random cat images and lets you like or dislike cats and view a summary of your favorites. !

## Features

- Swipe right to like a cat, left to dislike (supports both touch and mouse).
- Fetches random cat images from [cataas.com](https://cataas.com/).
- Responsive and mobile-friendly UI.
- View a summary of all the cats you liked.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Getting Started

### Clone the repository

```sh
git clone https://github.com/AreRex14/paws-n-prefs.git
cd paws-n-prefs
```

### Install dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Project Structure

- `src/components/` – UI components (CatCard, SwipeArea, LikeSummary)
- `src/stores/` – Pinia store for managing cat state
- `src/services/` – API calls to fetch cat images
- `src/App.vue` – Main app logic and layout

## How It Works

1. The app fetches 10 random cat images on load.
2. Swipe (or drag) the cat card right to like, left to dislike.
3. When all cats are reviewed, see a summary of your liked cats.

## Credits

- Cat images from [cataas.com](https://cataas.com/)
- Built with [Vue 3](https://vuejs.org/), [Vite](https://vite.dev/), [TypeScript](typescriptlang.org), [Pinia](https://pinia.vuejs.org/) and [TailwindCSS](https://tailwindcss.com)

---

Made with ❤️ by [realloz14](https://@realloz14.bsky.social)
