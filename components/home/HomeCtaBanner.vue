<template>
  <section class="py-24 px-6 md:px-8">
    <div class="max-w-wide mx-auto">
      <div
        class="rounded-2xl p-12 md:p-16 text-center reveal"
        style="
          background: linear-gradient(135deg, rgba(123,110,246,0.1), rgba(34,211,238,0.05));
          border: 1px solid rgba(123,110,246,0.2)
        "
      >
        <div class="font-mono text-xs uppercase tracking-widest mb-6" style="color: var(--accent2)">
          Let's work together
        </div>
        <h2 class="font-display font-extrabold tracking-tighter text-4xl md:text-5xl mb-4">
          Got a project in mind?
        </h2>
        <p class="text-lg mx-auto mb-8 max-w-md" style="color: var(--text2)">
          I'm currently available for new projects. Let's build something remarkable together.
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <NuxtLink to="/contact" class="btn-primary">
            Start a conversation →
          </NuxtLink>
          <a href="mailto:hello@alexmercer.dev" class="btn-secondary">
            hello@alexmercer.dev
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
