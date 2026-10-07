<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-[#0F1117] text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">{{ $t('sales') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">View transaction history, invoices, and manage returns</p>
      </div>
      <div class="flex relative w-full md:w-auto gap-2 md:gap-4">
        <input type="date" class="w-full md:w-auto px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-themeGold bg-white dark:bg-[#252936] text-gray-700 dark:text-gray-200" />
        
        <button @click="showFilter = !showFilter" class="px-4 py-2 bg-gray-100 dark:bg-[#252936] border-2 border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition" title="Smart Filter">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
        </button>

        <!-- Smart Filter Dropdown -->
        <div v-if="showFilter" class="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-themeDark rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 z-50 p-4 animate-fade-in">
          <h3 class="text-sm font-bold border-b border-gray-200 dark:border-gray-800 pb-2 mb-3 text-themeGold">Smart Filter</h3>
          <div class="space-y-3 text-left">
            <div>
              <label class="block text-xs font-bold text-gray-500 mb-1">Sale Status</label>
              <select class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900 focus:outline-none">
                <option value="">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-500 mb-1">Payment Status</label>
              <select class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900 focus:outline-none">
                <option value="">All</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>
            <div class="pt-2">
              <button @click="showFilter = false" class="w-full bg-themeRed text-white py-1.5 rounded text-sm font-bold hover:bg-red-800 transition">Apply Filters</button>
            </div>
          </div>
        </div>

        <button @click="exportReport" class="w-full md:w-auto bg-gray-100 dark:bg-[#252936] hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg font-bold shadow-sm transition whitespace-nowrap">
          Export Report
        </button>
      </div>
    </div>

    <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-[#1A1D26] text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
            <tr>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Invoice No.</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Date & Time</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Customer</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Created By</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs">Sale Status</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs">Payment Status</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs text-right">Grand Total</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="mockSales.length === 0">
              <td colspan="8" class="p-10 text-center text-gray-400">
                <div class="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p class="font-bold text-sm text-gray-500">No sales transactions recorded yet</p>
                  <p class="text-xs text-gray-400 mt-1">Completed sales on the POS screen will appear here automatically</p>
                </div>
              </td>
            </tr>
            <tr v-for="sale in mockSales" :key="sale.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-4 font-mono font-bold text-themeRed dark:text-red-400">{{ sale.reference_no }}</td>
              <td class="p-4 text-sm text-gray-600 dark:text-gray-300">
                <div class="font-semibold">{{ sale.date }}</div>
                <div class="text-xs text-gray-400">{{ sale.time }}</div>
              </td>
              <td class="p-4 text-sm text-gray-600 dark:text-gray-300">
                <div class="font-bold text-gray-800 dark:text-gray-200">{{ sale.customer_name || 'Walk-in Customer' }}</div>
                <div v-if="sale.customer_phone" class="text-xs text-gray-400">{{ sale.customer_phone }}</div>
              </td>
              <td class="p-4 text-sm font-medium text-gray-700 dark:text-gray-200">{{ sale.created_by }}</td>
              <td class="p-4">
                <span :class="sale.sale_status === 'Completed' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800'" class="px-2 py-1 rounded text-xs font-bold uppercase">
                  {{ sale.sale_status }}
                </span>
              </td>
              <td class="p-4">
                <span :class="{
                  'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700': sale.payment_status === 'Paid',
                  'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800': sale.payment_status === 'Unpaid',
                  'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800  dark:border-gray-700': sale.payment_status === 'Partial (Split)'
                }" class="px-2 py-1 rounded text-xs font-bold uppercase border">
                  {{ sale.payment_status }}
                </span>
                <div v-if="sale.payment_status === 'Partial (Split)' || sale.payment_status === 'Partial'" class="text-xs text-gray-500 mt-1">Cash / ABA</div>
              </td>
              <td class="p-4 text-right font-black text-lg text-themeGold drop-shadow-sm">${{ (sale.grand_total || sale.total || 0).toFixed(2) }}</td>
              <td class="p-4 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  <NuxtLink to="/sales/detail" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider" title="View Invoice">View</NuxtLink>
                  <button @click="openUpdateModal(sale)" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider" title="Update Status">Update</button>
                  <button @click="printInvoice(sale)" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider" title="Print Invoice">Print</button>
                  <button @click="processReturn(sale)" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider" title="Return / Exchange">Return</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Update Status Modal -->
    <div v-if="showUpdateModal && editingSale" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-2xl w-full max-w-sm overflow-hidden p-5 border border-gray-200 dark:border-gray-800">
        <h3 class="text-xl font-bold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">Update Sale: {{ editingSale.reference_no }}</h3>
        
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Sale Status</label>
            <select v-model="updateForm.sale_status" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-[#252936] dark:text-white focus:outline-none focus:border-themeRed">
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Payment Status</label>
            <select v-model="updateForm.payment_status" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-[#252936] dark:text-white focus:outline-none focus:border-themeRed">
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 justify-end">
          <button @click="showUpdateModal = false; editingSale = null" class="px-4 py-2 text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition text-xs">Cancel</button>
          <button @click="saveUpdateStatus" class="px-6 py-2 bg-themeRed hover:bg-red-800 text-white rounded font-bold transition text-xs">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { sales } = usePosState()
const mockSales = sales

const showFilter = ref(false)
const showUpdateModal = ref(false)
const editingSale = ref(null)
const updateForm = ref({
  sale_status: '',
  payment_status: ''
})

const openUpdateModal = (sale) => {
  editingSale.value = sale
  updateForm.value.sale_status = sale.sale_status
  updateForm.value.payment_status = sale.payment_status
  showUpdateModal.value = true
}

const saveUpdateStatus = () => {
  if (editingSale.value) {
    editingSale.value.sale_status = updateForm.value.sale_status
    editingSale.value.payment_status = updateForm.value.payment_status
  }
  showUpdateModal.value = false
  const { showAlert } = useUiAlert()
  showAlert("Sale status updated successfully!", "Success", "success")
}

const exportReport = () => {
  const { showAlert } = useUiAlert()
  showAlert("Static Action: 'Export Report' will generate a PDF/Excel file of current sales.", "Export", "info")
}

const printInvoice = (sale) => {
  const { showAlert } = useUiAlert()
  showAlert(`Static Action: Printing Invoice ${sale.reference_no}`, "Print", "info")
}

const processReturn = (sale) => {
  const { showAlert } = useUiAlert()
  showAlert(`Static Action: Opening Return/Exchange flow for Invoice ${sale.reference_no}`, "Return", "info")
}
</script>