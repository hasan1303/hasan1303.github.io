<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (title) =>
    title && title !== 'Hasan — Frontend Developer'
      ? `${title} — Hasan`
      : 'Hasan — Frontend Developer | Vue.js & Nuxt 3',
  htmlAttrs: { lang: 'sq' },
})

useSeoMeta({
  ogSiteName: 'Hasan Portfolio',
  twitterCard: 'summary_large_image',
  author: 'Hasan',
})
</script>
