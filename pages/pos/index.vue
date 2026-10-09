<template>
  <div class="h-full print:h-auto flex flex-col lg:flex-row bg-gray-100 dark:bg-[#0F1117] print:bg-white print:block overflow-y-auto lg:overflow-hidden print:overflow-visible">
    
    <!-- LEFT: PRODUCT CATALOG -->
    <div class="flex-1 flex flex-col bg-white dark:bg-[#1A1D26] border-r border-gray-200 dark:border-gray-800 p-4 md:p-5 print:hidden overflow-hidden min-h-[50vh] lg:min-h-0 lg:h-auto">
      
      <!-- Search and Filter Bar -->
      <div class="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center mb-4">
        <div>
          <h1 class="text-xl font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider hidden md:block">
            {{ $t('pos') }}
          </h1>
          <p class="text-[11px] text-gray-400 hidden md:block">Select fabrics, input cut lengths & complete sales</p>
        </div>

        <div class="flex flex-1 md:flex-none gap-2 w-full md:w-auto">
          <!-- Color Filter Dropdown -->
          <select 
            v-model="activeColorFilter" 
            class="w-1/3 md:w-36 px-2.5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#252936] text-gray-900 dark:text-gray-100 focus:outline-none focus:border-themeRed text-xs font-semibold transition"
          >
            <option value="">All Colors</option>
            <option v-for="clr in colors" :key="clr.id" :value="clr.name">{{ clr.name }}</option>
          </select>

          <!-- Search Input -->
          <div class="relative flex-1 md:w-64">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              v-model="searchQuery"
              :placeholder="$t('search')" 
              class="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#252936] text-gray-900 dark:text-gray-100 focus:outline-none focus:border-themeRed focus:ring-1 focus:ring-themeRed text-xs font-mono transition"
              @keyup.enter="handleScan"
            />
          </div>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-gray-200 dark:border-gray-800 mb-4">
        <button 
          @click="activeCategory = 'all'"
          :class="activeCategory === 'all' ? 'border-themeRed text-themeRed dark:text-red-400 border-b-2 font-bold' : 'border-transparent text-gray-500 hover:text-themeRed font-medium'"
          class="pb-1.5 px-2 whitespace-nowrap text-xs transition flex items-center gap-1.5 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
          All Items ({{ products.length }})
        </button>
        <button 
          v-for="cat in categories"
          :key="cat.id"
          @click="activeCategory = cat.id"
          :class="activeCategory === cat.id ? 'border-themeRed text-themeRed dark:text-red-400 border-b-2 font-bold' : 'border-transparent text-gray-500 hover:text-themeRed font-medium'"
          class="pb-1.5 px-2 whitespace-nowrap text-xs transition cursor-pointer"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Product Grid -->
      <div class="flex-1 min-h-0 overflow-y-auto pr-1 pb-2">
        <div v-if="filteredAndSortedProducts.length === 0" class="flex flex-col items-center justify-center h-full py-16 text-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 mb-3 opacity-40 text-themeGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <p class="font-bold text-base text-gray-700 dark:text-gray-300">No products available in POS</p>
          <p class="text-xs text-gray-500 mt-1 max-w-sm">
            Your catalog is currently clean. Add new products in 
            <NuxtLink to="/inventory/add" class="text-themeRed dark:text-themeGold font-bold underline">Inventory</NuxtLink> 
            to start selling.
          </p>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3.5">
          <button 
            v-for="item in filteredAndSortedProducts" 
            :key="item.id"
            @click="item.stock > 0 || item.is_service ? addToCart(item) : null"
            :disabled="item.stock <= 0 && !item.is_service"
            :class="[
              item.stock <= 0 && !item.is_service ? 'opacity-50 cursor-not-allowed border-dashed' : 'hover:border-themeRed dark:hover:border-themeGold hover:shadow-md cursor-pointer',
              'bg-white dark:bg-[#1A1D26] rounded-xl border border-gray-200 dark:border-gray-800 transition-all duration-150 flex flex-col text-left group overflow-hidden h-full relative'
            ]"
          >
            <!-- Pin Button -->
            <div 
              @click.stop="togglePin(item)" 
              class="absolute top-1.5 left-1.5 z-10 p-1.5 rounded-full backdrop-blur transition-all" 
              :class="item.isPinned ? 'bg-themeGold text-white shadow-md' : 'bg-white/60 dark:bg-black/60 text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-themeGold opacity-0 group-hover:opacity-100'"
              title="Pin product to top"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>

            <!-- Product Image & Code Badge -->
            <div class="aspect-[4/3] w-full bg-gray-100 dark:bg-[#0F1117] overflow-hidden relative flex-shrink-0">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div class="absolute top-1.5 right-1.5 bg-black/75 backdrop-blur text-[10px] font-mono font-bold px-1.5 py-0.5 rounded text-white z-10">
                {{ item.code }}
              </div>
              
              <!-- Stock Warning Badges -->
              <div v-if="item.stock <= 0 && !item.is_service" class="absolute inset-0 bg-red-950/70 flex items-center justify-center">
                <span class="text-xs font-black uppercase tracking-wider text-white bg-red-600 px-2.5 py-1 rounded shadow">
                  Out of Stock
                </span>
              </div>
              <div v-else-if="item.stock <= item.alert_quantity && !item.is_service" class="absolute bottom-1 left-1.5 bg-red-600/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                Low: {{ item.stock }}{{ item.unit }}
              </div>
            </div>

            <!-- Product Details -->
            <div class="p-2.5 flex flex-col flex-grow min-w-0">
              <span class="font-bold text-gray-800 dark:text-gray-100 text-xs leading-snug mb-1 truncate w-full" :title="item.name">
                {{ item.name }}
              </span>

              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-1.5">
                  <span class="w-2.5 h-2.5 rounded-full border border-gray-300 dark:border-gray-600 shadow-xs" :style="{ backgroundColor: item.colorCode }"></span>
                  <span class="text-[10px] text-gray-500 font-semibold uppercase">{{ item.colorName }}</span>
                </div>
                <span v-if="!item.is_service" class="text-[10px] font-semibold text-gray-400">
                  {{ item.stock }} {{ item.unit }}
                </span>
              </div>

              <div class="mt-auto flex justify-between items-baseline w-full pt-1 border-t border-gray-100 dark:border-gray-800">
                <span class="text-themeRed dark:text-red-400 font-black text-sm">
                  ${{ item.price.toFixed(2) }}
                </span>
                <span class="text-[11px] text-gray-400 font-medium">
                  / {{ item.unit }}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- RIGHT: CART DRAWER -->
    <div class="w-full lg:w-[410px] bg-gray-50 dark:bg-[#0F1117] flex flex-col print:hidden flex-shrink-0 min-h-[350px] lg:min-h-0 lg:h-full overflow-hidden border-l border-t lg:border-t-0 border-gray-200 dark:border-gray-800">
      
      <!-- Cart Header -->
      <div class="p-3.5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-[#1A1D26]">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-themeGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h2 class="text-base font-bold text-gray-800 dark:text-gray-100 tracking-tight">Current Order</h2>
          <span v-if="cart.length > 0" class="text-xs bg-themeGold/20 text-themeGold font-bold px-2 py-0.5 rounded-full">
            {{ cart.length }} items
          </span>
        </div>
        <div class="flex gap-1.5">
          <button @click="showHistory = true" class="text-blue-500 hover:text-blue-700 transition p-1.5 rounded hover:bg-blue-50 dark:hover:bg-gray-800" title="View Sales History">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
          <button @click="confirmClearCart" v-if="cart.length > 0" class="text-gray-400 hover:text-red-600 transition p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800" title="Clear Cart">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>

      <!-- Cart Items List -->
      <div class="flex-grow overflow-y-auto p-3 space-y-2.5 bg-gray-50 dark:bg-[#0F1117]">
        <div v-if="cart.length === 0" class="flex flex-col items-center justify-center h-full text-gray-400 py-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2 opacity-40 text-themeGold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <p class="text-sm font-semibold">Cart is empty</p>
          <p class="text-xs text-gray-500 mt-1">Tap a fabric card to begin cut length</p>
        </div>
        
        <div 
          v-for="(cartItem, index) in cart" 
          :key="cartItem.cartItemId" 
          class="group flex flex-col p-2.5 bg-white dark:bg-[#1A1D26] rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 shadow-xs transition"
        >
          <div class="flex items-start">
            <!-- Thumbnail -->
            <div class="w-12 h-12 bg-gray-100 dark:bg-[#0F1117] rounded-lg flex-shrink-0 overflow-hidden mr-3 border border-gray-200 dark:border-gray-700">
              <img :src="cartItem.image" :alt="cartItem.name" class="w-full h-full object-cover" />
            </div>
            
            <div class="flex flex-col flex-grow justify-between min-w-0">
              <div class="flex justify-between items-start w-full">
                <div>
                  <p class="font-bold text-gray-800 dark:text-gray-100 text-xs leading-tight pr-2 truncate" :title="cartItem.name">
                    {{ cartItem.name }}
                  </p>
                  <div class="flex items-center gap-1.5 mt-0.5">
                    <span class="w-2.5 h-2.5 rounded-full border border-gray-300 dark:border-gray-600" :style="{ backgroundColor: cartItem.colorCode }"></span>
                    <span class="text-[9px] text-gray-400 font-bold uppercase">{{ cartItem.colorName }}</span>
                    <span class="text-[9px] text-gray-400 font-mono">(${ cartItem.price.toFixed(2) }}/{{ cartItem.unit }})</span>
                  </div>
                </div>
                <div class="flex gap-1 -mt-1 -mr-1">
                  <button @click="cart.splice(index, 1)" class="text-gray-400 hover:text-themeRed transition p-1" title="Remove">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
              
              <!-- Quantity Stepper with Decimal Support (TASK 1) -->
              <div class="flex justify-between items-center mt-2">
                <div class="flex items-center gap-1.5">
                  <div class="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-[#252936]">
                    <button 
                      type="button"
                      @click="updateQuantity(cartItem, -1)" 
                      class="w-9 h-9 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold transition text-sm active:scale-95"
                      title="Decrease cut length by 1"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      step="0.01" 
                      min="0.1"
                      v-model.number="cartItem.quantity" 
                      class="w-14 h-9 text-center font-bold bg-white dark:bg-[#252936] text-gray-900 dark:text-white text-xs focus:outline-none"
                    />
                    <button 
                      type="button"
                      @click="updateQuantity(cartItem, 1)" 
                      class="w-9 h-9 flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold transition text-sm active:scale-95"
                      title="Increase cut length by 1"
                    >
                      +
                    </button>
                  </div>
                  <span class="text-xs font-bold text-gray-500">{{ cartItem.unit }}</span>
                </div>
                
                <div class="text-right">
                  <p v-if="getItemDiscountAmount(cartItem) > 0" class="text-[10px] text-gray-400 line-through">
                    ${{ (cartItem.price * cartItem.quantity).toFixed(2) }}
                  </p>
                  <p class="font-extrabold text-gray-900 dark:text-white text-sm">
                    ${{ (cartItem.price * cartItem.quantity - getItemDiscountAmount(cartItem)).toFixed(2) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Inline Item Discount Row -->
          <div class="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/80">
            <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Discount:</span>
            <div class="flex rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden text-[10px]">
              <button
                type="button"
                @click="cartItem.discountType = 'percent'"
                :class="!cartItem.discountType || cartItem.discountType === 'percent' ? 'bg-themeRed text-white font-bold' : 'bg-gray-100 dark:bg-[#252936] text-gray-500'"
                class="px-2 py-0.5 transition"
              >%</button>
              <button
                type="button"
                @click="cartItem.discountType = 'fixed'"
                :class="cartItem.discountType === 'fixed' ? 'bg-themeRed text-white font-bold' : 'bg-gray-100 dark:bg-[#252936] text-gray-500'"
                class="px-2 py-0.5 transition"
              >$</button>
            </div>
            <input
              type="number"
              v-model.number="cartItem.discount"
              :max="cartItem.discountType === 'fixed' ? cartItem.price * cartItem.quantity : 100"
              min="0"
              step="0.01"
              class="w-16 text-[10px] px-2 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#252936] text-gray-900 dark:text-white focus:outline-none focus:border-themeRed"
              :placeholder="cartItem.discountType === 'fixed' ? '$0.00' : '0%'"
            />
          </div>

          <!-- Quick Preset Fast-Cut Chips -->
          <div class="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800/80">
            <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mr-1">Fast Cut:</span>
            <button 
              type="button"
              @click="addCutLength(cartItem, 0.5)"
              class="text-[10px] px-2 py-0.5 rounded-md bg-gray-100 dark:bg-[#252936] hover:bg-themeGold/20 hover:text-themeGold text-gray-700 dark:text-gray-300 font-bold border border-gray-200 dark:border-gray-700 transition active:scale-95"
              title="Add +0.5 meters to current length"
            >
              +0.5m
            </button>
            <button 
              type="button"
              v-for="preset in [1, 1.5, 2, 3]" 
              :key="preset"
              @click="setCutLength(cartItem, preset)"
              class="text-[10px] px-2 py-0.5 rounded-md transition font-bold border active:scale-95"
              :class="cartItem.quantity === preset 
                ? 'bg-themeGold text-white border-themeGold shadow-xs' 
                : 'bg-gray-100 dark:bg-[#252936] hover:bg-themeGold/20 hover:text-themeGold text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'"
              :title="`Set cut length to ${preset} meters`"
            >
              {{ preset }}m
            </button>
          </div>
        </div>
      </div>

      <!-- Checkout Drawer Controls -->
      <div class="p-4 bg-white dark:bg-[#1A1D26] border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
        
        <!-- Optional Accordion for Delivery/Preorder/Tailoring (TASK 3) -->
        <div class="border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 bg-gray-50 dark:bg-[#252936]/50 mb-3 transition">
          <button 
            type="button" 
            @click="showSpecialOrderAccordion = !showSpecialOrderAccordion"
            class="w-full flex items-center justify-between text-xs font-bold text-gray-700 dark:text-gray-200 hover:text-themeRed dark:hover:text-themeGold transition text-left"
          >
            <span class="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-themeGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              [+] Delivery / Preorder / Tailoring (Optional)
            </span>
            <span class="text-xs text-gray-400 font-mono">{{ showSpecialOrderAccordion ? '▲' : '▼' }}</span>
          </button>

          <div v-if="showSpecialOrderAccordion" class="mt-2.5 space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
            <input 
              type="text" 
              v-model="checkoutForm.customer_name" 
              placeholder="Customer Name (e.g., Sreymom Online)" 
              class="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#252936] dark:text-white focus:outline-none focus:border-themeRed"
            />
            <input 
              type="text" 
              v-model="checkoutForm.customer_phone" 
              placeholder="Phone or Telegram handle (@...)" 
              class="w-full px-2.5 py-1.5 text-xs rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#252936] dark:text-white focus:outline-none focus:border-themeRed"
            />
            <div class="flex items-center justify-between pt-1">
              <label class="flex items-center gap-1.5 cursor-pointer text-[11px] text-gray-600 dark:text-gray-400 font-medium">
                <input 
                  type="checkbox" 
                  :checked="checkoutForm.sale_status_id === 2" 
                  @change="checkoutForm.sale_status_id = $event.target.checked ? 2 : 1" 
                  class="rounded text-themeRed border-gray-300 focus:ring-themeRed" 
                />
                <span>Pick up later (Pending / Tailoring)</span>
              </label>
              <span class="text-[10px] text-gray-400 font-medium">Auto-synced</span>
            </div>
          </div>
        </div>

        <!-- Payment Method Selector -->
        <div class="mb-3">
          <label class="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">Payment Method</label>
          <div class="grid grid-cols-2 gap-2">
            <button 
              type="button"
              @click="paymentMethod = 'khqr'"
              :class="paymentMethod === 'khqr' 
                ? 'bg-emerald-600 text-white font-bold shadow border-emerald-600' 
                : 'bg-gray-100 dark:bg-[#252936] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-emerald-500'"
              class="py-2 px-3 rounded-lg border text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>
              <span>ABA / KHQR (95%)</span>
            </button>
            <button 
              type="button"
              @click="paymentMethod = 'cash'"
              :class="paymentMethod === 'cash' 
                ? 'bg-themeGold text-gray-950 font-bold shadow border-themeGold' 
                : 'bg-gray-100 dark:bg-[#252936] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-themeGold'"
              class="py-2 px-3 rounded-lg border text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <span>💵 Cash (USD & KHR)</span>
            </button>
          </div>
        </div>

        <!-- Cash & Change Calculator (When Cash is selected) -->
        <div v-if="paymentMethod === 'cash'" class="mb-3.5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-2.5 animate-fade-in">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1">
              💵 Cash Received & Change
            </span>
            <div class="flex gap-1.5">
              <button 
                type="button" 
                @click="setExactCash" 
                class="px-2 py-0.5 rounded text-[10px] font-bold bg-themeGold/20 hover:bg-themeGold text-gray-900 dark:text-white transition cursor-pointer"
              >
                Exact ($)
              </button>
              <button 
                type="button" 
                @click="clearCash" 
                class="px-2 py-0.5 rounded text-[10px] font-bold bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-100 hover:text-red-600 transition cursor-pointer"
              >
                Clear
              </button>
            </div>
          </div>

          <!-- Dual Currency Inputs -->
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-[10px] font-bold text-gray-500 mb-1">USD Received ($)</label>
              <div class="relative">
                <span class="absolute left-2.5 top-1.5 text-xs text-gray-400 font-bold">$</span>
                <input 
                  type="number" 
                  step="0.01" 
                  min="0"
                  v-model.number="cashReceivedUSD" 
                  placeholder="0.00"
                  class="w-full pl-6 pr-2 py-1.5 text-xs font-mono font-bold rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D26] text-gray-900 dark:text-white focus:outline-none focus:border-themeGold"
                />
              </div>
              <!-- Fast USD Chips -->
              <div class="flex flex-wrap gap-1 mt-1.5">
                <button type="button" @click="addCashUSD(10)" class="px-1.5 py-0.5 rounded text-[10px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-themeGold font-mono cursor-pointer">+$10</button>
                <button type="button" @click="addCashUSD(20)" class="px-1.5 py-0.5 rounded text-[10px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-themeGold font-mono cursor-pointer">+$20</button>
                <button type="button" @click="addCashUSD(50)" class="px-1.5 py-0.5 rounded text-[10px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-themeGold font-mono cursor-pointer">+$50</button>
                <button type="button" @click="addCashUSD(100)" class="px-1.5 py-0.5 rounded text-[10px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-themeGold font-mono cursor-pointer">+$100</button>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold text-gray-500 mb-1">KHR Received (៛)</label>
              <div class="relative">
                <span class="absolute left-2 top-1.5 text-xs text-gray-400 font-bold">៛</span>
                <input 
                  type="number" 
                  step="100" 
                  min="0"
                  v-model.number="cashReceivedKHR" 
                  placeholder="0"
                  class="w-full pl-5 pr-2 py-1.5 text-xs font-mono font-bold rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1A1D26] text-gray-900 dark:text-white focus:outline-none focus:border-themeGold"
                />
              </div>
              <!-- Fast KHR Chips -->
              <div class="flex flex-wrap gap-1 mt-1.5">
                <button type="button" @click="addCashKHR(20000)" class="px-1.5 py-0.5 rounded text-[10px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-themeGold font-mono cursor-pointer">+20k</button>
                <button type="button" @click="addCashKHR(50000)" class="px-1.5 py-0.5 rounded text-[10px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-themeGold font-mono cursor-pointer">+50k</button>
                <button type="button" @click="addCashKHR(100000)" class="px-1.5 py-0.5 rounded text-[10px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-themeGold font-mono cursor-pointer">+100k</button>
                <button type="button" @click="addCashKHR(200000)" class="px-1.5 py-0.5 rounded text-[10px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-themeGold font-mono cursor-pointer">+200k</button>
              </div>
            </div>
          </div>

          <!-- Total Tendered & Change Due Status -->
          <div class="pt-2 border-t border-amber-500/20">
            <div class="flex justify-between text-xs text-gray-600 dark:text-gray-300 mb-1">
              <span>Total Tendered:</span>
              <span class="font-mono font-bold">${{ totalCashReceivedUSD.toFixed(2) }} (៛{{ formatKHR(Math.round(totalCashReceivedUSD * exchangeRate)) }})</span>
            </div>

            <!-- Change Due (Sufficient) -->
            <div v-if="!isCashUnderpaid && totalCashReceivedUSD >= cartTotal && cart.length > 0" class="p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 flex justify-between items-center">
              <div>
                <span class="block text-[10px] uppercase font-bold tracking-wider">Change Due</span>
                <span class="text-sm font-black font-mono">${{ changeDueUSD.toFixed(2) }}</span>
              </div>
              <div class="text-right">
                <span class="block text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">In Riel</span>
                <span class="text-sm font-black font-mono">៛{{ formatKHR(changeDueKHR) }}</span>
              </div>
            </div>

            <!-- Underpaid Warning -->
            <div v-else-if="isCashUnderpaid" class="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 text-xs font-semibold flex items-center justify-between">
              <span>⚠️ Short by:</span>
              <span class="font-mono font-bold">${{ (cartTotal - totalCashReceivedUSD).toFixed(2) }} (៛{{ formatKHR(Math.round((cartTotal - totalCashReceivedUSD) * exchangeRate)) }})</span>
            </div>
          </div>
        </div>

          <!-- Exchange Rate Editable Badge -->
          <div class="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Exchange Rate</span>
            <div v-if="!editingRate" class="flex items-center gap-1">
              <span class="font-mono">1 USD = {{ exchangeRate.toLocaleString() }} ៛</span>
              <button @click="editingRate = true; tempRate = exchangeRate" class="ml-1 hover:text-themeGold transition" title="Edit rate">✎</button>
            </div>
            <div v-else class="flex items-center gap-1">
              <input
                type="number"
                v-model.number="tempRate"
                min="1"
                class="w-20 text-xs px-1.5 py-0.5 rounded border border-themeGold bg-white dark:bg-[#252936] text-gray-900 dark:text-white focus:outline-none font-mono"
                @keyup.enter="exchangeRate = tempRate; editingRate = false"
                @blur="exchangeRate = tempRate; editingRate = false"
              />
              <button @click="exchangeRate = tempRate; editingRate = false" class="text-emerald-500 hover:text-emerald-400 text-xs font-bold">✓</button>
            </div>
          </div>

          <!-- Price Breakdown -->
          <div class="space-y-1.5 mb-3.5">
            <div class="flex justify-between text-xs text-gray-500 font-semibold">
              <span>Subtotal</span>
              <span>${{ cartSubtotal.toFixed(2) }}</span>
            </div>
            <div v-if="cartItemDiscounts > 0" class="flex justify-between text-xs text-themeRed dark:text-red-400 font-semibold">
              <span>Item Discounts</span>
              <span>-${{ cartItemDiscounts.toFixed(2) }}</span>
            </div>

            <!-- Inline Order Discount (replaces modal) -->
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500 font-semibold">Order Discount</span>
              <div class="flex items-center gap-1.5">
                <div class="flex rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden text-[10px]">
                  <button
                    type="button"
                    @click="globalDiscountType = 'percent'"
                    :class="globalDiscountType === 'percent' ? 'bg-themeGold text-gray-950 font-bold' : 'bg-gray-100 dark:bg-[#252936] text-gray-500'"
                    class="px-2 py-0.5 transition"
                  >%</button>
                  <button
                    type="button"
                    @click="globalDiscountType = 'fixed'"
                    :class="globalDiscountType === 'fixed' ? 'bg-themeGold text-gray-950 font-bold' : 'bg-gray-100 dark:bg-[#252936] text-gray-500'"
                    class="px-2 py-0.5 transition"
                  >$</button>
                </div>
                <input
                  type="number"
                  v-model.number="globalDiscount"
                  min="0"
                  :max="globalDiscountType === 'percent' ? 100 : cartSubtotal - cartItemDiscounts"
                  step="0.01"
                  class="w-16 text-[10px] px-2 py-0.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#252936] text-gray-900 dark:text-white focus:outline-none focus:border-themeGold"
                  :placeholder="globalDiscountType === 'percent' ? '0%' : '$0'"
                />
                <span v-if="globalDiscount > 0" class="text-xs text-themeRed dark:text-red-400 font-semibold">-${{ globalDiscountAmount.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <div class="border-t border-dashed border-gray-200 dark:border-gray-800 my-2"></div>
          
          <!-- Dual Currency Total -->
          <div class="flex justify-between items-baseline">
            <span class="text-base font-bold text-gray-800 dark:text-gray-200">Total</span>
            <div class="text-right">
              <div class="text-2xl font-black text-themeRed dark:text-themeGold">
                ${{ cartTotal.toFixed(2) }}
              </div>
              <div class="text-xs font-bold text-gray-500 dark:text-gray-400">
                ៛{{ formatKHR(cartTotalKHR) }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Streamlined Checkout Button (TASK 2 & TASK 3) -->
        <button 
          @click="processCheckout"
          :disabled="cart.length === 0 || (paymentMethod === 'cash' && isCashUnderpaid)"
          :class="cart.length === 0 || (paymentMethod === 'cash' && isCashUnderpaid) ? 'opacity-50 cursor-not-allowed bg-gray-400' : 'bg-themeRed hover:bg-red-800 cursor-pointer'"
          class="w-full text-white py-3 rounded-xl font-bold text-base transition shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-themeGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span v-if="paymentMethod === 'cash' && isCashUnderpaid">
            Enter Cash Tendered (${{ cartTotal.toFixed(2) }})
          </span>
          <span v-else>
            ⚡ Complete Sale • ${{ cartTotal.toFixed(2) }} (៛{{ formatKHR(cartTotalKHR) }})
          </span>
        </button>
      </div>
    </div>

    <!-- RECEIPT PREVIEW MODAL (TASK 4 - NON-BLOCKING PRINT) -->
    <div v-if="showReceiptModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div class="bg-white dark:bg-[#1A1D26] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-100 animate-fade-in my-auto">
        
        <!-- Modal Top Bar -->
        <div class="p-4 bg-gray-50 dark:bg-[#252936] border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              ✓
            </div>
            <div>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white">Sale Completed Successfully</h3>
              <p class="text-[10px] text-gray-500">Order recorded & stock decremented</p>
            </div>
          </div>
          <button @click="startNewOrder" class="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <!-- Receipt Body (On-Screen Preview) -->
        <div class="p-5 font-sans space-y-4 max-h-[70vh] overflow-y-auto">
          <!-- Boutique Branding Header -->
          <div class="text-center pb-3 border-b border-dashed border-gray-300 dark:border-gray-700">
            <h2 class="text-xl font-black text-themeRed dark:text-themeGold tracking-wider uppercase">POS Fabrics & Boutique</h2>
            <p class="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">123 Silk Road, Phnom Penh • Tel: +855 12 345 678</p>
            <div v-if="completedInvoice.paymentMethod === 'Cash'" class="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wider border border-amber-500/20">
              Paid via Cash 💵
            </div>
            <div v-else class="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
              Paid via ABA / KHQR
            </div>
          </div>

          <!-- Metadata -->
          <div class="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
            <div>
              <span class="block text-[10px] text-gray-400 uppercase font-semibold">Invoice:</span>
              <span class="font-bold text-gray-800 dark:text-gray-200 font-mono">{{ completedInvoice.invoiceNo }}</span>
            </div>
            <div class="text-right">
              <span class="block text-[10px] text-gray-400 uppercase font-semibold">Date & Time:</span>
              <span class="font-semibold text-gray-800 dark:text-gray-200">{{ completedInvoice.date }}</span>
            </div>
            <div>
              <span class="block text-[10px] text-gray-400 uppercase font-semibold">Customer:</span>
              <span class="font-bold text-gray-800 dark:text-gray-200">{{ completedInvoice.customerName }}</span>
            </div>
            <div class="text-right">
              <span class="block text-[10px] text-gray-400 uppercase font-semibold">Sale Status:</span>
              <span class="font-bold text-themeGold">{{ completedInvoice.saleStatus }}</span>
            </div>
          </div>

          <!-- Itemized Cut List -->
          <div class="border-t border-b border-gray-200 dark:border-gray-800 py-2">
            <div class="flex justify-between text-[11px] font-bold text-gray-400 uppercase mb-2">
              <span>Fabric / Item</span>
              <span>Amount</span>
            </div>
            <div v-for="item in completedInvoice.items" :key="'rcpt-'+item.id" class="flex justify-between text-xs py-1 border-b border-gray-100 dark:border-gray-800/60 last:border-none">
              <div>
                <p class="font-bold text-gray-800 dark:text-gray-200">{{ item.name }}</p>
                <p class="text-[10px] text-gray-400 font-mono">
                  {{ item.quantity }}{{ item.unit }} @ ${{ item.price.toFixed(2) }}
                  <span v-if="item.discount > 0" class="text-red-500">(-{{ item.discount }}%)</span>
                </p>
              </div>
              <span class="font-bold text-gray-900 dark:text-white">
                ${{ ((item.price * item.quantity) * (1 - (item.discount || 0) / 100)).toFixed(2) }}
              </span>
            </div>
          </div>

          <!-- Totals (USD & KHR) -->
          <div class="space-y-1 text-xs">
            <div v-if="completedInvoice.globalDiscount > 0" class="flex justify-between text-themeRed dark:text-red-400 font-semibold">
              <span>Order Discount ({{ completedInvoice.globalDiscount }}%):</span>
              <span>-${{ ((completedInvoice.subtotal - completedInvoice.itemDiscounts) * (completedInvoice.globalDiscount / 100)).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-baseline pt-2 border-t-2 border-gray-300 dark:border-gray-700">
              <span class="text-sm font-black uppercase text-gray-800 dark:text-gray-200">Grand Total</span>
              <div class="text-right">
                <div class="text-xl font-black text-themeRed dark:text-themeGold">
                  ${{ completedInvoice.total.toFixed(2) }}
                </div>
                <div class="text-xs font-bold text-gray-500 dark:text-gray-400">
                  ៛{{ formatKHR(completedInvoice.totalKHR) }}
                </div>
              </div>
            </div>

            <!-- Cash tendered & Change details if paid via cash -->
            <div v-if="completedInvoice.paymentMethod === 'Cash'" class="pt-2 mt-2 border-t border-dashed border-gray-200 dark:border-gray-700 text-xs space-y-1">
              <div class="flex justify-between text-gray-500">
                <span>Cash Tendered (USD):</span>
                <span class="font-mono font-bold text-gray-800 dark:text-gray-200">${{ (completedInvoice.cashTenderedUSD || 0).toFixed(2) }}</span>
              </div>
              <div v-if="completedInvoice.cashTenderedKHR > 0" class="flex justify-between text-gray-500">
                <span>Cash Tendered (KHR):</span>
                <span class="font-mono font-bold text-gray-800 dark:text-gray-200">៛{{ formatKHR(completedInvoice.cashTenderedKHR) }}</span>
              </div>
              <div class="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold pt-1">
                <span>Change Returned:</span>
                <span class="font-mono">${{ (completedInvoice.changeUSD || 0).toFixed(2) }} (៛{{ formatKHR(completedInvoice.changeKHR) }})</span>
              </div>
            </div>
          </div>

          <!-- Receipt Code Display (Barcode / QR / Both) in Preview -->
          <div class="pt-3 border-t border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center">
            <ReceiptCode 
              :value="completedInvoice.invoiceNo || 'INV-001'" 
              :mode="receiptCodeFormat" 
              :barcode-height="38"
              :qr-size="80"
              caption="Scan code for pickup, returns or inventory lookup"
            />
          </div>
        </div>

        <!-- Receipt Code Format Selector (Barcode vs QR vs Both) -->
        <div class="px-4 py-2 bg-gray-100 dark:bg-[#222634] border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <span class="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1">
            🏷️ Print Format:
          </span>
          <div class="inline-flex rounded-lg border border-gray-300 dark:border-gray-700 p-0.5 bg-white dark:bg-[#1A1D26] text-xs">
            <button 
              type="button" 
              @click="receiptCodeFormat = 'barcode'"
              :class="receiptCodeFormat === 'barcode' ? 'bg-themeRed text-white font-bold shadow' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'"
              class="px-2 py-0.5 rounded transition text-[11px] cursor-pointer"
            >
              Barcode
            </button>
            <button 
              type="button" 
              @click="receiptCodeFormat = 'qr'"
              :class="receiptCodeFormat === 'qr' ? 'bg-themeRed text-white font-bold shadow' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'"
              class="px-2 py-0.5 rounded transition text-[11px] cursor-pointer"
            >
              QR Code
            </button>
            <button 
              type="button" 
              @click="receiptCodeFormat = 'both'"
              :class="receiptCodeFormat === 'both' ? 'bg-themeRed text-white font-bold shadow' : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'"
              class="px-2 py-0.5 rounded transition text-[11px] cursor-pointer"
            >
              Both
            </button>
          </div>
        </div>

        <!-- Modal Action Buttons (TASK 4) -->
        <div class="p-4 bg-gray-50 dark:bg-[#252936] border-t border-gray-200 dark:border-gray-800 flex gap-3">
          <button 
            type="button"
            @click="triggerPrint"
            class="flex-1 py-2.5 px-4 bg-themeGold hover:bg-yellow-600 text-gray-950 font-black rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            🖨️ Print Receipt
          </button>
          <button 
            type="button"
            @click="startNewOrder"
            class="flex-1 py-2.5 px-4 bg-themeRed hover:bg-red-800 text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-sm"
          >
            ✕ New Order
          </button>
        </div>
      </div>
    </div>

    <!-- HIDDEN THERMAL PRINT TEMPLATES (80mm) -->
    <div class="hidden print:block text-black bg-white">
      
      <!-- PAGE 1: STORE COPY -->
      <div class="w-[80mm] mx-auto p-4 font-mono text-sm" style="page-break-after: always;">
        <div class="text-center mb-4">
          <h2 class="font-bold text-xl mb-1">POS-SYSTEM (STORE COPY)</h2>
          <p class="text-xs">123 Silk Road, Phnom Penh</p>
          <div class="border-b-2 border-dashed border-gray-400 my-2"></div>
          <p class="text-xs text-left">Date: {{ completedInvoice.date || new Date().toLocaleString() }}</p>
          <p class="text-xs text-left">Invoice: {{ completedInvoice.invoiceNo || 'INV-001' }}</p>
          <p class="text-xs text-left">Cashier: Admin User</p>
          <p class="text-xs text-left">Customer: {{ completedInvoice.customerName }}</p>
          <div class="border-b-2 border-dashed border-gray-400 my-2"></div>
        </div>
        
        <div class="mb-4">
          <div class="flex justify-between font-bold text-xs mb-2">
            <span>Item</span>
            <span>Amt</span>
          </div>
          <div v-for="item in (completedInvoice.items.length ? completedInvoice.items : cart)" :key="'store-'+item.id" class="flex justify-between text-xs mb-1">
            <span class="w-3/5 truncate">{{ item.name }} ({{ item.quantity }}{{ item.unit }})</span>
            <span>${{ ((item.price * item.quantity) * (1 - (item.discount || 0) / 100)).toFixed(2) }}</span>
          </div>
        </div>

        <div class="border-t-2 border-dashed border-gray-400 pt-2 mb-4">
          <div class="flex justify-between font-bold text-sm mt-1">
            <span>TOTAL (USD):</span>
            <span>${{ (completedInvoice.total || cartTotal).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-bold text-sm mt-0.5">
            <span>TOTAL (KHR):</span>
            <span>៛{{ formatKHR(completedInvoice.totalKHR || cartTotalKHR) }}</span>
          </div>
          <div class="text-xs text-gray-600 mt-2">
            Payment: {{ completedInvoice.paymentMethod || 'ABA / KHQR' }}
          </div>
          <div v-if="completedInvoice.paymentMethod === 'Cash'" class="text-xs text-gray-700 mt-1 space-y-0.5">
            <div>Paid: ${{ (completedInvoice.cashTenderedUSD || 0).toFixed(2) }}<span v-if="completedInvoice.cashTenderedKHR > 0"> + ៛{{ formatKHR(completedInvoice.cashTenderedKHR) }}</span></div>
            <div class="font-bold">Change: ${{ (completedInvoice.changeUSD || 0).toFixed(2) }} (៛{{ formatKHR(completedInvoice.changeKHR) }})</div>
          </div>
        </div>

        <!-- Store Copy Code (1D Barcode & QR Code dynamic) -->
        <div class="text-center mt-3 pt-2 border-t border-dashed border-gray-300">
          <ReceiptCode 
            :value="completedInvoice.invoiceNo || 'INV-001'" 
            :mode="receiptCodeFormat" 
            :barcode-height="35"
            :qr-size="75"
            caption="Scan to update status or process return"
          />
        </div>
      </div>

      <!-- PAGE 2: CUSTOMER COPY -->
      <div class="w-[80mm] mx-auto p-4 font-sans text-sm" style="print-color-adjust: exact; -webkit-print-color-adjust: exact;">
        <div class="text-center mb-4 bg-[#8B0000] text-white p-4 rounded-t-lg">
          <h2 class="font-extrabold text-xl text-[#FFD700] tracking-widest">POS FABRICS</h2>
          <p class="text-xs opacity-90">123 Silk Road, Phnom Penh</p>
          <p class="text-xs opacity-90">Tel: +855 12 345 678</p>
        </div>
        
        <div class="mb-4 px-2">
          <p class="text-xs text-left text-gray-500">Date: <span class="text-gray-800 font-semibold">{{ completedInvoice.date || new Date().toLocaleString() }}</span></p>
          <p class="text-xs text-left text-gray-500">Invoice: <span class="text-gray-800 font-semibold">{{ completedInvoice.invoiceNo || 'INV-001' }}</span></p>
          <p class="text-xs text-left text-gray-500">
            Payment: 
            <span v-if="completedInvoice.paymentMethod === 'Cash'" class="text-amber-800 font-bold">Paid via Cash 💵</span>
            <span v-else class="text-emerald-700 font-bold">Paid via ABA / KHQR</span>
          </p>
          <div class="border-b-2 border-solid border-[#FFD700] my-3"></div>
        </div>
        
        <div class="mb-4 px-2">
          <div class="flex justify-between font-bold text-xs mb-2 text-[#8B0000] uppercase tracking-wider">
            <span>Item</span>
            <span>Amt</span>
          </div>
          <div v-for="item in (completedInvoice.items.length ? completedInvoice.items : cart)" :key="'cust-'+item.id" class="flex justify-between text-xs mb-2 border-b border-gray-100 pb-1">
            <span class="w-3/5 truncate">{{ item.name }} <span class="text-gray-400">x{{ item.quantity }}{{ item.unit }}</span></span>
            <span class="font-semibold">${{ ((item.price * item.quantity) * (1 - (item.discount || 0) / 100)).toFixed(2) }}</span>
          </div>
        </div>

        <div class="bg-gray-50 p-3 rounded-b-lg border-t-2 border-[#8B0000]">
          <div class="flex justify-between font-extrabold text-xl mt-1 text-[#8B0000]">
            <span>TOTAL</span>
            <span>${{ (completedInvoice.total || cartTotal).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-bold text-sm text-gray-600 mt-0.5">
            <span>RIEL</span>
            <span>៛{{ formatKHR(completedInvoice.totalKHR || cartTotalKHR) }}</span>
          </div>
          <div v-if="completedInvoice.paymentMethod === 'Cash'" class="mt-2 pt-2 border-t border-gray-200 text-xs">
            <div class="flex justify-between text-gray-600">
              <span>Paid:</span>
              <span>${{ (completedInvoice.cashTenderedUSD || 0).toFixed(2) }}<span v-if="completedInvoice.cashTenderedKHR > 0"> + ៛{{ formatKHR(completedInvoice.cashTenderedKHR) }}</span></span>
            </div>
            <div class="flex justify-between font-bold text-emerald-700 mt-0.5">
              <span>Change:</span>
              <span>${{ (completedInvoice.changeUSD || 0).toFixed(2) }} (៛{{ formatKHR(completedInvoice.changeKHR) }})</span>
            </div>
          </div>
        </div>
        
        <!-- Customer Copy Code (1D Barcode & QR Code dynamic) -->
        <div class="text-center mt-4">
          <p class="text-xs text-gray-500 font-bold mb-1">Receipt Verification Code</p>
          <ReceiptCode 
            :value="completedInvoice.invoiceNo || 'INV-001'" 
            :mode="receiptCodeFormat" 
            :barcode-height="40"
            :qr-size="85"
            caption="Show barcode / QR code for pickup or inquiry"
          />
        </div>

        <div class="text-center text-xs mt-4 text-gray-500 italic">
          <p>Thank you for choosing POS Fabrics!</p>
          <p>We hope to see you again.</p>
        </div>
      </div>
    </div>

    <!-- SALES HISTORY MODAL -->
    <div v-if="showHistory" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] border border-gray-200 dark:border-gray-800">
        <div class="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#252936]">
          <h2 class="text-lg font-bold dark:text-white">Sales History</h2>
          <button @click="showHistory = false" class="text-gray-500 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div class="overflow-y-auto p-4 flex-grow">
          <div v-if="sales.length === 0" class="text-center text-gray-500 py-8">
            No past sales yet.
          </div>
          <div v-for="sale in sales" :key="sale.id" class="mb-3 border border-gray-200 dark:border-gray-800 rounded-lg p-3 bg-gray-50 dark:bg-[#252936]/40">
            <div class="flex justify-between items-start mb-2">
              <div>
                <p class="font-bold text-sm dark:text-white">{{ sale.date }}</p>
                <p class="text-xs text-gray-500">{{ sale.items?.length || 0 }} items • {{ sale.customer_name }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-themeRed dark:text-themeGold">${{ sale.total.toFixed(2) }}</p>
                <p class="text-[10px] text-gray-400">៛{{ formatKHR(sale.totalKHR || Math.round((sale.total * 4100)/100)*100) }}</p>
              </div>
            </div>
            <button @click="editPastSale(sale)" class="w-full py-1.5 mt-2 bg-white dark:bg-gray-800 border border-themeGold rounded text-xs font-bold text-themeGold hover:bg-yellow-50 dark:hover:bg-gray-700 transition">
              Load Into Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- GLOBAL DISCOUNT MODAL -->
    <div v-if="showGlobalDiscountModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-2xl w-full max-w-sm overflow-hidden p-5 border border-gray-200 dark:border-gray-800">
        <h3 class="text-lg font-bold mb-4 dark:text-white">Order Discount</h3>
        <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Discount Percentage (%)</label>
        <input type="number" step="1" min="0" max="100" v-model.number="globalDiscount" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#252936] dark:text-white focus:outline-none focus:border-themeRed mb-4" />
        <div class="flex gap-3 justify-end">
          <button @click="showGlobalDiscountModal = false" class="px-4 py-2 text-gray-600 dark:text-gray-400 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-xs">Cancel</button>
          <button @click="showGlobalDiscountModal = false" class="px-4 py-2 bg-themeRed hover:bg-red-800 text-white rounded-lg font-bold transition text-xs">Apply</button>
        </div>
      </div>
    </div>

    <!-- EDIT ITEM MODAL: now only used for custom unit price override -->
    <div v-if="showEditItemModal && editingItem" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-2xl w-full max-w-sm overflow-hidden p-5 border border-gray-200 dark:border-gray-800">
        <h3 class="text-base font-bold mb-4 dark:text-white">Override Price: <span class="text-themeRed dark:text-red-400">{{ editingItem.name }}</span></h3>
        
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Custom Unit Price ($)</label>
            <input type="number" step="0.01" min="0" v-model.number="editingItem.price" class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-[#252936] dark:text-white focus:outline-none focus:border-themeRed text-xs" />
          </div>
        </div>

        <div class="flex gap-3 justify-end mt-5">
          <button @click="showEditItemModal = false; editingItem = null" class="px-4 py-2 bg-themeGold hover:bg-yellow-600 text-gray-950 rounded-lg font-bold w-full transition text-xs">Done</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// TASK 5: Live Front-End Stock Decrement & Inventory Sync
const { products, categories, colors, sales, decrementStock, addSale, receiptCodeFormat } = usePosState()
const { showConfirm } = useUiAlert()

const searchQuery = ref('')
const activeColorFilter = ref('')
const activeCategory = ref('all')

// Dual Currency Engine
const exchangeRate = ref(4100)
const editingRate = ref(false)
const tempRate = ref(4100)

const cartTotalKHR = computed(() => {
  return Math.round((cartTotal.value * exchangeRate.value) / 100) * 100
})

const formatKHR = (amount) => {
  return (amount || 0).toLocaleString('en-US')
}

// Toggle Pin
const togglePin = (item) => {
  item.isPinned = !item.isPinned
}

// Filtered and Sorted Products
const filteredAndSortedProducts = computed(() => {
  let list = products.value

  if (activeCategory.value !== 'all') {
    list = list.filter(p => p.category_id === activeCategory.value)
  }
  
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.code.toLowerCase().includes(q)
    )
  }

  if (activeColorFilter.value) {
    list = list.filter(p => p.colorName === activeColorFilter.value)
  }
  
  // Sort: Pinned first, then by name
  return [...list].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return a.name.localeCompare(b.name)
  })
})

// Cart State
const cart = ref([])

// Payment & Cash / Change engine (Dual Currency)
const paymentMethod = ref('khqr') // 'khqr' or 'cash'
const cashReceivedUSD = ref(null)
const cashReceivedKHR = ref(null)

const totalCashReceivedUSD = computed(() => {
  const usd = parseFloat(cashReceivedUSD.value) || 0
  const khr = parseFloat(cashReceivedKHR.value) || 0
  return usd + (khr / exchangeRate.value)
})

const changeDueUSD = computed(() => {
  if (paymentMethod.value !== 'cash') return 0
  return Math.max(0, Math.round((totalCashReceivedUSD.value - cartTotal.value) * 100) / 100)
})

const changeDueKHR = computed(() => {
  return Math.round((changeDueUSD.value * exchangeRate.value) / 100) * 100
})

const isCashUnderpaid = computed(() => {
  if (paymentMethod.value !== 'cash') return false
  return totalCashReceivedUSD.value < (cartTotal.value - 0.001) && cart.value.length > 0
})

const addCashUSD = (amount) => {
  cashReceivedUSD.value = Math.round(((parseFloat(cashReceivedUSD.value) || 0) + amount) * 100) / 100
}

const addCashKHR = (amount) => {
  cashReceivedKHR.value = (parseInt(cashReceivedKHR.value) || 0) + amount
}

const setExactCash = () => {
  cashReceivedUSD.value = cartTotal.value
  cashReceivedKHR.value = null
}

const clearCash = () => {
  cashReceivedUSD.value = null
  cashReceivedKHR.value = null
}

// Optional Special Order Accordion (TASK 3)
const showSpecialOrderAccordion = ref(false)
const checkoutForm = ref({
  sale_status_id: 1, // Default: Handed Over (Completed)
  payment_status_id: 1, // Default: Paid (Full)
  payment_method_id: 3, // Default: ABA / KHQR
  payment_method: 'ABA / KHQR',
  customer_name: '',
  customer_phone: ''
})

// History & Discounts
const showHistory = ref(false)
const globalDiscount = ref(0)
const globalDiscountType = ref('percent') // 'percent' or 'fixed'
const showGlobalDiscountModal = ref(false) // kept for backward compat but no longer needed
const editingItem = ref(null)
const showEditItemModal = ref(false)

// Receipt Preview Modal (TASK 4)
const showReceiptModal = ref(false)
const completedInvoice = ref({
  invoiceNo: '',
  date: '',
  items: [],
  subtotal: 0,
  itemDiscounts: 0,
  globalDiscount: 0,
  total: 0,
  totalKHR: 0,
  paymentMethod: 'ABA / KHQR',
  cashTenderedUSD: 0,
  cashTenderedKHR: 0,
  changeUSD: 0,
  changeKHR: 0,
  saleStatus: 'Handed Over',
  customerName: 'Walk-in Customer'
})

const openEditItem = (item) => {
  if (item.discount === undefined) item.discount = 0
  editingItem.value = item
  showEditItemModal.value = true
}

const cartSubtotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

// Computes total discount amount across all cart items (supports % and $ per item)
const getItemDiscountAmount = (item) => {
  const lineTotal = item.price * item.quantity
  if (item.discountType === 'fixed') {
    return Math.min(item.discount || 0, lineTotal)
  }
  return lineTotal * ((parseFloat(item.discount) || 0) / 100)
}

const cartItemDiscounts = computed(() => {
  return cart.value.reduce((total, item) => total + getItemDiscountAmount(item), 0)
})

const globalDiscountAmount = computed(() => {
  const afterItems = cartSubtotal.value - cartItemDiscounts.value
  if (globalDiscountType.value === 'fixed') {
    return Math.min(parseFloat(String(globalDiscount.value)) || 0, afterItems)
  }
  return afterItems * ((parseFloat(String(globalDiscount.value)) || 0) / 100)
})

const cartTotal = computed(() => {
  const afterItems = cartSubtotal.value - cartItemDiscounts.value
  return Math.round(Math.max(0, afterItems - globalDiscountAmount.value) * 100) / 100
})

// TASK 1: Decimal cuts and adjustments
const updateQuantity = (item, delta) => {
  const newQty = Math.round((Number(item.quantity || 0) + delta) * 100) / 100
  if (newQty >= 0.1) {
    const prod = products.value.find(p => p.id === item.id)
    if (prod && !prod.is_service && newQty > prod.stock) {
      item.quantity = prod.stock
      return
    }
    item.quantity = newQty
  }
}

const addCutLength = (item, amount) => {
  const newQty = Math.round((Number(item.quantity || 0) + amount) * 100) / 100
  const prod = products.value.find(p => p.id === item.id)
  if (prod && !prod.is_service && newQty > prod.stock) {
    item.quantity = prod.stock
    return
  }
  item.quantity = newQty
}

const setCutLength = (item, preset) => {
  const prod = products.value.find(p => p.id === item.id)
  if (prod && !prod.is_service && preset > prod.stock) {
    item.quantity = prod.stock
    return
  }
  item.quantity = preset
}

// Add to Cart
const addToCart = (product) => {
  if (product.stock <= 0 && !product.is_service) return

  const existingItem = cart.value.find(item => item.id === product.id)
  if (existingItem) {
    const newQty = Math.round((existingItem.quantity + 1) * 100) / 100
    if (!product.is_service && newQty > product.stock) {
      existingItem.quantity = product.stock
    } else {
      existingItem.quantity = newQty
    }
  } else {
    // Default to 1 meter/unit (or available stock if < 1)
    const initialQty = (!product.is_service && product.stock < 1) ? product.stock : 1
    cart.value.push({ 
      cartItemId: `cit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, // unique stable key
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      code: product.code,
      colorName: product.colorName,
      colorCode: product.colorCode,
      image: product.image,
      stock: product.stock,
      is_service: product.is_service,
      quantity: initialQty, 
      discount: 0,
      discountType: 'percent' // default to percent
    })
  }
}

// Barcode Scan Handler (input-based, clears searchQuery)
const handleScan = (e) => {
  const code = e.target.value.trim()
  const product = products.value.find(p => p.code.toLowerCase() === code.toLowerCase())
  if (product) {
    addToCart(product)
  }
  e.target.value = ''
  searchQuery.value = ''  // FIX: reset v-model so the product grid shows all items again
}

// Global barcode scanner listener (works without focus, handles USB laser scanners)
let scanBuffer = ''
let scanTimer = null
const onGlobalKeydown = (e) => {
  // Ignore if user is actively typing in a real input/textarea/select
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) return

  if (e.key === 'Enter') {
    if (scanBuffer.length >= 3) {
      const product = products.value.find(p => p.code.toLowerCase() === scanBuffer.toLowerCase())
      if (product) addToCart(product)
    }
    scanBuffer = ''
    return
  }
  // Only accumulate printable characters
  if (e.key.length === 1) {
    scanBuffer += e.key
  }
  if (scanTimer) clearTimeout(scanTimer)
  scanTimer = setTimeout(() => { scanBuffer = '' }, 80) // scanners emit chars in <50ms
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKeydown))

// Cart clear with confirmation
const confirmClearCart = async () => {
  if (cart.value.length === 0) return
  const result = await showConfirm(`Clear all ${cart.value.length} item(s) from the cart?`, 'Clear Cart')
  if (result.isConfirmed) cart.value = []
}

// TASK 3 & TASK 4: Streamlined checkout & Non-blocking receipt preview
const processCheckout = () => {
  if (cart.value.length === 0) return
  if (paymentMethod.value === 'cash' && isCashUnderpaid.value) return

  // Monotonic invoice counter (no collision risk)
  const storedCounter = parseInt(localStorage.getItem('bpas_invoice_counter') || '0')
  const newCounter = storedCounter + 1
  localStorage.setItem('bpas_invoice_counter', String(newCounter))
  const invoiceNo = `INV-${String(newCounter).padStart(6, '0')}`
  const createdAt = new Date().toISOString()   // ISO 8601 — sortable and filterable
  const saleDate = new Date().toLocaleString() // human-readable for display
  const custName = checkoutForm.value.customer_name.trim() || 'Walk-in Customer'
  const custPhone = checkoutForm.value.customer_phone.trim() || ''
  const isPending = checkoutForm.value.sale_status_id === 2

  const finalTotalUSD = cartTotal.value
  const finalTotalKHR = cartTotalKHR.value
  const frozenItems = JSON.parse(JSON.stringify(cart.value))

  const isCash = paymentMethod.value === 'cash'
  const finalPaymentMethod = isCash ? 'Cash' : 'ABA / KHQR'
  const tenderedUSD = isCash ? (parseFloat(cashReceivedUSD.value) || 0) : finalTotalUSD
  const tenderedKHR = isCash ? (parseFloat(cashReceivedKHR.value) || 0) : 0
  const changeUSD = isCash ? changeDueUSD.value : 0
  const changeKHR = isCash ? changeDueKHR.value : 0

  // 1. Decrement Stock (TASK 5)
  decrementStock(cart.value)

  // 2. Prepare and save transaction record
  const saleRecord = {
    id: Date.now(),
    reference_no: invoiceNo,
    date: saleDate,
    createdAt,              // ISO 8601 for sorting/filtering
    items: frozenItems,
    total: finalTotalUSD,
    totalKHR: finalTotalKHR,
    subtotal: cartSubtotal.value,
    itemDiscounts: cartItemDiscounts.value,
    globalDiscount: globalDiscount.value,
    globalDiscountType: globalDiscountType.value,
    sale_status_id: checkoutForm.value.sale_status_id,
    sale_status: isPending ? 'Pending / Tailoring' : 'Completed (Handed Over)',
    payment_status_id: 1,
    payment_status: 'Paid',
    payment_method_id: isCash ? 1 : 3,
    payment_method: finalPaymentMethod,
    cash_tendered_usd: tenderedUSD,
    cash_tendered_khr: tenderedKHR,
    change_usd: changeUSD,
    change_khr: changeKHR,
    customer_name: custName,
    customer_phone: custPhone,
    created_by: 'Admin User',
    grand_total: finalTotalUSD
  }

  addSale(saleRecord)

  // 3. Prepare receipt data for preview modal
  completedInvoice.value = {
    invoiceNo,
    date: saleDate,
    items: frozenItems,
    subtotal: cartSubtotal.value,
    itemDiscounts: cartItemDiscounts.value,
    globalDiscount: globalDiscount.value,
    total: finalTotalUSD,
    totalKHR: finalTotalKHR,
    paymentMethod: finalPaymentMethod,
    cashTenderedUSD: tenderedUSD,
    cashTenderedKHR: tenderedKHR,
    changeUSD: changeUSD,
    changeKHR: changeKHR,
    saleStatus: isPending ? 'Pending / Tailoring' : 'Handed Over',
    customerName: custName,
    customerPhone: custPhone
  }

  // 4. Open Non-Blocking Receipt Preview Modal (TASK 4)
  showReceiptModal.value = true
}

// Print Receipt cleanly
const triggerPrint = () => {
  window.print()
}

// Start New Order (Reset)
const startNewOrder = () => {
  cart.value = []
  globalDiscount.value = 0
  globalDiscountType.value = 'percent'
  checkoutForm.value.customer_name = ''
  checkoutForm.value.customer_phone = ''
  checkoutForm.value.sale_status_id = 1
  paymentMethod.value = 'khqr'
  cashReceivedUSD.value = null
  cashReceivedKHR.value = null
  showSpecialOrderAccordion.value = false
  showReceiptModal.value = false
}

// Re-checkout past sale
const editPastSale = async (pastSale) => {
  const { showConfirm } = useUiAlert()
  if (cart.value.length > 0) {
    const result = await showConfirm("Current cart will be replaced with this past sale. Continue?", "Warning")
    if (!result.isConfirmed) return
  }
  cart.value = JSON.parse(JSON.stringify(pastSale.items))
  globalDiscount.value = pastSale.globalDiscount || 0
  checkoutForm.value.customer_name = pastSale.customer_name !== 'Walk-in Customer' ? pastSale.customer_name : ''
  checkoutForm.value.customer_phone = pastSale.customer_phone || ''
  showHistory.value = false
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
    width: 100%;
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