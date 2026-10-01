<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">{{ $t('sales') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">View transaction history, invoices, and manage returns</p>
      </div>
      <div class="flex w-full md:w-auto gap-2 md:gap-4">
        <input type="date" class="w-full md:w-auto px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-themeGold dark:bg-themeDark text-gray-700 dark:text-gray-200" />
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
                  <button @click="printInvoice(sale)" class="text-themeGold hover:text-yellow-600   transition text-sm font-bold uppercase" title="Print Invoice">Print</button>
                  <button @click="processReturn(sale)" class="text-themeRed hover:text-red-800 transition text-sm font-bold uppercase" title="Return / Exchange">Return</button>
                </div>
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

const mockSales = ref([
  { id: 1, reference_no: 'INV-260920-001', date: '2026-09-20', time: '10:45 AM', created_by: 'Staff 1', subtotal: 61.00, order_discount_percent: 0, total_discount_amount: 0, sale_status: 'Completed', payment_status: 'Paid', grand_total: 61.00 },
  { id: 2, reference_no: 'INV-260920-002', date: '2026-09-20', time: '11:15 AM', created_by: 'Staff 2', subtotal: 130.00, order_discount_percent: 10, total_discount_amount: 9.50, sale_status: 'Completed', payment_status: 'Partial', grand_total: 120.50 },
  { id: 3, reference_no: 'INV-260919-001', date: '2026-09-19', time: '09:30 AM', created_by: 'Staff 1', subtotal: 50.00, order_discount_percent: 10, total_discount_amount: 5.00, sale_status: 'Pending', payment_status: 'Unpaid', grand_total: 45.00 },
])

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