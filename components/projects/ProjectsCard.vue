<template>
  <NuxtLink :to="`/projects/${project.slug}`" class="card block overflow-hidden group">
    <!-- Cover image -->
    <div class="h-48 relative overflow-hidden flex items-center justify-center"
      :style="{ background: project.coverGradient }">
      <img
        v-if="project.previewImage"
        :src="project.previewImage"
        :alt="`${project.name} preview`"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      >
      <span v-else class="text-5xl transition-transform duration-500 group-hover:scale-110 relative z-10">
        {{ project.coverEmoji }}
      </span>
      <div class="absolute inset-0"
        style="background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55))" />
      <div v-if="project.previewImage" class="absolute bottom-3 left-4 right-4 z-10">
        <div class="font-display font-bold text-white text-sm drop-shadow">{{ project.name }}</div>
      </div>
    </div>

    <!-- Body -->
    <div class="p-5">
      <div class="flex items-start justify-between gap-3 mb-3">
        <h3 class="font-display font-bold text-lg leading-tight">{{ project.name }}</h3>
        <span
          v-if="project.status === 'open-source'"
          class="flex-shrink-0 px-2.5 py-0.5 rounded-full font-mono text-xs"
          style="background: rgba(62,207,142,0.12); border: 1px solid rgba(62,207,142,0.25); color: var(--green)"
        >OSS</span>
      </div>

      <p class="text-sm leading-relaxed mb-4" style="color: var(--text2)">
        {{ project.description }}
      </p>

      <div class="flex flex-wrap gap-1.5 mb-4">
        <span v-for="tech in project.technologies.slice(0, 4)" :key="tech" class="tag text-xs">
          {{ tech }}
        </span>
      </div>

      <div class="flex gap-2 pt-4" style="border-top: 1px solid var(--border)">
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="proj-link px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-1.5"
          style="border: 1px solid var(--border2); color: var(--text2)"
          @click.stop
        >↗ GitHub</a>
        <a
          v-if="project.demoUrl"
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="px-3 py-1.5 rounded-lg font-mono text-xs flex items-center gap-1.5 transition-all duration-200"
          style="background: var(--accent); color: #fff; border: 1px solid var(--accent)"
          @click.stop
        >Live Demo</a>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Project } from '~/types'
defineProps<{ project: Project }>()
</script>

<style scoped>
.proj-link { transition: background 0.2s; }
.proj-link:hover { background: var(--surface2); }
</style>
