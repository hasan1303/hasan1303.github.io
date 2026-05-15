---
title: Tailwind CSS Dark Mode — Patterns That Actually Work in Production
slug: tailwind-dark-mode-patterns
excerpt: After building several projects with dark mode, I've settled on patterns that avoid the common pitfalls — flash of wrong theme, inconsistent colors, and maintenance nightmares.
category: devops
tags: [Tailwind CSS, Dark Mode, CSS]
publishedAt: 2024-10-18
readTime: 8
featured: false
coverEmoji: 🌙
coverColor: "linear-gradient(135deg, #0a0a2e, #050514)"
---

## The flash problem

Every dark mode implementation faces the same enemy: the Flash of Incorrect Theme (FOIT). The page loads, shows light mode for 100ms, then snaps to dark.

The fix: read the preference **before** the page renders.

```html
<!-- In <head>, before any CSS -->
<script>
  const theme = localStorage.getItem('color-mode') || 'dark'
  document.documentElement.classList.add(theme)
</script>
```

Nuxt handles this automatically with `@nuxtjs/color-mode` — it injects this script for you.

## CSS variables over Tailwind classes

Instead of writing `bg-white dark:bg-gray-900` everywhere, I use CSS variables:

```css
:root {
  --bg: #f4f4f8;
  --surface: #ffffff;
  --text: #0f0f1a;
}

.dark {
  --bg: #0a0a0f;
  --surface: #1c1c28;
  --text: #e8e8f0;
}
```

Then in components:

```html
<div style="background: var(--surface); color: var(--text)">
```

One variable change → entire app updates. No need to touch every component when you tweak a color.

## Tailwind config integration

```javascript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      surface: 'var(--surface)',
      'text-primary': 'var(--text)',
    }
  }
}
```

Now you can use `bg-surface` and `text-text-primary` as Tailwind classes while still benefiting from CSS variables.

## The toggle component

```vue
<script setup>
const colorMode = useColorMode()
const toggle = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
```

That's it. `@nuxtjs/color-mode` handles persistence and SSR automatically.
