<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100 overflow-y-auto overflow-x-hidden">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div class="flex items-center gap-4">
        <NuxtLink to="/sales" class="p-2 rounded-full bg-gray-100 dark:bg-themeDark hover:bg-gray-200 dark:hover:bg-gray-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 tracking-widest">
            INVOICE #{{ sale.reference_no }}
          </h1>
          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Date: {{ sale.date }} | Time: {{ sale.time }}
          </p>
        </div>
      </div>
      <div class="flex gap-2 md:gap-4 w-full md:w-auto">
        <button @click="printInvoice" class="flex-1 md:flex-none bg-gray-100 dark:bg-themeDark hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg font-bold shadow-sm transition whitespace-nowrap">
          Print
        </button>
        <button @click="processReturn" class="flex-1 md:flex-none bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-sm transition whitespace-nowrap border border-red-900">
          Process Return
        </button>
      </div>
    </div>

    <!-- Status -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      <div class="bg-white dark:bg-themeDark p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex flex-col">
        <span class="text-xs font-bold text-gray-500 uppercase mb-1">Sale Status</span>
        <span class="text-lg font-bold text-themeGold dark:text-gray-300">{{ sale.sale_status }}</span>
      </div>
      <div class="bg-white dark:bg-themeDark p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex flex-col">
        <span class="text-xs font-bold text-gray-500 uppercase mb-1">Payment Status</span>
        <span class="text-lg font-bold text-themeGold hover:text-yellow-600 ">{{ sale.payment_status }}</span>
      </div>
      <div class="bg-white dark:bg-themeDark p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex flex-col">
        <span class="text-xs font-bold text-gray-500 uppercase mb-1">Cashier</span>
        <span class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ sale.created_by }}</span>
      </div>
      <div class="bg-white dark:bg-themeDark p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex flex-col">
        <span class="text-xs font-bold text-gray-500 uppercase mb-1">Customer</span>
        <span class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ sale.customer_name || 'Walk-in Customer' }}</span>
        <span v-if="sale.customer_phone" class="text-xs text-gray-400 mt-1">{{ sale.customer_phone }}</span>
      </div>
    </div>

    <!-- Items -->
    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 mb-8 w-full" style="max-width: 100%;">
      <div class="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-themeDark rounded-t-xl">
        <h2 class="text-xl font-bold dark:text-white">Purchased Items</h2>
      </div>
      <div class="overflow-x-auto w-full">
        <table class="w-full text-left border-collapse whitespace-nowrap min-w-max">
          <thead class="bg-gray-100 dark:bg-themeDark text-gray-700 dark:text-gray-200">
            <tr>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Product</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs text-right">Unit Price</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs text-right">Quantity</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs text-right">Discount</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sale.items" :key="item.id" class="border-b border-gray-100 dark:border-gray-800">
              <td class="p-3 md:p-4">
                <div class="font-bold text-gray-800 dark:text-gray-100">{{ item.name }}</div>
                <div class="text-xs text-gray-500 font-mono">{{ item.product_code }}</div>
              </td>
              <td class="p-3 md:p-4 text-right font-medium">${{ item.unit_price.toFixed(2) }}</td>
              <td class="p-3 md:p-4 text-right font-bold">{{ item.quantity }} {{ item.unit }}</td>
              <td class="p-3 md:p-4 text-right font-bold text-themeGold">
                <div v-if="item.discount_percent > 0">
                  <span>-{{ item.discount_percent }}%</span>
                  <div class="text-xs text-gray-400 font-normal">(${{ item.discount_amount.toFixed(2) }})</div>
                </div>
                <span v-else>-</span>
              </td>
              <td class="p-3 md:p-4 text-right font-bold text-themeRed dark:text-red-400">${{ item.subtotal.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Totals -->
    <div class="flex flex-col md:flex-row gap-6">
      <div class="flex-1 bg-white dark:bg-themeDark p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800">
        <h3 class="text-lg font-bold mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Payment Logs</h3>
        <div v-if="sale.payments.length > 0" class="space-y-3">
          <div v-for="payment in sale.payments" :key="payment.id" class="flex justify-between items-center text-sm border-b border-gray-100 dark:border-gray-800 pb-2">
            <div>
              <span class="font-bold">{{ payment.paid_by }}</span>
              <span class="text-gray-500 ml-2">{{ payment.reference_no }}</span>
            </div>
            <span class="font-bold text-themeGold dark:text-gray-300">${{ payment.amount.toFixed(2) }}</span>
          </div>
        </div>
        <div v-else class="text-gray-500 text-sm">No payments recorded.</div>
      </div>

      <div class="w-full md:w-96 bg-white dark:bg-themeDark p-6 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800">
        <div class="space-y-3 text-sm md:text-base">
          <div class="flex justify-between font-bold text-gray-600 dark:text-gray-400">
            <span>Subtotal</span>
            <span>${{ sale.subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-bold text-gray-600 dark:text-gray-400" v-if="sale.total_item_discount_amount > 0">
            <span>Item Discounts</span>
            <span>-${{ sale.total_item_discount_amount.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-bold text-themeGold">
            <span>Order Discount <span v-if="sale.order_discount_percent > 0">({{ sale.order_discount_percent }}%)</span></span>
            <span>-${{ sale.total_discount_amount.toFixed(2) }}</span>
          </div>
          <div class="border-t border-gray-200 dark:border-gray-700 my-3"></div>
          <div class="flex justify-between font-black text-xl text-themeRed dark:text-themeGold">
            <span>Grand Total</span>
            <span>${{ sale.grand_total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const invoiceId = 'INV-260920-001'

// Static Mock Data reflecting DB Schema (bpas_sales, bpas_sale_items, bpas_payments)
const sale = ref({
  id: 1,
  reference_no: invoiceId,
  date: '2026-09-20',
  time: '10:45 AM',
  created_by: 'Staff 1',
  customer_name: 'Meas Roth',
  customer_phone: '012 345 678',
  sale_status: 'Completed',
  payment_status: 'Paid',
  subtotal: 66.00,
  total_item_discount_amount: 5.00,
  order_discount_percent: 0,
  total_discount_amount: 0,
  grand_total: 61.00,
  items: [
    { id: 1, product_id: 1, product_code: 'PRD-1001', name: 'Premium Red Silk', unit_price: 15.50, quantity: 2, unit: 'm', discount_percent: 0, discount_amount: 0, subtotal: 31.00 },
    { id: 2, product_id: 4, product_code: 'PRD-1004', name: 'Khmer Traditional Hol', unit_price: 40.00, quantity: 0.5, unit: 'kben', discount_percent: 0, discount_amount: 0, subtotal: 20.00 },
    { id: 3, product_id: 2, product_code: 'PRD-1002', name: 'Royal Gold Thread', unit_price: 1.50, quantity: 10, unit: 'roll', discount_percent: 33.33, discount_amount: 5.00, subtotal: 10.00 },
  ],
  payments: [
    { id: 1, date: '2026-09-20 10:45:00', reference_no: 'CSH-123', amount: 31.00, paid_by: 'Cash' },
    { id: 2, date: '2026-09-20 10:46:00', reference_no: 'ABA-456', amount: 30.00, paid_by: 'ABA Pay' }
  ]
})

const printInvoice = () => {
  const { showAlert } = useUiAlert()
  showAlert(`Static Action: Printing Invoice ${sale.value.reference_no}`, "Print", "info")
}

const processReturn = () => {
  const { showAlert } = useUiAlert()
  showAlert(`Static Action: Opening Return/Exchange flow for Invoice ${sale.value.reference_no}`, "Return", "info")
}
</script>
