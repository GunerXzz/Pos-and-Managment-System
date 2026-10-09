<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100 overflow-y-auto">
    <div class="flex items-center justify-between mb-6 md:mb-8 border-b-2 border-themeGold pb-4">
      <div class="flex items-center gap-4">
        <NuxtLink to="/categories" class="w-10 h-10 bg-gray-200 dark:bg-themeDark rounded-full flex items-center justify-center hover:bg-themeGold hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">Add Category</h1>
          <p class="text-xs md:text-sm text-gray-500 mt-1">Create a new product category</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-3xl">
      <form @submit.prevent="submitForm" class="space-y-6">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Category Name <span class="text-themeRed">*</span></label>
            <input 
              v-model="categoryName" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
              placeholder="e.g. Silk" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Category Code <span class="text-themeRed">*</span></label>
            <input 
              v-model="categoryCode" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark uppercase" 
              placeholder="e.g. CAT-SLK" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Parent Category</label>
            <select 
              v-model="parentId" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark"
            >
              <option :value="null">None (Top Level)</option>
              <option v-for="cat in availableParentCategories" :key="cat.id" :value="cat.id">
                {{ cat.name }} ({{ cat.code }})
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Status <span class="text-themeRed">*</span></label>
            <select 
              v-model="status" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <NuxtLink to="/categories" class="px-6 py-2 rounded-lg font-bold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Cancel
          </NuxtLink>
          <button type="submit" class="bg-themeRed hover:bg-red-800 text-white px-8 py-2 rounded-lg font-bold shadow-md transition cursor-pointer">
            Save Category
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePosState } from '~/composables/usePosState'

const router = useRouter()
const { categories, addCategory } = usePosState()
const { showAlert } = useUiAlert()

const categoryName = ref('')
const categoryCode = ref('')
const parentId = ref(null)
const status = ref('Active')

const availableParentCategories = computed(() => {
  return categories.value.filter(c => !c.parent_id)
})

const submitForm = () => {
  if (!categoryName.value || !categoryCode.value) return

  const newCategory = {
    id: Date.now(),
    name: categoryName.value.trim(),
    code: categoryCode.value.trim().toUpperCase(),
    parent_id: parentId.value ? Number(parentId.value) : null,
    status: status.value
  }

  addCategory(newCategory)
  showAlert("Category created successfully!", "Success", "success")
  router.push('/categories')
}
</script>
