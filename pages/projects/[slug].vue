<template>
  <div v-if="project">
    <div class="reading-progress">
      <div class="reading-progress-bar" :style="{ width: `${progress}%` }" />
    </div>

    <div class="pt-24 pb-12 px-6 md:px-8" style="background: var(--surface); border-bottom: 1px solid var(--border)">
      <div class="max-w-content mx-auto">
        <NuxtLink to="/projects" class="inline-flex items-center gap-2 font-mono text-sm mb-8 transition-colors duration-200" style="color: var(--text2)">
          ← Back to Projects
        </NuxtLink>

        <div class="flex flex-wrap gap-2 mb-6">
          <span class="tag text-xs">{{ project.status }}</span>
          <span v-if="project.stars" class="tag text-xs">⭐ {{ formatStars(project.stars) }}</span>
        </div>

        <h1 class="font-display font-extrabold tracking-tighter text-4xl md:text-5xl lg:text-6xl mb-4">
          {{ project.name }}
        </h1>

        <p class="text-lg leading-relaxed mb-8" style="color: var(--text2)">
          {{ project.description }}
        </p>

        <div class="flex flex-wrap gap-8 py-6" style="border-top: 1px solid var(--border); border-bottom: 1px solid var(--border)">
          <div v-for="meta in projectMeta" :key="meta.label">
            <label class="font-mono text-xs uppercase tracking-wider block mb-1" style="color: var(--text3)">{{ meta.label }}</label>
            <span class="text-sm font-medium">{{ meta.value }}</span>
          </div>
        </div>

        <div class="flex flex-wrap gap-3 mt-8">
          <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer" class="btn-primary">↗ View on GitHub</a>
          <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener noreferrer" class="btn-secondary">Live Demo →</a>
        </div>
      </div>
    </div>

    <div v-if="project.highlights?.length" class="px-6 md:px-8 py-12">
      <div class="max-w-content mx-auto">
        <h2 class="font-display font-bold text-xl mb-6">Key Results</h2>
        <ul class="space-y-3">
          <li v-for="h in project.highlights" :key="h" class="flex items-center gap-3 text-sm" style="color: var(--text2)">
            <span style="color: var(--green)">✓</span> {{ h }}
          </li>
        </ul>
      </div>
    </div>

    <div class="px-6 md:px-8 pb-24">
      <div class="max-w-content mx-auto">
        <h2 class="font-display font-bold text-xl mb-6">Technologies Used</h2>
        <div class="flex flex-wrap gap-2">
          <span v-for="tech in project.technologies" :key="tech" class="tag">{{ tech }}</span>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="pt-40 pb-24 px-6 text-center">
    <div class="font-mono text-6xl mb-4">404</div>
    <h1 class="font-display font-bold text-2xl mb-4">Project not found</h1>
    <NuxtLink to="/projects" class="btn-secondary">← Back to Projects</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { projects } from '~/utils/data'

const route = useRoute()
const { progress } = useReadingProgress()

const project = computed(() => projects.find(p => p.slug === route.params.slug as string))

const projectMeta = computed(() => project.value ? [
  { label: 'Period', value: project.value.period },
  { label: 'Role', value: project.value.role },
  { label: 'Stack', value: project.value.stack },
] : [])

function formatStars(n: number): string {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)
}

watchEffect(() => {
  if (project.value) {
    useHead({
      title: project.value.name,
      meta: [{ name: 'description', content: project.value.description }],
    })
  }
})
</script>
