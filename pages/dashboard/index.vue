<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100 overflow-y-auto">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">{{ $t('dashboard') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 mt-1">Overview of your store performance</p>
      </div>
      <div class="bg-white dark:bg-themeDark px-4 py-2 rounded-lg shadow-sm border border-gray-200 dark:themeDark flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-themeGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span class="font-bold text-sm">{{ currentDate }}</span>
      </div>
    </div>
    
    <!-- Top -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      
      <!-- Card -->
      <NuxtLink to="/sales" class="bg-themeRed text-white p-6 rounded-xl shadow-lg relative overflow-hidden group block hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <div class="absolute -right-6 -top-6 text-white/10 group-hover:scale-110 transition duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div class="relative z-10">
          <h3 class="text-white/80 text-sm font-bold uppercase tracking-wider mb-2">Today's Sales</h3>
          <p class="text-3xl font-extrabold mb-1">$2,486.50</p>
          <div class="flex items-center gap-1 text-xs text-themeGold font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>+12% vs yesterday</span>
          </div>
        </div>
      </NuxtLink>

      <!-- Card -->
      <NuxtLink to="/sales" class="bg-white dark:bg-themeDark p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-between group block hover:shadow-lg hover:border-themeGold hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <div>
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 group-hover:text-themeGold transition-colors">Total Profit</h3>
          <p class="text-3xl font-extrabold text-gray-800 dark:text-white mb-1">$845.20</p>
          <div class="flex items-center gap-1 text-xs text-themeGold font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>+15% vs yesterday</span>
          </div>
        </div>
        <div class="bg-themeGold/20 p-3 rounded-lg text-themeGold group-hover:bg-themeGold group-hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </NuxtLink>

      <!-- Card -->
      <NuxtLink to="/sales" class="bg-white dark:bg-themeDark p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-between group block hover:shadow-lg hover:border-themeGold hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <div>
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 group-hover:text-themeGold transition-colors">Total Invoices</h3>
          <p class="text-3xl font-extrabold text-gray-800 dark:text-white mb-1">48</p>
          <div class="flex items-center gap-1 text-xs text-themeGold font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>+8% vs yesterday</span>
          </div>
        </div>
        <div class="bg-themeGold/20 p-3 rounded-lg text-themeGold group-hover:bg-themeGold group-hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </NuxtLink>

      <!-- Card -->
      <NuxtLink to="/inventory" class="bg-white dark:bg-themeDark p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-between group block hover:shadow-lg hover:border-themeGold hover:-translate-y-1 transition-all duration-300 cursor-pointer">
        <div>
          <h3 class="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider mb-2 group-hover:text-themeGold transition-colors">Total Products</h3>
          <p class="text-3xl font-extrabold text-gray-800 dark:text-white mb-1">128</p>
          <div class="flex items-center gap-1 text-xs text-themeGold font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>+5% vs yesterday</span>
          </div>
        </div>
        <div class="bg-themeGold/20 p-3 rounded-lg text-themeGold group-hover:bg-themeGold group-hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
      </NuxtLink>

    </div>

    <!-- Middle -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      <!-- Sales -->
      <div class="lg:col-span-2 bg-white dark:bg-themeDark rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Sales Overview</h2>
          <select class="px-3 py-1 bg-gray-50 dark:bg-themeDark border border-gray-200 dark:border-gray-700 rounded text-sm font-bold outline-none focus:border-themeGold text-gray-600 dark:text-gray-300">
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
        
        <!-- Professional -->
        <div class="flex-grow relative h-72 w-full mt-4">
          <ClientOnly>
            <Line :data="chartData" :options="chartOptions" />
          </ClientOnly>
        </div>
      </div>

      <!-- Low -->
      <div class="bg-white dark:bg-themeDark rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800 dark:text-white">Low Stock Alerts</h2>
          <span class="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-bold">{{ lowStockProducts.length }} Items</span>
        </div>
        
        <div class="flex-grow overflow-y-auto space-y-4 pr-2">
          <div v-for="item in lowStockProducts" :key="item.id" class="flex justify-between items-center p-3 border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 rounded-lg">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-lg">
                🧵
              </div>
              <div>
                <p class="text-sm font-bold text-gray-800 dark:text-gray-200">{{ item.name }}</p>
                <p class="text-xs text-gray-500 font-mono">{{ item.code }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-red-600 font-bold">{{ item.stock }} {{ item.unit }}</p>
              <p class="text-xs text-gray-500">Alert: {{ item.alert_quantity }}</p>
            </div>
          </div>
        </div>
        
        <NuxtLink to="/inventory" class="block text-center w-full mt-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm">
          View Inventory
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
)

const currentDate = ref(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))

const lowStockProducts = ref([
  { id: 1, name: 'Premium Red Silk', code: 'PRD-1001', stock: 5, alert_quantity: 10, unit: 'm' },
  { id: 2, name: 'White Lace Trim', code: 'PRD-1003', stock: 2, alert_quantity: 5, unit: 'm' },
  { id: 3, name: 'Gold Embroidery Thread', code: 'PRD-1004', stock: 0, alert_quantity: 5, unit: 'roll' },
])

// Professional Chart.js Data
const chartData = ref({
  labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      label: 'This Week',
      backgroundColor: (context) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) return 'rgba(139, 0, 0, 0.2)';
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        gradient.addColorStop(0, 'rgba(139, 0, 0, 0.4)'); // Dark Red
        gradient.addColorStop(1, 'rgba(139, 0, 0, 0.0)');
        return gradient;
      },
      borderColor: '#8B0000',
      borderWidth: 2,
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#8B0000',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
      tension: 0.4,
      data: [1200, 3500, 5600, 4000, 7000, 6000, 9500]
    },
    {
      label: 'Last Week',
      backgroundColor: 'transparent',
      borderColor: '#FFD700', // Gold
      borderWidth: 2,
      borderDash: [5, 5],
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#FFD700',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: false,
      tension: 0.4,
      data: [1000, 3000, 4500, 3500, 6000, 5500, 8000]
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: '#1f2937',
      titleColor: '#FFD700',
      bodyColor: '#fff',
      padding: 10,
      displayColors: true,
      callbacks: {
        label: function(context) {
          return context.dataset.label + ': $' + context.raw;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      border: { display: false },
      grid: {
        color: 'rgba(156, 163, 175, 0.2)',
        drawTicks: false
      },
      ticks: {
        color: '#9ca3af',
        font: { size: 11, family: 'sans-serif' },
        callback: function(value) {
          return value >= 1000 ? value/1000 + 'k' : value;
        }
      }
    },
    x: {
      border: { display: false },
      grid: {
        display: false
      },
      ticks: {
        color: '#9ca3af',
        font: { size: 11, family: 'sans-serif' }
      }
    }
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
})
</script>

<style scoped>
/* Empty style to satisfy Vite HMR cache */
</style>