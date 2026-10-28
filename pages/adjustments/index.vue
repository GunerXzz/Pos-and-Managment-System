<template>
  <div class="p-4 md:p-8 space-y-6">
    <!-- Header with Breadcrumbs & Action -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-stone-400 mb-1">
          <span>Inventory</span>
          <span>/</span>
          <span class="text-stone-700 dark:text-stone-300 font-medium">Adjustments</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-serif font-black tracking-tight text-stone-900 dark:text-stone-100">
          Stock Adjustments
        </h1>
        <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Audit bolt cuts, inventory losses, bolt additions, and manual stock rectifications
        </p>
      </div>

      <div class="flex items-center gap-2">
        <NuxtLink 
          to="/adjustments/add" 
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7A1A24] hover:bg-[#94222E] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all btn-press cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>New Stock Adjustment</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Main Card Container -->
    <div class="bg-white dark:bg-[#1A181C] rounded-3xl border border-stone-200/70 dark:border-stone-800/80 shadow-xs overflow-hidden">
      <!-- Toolbar & Search -->
      <div class="p-4 sm:p-5 border-b border-stone-200/70 dark:border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="relative w-full sm:w-80">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search reference, product..." 
            class="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-stone-200/80 dark:border-stone-700/80 bg-stone-50 dark:bg-stone-900/60 text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 transition"
          />
        </div>

        <div class="text-xs text-stone-400 font-mono">
          Showing <strong>{{ filteredAdjustments.length }}</strong> of {{ adjustments.length }} adjustments
        </div>
      </div>

      <!-- Table View -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-stone-50/70 dark:bg-stone-900/40 text-stone-500 dark:text-stone-400 border-b border-stone-200/60 dark:border-stone-800/60">
            <tr>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Date</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Reference No.</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Product</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Type</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Quantity</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Auditor</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 dark:divide-stone-800/60">
            <tr v-if="filteredAdjustments.length === 0">
              <td colspan="7" class="py-12 px-6 text-center text-stone-400">
                <div class="flex flex-col items-center justify-center max-w-sm mx-auto">
                  <div class="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <p class="font-bold text-sm text-stone-700 dark:text-stone-300">No adjustments recorded</p>
                  <p class="text-xs text-stone-400 mt-1">Manual stock addition or subtraction events will be logged here for audit tracking.</p>
                </div>
              </td>
            </tr>

            <tr 
              v-for="adj in filteredAdjustments" 
              :key="adj.id" 
              class="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
            >
              <td class="py-3.5 px-5 text-xs text-stone-600 dark:text-stone-300 font-medium">
                {{ adj.date }}
              </td>
              <td class="py-3.5 px-5 font-mono font-bold text-xs text-[#7A1A24] dark:text-[#E6C98A]">
                {{ adj.reference_no }}
              </td>
              <td class="py-3.5 px-5">
                <div class="font-bold text-stone-800 dark:text-stone-100 text-xs">{{ adj.product_name }}</div>
                <div class="text-[10px] text-stone-400 font-mono">{{ adj.product_code }}</div>
              </td>
              <td class="py-3.5 px-5">
                <span 
                  :class="adj.type === 'addition' 
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60' 
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200 dark:border-rose-800/60'"
                  class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border"
                >
                  {{ adj.type }}
                </span>
              </td>
              <td class="py-3.5 px-5 font-mono font-bold text-xs">
                <span :class="adj.type === 'addition' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                  {{ adj.type === 'addition' ? '+' : '-' }}{{ adj.quantity }} {{ adj.unit }}
                </span>
              </td>
              <td class="py-3.5 px-5 text-xs text-stone-600 dark:text-stone-300">
                {{ adj.created_by }}
              </td>
              <td class="py-3.5 px-5 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <NuxtLink 
                    :to="'/adjustments/detail?id=' + adj.id" 
                    class="px-3 py-1 text-xs font-bold rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 transition-all btn-press inline-flex items-center gap-1"
                  >
                    View
                  </NuxtLink>
                  <button 
                    @click="handleDelete(adj)" 
                    class="px-3 py-1 text-xs font-bold rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all btn-press inline-flex items-center gap-1 cursor-pointer"
                  >
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
import { ref, computed } from 'vue'
import { usePosState } from '~/composables/usePosState'
import { useUiAlert } from '~/composables/useUiAlert'

const { adjustments, deleteAdjustment } = usePosState()
const { showConfirm, showAlert } = useUiAlert()

const searchQuery = ref('')

const filteredAdjustments = computed(() => {
  if (!searchQuery.value.trim()) return adjustments.value
  const q = searchQuery.value.toLowerCase().trim()
  return adjustments.value.filter(a => 
    (a.reference_no && a.reference_no.toLowerCase().includes(q)) || 
    (a.product_name && a.product_name.toLowerCase().includes(q)) ||
    (a.product_code && a.product_code.toLowerCase().includes(q))
  )
})

const handleDelete = async (adj) => {
  const result = await showConfirm(`Delete adjustment record ${adj.reference_no}?`, "Delete Adjustment")
  if (result.isConfirmed) {
    deleteAdjustment(adj.id)
    showAlert(`Record ${adj.reference_no} removed.`, "Deleted", "success")
  }
}
</script>