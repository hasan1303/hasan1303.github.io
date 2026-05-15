<template>
  <section class="py-24 px-6 md:px-8">
    <div class="max-w-wide mx-auto">
      <div class="section-label reveal">Experience</div>
      <h2 class="font-display font-extrabold tracking-tighter text-4xl md:text-5xl mb-12 reveal reveal-delay-1">
        Where I've worked
      </h2>

      <div class="relative pl-8" style="border-left: 1px solid var(--border2)">
        <div
          v-for="(job, i) in experience"
          :key="job.id"
          class="pb-10 relative"
          :class="`reveal reveal-delay-${Math.min(i + 1, 4)}`"
        >
          <!-- Timeline dot -->
          <div
            class="absolute -left-[20.5px] top-1.5 w-2.5 h-2.5 rounded-full"
            :style="{
              background: job.current ? 'var(--accent)' : 'var(--surface2)',
              border: '2px solid var(--bg)',
              boxShadow: job.current ? '0 0 10px rgba(123,110,246,0.5)' : 'none'
            }"
          />

          <!-- Period -->
          <div class="font-mono text-xs mb-2" style="color: var(--text3)">{{ job.period }}</div>

          <!-- Role & company -->
          <div class="font-display font-bold text-lg mb-1">{{ job.role }}</div>
          <div class="text-sm mb-3" style="color: var(--accent2)">
            {{ job.company }} · {{ job.location }}
          </div>

          <!-- Description -->
          <p class="text-sm leading-relaxed max-w-lg" style="color: var(--text2)">
            {{ job.description }}
          </p>

          <!-- Tech tags -->
          <div v-if="job.technologies?.length" class="flex flex-wrap gap-2 mt-3">
            <span
              v-for="tech in job.technologies"
              :key="tech"
              class="tag text-xs"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { experience } from '~/utils/data'
</script>
