<template>
  <div class="p-4 md:p-8 space-y-6">
    <!-- Header with Breadcrumbs & Action -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs text-stone-400 mb-1">
          <span>Catalog</span>
          <span>/</span>
          <span class="text-stone-700 dark:text-stone-300 font-medium">Colors</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-serif font-black tracking-tight text-stone-900 dark:text-stone-100">
          Color Palette
        </h1>
        <p class="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Manage fabric dye swatches, hex codes, and silk color classifications
        </p>
      </div>

      <div class="flex items-center gap-2">
        <NuxtLink 
          to="/colors/add" 
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7A1A24] hover:bg-[#94222E] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all btn-press cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Color Swatch</span>
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
            placeholder="Search colors by name or hex..." 
            class="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-stone-200/80 dark:border-stone-700/80 bg-stone-50 dark:bg-stone-900/60 text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 transition"
          />
        </div>

        <div class="text-xs text-stone-400 font-mono">
          Showing <strong>{{ filteredColors.length }}</strong> of {{ colors.length }} colors
        </div>
      </div>

      <!-- Table View -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-stone-50/70 dark:bg-stone-900/40 text-stone-500 dark:text-stone-400 border-b border-stone-200/60 dark:border-stone-800/60">
            <tr>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px] w-20">ID</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Swatch</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Color Name</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px]">Hex Code</th>
              <th class="py-3.5 px-5 font-bold uppercase tracking-wider text-[11px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100 dark:divide-stone-800/60">
            <tr v-if="filteredColors.length === 0">
              <td colspan="5" class="py-12 px-6 text-center text-stone-400">
                <div class="flex flex-col items-center justify-center max-w-sm mx-auto">
                  <div class="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <p class="font-bold text-sm text-stone-700 dark:text-stone-300">No fabric colors found</p>
                  <p class="text-xs text-stone-400 mt-1">Register color swatches to filter silk and fabric bolts easily at the POS.</p>
                </div>
              </td>
            </tr>

            <tr 
              v-for="color in filteredColors" 
              :key="color.id" 
              class="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors"
            >
              <td class="py-3.5 px-5 font-mono text-xs text-stone-400">
                #{{ color.id }}
              </td>
              <td class="py-3.5 px-5">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full border border-black/15 shadow-2xs flex-shrink-0" :style="{ backgroundColor: color.code }"></div>
                </div>
              </td>
              <td class="py-3.5 px-5 font-bold text-stone-800 dark:text-stone-100 text-xs sm:text-sm">
                {{ color.name }}
              </td>
              <td class="py-3.5 px-5 font-mono text-xs text-stone-500">
                {{ color.code }}
              </td>
              <td class="py-3.5 px-5 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <NuxtLink 
                    :to="'/colors/edit?id=' + color.id" 
                    class="px-3 py-1 text-xs font-bold rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 border border-amber-500/20 transition-all btn-press inline-flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span>Edit</span>
                  </NuxtLink>
                  <button 
                    @click="handleDeleteColor(color)" 
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

const { colors, deleteColor } = usePosState()
const { showConfirm, showAlert } = useUiAlert()

const searchQuery = ref('')

const filteredColors = computed(() => {
  if (!searchQuery.value.trim()) return colors.value
  const q = searchQuery.value.toLowerCase().trim()
  return colors.value.filter(c => 
    c.name.toLowerCase().includes(q) || 
    c.code.toLowerCase().includes(q)
  )
})

const handleDeleteColor = async (color) => {
  const result = await showConfirm(`Are you sure you want to delete color "${color.name}"?`, "Delete Color")
  if (result.isConfirmed) {
    deleteColor(color.id)
    showAlert(`Color "${color.name}" deleted successfully!`, "Deleted", "success")
  }
}
</script>
