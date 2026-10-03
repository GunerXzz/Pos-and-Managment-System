<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100 overflow-y-auto">
    <div class="flex items-center justify-between mb-6 md:mb-8 border-b-2 border-themeGold pb-4">
      <div class="flex items-center gap-4">
        <NuxtLink to="/inventory" class="w-10 h-10 bg-gray-200 dark:bg-themeDark rounded-full flex items-center justify-center hover:bg-themeGold hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">Edit Product</h1>
          <p class="text-xs md:text-sm text-gray-500 mt-1">Modify existing product details</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
      <form @submit.prevent="submitForm" class="space-y-6">
        
        <!-- Basic -->
        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2">Basic Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Product Name <span class="text-themeRed">*</span></label>
            <input type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" value="Premium Red Silk" required />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Category <span class="text-themeRed">*</span></label>
            <select v-model="selectedCategory" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" required>
              <option value="">Select Category</option>
              <option v-for="cat in mainCategories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
          </div>
          <div v-if="childCategories.length > 0">
            <label class="block text-sm font-bold mb-2">Sub-Category</label>
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark">
              <option value="">Select Sub-Category</option>
              <option v-for="sub in childCategories" :key="sub.id" :value="sub.id">{{ sub.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Product Code <span class="text-themeRed">*</span></label>
            <input type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" value="PRD-1001" required />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Barcode Type</label>
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark">
              <option value="">Select Type</option>
              <option v-for="type in mockBarcodeTypes" :key="type.id" :value="type.id" :selected="type.id === 1">{{ type.name }}</option>
            </select>
          </div>
          <div class="col-span-1 md:col-span-2 mt-2 flex items-center gap-2">
            <input type="checkbox" id="is_service" class="w-4 h-4 text-themeRed border-gray-300 rounded focus:ring-themeRed" />
            <label for="is_service" class="text-sm font-bold cursor-pointer">This is a Service (e.g. Tailoring)</label>
          </div>
        </div>

        <!-- Units -->
        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2 mt-8">Units & Pricing</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Base Unit <span class="text-themeRed">*</span></label>
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" required>
              <option value="">Select Unit</option>
              <option v-for="unit in mockUnits" :key="unit.id" :value="unit.id" :selected="unit.id === 1">{{ unit.name }} ({{ unit.code }})</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Purchase Unit</label>
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark">
              <option value="">Select Unit</option>
              <option v-for="unit in mockUnits" :key="unit.id" :value="unit.id" :selected="unit.id === 1">{{ unit.name }} ({{ unit.code }})</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Sale Unit <span class="text-themeRed">*</span></label>
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" required>
              <option value="">Select Unit</option>
              <option v-for="unit in mockUnits" :key="unit.id" :value="unit.id" :selected="unit.id === 1">{{ unit.name }} ({{ unit.code }})</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Cost (Purchase Price) <span class="text-themeRed">*</span></label>
            <input type="number" step="0.01" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" value="10.00" required />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Price (Selling Price) <span class="text-themeRed">*</span></label>
            <input type="number" step="0.01" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" value="15.50" required />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Alert Quantity</label>
            <input type="number" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" value="10" />
          </div>
        </div>

        <!-- AI -->
        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2 mt-8">Media & Attributes</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Product Image</label>
            <div class="flex items-center gap-4">
              <img src="https://placehold.co/100x100/DC143C/white?text=Silk" alt="Current Image" class="w-20 h-20 rounded-md object-cover border border-gray-300" />
              <div class="flex-1 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-themeGold transition cursor-pointer">
                <span class="text-sm font-bold">Change Image</span>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Color</label>
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark">
              <option value="">Select Color</option>
              <option v-for="color in mockColors" :key="color.id" :value="color.id" :selected="color.id === 1">{{ color.name }}</option>
            </select>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <NuxtLink to="/inventory" class="px-6 py-2 rounded-lg font-bold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Cancel
          </NuxtLink>
          <button type="submit" class="bg-themeRed hover:bg-red-800 text-white px-8 py-2 rounded-lg font-bold shadow-md transition">
            Save Changes
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mockCategories = ref([
  { id: 1, name: 'Silk', parent_id: null },
  { id: 2, name: 'Premium Silk', parent_id: 1 },
  { id: 3, name: 'Cotton', parent_id: null },
  { id: 4, name: 'Thread', parent_id: null },
  { id: 5, name: 'Raw Cotton', parent_id: 3 },
])

const mockUnits = ref([
  { id: 1, name: 'Meter', code: 'm' },
  { id: 2, name: 'Piece', code: 'pc' },
  { id: 3, name: 'Roll', code: 'roll' },
  { id: 4, name: 'Kben', code: 'kben' }
])

const mockColors = ref([
  { id: 1, name: 'Crimson', code: '#DC143C' },
  { id: 2, name: 'Gold', code: '#FFD700' },
  { id: 3, name: 'White', code: '#FFFFFF' },
  { id: 4, name: 'Dark Red', code: '#8B0000' }
])

const mockBarcodeTypes = ref([
  { id: 1, name: 'CODE128' },
  { id: 2, name: 'EAN13' },
  { id: 3, name: 'UPC-A' },
  { id: 4, name: 'QR' }
])

const selectedCategory = ref(1) // Pre-select Silk for the edit view

const mainCategories = computed(() => {
  return mockCategories.value.filter(c => c.parent_id === null)
})

const childCategories = computed(() => {
  if (!selectedCategory.value) return []
  return mockCategories.value.filter(c => c.parent_id === selectedCategory.value)
})

const submitForm = () => {
  router.push('/inventory')
}
</script>
