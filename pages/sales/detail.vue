<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-[#0F1117] text-gray-900 dark:text-gray-100 overflow-y-auto">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4 print:hidden">
      <div class="flex items-center gap-4">
        <NuxtLink to="/sales" class="p-2 rounded-full bg-gray-100 dark:bg-[#1A1D26] hover:bg-gray-200 dark:hover:bg-[#252936] transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 tracking-widest">
            INVOICE #{{ sale?.reference_no || 'NOT FOUND' }}
          </h1>
          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Date: {{ sale?.date || '-' }} | Time: {{ sale?.time || '-' }}
          </p>
        </div>
      </div>
      <div v-if="sale" class="flex gap-2 md:gap-4 w-full md:w-auto">
        <button @click="triggerPrint" class="flex-1 md:flex-none bg-gray-100 dark:bg-[#1A1D26] hover:bg-gray-200 dark:hover:bg-[#252936] border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-lg font-bold shadow-sm transition whitespace-nowrap cursor-pointer">
          🖨️ Print
        </button>
        <button @click="openReturnModal" class="flex-1 md:flex-none bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-sm transition whitespace-nowrap border border-red-900 cursor-pointer">
          Process Return
        </button>
      </div>
    </div>

    <div v-if="sale" class="print:block">
      <!-- Status Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 print:hidden">
        <div class="bg-white dark:bg-[#1A1D26] p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex flex-col">
          <span class="text-xs font-bold text-gray-500 uppercase mb-1">Sale Status</span>
          <span :class="sale.sale_status?.includes('Returned') ? 'text-red-500' : 'text-emerald-500'" class="text-lg font-extrabold">
            {{ sale.sale_status || 'Completed' }}
          </span>
        </div>
        <div class="bg-white dark:bg-[#1A1D26] p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex flex-col">
          <span class="text-xs font-bold text-gray-500 uppercase mb-1">Payment Status</span>
          <span class="text-lg font-extrabold text-themeGold">{{ sale.payment_status || 'Paid' }}</span>
        </div>
        <div class="bg-white dark:bg-[#1A1D26] p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex flex-col">
          <span class="text-xs font-bold text-gray-500 uppercase mb-1">Cashier</span>
          <span class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ sale.created_by || 'Admin User' }}</span>
        </div>
        <div class="bg-white dark:bg-[#1A1D26] p-4 rounded-xl shadow border border-gray-200 dark:border-gray-800 flex flex-col">
          <span class="text-xs font-bold text-gray-500 uppercase mb-1">Customer</span>
          <span class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ sale.customer_name || 'Walk-in Customer' }}</span>
          <span v-if="sale.customer_phone" class="text-xs text-gray-400 mt-1">{{ sale.customer_phone }}</span>
        </div>
      </div>

      <!-- Items Table -->
      <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 mb-8 overflow-hidden print:border-none print:shadow-none">
        <div class="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#1A1D26] print:hidden">
          <h2 class="text-xl font-bold dark:text-white">Purchased Items</h2>
        </div>
        <div class="overflow-x-auto w-full">
          <table class="w-full text-left border-collapse whitespace-nowrap min-w-max">
            <thead class="bg-gray-100 dark:bg-[#252936] text-gray-700 dark:text-gray-200 text-xs uppercase font-bold">
              <tr>
                <th class="p-4">Item Name</th>
                <th class="p-4">Price / Unit</th>
                <th class="p-4 text-center">Quantity</th>
                <th class="p-4 text-center">Returned</th>
                <th class="p-4 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
              <tr v-for="item in sale.items" :key="item.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td class="p-4">
                  <div class="font-bold text-gray-900 dark:text-white">{{ item.name }}</div>
                  <div class="text-xs text-gray-500 font-mono" v-if="item.product_code">{{ item.product_code }}</div>
                </td>
                <td class="p-4 font-mono font-medium">${{ item.price.toFixed(2) }} / {{ item.unit }}</td>
                <td class="p-4 text-center font-bold">{{ item.quantity }} {{ item.unit }}</td>
                <td class="p-4 text-center font-bold text-red-500">
                  {{ item.returned_quantity ? `${item.returned_quantity} ${item.unit}` : '-' }}
                </td>
                <td class="p-4 text-right font-bold text-themeGold font-mono">
                  ${{ (item.price * item.quantity * (1 - (item.discount || 0) / 100)).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Totals & Payment Summary -->
      <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Payment Method</p>
          <p class="text-lg font-bold text-themeRed dark:text-red-400">{{ sale.payment_method || 'ABA / KHQR' }}</p>
          <p v-if="sale.cash_tendered_usd" class="text-xs text-gray-500 mt-1">
            Cash Tendered: ${{ sale.cash_tendered_usd.toFixed(2) }} • Change: ${{ (sale.change_usd || 0).toFixed(2) }} (៛{{ (sale.change_khr || 0).toLocaleString() }})
          </p>
        </div>

        <div class="w-full md:w-72 space-y-2 text-right">
          <div class="flex justify-between text-sm text-gray-500">
            <span>Subtotal:</span>
            <span class="font-bold">${{ (sale.subtotal || sale.total || 0).toFixed(2) }}</span>
          </div>
          <div v-if="sale.returned_total" class="flex justify-between text-sm text-red-500 font-bold">
            <span>Refunded Amount:</span>
            <span>-${{ sale.returned_total.toFixed(2) }}</span>
          </div>
          <div class="border-t border-gray-200 dark:border-gray-800 pt-2 flex justify-between items-center">
            <span class="font-extrabold text-base">Net Total:</span>
            <div>
              <p class="text-2xl font-black text-themeGold">${{ (sale.grand_total || sale.total || 0).toFixed(2) }}</p>
              <p class="text-xs text-themeGold/80 font-mono">៛{{ ((sale.grand_total || sale.total || 0) * 4100).toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Invoice Scannable Code (1D Barcode & QR Code) -->
      <div class="mt-6 p-6 bg-white dark:bg-[#1A1D26] rounded-xl shadow border border-gray-200 dark:border-gray-800 flex flex-col items-center text-center">
        <div class="flex items-center justify-between w-full mb-3 print:hidden">
          <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Invoice Scannable Code</span>
          <div class="inline-flex rounded-lg border border-gray-300 dark:border-gray-700 p-0.5 bg-gray-50 dark:bg-[#252936] text-xs">
            <button 
              type="button" 
              @click="codeFormat = 'barcode'" 
              :class="codeFormat === 'barcode' ? 'bg-themeRed text-white font-bold' : 'text-gray-500'" 
              class="px-2.5 py-0.5 rounded cursor-pointer transition text-xs"
            >
              Barcode
            </button>
            <button 
              type="button" 
              @click="codeFormat = 'qr'" 
              :class="codeFormat === 'qr' ? 'bg-themeRed text-white font-bold' : 'text-gray-500'" 
              class="px-2.5 py-0.5 rounded cursor-pointer transition text-xs"
            >
              QR Code
            </button>
            <button 
              type="button" 
              @click="codeFormat = 'both'" 
              :class="codeFormat === 'both' ? 'bg-themeRed text-white font-bold' : 'text-gray-500'" 
              class="px-2.5 py-0.5 rounded cursor-pointer transition text-xs"
            >
              Both
            </button>
          </div>
        </div>
        <ReceiptCode 
          :value="sale.reference_no" 
          :mode="codeFormat" 
          :barcode-height="42" 
          :qr-size="85"
          caption="Scan with laser barcode scanner or phone camera to verify invoice"
        />
      </div>
    </div>

    <div v-else class="p-12 text-center text-gray-400">
      <p class="text-base font-bold">Sale transaction not found.</p>
      <NuxtLink to="/sales" class="text-themeRed font-bold underline mt-2 inline-block">Return to Sales List</NuxtLink>
    </div>

    <!-- Partial Return Modal -->
    <div v-if="showReturnModal && sale" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 print:hidden">
      <div class="bg-white dark:bg-[#1A1D26] rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden p-6 border border-gray-200 dark:border-gray-800 animate-fade-in">
        <div class="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3 mb-4">
          <div>
            <h3 class="text-xl font-bold dark:text-white">Process Return / Refund</h3>
            <p class="text-xs text-gray-500">Invoice: {{ sale.reference_no }}</p>
          </div>
          <button @click="showReturnModal = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-white text-lg">✕</button>
        </div>

        <div class="space-y-3 max-h-64 overflow-y-auto pr-1 mb-4">
          <div 
            v-for="item in returnItemsState" 
            :key="item.id" 
            class="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#252936] flex items-center justify-between gap-4"
          >
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold truncate text-gray-900 dark:text-white">{{ item.name }}</p>
              <p class="text-xs text-gray-500 font-mono">
                ${{ item.price.toFixed(2) }}/{{ item.unit }} • Bought: {{ item.quantity }} {{ item.unit }}
                <span v-if="item.previously_returned > 0" class="text-red-500 font-bold ml-1">
                  (Returned: {{ item.previously_returned }})
                </span>
              </p>
            </div>

            <div class="flex items-center gap-2">
              <label class="text-xs font-bold text-gray-400">Return Qty:</label>
              <input 
                v-model.number="item.returnQty" 
                type="number" 
                step="any" 
                min="0" 
                :max="item.maxReturnable" 
                class="w-20 p-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-center font-bold text-sm bg-white dark:bg-[#1A1D26] text-gray-900 dark:text-white"
              />
              <span class="text-xs text-gray-500 font-mono">{{ item.unit }}</span>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 dark:bg-[#252936] p-4 rounded-xl mb-5 flex justify-between items-center">
          <div>
            <span class="text-xs uppercase font-bold text-gray-500">Refund Amount Due:</span>
            <p class="text-2xl font-black text-themeRed dark:text-red-400">${{ calculatedRefundTotal.toFixed(2) }}</p>
          </div>
          <div class="text-right text-xs text-gray-500">
            <span>In KHR (approx):</span>
            <p class="font-bold text-sm text-themeGold">៛{{ (calculatedRefundTotal * 4100).toLocaleString() }}</p>
          </div>
        </div>

        <div class="flex gap-3 justify-end">
          <button @click="showReturnModal = false" class="px-5 py-2 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-sm">
            Cancel
          </button>
          <button 
            @click="submitReturn" 
            :disabled="calculatedRefundTotal <= 0" 
            class="px-6 py-2 bg-themeRed hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold shadow-md transition text-sm cursor-pointer"
          >
            Confirm Return & Restock
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePosState } from '~/composables/usePosState'

const route = useRoute()
const { sales, processSaleReturn } = usePosState()
const { showAlert } = useUiAlert()
const codeFormat = ref('both')

const saleId = computed(() => route.query.id)

const sale = computed(() => {
  if (saleId.value) {
    const found = sales.value.find(s => String(s.id) === String(saleId.value))
    if (found) return found
  }
  return sales.value[0] || null
})

const triggerPrint = () => {
  window.print()
}

// Return Modal
const showReturnModal = ref(false)
const returnItemsState = ref([])

const openReturnModal = () => {
  if (!sale.value) return
  returnItemsState.value = sale.value.items.map(item => {
    const prevReturned = item.returned_quantity || 0
    const maxReturnable = Math.max(0, item.quantity - prevReturned)
    return {
      id: item.id,
      productId: item.product_id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
      previously_returned: prevReturned,
      maxReturnable,
      returnQty: 0
    }
  })
  showReturnModal.value = true
}

const calculatedRefundTotal = computed(() => {
  return returnItemsState.value.reduce((sum, item) => {
    const qty = Math.min(item.maxReturnable, Math.max(0, Number(item.returnQty) || 0))
    return sum + (qty * item.price)
  }, 0)
})

const submitReturn = () => {
  if (!sale.value) return

  const itemsToReturn = returnItemsState.value
    .filter(item => Number(item.returnQty) > 0)
    .map(item => ({
      itemId: item.id,
      productId: item.productId,
      quantity: Number(item.returnQty),
      refundAmount: Number(item.returnQty) * item.price
    }))

  if (itemsToReturn.length === 0) {
    showAlert("Please enter a return quantity greater than 0.", "Warning", "warning")
    return
  }

  processSaleReturn(sale.value.id, itemsToReturn)
  showAlert(`Refund of $${calculatedRefundTotal.value.toFixed(2)} recorded. Fabric items restocked to inventory!`, "Return Processed", "success")
  showReturnModal.value = false
}
</script>
