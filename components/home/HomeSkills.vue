<template>
  <section class="py-24 px-6 md:px-8" style="background: var(--bg2)">
    <div class="max-w-wide mx-auto">
      <div class="section-label reveal">Capabilities</div>
      <h2 class="font-display font-extrabold tracking-tighter text-4xl md:text-5xl mb-4 reveal reveal-delay-1">
        What I do best
      </h2>
      <p class="text-lg mb-12 reveal reveal-delay-2 max-w-lg" style="color: var(--text2)">
        Specializing in the full spectrum of web development, from cloud infrastructure to pixel-perfect interfaces.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <UiSkillCard
          v-for="(skill, i) in skills"
          :key="skill.id"
          :skill="skill"
          :class="`reveal reveal-delay-${Math.min(i % 3 + 1, 3)}`"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { skills } from '~/utils/data'
</script>
