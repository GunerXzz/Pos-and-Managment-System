<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-[#0F1117] text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl font-bold dark:text-white">{{ $t('units') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage product measurement units</p>
      </div>
      <NuxtLink to="/units/add" class="w-full md:w-auto bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-md transition whitespace-nowrap text-center">
        + Add Unit
      </NuxtLink>
    </div>

    <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-[#1A1D26] text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
            <tr>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Code</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Unit Name</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Base Unit</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="units.length === 0">
              <td colspan="4" class="p-8 text-center text-gray-400">
                <div class="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                  <p class="font-bold text-sm text-gray-500">No measurement units found</p>
                  <p class="text-xs text-gray-400 mt-1">Click "+ Add Unit" to create units (e.g., Meter, Roll, Kben)</p>
                </div>
              </td>
            </tr>
            <tr v-for="unit in units" :key="unit.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-3 md:p-4 font-mono font-bold text-themeRed dark:text-red-400">{{ unit.code }}</td>
              <td class="p-3 md:p-4 font-bold text-gray-800 dark:text-gray-100">{{ unit.name }}</td>
              <td class="p-3 md:p-4">
                <span v-if="unit.base_unit" class="text-sm font-mono bg-gray-100 dark:bg-[#252936] px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                  Base: {{ getBaseUnitName(unit.base_unit) }}
                </span>
                <span v-else class="text-xs font-bold text-gray-400 uppercase tracking-widest">- Base Unit -</span>
              </td>
              <td class="p-3 md:p-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink :to="'/units/edit?id=' + unit.id" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Edit
                  </NuxtLink>
                  <button @click="handleDeleteUnit(unit)" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
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

const { units, deleteUnit } = usePosState()
const { showConfirm, showAlert } = useUiAlert()

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