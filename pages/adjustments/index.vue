<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">{{ $t('adjustments') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage manual stock additions and subtractions</p>
      </div>
      <div class="flex relative w-full md:w-auto gap-2 md:gap-4">
        <button @click="showFilter = !showFilter" class="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition" title="Smart Filter">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
        </button>

        <!-- Smart Filter Dropdown -->
        <div v-if="showFilter" class="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-themeDark rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 z-50 p-4 animate-fade-in">
          <h3 class="text-sm font-bold border-b border-gray-200 dark:border-gray-800 pb-2 mb-3 text-themeGold">Smart Filter</h3>
          <div class="space-y-3 text-left">
            <div>
              <label class="block text-xs font-bold text-gray-500 mb-1">Adjustment Type</label>
              <select class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900 focus:outline-none">
                <option value="">All Types</option>
                <option value="Damage">Damage</option>
                <option value="Loss">Loss</option>
                <option value="Addition">Addition</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-500 mb-1">Date Range</label>
              <select class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900 focus:outline-none">
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div class="pt-2">
              <button @click="showFilter = false" class="w-full bg-themeRed text-white py-1.5 rounded text-sm font-bold hover:bg-red-800 transition">Apply Filters</button>
            </div>
          </div>
        </div>

        <NuxtLink to="/adjustments/add" class="w-full md:w-auto bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-md transition whitespace-nowrap text-center">
          + Add Adjustment
        </NuxtLink>
      </div>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-themeDark text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
            <tr>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Date</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Reference No.</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Product</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Type</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Quantity</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Created By</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="mockAdjustments.length === 0">
              <td colspan="7" class="p-10 text-center text-gray-400">
                <div class="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <p class="font-bold text-sm text-gray-500">No inventory adjustments recorded</p>
                  <p class="text-xs text-gray-400 mt-1">Manual stock addition or subtraction events will appear here</p>
                </div>
              </td>
            </tr>
            <tr v-for="adj in mockAdjustments" :key="adj.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-3 md:p-4 text-sm text-gray-600 dark:text-gray-300 font-semibold">{{ adj.date }}</td>
              <td class="p-3 md:p-4 font-mono font-bold text-themeRed dark:text-red-400">{{ adj.reference_no }}</td>
              <td class="p-3 md:p-4">
                <div v-if="mockProducts[adj.product_id]" class="font-bold text-gray-800 dark:text-gray-100">{{ mockProducts[adj.product_id].name }}</div>
                <div v-if="mockProducts[adj.product_id]" class="text-xs text-gray-500">{{ mockProducts[adj.product_id].code }}</div>
              </td>
              <td class="p-3 md:p-4">
                <span :class="adj.type === 'Addition' ? 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700' : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'" class="px-2 py-1 rounded text-xs font-bold uppercase border">
                  {{ adj.type }}
                </span>
              </td>
              <td class="p-3 md:p-4 font-bold text-lg">
                <span :class="adj.type === 'Addition' ? 'text-themeGold dark:text-gray-300' : 'text-red-600 dark:text-red-400'">
                  {{ adj.type === 'Addition' ? '+' : '-' }}{{ adj.quantity }}
                </span>
              </td>
              <td class="p-3 md:p-4">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-themeRed/10 text-themeRed flex items-center justify-center text-xs font-bold border border-themeRed/20">
                    {{ mockUsers[adj.created_by]?.name.charAt(0).toUpperCase() || 'U' }}
                  </div>
                  <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ mockUsers[adj.created_by]?.name || 'Unknown' }}</span>
                </div>
              </td>
              <td class="p-3 md:p-4 text-right">
                <NuxtLink to="/adjustments/detail" class="text-themeGold hover:text-yellow-600  hover:underline mr-4 text-sm font-semibold uppercase">View Details</NuxtLink>
                <button @click="deleteAdjustment(adj)" class="text-red-500 hover:underline text-sm font-semibold uppercase">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showFilter = ref(false)

const mockProducts = {
  1: { name: 'Premium Red Silk', code: 'PRD-1001' },
  2: { name: 'Cotton Thread', code: 'PRD-1002' },
};

const mockUsers = {
  1: { name: 'John Doe' },
  2: { name: 'Jane Smith' }
};

// Cleaned: Adjustments list is initially empty.
// Add adjustments via /adjustments/add or populate this array.
const mockAdjustments = ref([])

const deleteAdjustment = async (adj) => {
  const { showConfirm } = useUiAlert()
  const result = await showConfirm(`Are you sure you want to delete adjustment ${adj.reference_no}?`, "Delete Adjustment")
  if (result.isConfirmed) {
    mockAdjustments.value = mockAdjustments.value.filter(a => a.id !== adj.id)
  }
}
</script>