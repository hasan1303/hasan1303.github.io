<template>
  <footer :style="{ background: 'var(--surface)', borderTop: '1px solid var(--border)' }" class="mt-auto">
    <div class="max-w-wide mx-auto px-6 md:px-8 pt-12 pb-8">
      <div class="flex flex-col md:flex-row justify-between gap-10 mb-10">
        <div class="max-w-xs">
          <div class="font-display font-extrabold text-xl tracking-tighter text-gradient mb-3">
            hasan<span style="color: var(--accent2)">.</span>dev
          </div>
          <p class="text-sm leading-relaxed" :style="{ color: 'var(--text2)' }">
            Frontend developer building with Vue.js, Nuxt, and Tailwind CSS.
            All projects are open source on GitHub.
          </p>
          <div class="flex items-center gap-2 mt-4">
            <div class="status-dot" />
            <span class="text-xs font-mono" :style="{ color: 'var(--text2)' }">Open to new opportunities</span>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div v-for="group in linkGroups" :key="group.title">
            <h5 class="font-mono text-xs uppercase tracking-widest mb-4" :style="{ color: 'var(--text3)' }">
              {{ group.title }}
            </h5>
            <ul class="space-y-2.5 list-none">
              <li v-for="link in group.links" :key="link.label">
                <a
                  v-if="link.external"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-link text-sm"
                >{{ link.label }}</a>
                <NuxtLink
                  v-else
                  :to="link.href"
                  class="footer-link text-sm"
                >{{ link.label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-center gap-4 pt-6"
        :style="{ borderTop: '1px solid var(--border)' }">
        <p class="font-mono text-xs" :style="{ color: 'var(--text3)' }">
          © {{ currentYear }} Hasan. Built with Nuxt 3 + Tailwind CSS.
        </p>
        <div class="flex gap-3">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            :aria-label="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="social-btn w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs"
            :style="{ border: '1px solid var(--border2)', color: 'var(--text2)' }"
          >{{ social.short }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()

const linkGroups = [
  {
    title: 'Navigate',
    links: [
      { label: 'Home', href: '/', external: false },
      { label: 'About', href: '/about', external: false },
      { label: 'Projects', href: '/projects', external: false },
      { label: 'Blog', href: '/blog', external: false },
      { label: 'Contact', href: '/contact', external: false },
    ],
  },
  {
    title: 'Projects',
    links: [
      { label: 'ProjectFlow', href: 'https://github.com/hasan1303/projectflow', external: true },
      { label: 'Expense Tracker', href: 'https://github.com/hasan1303/smart-expense-tracker-vue', external: true },
      { label: 'Task Dashboard', href: 'https://github.com/hasan1303/task-dashboard', external: true },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'GitHub', href: 'https://github.com/hasan1303', external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
      { label: 'Email', href: '/contact', external: false },
    ],
  },
]

const socials = [
  { label: 'GitHub', short: 'GH', href: 'https://github.com/hasan1303' },
  { label: 'LinkedIn', short: 'LI', href: 'https://linkedin.com' },
]
</script>

<style scoped>
.footer-link {
  color: var(--text2);
  text-decoration: none;
  transition: color 0.2s;
}
.footer-link:hover { color: var(--text); }
.social-btn { transition: background 0.2s; }
.social-btn:hover { background: var(--surface2); }
</style>
