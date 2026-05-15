---
title: Building a Kanban Board with Native Drag & Drop in Vue.js
slug: kanban-drag-drop-vue
excerpt: The complete walkthrough of how I built the drag & drop system in ProjectFlow without a library, using native HTML5 APIs.
category: frontend
tags: [Vue.js, Drag & Drop, Kanban]
publishedAt: 2024-11-22
readTime: 14
featured: true
coverEmoji: 🏗️
coverColor: "linear-gradient(135deg, #1e1a0a, #100e05)"
---

## No library needed

When I built [ProjectFlow](https://github.com/hasan1303/projectflow), I deliberately avoided drag & drop libraries. The HTML5 Drag and Drop API is fully capable — and understanding it makes you a better developer.

## The three events you need

```javascript
// On the draggable element
@dragstart="onDragStart(task, $event)"

// On the drop zone (column)
@dragover.prevent="onDragOver"
@drop="onDrop(column, $event)"
```

The `.prevent` on `dragover` is critical — without it, the browser blocks the drop.

## Tracking the dragged item

```javascript
// store/useDragStore.js
export const useDragStore = defineStore('drag', () => {
  const draggedTask = ref(null)
  const sourceColumn = ref(null)

  function startDrag(task, column) {
    draggedTask.value = task
    sourceColumn.value = column
  }

  function drop(targetColumn) {
    if (!draggedTask.value) return
    if (sourceColumn.value === targetColumn) return

    // Remove from source
    sourceColumn.value.tasks = sourceColumn.value.tasks
      .filter(t => t.id !== draggedTask.value.id)

    // Add to target
    targetColumn.tasks.push(draggedTask.value)

    draggedTask.value = null
    sourceColumn.value = null
  }

  return { draggedTask, startDrag, drop }
})
```

## Visual feedback

The key to a good drag experience is clear visual feedback:

```css
.task-card.dragging {
  opacity: 0.4;
  transform: rotate(2deg);
}

.column.drag-over {
  background: rgba(123, 110, 246, 0.08);
  border-color: rgba(123, 110, 246, 0.4);
}
```

## What I learned

Native drag & drop has quirks — `dragleave` fires when moving over child elements, which causes flickering. The fix is tracking enter/leave with a counter, not a boolean.

Worth learning from scratch. You will understand exactly what every library is doing under the hood.
