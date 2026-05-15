<template>
  <div
    class="overflow-hidden py-4"
    style="background: linear-gradient(135deg, rgba(123,110,246,0.06), rgba(34,211,238,0.03));
           border-top: 1px solid var(--border); border-bottom: 1px solid var(--border)"
  >
    <div class="marquee-track gap-10">
      <!-- Duplicate items for seamless loop -->
      <template v-for="_ in 2" :key="_">
        <div
          v-for="item in techMarqueeItems"
          :key="`${_}-${item}`"
          class="flex items-center gap-3 flex-shrink-0 font-mono text-xs"
          style="color: var(--text3)"
        >
          <div class="w-1 h-1 rounded-full flex-shrink-0" style="background: var(--accent)" />
          {{ item }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { techMarqueeItems } from '~/utils/data'
</script>
