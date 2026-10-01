<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl font-bold dark:text-white">{{ $t('units') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage product measurement units</p>
      </div>
      <NuxtLink to="/units/add" class="w-full md:w-auto bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-md transition whitespace-nowrap text-center">
        + Add Unit
      </NuxtLink>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-themeDark text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
            <tr>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Code</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Unit Name</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Base Unit</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="unit in mockUnits" :key="unit.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-3 md:p-4 font-mono font-bold text-themeRed dark:text-red-400">{{ unit.code }}</td>
              <td class="p-3 md:p-4 font-bold text-gray-800 dark:text-gray-100">{{ unit.name }}</td>
              <td class="p-3 md:p-4">
                <span v-if="unit.base_unit" class="text-sm font-mono bg-gray-100 dark:bg-themeDark px-2 py-1 rounded border border-gray-200 dark:border-gray-700">ID: {{ unit.base_unit }}</span>
                <span v-else class="text-xs font-bold text-gray-400 uppercase tracking-widest">- Base Unit -</span>
              </td>
              <td class="p-3 md:p-4 text-right">
                <NuxtLink to="/units/edit" class="text-themeGold hover:text-yellow-600  hover:underline mr-4 text-sm font-semibold uppercase">Edit</NuxtLink>
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

// ERD matches: bpas_units
const mockUnits = ref([
  { id: 1, code: 'm', name: 'Meter', base_unit: null },
  { id: 2, code: 'cm', name: 'Centimeter', base_unit: 1 },
  { id: 3, code: 'roll', name: 'Roll', base_unit: 1 },
  { id: 4, code: 'kben', name: 'Kben (Traditional)', base_unit: 1 },
])

</script>