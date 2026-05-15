---
title: Pinia + localStorage — Persisting State the Right Way in Vue.js
slug: pinia-localstorage-persistence
excerpt: How I built the persistence layer for ProjectFlow using a custom Pinia plugin — handles serialization, hydration, and edge cases cleanly.
category: frontend
tags: [Pinia, Vue.js, localStorage]
publishedAt: 2024-09-30
readTime: 7
featured: false
coverEmoji: 💾
coverColor: "linear-gradient(135deg, #1a0a2e, #0e0516)"
---

## The naive approach (don't do this)

```javascript
// Bad — scattered, repetitive, error-prone
const store = defineStore('tasks', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]')
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task)
      localStorage.setItem('tasks', JSON.stringify(this.tasks)) // repeated everywhere
    }
  }
})
```

## A clean composable approach

```javascript
// composables/useLocalStorage.js
export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key)
  const data = ref(stored ? JSON.parse(stored) : defaultValue)

  watch(data, (val) => {
    localStorage.setItem(key, JSON.stringify(val))
  }, { deep: true })

  return data
}
```

```javascript
// stores/tasks.js
export const useTaskStore = defineStore('tasks', () => {
  const tasks = useLocalStorage('tasks', [])
  const projects = useLocalStorage('projects', [])

  function addTask(projectId, task) {
    const project = projects.value.find(p => p.id === projectId)
    project?.tasks.push({ ...task, id: Date.now() })
  }

  return { tasks, projects, addTask }
})
```

## Handling SSR

localStorage doesn't exist on the server. Always guard it:

```javascript
const stored = import.meta.client 
  ? localStorage.getItem(key) 
  : null
```

## What I use in production

For serious projects, `pinia-plugin-persistedstate` handles all edge cases including SSR, custom serializers, and partial state persistence. For smaller projects like my expense tracker, the composable above is sufficient.
