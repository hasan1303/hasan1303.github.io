import { defineStore } from 'pinia'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  visible: boolean
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([])

  function show(message: string, type: Toast['type'] = 'success', duration = 3500) {
    const id = `toast-${Date.now()}`
    const toast: Toast = { id, message, type, visible: false }
    toasts.value.push(toast)

    nextTick(() => { toast.visible = true })

    setTimeout(() => {
      toast.visible = false
      setTimeout(() => {
        toasts.value = toasts.value.filter(t => t.id !== id)
      }, 400)
    }, duration)
  }

  return { toasts, show }
})
