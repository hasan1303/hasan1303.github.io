<template>
  <div class="card p-6 group cursor-default">
    <!-- Accent mark -->
    <div
      class="w-8 h-1 rounded-full mb-5 transition-all duration-300 group-hover:w-12"
      style="background: var(--accent2)"
    />

    <!-- Name -->
    <h3 class="font-display font-bold text-base mb-2">{{ skill.name }}</h3>

    <!-- Description -->
    <p class="text-sm leading-relaxed mb-4" style="color: var(--text2)">
      {{ skill.description }}
    </p>

    <!-- Tags -->
    <div class="flex flex-wrap gap-1.5">
      <span v-for="t in skill.tags" :key="t" class="tag text-xs">{{ t }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Skill } from '~/types'
defineProps<{ skill: Skill }>()
</script>
