---
title: Vue 3 Composition API — From Options API to Composables
slug: vue3-composition-api-guide
excerpt: How I rewrote a complex Vue 2 app using the Composition API and what I learned about code organization, reusability, and testability.
category: frontend
tags: [Vue.js, Composition API, JavaScript]
publishedAt: 2024-12-10
readTime: 10
featured: true
coverEmoji: ⚡
coverColor: "linear-gradient(135deg, #0d1a2e, #060e1a)"
---

## Why I switched to the Composition API

After building ProjectFlow with the Options API, I hit a wall. Logic for drag & drop, filtering, and localStorage persistence was scattered across `data`, `computed`, `methods`, and `watch`. Reading my own code became painful.

The Composition API solves this by grouping logic by **feature**, not by option type.

## Before: Options API

```javascript
export default {
  data() {
    return {
      tasks: [],
      searchQuery: '',
      filter: 'all'
    }
  },
  computed: {
    filteredTasks() {
      return this.tasks.filter(t => 
        t.title.includes(this.searchQuery)
      )
    }
  },
  methods: {
    addTask(task) {
      this.tasks.push(task)
      this.saveToStorage()
    },
    saveToStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  },
  mounted() {
    const saved = localStorage.getItem('tasks')
    if (saved) this.tasks = JSON.parse(saved)
  }
}
```

## After: Composition API with composables

```javascript
// composables/useTasks.js
export function useTasks() {
  const tasks = ref(JSON.parse(localStorage.getItem('tasks') || '[]'))
  
  watch(tasks, (val) => {
    localStorage.setItem('tasks', JSON.stringify(val))
  }, { deep: true })

  function addTask(task) {
    tasks.value.push(task)
  }

  return { tasks, addTask }
}

// composables/useSearch.js
export function useSearch(items) {
  const query = ref('')
  const filtered = computed(() =>
    items.value.filter(i => 
      i.title.toLowerCase().includes(query.value.toLowerCase())
    )
  )
  return { query, filtered }
}
```

Now each composable is **independently testable** and reusable across components.

## Key lessons

The biggest mindset shift: stop thinking in component lifecycle hooks, start thinking in **reactive state + effects**. `watchEffect` replaced most of my `mounted` + `watch` combinations.

The Composition API did not make Vue harder — it made it more honest about what reactive programming actually is.
