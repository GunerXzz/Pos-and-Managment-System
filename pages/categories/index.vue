<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl font-bold dark:text-white">{{ $t('categories') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Organize products into groups or sub-groups</p>
      </div>
      <NuxtLink to="/categories/add" class="w-full md:w-auto bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-md transition flex justify-center items-center gap-2 whitespace-nowrap">
        + Add Category
      </NuxtLink>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-themeDark text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
            <tr>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Code</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Category Name</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Parent Category</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Status</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cat in mockCategories" :key="cat.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-3 md:p-4 text-gray-500 font-mono font-bold">{{ cat.code }}</td>
              <td class="p-3 md:p-4 font-bold text-gray-800 dark:text-gray-100">{{ cat.name }}</td>
              <td class="p-3 md:p-4">
                <span v-if="cat.parent_id" class="text-sm font-mono bg-gray-100 dark:bg-themeDark px-2 py-1 rounded border border-gray-200 dark:border-gray-700">ID: {{ cat.parent_id }}</span>
                <span v-else class="text-xs font-bold text-gray-400 uppercase tracking-widest">- None -</span>
              </td>
              <td class="p-3 md:p-4">
                <span :class="[cat.status === 'Active' ? 'text-themeGold bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'text-red-600 bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800']" class="px-2 py-1 rounded text-xs font-bold uppercase border">
                  {{ cat.status }}
                </span>
              </td>
              <td class="p-3 md:p-4 text-right">
                <NuxtLink to="/categories/edit" class="text-themeGold hover:text-yellow-600  hover:underline mr-4 text-sm font-semibold uppercase">Edit</NuxtLink>
                <button @click="deleteCategory(cat)" class="text-red-500 hover:underline text-sm font-semibold uppercase">Delete</button>
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

// ERD matches: bpas_categories
const mockCategories = ref([
  { id: 1, code: 'CAT-SLK', name: 'Silk', parent_id: null, status: 'Active' },
  { id: 2, code: 'CAT-SLK-PRM', name: 'Premium Silk', parent_id: 1, status: 'Active' },
  { id: 3, code: 'CAT-CTN', name: 'Cotton', parent_id: null, status: 'Active' },
  { id: 4, code: 'CAT-THD', name: 'Thread', parent_id: null, status: 'Inactive' },
])

const deleteCategory = async (cat) => {
  const { showConfirm } = useUiAlert()
  const result = await showConfirm(`Are you sure you want to delete category ${cat.name}?`, "Delete Category")
  if (result.isConfirmed) {
    mockCategories.value = mockCategories.value.filter(c => c.id !== cat.id)
  }
}
</script>