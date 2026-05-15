<template>
  <div class="min-h-screen flex flex-col" :style="{ background: 'var(--bg)', color: 'var(--text)' }">
    <AppNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <AppToast />
  </div>
</template>

<script setup lang="ts">
function initReveal() {
  if (!import.meta.client) return
  const elements = document.querySelectorAll('.reveal:not(.visible)')
  if (!elements.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08 }
  )
  elements.forEach((el) => observer.observe(el))
}

onMounted(() => { setTimeout(initReveal, 100) })

const route = useRoute()
watch(() => route.path, () => {
  nextTick(() => setTimeout(initReveal, 150))
})
</script>
