<template>
  <NuxtLink :to="`/blog/${post.slug}`" class="card block overflow-hidden group">
    <!-- Cover -->
    <div
      class="h-44 flex items-center justify-center text-4xl relative overflow-hidden"
      :style="{ background: post.coverColor || 'var(--surface2)' }"
    >
      <span class="transition-transform duration-500 group-hover:scale-110">
        {{ post.coverEmoji }}
      </span>
    </div>

    <!-- Body -->
    <div class="p-5">
      <!-- Meta -->
      <div class="flex items-center gap-3 mb-3">
        <span
          class="px-2.5 py-0.5 rounded-full font-mono text-xs"
          :style="{
            color: categoryConfig?.color,
            background: categoryConfig?.bgColor,
            border: `1px solid ${categoryConfig?.borderColor}`
          }"
        >
          {{ categoryConfig?.label }}
        </span>
        <span class="font-mono text-xs" style="color: var(--text3)">
          {{ formatDate(post.publishedAt) }}
        </span>
      </div>

      <!-- Title -->
      <h3 class="font-display font-bold text-base leading-snug mb-2 line-clamp-2">
        {{ post.title }}
      </h3>

      <!-- Excerpt -->
      <p class="text-sm leading-relaxed line-clamp-2 mb-4" style="color: var(--text2)">
        {{ post.excerpt }}
      </p>

      <!-- Footer -->
      <div
        class="flex items-center justify-between pt-4"
        style="border-top: 1px solid var(--border)"
      >
        <span class="font-mono text-xs" style="color: var(--text3)">
          ⏱ {{ post.readTime }} min read
        </span>
        <div class="flex flex-wrap gap-1.5">
          <span v-for="tag in post.tags.slice(0, 2)" :key="tag" class="tag text-xs">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types'
import { blogCategories } from '~/utils/data'

const props = defineProps<{ post: BlogPost }>()

const categoryConfig = computed(() =>
  blogCategories.find(c => c.slug === props.post.category)
)

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
