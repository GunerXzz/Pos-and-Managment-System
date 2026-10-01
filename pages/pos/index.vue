<template>
  <div class="h-full print:h-auto flex flex-col lg:flex-row bg-gray-100 dark:bg-themeDark print:bg-white print:block overflow-y-auto lg:overflow-hidden print:overflow-visible">
    
    <!-- LEFT -->
    <div class="flex-1 flex flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-4 md:p-5 print:hidden overflow-hidden min-h-[50vh] lg:min-h-0 lg:h-auto">
      
      <!-- Search -->
      <div class="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center mb-4">
        <h1 class="text-xl font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wide hidden md:block">{{ $t('pos') }}</h1>
        <div class="relative w-full md:w-80">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
          </div>
          <input 
            type="text" 
            :placeholder="$t('search')" 
            class="w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-themeDark text-gray-900 dark:text-gray-100 focus:outline-none focus:border-themeRed focus:ring-1 focus:ring-themeRed text-sm font-mono transition"
            @keyup.enter="handleScan"
          />
        </div>
      </div>

      <!-- Modern -->
      <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide border-b border-gray-200 dark:border-gray-800 mb-4">
        <button class="pb-1 border-b-2 border-themeRed text-themeRed font-bold whitespace-nowrap text-sm flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
          All Items
        </button>
        <button class="pb-1 border-b-2 border-transparent text-gray-500 hover:text-themeRed font-semibold whitespace-nowrap text-sm transition flex items-center gap-1.5">
          Silk
        </button>
        <button class="pb-1 border-b-2 border-transparent text-gray-500 hover:text-themeRed font-semibold whitespace-nowrap text-sm transition flex items-center gap-1.5">
          Cotton
        </button>
        <button class="pb-1 border-b-2 border-transparent text-gray-500 hover:text-themeRed font-semibold whitespace-nowrap text-sm transition flex items-center gap-1.5">
          Lace
        </button>
      </div>

      <!-- Professional -->
      <div class="flex-1 min-h-0 overflow-y-auto pr-2 pb-2">
        <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          <button 
            v-for="item in mockProducts" 
            :key="item.id"
            @click="addToCart(item)"
            class="bg-white dark:bg-themeDark rounded-md border border-gray-200 dark:border-gray-700 hover:border-themeRed dark:hover:border-red-500 transition-colors duration-150 flex flex-col text-left group overflow-hidden h-full"
          >
            <div class="aspect-[4/3] w-full bg-gray-100 dark:bg-themeDark overflow-hidden relative flex-shrink-0">
               <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
               <div class="absolute top-1 right-1 bg-white/95 dark:bg-themeDark/95 backdrop-blur text-[10px] font-bold px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
                 {{ item.code }}
               </div>
            </div>
            <div class="p-2.5 flex flex-col flex-grow min-w-0">
              <span class="font-bold text-gray-800 dark:text-gray-100 text-sm leading-snug mb-2 truncate w-full" :title="item.name">{{ item.name }}</span>
              <div class="mt-auto flex justify-between items-end w-full">
                <span class="text-themeRed dark:text-red-400 font-bold text-sm">${{ item.price.toFixed(2) }}</span>
                <span class="text-xs text-gray-500 font-medium">/ {{ item.unit }}</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="w-full lg:w-[380px] bg-gray-50 dark:bg-gray-950 flex flex-col print:hidden flex-shrink-0 min-h-[350px] lg:min-h-0 lg:h-full overflow-hidden border-l border-t lg:border-t-0 border-gray-200 dark:border-gray-800">
      
      <!-- Cart -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-themeDark">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          <h2 class="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-tight">Current Order</h2>
        </div>
        <div class="flex gap-2">
          <button @click="showHistory = true" class="text-blue-500 hover:text-blue-700 transition p-1.5 rounded hover:bg-blue-50 dark:hover:bg-gray-800" title="View History">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
          <button @click="cart = []" v-if="cart.length > 0" class="text-gray-500 hover:text-red-600 transition p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Clear Cart">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>

      <!-- Cart -->
      <div class="flex-grow overflow-y-auto p-3 space-y-2 bg-gray-50 dark:bg-gray-950">
        <div v-if="cart.length === 0" class="flex flex-col items-center justify-center h-full text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <p class="text-sm font-semibold">Cart is empty</p>
        </div>
        
        <div v-for="(cartItem, index) in cart" :key="index" class="group flex p-2 bg-white dark:bg-themeDark rounded-md border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition">
          <!-- Restore -->
          <div class="w-12 h-12 bg-gray-100 dark:bg-themeDark rounded flex-shrink-0 overflow-hidden mr-3 border border-gray-200 dark:border-gray-700">
            <img :src="cartItem.image" :alt="cartItem.name" class="w-full h-full object-cover" />
          </div>
          
          <div class="flex flex-col flex-grow justify-between min-w-0">
            <div class="flex justify-between items-start w-full">
              <p class="font-semibold text-gray-800 dark:text-gray-200 text-sm leading-tight pr-2 truncate flex-1" :title="cartItem.name">{{ cartItem.name }}</p>
              <div class="flex gap-1 -mt-1 -mr-1">
                <button @click="openEditItem(cartItem)" class="text-gray-400 hover:text-themeGold transition flex-shrink-0 p-1" title="Edit Item">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </button>
                <button @click="cart.splice(index, 1)" class="text-gray-400 hover:text-themeRed transition flex-shrink-0 p-1" title="Remove">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
            
            <div class="flex justify-between items-end mt-1">
              <div class="flex items-center gap-2">
                <div class="flex items-center border border-gray-300 dark:border-gray-700 rounded overflow-hidden">
                  <button @click="updateQuantity(cartItem, -1)" class="w-7 h-7 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold transition">-</button>
                  <input 
                    type="number" 
                    step="1" 
                    min="1"
                    v-model.number="cartItem.quantity" 
                    class="w-10 h-7 text-center font-bold bg-white dark:bg-themeDark dark:text-gray-200 text-xs focus:outline-none"
                  />
                  <button @click="updateQuantity(cartItem, 1)" class="w-7 h-7 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold transition">+</button>
                </div>
                <span class="text-[11px] font-bold text-gray-500">{{ cartItem.unit }}</span>
              </div>
              <div class="text-right">
                <p v-if="cartItem.discount > 0" class="text-[10px] text-gray-400 line-through">${{ (cartItem.price * cartItem.quantity).toFixed(2) }}</p>
                <p class="font-bold text-gray-900 dark:text-white text-sm">${{ ((cartItem.price * cartItem.quantity) * (1 - (cartItem.discount || 0) / 100)).toFixed(2) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Checkout -->
      <div class="p-4 bg-white dark:bg-themeDark border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div class="space-y-1.5 mb-4">
          <div class="flex justify-between text-xs text-gray-500 font-semibold">
            <span>Subtotal</span>
            <span>${{ cartSubtotal.toFixed(2) }}</span>
          </div>
          <div v-if="cartItemDiscounts > 0" class="flex justify-between text-xs text-themeRed font-semibold">
            <span>Item Discounts</span>
            <span>-${{ cartItemDiscounts.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-xs text-themeRed font-semibold">
            <button @click="showGlobalDiscountModal = true" class="hover:underline flex items-center gap-1 text-left">
              <span>Order Discount <span v-if="globalDiscount > 0">({{ globalDiscount }}%)</span></span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
            <span v-if="globalDiscount > 0">-${{ ((cartSubtotal - cartItemDiscounts) * (globalDiscount / 100)).toFixed(2) }}</span>
            <span v-else>$0.00</span>
          </div>
          <div class="flex justify-between text-xs text-gray-500 font-semibold">
            <span>Tax (0%)</span>
            <span>$0.00</span>
          </div>
          <div class="border-t border-dashed border-gray-200 dark:border-gray-800 my-2"></div>
          <div class="flex justify-between items-center">
            <span class="text-base font-bold text-gray-800 dark:text-gray-200">Total</span>
            <span class="text-2xl font-bold text-themeRed dark:text-themeGold">${{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>
        
        <button 
          @click="checkout"
          :disabled="cart.length === 0"
          class="w-full bg-themeRed hover:bg-red-800 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white py-3 rounded-md font-bold text-lg transition flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          Complete Sale
        </button>
      </div>
    </div>

    <!-- PRINT -->
    <div class="hidden print:block text-black bg-white">
      
      <!-- PAGE -->
      <div class="w-[80mm] mx-auto p-4 font-mono text-sm" style="page-break-after: always;">
        <div class="text-center mb-4">
          <h2 class="font-bold text-xl mb-1">POS-SYSTEM (STORE COPY)</h2>
          <p class="text-xs">123 Silk Road, Phnom Penh</p>
          <div class="border-b-2 border-dashed border-gray-400 my-2"></div>
          <p class="text-xs text-left">Date: {{ new Date().toLocaleString() }}</p>
          <p class="text-xs text-left">Invoice: INV-{{ Math.floor(Math.random() * 100000) }}</p>
          <p class="text-xs text-left">Cashier: Admin User</p>
          <div class="border-b-2 border-dashed border-gray-400 my-2"></div>
        </div>
        
        <div class="mb-4">
          <div class="flex justify-between font-bold text-xs mb-2">
            <span>Item</span>
            <span>Amt</span>
          </div>
          <div v-for="item in cart" :key="'store-'+item.id" class="flex justify-between text-xs mb-1">
            <span class="w-3/5 truncate">{{ item.name }} ({{ item.quantity }}{{ item.unit }})</span>
            <span>${{ ((item.price * item.quantity) * (1 - (item.discount || 0) / 100)).toFixed(2) }}</span>
          </div>
        </div>

        <div class="border-t-2 border-dashed border-gray-400 pt-2 mb-4">
          <div class="flex justify-between text-xs mb-1" v-if="cartItemDiscounts > 0">
            <span>Item Discounts:</span>
            <span>-${{ cartItemDiscounts.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-xs mb-1" v-if="globalDiscount > 0">
            <span>Order Discount ({{globalDiscount}}%):</span>
            <span>-${{ ((cartSubtotal - cartItemDiscounts) * (globalDiscount / 100)).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-bold text-lg mt-2">
            <span>TOTAL:</span>
            <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>

      <!-- PAGE -->
      <div class="w-[80mm] mx-auto p-4 font-sans text-sm" style="print-color-adjust: exact; -webkit-print-color-adjust: exact;">
        <div class="text-center mb-4 bg-[#8B0000] text-white p-4 rounded-t-lg">
          <h2 class="font-extrabold text-xl text-[#FFD700] tracking-widest">POS FABRICS</h2>
          <p class="text-xs opacity-90">123 Silk Road, Phnom Penh</p>
          <p class="text-xs opacity-90">Tel: +855 12 345 678</p>
        </div>
        
        <div class="mb-4 px-2">
          <p class="text-xs text-left text-gray-500">Date: <span class="text-gray-800 font-semibold">{{ new Date().toLocaleString() }}</span></p>
          <p class="text-xs text-left text-gray-500">Invoice: <span class="text-gray-800 font-semibold">INV-{{ Math.floor(Math.random() * 100000) }}</span></p>
          <div class="border-b-2 border-solid border-[#FFD700] my-3"></div>
        </div>
        
        <div class="mb-4 px-2">
          <div class="flex justify-between font-bold text-xs mb-2 text-[#8B0000] uppercase tracking-wider">
            <span>Item</span>
            <span>Amt</span>
          </div>
          <div v-for="item in cart" :key="'cust-'+item.id" class="flex justify-between text-xs mb-2 border-b border-gray-100 pb-1">
            <span class="w-3/5 truncate">{{ item.name }} <span class="text-gray-400">x{{ item.quantity }}{{ item.unit }}</span></span>
            <span class="font-semibold">${{ ((item.price * item.quantity) * (1 - (item.discount || 0) / 100)).toFixed(2) }}</span>
          </div>
        </div>

        <div class="bg-gray-50 p-3 rounded-b-lg border-t-2 border-[#8B0000]">
          <div class="flex justify-between text-xs mb-1 text-gray-500" v-if="cartItemDiscounts > 0">
            <span>Item Savings:</span>
            <span class="text-[#8B0000] font-bold">-${{ cartItemDiscounts.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-xs mb-1 text-gray-500" v-if="globalDiscount > 0">
            <span>Order Discount ({{globalDiscount}}%):</span>
            <span class="text-[#8B0000] font-bold">-${{ ((cartSubtotal - cartItemDiscounts) * (globalDiscount / 100)).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-extrabold text-xl mt-2 text-[#8B0000]">
            <span>TOTAL</span>
            <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>
        
        <div class="text-center text-xs mt-6 text-gray-500 italic">
          <p>Thank you for choosing POS Fabrics!</p>
          <p>We hope to see you again.</p>
        </div>
      </div>

    </div>

    <!-- History -->
    <div v-if="showHistory" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white dark:bg-themeDark rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]">
        <div class="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
          <h2 class="text-xl font-bold dark:text-white">Sales History</h2>
          <button @click="showHistory = false" class="text-gray-500 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="overflow-y-auto p-4 flex-grow">
          <div v-if="salesHistory.length === 0" class="text-center text-gray-500 py-8">
            No past sales yet.
          </div>
          <div v-for="sale in salesHistory" :key="sale.id" class="mb-4 border border-gray-200 dark:border-gray-800 rounded-lg p-3 bg-gray-50 dark:bg-gray-950/50">
            <div class="flex justify-between items-start mb-2">
              <div>
                <p class="font-bold text-sm dark:text-white">{{ sale.date }}</p>
                <p class="text-xs text-gray-500">{{ sale.items.length }} items</p>
              </div>
              <p class="font-bold text-themeRed">${{ sale.total.toFixed(2) }}</p>
            </div>
            <button @click="editPastSale(sale)" class="w-full py-1.5 mt-2 bg-white dark:bg-gray-800 border border-themeGold dark:border-yellow-600 rounded text-sm font-bold text-themeGold dark:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-gray-700 transition">
              Edit / Re-Checkout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Global -->
    <div v-if="showGlobalDiscountModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white dark:bg-themeDark rounded-xl shadow-2xl w-full max-w-sm overflow-hidden p-5 border border-gray-200 dark:border-gray-800">
        <h3 class="text-lg font-bold mb-4 dark:text-white">Order Discount</h3>
        <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Discount Percentage (%)</label>
        <input type="number" step="1" min="0" max="100" v-model.number="globalDiscount" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-themeDark dark:text-white focus:outline-none focus:border-themeRed mb-4" />
        <div class="flex gap-3 justify-end">
          <button @click="showGlobalDiscountModal = false" class="px-4 py-2 text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition">Cancel</button>
          <button @click="showGlobalDiscountModal = false" class="px-4 py-2 bg-themeRed hover:bg-red-800 text-white rounded font-bold transition">Apply</button>
        </div>
      </div>
    </div>

    <!-- Edit -->
    <div v-if="showEditItemModal && editingItem" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white dark:bg-themeDark rounded-xl shadow-2xl w-full max-w-sm overflow-hidden p-5 border border-gray-200 dark:border-gray-800">
        <h3 class="text-lg font-bold mb-4 dark:text-white">Edit: <span class="text-themeRed">{{ editingItem.name }}</span></h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Unit Price ($)</label>
            <input type="number" step="0.01" min="0" v-model.number="editingItem.price" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-themeDark dark:text-white focus:outline-none focus:border-themeRed" />
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Item Discount (%)</label>
            <input type="number" step="1" min="0" max="100" v-model.number="editingItem.discount" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-themeDark dark:text-white focus:outline-none focus:border-themeRed" />
          </div>
        </div>

        <div class="flex gap-3 justify-end mt-6">
          <button @click="showEditItemModal = false; editingItem = null" class="px-4 py-2 bg-themeGold hover:bg-yellow-600 text-white rounded font-bold w-full transition">Done</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mockProducts = ref([
  { id: 1, name: 'Premium Red Silk', price: 15.50, unit: 'm', code: '1001', image: 'https://placehold.co/400x300/DC143C/white?text=Red+Silk' },
  { id: 2, name: 'Standard Cotton', price: 5.00, unit: 'm', code: '1002', image: 'https://placehold.co/400x300/87CEFA/white?text=Cotton' },
  { id: 3, name: 'White Lace Trim', price: 2.25, unit: 'm', code: '1003', image: 'https://placehold.co/400x300/F5F5F5/black?text=Lace' },
  { id: 4, name: 'Gold Embroidery Thread', price: 1.50, unit: 'roll', code: '1004', image: 'https://placehold.co/400x300/FFD700/black?text=Thread' },
  { id: 5, name: 'Khmer Traditional Hol', price: 40.00, unit: 'kben', code: '1005', image: 'https://placehold.co/400x300/8B0000/white?text=Hol+Silk' },
  { id: 6, name: 'Purple Chiffon', price: 8.50, unit: 'm', code: '1006', image: 'https://placehold.co/400x300/8A2BE2/white?text=Chiffon' },
  { id: 7, name: 'Satin Ribbon Blue', price: 0.75, unit: 'roll', code: '1007', image: 'https://placehold.co/400x300/4169E1/white?text=Ribbon' },
])

const cart = ref([])

const salesHistory = ref([])
const showHistory = ref(false)

const globalDiscount = ref(0)
const showGlobalDiscountModal = ref(false)

const editingItem = ref(null)
const showEditItemModal = ref(false)

const openEditItem = (item) => {
  if (item.discount === undefined) item.discount = 0;
  editingItem.value = item;
  showEditItemModal.value = true;
};

const cartSubtotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const cartItemDiscounts = computed(() => {
  return cart.value.reduce((total, item) => total + ((item.price * item.quantity) * (parseFloat(item.discount) || 0) / 100), 0)
})

const cartTotal = computed(() => {
  const remainingSubtotal = cartSubtotal.value - cartItemDiscounts.value;
  const globalDiscountAmount = remainingSubtotal * ((parseFloat(globalDiscount.value) || 0) / 100);
  return Math.max(0, remainingSubtotal - globalDiscountAmount);
})

const updateQuantity = (item, delta) => {
  if (item.quantity + delta >= 1) {
    item.quantity += delta;
  }
}

const addToCart = (product) => {
  const existingItem = cart.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    // Default to 1 meter/unit when added
    cart.value.push({ ...product, quantity: 1, discount: 0 })
  }
}

const handleScan = (e) => {
  const code = e.target.value
  const product = mockProducts.value.find(p => p.code === code)
  if (product) {
    addToCart(product)
  }
  e.target.value = '' // clear input
}

const checkout = async () => {
  const { showAlert } = useUiAlert()
  if (cart.value.length === 0) {
    showAlert("Cart is empty!", "Error", "error")
    return
  }
  
  // Save to history before clearing
  const historyItem = {
    id: Date.now(),
    date: new Date().toLocaleString(),
    items: JSON.parse(JSON.stringify(cart.value)),
    total: cartTotal.value,
    subtotal: cartSubtotal.value,
    itemDiscounts: cartItemDiscounts.value,
    globalDiscount: globalDiscount.value
  }
  salesHistory.value.unshift(historyItem)
  
  await showAlert("Sale completed successfully!", "Success", "success")
  
  // Auto clear cart after sale
  cart.value = []
  globalDiscount.value = 0
}

const editPastSale = async (historyItem) => {
  const { showConfirm } = useUiAlert()
  if (cart.value.length > 0) {
    const result = await showConfirm("Current cart will be replaced with this past sale. Continue?", "Warning")
    if (!result.isConfirmed) return;
  }
  cart.value = JSON.parse(JSON.stringify(historyItem.items));
  globalDiscount.value = historyItem.globalDiscount || 0;
  showHistory.value = false;
}
</script>

<style>
/* 
  Ensures that when the browser prints, it hides the sidebar and top navigation 
  from the global layout, printing ONLY the receipt template.
*/
@media print {
  body * {
    visibility: hidden;
  }
  .print\:block, .print\:block * {
    visibility: visible;
  }
  .print\:block {
    position: absolute;
    left: 0;
    top: 0;
  }
}

/* Hide number input arrows/spinners */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}
</style>