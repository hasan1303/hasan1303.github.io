<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8"
    :class="{ 'nav-scrolled': isScrolled }"
    style="height: var(--nav-height)"
  >
    <NuxtLink to="/" class="font-display font-extrabold text-xl tracking-tighter text-gradient">
      hasan<span style="color: var(--accent2)">.</span>dev
    </NuxtLink>

    <ul class="hidden md:flex items-center gap-8 list-none">
      <li v-for="link in navLinks" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="nav-link text-sm font-medium transition-colors duration-200"
          :style="{ color: 'var(--text2)' }"
          active-class="nav-link-active"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>

    <div class="flex items-center gap-3">
      <!-- ClientOnly prevents hydration mismatch on theme icon -->
      <ClientOnly>
        <button
          class="w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all duration-200 theme-btn"
          :style="{ border: '1px solid var(--border2)', color: 'var(--text2)' }"
          :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleColorMode"
        >
          <span>{{ colorMode.value === 'dark' ? '🌙' : '☀️' }}</span>
        </button>
        <template #fallback>
          <div class="w-10 h-10 rounded-lg" :style="{ border: '1px solid var(--border2)' }" />
        </template>
      </ClientOnly>

      <a
        href="https://github.com/hasan1303"
        target="_blank"
        rel="noopener noreferrer"
        class="hidden md:inline-flex btn-primary text-sm"
      >
        GitHub ↗
      </a>

      <button
        class="md:hidden w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-1.5"
        :style="{ border: '1px solid var(--border2)' }"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <span v-for="i in 3" :key="i" class="block w-5 h-px" :style="{ background: 'var(--text2)' }" />
      </button>
    </div>

    <Transition name="mobile-nav">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-40 flex flex-col pt-20 px-6 gap-2"
        :style="{ background: 'var(--bg)' }"
      >
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="font-display font-bold text-2xl py-3 border-b"
          :style="{ color: 'var(--text)', borderColor: 'var(--border)' }"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
        <a
          href="https://github.com/hasan1303"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary mt-4 justify-center"
          @click="mobileOpen = false"
        >
          GitHub ↗
        </a>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const { isScrolled } = useScroll()
const mobileOpen = ref(false)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const route = useRoute()
watch(() => route.path, () => { mobileOpen.value = false })
</script>

<style scoped>
nav {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s, background 0.3s;
}
.nav-scrolled { border-bottom-color: var(--border); }
.dark .nav-scrolled { background: rgba(10,10,15,0.9); }
:not(.dark) .nav-scrolled { background: rgba(244,244,248,0.92); }
.nav-link:hover { color: var(--text) !important; }
.nav-link-active { color: var(--text) !important; }
.theme-btn:hover { background: var(--surface); }
.mobile-nav-enter-active, .mobile-nav-leave-active {
  transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.mobile-nav-enter-from, .mobile-nav-leave-to { opacity: 0; transform: translateY(-16px); }
</style>
