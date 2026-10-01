<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl font-bold dark:text-white">{{ $t('colors') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage product colors and hex codes</p>
      </div>
      <NuxtLink to="/colors/add" class="w-full md:w-auto bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-md transition border border-red-900 whitespace-nowrap text-center">+ Add Color</NuxtLink>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-themeDark text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
            <tr>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs w-24">ID</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Color Swatch</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Name</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Hex Code</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="color in mockColors" :key="color.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-3 md:p-4 font-mono text-sm text-gray-500">#{{ color.id }}</td>
              <td class="p-3 md:p-4">
                <div class="w-8 h-8 rounded-full border border-gray-300 shadow-sm" :style="{ backgroundColor: color.code }"></div>
              </td>
              <td class="p-3 md:p-4 font-bold text-gray-800 dark:text-gray-100">{{ color.name }}</td>
              <td class="p-3 md:p-4 font-mono text-sm text-gray-600 dark:text-gray-400">{{ color.code }}</td>
              <td class="p-3 md:p-4 text-right">
                <NuxtLink to="/colors/edit" class="text-themeGold hover:text-yellow-600 hover:underline mr-4 text-sm font-semibold uppercase">Edit</NuxtLink>
                <button class="text-red-600 hover:text-red-800 hover:underline text-sm font-semibold uppercase">Delete</button>
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

// ERD matches: bpas_colors
const mockColors = ref([
  { id: 1, name: 'Red', code: '#FF0000' },
  { id: 2, name: 'Blue', code: '#0000FF' },
  { id: 3, name: 'Gold', code: '#FFD700' },
  { id: 4, name: 'Black', code: '#000000' },
])
</script>
