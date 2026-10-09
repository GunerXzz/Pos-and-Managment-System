<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-[#0F1117] text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">{{ $t('inventory') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage fabrics, laces, and tailoring materials</p>
      </div>
      <div class="flex flex-col sm:flex-row w-full md:w-auto gap-2">
        <div class="flex relative gap-2 w-full sm:w-auto">
          <input type="text" v-model="searchQuery" placeholder="Search product or color..." class="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-themeGold bg-white dark:bg-[#252936]" />
          <button @click="showFilter = !showFilter" class="px-4 py-2 bg-gray-100 dark:bg-[#252936] border-2 border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition" title="Smart Filter">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          </button>
          
          <!-- Smart Filter Dropdown -->
          <div v-if="showFilter" class="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-[#1A1D26] rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 z-50 p-4 animate-fade-in">
            <h3 class="text-sm font-bold border-b border-gray-200 dark:border-gray-800 pb-2 mb-3 text-themeGold">Smart Filter</h3>
            <div class="space-y-3 text-left">
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1">Category</label>
                <select v-model="filterCategory" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-[#252936] focus:outline-none">
                  <option value="">All Categories</option>
                  <option v-for="cat in categoriesList" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1">Stock Status</label>
                <select v-model="filterStock" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900 focus:outline-none">
                  <option value="">All</option>
                  <option value="low">Low Stock</option>
                  <option value="out">Out of Stock</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1">Product Type</label>
                <select v-model="filterType" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900 focus:outline-none">
                  <option value="">All Types</option>
                  <option value="0">Physical Product</option>
                  <option value="1">Service</option>
                </select>
              </div>
              <div class="pt-2">
                <button @click="showFilter = false" class="w-full bg-themeRed text-white py-1.5 rounded text-sm font-bold hover:bg-red-800 transition">Apply Filters</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Action -->
        <div class="flex flex-wrap gap-2">
          <button @click="handleResetAll" class="px-3 py-2 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 font-bold shadow-sm transition flex items-center justify-center gap-1.5 text-xs cursor-pointer" title="Clean and wipe all data to start fresh">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            <span>Clean Data</span>
          </button>

          <button @click="handleExport" class="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-themeDark text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-bold shadow-sm transition flex items-center justify-center gap-2" title="Export to Excel">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-themeGold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            <span class="hidden md:inline">Export</span>
          </button>
          
          <label class="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-themeDark text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-bold shadow-sm transition flex items-center justify-center gap-2 cursor-pointer" title="Import from Excel">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-themeGold hover:text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            <span class="hidden md:inline">Import</span>
            <input type="file" class="hidden" accept=".xlsx, .xls, .csv" @change="handleImport" />
          </label>

          <button v-if="selectedProductsToPrint.length > 0" @click="showQrModal = true" class="flex-1 sm:flex-none px-4 py-2 bg-themeGold hover:bg-yellow-600 text-gray-900 rounded-lg font-bold shadow-md transition flex items-center justify-center gap-2 animate-fade-in whitespace-nowrap cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print {{ selectedProductsToPrint.length }} Labels
          </button>

          <NuxtLink to="/inventory/add" class="flex-1 sm:flex-none bg-themeRed hover:bg-red-800 text-white px-4 md:px-6 py-2 rounded-lg font-bold shadow-md transition border border-red-900 whitespace-nowrap text-center flex items-center justify-center cursor-pointer">
            + Add Product
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-[#1A1D26] text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
            <tr>
              <th class="p-4 w-10">
                <input type="checkbox" @change="toggleAll" :checked="selectedProductsToPrint.length === filteredProducts.length && filteredProducts.length > 0" class="w-4 h-4 rounded text-themeRed border-gray-300 focus:ring-themeRed" />
              </th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Image</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Product Details</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Code / Barcode</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Category</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Color</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs">Cost (In)</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs">Price (Out)</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs">Stock / Alert</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="10" class="p-10 text-center text-gray-400">
                <div class="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <p class="font-bold text-sm text-gray-500">No products found in inventory</p>
                  <p class="text-xs text-gray-400 mt-1">Click "+ Add Product" to add fabrics, threads, or custom services</p>
                </div>
              </td>
            </tr>
            <tr v-for="product in filteredProducts" :key="product.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition" :class="{'bg-red-50/50 dark:bg-red-900/20': selectedProductsToPrint.some(p => p.id === product.id)}">
              <td class="p-4">
                <input type="checkbox" :value="product" v-model="selectedProductsToPrint" class="w-4 h-4 rounded text-themeRed border-gray-300 focus:ring-themeRed" />
              </td>
              <td class="p-4">
                <div v-if="product.image" class="w-12 h-12 rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs font-bold text-gray-400">
                  IMG
                </div>
              </td>
              <td class="p-4">
                <div class="font-bold text-md dark:text-white flex items-center gap-2">
                  {{ product.name }}
                  <span v-if="product.is_service" class="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Service</span>
                </div>
              </td>
              <td class="p-4 font-mono text-sm text-gray-500 dark:text-gray-400">
                <div>{{ product.code }}</div>
                <div class="text-xs text-gray-400">{{ mockBarcodeTypes[product.barcode_type_id]?.name }}</div>
              </td>
              <td class="p-4 text-sm text-gray-600 dark:text-gray-300">
                <span class="bg-gray-100 dark:bg-[#252936] border border-gray-200 dark:border-gray-700 px-2 py-1 rounded text-xs">
                  {{ mockCategories[product.category_id]?.name || 'Fabrics' }}
                </span>
              </td>
              <td class="p-4">
                <div class="flex items-center gap-2">
                  <span class="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600" :style="{ backgroundColor: mockColors[product.color_id]?.code || product.colorCode || '#ccc' }"></span>
                  <span class="text-xs font-semibold">{{ mockColors[product.color_id]?.name || product.colorName || 'Standard' }}</span>
                </div>
              </td>
              <td class="p-4 font-semibold text-gray-600 dark:text-gray-400">
                ${{ (product.cost || 0).toFixed(2) }}<br/>
                <span class="text-xs text-gray-400">Per {{ mockUnits[product.purchase_unit]?.name || product.unit }}</span>
              </td>
              <td class="p-4 font-bold text-themeRed dark:text-red-400">
                ${{ product.price.toFixed(2) }}<br/>
                <span class="text-xs text-gray-400">Per {{ mockUnits[product.sale_unit]?.name || product.unit }}</span>
              </td>
              <td class="p-4">
                <div class="flex flex-col">
                  <span :class="product.stock <= product.alert_quantity ? 'text-themeRed font-bold' : 'text-themeGold dark:text-gray-300 font-bold'">
                    {{ product.stock }} {{ mockUnits[product.sale_unit]?.code || product.unit }}
                  </span>
                  <span v-if="product.stock <= product.alert_quantity" class="text-xs text-themeRed animate-pulse">Alert: &le; {{ product.alert_quantity }}</span>
                </div>
              </td>
              <td class="p-4 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <button @click="openQrModal(product)" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer" title="Print Barcode / QR Label">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
                    Label
                  </button>
                  <NuxtLink :to="'/inventory/detail?id=' + product.id" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider" title="View Details">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    View
                  </NuxtLink>
                  <NuxtLink :to="'/inventory/edit?id=' + product.id" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider" title="Edit Product">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Edit
                  </NuxtLink>
                  <button @click="deleteProduct(product)" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer" title="Delete Product">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Print Label Modal (Supports Barcode, QR Code, or Both) -->
    <div v-if="showQrModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-themeDark p-6 md:p-8 rounded-2xl shadow-2xl max-w-4xl w-full border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh] animate-fade-in">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
              Print Labels ({{ selectedProductsToPrint.length }})
            </h2>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Generate 1D Barcode, 2D QR Code, or Dual format stickers</p>
          </div>

          <!-- Format Picker -->
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-xs font-bold text-gray-500">Format:</span>
            <div class="inline-flex rounded-lg border border-gray-300 dark:border-gray-700 p-0.5 bg-gray-100 dark:bg-[#1A1D26] text-xs">
              <button 
                type="button" 
                @click="labelFormat = 'barcode'" 
                :class="labelFormat === 'barcode' ? 'bg-themeRed text-white font-bold' : 'text-gray-600 dark:text-gray-400'" 
                class="px-2.5 py-1 rounded-md transition cursor-pointer"
              >
                1D Barcode
              </button>
              <button 
                type="button" 
                @click="labelFormat = 'qr'" 
                :class="labelFormat === 'qr' ? 'bg-themeRed text-white font-bold' : 'text-gray-600 dark:text-gray-400'" 
                class="px-2.5 py-1 rounded-md transition cursor-pointer"
              >
                2D QR
              </button>
              <button 
                type="button" 
                @click="labelFormat = 'both'" 
                :class="labelFormat === 'both' ? 'bg-themeRed text-white font-bold' : 'text-gray-600 dark:text-gray-400'" 
                class="px-2.5 py-1 rounded-md transition cursor-pointer"
              >
                Both
              </button>
            </div>
            <button @click="closeQrModal" class="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 text-lg">✕</button>
          </div>
        </div>
        
        <!-- Options Bar -->
        <div class="flex items-center gap-4 mb-4 text-xs font-semibold text-gray-600 dark:text-gray-400">
          <label class="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" v-model="includePrice" class="rounded text-themeRed" />
            <span>Include Price</span>
          </label>
          <label class="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" v-model="includeCode" class="rounded text-themeRed" />
            <span>Include SKU Code</span>
          </label>
        </div>

        <div class="overflow-y-auto flex-grow p-4 md:p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 mb-6">
          <div id="print-area" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
            <div 
              v-for="prod in selectedProductsToPrint" 
              :key="prod.id + Math.random()" 
              class="bg-white p-3 border border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-between text-black break-inside-avoid shadow-sm print:shadow-none w-44 min-h-[140px] label-card text-center"
            >
              <div class="text-[11px] font-bold text-gray-900 mb-1 uppercase tracking-wider line-clamp-2 w-full leading-tight">
                {{ prod.name }}
              </div>

              <!-- Barcode / QR / Both -->
              <div class="my-auto py-1 w-full flex flex-col items-center justify-center">
                <!-- Barcode Only -->
                <Barcode128 
                  v-if="labelFormat === 'barcode'" 
                  :value="prod.code" 
                  :height="36" 
                  :show-text="false" 
                />

                <!-- QR Only -->
                <qrcode-vue 
                  v-else-if="labelFormat === 'qr'" 
                  :value="prod.code || ''" 
                  :size="75" 
                  level="M" 
                  render-as="svg" 
                  class="mx-auto" 
                />

                <!-- Both -->
                <div v-else class="flex flex-col items-center gap-1 w-full">
                  <Barcode128 :value="prod.code" :height="26" :show-text="false" />
                  <qrcode-vue :value="prod.code || ''" :size="48" level="M" render-as="svg" class="mx-auto" />
                </div>
              </div>

              <div v-if="includeCode" class="text-[10px] font-mono font-bold text-gray-700 tracking-wider">
                {{ prod.code }}
              </div>
              <div v-if="includePrice" class="text-xs font-black mt-0.5 font-sans text-themeRed">
                ${{ prod.price?.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 w-full">
          <button @click="closeQrModal" class="px-5 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition font-bold text-sm">Cancel</button>
          <button @click="printQr" class="px-6 py-2 bg-themeRed text-white rounded-lg hover:bg-red-800 transition font-bold shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print {{ selectedProductsToPrint.length }} Labels
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import QrcodeVue from 'qrcode.vue'
import Barcode128 from '~/components/Barcode128.vue'

const showQrModal = ref(false)
const showFilter = ref(false)
const selectedProductsToPrint = ref([])
const labelFormat = ref('both') // 'barcode' | 'qr' | 'both'
const includePrice = ref(true)
const includeCode = ref(true)

// Search & filter state
const searchQuery = ref('')
const filterCategory = ref('')
const filterStock = ref('')
const filterType = ref('')

const { products, categories, units, colors, deleteProduct: stateDeleteProduct, clearAllData } = usePosState()

// filteredProducts: replaces unbound mockInventory alias — fully reactive to search + Smart Filter
const filteredProducts = computed(() => {
  let list = products.value

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      (p.colorName || '').toLowerCase().includes(q)
    )
  }

  if (filterCategory.value) {
    list = list.filter(p => String(p.category_id) === String(filterCategory.value))
  }

  if (filterStock.value === 'low') {
    list = list.filter(p => !p.is_service && p.stock > 0 && p.stock <= p.alert_quantity)
  } else if (filterStock.value === 'out') {
    list = list.filter(p => !p.is_service && p.stock <= 0)
  }

  if (filterType.value === '0') {
    list = list.filter(p => !p.is_service)
  } else if (filterType.value === '1') {
    list = list.filter(p => !!p.is_service)
  }

  return list
})

const mockInventory = filteredProducts // alias kept so any other references don't break

const toggleAll = (e) => {
  if (e.target.checked) {
    selectedProductsToPrint.value = [...filteredProducts.value]
  } else {
    selectedProductsToPrint.value = []
  }
}

const openQrModal = (product) => {
  selectedProductsToPrint.value = [product]
  showQrModal.value = true
}

const closeQrModal = () => {
  showQrModal.value = false
}

const printQr = () => {
  const printContents = document.getElementById('print-area').innerHTML;
  const printWindow = window.open('', '', 'height=650,width=850');
  printWindow.document.write('<html><head><title>Print Product Labels</title>');
  printWindow.document.write('<style>');
  printWindow.document.write('body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 20px; color: black; background: white; }');
  printWindow.document.write('.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; justify-items: center; }');
  printWindow.document.write('.label-card { display: flex; flex-direction: column; align-items: center; justify-content: space-between; width: 44mm; min-height: 35mm; text-align: center; border: 1px dashed #bbb; padding: 6px; page-break-inside: avoid; }');
  printWindow.document.write('.text-center { text-align: center; }');
  printWindow.document.write('.text-\\[10px\\] { font-size: 10px; }');
  printWindow.document.write('.text-\\[11px\\] { font-size: 11px; font-weight: bold; }');
  printWindow.document.write('.text-xs { font-size: 12px; font-weight: bold; }');
  printWindow.document.write('.font-mono { font-family: monospace; }');
  printWindow.document.write('.uppercase { text-transform: uppercase; }');
  printWindow.document.write('.tracking-wider { letter-spacing: 0.05em; }');
  printWindow.document.write('.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }');
  printWindow.document.write('svg { max-width: 100%; display: block; margin: 2px auto; }');
  printWindow.document.write('@media print { .label-card { border: none !important; margin: 2mm; } }');
  printWindow.document.write('</style>');
  printWindow.document.write('</head><body>');
  printWindow.document.write('<div>' + printContents + '</div>');
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}

const handleResetAll = async () => {
  const { showConfirm, showAlert } = useUiAlert()
  const result = await showConfirm(
    "Are you sure you want to clean and wipe ALL storage data? This will clear all products, categories, colors, units, and sales to give you a 100% clean slate.",
    "Clean All Data"
  )
  if (result.isConfirmed) {
    clearAllData()
    selectedProductsToPrint.value = []
    showAlert("All data has been cleaned! Your workspace is now a completely clean slate.", "Clean Slate", "success")
  }
}

const handleExport = () => {
  const { showAlert } = useUiAlert()
  showAlert("Exporting inventory to Excel (.xlsx)...", "Exporting", "info");
}

const handleImport = (event) => {
  const file = event.target.files[0];
  if (file) {
    const { showAlert } = useUiAlert()
    showAlert(`Importing products from ${file.name}...\n(UI Mockup)`, "Importing", "info");
    event.target.value = null; // reset input
  }
}

const categoriesList = computed(() => categories.value)

const mockCategories = computed(() => {
  // Returns array for filter dropdown; also used as map by table cells via mockCategories[id]
  const arr = categories.value
  // Attach index-by-id access so template expressions like mockCategories[cat_id]?.name still work
  const result = Object.assign([...arr], {})
  arr.forEach(c => { result[c.id] = c })
  return result
})

const mockUnits = computed(() => {
  const map = {}
  units.value.forEach(u => { map[u.id] = u })
  return map
})

const mockColors = computed(() => {
  const map = {}
  colors.value.forEach(c => { map[c.id] = c })
  return map
})

const mockBarcodeTypes = {
  1: { id: 1, name: 'CODE128' },
  2: { id: 2, name: 'EAN13' },
  3: { id: 3, name: 'UPC-A' },
  4: { id: 4, name: 'QR' }
};

const deleteProduct = async (product) => {
  const { showConfirm, showAlert } = useUiAlert()
  const result = await showConfirm(`Are you sure you want to delete ${product.name}?`, "Delete Product")
  if (result.isConfirmed) {
    stateDeleteProduct(product.id)
    showAlert(`Product "${product.name}" deleted successfully!`, "Deleted", "success")
  }
}
</script>