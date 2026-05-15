---
title: Headless WordPress + Vue.js — Why I Chose This Stack
slug: headless-wordpress-vue
excerpt: WordPress gives you the best CMS. Vue gives you the best frontend DX. Using them together via REST API is easier than you'd think.
category: architecture
tags: [WordPress, Vue.js, Headless CMS]
publishedAt: 2024-09-10
readTime: 12
featured: true
coverEmoji: 🌐
coverColor: "linear-gradient(135deg, #1e0a2e, #0d0415)"
---

## Why headless WordPress?

Clients know WordPress. They know how to write posts, upload images, manage menus. That institutional knowledge is valuable — throwing it away for a new CMS has a real cost.

Headless WordPress lets you keep the WordPress admin (which clients love) and replace the frontend with Vue.js (which developers love).

## The REST API is already there

WordPress ships with a full REST API at `/wp-json/wp/v2/`. No plugins required for basic usage.

```javascript
// composables/useWordPress.js
export function usePosts() {
  const posts = ref([])

  async function fetchPosts(params = {}) {
    const query = new URLSearchParams({
      _fields: 'id,slug,title,excerpt,date,categories',
      per_page: 10,
      ...params
    })

    const res = await fetch(
      `https://your-site.com/wp-json/wp/v2/posts?${query}`
    )
    posts.value = await res.json()
  }

  return { posts, fetchPosts }
}
```

## Nuxt integration

With Nuxt, you get SSR for free — the WordPress content is fetched server-side and sent as pre-rendered HTML:

```vue
<script setup>
const { data: posts } = await useAsyncData('posts', () =>
  $fetch('https://your-site.com/wp-json/wp/v2/posts?_fields=id,slug,title,excerpt')
)
</script>
```

## When to use this stack

Use headless WordPress when: the client already has a WordPress site, non-technical editors need to manage content, and you want a modern frontend without abandoning the CMS.

Don't use it for developer blogs or projects where you control all the content — Nuxt Content with Markdown is simpler and faster for that.
