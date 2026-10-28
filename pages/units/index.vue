<template>
  <div class="p-4 md:p-8 space-y-6">
    <!-- Header with Breadcrumbs & Action -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-stone-400 mb-1">
          <span>Catalog</span>
          <span>/</span>
          <span class="text-stone-700 dark:text-stone-300 font-medium">Units</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-serif font-black tracking-tight text-stone-900 dark:text-stone-100">
          Measurement Units
        </h1>
        <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Manage boutique fabric units of measure (e.g. Meter, Bolt, Roll, Kben, Piece)
        </p>
      </div>

      <div class="flex items-center gap-2">
        <NuxtLink 
          to="/units/add" 
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7A1A24] hover:bg-[#94222E] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all btn-press cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Measurement Unit</span>
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
            placeholder="Search units by name or symbol..." 
            class="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-stone-200/80 dark:border-stone-700/80 bg-stone-50 dark:bg-stone-900/60 text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 transition"
          />
        </div>

        <div class="text-xs text-stone-400 font-mono">
          Showing <strong>{{ filteredUnits.length }}</strong> of {{ units.length }} units
        </div>
      </div>

      <!-- Table View -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-stone-50/70 dark:bg-stone-900/40 text-stone-500 dark:text-stone-400 border-b border-stone-200/60 dark:border-stone-800/60">
            <tr>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px] w-24">Symbol</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Unit Name</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Base Unit Hierarchy</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 dark:divide-stone-800/60">
            <tr v-if="filteredUnits.length === 0">
              <td colspan="4" class="py-12 px-6 text-center text-stone-400">
                <div class="flex flex-col items-center justify-center max-w-sm mx-auto">
                  <div class="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <p class="font-bold text-sm text-stone-700 dark:text-stone-300">No measurement units found</p>
                  <p class="text-xs text-stone-400 mt-1">Configure units like Meter (m), Roll, Bolt, or Custom Tailoring Piece.</p>
                </div>
              </td>
            </tr>

            <tr 
              v-for="unit in filteredUnits" 
              :key="unit.id" 
              class="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
            >
              <td class="py-3.5 px-5 font-mono font-bold text-xs text-[#7A1A24] dark:text-[#E6C98A]">
                {{ unit.code }}
              </td>
              <td class="py-3.5 px-5 font-bold text-stone-800 dark:text-stone-100 text-xs sm:text-sm">
                {{ unit.name }}
              </td>
              <td class="py-3.5 px-5">
                <span v-if="unit.base_unit" class="text-xs font-mono bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded-full border border-stone-200 dark:border-stone-700">
                  Base: {{ getBaseUnitName(unit.base_unit) }}
                </span>
                <span v-else class="text-[10px] font-bold text-stone-400 uppercase tracking-widest">- Primary Base Unit -</span>
              </td>
              <td class="py-3.5 px-5 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <NuxtLink 
                    :to="'/units/edit?id=' + unit.id" 
                    class="px-3 py-1 text-xs font-bold rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 border border-amber-500/20 transition-all btn-press inline-flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit</span>
                  </NuxtLink>
                  <button 
                    @click="handleDeleteUnit(unit)" 
                    class="px-3 py-1 text-xs font-bold rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all btn-press inline-flex items-center gap-1 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span>Delete</span>
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

const { units, deleteUnit } = usePosState()
const { showConfirm, showAlert } = useUiAlert()

const searchQuery = ref('')

const filteredUnits = computed(() => {
  if (!searchQuery.value.trim()) return units.value
  const q = searchQuery.value.toLowerCase().trim()
  return units.value.filter(u => 
    u.name.toLowerCase().includes(q) || 
    u.code.toLowerCase().includes(q)
  )
})

const getBaseUnitName = (baseUnitId) => {
  const found = units.value.find(u => u.id === baseUnitId)
  return found ? `${found.name} (${found.code})` : `ID: ${baseUnitId}`
}

const handleDeleteUnit = async (unit) => {
  const result = await showConfirm(`Are you sure you want to delete unit "${unit.name}"?`, "Delete Unit")
  if (result.isConfirmed) {
    deleteUnit(unit.id)
    showAlert(`Unit "${unit.name}" deleted successfully!`, "Deleted", "success")
  }
}
</script>