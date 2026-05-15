---
title: Interactive Financial Charts with Chart.js and Vue 3
slug: chartjs-vue-dashboard
excerpt: Building the analytics dashboard for my expense tracker — reactive charts, custom themes, and how to make them feel native to your app.
category: frontend
tags: [Chart.js, Vue.js, Data Viz]
publishedAt: 2024-11-05
readTime: 9
featured: false
coverEmoji: 📊
coverColor: "linear-gradient(135deg, #0a1428, #050910)"
---

## Why Chart.js with Vue.js works well

For the [Smart Expense Tracker](https://github.com/hasan1303/smart-expense-tracker-vue), I needed charts that react to data changes instantly. Chart.js paired with Vue's reactivity system is a natural fit.

## Setting up a reactive chart

```vue
<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'

const props = defineProps(['transactions'])
const chartCanvas = ref(null)
let chart = null

function buildChart() {
  const ctx = chartCanvas.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: getChartData(),
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  })
}

function getChartData() {
  const categories = {}
  props.transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount
    })

  return {
    labels: Object.keys(categories),
    datasets: [{
      data: Object.values(categories),
      backgroundColor: ['#7b6ef6', '#22d3ee', '#3ecf8e', '#f59e0b']
    }]
  }
}

// React to data changes
watch(() => props.transactions, () => {
  if (chart) {
    chart.data = getChartData()
    chart.update()
  }
}, { deep: true })

onMounted(buildChart)
onUnmounted(() => chart?.destroy())
</script>
```

## Dark mode charts

The trick is reading CSS variables at chart creation time:

```javascript
const textColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--text2').trim()

options.plugins.legend.labels = { color: textColor }
```

Watch the color mode and recreate the chart on toggle.

## Key insight

Always call `chart.destroy()` in `onUnmounted`. Forgetting this causes memory leaks and duplicate chart renders when the component remounts.
