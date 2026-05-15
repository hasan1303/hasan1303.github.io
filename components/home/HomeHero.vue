<template>
  <section class="hero relative min-h-[calc(100vh-var(--nav-height))] flex items-center overflow-hidden px-6 md:px-8 pt-16 pb-12">
    <div class="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
    <div class="absolute top-[-20%] left-[20%] w-[600px] h-[600px] pointer-events-none"
      style="background: radial-gradient(circle, rgba(123,110,246,0.15) 0%, transparent 70%)" />
    <div class="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] pointer-events-none"
      style="background: radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)" />

    <div class="max-w-wide mx-auto w-full relative z-10">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 font-mono text-xs hero-anim"
        style="border: 1px solid rgba(123,110,246,0.3); background: rgba(123,110,246,0.08); color: var(--accent2); animation-delay: 0s">
        <span class="status-dot" />
        Open to new opportunities
      </div>

      <h1 class="font-display font-extrabold tracking-tighter leading-extra-tight mb-6 hero-anim"
        style="font-size: clamp(3rem, 7vw, 5.5rem); animation-delay: 0.1s">
        Hi, I'm <span class="text-gradient">Hasan</span> —<br>
        I build with <span class="text-gradient">Vue.js</span>
      </h1>

      <p class="text-lg md:text-xl leading-relaxed max-w-xl mb-10 hero-anim"
        style="color: var(--text2); animation-delay: 0.2s">
        Frontend developer focused on creating clean, responsive web applications.
        I love turning ideas into polished products with Vue.js, Nuxt, and modern CSS.
      </p>

      <div class="flex flex-wrap gap-4 hero-anim" style="animation-delay: 0.3s">
        <NuxtLink to="/projects" class="btn-primary">
          View Projects <span>→</span>
        </NuxtLink>
        <a href="https://github.com/hasan1303" target="_blank" rel="noopener noreferrer" class="btn-secondary">
          GitHub Profile ↗
        </a>
      </div>

      <div class="flex flex-wrap gap-8 md:gap-12 mt-14 pt-8 hero-anim"
        style="border-top: 1px solid var(--border); animation-delay: 0.4s">
        <div v-for="stat in stats" :key="stat.label">
          <div class="font-display font-extrabold text-3xl tracking-tighter">{{ stat.value }}</div>
          <div class="font-mono text-xs mt-1" style="color: var(--text3)">{{ stat.label }}</div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 mt-6 hero-anim" style="animation-delay: 0.5s">
        <span v-for="t in quickTech" :key="t" class="tag text-xs">{{ t }}</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { stats } from '~/utils/data'
const quickTech = ['Vue.js 3', 'Nuxt 3', 'Tailwind CSS', 'Pinia', 'Chart.js', 'WordPress']
</script>

<style scoped>
@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.hero-anim {
  opacity: 0;
  animation: heroFadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
