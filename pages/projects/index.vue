<template>
  <div>
    <section class="pt-28 pb-24 px-6 md:px-8">
      <div class="max-w-wide mx-auto">
        <!-- Header -->
        <div class="section-label reveal">Portfolio</div>
        <h1 class="font-display font-extrabold tracking-tighter text-5xl md:text-6xl mb-4 reveal reveal-delay-1">
          All Projects
        </h1>
        <p class="text-lg mb-10 max-w-md reveal reveal-delay-2" style="color: var(--text2)">
          A complete view of my work — from weekend experiments to production systems.
        </p>

        <!-- Filter buttons -->
        <div class="flex flex-wrap gap-2 mb-10 reveal reveal-delay-3">
          <button
            v-for="filter in techFilters"
            :key="filter.value"
            class="px-4 py-2 rounded-full font-mono text-xs transition-all duration-200"
            :style="{
              background: activeFilter === filter.value ? 'var(--accent)' : 'transparent',
              border: `1px solid ${activeFilter === filter.value ? 'var(--accent)' : 'var(--border)'}`,
              color: activeFilter === filter.value ? '#fff' : 'var(--text2)'
            }"
            @click="setFilter(filter.value)"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- Projects grid -->
        <Transition name="grid-fade" mode="out-in">
          <div
            :key="activeFilter"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <ProjectsCard
              v-for="project in filteredProjects"
              :key="project.id"
              :project="project"
              class="reveal"
            />
          </div>
        </Transition>

        <!-- Empty state -->
        <div
          v-if="!filteredProjects.length"
          class="text-center py-20 font-mono text-sm"
          style="color: var(--text3)"
        >
          No projects found for this filter.
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { projects, techFilters } from '~/utils/data'

useSEO({
  title: 'Projects',
  description: 'A complete portfolio of full-stack projects — from distributed databases to AI-powered applications.',
})

const activeFilter = ref('all')

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter((p) => {
    const tags = p.technologies.map(t => t.toLowerCase())
    const status = p.status
    const filter = activeFilter.value
    return (
      tags.some(t => t.includes(filter)) ||
      status.includes(filter) ||
      (filter === 'oss' && status === 'open-source')
    )
  })
})

function setFilter(f: string) {
  activeFilter.value = f
  nextTick(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      el.classList.add('visible')
    })
  })
}
</script>

<style scoped>
.grid-fade-enter-active,
.grid-fade-leave-active {
  transition: opacity 0.2s ease;
}
.grid-fade-enter-from,
.grid-fade-leave-to {
  opacity: 0;
}
</style>
