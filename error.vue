<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-6" :style="{ background: 'var(--bg)', color: 'var(--text)' }">
    <div class="text-center max-w-md">
      <div class="font-mono text-8xl font-bold mb-4" style="color: var(--border2)">
        {{ error?.statusCode || '?' }}
      </div>
      <h1 class="font-display font-extrabold text-3xl tracking-tighter mb-4">
        {{ title }}
      </h1>
      <p class="mb-8 text-sm leading-relaxed" style="color: var(--text2)">
        {{ message }}
      </p>
      <div class="flex flex-wrap gap-3 justify-center">
        <a href="/" class="btn-primary">Go Home →</a>
        <button class="btn-secondary" @click="handleError">
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  } | null
}>()

const title = computed(() => {
  switch (props.error?.statusCode) {
    case 404: return 'Page not found'
    case 403: return 'Access denied'
    case 500: return 'Server error'
    default: return 'Something went wrong'
  }
})

const message = computed(() => {
  if (props.error?.statusCode === 404) {
    return "The page you're looking for doesn't exist or has been moved."
  }
  return props.error?.statusMessage || 'An unexpected error occurred. Please try again.'
})

const handleError = () => clearError({ redirect: '/' })
</script>
