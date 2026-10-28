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
          <h1 class="text-3xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">Add Product</h1>
          <p class="text-xs md:text-sm text-gray-500 mt-1">Create a new product or boutique fabric in the catalog</p>
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
              v-model="productForm.name" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
              placeholder="e.g. Royal Golden Silk" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Category <span class="text-themeRed">*</span></label>
            <select 
              v-model="productForm.category_id" 
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
                class="text-xs text-themeGold hover:underline font-bold cursor-pointer inline-flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                <span>Auto Generate</span>
              </button>
            </div>
            <input 
              v-model="productForm.code" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark font-mono uppercase" 
              placeholder="e.g. FAB-1001" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Barcode Type</label>
            <select 
              v-model="productForm.barcode_type_id" 
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
              v-model="productForm.is_service" 
              class="w-4 h-4 text-themeRed border-gray-300 rounded focus:ring-themeRed" 
            />
            <label for="is_service" class="text-sm font-bold cursor-pointer">This is a Service (e.g. Tailoring, Custom Cutting)</label>
          </div>
        </div>

        <!-- Units & Pricing -->
        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2 mt-8">Units, Stock & Pricing</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Base Unit <span class="text-themeRed">*</span></label>
            <select 
              v-model="productForm.sale_unit" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
              required
            >
              <option value="">Select Unit</option>
              <option v-for="unit in units" :key="unit.id" :value="unit.id">
                {{ unit.name }} ({{ unit.code }})
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Purchase Unit</label>
            <select 
              v-model="productForm.purchase_unit" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark"
            >
              <option value="">Same as Base Unit</option>
              <option v-for="unit in units" :key="unit.id" :value="unit.id">
                {{ unit.name }} ({{ unit.code }})
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Initial Stock <span class="text-themeRed">*</span></label>
            <input 
              v-model.number="productForm.stock" 
              type="number" 
              step="any" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark font-mono" 
              placeholder="e.g. 50.5" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Cost (Purchase Price $) <span class="text-themeRed">*</span></label>
            <input 
              v-model.number="productForm.cost" 
              type="number" 
              step="0.01" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark font-mono" 
              placeholder="0.00" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Price (Selling Price $) <span class="text-themeRed">*</span></label>
            <input 
              v-model.number="productForm.price" 
              type="number" 
              step="0.01" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark font-mono" 
              placeholder="0.00" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Alert Quantity</label>
            <input 
              v-model.number="productForm.alert_quantity" 
              type="number" 
              step="any" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark font-mono" 
              placeholder="10" 
            />
          </div>
        </div>

        <!-- Color & Swatches -->
        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2 mt-8">Fabric Swatch & Color</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Color Swatch</label>
            <select 
              v-model="productForm.color_id" 
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

        <!-- Product Photo Upload -->
        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2 mt-8">Product Picture</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <label class="block text-sm font-bold mb-2">Upload Fabric Photo</label>
            <div 
              class="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-themeGold dark:hover:border-themeGold rounded-2xl p-6 text-center transition cursor-pointer relative bg-gray-50/50 dark:bg-gray-900/30"
              @dragover.prevent
              @drop.prevent="handleFileDrop"
            >
              <input 
                type="file" 
                ref="fileInputRef"
                accept="image/*" 
                class="hidden" 
                @change="handleFileUpload" 
              />
              <div @click="$refs.fileInputRef?.click()" class="space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div class="text-sm font-bold text-gray-700 dark:text-gray-200">
                  Click to select photo or drag and drop
                </div>
                <p class="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</p>
              </div>
            </div>
          </div>

          <!-- Image Preview -->
          <div>
            <label class="block text-sm font-bold mb-2">Preview</label>
            <div v-if="productForm.image" class="relative rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 aspect-[4/3] max-w-xs shadow-sm">
              <img :src="productForm.image" alt="Uploaded Preview" class="w-full h-full object-cover" />
              <button 
                type="button" 
                @click="productForm.image = ''" 
                class="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 hover:bg-red-600 text-white transition shadow-sm cursor-pointer"
                title="Remove Image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div v-else class="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 aspect-[4/3] max-w-xs flex flex-col items-center justify-center text-gray-400 text-xs">
              <span class="text-sm font-semibold">No Image Selected</span>
              <span class="text-[10px] text-gray-500 mt-1">Default silk fabric swatch will be used</span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <NuxtLink to="/inventory" class="px-6 py-2 rounded-lg font-bold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Cancel
          </NuxtLink>
          <button type="submit" class="bg-themeRed hover:bg-red-800 text-white px-8 py-2 rounded-lg font-bold shadow-md transition cursor-pointer">
            Save Product
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
const { categories, units, colors, addProduct } = usePosState()
const { showAlert } = useUiAlert()
const fileInputRef = ref(null)

const productForm = ref({
  name: '',
  code: '',
  category_id: '',
  barcode_type_id: 1,
  is_service: false,
  sale_unit: '',
  purchase_unit: '',
  stock: null,
  cost: null,
  price: null,
  alert_quantity: null,
  color_id: '',
  image: ''
})

const handleFileUpload = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  processImageFile(file)
}

const handleFileDrop = (e) => {
  const file = e.dataTransfer?.files?.[0]
  if (!file) return
  processImageFile(file)
}

const processImageFile = (file) => {
  if (!file.type.startsWith('image/')) {
    showAlert("Please upload a valid image file", "Invalid File", "warning")
    return
  }
  const reader = new FileReader()
  reader.onload = (event) => {
    productForm.value.image = event.target?.result
  }
  reader.readAsDataURL(file)
}

const generateRandomSku = () => {
  productForm.value.code = `PK-${Math.floor(100 + Math.random() * 900)}`
}

const selectedColorObject = computed(() => {
  if (!productForm.value.color_id) return null
  return colors.value.find(c => c.id === Number(productForm.value.color_id))
})

const submitForm = () => {
  if (!productForm.value.name || !productForm.value.code || !productForm.value.category_id || !productForm.value.sale_unit) {
    showAlert("Please fill in all required fields", "Incomplete Form", "warning")
    return
  }

  const selectedUnit = units.value.find(u => u.id === Number(productForm.value.sale_unit))
  const selectedCat = categories.value.find(c => c.id === Number(productForm.value.category_id))
  const selectedClr = selectedColorObject.value

  const newProduct = {
    id: Date.now(),
    name: productForm.value.name.trim(),
    code: productForm.value.code.trim().toUpperCase(),
    category_id: Number(productForm.value.category_id),
    category: selectedCat ? selectedCat.name : 'Fabrics',
    unit: selectedUnit ? selectedUnit.code : 'm',
    sale_unit: Number(productForm.value.sale_unit),
    purchase_unit: productForm.value.purchase_unit ? Number(productForm.value.purchase_unit) : Number(productForm.value.sale_unit),
    stock: Number(productForm.value.stock) || 0,
    cost: Number(productForm.value.cost) || 0,
    price: Number(productForm.value.price) || 0,
    alert_quantity: Number(productForm.value.alert_quantity) || 5,
    barcode_type_id: Number(productForm.value.barcode_type_id) || 1,
    is_service: productForm.value.is_service ? 1 : 0,
    color_id: selectedClr ? selectedClr.id : null,
    colorName: selectedClr ? selectedClr.name : '',
    colorCode: selectedClr ? selectedClr.code : '',
    image: productForm.value.image || '',
    isPinned: false
  }

  addProduct(newProduct)
  showAlert(`"${newProduct.name}" added to inventory successfully!`, "Success", "success")
  router.push('/inventory')
}
</script>
