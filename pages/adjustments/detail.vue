<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100 overflow-y-auto">
    <div class="flex items-center justify-between mb-6 md:mb-8 border-b-2 border-themeGold pb-4">
      <div class="flex items-center gap-4">
        <NuxtLink to="/adjustments" class="w-10 h-10 bg-gray-200 dark:bg-themeDark rounded-full flex items-center justify-center hover:bg-themeGold hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">Adjustment Detail</h1>
          <p class="text-xs md:text-sm text-gray-500 mt-1">Audit Record: {{ currentAdj?.reference_no }}</p>
        </div>
      </div>
    </div>

    <div v-if="currentAdj" class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-3xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Reference Number</p>
          <p class="text-xl font-mono font-bold text-themeRed dark:text-red-400">{{ currentAdj.reference_no }}</p>
        </div>
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Date</p>
          <p class="text-lg font-bold">{{ currentAdj.date }}</p>
        </div>
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Fabric / Product</p>
          <p class="text-lg font-bold">{{ currentAdj.product_name }}</p>
          <p class="text-xs text-gray-500 font-mono">{{ currentAdj.product_code }}</p>
        </div>
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Adjustment Type & Delta</p>
          <div class="flex items-center gap-2">
            <span :class="currentAdj.type === 'addition' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'" class="px-2.5 py-1 rounded text-xs font-bold uppercase">
              {{ currentAdj.type }}
            </span>
            <span class="text-xl font-extrabold">
              {{ currentAdj.type === 'addition' ? '+' : '-' }}{{ currentAdj.quantity }} {{ currentAdj.unit }}
            </span>
          </div>
        </div>
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Logged By</p>
          <p class="text-sm font-semibold">{{ currentAdj.created_by }}</p>
        </div>
        <div class="md:col-span-2 pt-4 border-t border-gray-100 dark:border-gray-800">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Audit Note / Explanation</p>
          <p class="text-sm p-4 rounded-lg bg-gray-50 dark:bg-[#1A1D26] border border-gray-200 dark:border-gray-700 font-medium">
            {{ currentAdj.note || 'No note provided for this adjustment.' }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="p-12 text-center text-gray-400">
      <p class="text-base font-bold">Adjustment record not found.</p>
      <NuxtLink to="/adjustments" class="text-themeRed font-bold underline mt-2 inline-block">Return to Adjustments</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePosState } from '~/composables/usePosState'

const route = useRoute()
const { adjustments } = usePosState()

const adjId = computed(() => Number(route.query.id))
const currentAdj = computed(() => {
  if (adjId.value) {
    const found = adjustments.value.find(a => a.id === adjId.value)
    if (found) return found
  }
  return adjustments.value[0] || null
})
</script>
