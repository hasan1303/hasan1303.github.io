<template>
  <div class="card p-6 group cursor-default">
    <!-- Icon -->
    <div
      class="w-10 h-10 rounded-lg flex items-center justify-center text-xl mb-4 transition-transform duration-300 group-hover:scale-110"
      style="background: rgba(123,110,246,0.1)"
    >
      {{ skill.icon }}
    </div>

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
