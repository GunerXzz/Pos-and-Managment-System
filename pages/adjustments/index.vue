<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">{{ $t('adjustments') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage manual stock additions and subtractions</p>
      </div>
      <NuxtLink to="/adjustments/add" class="w-full md:w-auto bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-md transition whitespace-nowrap text-center">
        + Add Adjustment
      </NuxtLink>
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

const mockProducts = {
  1: { name: 'Premium Red Silk', code: 'PRD-1001' },
  2: { name: 'Cotton Thread', code: 'PRD-1002' },
};

const mockUsers = {
  1: { name: 'John Doe' },
  2: { name: 'Jane Smith' }
};

// ERD matches: bpas_adjustments
const mockAdjustments = ref([
  { id: 1, date: '2026-09-19', reference_no: 'ADJ-001', created_by: 1, product_id: 1, quantity: 15.0, type: 'Addition', note: 'New silk roll shipment' },
  { id: 2, date: '2026-09-20', reference_no: 'ADJ-002', created_by: 2, product_id: 2, quantity: 5.0, type: 'Subtraction', note: 'Damaged cotton fabric' },
])

const deleteAdjustment = async (adj) => {
  const { showConfirm } = useUiAlert()
  const result = await showConfirm(`Are you sure you want to delete adjustment ${adj.reference_no}?`, "Delete Adjustment")
  if (result.isConfirmed) {
    mockAdjustments.value = mockAdjustments.value.filter(a => a.id !== adj.id)
  }
}
</script>