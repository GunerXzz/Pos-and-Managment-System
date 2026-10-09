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
          <h1 class="text-3xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">Product Details</h1>
          <p class="text-xs md:text-sm text-gray-500 mt-1">Viewing information for {{ currentProduct?.code || 'SKU' }}</p>
        </div>
      </div>
      <NuxtLink :to="'/inventory/edit?id=' + currentProduct?.id" class="bg-themeGold hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-bold shadow-md transition inline-flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        Edit Product
      </NuxtLink>
    </div>

    <div v-if="currentProduct" class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
      <div class="flex flex-col md:flex-row gap-8">
        
        <!-- Image & Barcode -->
        <div class="w-full md:w-1/3 flex flex-col items-center border-r-0 md:border-r border-gray-200 dark:border-gray-800 pr-0 md:pr-8">
          <div v-if="currentProduct.image" class="w-48 h-48 rounded-xl overflow-hidden border border-gray-300 shadow-sm mb-6">
            <img :src="currentProduct.image" :alt="currentProduct.name" class="w-full h-full object-cover" />
          </div>
          <div v-else class="w-48 h-48 rounded-xl bg-gray-100 dark:bg-[#1A1D26] border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-gray-400 mb-6 shadow-sm">
            <span class="text-4xl mb-2">🧵</span>
            <span class="text-xs font-bold uppercase tracking-wider">Fabric Swatch</span>
          </div>
          
          <div class="w-full text-center p-4 bg-gray-50 dark:bg-[#252936] rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
            <div class="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-gray-700">
              <span class="font-bold text-gray-500 uppercase text-xs tracking-wider">Code / Barcode</span>
              <div class="inline-flex rounded-lg border border-gray-300 dark:border-gray-700 p-0.5 bg-white dark:bg-[#1A1D26] text-[11px]">
                <button type="button" @click="codeView = 'barcode'" :class="codeView === 'barcode' ? 'bg-themeRed text-white font-bold' : 'text-gray-500'" class="px-2 py-0.5 rounded cursor-pointer transition">Barcode</button>
                <button type="button" @click="codeView = 'qr'" :class="codeView === 'qr' ? 'bg-themeRed text-white font-bold' : 'text-gray-500'" class="px-2 py-0.5 rounded cursor-pointer transition">QR</button>
                <button type="button" @click="codeView = 'both'" :class="codeView === 'both' ? 'bg-themeRed text-white font-bold' : 'text-gray-500'" class="px-2 py-0.5 rounded cursor-pointer transition">Both</button>
              </div>
            </div>

            <!-- Visual Barcode & QR Code -->
            <div class="py-2 flex flex-col items-center bg-white dark:bg-[#1A1D26] p-3 rounded-lg border border-gray-200 dark:border-gray-700">
              <ReceiptCode 
                :value="currentProduct.code" 
                :mode="codeView" 
                :barcode-height="42" 
                :qr-size="85"
                caption="Scan for fast checkout on POS"
              />
            </div>

            <button 
              type="button" 
              @click="printLabel" 
              class="w-full py-2 bg-themeGold hover:bg-yellow-600 text-gray-950 font-bold rounded-lg text-xs shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Print Product Label
            </button>
          </div>
        </div>

        <!-- Details -->
        <div class="w-full md:w-2/3 space-y-6">
          <div>
            <div class="flex items-center gap-3">
              <h2 class="text-2xl font-black text-gray-800 dark:text-white">{{ currentProduct.name }}</h2>
              <span v-if="currentProduct.is_service" class="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Service</span>
            </div>
            
            <div class="flex flex-wrap items-center gap-2 mt-3">
              <span class="bg-themeRed text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">
                {{ categoryName }}
              </span>
              <div v-if="currentProduct.colorName || currentProduct.colorCode" class="flex items-center gap-1.5 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded-full bg-white dark:bg-[#252936]">
                <span class="w-3.5 h-3.5 rounded-full border border-gray-300" :style="{ backgroundColor: currentProduct.colorCode || '#ccc' }"></span>
                <span class="text-xs font-bold text-gray-700 dark:text-gray-300">{{ currentProduct.colorName || 'Custom Color' }}</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Cost Price</p>
              <p class="text-xl font-bold text-gray-800 dark:text-gray-200">${{ (currentProduct.cost || 0).toFixed(2) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Selling Price</p>
              <p class="text-xl font-bold text-themeGold">${{ (currentProduct.price || 0).toFixed(2) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Current Stock</p>
              <p :class="currentProduct.stock <= currentProduct.alert_quantity ? 'text-red-500 font-bold' : 'text-themeGold font-bold'" class="text-xl">
                {{ currentProduct.stock }} {{ currentProduct.unit }}
              </p>
            </div>
            
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Base Sale Unit</p>
              <p class="font-bold text-gray-800 dark:text-gray-200">{{ baseUnitName }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Purchase Unit</p>
              <p class="font-bold text-gray-800 dark:text-gray-200">{{ purchaseUnitName }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Stock Threshold</p>
              <p class="font-bold text-gray-800 dark:text-gray-200">Alert at &le; {{ currentProduct.alert_quantity }} {{ currentProduct.unit }}</p>
            </div>
          </div>
          
          <div class="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-sm">
            <span class="text-gray-500">POS Fast-Pin Status:</span>
            <span :class="currentProduct.isPinned ? 'text-emerald-500 font-bold' : 'text-gray-400 font-medium'">
              {{ currentProduct.isPinned ? '★ Pinned to POS Catalog Top' : 'Standard Grid Order' }}
            </span>
          </div>
        </div>

      </div>
    </div>
    
    <div v-else class="p-12 text-center text-gray-400">
      <p class="text-base font-bold">Product not found.</p>
      <NuxtLink to="/inventory" class="text-themeRed font-bold underline mt-2 inline-block">Return to Inventory</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePosState } from '~/composables/usePosState'

const route = useRoute()
const { products, categories, units } = usePosState()

const productId = computed(() => Number(route.query.id))

const currentProduct = computed(() => {
  if (productId.value) {
    const found = products.value.find(p => p.id === productId.value)
    if (found) return found
  }
  return products.value[0] || null
})

const categoryName = computed(() => {
  if (!currentProduct.value) return 'Fabrics'
  const cat = categories.value.find(c => c.id === currentProduct.value.category_id)
  return cat ? cat.name : currentProduct.value.category || 'Fabrics'
})

const baseUnitName = computed(() => {
  if (!currentProduct.value) return 'm'
  const u = units.value.find(u => u.id === currentProduct.value.sale_unit)
  return u ? `${u.name} (${u.code})` : currentProduct.value.unit
})

const purchaseUnitName = computed(() => {
  if (!currentProduct.value) return 'm'
  const u = units.value.find(u => u.id === currentProduct.value.purchase_unit)
  return u ? `${u.name} (${u.code})` : currentProduct.value.unit
})

const codeView = ref('both')
const printLabel = () => {
  window.print()
}
</script>
