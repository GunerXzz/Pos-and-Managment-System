<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">{{ $t('sales') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">View transaction history, invoices, and manage returns</p>
      </div>
      <div class="flex relative w-full md:w-auto gap-2 md:gap-4">
        <input type="date" class="w-full md:w-auto px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-themeGold dark:bg-themeDark text-gray-700 dark:text-gray-200" />
        
        <button @click="showFilter = !showFilter" class="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition" title="Smart Filter">
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

        <button @click="exportReport" class="w-full md:w-auto bg-gray-100 dark:bg-themeDark hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg font-bold shadow-sm transition whitespace-nowrap">
          Export Report
        </button>
      </div>
    </div>

    <div class="bg-white bg-opacity-50 dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white bg-opacity-50 dark:bg-themeDark text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
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
              <td class="p-4 text-right font-black text-lg text-themeGold drop-shadow-sm">${{ sale.grand_total.toFixed(2) }}</td>
              <td class="p-4 text-center">
                <div class="flex items-center justify-center gap-3">
                  <NuxtLink to="/sales/detail" class="text-gray-600 dark:text-gray-400 hover:text-themeGold transition text-sm font-bold uppercase" title="View Invoice">View</NuxtLink>
                  <button @click="openUpdateModal(sale)" class="text-themeGold hover:text-yellow-600 transition text-sm font-bold uppercase" title="Update Status">Update</button>
                  <button @click="printInvoice(sale)" class="text-themeGold hover:text-yellow-600 transition text-sm font-bold uppercase" title="Print Invoice">Print</button>
                  <button @click="processReturn(sale)" class="text-themeRed hover:text-red-800 transition text-sm font-bold uppercase" title="Return / Exchange">Return</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Update Status Modal -->
    <div v-if="showUpdateModal && editingSale" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white dark:bg-themeDark rounded-xl shadow-2xl w-full max-w-sm overflow-hidden p-5 border border-gray-200 dark:border-gray-800">
        <h3 class="text-xl font-bold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">Update Sale: {{ editingSale.reference_no }}</h3>
        
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Sale Status</label>
            <select v-model="updateForm.sale_status" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-themeDark dark:text-white focus:outline-none focus:border-themeRed">
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Payment Status</label>
            <select v-model="updateForm.payment_status" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-themeDark dark:text-white focus:outline-none focus:border-themeRed">
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 justify-end">
          <button @click="showUpdateModal = false; editingSale = null" class="px-4 py-2 text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition">Cancel</button>
          <button @click="saveUpdateStatus" class="px-6 py-2 bg-themeRed hover:bg-red-800 text-white rounded font-bold transition">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const mockSales = ref([
  { id: 1, reference_no: 'INV-260920-001', date: '2026-09-20', time: '10:45 AM', created_by: 'Staff 1', subtotal: 61.00, order_discount_percent: 0, total_discount_amount: 0, sale_status: 'Completed', payment_status: 'Paid', grand_total: 61.00 },
  { id: 2, reference_no: 'INV-260920-002', date: '2026-09-20', time: '11:15 AM', created_by: 'Staff 2', subtotal: 130.00, order_discount_percent: 10, total_discount_amount: 9.50, sale_status: 'Completed', payment_status: 'Partial', grand_total: 120.50 },
  { id: 3, reference_no: 'INV-260919-001', date: '2026-09-19', time: '09:30 AM', created_by: 'Staff 1', subtotal: 50.00, order_discount_percent: 10, total_discount_amount: 5.00, sale_status: 'Pending', payment_status: 'Unpaid', grand_total: 45.00 },
])

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