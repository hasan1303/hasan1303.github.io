<template>
  <div class="pt-28 pb-24 px-6 md:px-8">
    <div class="max-w-wide mx-auto">
      <div class="section-label reveal">About me</div>
      <h1 class="font-display font-extrabold tracking-tighter text-5xl md:text-6xl mb-12 reveal reveal-delay-1">
        Developer, builder,<br>open-source enthusiast
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <!-- Left: Bio -->
        <div class="reveal">
          <!-- Avatar from GitHub -->
          <div class="mb-8">
            <img
              src="https://avatars.githubusercontent.com/u/267438241?v=4"
              alt="Hasan — Frontend Developer"
              class="w-40 h-40 rounded-2xl object-cover"
              style="border: 2px solid var(--border2)"
              loading="lazy"
            >
          </div>

          <div class="space-y-4 text-base leading-relaxed" style="color: var(--text2)">
            <p>
              Hey, I'm <strong style="color: var(--text)">Hasan</strong> — a self-taught frontend developer
              passionate about building web applications that are clean, fast, and enjoyable to use.
            </p>
            <p>
              I started my development journey through self-study, diving deep into HTML, CSS, and JavaScript
              before discovering Vue.js — which quickly became my primary framework. I love how Vue's
              Composition API makes logic reusable and code maintainable.
            </p>
            <p>
              My projects — like <strong style="color: var(--text)">ProjectFlow</strong> (a Kanban app with
              native drag & drop) and <strong style="color: var(--text)">Smart Expense Tracker</strong>
              (a finance dashboard with Chart.js) — show my approach: build something real, make it polished,
              ship it.
            </p>
            <p>
              I'm currently looking for my next opportunity to contribute to a product team and grow as a developer.
              If you're looking for a motivated frontend developer who cares about clean code and great UX,
              let's talk.
            </p>
          </div>

          <div class="flex flex-wrap gap-3 mt-8">
            <a
              href="https://github.com/hasan1303"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary"
            >
              ↗ GitHub Profile
            </a>
            <NuxtLink to="/contact" class="btn-secondary">
              Get in touch
            </NuxtLink>
          </div>
        </div>

        <!-- Right: Sidebar cards -->
        <div class="flex flex-col gap-5 reveal reveal-delay-2">
          <div class="card p-6">
            <h4 class="font-display font-bold mb-4">🛠 Tech Stack</h4>
            <ul class="space-y-2.5 list-none">
              <li v-for="item in techStack" :key="item" class="flex items-center gap-2.5 font-mono text-sm" style="color: var(--text2)">
                <span style="color: var(--accent2)">→</span>
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="card p-6">
            <h4 class="font-display font-bold mb-4">📍 Quick Facts</h4>
            <ul class="space-y-2.5 list-none">
              <li v-for="fact in quickFacts" :key="fact" class="flex items-center gap-2.5 font-mono text-sm" style="color: var(--text2)">
                <span style="color: var(--accent2)">→</span>
                {{ fact }}
              </li>
            </ul>
          </div>

          <div class="card p-6">
            <h4 class="font-display font-bold mb-4">🎯 Interests</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="interest in interests" :key="interest" class="tag flex items-center gap-1.5 text-xs">
                {{ interest }}
              </span>
            </div>
          </div>

          <!-- GitHub repos preview -->
          <div class="card p-6">
            <h4 class="font-display font-bold mb-4">📦 On GitHub</h4>
            <ul class="space-y-3 list-none">
              <li v-for="repo in githubRepos" :key="repo.name">
                <a
                  :href="repo.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-start justify-between gap-3 group"
                >
                  <div>
                    <div class="text-sm font-medium group-hover:underline" style="color: var(--accent2)">
                      {{ repo.name }}
                    </div>
                    <div class="text-xs mt-0.5" style="color: var(--text3)">{{ repo.desc }}</div>
                  </div>
                  <span class="font-mono text-xs flex-shrink-0 mt-0.5" style="color: var(--text3)">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSEO({
  title: 'About',
  description: 'Frontend Developer specializing in Vue.js. Self-taught, open-source contributor, building clean web apps.',
})

const techStack = [
  'Vue.js 3 + Composition API',
  'Nuxt 3 (SSR/SSG)',
  'Tailwind CSS + CSS3',
  'Pinia (state management)',
  'Chart.js (data visualization)',
  'WordPress + PHP',
  'Vite + GitHub Actions',
]

const quickFacts = [
  'Self-taught frontend developer',
  'Open to remote opportunities',
  'Active on GitHub — hasan1303',
  'Building in public',
  'Vue.js & WordPress focused',
]

const interests = [
  '⚡ Vue.js ecosystem',
  '🎨 Clean UI/UX',
  '🌙 Dark mode everything',
  '📊 Data visualization',
  '🔧 Dev tooling',
  '🌐 Open source',
]

const githubRepos = [
  { name: 'projectflow', desc: 'Kanban task manager · Vue.js 3', url: 'https://github.com/hasan1303/projectflow' },
  { name: 'smart-expense-tracker-vue', desc: 'Finance dashboard · Chart.js', url: 'https://github.com/hasan1303/smart-expense-tracker-vue' },
  { name: 'task-dashboard', desc: 'Task management UI · JS', url: 'https://github.com/hasan1303/task-dashboard' },
]
</script>
