<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-[#0F1117] text-gray-900 dark:text-gray-100 overflow-y-auto">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4 print:hidden">
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">{{ $t('sales_list') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage completed and pending orders</p>
      </div>
      <div class="flex relative w-full md:w-auto gap-2 md:gap-4">
        <NuxtLink to="/pos" class="w-full md:w-auto bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-md transition whitespace-nowrap text-center">
          + New Sale (POS)
        </NuxtLink>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden flex flex-col print:hidden">
      <div class="overflow-x-auto flex-grow h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-[#1A1D26] text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
            <tr>
              <th class="p-4 font-bold uppercase tracking-wider text-xs">Reference No.</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs">Date & Time</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs">Customer</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs">Cashier</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs">Sale Status</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs">Payment</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs text-right">Grand Total</th>
              <th class="p-4 font-bold uppercase tracking-wider text-xs text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="sales.length === 0">
              <td colspan="8" class="p-10 text-center text-gray-400">
                <div class="flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p class="font-bold text-sm text-gray-500">No sales transactions recorded yet</p>
                  <p class="text-xs text-gray-400 mt-1">Completed sales on the POS screen will appear here automatically</p>
                </div>
              </td>
            </tr>
            <tr v-for="sale in sales" :key="sale.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-4 font-mono font-bold text-themeRed dark:text-red-400">{{ sale.reference_no }}</td>
              <td class="p-4 text-sm text-gray-600 dark:text-gray-300">
                <div class="font-semibold">{{ sale.date }}</div>
                <div class="text-xs text-gray-400">{{ sale.time || '' }}</div>
              </td>
              <td class="p-4 text-sm text-gray-600 dark:text-gray-300">
                <div class="font-bold text-gray-800 dark:text-gray-200">{{ sale.customer_name || 'Walk-in Customer' }}</div>
                <div v-if="sale.customer_phone" class="text-xs text-gray-400">{{ sale.customer_phone }}</div>
              </td>
              <td class="p-4 text-sm font-medium text-gray-700 dark:text-gray-200">{{ sale.created_by || 'Admin User' }}</td>
              <td class="p-4">
                <span :class="sale.sale_status?.includes('Returned') ? 'bg-red-100 text-red-800 border-red-300' : (sale.sale_status === 'Completed' || sale.sale_status === 'Handed Over' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-yellow-100 text-yellow-800 border-yellow-300')" class="px-2.5 py-1 rounded text-xs font-bold uppercase border">
                  {{ sale.sale_status || 'Completed' }}
                </span>
              </td>
              <td class="p-4">
                <span :class="{
                  'bg-emerald-100 text-emerald-800 border-emerald-300': sale.payment_status === 'Paid',
                  'bg-red-100 text-red-800 border-red-300': sale.payment_status === 'Refunded',
                  'bg-yellow-100 text-yellow-800 border-yellow-300': sale.payment_status?.includes('Partial')
                }" class="px-2.5 py-1 rounded text-xs font-bold uppercase border">
                  {{ sale.payment_status || 'Paid' }}
                </span>
                <div class="text-[11px] text-gray-500 mt-1">{{ sale.payment_method || 'ABA / KHQR' }}</div>
              </td>
              <td class="p-4 text-right">
                <div class="font-black text-lg text-themeGold">${{ (sale.grand_total || sale.total || 0).toFixed(2) }}</div>
                <div v-if="sale.returned_total" class="text-xs text-red-500 font-bold">Ref: -${{ sale.returned_total.toFixed(2) }}</div>
              </td>
              <td class="p-4 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  <NuxtLink :to="'/sales/detail?id=' + sale.id" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider" title="View Invoice">
                    View
                  </NuxtLink>
                  <button @click="openUpdateModal(sale)" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer" title="Update Status">
                    Status
                  </button>
                  <button @click="openReturnModal(sale)" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer" title="Return / Exchange">
                    Return
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Partial Return Modal -->
    <div v-if="showReturnModal && returnSale" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div class="bg-white dark:bg-[#1A1D26] rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden p-6 border border-gray-200 dark:border-gray-800 animate-fade-in">
        <div class="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3 mb-4">
          <div>
            <h3 class="text-xl font-bold dark:text-white">Process Return / Refund</h3>
            <p class="text-xs text-gray-500">Invoice: {{ returnSale.reference_no }}</p>
          </div>
          <button @click="showReturnModal = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-white text-lg">✕</button>
        </div>

        <p class="text-xs text-gray-500 mb-4">
          Select the items and quantities to return. Returned fabric will be <strong>restocked to inventory</strong> automatically.
        </p>

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

    <!-- Update Status Modal -->
    <div v-if="showUpdateModal && editingSale" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-2xl w-full max-w-sm overflow-hidden p-5 border border-gray-200 dark:border-gray-800">
        <h3 class="text-xl font-bold mb-4 dark:text-white border-b border-gray-200 dark:border-gray-800 pb-2">Update Sale: {{ editingSale.reference_no }}</h3>
        
        <div class="space-y-4 mb-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Sale Status</label>
            <select v-model="updateForm.sale_status" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-[#252936] dark:text-white focus:outline-none focus:border-themeRed">
              <option value="Completed">Completed</option>
              <option value="Handed Over">Handed Over</option>
              <option value="Pick up later">Pick up later</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Payment Status</label>
            <select v-model="updateForm.payment_status" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-[#252936] dark:text-white focus:outline-none focus:border-themeRed">
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 justify-end">
          <button @click="showUpdateModal = false; editingSale = null" class="px-4 py-2 text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition text-xs">Cancel</button>
          <button @click="saveUpdateStatus" class="px-6 py-2 bg-themeRed hover:bg-red-800 text-white rounded font-bold transition text-xs cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePosState } from '~/composables/usePosState'

const { sales, updateSale, processSaleReturn } = usePosState()
const { showAlert } = useUiAlert()

const showUpdateModal = ref(false)
const editingSale = ref(null)
const updateForm = ref({
  sale_status: '',
  payment_status: ''
})

const openUpdateModal = (sale) => {
  editingSale.value = sale
  updateForm.value.sale_status = sale.sale_status || 'Completed'
  updateForm.value.payment_status = sale.payment_status || 'Paid'
  showUpdateModal.value = true
}

const saveUpdateStatus = () => {
  if (editingSale.value) {
    updateSale(editingSale.value.id, {
      sale_status: updateForm.value.sale_status,
      payment_status: updateForm.value.payment_status
    })
    showAlert("Sale status updated!", "Success", "success")
    showUpdateModal.value = false
    editingSale.value = null
  }
}

// Partial Return Modal
const showReturnModal = ref(false)
const returnSale = ref(null)
const returnItemsState = ref([])

const openReturnModal = (sale) => {
  returnSale.value = sale
  returnItemsState.value = sale.items.map(item => {
    const prevReturned = item.returned_quantity || 0
    const maxReturnable = Math.max(0, item.quantity - prevReturned)
    return {
      id: item.id,
      productId: item.product_id,
      name: item.name,
      price: item.price,
      discount: item.discount || 0,          // carry discount through for refund calc
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
    // FIX: use effective price after per-item discount (was using original price, causing over-refund)
    const effectiveUnitPrice = item.price * (1 - ((item.discount || 0) / 100))
    return sum + (qty * effectiveUnitPrice)
  }, 0)
})

const submitReturn = () => {
  if (!returnSale.value) return

  const itemsToReturn = returnItemsState.value
    .filter(item => Number(item.returnQty) > 0)
    .map(item => ({
      itemId: item.id,
      productId: item.productId,
      quantity: Number(item.returnQty),
      // FIX: pass discount-aware refund amount (not raw price)
      refundAmount: Number(item.returnQty) * item.price * (1 - ((item.discount || 0) / 100))
    }))

  if (itemsToReturn.length === 0) {
    showAlert("Please enter a return quantity greater than 0.", "Warning", "warning")
    return
  }

  processSaleReturn(returnSale.value.id, itemsToReturn)
  showAlert(`Refund of $${calculatedRefundTotal.value.toFixed(2)} recorded. Fabric items restocked to inventory!`, "Return Processed", "success")
  showReturnModal.value = false
  returnSale.value = null
}
</script>