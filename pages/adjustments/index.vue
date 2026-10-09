<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-[#0F1117] text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">{{ $t('adjustments') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage manual stock additions and subtractions</p>
      </div>
      <div class="flex relative w-full md:w-auto gap-2 md:gap-4">
        <NuxtLink to="/adjustments/add" class="w-full md:w-auto bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-md transition whitespace-nowrap text-center">
          + Add Adjustment
        </NuxtLink>
      </div>
    </div>

    <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-[#1A1D26] text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
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
            <tr v-if="adjustments.length === 0">
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
            <tr v-for="adj in adjustments" :key="adj.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-3 md:p-4 text-sm text-gray-600 dark:text-gray-300 font-semibold">{{ adj.date }}</td>
              <td class="p-3 md:p-4 font-mono font-bold text-themeRed dark:text-red-400">{{ adj.reference_no }}</td>
              <td class="p-3 md:p-4">
                <div class="font-bold text-gray-800 dark:text-gray-100">{{ adj.product_name }}</div>
                <div class="text-xs text-gray-500 font-mono">{{ adj.product_code }}</div>
              </td>
              <td class="p-3 md:p-4">
                <span :class="adj.type === 'addition' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-300' : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'" class="px-2 py-1 rounded text-xs font-bold uppercase border">
                  {{ adj.type }}
                </span>
              </td>
              <td class="p-3 md:p-4 font-bold text-lg">
                <span :class="adj.type === 'addition' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'">
                  {{ adj.type === 'addition' ? '+' : '-' }}{{ adj.quantity }} {{ adj.unit }}
                </span>
              </td>
              <td class="p-3 md:p-4">
                <span class="text-sm font-medium text-gray-800 dark:text-gray-200">{{ adj.created_by }}</span>
              </td>
              <td class="p-3 md:p-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink :to="'/adjustments/detail?id=' + adj.id" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider">
                    View
                  </NuxtLink>
                  <button @click="handleDelete(adj)" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePosState } from '~/composables/usePosState'

const { adjustments, deleteAdjustment } = usePosState()
const { showConfirm, showAlert } = useUiAlert()

const handleDelete = async (adj) => {
  const result = await showConfirm(`Delete adjustment record ${adj.reference_no}?`, "Delete Adjustment")
  if (result.isConfirmed) {
    deleteAdjustment(adj.id)
    showAlert(`Record ${adj.reference_no} removed.`, "Deleted", "success")
  }
}
</script>