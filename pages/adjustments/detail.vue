<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100 overflow-y-auto">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div class="flex items-center gap-4">
        <NuxtLink to="/adjustments" class="p-2 rounded-full bg-gray-100 dark:bg-themeDark hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 tracking-widest">
            ADJUSTMENT #{{ adjustment.reference_no }}
          </h1>
          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Date: {{ adjustment.date }}
          </p>
        </div>
      </div>
      <div class="flex gap-2 md:gap-4 w-full md:w-auto">
        <button @click="printRecord" class="flex-1 md:flex-none bg-gray-100 dark:bg-themeDark hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg font-bold shadow-sm transition whitespace-nowrap">
          Print Record
        </button>
      </div>
    </div>

    <!-- Status -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
      <div class="bg-white dark:bg-themeDark p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex flex-col">
        <span class="text-xs font-bold text-gray-500 uppercase mb-1">Adjustment Type</span>
        <span class="text-lg font-bold" :class="adjustment.type === 'Addition' ? 'text-themeGold dark:text-gray-300' : 'text-red-600 dark:text-red-400'">
          {{ adjustment.type }}
        </span>
      </div>
      <div class="bg-white dark:bg-themeDark p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex flex-col">
        <span class="text-xs font-bold text-gray-500 uppercase mb-1">Created By</span>
        <span class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ mockUsers[adjustment.created_by]?.name || 'Unknown User' }}</span>
      </div>
      <div class="bg-white dark:bg-themeDark p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex flex-col sm:col-span-2">
        <span class="text-xs font-bold text-gray-500 uppercase mb-1">Note / Reason</span>
        <span class="text-sm font-medium text-gray-800 dark:text-gray-300">{{ adjustment.note }}</span>
      </div>
    </div>

    <!-- Product -->
    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-8">
      <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2 mb-6">Product Details</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Product</p>
          <div class="font-bold text-gray-800 dark:text-gray-100">{{ mockProducts[adjustment.product_id]?.name }}</div>
          <div class="text-xs text-gray-500 font-mono">{{ mockProducts[adjustment.product_id]?.code }}</div>
        </div>
        <div>
          <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Quantity Adjusted</p>
          <span class="text-2xl font-bold" :class="adjustment.type === 'Addition' ? 'text-themeGold dark:text-gray-300' : 'text-red-600 dark:text-red-400'">
            {{ adjustment.type === 'Addition' ? '+' : '-' }}{{ adjustment.quantity }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const adjustmentId = 'ADJ-001' // Static fallback

const mockProducts = {
  1: { name: 'Premium Red Silk', code: 'PRD-1001' },
  2: { name: 'Cotton Thread', code: 'PRD-1002' },
};

const mockUsers = {
  1: { name: 'John Doe' },
  2: { name: 'Jane Smith' }
};

// Static Mock Data reflecting DB Schema (bpas_adjustments)
const adjustment = ref({
  id: 1,
  reference_no: adjustmentId,
  date: '2026-09-19 14:30:00',
  created_by: 1,
  product_id: 1,
  quantity: 15.0,
  type: 'Addition',
  note: 'New silk roll shipment arrived from supplier, adding stock manually as requested by manager.'
})

const printRecord = () => {
  window.print()
}
</script>
