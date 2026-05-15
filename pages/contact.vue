<template>
  <div class="pt-28 pb-24 px-6 md:px-8">
    <div class="max-w-wide mx-auto">
      <div class="section-label reveal">Get in touch</div>
      <h1 class="font-display font-extrabold tracking-tighter text-5xl md:text-6xl mb-4 reveal reveal-delay-1">
        Let's build something
      </h1>
      <p class="text-lg mb-12 max-w-md reveal reveal-delay-2" style="color: var(--text2)">
        Whether you have a project in mind, want to collaborate, or just want to say hi — my inbox is open.
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-14">
        <div class="space-y-6 reveal">
          <div v-for="item in contactItems" :key="item.label" class="flex items-start gap-4">
            <div class="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0 mt-0.5" style="background: rgba(123,110,246,0.1)">
              {{ item.icon }}
            </div>
            <div>
              <h4 class="font-medium text-sm mb-0.5">{{ item.label }}</h4>
              <p class="font-mono text-sm" style="color: var(--text2)">{{ item.value }}</p>
            </div>
          </div>

          <div class="card p-5 mt-4">
            <div class="flex items-center gap-2.5 mb-2">
              <div class="status-dot" />
              <span class="font-medium text-sm">Available for new projects</span>
            </div>
            <p class="text-sm leading-relaxed" style="color: var(--text2)">
              I'm currently accepting new freelance projects. Response time is usually within 24 hours.
            </p>
          </div>
        </div>

        <div class="card p-8 reveal reveal-delay-2">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div>
              <label class="form-label">First name *</label>
              <input v-model="form.firstName" type="text" placeholder="John" class="form-input"
                :style="{ borderColor: errors.firstName ? '#ef4444' : '' }">
              <p v-if="errors.firstName" class="text-xs mt-1 font-mono" style="color: #ef4444">{{ errors.firstName }}</p>
            </div>
            <div>
              <label class="form-label">Last name</label>
              <input v-model="form.lastName" type="text" placeholder="Doe" class="form-input">
            </div>
          </div>

          <div class="mb-5">
            <label class="form-label">Email *</label>
            <input v-model="form.email" type="email" placeholder="john@example.com" class="form-input"
              :style="{ borderColor: errors.email ? '#ef4444' : '' }">
            <p v-if="errors.email" class="text-xs mt-1 font-mono" style="color: #ef4444">{{ errors.email }}</p>
          </div>

          <div class="mb-5">
            <label class="form-label">Subject</label>
            <input v-model="form.subject" type="text" placeholder="Project inquiry..." class="form-input">
          </div>

          <div class="mb-6">
            <label class="form-label">Message *</label>
            <textarea v-model="form.message" rows="5" placeholder="Tell me about your project..." class="form-input resize-y"
              :style="{ borderColor: errors.message ? '#ef4444' : '' }" />
            <p v-if="errors.message" class="text-xs mt-1 font-mono" style="color: #ef4444">{{ errors.message }}</p>
          </div>

          <button
            class="w-full btn-primary justify-center text-base"
            :disabled="isSubmitting"
            :style="{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }"
            @click="handleSubmit"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Message →' }}
          </button>

          <div v-if="successMsg" class="mt-4 p-4 rounded-lg text-sm font-mono text-center"
            style="background: rgba(62,207,142,0.1); border: 1px solid rgba(62,207,142,0.3); color: var(--green)">
            {{ successMsg }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Contact — Alex Mercer' })

const isSubmitting = ref(false)
const successMsg = ref('')

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
})

const errors = reactive<Record<string, string>>({})

function validate(): boolean {
  Object.keys(errors).forEach(k => delete errors[k])
  let valid = true
  if (!form.firstName.trim()) { errors.firstName = 'Required'; valid = false }
  if (!form.email.trim()) { errors.email = 'Required'; valid = false }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = 'Invalid email'; valid = false }
  if (form.message.trim().length < 10) { errors.message = 'At least 10 characters'; valid = false }
  return valid
}

async function handleSubmit() {
  if (!validate()) return
  isSubmitting.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    successMsg.value = "✓ Message sent! I'll get back to you within 24 hours."
    Object.assign(form, { firstName: '', lastName: '', email: '', subject: '', message: '' })
  } catch {
    errors.message = 'Something went wrong. Email me directly at hello@alexmercer.dev'
  } finally {
    isSubmitting.value = false
  }
}

const contactItems = [
  { icon: '📧', label: 'Email', value: 'hello@alexmercer.dev' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/alexmercer' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/alexmercer' },
  { icon: '🐦', label: 'Twitter / X', value: '@alexmercer_dev' },
]
</script>
