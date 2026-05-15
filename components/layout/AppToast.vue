<template>
  <Teleport to="body">
    <div
      v-for="toast in toastStore.toasts"
      :key="toast.id"
      class="toast"
      :class="{ show: toast.visible }"
    >
      <div
        class="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
        :style="{
          background: toast.type === 'success' ? 'rgba(62,207,142,0.15)' : toast.type === 'error' ? 'rgba(239,68,68,0.15)' : 'rgba(123,110,246,0.15)',
          color: toast.type === 'success' ? 'var(--green)' : toast.type === 'error' ? '#ef4444' : 'var(--accent2)'
        }"
      >
        {{ toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'i' }}
      </div>
      <span>{{ toast.message }}</span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToastStore } from '~/stores/toast'

const toastStore = useToastStore()
</script>
