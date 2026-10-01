<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">{{ $t('inventory') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage fabrics, laces, and tailoring materials</p>
      </div>
      <div class="flex flex-col sm:flex-row w-full md:w-auto gap-2">
        <input type="text" placeholder="Search product or color..." class="w-full sm:w-auto px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-themeGold dark:bg-themeDark" />
        
        <!-- Action -->
        <div class="flex gap-2">
          <button @click="handleExport" class="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-themeDark text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-bold shadow-sm transition flex items-center justify-center gap-2" title="Export to Excel">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-themeGold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            <span class="hidden md:inline">Export</span>
          </button>
          
          <label class="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-themeDark text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-bold shadow-sm transition flex items-center justify-center gap-2 cursor-pointer" title="Import from Excel">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-themeGold hover:text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            <span class="hidden md:inline">Import</span>
            <input type="file" class="hidden" accept=".xlsx, .xls, .csv" @change="handleImport" />
          </label>

          <NuxtLink to="/inventory/add" class="flex-1 sm:flex-none bg-themeRed hover:bg-red-800 text-white px-4 md:px-6 py-2 rounded-lg font-bold shadow-md transition border border-red-900 whitespace-nowrap text-center flex items-center justify-center">
            + Add Product
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-themeDark text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
            <tr>
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
            <tr v-for="product in mockInventory" :key="product.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-4">
                <div v-if="product.image" class="w-12 h-12 rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs font-bold text-gray-400">
                  IMG
                </div>
              </td>
              <td class="p-4 font-bold text-md dark:text-white">{{ product.name }}</td>
              <td class="p-4 font-mono text-sm text-gray-500 dark:text-gray-400">
                <div>{{ product.code }}</div>
                <div class="text-xs text-gray-400">{{ product.barcode_symbology }}</div>
              </td>
              <td class="p-4 text-sm text-gray-600 dark:text-gray-300">
                <span v-if="mockCategories[product.category_id]" class="bg-gray-100 dark:bg-themeDark border border-gray-200 dark:border-gray-700 px-2 py-1 rounded text-xs">{{ mockCategories[product.category_id].name }}</span>
              </td>
              <td class="p-4">
                <div v-if="mockColors[product.color_id]" class="flex items-center gap-2">
                  <span class="w-4 h-4 rounded-full border border-gray-300" :style="{ backgroundColor: mockColors[product.color_id].code }"></span>
                  <span class="text-xs font-semibold">{{ mockColors[product.color_id].name }}</span>
                </div>
              </td>
              <td class="p-4 font-semibold text-gray-600 dark:text-gray-400">
                ${{ product.cost.toFixed(2) }}<br/>
                <span class="text-xs text-gray-400">Per {{ mockUnits[product.purchase_unit]?.name || mockUnits[product.unit]?.name }}</span>
              </td>
              <td class="p-4 font-bold text-themeRed dark:text-red-400">
                ${{ product.price.toFixed(2) }}<br/>
                <span class="text-xs text-gray-400">Per {{ mockUnits[product.sale_unit]?.name }}</span>
              </td>
              <td class="p-4">
                <div class="flex flex-col">
                  <span :class="product.stock <= product.alert_quantity ? 'text-themeRed font-bold' : 'text-themeGold dark:text-gray-300 font-bold'">
                    {{ product.stock }} {{ mockUnits[product.sale_unit]?.code }}
                  </span>
                  <span v-if="product.stock <= product.alert_quantity" class="text-xs text-themeRed animate-pulse">Alert: &le; {{ product.alert_quantity }}</span>
                </div>
              </td>
              <td class="p-4 text-right">
                <button @click="openQrModal(product)" class="text-themeGold hover:text-yellow-600 mr-3 text-sm font-bold uppercase transition">Print QR</button>
                <NuxtLink to="/inventory/detail" class="text-themeGold hover:text-yellow-600 mr-3 text-sm font-bold uppercase transition">View</NuxtLink>
                <NuxtLink to="/inventory/edit" class="text-themeGold hover:text-yellow-600 mr-3 text-sm font-bold uppercase transition">Edit</NuxtLink>
                <button @click="deleteProduct(product)" class="text-themeRed hover:text-red-800 text-sm font-bold uppercase transition">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- QR -->
    <div v-if="showQrModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-themeDark p-6 md:p-8 rounded-xl shadow-2xl max-w-sm w-full border border-gray-200 dark:border-gray-800 text-center flex flex-col items-center">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2"> Label</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">{{ selectedProduct?.name }}</p>
        
        <div id="print-area" class="bg-white p-4 border-2 border-dashed border-gray-300 rounded-lg inline-block text-black">
          <div class="text-xs font-bold text-gray-800 mb-2 text-center uppercase tracking-wider">{{ selectedProduct?.name }}</div>
          <qrcode-vue :value="selectedProduct?.code || ''" :size="150" level="H" render-as="svg" class="mx-auto" />
          <div class="text-sm font-mono text-gray-800 mt-2 text-center">{{ selectedProduct?.code }}</div>
          <div class="text-lg font-bold mt-1 text-center font-sans">${{ selectedProduct?.price?.toFixed(2) }}</div>
        </div>

        <div class="flex gap-4 mt-8 w-full">
          <button @click="closeQrModal" class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition font-bold">Cancel</button>
          <button @click="printQr" class="flex-1 px-4 py-2 bg-themeRed text-white rounded-lg hover:bg-red-800 transition font-bold shadow-md flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            Print
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'

const showQrModal = ref(false)
const selectedProduct = ref(null)

const openQrModal = (product) => {
  selectedProduct.value = product
  showQrModal.value = true
}

const closeQrModal = () => {
  showQrModal.value = false
  selectedProduct.value = null
}

const printQr = () => {
  const printContents = document.getElementById('print-area').innerHTML;
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Print Label</title>');
  printWindow.document.write('<style>');
  printWindow.document.write('body { font-family: sans-serif; display: flex; justify-content: center; margin-top: 40px; color: black; }');
  printWindow.document.write('.text-center { text-align: center; }');
  printWindow.document.write('.text-xs { font-size: 12px; }');
  printWindow.document.write('.text-sm { font-size: 14px; }');
  printWindow.document.write('.text-lg { font-size: 24px; font-weight: bold; }');
  printWindow.document.write('.font-bold { font-weight: bold; }');
  printWindow.document.write('.font-mono { font-family: monospace; }');
  printWindow.document.write('.uppercase { text-transform: uppercase; }');
  printWindow.document.write('.tracking-wider { letter-spacing: 0.05em; }');
  printWindow.document.write('.mb-2 { margin-bottom: 8px; }');
  printWindow.document.write('.mt-2 { margin-top: 8px; }');
  printWindow.document.write('.mt-1 { margin-top: 4px; }');
  printWindow.document.write('svg { width: 150px; height: 150px; margin: 0 auto; display: block; }');
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

const mockCategories = {
  1: { id: 1, name: 'Traditional', code: 'TRD', parent_id: null, status: 'active' },
  2: { id: 2, name: 'Silk', code: 'SLK', parent_id: null, status: 'active' },
  3: { id: 3, name: 'Cotton', code: 'COT', parent_id: null, status: 'active' },
  4: { id: 4, name: 'Accessories', code: 'ACC', parent_id: null, status: 'active' }
};

const mockUnits = {
  1: { id: 1, name: 'Meter', code: 'm', base_unit: null },
  2: { id: 2, name: 'Piece', code: 'pc', base_unit: null },
  3: { id: 3, name: 'Roll', code: 'roll', base_unit: null },
  4: { id: 4, name: 'Kben', code: 'kben', base_unit: null }
};

const mockColors = {
  1: { id: 1, name: 'Crimson', code: '#DC143C' },
  2: { id: 2, name: 'Gold', code: '#FFD700' },
  3: { id: 3, name: 'White', code: '#FFFFFF' },
  4: { id: 4, name: 'Dark Red', code: '#8B0000' }
};

const mockInventory = ref([
  { id: 1, name: 'Premium Red Silk', code: 'PRD-1001', barcode_symbology: 'CODE128', category_id: 2, unit: 1, purchase_unit: 1, sale_unit: 1, cost: 10.00, price: 15.50, stock: 45.5, alert_quantity: 10, image: 'https://placehold.co/100x100/DC143C/white?text=Silk', color_id: 1 },
  { id: 2, name: 'Royal Gold Embroidery Thread', code: 'PRD-1002', barcode_symbology: 'EAN13', category_id: 4, unit: 3, purchase_unit: 3, sale_unit: 3, cost: 0.80, price: 1.50, stock: 50, alert_quantity: 20, image: 'https://placehold.co/100x100/FFD700/black?text=Thread', color_id: 2 },
  { id: 3, name: 'White Lace Trim Floral', code: 'PRD-1003', barcode_symbology: 'UPC-A', category_id: 1, unit: 1, purchase_unit: 1, sale_unit: 1, cost: 1.50, price: 2.25, stock: 8.0, alert_quantity: 15, image: 'https://placehold.co/100x100/FFFFFF/black?text=Lace', color_id: 3 },
  { id: 4, name: 'Khmer Traditional Hol', code: 'PRD-1004', barcode_symbology: 'QR', category_id: 1, unit: 4, purchase_unit: 4, sale_unit: 4, cost: 25.00, price: 40.00, stock: 1.5, alert_quantity: 2, image: 'https://placehold.co/100x100/8B0000/white?text=Hol', color_id: 4 },
])

const deleteProduct = async (product) => {
  const { showConfirm } = useUiAlert()
  const result = await showConfirm(`Are you sure you want to delete ${product.name}?`, "Delete Product")
  if (result.isConfirmed) {
    mockInventory.value = mockInventory.value.filter(p => p.id !== product.id)
  }
}
</script>