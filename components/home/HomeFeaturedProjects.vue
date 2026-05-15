<template>
  <section class="py-24 px-6 md:px-8" style="background: var(--bg2)">
    <div class="max-w-wide mx-auto">
      <div class="section-label reveal">Portfolio</div>
      <h2 class="font-display font-extrabold tracking-tighter text-4xl md:text-5xl mb-4 reveal reveal-delay-1">
        Featured work
      </h2>
      <p class="text-lg mb-12 reveal reveal-delay-2 max-w-md" style="color: var(--text2)">
        A selection of projects I'm proud of. Each one taught me something new.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectsCard
          v-for="(project, i) in featuredProjects"
          :key="project.id"
          :project="project"
          :class="`reveal reveal-delay-${Math.min(i + 1, 3)}`"
        />
      </div>

      <div class="text-center mt-10 reveal">
        <NuxtLink to="/projects" class="btn-secondary">
          View all projects →
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { projects } from '~/utils/data'

const featuredProjects = computed(() => projects.filter(p => p.featured).slice(0, 3))
</script>
