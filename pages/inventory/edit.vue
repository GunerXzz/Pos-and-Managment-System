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
          <p class="text-xs md:text-sm text-gray-500 mt-1">Modify {{ form.name || 'product' }} details (SKU: {{ form.code }})</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-4xl">
      <form @submit.prevent="submitForm" class="space-y-6">
        
        <!-- Basic -->
        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2">Basic Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Product Name <span class="text-themeRed">*</span></label>
            <input 
              v-model="form.name" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Category <span class="text-themeRed">*</span></label>
            <select 
              v-model="form.category_id" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
              required
            >
              <option value="">Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }} ({{ cat.code }})</option>
            </select>
          </div>
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-bold">Product Code / SKU <span class="text-themeRed">*</span></label>
              <button 
                type="button" 
                @click="generateRandomSku" 
                class="text-xs text-themeGold hover:underline font-bold cursor-pointer"
              >
                ⚡ Auto Generate
              </button>
            </div>
            <input 
              v-model="form.code" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark uppercase font-mono" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Barcode Type</label>
            <select 
              v-model="form.barcode_type_id" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark"
            >
              <option :value="1">CODE128</option>
              <option :value="2">EAN13</option>
              <option :value="3">UPC-A</option>
              <option :value="4">QR Code</option>
            </select>
          </div>
          <div class="col-span-1 md:col-span-2 mt-2 flex items-center gap-2">
            <input 
              type="checkbox" 
              id="is_service" 
              v-model="form.is_service" 
              class="w-4 h-4 text-themeRed border-gray-300 rounded focus:ring-themeRed" 
            />
            <label for="is_service" class="text-sm font-bold cursor-pointer">This is a Service (e.g. Tailoring, Cutting)</label>
          </div>
        </div>

        <!-- Units & Pricing -->
        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2 mt-8">Units, Stock & Pricing</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Base Unit <span class="text-themeRed">*</span></label>
            <select 
              v-model="form.sale_unit" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
              required
            >
              <option v-for="unit in units" :key="unit.id" :value="unit.id">
                {{ unit.name }} ({{ unit.code }})
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Purchase Unit</label>
            <select 
              v-model="form.purchase_unit" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark"
            >
              <option v-for="unit in units" :key="unit.id" :value="unit.id">
                {{ unit.name }} ({{ unit.code }})
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Current Stock <span class="text-themeRed">*</span></label>
            <input 
              v-model.number="form.stock" 
              type="number" 
              step="any" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark font-mono" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Cost (Purchase Price $) <span class="text-themeRed">*</span></label>
            <input 
              v-model.number="form.cost" 
              type="number" 
              step="0.01" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark font-mono" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Price (Selling Price $) <span class="text-themeRed">*</span></label>
            <input 
              v-model.number="form.price" 
              type="number" 
              step="0.01" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark font-mono" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Alert Quantity</label>
            <input 
              v-model.number="form.alert_quantity" 
              type="number" 
              step="any" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark font-mono" 
            />
          </div>
        </div>

        <!-- Color -->
        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2 mt-8">Fabric Swatch & Color</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Color Swatch</label>
            <select 
              v-model="form.color_id" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark"
            >
              <option value="">No Color / Default</option>
              <option v-for="color in colors" :key="color.id" :value="color.id">
                {{ color.name }} ({{ color.code }})
              </option>
            </select>
          </div>
          <div v-if="selectedColorObject" class="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <div class="w-10 h-10 rounded-full border border-gray-300 shadow-sm" :style="{ backgroundColor: selectedColorObject.code }"></div>
            <div>
              <p class="text-sm font-bold">{{ selectedColorObject.name }}</p>
              <p class="text-xs text-gray-500 font-mono">{{ selectedColorObject.code }}</p>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <NuxtLink to="/inventory" class="px-6 py-2 rounded-lg font-bold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Cancel
          </NuxtLink>
          <button type="submit" class="bg-themeRed hover:bg-red-800 text-white px-8 py-2 rounded-lg font-bold shadow-md transition cursor-pointer">
            Save Changes
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePosState } from '~/composables/usePosState'

const router = useRouter()
const route = useRoute()
const { products, categories, units, colors, updateProduct } = usePosState()
const { showAlert } = useUiAlert()

const productId = computed(() => Number(route.query.id))

const form = ref({
  name: '',
  code: '',
  category_id: '',
  barcode_type_id: 1,
  is_service: false,
  sale_unit: 1,
  purchase_unit: 1,
  stock: 0,
  cost: 0,
  price: 0,
  alert_quantity: 5,
  color_id: ''
})

const selectedColorObject = computed(() => {
  if (!form.value.color_id) return null
  return colors.value.find(c => c.id === Number(form.value.color_id))
})

const generateRandomSku = () => {
  form.value.code = `PRD-${Math.floor(1000 + Math.random() * 9000)}`
}

onMounted(() => {
  const product = products.value.find(p => p.id === productId.value)
  if (product) {
    form.value = {
      name: product.name,
      code: product.code,
      category_id: product.category_id || '',
      barcode_type_id: product.barcode_type_id || 1,
      is_service: !!product.is_service,
      sale_unit: product.sale_unit || 1,
      purchase_unit: product.purchase_unit || product.sale_unit || 1,
      stock: product.stock,
      cost: product.cost || 0,
      price: product.price || 0,
      alert_quantity: product.alert_quantity || 5,
      color_id: product.color_id || ''
    }
  } else if (products.value.length > 0) {
    // Fallback if no query id
    const p = products.value[0]
    form.value = {
      name: p.name,
      code: p.code,
      category_id: p.category_id || '',
      barcode_type_id: p.barcode_type_id || 1,
      is_service: !!p.is_service,
      sale_unit: p.sale_unit || 1,
      purchase_unit: p.purchase_unit || 1,
      stock: p.stock,
      cost: p.cost || 0,
      price: p.price || 0,
      alert_quantity: p.alert_quantity || 5,
      color_id: p.color_id || ''
    }
  }
})

const submitForm = () => {
  const selectedUnit = units.value.find(u => u.id === Number(form.value.sale_unit))
  const selectedCat = categories.value.find(c => c.id === Number(form.value.category_id))
  const selectedClr = selectedColorObject.value

  const updated = {
    name: form.value.name.trim(),
    code: form.value.code.trim().toUpperCase(),
    category_id: Number(form.value.category_id),
    category: selectedCat ? selectedCat.name : 'Fabrics',
    unit: selectedUnit ? selectedUnit.code : 'm',
    sale_unit: Number(form.value.sale_unit),
    purchase_unit: Number(form.value.purchase_unit),
    stock: Number(form.value.stock) || 0,
    cost: Number(form.value.cost) || 0,
    price: Number(form.value.price) || 0,
    alert_quantity: Number(form.value.alert_quantity) || 5,
    barcode_type_id: Number(form.value.barcode_type_id) || 1,
    is_service: form.value.is_service ? 1 : 0,
    color_id: selectedClr ? selectedClr.id : null,
    colorName: selectedClr ? selectedClr.name : '',
    colorCode: selectedClr ? selectedClr.code : ''
  }

  updateProduct(productId.value, updated)
  showAlert(`"${updated.name}" updated successfully!`, "Updated", "success")
  router.push('/inventory')
}
</script>
