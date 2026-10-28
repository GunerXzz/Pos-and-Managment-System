<template>
  <div class="h-full print:h-auto flex flex-col bg-atelier-ivory dark:bg-atelier-dark text-stone-900 dark:text-stone-100 font-sans print:bg-white print:block overflow-hidden print:overflow-visible transition-colors duration-300">
    
    <!-- TOP BAR: PIDAN KHMER SILK POS HEADER -->
    <header class="h-16 px-4 md:px-6 bg-white/95 dark:bg-atelier-card/95 backdrop-blur-md border-b border-atelier-border dark:border-atelier-borderDark flex items-center justify-between z-30 flex-shrink-0 print:hidden shadow-2xs">
      <!-- Brand & Terminal Info -->
      <div class="flex items-center gap-2.5 md:gap-3">
        <!-- Mobile Sidebar Toggle -->
        <button
          type="button"
          @click="toggleSidebar"
          class="md:hidden p-2 rounded-xl border border-atelier-border dark:border-atelier-borderDark bg-white dark:bg-atelier-card text-stone-700 dark:text-stone-300 hover:border-atelier-gold transition cursor-pointer shadow-2xs"
          title="Open Navigation Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div class="w-10 h-10 rounded-xl bg-atelier-red text-atelier-gold flex items-center justify-center font-serif font-black text-sm shadow-sm border border-atelier-gold/40 flex-shrink-0">
          PK
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-1.5 md:gap-2">
            <h1 class="font-serif font-bold text-sm sm:text-base md:text-lg tracking-wider text-atelier-red dark:text-atelier-gold uppercase leading-tight truncate">
              Pidan Khmer Silk
            </h1>
            <span class="hidden sm:inline-block text-[10px] font-medium px-2 py-0.5 rounded-full bg-atelier-gold/15 text-atelier-goldDark dark:text-atelier-gold border border-atelier-gold/30">
              ពិតានសូត្រខ្មែរ
            </span>
          </div>
          <div class="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] text-stone-500 dark:text-stone-400">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 flex-shrink-0"></span>
            <span class="truncate">Terminal 01</span>
            <span class="hidden sm:inline text-stone-300 dark:text-stone-700">|</span>
            <span class="hidden sm:inline font-mono text-[10px]">Catalog: {{ products.length }}</span>
          </div>
        </div>
      </div>

      <!-- Center Search & Omnibar -->
      <div class="hidden lg:flex items-center flex-1 max-w-md mx-6">
        <div class="relative w-full">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            ref="searchInputRef"
            type="text" 
            v-model="searchQuery"
            placeholder="Search by silk name, code (PK-001) or barcode... ('/' to focus)" 
            class="w-full pl-9 pr-12 py-2 rounded-xl border border-atelier-border dark:border-atelier-borderDark bg-atelier-paper/80 dark:bg-atelier-dark/80 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-atelier-gold focus:border-atelier-gold text-xs transition font-sans"
            @keyup.enter="handleScan"
          />
          <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center gap-1">
            <button 
              v-if="searchQuery" 
              @click="searchQuery = ''" 
              class="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <kbd class="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-mono text-stone-400 bg-white dark:bg-atelier-card border border-stone-200 dark:border-stone-700 rounded shadow-2xs">
              /
            </kbd>
          </div>
        </div>
      </div>

      <!-- Right Utility Actions -->
      <div class="flex items-center gap-2 md:gap-3">
        <!-- Exchange Rate Button -->
        <button 
          @click="showRateModal = true" 
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-atelier-border dark:border-atelier-borderDark bg-white dark:bg-atelier-card hover:border-atelier-gold text-xs font-mono font-bold text-stone-700 dark:text-stone-300 transition shadow-2xs cursor-pointer btn-press"
          title="Click to change exchange rate"
        >
          <span class="text-atelier-gold font-sans">$1.00</span>
          <span class="text-stone-400">⇄</span>
          <span>៛{{ formatKHR(exchangeRate) }}</span>
        </button>

        <!-- Store Info, Logo & A5 Receipt Settings Button -->
        <button 
          id="storeSettingsBtn"
          @click="openStoreSettings" 
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-atelier-border dark:border-atelier-borderDark bg-white dark:bg-atelier-card hover:border-atelier-gold text-xs font-bold text-stone-700 dark:text-stone-300 transition shadow-2xs cursor-pointer btn-press"
          title="Store Information, Custom Logo & A5 Receipt Template"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="hidden xl:inline">Receipt & Logo</span>
        </button>

        <!-- Invoices Archive Button -->
        <button 
          @click="showHistory = true" 
          class="relative p-2 rounded-xl border border-atelier-border dark:border-atelier-borderDark bg-white dark:bg-atelier-card hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition shadow-2xs cursor-pointer"
          title="Sales History & Invoices"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span v-if="sales.length > 0" class="absolute -top-1 -right-1 w-4 h-4 bg-atelier-red text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {{ sales.length }}
          </span>
        </button>

        <!-- Shortcuts Modal Trigger -->
        <button 
          @click="showShortcutsModal = true"
          class="hidden sm:flex p-2 rounded-xl border border-atelier-border dark:border-atelier-borderDark bg-white dark:bg-atelier-card hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition shadow-2xs cursor-pointer"
          title="Keyboard Shortcuts"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Mobile Screen Mode Switcher: Products vs Order Cart -->
    <div class="lg:hidden flex items-center bg-stone-100 dark:bg-atelier-card border-b border-atelier-border dark:border-atelier-borderDark p-1.5 flex-shrink-0 z-20">
      <button 
        type="button"
        @click="activeMobileTab = 'catalog'"
        :class="activeMobileTab === 'catalog' 
          ? 'bg-white dark:bg-atelier-dark text-atelier-red dark:text-atelier-gold font-bold shadow-2xs' 
          : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'"
        class="flex-1 py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Silk Catalog</span>
        <span class="text-[10px] px-1.5 py-0.2 rounded-full font-mono" :class="activeMobileTab === 'catalog' ? 'bg-atelier-red/10 text-atelier-red dark:bg-atelier-gold/20 dark:text-atelier-gold' : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400'">
          {{ filteredAndSortedProducts.length }}
        </span>
      </button>

      <button 
        type="button"
        @click="activeMobileTab = 'cart'"
        :class="activeMobileTab === 'cart' 
          ? 'bg-white dark:bg-atelier-dark text-atelier-red dark:text-atelier-gold font-bold shadow-2xs' 
          : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'"
        class="flex-1 py-1.5 rounded-lg text-xs transition flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>Current Order</span>
        <span v-if="cart.length > 0" class="text-[10px] px-1.5 py-0.2 rounded-full bg-atelier-red text-white font-mono font-bold">
          {{ cart.length }}
        </span>
        <span v-if="cartTotal > 0" class="font-bold text-atelier-red dark:text-atelier-gold text-xs">
          ${{ cartTotal.toFixed(2) }}
        </span>
      </button>
    </div>

    <!-- MAIN POS WORKSPACE: 2-COLUMN LUXURY LAYOUT -->
    <div class="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0 print:block relative">
      
      <!-- ======================================================== -->
      <!-- LEFT COLUMN: PRODUCT CATALOG & SILK BOLTS -->
      <!-- ======================================================== -->
      <section 
        :class="activeMobileTab === 'catalog' ? 'flex' : 'hidden lg:flex'"
        class="flex-1 flex-col bg-atelier-paper/40 dark:bg-atelier-dark border-r border-atelier-border dark:border-atelier-borderDark p-3 md:p-5 print:hidden overflow-hidden h-full min-h-0"
      >
        
        <!-- Filter Controls: Search (Mobile), Categories, and Colors -->
        <div class="space-y-3 mb-4 flex-shrink-0">
          
          <!-- Mobile Search Input -->
          <div class="lg:hidden relative">
            <input 
              type="text" 
              v-model="searchQuery"
              placeholder="Search silk or code (e.g. PK-001)..." 
              class="w-full pl-9 pr-3 py-2 rounded-xl border border-atelier-border dark:border-atelier-borderDark bg-white dark:bg-atelier-card text-xs"
              @keyup.enter="handleScan"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>

          <!-- Category Filter Pills -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-hide">
            <button 
              @click="activeCategory = 'all'"
              :class="activeCategory === 'all' 
                ? 'bg-atelier-red text-white shadow-xs font-bold border-atelier-red' 
                : 'bg-white dark:bg-atelier-card text-stone-600 dark:text-stone-300 hover:border-atelier-gold border-atelier-border dark:border-atelier-borderDark font-medium'"
              class="px-3.5 py-1.5 rounded-xl border text-xs whitespace-nowrap transition cursor-pointer flex items-center gap-2"
            >
              <span>All Collections</span>
              <span class="text-[10px] px-1.5 py-0.2 rounded-full font-mono" :class="activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'">
                {{ products.length }}
              </span>
            </button>

            <button 
              v-for="cat in categories"
              :key="cat.id"
              @click="activeCategory = cat.id"
              :class="activeCategory === cat.id 
                ? 'bg-atelier-red text-white shadow-xs font-bold border-atelier-red' 
                : 'bg-white dark:bg-atelier-card text-stone-600 dark:text-stone-300 hover:border-atelier-gold border-atelier-border dark:border-atelier-borderDark font-medium'"
              class="px-3.5 py-1.5 rounded-xl border text-xs whitespace-nowrap transition cursor-pointer flex items-center gap-2"
            >
              <span>{{ cat.name }}</span>
              <span class="text-[10px] px-1.5 py-0.2 rounded-full font-mono" :class="activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'">
                {{ getCategoryProductCount(cat.id) }}
              </span>
            </button>
          </div>

          <!-- Color Swatch Quick Filter -->
          <div class="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-hide">
            <span class="text-[10px] uppercase font-bold tracking-wider text-stone-400 mr-1 flex-shrink-0">
              Color Filter:
            </span>
            <button 
              @click="activeColorFilter = ''"
              :class="activeColorFilter === '' 
                ? 'border-atelier-gold bg-atelier-gold/15 text-atelier-goldDark dark:text-atelier-gold font-bold' 
                : 'border-transparent text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800'"
              class="px-2.5 py-0.5 rounded-lg border text-xs whitespace-nowrap transition cursor-pointer"
            >
              All Colors
            </button>
            <button 
              v-for="clr in colors" 
              :key="clr.id"
              @click="activeColorFilter = activeColorFilter === clr.name ? '' : clr.name"
              :class="activeColorFilter === clr.name ? 'ring-2 ring-atelier-gold ring-offset-1 dark:ring-offset-atelier-dark font-bold' : 'hover:scale-105 opacity-80 hover:opacity-100'"
              class="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border border-atelier-border dark:border-atelier-borderDark bg-white dark:bg-atelier-card text-xs whitespace-nowrap transition cursor-pointer flex-shrink-0"
              :title="`Filter by ${clr.name}`"
            >
              <span class="w-2.5 h-2.5 rounded-full border border-black/10 shadow-2xs" :style="{ backgroundColor: clr.code }"></span>
              <span class="text-stone-700 dark:text-stone-300">{{ clr.name }}</span>
            </button>
          </div>

        </div>

        <!-- Product Grid Catalog -->
        <div class="flex-1 min-h-0 overflow-y-auto pr-1">
          <!-- Empty State -->
          <div v-if="filteredAndSortedProducts.length === 0" class="flex flex-col items-center justify-center h-full py-16 text-center">
            <div class="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 class="font-serif font-bold text-base text-stone-800 dark:text-stone-200">No Silk Fabrics Found</h3>
            <p class="text-xs text-stone-500 max-w-sm mt-1">
              No products match "{{ searchQuery }}" in this category or color filter.
            </p>
            <button 
              @click="searchQuery = ''; activeColorFilter = ''; activeCategory = 'all'"
              class="mt-3 px-3 py-1.5 rounded-xl bg-atelier-red text-white text-xs font-bold hover:bg-atelier-redDark transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>

          <!-- Product Grid with Responsive Auto-Fitting Columns and Un-crowded Cards -->
          <div v-else class="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2.5 sm:gap-3.5 pb-4">
            <div 
              v-for="item in filteredAndSortedProducts" 
              :key="item.id"
              class="group bg-white dark:bg-atelier-card rounded-2xl border border-atelier-border dark:border-atelier-borderDark hover:border-atelier-gold dark:hover:border-atelier-gold transition-all duration-300 shadow-2xs card-hover hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] flex flex-col overflow-hidden relative cursor-pointer"
            >
              <!-- Pin Toggle Button -->
              <button 
                type="button"
                @click.stop="togglePin(item)" 
                class="absolute top-2 left-2 z-10 p-1.5 rounded-full backdrop-blur-md transition cursor-pointer" 
                :class="item.isPinned ? 'bg-atelier-gold text-white shadow-2xs' : 'bg-white/85 dark:bg-black/75 text-stone-400 hover:text-atelier-gold opacity-0 group-hover:opacity-100'"
                :title="item.isPinned ? 'Unpin' : 'Pin to top'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>

              <!-- Image with Fallback Pattern + Prominent SKU Code -->
              <div 
                @click="openPrecisionCutter(item)"
                @keydown.enter="openPrecisionCutter(item)"
                role="button"
                tabindex="0"
                :aria-label="'Custom cut or view ' + item.name"
                class="aspect-[4/3] w-full bg-stone-100 dark:bg-atelier-dark overflow-hidden relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-atelier-gold"
              >
                <!-- Render Product Image if available -->
                <img 
                  v-if="item.image" 
                  :src="item.image" 
                  :alt="item.name" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
                <!-- Elegant Silk Swatch Texture Fallback when image is empty -->
                <div 
                  v-else 
                  class="w-full h-full flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500"
                  :style="{ backgroundColor: item.colorCode ? `${item.colorCode}18` : '#FAF7F2' }"
                >
                  <div 
                    class="w-12 h-12 rounded-full border-2 border-white/80 dark:border-white/20 shadow-sm flex items-center justify-center transition-transform group-hover:scale-110"
                    :style="{ backgroundColor: item.colorCode || '#C5A059' }"
                  >
                    <!-- Silk Weave / Spool Icon -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white drop-shadow-xs" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                </div>
                
                <!-- Prominent Code / SKU Badge (Top Right) -->
                <div class="absolute top-2 right-2 bg-stone-950/80 backdrop-blur-md text-[10px] font-mono font-bold px-2 py-0.5 rounded-md text-white z-10 shadow-2xs border border-white/10">
                  {{ item.code }}
                </div>

                <!-- Stock Remaining Badge -->
                <div class="absolute bottom-2 left-2 z-10 max-w-[calc(100%-16px)]">
                  <div 
                    v-if="item.stock <= 0 && !item.is_service" 
                    class="bg-red-700/90 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-2xs uppercase tracking-wider truncate"
                  >
                    Sold Out
                  </div>
                  <div 
                    v-else-if="item.stock <= item.alert_quantity && !item.is_service" 
                    class="bg-amber-600/90 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-2xs truncate"
                  >
                    Low: {{ item.stock }}{{ item.unit }}
                  </div>
                  <div 
                    v-else-if="!item.is_service" 
                    class="bg-stone-900/75 backdrop-blur-md text-white text-[9px] font-medium px-2 py-0.5 rounded shadow-2xs border border-white/10 truncate"
                  >
                    {{ item.stock }} {{ item.unit }} in stock
                  </div>
                </div>

                <!-- Visual Roll Meter Indicator -->
                <div v-if="!item.is_service && item.stock > 0" class="absolute bottom-0 inset-x-0 h-1 bg-black/20">
                  <div 
                    class="h-full bg-atelier-gold transition-all duration-300"
                    :style="{ width: `${Math.min(100, (item.stock / 50) * 100)}%` }"
                  ></div>
                </div>
              </div>

              <!-- Product Details -->
              <div class="p-2.5 sm:p-3 flex flex-col flex-grow">
                <!-- Primary Product Name -->
                <div class="mb-1">
                  <h4 
                    @click="openPrecisionCutter(item)"
                    @keydown.enter="openPrecisionCutter(item)"
                    role="button"
                    tabindex="0"
                    class="font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-[13px] leading-snug cursor-pointer hover:text-atelier-red dark:hover:text-atelier-gold transition line-clamp-2 focus:outline-none focus:ring-1 focus:ring-atelier-gold rounded" 
                    :title="item.name"
                  >
                    {{ item.name }}
                  </h4>
                </div>

                <!-- Color & Type -->
                <div class="flex items-center justify-between gap-1 mb-2">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <span class="w-2.5 h-2.5 rounded-full border border-stone-300 dark:border-stone-600 shadow-2xs flex-shrink-0" :style="{ backgroundColor: item.colorCode }"></span>
                    <span class="text-[10px] text-stone-500 font-semibold uppercase tracking-wider truncate">{{ item.colorName }}</span>
                  </div>
                  <span v-if="item.is_service" class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex-shrink-0">
                    Service
                  </span>
                </div>

                <!-- Price Row with Wrapping Protection -->
                <div class="flex items-baseline justify-between gap-1 pt-2 border-t border-stone-100 dark:border-stone-800/80 mb-2 flex-wrap">
                  <div class="flex items-baseline gap-0.5">
                    <span class="text-atelier-red dark:text-atelier-gold font-bold text-sm sm:text-base leading-none">
                      ${{ item.price.toFixed(2) }}
                    </span>
                    <span class="text-[10px] text-stone-400 font-normal">
                      /{{ item.unit }}
                    </span>
                  </div>
                  <span class="text-[10px] font-mono text-stone-400 dark:text-stone-400 whitespace-nowrap">
                    ៛{{ formatKHR(Math.round(item.price * exchangeRate)) }}
                  </span>
                </div>

                <!-- Action Controls: Direct Cut & Precision Dialog -->
                <div class="mt-auto flex items-center gap-1.5 pt-1">
                  <!-- Default 1m Cut Button -->
                  <button 
                    :id="'add-product-' + item.code"
                    type="button"
                    @click="addToCartWithCut(item, 1)"
                    :disabled="item.stock <= 0 && !item.is_service"
                    class="flex-1 min-w-0 py-1.5 px-2 rounded-xl bg-atelier-red hover:bg-atelier-redDark text-white text-xs font-bold transition flex items-center justify-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-2xs active:scale-95"
                    :title="`Add 1 ${item.unit} directly`"
                  >
                    <span class="truncate">+1{{ item.unit }}</span>
                  </button>

                  <!-- Quick 0.5m cut (for physical goods) -->
                  <button 
                    type="button"
                    v-if="!item.is_service"
                    @click="addToCartWithCut(item, 0.5)"
                    :disabled="item.stock < 0.5"
                    class="w-11 flex-shrink-0 py-1.5 px-1 rounded-xl border border-atelier-border dark:border-atelier-borderDark hover:border-atelier-gold bg-stone-50 dark:bg-atelier-card text-stone-700 dark:text-stone-300 text-xs font-bold transition disabled:opacity-40 cursor-pointer active:scale-95 text-center"
                    title="Add 0.5 meter"
                  >
                    +0.5
                  </button>

                  <!-- Precision Cut Dialog Trigger (Ruler Icon) -->
                  <button 
                    type="button"
                    @click="openPrecisionCutter(item)"
                    class="w-9 flex-shrink-0 py-1.5 rounded-xl border border-atelier-border dark:border-atelier-borderDark hover:border-atelier-gold bg-stone-50 dark:bg-atelier-card text-atelier-goldDark dark:text-atelier-gold text-xs font-bold transition cursor-pointer active:scale-95 flex items-center justify-center"
                    :class="item.is_service ? 'flex-1' : ''"
                    :title="item.is_service ? 'Select Service' : 'Custom Cut Length Dial'"
                    :aria-label="'Custom cut dial for ' + item.name"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Quick Floating Cart Indicator -->
        <div 
          v-if="cart.length > 0 && activeMobileTab === 'catalog'"
          class="lg:hidden sticky bottom-1 z-30 pt-2"
        >
          <button
            type="button"
            @click="activeMobileTab = 'cart'"
            class="w-full py-3 px-4 rounded-xl bg-atelier-red hover:bg-atelier-redDark text-white shadow-xl transition flex items-center justify-between font-bold text-xs cursor-pointer border border-white/20 active:scale-[0.99]"
          >
            <div class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-mono">
                {{ cart.length }}
              </span>
              <span>Review Order & Checkout</span>
            </div>
            <div class="flex items-center gap-1.5 font-mono text-sm">
              <span class="text-atelier-goldLight font-bold">${{ cartTotal.toFixed(2) }}</span>
              <span>→</span>
            </div>
          </button>
        </div>
      </section>

      <!-- ======================================================== -->
      <!-- RIGHT COLUMN: CURRENT ORDER (STANDARD POS TERMINOLOGY) -->
      <!-- ======================================================== -->
      <aside 
        :class="activeMobileTab === 'cart' ? 'flex' : 'hidden lg:flex'"
        class="w-full lg:w-[420px] xl:w-[450px] bg-white dark:bg-atelier-card flex-col print:hidden flex-shrink-0 h-full overflow-hidden border-l border-t lg:border-t-0 border-atelier-border dark:border-atelier-borderDark shadow-lg z-20"
      >
        
        <!-- Order Header: Client & Order Details -->
        <div class="p-3.5 border-b border-atelier-border dark:border-atelier-borderDark bg-atelier-paper/60 dark:bg-atelier-dark/60 flex flex-col gap-2.5 flex-shrink-0">
          
          <!-- Top Row: Section Title, Items Badge, Clear Action -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h2 class="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Current Order
              </h2>
              <span v-if="cart.length > 0" class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-atelier-gold/20 text-atelier-goldDark dark:text-atelier-gold border border-atelier-gold/30">
                {{ cart.length }} {{ cart.length === 1 ? 'Item' : 'Items' }}
              </span>
            </div>

            <div class="flex items-center gap-1.5">
              <button 
                v-if="cart.length > 0"
                @click="confirmClearCart" 
                class="px-2 py-1 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs transition cursor-pointer flex items-center gap-1" 
                title="Clear current order"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span class="text-[10px] font-bold">Clear</span>
              </button>
            </div>
          </div>

          <!-- Customer Bar -->
          <div class="flex items-center gap-2">
            <button 
              type="button"
              @click="showCustomerModal = true"
              class="flex-1 flex items-center justify-between px-3 py-1.5 rounded-xl border border-atelier-border dark:border-atelier-borderDark bg-white dark:bg-atelier-card hover:border-atelier-gold transition cursor-pointer text-xs group text-left"
              aria-label="Edit Client Information"
            >
              <div class="flex items-center gap-2 min-w-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-stone-400 group-hover:text-atelier-gold transition flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <div class="truncate">
                  <span class="font-bold text-stone-800 dark:text-stone-200">
                    {{ checkoutForm.customer_name || 'Walk-in Client' }}
                  </span>
                  <span v-if="checkoutForm.customer_phone" class="text-[10px] text-stone-400 ml-1.5 font-mono">
                    ({{ checkoutForm.customer_phone }})
                  </span>
                </div>
              </div>
              <span class="text-[10px] text-atelier-gold font-bold">Edit</span>
            </button>

            <!-- Professional Fulfillment Selector (Replaces emoji toggle) -->
            <div class="flex rounded-xl border border-atelier-border dark:border-atelier-borderDark p-0.5 bg-stone-100 dark:bg-atelier-dark text-xs font-semibold">
              <button 
                type="button"
                @click="checkoutForm.sale_status_id = 1"
                :class="checkoutForm.sale_status_id === 1 
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-2xs font-bold' 
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'"
                class="px-2.5 py-1 rounded-lg transition cursor-pointer"
                title="Immediate purchase and fabric cut handed to customer"
              >
                Direct Sale
              </button>
              <button 
                type="button"
                @click="checkoutForm.sale_status_id = 2"
                :class="checkoutForm.sale_status_id === 2 
                  ? 'bg-atelier-gold text-stone-950 shadow-2xs font-bold' 
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'"
                class="px-2.5 py-1 rounded-lg transition cursor-pointer"
                title="Custom order for tailoring / pickup later"
              >
                Custom Tailoring
              </button>
            </div>
          </div>

          <!-- Optional Tailoring Deadline Note (When Custom Tailoring is active) -->
          <div v-if="checkoutForm.sale_status_id === 2" class="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2 animate-fade-in">
            <div class="flex items-center justify-between">
              <span class="font-bold text-amber-900 dark:text-amber-200 text-[11px]">Tailoring / Pickup Details:</span>
              <span class="text-[10px] text-stone-400">Pending Handover</span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <input 
                type="date" 
                v-model="checkoutForm.pickup_date" 
                class="w-full px-2 py-1 text-xs rounded-lg border border-amber-300 dark:border-amber-800 bg-white dark:bg-atelier-dark focus:outline-none"
              />
              <input 
                type="text" 
                v-model="checkoutForm.tailoring_note" 
                placeholder="Measurements / Pattern..." 
                class="w-full px-2 py-1 text-xs rounded-lg border border-amber-300 dark:border-amber-800 bg-white dark:bg-atelier-dark focus:outline-none"
              />
            </div>
          </div>

        </div>

        <!-- Order Items Scroll Area -->
        <div class="flex-grow overflow-y-auto p-3 space-y-2.5 bg-atelier-paper/40 dark:bg-atelier-dark/40">
          
          <!-- Empty State -->
          <div v-if="cart.length === 0" class="flex flex-col items-center justify-center h-full py-16 text-center text-stone-400 px-6">
            <div class="w-16 h-16 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mb-3 border border-stone-200 dark:border-stone-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 class="font-serif font-bold text-base text-stone-700 dark:text-stone-300">
              Order is Empty
            </h3>
            <p class="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed">
              Select silk fabrics or scan barcode to add items to the order.
            </p>
          </div>

          <!-- Active Order Items -->
          <div 
            v-for="(cartItem, index) in cart" 
            :key="cartItem.cartItemId"
            class="p-3 bg-white dark:bg-atelier-card rounded-2xl border border-atelier-border dark:border-atelier-borderDark hover:border-atelier-gold/60 transition shadow-2xs flex flex-col gap-2"
          >
            <!-- Product Item Row: Name, Code & Remove -->
            <div class="flex items-start gap-2.5">
              <!-- Swatch Indicator -->
              <div class="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-atelier-border dark:border-atelier-borderDark flex items-center justify-center bg-stone-100 dark:bg-atelier-dark">
                <img v-if="cartItem.image" :src="cartItem.image" :alt="cartItem.name" class="w-full h-full object-cover" />
                <div v-else class="w-5 h-5 rounded-full border border-black/10" :style="{ backgroundColor: cartItem.colorCode || '#C5A059' }"></div>
              </div>

              <div class="flex-grow min-w-0">
                <div class="flex items-start justify-between">
                  <h4 class="font-bold text-stone-900 dark:text-stone-100 text-xs leading-snug truncate pr-2" :title="cartItem.name">
                    {{ cartItem.name }}
                  </h4>
                  <button 
                    @click="cart.splice(index, 1)" 
                    class="text-stone-400 hover:text-red-500 p-0.5 rounded transition cursor-pointer" 
                    title="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>

                <div class="flex items-center gap-2 mt-0.5">
                  <span class="text-[10px] font-mono font-bold px-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {{ cartItem.code }}
                  </span>
                  <span class="text-[10px] text-stone-500 font-bold uppercase">{{ cartItem.colorName }}</span>
                  <span class="text-[10px] font-mono text-stone-400">
                    ${{ cartItem.price.toFixed(2) }}/{{ cartItem.unit }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Stepper Controls & Line Total -->
            <div class="flex items-center justify-between pt-1">
              <!-- Stepper -->
              <div class="flex items-center gap-1.5">
                <div class="flex items-center border border-atelier-border dark:border-atelier-borderDark rounded-xl overflow-hidden bg-stone-50 dark:bg-atelier-dark shadow-2xs">
                  <button 
                    type="button"
                    @click="updateQuantity(cartItem, -0.5)"
                    class="w-8 h-8 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 font-bold transition text-xs active:scale-90 cursor-pointer"
                    title="Decrease by 0.5"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    step="0.01" 
                    min="0.1"
                    v-model.number="cartItem.quantity" 
                    class="w-14 h-8 text-center font-mono font-bold bg-white dark:bg-atelier-card text-stone-900 dark:text-stone-100 text-xs focus:outline-none"
                  />
                  <button 
                    type="button"
                    @click="updateQuantity(cartItem, 0.5)"
                    class="w-8 h-8 flex items-center justify-center text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 font-bold transition text-xs active:scale-90 cursor-pointer"
                    title="Increase by 0.5"
                  >
                    +
                  </button>
                </div>
                <span class="text-xs font-bold text-stone-400">{{ cartItem.unit }}</span>
              </div>

              <!-- Line Price -->
              <div class="text-right">
                <div v-if="getItemDiscountAmount(cartItem) > 0" class="text-[10px] text-stone-400 line-through font-mono">
                  ${{ (cartItem.price * cartItem.quantity).toFixed(2) }}
                </div>
                <div class="font-serif font-bold text-sm text-atelier-red dark:text-atelier-gold">
                  ${{ (cartItem.price * cartItem.quantity - getItemDiscountAmount(cartItem)).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Preset Chips & Discount Action -->
            <div class="flex items-center justify-between pt-1 border-t border-stone-100 dark:border-stone-800/80 text-[10px]">
              <div class="flex items-center gap-1">
                <span class="text-stone-400">Presets:</span>
                <button 
                  v-for="preset in [1, 1.5, 2, 3]" 
                  :key="preset"
                  @click="setCutLength(cartItem, preset)"
                  :class="cartItem.quantity === preset 
                    ? 'bg-atelier-gold text-stone-950 font-bold border-atelier-gold' 
                    : 'bg-stone-100 dark:bg-atelier-dark text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-atelier-gold'"
                  class="px-1.5 py-0.5 rounded border transition cursor-pointer"
                >
                  {{ preset }}m
                </button>
              </div>

              <button 
                type="button"
                @click="cartItem.showDiscount = !cartItem.showDiscount"
                class="text-atelier-gold hover:underline font-bold"
              >
                {{ cartItem.discount > 0 ? `-${cartItem.discount}${cartItem.discountType === 'percent' ? '%' : '$'}` : '+ Discount' }}
              </button>
            </div>

            <!-- Expandable Line Discount Input -->
            <div v-if="cartItem.showDiscount" class="flex items-center gap-2 pt-1 border-t border-dashed border-stone-200 dark:border-stone-800 animate-fade-in">
              <span class="text-[10px] text-stone-400 font-semibold">Item Discount:</span>
              <div class="flex rounded-md border border-stone-300 dark:border-stone-600 overflow-hidden text-[10px]">
                <button
                  type="button"
                  @click="cartItem.discountType = 'percent'"
                  :class="!cartItem.discountType || cartItem.discountType === 'percent' ? 'bg-atelier-red text-white font-bold' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'"
                  class="px-2 py-0.5 transition"
                >%</button>
                <button
                  type="button"
                  @click="cartItem.discountType = 'fixed'"
                  :class="cartItem.discountType === 'fixed' ? 'bg-atelier-red text-white font-bold' : 'bg-stone-100 dark:bg-stone-800 text-stone-500'"
                  class="px-2 py-0.5 transition"
                >$</button>
              </div>
              <input
                type="number"
                v-model.number="cartItem.discount"
                min="0"
                step="0.01"
                class="w-16 text-[10px] px-2 py-0.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-atelier-dark text-stone-900 dark:text-white focus:outline-none font-mono"
                placeholder="0"
              />
            </div>

          </div>

        </div>

        <!-- Order Summary & Tender Button -->
        <div class="p-4 bg-white dark:bg-atelier-card border-t border-atelier-border dark:border-atelier-borderDark flex-shrink-0 shadow-xl space-y-3">
          
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between text-stone-500 font-medium">
              <span>Subtotal</span>
              <span class="font-mono">${{ cartSubtotal.toFixed(2) }}</span>
            </div>

            <div v-if="cartItemDiscounts > 0" class="flex justify-between text-atelier-red dark:text-red-400 font-medium">
              <span>Item Discounts</span>
              <span class="font-mono">-${{ cartItemDiscounts.toFixed(2) }}</span>
            </div>

            <!-- Global Order Discount -->
            <div class="flex items-center justify-between">
              <span class="text-stone-500 font-medium">Order Discount</span>
              <div class="flex items-center gap-1.5">
                <div class="flex rounded-md border border-stone-300 dark:border-stone-700 overflow-hidden text-[10px]">
                  <button
                    type="button"
                    @click="globalDiscountType = 'percent'"
                    :class="globalDiscountType === 'percent' ? 'bg-atelier-gold text-stone-950 font-bold' : 'bg-stone-100 dark:bg-atelier-dark text-stone-500'"
                    class="px-1.5 py-0.5 transition"
                  >%</button>
                  <button
                    type="button"
                    @click="globalDiscountType = 'fixed'"
                    :class="globalDiscountType === 'fixed' ? 'bg-atelier-gold text-stone-950 font-bold' : 'bg-stone-100 dark:bg-atelier-dark text-stone-500'"
                    class="px-1.5 py-0.5 transition"
                  >$</button>
                </div>
                <input
                  type="number"
                  v-model.number="globalDiscount"
                  min="0"
                  step="0.01"
                  class="w-14 text-[10px] px-1.5 py-0.5 rounded border border-stone-300 dark:border-stone-700 bg-white dark:bg-atelier-dark text-stone-900 dark:text-white focus:outline-none font-mono"
                  placeholder="0"
                />
                <span v-if="globalDiscount > 0" class="text-atelier-red font-mono font-bold">
                  -${{ globalDiscountAmount.toFixed(2) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Total Calculation -->
          <div class="pt-2 border-t border-dashed border-atelier-border dark:border-atelier-borderDark flex items-baseline justify-between">
            <div>
              <span class="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider block">
                Total Due
              </span>
              <span class="text-[10px] text-stone-400">
                Tax inclusive (USD & KHR)
              </span>
            </div>
            <div class="text-right">
              <div class="font-serif font-bold text-2xl text-atelier-red dark:text-atelier-gold leading-none">
                ${{ cartTotal.toFixed(2) }}
              </div>
              <div class="font-mono font-bold text-xs text-stone-500 dark:text-stone-400 mt-1">
                ៛{{ formatKHR(cartTotalKHR) }}
              </div>
            </div>
          </div>

          <!-- Primary Checkout CTA Button -->
          <button 
            id="proceedToPaymentBtn"
            @click="openTenderDrawer"
            :disabled="cart.length === 0"
            :class="cart.length === 0 
              ? 'opacity-40 cursor-not-allowed bg-stone-300 dark:bg-stone-800 text-stone-500' 
              : 'bg-atelier-red hover:bg-atelier-redDark text-white shadow-md hover:shadow-lg cursor-pointer active:scale-[0.99]'"
            class="w-full py-3.5 px-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2"
          >
            <span>Proceed to Payment</span>
            <span v-if="cart.length > 0" class="text-xs opacity-90 font-mono">
              • ${{ cartTotal.toFixed(2) }}
            </span>
            <kbd class="ml-2 hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-black/20 rounded">
              F2
            </kbd>
          </button>

        </div>

      </aside>

    </div>

    <!-- ======================================================== -->
    <!-- MODAL 1: FAST CHECKOUT & RECEIPT PREVIEW MODAL -->
    <!-- ======================================================== -->
    <div 
      v-if="showTenderModal" 
      role="dialog"
      aria-modal="true"
      aria-labelledby="tenderModalHeading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-3 md:p-4 animate-fade-in"
      @click.self="showTenderModal = false"
    >
      <div class="bg-white dark:bg-atelier-card rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden border border-atelier-border dark:border-atelier-borderDark text-stone-900 dark:text-stone-100 flex flex-col max-h-[92vh]">
        
        <!-- Modal Top Header -->
        <div class="px-5 py-3.5 bg-atelier-paper/60 dark:bg-atelier-dark/60 border-b border-atelier-border dark:border-atelier-borderDark flex justify-between items-center flex-shrink-0">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7A1A24] to-[#C5A059] flex items-center justify-center text-white font-serif font-black text-xs shadow-xs">
              PK
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 id="tenderModalHeading" class="font-serif font-bold text-base md:text-lg text-stone-900 dark:text-stone-100">
                  Fast Settlement & Receipt Preview
                </h3>
                <span class="text-[10px] font-mono font-bold bg-[#C5A059]/15 text-[#C5A059] px-2 py-0.5 rounded-full border border-[#C5A059]/30">
                  {{ completedInvoice.invoiceNo || 'PK-00001' }}
                </span>
              </div>
              <p class="text-[11px] text-stone-500 dark:text-stone-400">Review invoice, customize logo/info, and print with one click</p>
            </div>
          </div>
          <button 
            type="button"
            @click="showTenderModal = false"
            class="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-2 rounded-xl transition cursor-pointer"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body: 2 Columns (Payment Mode on Left 5 cols, A5/80mm Live Preview on Right 7 cols) -->
        <div class="p-4 md:p-6 flex-grow overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-5">
          
          <!-- LEFT: PAYMENT ENGINE (md:col-span-5) -->
          <div class="md:col-span-5 flex flex-col justify-between space-y-4">
            
            <div class="space-y-4">
              <!-- Payment Method Toggle -->
              <div>
                <label class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                  Payment Method
                </label>
                <div class="grid grid-cols-2 gap-2">
                  <button 
                    type="button"
                    @click="paymentMethod = 'scan'"
                    :class="paymentMethod === 'scan' 
                      ? 'bg-gradient-to-r from-[#7A1A24] to-[#94222E] text-white font-bold shadow-md ring-2 ring-[#C5A059]/50' 
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'"
                    class="py-3 px-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all btn-press cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span>KHQR / Scan (Paid)</span>
                  </button>

                  <button 
                    type="button"
                    @click="paymentMethod = 'cash'; setExactCash()"
                    :class="paymentMethod === 'cash' 
                      ? 'bg-gradient-to-r from-[#C5A059] to-[#B58739] text-stone-900 font-bold shadow-md' 
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'"
                    class="py-3 px-3 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all btn-press cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Cash Payment</span>
                  </button>
                </div>
              </div>

              <!-- Payable Callout -->
              <div class="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/70 dark:border-stone-700/60 space-y-2">
                <div class="flex justify-between items-baseline">
                  <span class="text-xs text-stone-500 font-medium">Payable Amount:</span>
                  <div class="text-right">
                    <span class="font-serif font-black text-2xl text-[#7A1A24] dark:text-[#E6C98A] block">
                      ${{ cartTotal.toFixed(2) }}
                    </span>
                    <span class="font-mono font-bold text-xs text-stone-500">
                      ៛{{ formatKHR(cartTotalKHR) }}
                    </span>
                  </div>
                </div>

                <div class="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-[11px] text-stone-500">
                  <span>Client: <strong class="text-stone-800 dark:text-stone-200">{{ checkoutForm.customer_name || 'Walk-in Client' }}</strong></span>
                  <span>Items: <strong class="text-stone-800 dark:text-stone-200">{{ cart.length }} items</strong></span>
                </div>
              </div>

              <!-- Optional Cash Inputs (Only shown if Cash tab is active) -->
              <div v-if="paymentMethod === 'cash'" class="space-y-3 pt-1 animate-fade-in">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-bold text-stone-500">Cash Received ($)</span>
                  <button type="button" @click="setExactCash" class="text-xs text-[#C5A059] font-bold hover:underline cursor-pointer">
                    Exact Cash (${{ cartTotal.toFixed(2) }})
                  </button>
                </div>
                <div class="relative">
                  <span class="absolute left-3 top-2.5 text-stone-400 font-bold">$</span>
                  <input 
                    type="number"
                    step="0.01"
                    min="0"
                    v-model.number="cashReceivedUSD"
                    placeholder="0.00"
                    class="w-full pl-7 pr-3 py-2 text-sm font-mono font-bold rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                  />
                </div>
                <div class="grid grid-cols-4 gap-1">
                  <button type="button" @click="addCashUSD(10)" class="py-1 rounded-lg text-xs bg-stone-100 dark:bg-stone-800 border font-mono font-bold hover:border-[#C5A059] cursor-pointer">+$10</button>
                  <button type="button" @click="addCashUSD(20)" class="py-1 rounded-lg text-xs bg-stone-100 dark:bg-stone-800 border font-mono font-bold hover:border-[#C5A059] cursor-pointer">+$20</button>
                  <button type="button" @click="addCashUSD(50)" class="py-1 rounded-lg text-xs bg-stone-100 dark:bg-stone-800 border font-mono font-bold hover:border-[#C5A059] cursor-pointer">+$50</button>
                  <button type="button" @click="addCashUSD(100)" class="py-1 rounded-lg text-xs bg-stone-100 dark:bg-stone-800 border font-mono font-bold hover:border-[#C5A059] cursor-pointer">+$100</button>
                </div>

                <!-- Change Due -->
                <div class="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs flex justify-between items-center font-bold">
                  <span class="text-emerald-800 dark:text-emerald-300">Change Due:</span>
                  <span class="font-mono text-emerald-800 dark:text-emerald-300 text-base">
                    ${{ changeDueUSD.toFixed(2) }} (៛{{ formatKHR(changeDueKHR) }})
                  </span>
                </div>
              </div>

              <!-- Scan Prompt Note -->
              <div v-else class="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 text-xs space-y-1">
                <div class="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fast Scan Mode Active</span>
                </div>
                <p class="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Customer pays via digital QR scan. Ready to print A5 receipt instantly without waiting for cash input.
                </p>
              </div>
            </div>

            <!-- Fast Action Buttons -->
            <div class="space-y-2 pt-2">
              <button 
                id="confirmPrintBtn"
                type="button"
                @click="processCheckout(true)"
                :disabled="isProcessing"
                class="w-full py-3.5 px-6 rounded-2xl bg-[#7A1A24] hover:bg-[#94222E] text-white font-bold text-sm shadow-md hover:shadow-xl transition-all btn-press flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Confirm & Print Receipt [Enter]</span>
              </button>

              <div class="flex items-center gap-2">
                <button 
                  id="quickCompleteBtn"
                  type="button"
                  @click="processCheckout(false)"
                  :disabled="isProcessing"
                  class="flex-1 py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs transition btn-press cursor-pointer text-center"
                >
                  Quick Complete (No Print)
                </button>
                <button 
                  id="backToOrderBtn"
                  type="button"
                  @click="showTenderModal = false"
                  class="py-2.5 px-4 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-800 text-xs font-bold transition btn-press cursor-pointer"
                >
                  Back to Order
                </button>
              </div>
            </div>

          </div>

          <!-- RIGHT: LIVE RECEIPT PREVIEW (md:col-span-7) WITH A5 / 80mm TOGGLE & LOGO CONFIG -->
          <div class="md:col-span-7 flex flex-col">
            
            <!-- Format Switcher & Edit Store Info Header -->
            <div class="mb-2 flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/70 dark:border-stone-800/80 pb-2">
              <div class="flex items-center gap-1.5">
                <span class="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Format:</span>
                <div class="inline-flex rounded-xl p-0.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold">
                  <button 
                    type="button"
                    @click="activePrintFormat = 'a5'"
                    :class="activePrintFormat === 'a5' 
                      ? 'bg-white dark:bg-[#230A0E] text-[#7A1A24] dark:text-[#E6C98A] shadow-xs' 
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'"
                    class="px-3 py-1 rounded-lg transition-all cursor-pointer"
                  >
                    A5 Invoice (148×210mm)
                  </button>
                  <button 
                    type="button"
                    @click="activePrintFormat = '80mm'"
                    :class="activePrintFormat === '80mm' 
                      ? 'bg-white dark:bg-[#230A0E] text-[#7A1A24] dark:text-[#E6C98A] shadow-xs' 
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'"
                    class="px-3 py-1 rounded-lg transition-all cursor-pointer"
                  >
                    80mm Thermal Slip
                  </button>
                </div>
              </div>

              <!-- Button to Change Store Info & Upload Logo -->
              <button 
                type="button"
                id="editReceiptLogoBtn"
                @click="openStoreSettings"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-[#C5A059]/40 bg-[#C5A059]/10 hover:bg-[#C5A059]/20 text-[#C5A059] dark:text-[#E6C98A] text-xs font-bold transition btn-press cursor-pointer"
                title="Change logo, store name, phone, address and invoice footer note"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Edit Info & Logo</span>
              </button>
            </div>

            <!-- ============================================== -->
            <!-- ============================================== -->
            <!-- PREVIEW OPTION 1: A5 ROYAL INVOICE TEMPLATE (148x210mm) -->
            <!-- Matches boutique standard with Khmer calligraphy & ABA PAY -->
            <!-- ============================================== -->
            <div 
              v-if="activePrintFormat === 'a5'"
              class="flex-grow bg-white text-stone-900 border border-stone-300 rounded-2xl p-4 font-sans text-xs shadow-inner flex flex-col justify-between overflow-y-auto max-h-[520px]"
            >
              <!-- 1. Top Header: Diamond Logo + Boutique Calligraphy + Invoice Title -->
              <div class="flex items-center justify-between pb-2 mb-2 border-b-2 border-stone-800">
                <!-- Left: Diamond Silk Emblem / Uploaded Logo -->
                <div class="flex items-center gap-3">
                  <div v-if="storeSettings.logo" class="w-13 h-13 rounded-lg overflow-hidden border border-stone-300 flex-shrink-0 bg-white flex items-center justify-center p-0.5 shadow-2xs">
                    <img :src="storeSettings.logo" :alt="storeSettings.nameEn" class="max-w-full max-h-full object-contain" />
                  </div>
                  <div v-else class="w-12 h-12 flex-shrink-0 bg-gradient-to-tr from-[#7A1A24] to-[#C5A059] rounded-xl flex flex-col items-center justify-center text-white p-1 shadow-2xs border border-[#C5A059]/40">
                    <span class="font-moul text-[11px] leading-none">ពិដាន</span>
                    <span class="text-[7.5px] font-bold text-amber-200 leading-none mt-0.5">សូត្រខ្មែរ</span>
                  </div>
                  <div>
                    <h2 class="font-moul text-base text-[#7A1A24] tracking-wide leading-tight">
                      {{ storeSettings.nameKh || 'ពិដានសូត្រខ្មែរ' }}
                    </h2>
                    <p class="text-[10px] font-bold text-stone-600 uppercase tracking-widest leading-none mt-0.5">
                      {{ storeSettings.nameEn || 'PIDAN KHMER SILK' }}
                    </p>
                  </div>
                </div>

                <!-- Center/Right: Bilingual Document Heading -->
                <div class="text-right">
                  <h1 class="font-koulen text-xl text-stone-900 tracking-wider leading-none">
                    វិក្កយបត្រ / INVOICE
                  </h1>
                  <span class="text-[9px] font-mono text-stone-400 uppercase tracking-widest block mt-0.5">
                    Official Boutique Receipt
                  </span>
                </div>
              </div>

              <!-- 2. Customer & Invoice Metadata Grid (2 Columns, matching photo) -->
              <div class="grid grid-cols-2 gap-3 text-xs text-stone-800 mb-2.5 pb-2 border-b border-stone-200">
                <!-- Left Column: Customer Details -->
                <div class="space-y-1 text-[11px] leading-tight">
                  <div class="flex">
                    <span class="w-28 font-bold text-stone-600">អតិថិជន / Customer</span>
                    <span class="font-bold text-stone-900">: {{ checkoutForm.customer_name || 'General Customer' }}</span>
                  </div>
                  <div class="flex">
                    <span class="w-28 font-bold text-stone-600">ទូរស័ព្ទលេខ / Tel</span>
                    <span class="font-mono text-stone-800">: {{ checkoutForm.customer_phone || '-' }}</span>
                  </div>
                  <div class="flex">
                    <span class="w-28 font-bold text-stone-600">អាសយដ្ឋាន / Address</span>
                    <span class="text-stone-700 truncate max-w-[190px]">: {{ storeSettings.address || '#18 Samdach Sothearos Blvd, Phnom Penh' }}</span>
                  </div>
                </div>

                <!-- Right Column: Invoice Reference & Cashier Details -->
                <div class="space-y-1 text-[11px] leading-tight text-right md:text-left">
                  <div class="flex justify-between md:justify-start">
                    <span class="w-32 font-bold text-stone-600">វិក្កយបត្រ / Invoice NO</span>
                    <span class="font-mono font-bold text-[#7A1A24]">: {{ completedInvoice.invoiceNo || 'POS26/0030' }}</span>
                  </div>
                  <div class="flex justify-between md:justify-start">
                    <span class="w-32 font-bold text-stone-600">កាលបរិច្ឆេទ / Date</span>
                    <span class="font-mono text-stone-800">: {{ completedInvoice.date || new Date().toLocaleDateString('en-GB') }}</span>
                  </div>
                  <div class="flex justify-between md:justify-start">
                    <span class="w-32 font-bold text-stone-600">អត្រាប្តូរប្រាក់ / Rate</span>
                    <span class="font-mono text-stone-800">: {{ formatKHR(exchangeRate) }} ៛</span>
                  </div>
                  <div class="flex justify-between md:justify-start">
                    <span class="w-32 font-bold text-stone-600">អ្នកគិតលុយ / Cashier</span>
                    <span class="font-bold text-stone-900">: {{ storeSettings.cashierName || 'SEANG Kimpheng' }}</span>
                  </div>
                </div>
              </div>

              <!-- 3. Amber Silk Items Table with 10-Row Standard Grid -->
              <div class="flex-grow overflow-y-auto mb-2.5">
                <table class="w-full text-left border-collapse border border-stone-800 text-xs">
                  <thead>
                    <tr class="bg-[#E5A93C] text-stone-950 font-bold border-b border-stone-800 text-[10.5px]">
                      <th class="py-1 px-1.5 w-9 text-center border-r border-stone-800 leading-tight">ល.រ<br><span class="text-[8.5px] font-mono">N°</span></th>
                      <th class="py-1 px-2 border-r border-stone-800 leading-tight">បរិយាយ<br><span class="text-[8.5px]">Description</span></th>
                      <th class="py-1 px-1.5 w-18 text-center border-r border-stone-800 leading-tight">ចំនួន<br><span class="text-[8.5px]">Qty</span></th>
                      <th class="py-1 px-1.5 w-18 text-right border-r border-stone-800 leading-tight">តំលៃ<br><span class="text-[8.5px]">Price</span></th>
                      <th class="py-1 px-1.5 w-24 text-center border-r border-stone-800 leading-tight">បញ្ចុះតំលៃ<br><span class="text-[8.5px]">Discount</span></th>
                      <th class="py-1 px-2 w-20 text-right leading-tight">សរុប<br><span class="text-[8.5px]">Sub Total</span></th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-stone-300">
                    <!-- Real Active Items -->
                    <tr v-for="(item, idx) in cart" :key="'a5-item-'+idx" class="text-[11px] leading-tight">
                      <td class="py-1 px-1.5 text-center font-mono font-bold text-stone-700 border-r border-stone-300">{{ idx + 1 }}</td>
                      <td class="py-1 px-2 border-r border-stone-300 font-bold text-stone-900">
                        {{ item.code ? item.code + '-' : '' }}{{ item.name }}
                      </td>
                      <td class="py-1 px-1.5 text-center font-mono border-r border-stone-300 whitespace-nowrap">
                        {{ (item.quantity || 1).toFixed(2) }} {{ item.unit === 'kben' ? 'ក្បិន' : (item.unit === 'm' ? 'ម៉ែត្រ' : item.unit) }}
                      </td>
                      <td class="py-1 px-1.5 text-right font-mono border-r border-stone-300 whitespace-nowrap">
                        ${{ item.price.toFixed(2) }}
                      </td>
                      <td class="py-1 px-1.5 text-center font-mono text-[10px] border-r border-stone-300 whitespace-nowrap">
                        {{ item.discount ? '(' + item.discount + (item.discountType === 'fixed' ? '$' : '%') + ') $' + getItemDiscountAmount(item).toFixed(2) : '-' }}
                      </td>
                      <td class="py-1 px-2 text-right font-mono font-bold text-stone-900 whitespace-nowrap">
                        ${{ (item.price * item.quantity - getItemDiscountAmount(item)).toFixed(2) }}
                      </td>
                    </tr>
                    <!-- Padded Blank Lined Rows up to 10 Rows (matching the photo) -->
                    <tr v-for="padIdx in Math.max(0, 10 - cart.length)" :key="'pad-'+padIdx" class="text-[11px] h-5">
                      <td class="py-1 px-1.5 text-center font-mono text-stone-400 border-r border-stone-200">
                        {{ cart.length + padIdx }}
                      </td>
                      <td class="py-1 px-2 border-r border-stone-200">&nbsp;</td>
                      <td class="py-1 px-1.5 border-r border-stone-200">&nbsp;</td>
                      <td class="py-1 px-1.5 border-r border-stone-200">&nbsp;</td>
                      <td class="py-1 px-1.5 border-r border-stone-200">&nbsp;</td>
                      <td class="py-1 px-2">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 4. Footer Section: Split Dual ABA PAY Cards (Left) & Bordered Totals Grid (Right) -->
              <div class="grid grid-cols-12 gap-3 pt-1 border-t-2 border-stone-800">
                
                <!-- Left: Thank You & Dual ABA PAY QR Cards (Matching Photo) -->
                <div class="col-span-7 flex flex-col justify-between">
                  <div class="text-[11px] font-bold text-stone-800 italic mb-1.5">
                    {{ storeSettings.footerNote || 'Thank you!!!' }}
                  </div>

                  <!-- Dual ABA PAY Cards Side-by-Side -->
                  <div class="grid grid-cols-2 gap-2">
                    <!-- ABA Card 1 -->
                    <div class="border border-stone-300 rounded-xl p-1.5 text-center bg-stone-50/70 shadow-2xs">
                      <div class="text-[8px] font-bold text-stone-700 leading-tight">ស្កេនដើម្បីទូទាត់ប្រាក់</div>
                      <div class="text-[7px] text-stone-400 font-bold tracking-tight uppercase">SCAN FOR PAYMENT</div>
                      <!-- Official ABA PAY Badge -->
                      <div class="inline-flex items-center justify-center gap-1 bg-[#005C8A] text-white px-2 py-0.5 rounded text-[8.5px] font-black my-1 tracking-wider shadow-2xs">
                        <span>ABA</span>
                        <span class="text-rose-400 font-serif">'</span>
                        <span class="text-[7.5px] tracking-normal font-sans">PAY</span>
                      </div>
                      <!-- Scannable Dynamic QR -->
                      <div class="w-14 h-14 mx-auto my-0.5 flex items-center justify-center p-0.5 bg-white border border-stone-200 rounded-lg">
                        <ReceiptCode 
                          :value="'https://link.payway.com.kh/aba?id=' + (storeSettings.abaAccount1 || '168388886')" 
                          mode="qr" 
                          :show-text="false"
                          :qr-size="48"
                        />
                      </div>
                      <div class="font-mono font-bold text-[9px] text-stone-900 tracking-tight">{{ storeSettings.abaAccount1 || '168 388 886' }}</div>
                      <div class="text-[7.5px] font-bold text-stone-500 uppercase truncate">{{ storeSettings.abaName1 || 'PIDAN KHMER SILK' }}</div>
                    </div>

                    <!-- ABA Card 2 -->
                    <div class="border border-stone-300 rounded-xl p-1.5 text-center bg-stone-50/70 shadow-2xs">
                      <div class="text-[8px] font-bold text-stone-700 leading-tight">ស្កេនដើម្បីទូទាត់ប្រាក់</div>
                      <div class="text-[7px] text-stone-400 font-bold tracking-tight uppercase">SCAN FOR PAYMENT</div>
                      <!-- Official ABA PAY Badge -->
                      <div class="inline-flex items-center justify-center gap-1 bg-[#005C8A] text-white px-2 py-0.5 rounded text-[8.5px] font-black my-1 tracking-wider shadow-2xs">
                        <span>ABA</span>
                        <span class="text-rose-400 font-serif">'</span>
                        <span class="text-[7.5px] tracking-normal font-sans">PAY</span>
                      </div>
                      <!-- Scannable Dynamic QR -->
                      <div class="w-14 h-14 mx-auto my-0.5 flex items-center justify-center p-0.5 bg-white border border-stone-200 rounded-lg">
                        <ReceiptCode 
                          :value="'https://link.payway.com.kh/aba?id=' + (storeSettings.abaAccount2 || '000594815')" 
                          mode="qr" 
                          :show-text="false"
                          :qr-size="48"
                        />
                      </div>
                      <div class="font-mono font-bold text-[9px] text-stone-900 tracking-tight">{{ storeSettings.abaAccount2 || '000 594 815' }}</div>
                      <div class="text-[7.5px] font-bold text-stone-500 uppercase truncate">{{ storeSettings.abaName2 || 'PIDAN KHMER SILK' }}</div>
                    </div>
                  </div>
                </div>

                <!-- Right: Bordered Financial Summary Grid (Identical to Photo) -->
                <div class="col-span-5">
                  <div class="border-2 border-stone-900 text-[11px] text-stone-900 divide-y divide-stone-900 bg-white">
                    <div class="flex justify-between items-center py-1 px-2 font-bold">
                      <span>សរុបទឹកប្រាក់ / Total</span>
                      <span class="font-mono text-sm">${{ cartTotal.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between items-center py-1 px-2 font-bold bg-stone-50">
                      <span>ចំនួនទឹកប្រាក់ជារៀល / Riel</span>
                      <span class="font-mono text-xs">៛{{ formatKHR(cartTotalKHR) }}</span>
                    </div>
                    <div class="flex justify-between items-center py-0.5 px-2 text-stone-700">
                      <span>ប្រាក់បានបង់ / Paid Amount</span>
                      <span class="font-mono">${{ (paymentMethod === 'scan' ? cartTotal.toFixed(2) : (totalCashReceivedUSD > 0 ? totalCashReceivedUSD.toFixed(2) : '0.00')) }}</span>
                    </div>
                    <div class="flex justify-between items-center py-0.5 px-2 text-stone-700 bg-stone-50">
                      <span>ប្រាក់នៅសល់ / Balance</span>
                      <span class="font-mono">${{ (paymentMethod === 'scan' ? '0.00' : (paymentMethod === 'cash' && changeDueUSD > 0 ? '0.00' : cartTotal.toFixed(2))) }}</span>
                    </div>
                    <div class="flex justify-between items-center py-1 px-2 font-bold">
                      <span>ប្រាក់នៅសល់សរុប / Total Balance</span>
                      <span class="font-mono text-sm text-[#7A1A24]">${{ (paymentMethod === 'scan' ? '0.00' : (paymentMethod === 'cash' && !isCashUnderpaid ? '0.00' : cartTotal.toFixed(2))) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 5. Signatures Strip (Seller & Buyer) -->
              <div class="grid grid-cols-2 gap-8 pt-4 pb-1 text-center text-[10px] text-stone-800">
                <div>
                  <div class="font-bold mb-4">អ្នកលក់ / Seller Signature</div>
                  <div class="border-b-2 border-dotted border-stone-400 w-36 mx-auto"></div>
                </div>
                <div>
                  <div class="font-bold mb-4">អ្នកទិញ / Buyer Signature</div>
                  <div class="border-b-2 border-dotted border-stone-400 w-36 mx-auto"></div>
                </div>
              </div>

            </div>

            <!-- ============================================== -->
            <!-- PREVIEW OPTION 2: 80mm THERMAL SLIP TEMPLATE -->
            <!-- ============================================== -->
            <div 
              v-else
              class="flex-grow bg-stone-50 dark:bg-[#151216] border-2 border-dashed border-stone-200 dark:border-stone-700 rounded-2xl p-4 font-mono text-xs text-stone-800 dark:text-stone-200 shadow-inner flex flex-col justify-between overflow-y-auto max-h-[500px]"
            >
              <!-- Thermal Header -->
              <div class="text-center pb-3 border-b border-dashed border-stone-300 dark:border-stone-700">
                <div v-if="storeSettings.logo" class="w-12 h-12 mx-auto mb-1.5 rounded-lg overflow-hidden flex items-center justify-center">
                  <img :src="storeSettings.logo" :alt="storeSettings.nameEn" class="max-w-full max-h-full object-contain" />
                </div>
                <h4 class="font-serif font-black text-base text-[#7A1A24] dark:text-[#E6C98A] uppercase tracking-wider">
                  {{ storeSettings.nameEn || 'PIDAN KHMER SILK' }}
                </h4>
                <p class="text-[10px] text-stone-500">{{ storeSettings.nameKh || 'ពិតានសូត្រខ្មែរ' }}</p>
                <p class="text-[10px] text-stone-400 mt-0.5">{{ storeSettings.address || '#18 Samdach Sothearos Blvd, Phnom Penh' }}</p>
                <p class="text-[10px] text-stone-400">Tel: {{ storeSettings.phone || '+855 23 999 888' }}</p>
                
                <div class="flex justify-between items-center text-[10px] text-stone-500 mt-2 pt-1 border-t border-dashed border-stone-300 dark:border-stone-700">
                  <span>Inv: <strong>{{ completedInvoice.invoiceNo || 'PK-00001' }}</strong></span>
                  <span>{{ completedInvoice.date }}</span>
                </div>
                <div class="text-left text-[10px] text-stone-500 mt-0.5">
                  Client: <strong>{{ checkoutForm.customer_name || 'Walk-in Client' }}</strong>
                </div>
              </div>

              <!-- Thermal Items -->
              <div class="py-2.5 space-y-2 flex-grow overflow-y-auto my-1">
                <div 
                  v-for="(item, idx) in cart" 
                  :key="'slip-'+idx"
                  class="flex justify-between items-start text-[11px] leading-tight"
                >
                  <div class="truncate max-w-[170px]">
                    <div class="font-bold text-stone-900 dark:text-stone-100 truncate">{{ item.name }}</div>
                    <div class="text-[10px] text-stone-400 font-mono">
                      {{ item.quantity }} {{ item.unit }} × ${{ item.price.toFixed(2) }}
                    </div>
                  </div>
                  <span class="font-bold text-right font-mono ml-2">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </span>
                </div>
              </div>

              <!-- Thermal Totals -->
              <div class="pt-2.5 border-t border-dashed border-stone-300 dark:border-stone-700 space-y-1">
                <div class="flex justify-between text-xs">
                  <span>Subtotal:</span>
                  <span class="font-mono">${{ cartSubtotal.toFixed(2) }}</span>
                </div>

                <div v-if="cartItemDiscounts > 0 || globalDiscountAmount > 0" class="flex justify-between text-[11px] text-rose-500">
                  <span>Total Discount:</span>
                  <span class="font-mono">-${{ (cartItemDiscounts + globalDiscountAmount).toFixed(2) }}</span>
                </div>

                <div class="flex justify-between font-bold text-sm pt-1 border-t border-stone-200 dark:border-stone-700">
                  <span>TOTAL DUE:</span>
                  <span class="text-[#7A1A24] dark:text-[#E6C98A]">${{ cartTotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-[11px] text-stone-500">
                  <span>TOTAL KHR:</span>
                  <span>៛{{ formatKHR(cartTotalKHR) }}</span>
                </div>
                <div class="flex justify-between text-[10px] text-stone-400 pt-1">
                  <span>Payment:</span>
                  <span>{{ paymentMethod === 'cash' ? 'Cash Tendered' : 'ABA / KHQR (Scan)' }}</span>
                </div>
              </div>

              <!-- Barcode / QR Section -->
              <div class="pt-3 border-t border-dashed border-stone-300 dark:border-stone-700 text-center">
                <ReceiptCode 
                  :value="completedInvoice.invoiceNo || 'PK-00001'" 
                  :mode="receiptCodeFormat" 
                  :barcode-height="28"
                  :qr-size="60"
                  caption="Scan for verification"
                />
                <p class="text-[9px] text-stone-400 mt-2">{{ storeSettings.footerNote }}</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL 2: PRECISION CUTTER DIAL (CUSTOM METERS DIAL) -->
    <!-- ======================================================== -->
    <div 
      v-if="showPrecisionCutter && precisionItem" 
      role="dialog"
      aria-modal="true"
      aria-labelledby="precisionModalHeading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      @click.self="showPrecisionCutter = false"
    >
      <div class="bg-white dark:bg-atelier-card rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-atelier-border dark:border-atelier-borderDark text-stone-900 dark:text-stone-100 flex flex-col">
        
        <!-- Header -->
        <div class="p-4 bg-atelier-paper/60 dark:bg-atelier-dark/60 border-b border-atelier-border dark:border-atelier-borderDark flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl overflow-hidden border border-atelier-border dark:border-atelier-borderDark bg-stone-100 dark:bg-atelier-dark flex items-center justify-center">
              <img v-if="precisionItem.image" :src="precisionItem.image" :alt="precisionItem.name" class="w-full h-full object-cover" />
              <div v-else class="w-5 h-5 rounded-full" :style="{ backgroundColor: precisionItem.colorCode || '#C5A059' }"></div>
            </div>
            <div>
              <div class="text-[10px] font-mono font-bold text-atelier-gold uppercase">{{ precisionItem.code }}</div>
              <h3 id="precisionModalHeading" class="font-serif font-bold text-sm leading-tight">{{ precisionItem.name }}</h3>
              <p class="text-[10px] text-stone-400 font-mono">${{ precisionItem.price.toFixed(2) }} / {{ precisionItem.unit }} • {{ precisionItem.stock }} {{ precisionItem.unit }} in stock</p>
            </div>
          </div>
          <button 
            type="button"
            @click="showPrecisionCutter = false" 
            class="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
            aria-label="Close cut dial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Cutter Dial & Presets -->
        <div class="p-5 space-y-4">
          <!-- Display of Selected Cut Length -->
          <div class="p-4 rounded-2xl bg-stone-50 dark:bg-atelier-dark border border-atelier-border dark:border-atelier-borderDark text-center">
            <span class="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-1">
              Length to Cut from Bolt
            </span>
            <div class="flex items-baseline justify-center gap-2">
              <span class="font-serif font-black text-4xl text-atelier-red dark:text-atelier-gold">
                {{ precisionCutLength }}
              </span>
              <span class="font-bold text-lg text-stone-500">{{ precisionItem.unit }}</span>
            </div>
            <div class="text-xs font-mono text-stone-500 mt-1">
              Subtotal: <span class="font-bold text-stone-900 dark:text-stone-100">${{ (precisionCutLength * precisionItem.price).toFixed(2) }}</span> (៛{{ formatKHR(Math.round(precisionCutLength * precisionItem.price * exchangeRate)) }})
            </div>
          </div>

          <!-- Quick Cut Presets -->
          <div>
            <label class="block text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2">Standard Cutting Presets</label>
            <div class="grid grid-cols-4 gap-2">
              <button 
                type="button"
                v-for="preset in [0.5, 1, 1.25, 1.5, 2, 2.5, 3, 5]" 
                :key="preset"
                @click="precisionCutLength = preset"
                :class="precisionCutLength === preset 
                  ? 'bg-atelier-gold text-stone-950 font-bold border-atelier-gold shadow-xs' 
                  : 'bg-stone-50 dark:bg-atelier-dark text-stone-700 dark:text-stone-300 border-atelier-border dark:border-atelier-borderDark hover:border-atelier-gold'"
                class="py-2 rounded-xl border text-xs transition cursor-pointer font-mono"
              >
                {{ preset }}m
              </button>
            </div>
          </div>

          <!-- Fine Tuning Stepper -->
          <div class="flex items-center justify-between pt-2">
            <span class="text-xs font-bold text-stone-500">Fine Tune:</span>
            <div class="flex items-center gap-1.5 font-mono">
              <button type="button" @click="precisionCutLength = Math.max(0.1, Math.round((precisionCutLength - 0.25) * 100) / 100)" class="px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-bold hover:bg-stone-200 cursor-pointer">-0.25</button>
              <button type="button" @click="precisionCutLength = Math.max(0.1, Math.round((precisionCutLength - 0.1) * 100) / 100)" class="px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-bold hover:bg-stone-200 cursor-pointer">-0.1</button>
              <button type="button" @click="precisionCutLength = Math.round((precisionCutLength + 0.1) * 100) / 100" class="px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-bold hover:bg-stone-200 cursor-pointer">+0.1</button>
              <button type="button" @click="precisionCutLength = Math.round((precisionCutLength + 0.25) * 100) / 100" class="px-2 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-bold hover:bg-stone-200 cursor-pointer">+0.25</button>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-4 bg-atelier-paper/60 dark:bg-atelier-dark/60 border-t border-atelier-border dark:border-atelier-borderDark flex items-center gap-2">
          <button @click="showPrecisionCutter = false" class="py-2.5 px-4 rounded-xl border border-atelier-border dark:border-atelier-borderDark bg-white dark:bg-atelier-card text-xs font-bold cursor-pointer">
            Cancel
          </button>
          <button 
            type="button"
            @click="confirmPrecisionCut"
            class="flex-1 py-2.5 px-4 rounded-xl bg-atelier-red hover:bg-atelier-redDark text-white font-bold text-xs transition cursor-pointer shadow-sm"
          >
            Add {{ precisionCutLength }} {{ precisionItem.unit }} to Order
          </button>
        </div>

      </div>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL 3: CLIENT DETAILS MODAL -->
    <!-- ======================================================== -->
    <div 
      v-if="showCustomerModal" 
      role="dialog"
      aria-modal="true"
      aria-labelledby="customerModalHeading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      @click.self="showCustomerModal = false"
    >
      <div class="bg-white dark:bg-atelier-card rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-atelier-border dark:border-atelier-borderDark p-5 space-y-4">
        <h3 id="customerModalHeading" class="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
          Client Information
        </h3>
        
        <div class="space-y-3 text-xs">
          <div>
            <label for="posCustomerName" class="block text-[11px] font-bold text-stone-500 mb-1">Client Full Name</label>
            <input 
              id="posCustomerName"
              type="text" 
              v-model="checkoutForm.customer_name" 
              placeholder="e.g. Lok Chumteav Srey Mom" 
              class="w-full p-2.5 rounded-xl border border-atelier-border dark:border-atelier-borderDark bg-white dark:bg-atelier-dark text-stone-900 dark:text-white focus:outline-none focus:border-atelier-gold"
            />
          </div>

          <div>
            <label for="posCustomerPhone" class="block text-[11px] font-bold text-stone-500 mb-1">Phone / Telegram Contact</label>
            <input 
              id="posCustomerPhone"
              type="text" 
              v-model="checkoutForm.customer_phone" 
              placeholder="e.g. 012 345 678 or @client" 
              class="w-full p-2.5 rounded-xl border border-atelier-border dark:border-atelier-borderDark bg-white dark:bg-atelier-dark text-stone-900 dark:text-white focus:outline-none focus:border-atelier-gold"
            />
          </div>
        </div>

        <button 
          type="button"
          @click="showCustomerModal = false" 
          class="w-full py-2.5 rounded-xl bg-atelier-gold text-stone-950 font-bold text-xs hover:bg-atelier-goldDark transition cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL 4: EXCHANGE RATE ADJUSTMENT MODAL -->
    <!-- ======================================================== -->
    <div 
      v-if="showRateModal" 
      role="dialog"
      aria-modal="true"
      aria-labelledby="rateModalHeading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      @click.self="showRateModal = false"
    >
      <div class="bg-white dark:bg-atelier-card rounded-3xl shadow-2xl w-full max-w-xs overflow-hidden border border-atelier-border dark:border-atelier-borderDark p-5 space-y-3">
        <h3 id="rateModalHeading" class="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
          Set Currency Exchange Rate
        </h3>
        <p class="text-[11px] text-stone-500">1 USD to Cambodian Riel (KHR):</p>
        <div class="relative">
          <span class="absolute left-3 top-2 text-xs font-mono font-bold text-stone-400">៛</span>
          <input 
            type="number" 
            v-model.number="tempRate" 
            aria-label="Exchange Rate KHR per 1 USD"
            class="w-full pl-7 pr-3 py-2 rounded-xl border border-atelier-border dark:border-atelier-borderDark font-mono font-bold text-sm focus:outline-none focus:border-atelier-gold"
          />
        </div>
        <div class="flex gap-2 pt-2">
          <button type="button" @click="showRateModal = false" class="flex-1 py-2 rounded-xl border text-xs font-bold cursor-pointer">Cancel</button>
          <button type="button" @click="exchangeRate = tempRate; showRateModal = false" class="flex-1 py-2 rounded-xl bg-atelier-red text-white text-xs font-bold cursor-pointer">Save Rate</button>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL 5: KEYBOARD SHORTCUTS GUIDE -->
    <!-- ======================================================== -->
    <div 
      v-if="showShortcutsModal" 
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcutsModalHeading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      @click.self="showShortcutsModal = false"
    >
      <div class="bg-white dark:bg-atelier-card rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-atelier-border dark:border-atelier-borderDark p-5 space-y-3">
        <div class="flex justify-between items-center border-b border-stone-200 dark:border-stone-800 pb-2">
          <h3 id="shortcutsModalHeading" class="font-serif font-bold text-sm">Keyboard Shortcuts</h3>
          <button type="button" @click="showShortcutsModal = false" class="text-stone-400 cursor-pointer" aria-label="Close shortcuts modal">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="space-y-2 text-xs">
          <div class="flex justify-between items-center py-1 border-b border-stone-100 dark:border-stone-800/50">
            <span class="text-stone-600 dark:text-stone-400">Focus Catalog Search</span>
            <kbd class="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono font-bold">/</kbd>
          </div>
          <div class="flex justify-between items-center py-1 border-b border-stone-100 dark:border-stone-800/50">
            <span class="text-stone-600 dark:text-stone-400">Proceed to Payment</span>
            <kbd class="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono font-bold">F2</kbd>
          </div>
          <div class="flex justify-between items-center py-1 border-b border-stone-100 dark:border-stone-800/50">
            <span class="text-stone-600 dark:text-stone-400">Confirm & Print Sale</span>
            <kbd class="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono font-bold">Enter</kbd>
          </div>
          <div class="flex justify-between items-center py-1 border-b border-stone-100 dark:border-stone-800/50">
            <span class="text-stone-600 dark:text-stone-400">Close Open Modal</span>
            <kbd class="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 font-mono font-bold">Esc</kbd>
          </div>
          <div class="flex justify-between items-center py-1">
            <span class="text-stone-600 dark:text-stone-400">Barcode Scanner</span>
            <span class="text-emerald-600 font-bold">Always Active</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL 6: THERMAL RECEIPT PREVIEW (PIDAN KHMER SILK) -->
    <!-- ======================================================== -->
    <div 
      v-if="showReceiptModal" 
      role="dialog"
      aria-modal="true"
      aria-labelledby="receiptModalHeading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div class="bg-white dark:bg-atelier-card rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-atelier-border dark:border-atelier-borderDark text-stone-900 dark:text-stone-100 animate-fade-in my-auto">
        
        <!-- Top Status Bar -->
        <div class="p-4 bg-emerald-50 dark:bg-emerald-950/40 border-b border-emerald-100 dark:border-emerald-900/50 flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 id="receiptModalHeading" class="text-xs font-bold text-emerald-900 dark:text-emerald-200">Sale Completed Successfully</h3>
              <p class="text-[10px] text-emerald-700 dark:text-emerald-400">Invoice archived and stock updated</p>
            </div>
          </div>
          <button 
            type="button"
            @click="startNewOrder" 
            class="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
            aria-label="Close receipt modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Receipt Content Simulation -->
        <div class="p-5 space-y-3 font-mono text-xs">
          <div class="text-center pb-3 border-b border-dashed border-stone-300 dark:border-stone-700">
            <h4 class="font-serif font-black text-lg text-atelier-red dark:text-atelier-gold tracking-widest uppercase">PIDAN KHMER SILK</h4>
            <p class="text-[10px] text-stone-500">ពិតានសូត្រខ្មែរ • Haute Khmer Textiles</p>
            <p class="text-[10px] text-stone-500">#18 Samdach Sothearos Blvd, Phnom Penh</p>
            <p class="text-[10px] text-stone-500">Tel: +855 23 999 888</p>
            <div class="text-[10px] text-stone-500 mt-1 font-bold">Invoice: {{ completedInvoice.invoiceNo }}</div>
            <div class="text-[10px] text-stone-400">{{ completedInvoice.date }}</div>
          </div>

          <!-- Items list -->
          <div class="space-y-1.5 py-1">
            <div v-for="(item, recIdx) in completedInvoice.items" :key="'rec-'+(item.cartItemId || item.id || recIdx)+'-'+recIdx" class="flex justify-between items-baseline">
              <div class="truncate max-w-[210px]">
                <div class="font-bold">{{ item.name }}</div>
                <div class="text-[10px] text-stone-400">SKU: {{ item.code }} • {{ item.quantity }}{{ item.unit }}</div>
              </div>
              <span class="font-bold">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>

          <!-- Total Summary -->
          <div class="pt-2 border-t border-dashed border-stone-300 dark:border-stone-700 space-y-1">
            <div class="flex justify-between font-bold text-sm">
              <span>TOTAL (USD):</span>
              <span class="text-atelier-red dark:text-atelier-gold">${{ (completedInvoice.total || 0).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-xs text-stone-500">
              <span>TOTAL (KHR):</span>
              <span>៛{{ formatKHR(completedInvoice.totalKHR) }}</span>
            </div>
            <div class="flex justify-between text-[11px] text-stone-500 pt-1">
              <span>Payment Mode:</span>
              <span>{{ completedInvoice.paymentMethod }}</span>
            </div>
          </div>

          <!-- Barcode Verification -->
          <div class="pt-3 border-t border-dashed border-stone-300 dark:border-stone-700 text-center">
            <ReceiptCode 
              :value="completedInvoice.invoiceNo || 'PK-INV-001'" 
              :mode="receiptCodeFormat" 
              :barcode-height="35"
              :qr-size="70"
              caption="Scan for return or order status inquiry"
            />
          </div>
        </div>

        <!-- Receipt Action Buttons -->
        <div class="p-4 bg-atelier-paper/60 dark:bg-atelier-dark/60 border-t border-atelier-border dark:border-atelier-borderDark flex items-center gap-2">
          <button 
            type="button"
            @click="triggerPrint"
            class="flex-1 py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print Receipt</span>
          </button>
          <button 
            type="button"
            @click="startNewOrder"
            class="flex-1 py-2.5 px-4 bg-atelier-red hover:bg-atelier-redDark text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer"
          >
            Start New Order
          </button>
        </div>

      </div>
    </div>

    <!-- ======================================================== -->
    <!-- MODAL 7: STORE INFO & LOGO SETTINGS (A5 / THERMAL SETUP) -->
    <!-- ======================================================== -->
    <div 
      v-if="showStoreSettingsModal" 
      role="dialog"
      aria-modal="true"
      aria-labelledby="storeSettingsHeading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto animate-fade-in"
      @click.self="showStoreSettingsModal = false"
    >
      <div class="bg-white dark:bg-atelier-card rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden border border-atelier-border dark:border-atelier-borderDark p-6 space-y-5 my-auto text-stone-900 dark:text-stone-100">
        
        <!-- Header -->
        <div class="flex justify-between items-center border-b border-stone-200 dark:border-stone-800 pb-3">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-atelier-gold/20 text-atelier-gold flex items-center justify-center font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 id="storeSettingsHeading" class="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                Receipt Template & Store Identity
              </h3>
              <p class="text-xs text-stone-500">Configure logo, boutique info and A5 invoice print layout</p>
            </div>
          </div>
          <button 
            type="button" 
            @click="showStoreSettingsModal = false" 
            class="p-1.5 text-stone-400 hover:text-stone-600 rounded-lg cursor-pointer"
            aria-label="Close store settings modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Form Body -->
        <div class="space-y-4 max-h-[65vh] overflow-y-auto pr-1 text-xs">
          
          <!-- Logo Management -->
          <div class="p-3.5 rounded-2xl bg-stone-50 dark:bg-atelier-dark/60 border border-stone-200 dark:border-stone-800 space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-bold text-xs text-stone-800 dark:text-stone-200">Store Logo / ស្លាកសញ្ញាហាង</span>
              <span class="text-[10px] text-stone-400">Printed at top of A5 invoices</span>
            </div>

            <div class="flex items-center gap-4">
              <!-- Logo Preview Frame -->
              <div class="w-16 h-16 rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-inner">
                <img v-if="editSettingsForm.logo" :src="editSettingsForm.logo" alt="Store Logo Preview" class="max-w-full max-h-full object-contain p-1" />
                <div v-else class="text-center p-1">
                  <span class="font-serif font-black text-xs text-[#7A1A24] dark:text-[#E6C98A]">PK</span>
                  <span class="block text-[8px] text-stone-400 uppercase mt-0.5">No Logo</span>
                </div>
              </div>

              <!-- Upload & Remove Buttons -->
              <div class="flex flex-col gap-1.5 flex-grow">
                <input 
                  type="file" 
                  ref="logoFileInput" 
                  accept="image/png,image/jpeg,image/webp,image/svg+xml" 
                  @change="handleLogoUpload" 
                  class="hidden" 
                />
                <div class="flex items-center gap-2">
                  <button 
                    type="button" 
                    @click="triggerLogoInput" 
                    class="px-3 py-1.5 rounded-xl bg-atelier-gold text-stone-950 font-bold text-xs hover:bg-atelier-goldDark transition shadow-2xs flex items-center gap-1.5 cursor-pointer btn-press"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{{ editSettingsForm.logo ? 'Change Logo Image' : 'Upload Store Logo' }}</span>
                  </button>
                  <button 
                    v-if="editSettingsForm.logo"
                    type="button" 
                    @click="removeLogo" 
                    class="px-2.5 py-1.5 rounded-xl border border-rose-300 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-bold transition cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
                <p class="text-[10px] text-stone-400 leading-tight">
                  Supports PNG, JPG, or SVG under 2MB. Logo is stored directly in browser memory.
                </p>
              </div>
            </div>
          </div>

          <!-- Store Names -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label for="settingNameEn" class="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                Store Name (English)
              </label>
              <input 
                id="settingNameEn"
                type="text" 
                v-model="editSettingsForm.nameEn" 
                placeholder="e.g. PIDAN KHMER SILK" 
                class="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 font-bold focus:outline-none focus:border-atelier-gold text-xs"
              />
            </div>
            <div>
              <label for="settingNameKh" class="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                Store Name (Khmer / ខ្មែរ)
              </label>
              <input 
                id="settingNameKh"
                type="text" 
                v-model="editSettingsForm.nameKh" 
                placeholder="e.g. ពិតានសូត្រខ្មែរ" 
                class="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 font-bold focus:outline-none focus:border-atelier-gold text-xs"
              />
            </div>
          </div>

          <!-- Tagline -->
          <div>
            <label for="settingTagline" class="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
              Store Tagline / Slogan
            </label>
            <input 
              id="settingTagline"
              type="text" 
              v-model="editSettingsForm.tagline" 
              placeholder="e.g. Haute Cambodian Textiles & Fine Tailoring" 
              class="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 focus:outline-none focus:border-atelier-gold text-xs"
            />
          </div>

          <!-- Store Address -->
          <div>
            <label for="settingAddress" class="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
              Store Physical Address
            </label>
            <input 
              id="settingAddress"
              type="text" 
              v-model="editSettingsForm.address" 
              placeholder="e.g. #18 Samdach Sothearos Blvd, Phnom Penh, Cambodia" 
              class="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 focus:outline-none focus:border-atelier-gold text-xs"
            />
          </div>

          <!-- Contacts & VAT -->
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label for="settingPhone" class="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                Phone Number
              </label>
              <input 
                id="settingPhone"
                type="text" 
                v-model="editSettingsForm.phone" 
                placeholder="+855 23 999 888" 
                class="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 font-mono focus:outline-none focus:border-atelier-gold text-xs"
              />
            </div>
            <div>
              <label for="settingTelegram" class="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                Telegram Handle
              </label>
              <input 
                id="settingTelegram"
                type="text" 
                v-model="editSettingsForm.telegram" 
                placeholder="@pidansilk" 
                class="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 font-mono focus:outline-none focus:border-atelier-gold text-xs"
              />
            </div>
            <div>
              <label for="settingTaxId" class="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                VAT / Tax ID (TIN)
              </label>
              <input 
                id="settingTaxId"
                type="text" 
                v-model="editSettingsForm.taxId" 
                placeholder="K005-902100456" 
                class="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 font-mono focus:outline-none focus:border-atelier-gold text-xs"
              />
            </div>
          </div>

          <!-- Cashier & Invoice Staff -->
          <div>
            <label for="settingCashier" class="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
              Cashier Name on Invoices / អ្នកគិតលុយ
            </label>
            <input 
              id="settingCashier"
              type="text" 
              v-model="editSettingsForm.cashierName" 
              placeholder="e.g. SEANG Kimpheng" 
              class="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 font-bold focus:outline-none focus:border-atelier-gold text-xs"
            />
          </div>

          <!-- ABA PAY Accounts for Invoice QR Codes -->
          <div class="p-3.5 rounded-2xl bg-stone-50 dark:bg-atelier-dark/60 border border-stone-200 dark:border-stone-800 space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-bold text-xs text-stone-800 dark:text-stone-200">ABA PAY Accounts (Printed on Invoices)</span>
              <span class="text-[10px] text-stone-400">Dual QR scan boxes</span>
            </div>

            <!-- Account 1 -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="settingAba1" class="block text-[10px] font-bold text-stone-500 mb-0.5">ABA Account 1 (Number)</label>
                <input 
                  id="settingAba1"
                  type="text" 
                  v-model="editSettingsForm.abaAccount1" 
                  placeholder="168 388 886" 
                  class="w-full p-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 font-mono text-xs focus:outline-none focus:border-atelier-gold"
                />
              </div>
              <div>
                <label for="settingAbaName1" class="block text-[10px] font-bold text-stone-500 mb-0.5">Account 1 Name</label>
                <input 
                  id="settingAbaName1"
                  type="text" 
                  v-model="editSettingsForm.abaName1" 
                  placeholder="PIDAN KHMER SILK" 
                  class="w-full p-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs focus:outline-none focus:border-atelier-gold"
                />
              </div>
            </div>

            <!-- Account 2 -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="settingAba2" class="block text-[10px] font-bold text-stone-500 mb-0.5">ABA Account 2 (Number)</label>
                <input 
                  id="settingAba2"
                  type="text" 
                  v-model="editSettingsForm.abaAccount2" 
                  placeholder="000 594 815" 
                  class="w-full p-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 font-mono text-xs focus:outline-none focus:border-atelier-gold"
                />
              </div>
              <div>
                <label for="settingAbaName2" class="block text-[10px] font-bold text-stone-500 mb-0.5">Account 2 Name</label>
                <input 
                  id="settingAbaName2"
                  type="text" 
                  v-model="editSettingsForm.abaName2" 
                  placeholder="PIDAN KHMER SILK" 
                  class="w-full p-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-xs focus:outline-none focus:border-atelier-gold"
                />
              </div>
            </div>
          </div>

          <!-- Default Paper Size Selection -->
          <div>
            <label class="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
              Default Print Paper Size / ទំហំក្រដាសបោះពុម្ព
            </label>
            <div class="grid grid-cols-2 gap-3">
              <label 
                :class="editSettingsForm.printFormat === 'a5' 
                  ? 'border-atelier-gold bg-atelier-gold/10 text-stone-900 dark:text-white' 
                  : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400'"
                class="flex items-center gap-2.5 p-3 rounded-2xl border-2 cursor-pointer transition"
              >
                <input 
                  type="radio" 
                  name="printFormatSetting" 
                  value="a5" 
                  v-model="editSettingsForm.printFormat" 
                  class="accent-atelier-red" 
                />
                <div>
                  <div class="font-bold text-xs flex items-center gap-1.5">
                    <span>A5 Boutique Invoice</span>
                    <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-atelier-gold text-stone-950 font-mono font-bold">Standard</span>
                  </div>
                  <div class="text-[10px] text-stone-400">148 × 210mm portrait format</div>
                </div>
              </label>

              <label 
                :class="editSettingsForm.printFormat === '80mm' 
                  ? 'border-atelier-gold bg-atelier-gold/10 text-stone-900 dark:text-white' 
                  : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400'"
                class="flex items-center gap-2.5 p-3 rounded-2xl border-2 cursor-pointer transition"
              >
                <input 
                  type="radio" 
                  name="printFormatSetting" 
                  value="80mm" 
                  v-model="editSettingsForm.printFormat" 
                  class="accent-atelier-red" 
                />
                <div>
                  <div class="font-bold text-xs">80mm Thermal Slip</div>
                  <div class="text-[10px] text-stone-400">Roll receipt for thermal printers</div>
                </div>
              </label>
            </div>
          </div>

          <!-- Footer Policy & Notes -->
          <div>
            <label for="settingFooterNote" class="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
              Invoice Footer Terms / Return Policy / សូមអរគុណ
            </label>
            <textarea 
              id="settingFooterNote"
              v-model="editSettingsForm.footerNote" 
              rows="3" 
              placeholder="Notice printed at bottom of every invoice..." 
              class="w-full p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 focus:outline-none focus:border-atelier-gold text-xs leading-relaxed"
            ></textarea>
          </div>

        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 pt-3 border-t border-stone-200 dark:border-stone-800">
          <button 
            type="button" 
            @click="showStoreSettingsModal = false" 
            class="flex-1 py-2.5 px-4 rounded-xl border border-stone-200 dark:border-stone-800 font-bold text-xs text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="button" 
            @click="saveStoreSettings" 
            class="flex-1 py-2.5 px-4 rounded-xl bg-atelier-red hover:bg-atelier-redDark text-white font-bold text-xs transition shadow-sm cursor-pointer btn-press flex items-center justify-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Save Store Settings</span>
          </button>
        </div>

      </div>
    </div>

    <!-- ======================================================== -->
    <!-- HIDDEN UNIVERSAL PRINT ENGINE (A5 & 80mm) -->
    <!-- ======================================================== -->
    <div id="printInvoiceContainer" class="hidden print:block text-black bg-white">
      
      <!-- ============================================== -->
      <!-- FORMAT A: A5 BOUTIQUE INVOICE (148 x 210mm) -->
      <!-- ============================================== -->
      <div v-if="activePrintFormat === 'a5'" class="a5-print-sheet mx-auto p-4 font-sans text-xs bg-white text-stone-900">
        <!-- 1. Top Header: Diamond Logo + Boutique Calligraphy + Invoice Title -->
        <div class="flex items-center justify-between pb-2 mb-2 border-b-2 border-stone-800">
          <!-- Left: Diamond Silk Emblem / Uploaded Logo -->
          <div class="flex items-center gap-3">
            <div v-if="storeSettings.logo" class="w-13 h-13 rounded-lg overflow-hidden border border-stone-300 flex-shrink-0 bg-white flex items-center justify-center p-0.5">
              <img :src="storeSettings.logo" :alt="storeSettings.nameEn" class="max-w-full max-h-full object-contain" />
            </div>
            <div v-else class="w-12 h-12 flex-shrink-0 bg-stone-900 rounded-xl flex flex-col items-center justify-center text-white p-1 border border-stone-800">
              <span class="font-moul text-[11px] leading-none">ពិដាន</span>
              <span class="text-[7.5px] font-bold text-amber-200 leading-none mt-0.5">សូត្រខ្មែរ</span>
            </div>
            <div>
              <h2 class="font-moul text-base text-stone-900 tracking-wide leading-tight">
                {{ storeSettings.nameKh || 'ពិដានសូត្រខ្មែរ' }}
              </h2>
              <p class="text-[10px] font-bold text-stone-600 uppercase tracking-widest leading-none mt-0.5">
                {{ storeSettings.nameEn || 'PIDAN KHMER SILK' }}
              </p>
            </div>
          </div>

          <!-- Center/Right: Bilingual Document Heading -->
          <div class="text-right">
            <h1 class="font-koulen text-xl text-stone-900 tracking-wider leading-none">
              វិក្កយបត្រ / INVOICE
            </h1>
            <span class="text-[9px] font-mono text-stone-500 uppercase tracking-widest block mt-0.5">
              Official Boutique Receipt
            </span>
          </div>
        </div>

        <!-- 2. Customer & Invoice Metadata Grid (2 Columns, matching photo) -->
        <div class="grid grid-cols-2 gap-3 text-xs text-stone-800 mb-2.5 pb-2 border-b border-stone-300">
          <!-- Left Column: Customer Details -->
          <div class="space-y-1 text-[11px] leading-tight">
            <div class="flex">
              <span class="w-28 font-bold text-stone-700">អតិថិជន / Customer</span>
              <span class="font-bold text-stone-900">: {{ completedInvoice.customerName || checkoutForm.customer_name || 'General Customer' }}</span>
            </div>
            <div class="flex">
              <span class="w-28 font-bold text-stone-700">ទូរស័ព្ទលេខ / Tel</span>
              <span class="font-mono text-stone-900">: {{ completedInvoice.customerPhone || checkoutForm.customer_phone || '-' }}</span>
            </div>
            <div class="flex">
              <span class="w-28 font-bold text-stone-700">អាសយដ្ឋាន / Address</span>
              <span class="text-stone-700 truncate max-w-[190px]">: {{ storeSettings.address || '#18 Samdach Sothearos Blvd, Phnom Penh' }}</span>
            </div>
          </div>

          <!-- Right Column: Invoice Reference & Cashier Details -->
          <div class="space-y-1 text-[11px] leading-tight text-right md:text-left">
            <div class="flex justify-between md:justify-start">
              <span class="w-32 font-bold text-stone-700">វិក្កយបត្រ / Invoice NO</span>
              <span class="font-mono font-bold text-stone-900">: {{ completedInvoice.invoiceNo || 'POS26/0030' }}</span>
            </div>
            <div class="flex justify-between md:justify-start">
              <span class="w-32 font-bold text-stone-700">កាលបរិច្ឆេទ / Date</span>
              <span class="font-mono text-stone-900">: {{ completedInvoice.date || new Date().toLocaleDateString('en-GB') }}</span>
            </div>
            <div class="flex justify-between md:justify-start">
              <span class="w-32 font-bold text-stone-700">អត្រាប្តូរប្រាក់ / Rate</span>
              <span class="font-mono text-stone-900">: {{ formatKHR(exchangeRate) }} ៛</span>
            </div>
            <div class="flex justify-between md:justify-start">
              <span class="w-32 font-bold text-stone-700">អ្នកគិតលុយ / Cashier</span>
              <span class="font-bold text-stone-900">: {{ storeSettings.cashierName || 'SEANG Kimpheng' }}</span>
            </div>
          </div>
        </div>

        <!-- 3. Amber Silk Items Table with 10-Row Standard Grid -->
        <div class="mb-2.5">
          <table class="w-full text-left border-collapse border border-stone-800 text-xs">
            <thead>
              <tr class="bg-[#E5A93C] text-stone-950 font-bold border-b border-stone-800 text-[10.5px]">
                <th class="py-1 px-1.5 w-9 text-center border-r border-stone-800 leading-tight">ល.រ<br><span class="text-[8.5px] font-mono">N°</span></th>
                <th class="py-1 px-2 border-r border-stone-800 leading-tight">បរិយាយ<br><span class="text-[8.5px]">Description</span></th>
                <th class="py-1 px-1.5 w-18 text-center border-r border-stone-800 leading-tight">ចំនួន<br><span class="text-[8.5px]">Qty</span></th>
                <th class="py-1 px-1.5 w-18 text-right border-r border-stone-800 leading-tight">តំលៃ<br><span class="text-[8.5px]">Price</span></th>
                <th class="py-1 px-1.5 w-24 text-center border-r border-stone-800 leading-tight">បញ្ចុះតំលៃ<br><span class="text-[8.5px]">Discount</span></th>
                <th class="py-1 px-2 w-20 text-right leading-tight">សរុប<br><span class="text-[8.5px]">Sub Total</span></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-300">
              <!-- Real Active Items -->
              <tr 
                v-for="(item, printIdx) in (completedInvoice.items?.length ? completedInvoice.items : cart)" 
                :key="'a5-print-'+(item.cartItemId || item.id || printIdx)+'-'+printIdx" 
                class="text-[11px] leading-tight"
              >
                <td class="py-1 px-1.5 text-center font-mono font-bold text-stone-700 border-r border-stone-300">{{ printIdx + 1 }}</td>
                <td class="py-1 px-2 border-r border-stone-300 font-bold text-stone-900">
                  {{ item.code ? item.code + '-' : '' }}{{ item.name }}
                </td>
                <td class="py-1 px-1.5 text-center font-mono border-r border-stone-300 whitespace-nowrap">
                  {{ (item.quantity || 1).toFixed(2) }} {{ item.unit === 'kben' ? 'ក្បិន' : (item.unit === 'm' ? 'ម៉ែត្រ' : item.unit) }}
                </td>
                <td class="py-1 px-1.5 text-right font-mono border-r border-stone-300 whitespace-nowrap">
                  ${{ item.price.toFixed(2) }}
                </td>
                <td class="py-1 px-1.5 text-center font-mono text-[10px] border-r border-stone-300 whitespace-nowrap">
                  {{ item.discount ? '(' + item.discount + (item.discountType === 'fixed' ? '$' : '%') + ') $' + getItemDiscountAmount(item).toFixed(2) : '-' }}
                </td>
                <td class="py-1 px-2 text-right font-mono font-bold text-stone-900 whitespace-nowrap">
                  ${{ (item.price * item.quantity - getItemDiscountAmount(item)).toFixed(2) }}
                </td>
              </tr>
              <!-- Padded Blank Lined Rows up to 10 Rows (matching the photo) -->
              <tr 
                v-for="padIdx in Math.max(0, 10 - (completedInvoice.items?.length ? completedInvoice.items.length : cart.length))" 
                :key="'a5-pad-'+padIdx" 
                class="text-[11px] h-5"
              >
                <td class="py-1 px-1.5 text-center font-mono text-stone-400 border-r border-stone-200">
                  {{ (completedInvoice.items?.length ? completedInvoice.items.length : cart.length) + padIdx }}
                </td>
                <td class="py-1 px-2 border-r border-stone-200">&nbsp;</td>
                <td class="py-1 px-1.5 border-r border-stone-200">&nbsp;</td>
                <td class="py-1 px-1.5 border-r border-stone-200">&nbsp;</td>
                <td class="py-1 px-1.5 border-r border-stone-200">&nbsp;</td>
                <td class="py-1 px-2">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 4. Footer Section: Split Dual ABA PAY Cards (Left) & Bordered Totals Grid (Right) -->
        <div class="grid grid-cols-12 gap-3 pt-1 border-t-2 border-stone-800">
          
          <!-- Left: Thank You & Dual ABA PAY QR Cards (Matching Photo) -->
          <div class="col-span-7 flex flex-col justify-between">
            <div class="text-[11px] font-bold text-stone-800 italic mb-1.5">
              {{ storeSettings.footerNote || 'Thank you!!!' }}
            </div>

            <!-- Dual ABA PAY Cards Side-by-Side -->
            <div class="grid grid-cols-2 gap-2">
              <!-- ABA Card 1 -->
              <div class="border border-stone-400 rounded-lg p-1.5 text-center bg-white">
                <div class="text-[8px] font-bold text-stone-700 leading-tight">ស្កេនដើម្បីទូទាត់ប្រាក់</div>
                <div class="text-[7px] text-stone-500 font-bold tracking-tight uppercase">SCAN FOR PAYMENT</div>
                <!-- Official ABA PAY Badge -->
                <div class="inline-flex items-center justify-center gap-1 bg-[#005C8A] text-white px-2 py-0.5 rounded text-[8.5px] font-black my-1 tracking-wider">
                  <span>ABA</span>
                  <span class="text-rose-400 font-serif">'</span>
                  <span class="text-[7.5px] tracking-normal font-sans">PAY</span>
                </div>
                <!-- Scannable Dynamic QR -->
                <div class="w-14 h-14 mx-auto my-0.5 flex items-center justify-center p-0.5 bg-white border border-stone-300 rounded">
                  <ReceiptCode 
                    :value="'https://link.payway.com.kh/aba?id=' + (storeSettings.abaAccount1 || '168388886')" 
                    mode="qr" 
                    :show-text="false"
                    :qr-size="48"
                  />
                </div>
                <div class="font-mono font-bold text-[9px] text-stone-900 tracking-tight">{{ storeSettings.abaAccount1 || '168 388 886' }}</div>
                <div class="text-[7.5px] font-bold text-stone-600 uppercase truncate">{{ storeSettings.abaName1 || 'PIDAN KHMER SILK' }}</div>
              </div>

              <!-- ABA Card 2 -->
              <div class="border border-stone-400 rounded-lg p-1.5 text-center bg-white">
                <div class="text-[8px] font-bold text-stone-700 leading-tight">ស្កេនដើម្បីទូទាត់ប្រាក់</div>
                <div class="text-[7px] text-stone-500 font-bold tracking-tight uppercase">SCAN FOR PAYMENT</div>
                <!-- Official ABA PAY Badge -->
                <div class="inline-flex items-center justify-center gap-1 bg-[#005C8A] text-white px-2 py-0.5 rounded text-[8.5px] font-black my-1 tracking-wider">
                  <span>ABA</span>
                  <span class="text-rose-400 font-serif">'</span>
                  <span class="text-[7.5px] tracking-normal font-sans">PAY</span>
                </div>
                <!-- Scannable Dynamic QR -->
                <div class="w-14 h-14 mx-auto my-0.5 flex items-center justify-center p-0.5 bg-white border border-stone-300 rounded">
                  <ReceiptCode 
                    :value="'https://link.payway.com.kh/aba?id=' + (storeSettings.abaAccount2 || '000594815')" 
                    mode="qr" 
                    :show-text="false"
                    :qr-size="48"
                  />
                </div>
                <div class="font-mono font-bold text-[9px] text-stone-900 tracking-tight">{{ storeSettings.abaAccount2 || '000 594 815' }}</div>
                <div class="text-[7.5px] font-bold text-stone-600 uppercase truncate">{{ storeSettings.abaName2 || 'PIDAN KHMER SILK' }}</div>
              </div>
            </div>
          </div>

          <!-- Right: Bordered Financial Summary Grid (Identical to Photo) -->
          <div class="col-span-5">
            <div class="border-2 border-stone-900 text-[11px] text-stone-900 divide-y divide-stone-900 bg-white">
              <div class="flex justify-between items-center py-1 px-2 font-bold">
                <span>សរុបទឹកប្រាក់ / Total</span>
                <span class="font-mono text-sm">${{ (completedInvoice.total || cartTotal).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center py-1 px-2 font-bold bg-stone-50">
                <span>ចំនួនទឹកប្រាក់ជារៀល / Riel</span>
                <span class="font-mono text-xs">៛{{ formatKHR(completedInvoice.totalKHR || cartTotalKHR) }}</span>
              </div>
              <div class="flex justify-between items-center py-0.5 px-2 text-stone-700">
                <span>ប្រាក់បានបង់ / Paid Amount</span>
                <span class="font-mono">${{ (completedInvoice.cashTenderedUSD ? completedInvoice.cashTenderedUSD.toFixed(2) : (paymentMethod === 'scan' ? (completedInvoice.total || cartTotal).toFixed(2) : '0.00')) }}</span>
              </div>
              <div class="flex justify-between items-center py-0.5 px-2 text-stone-700 bg-stone-50">
                <span>ប្រាក់នៅសល់ / Balance</span>
                <span class="font-mono">${{ (paymentMethod === 'scan' ? '0.00' : (completedInvoice.changeUSD ? '0.00' : (completedInvoice.total || cartTotal).toFixed(2))) }}</span>
              </div>
              <div class="flex justify-between items-center py-1 px-2 font-bold">
                <span>ប្រាក់នៅសល់សរុប / Total Balance</span>
                <span class="font-mono text-sm">${{ (paymentMethod === 'scan' ? '0.00' : (completedInvoice.changeUSD ? '0.00' : (completedInvoice.total || cartTotal).toFixed(2))) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Signatures Strip (Seller & Buyer) -->
        <div class="grid grid-cols-2 gap-8 pt-4 pb-1 text-center text-[10px] text-stone-800">
          <div>
            <div class="font-bold mb-4">អ្នកលក់ / Seller Signature</div>
            <div class="border-b-2 border-dotted border-stone-500 w-36 mx-auto"></div>
          </div>
          <div>
            <div class="font-bold mb-4">អ្នកទិញ / Buyer Signature</div>
            <div class="border-b-2 border-dotted border-stone-500 w-36 mx-auto"></div>
          </div>
        </div>
      </div>

      <!-- ============================================== -->
      <!-- FORMAT B: 80mm THERMAL SLIP -->
      <!-- ============================================== -->
      <div v-else class="w-[80mm] mx-auto p-4 font-mono text-xs bg-white text-stone-900">
        <div class="text-center mb-3">
          <div v-if="storeSettings.logo" class="w-12 h-12 mx-auto mb-1 rounded flex items-center justify-center">
            <img :src="storeSettings.logo" :alt="storeSettings.nameEn" class="max-w-full max-h-full object-contain" />
          </div>
          <h2 class="font-bold text-base mb-0.5">{{ storeSettings.nameEn || 'PIDAN KHMER SILK' }}</h2>
          <p class="text-xs">{{ storeSettings.nameKh || 'ពិតានសូត្រខ្មែរ' }}</p>
          <p class="text-[10px] text-stone-600">{{ storeSettings.address }}</p>
          <p class="text-[10px] text-stone-600">Tel: {{ storeSettings.phone }}</p>
          <div class="border-b-2 border-dashed border-stone-400 my-2"></div>
          <p class="text-xs text-left">Date: {{ completedInvoice.date || new Date().toLocaleString() }}</p>
          <p class="text-xs text-left">Invoice: {{ completedInvoice.invoiceNo || 'PK-INV-001' }}</p>
          <p class="text-xs text-left">Client: {{ completedInvoice.customerName || checkoutForm.customer_name || 'Walk-in Client' }}</p>
          <div class="border-b-2 border-dashed border-stone-400 my-2"></div>
        </div>
        
        <div class="mb-3 space-y-1">
          <div v-for="(item, printIdx) in (completedInvoice.items.length ? completedInvoice.items : cart)" :key="'print-80-'+(item.cartItemId || item.id || printIdx)+'-'+printIdx" class="flex justify-between text-xs">
            <div class="w-3/5">
              <div class="truncate font-bold">{{ item.name }}</div>
              <div class="text-[10px] text-stone-600">({{ item.code }}) • {{ item.quantity }}{{ item.unit }}</div>
            </div>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
        </div>

        <div class="border-t-2 border-dashed border-stone-400 pt-2 mb-3">
          <div class="flex justify-between font-bold text-sm">
            <span>TOTAL:</span>
            <span>${{ (completedInvoice.total || cartTotal).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between font-bold text-xs mt-0.5">
            <span>TOTAL KHR:</span>
            <span>៛{{ formatKHR(completedInvoice.totalKHR || cartTotalKHR) }}</span>
          </div>
          <div class="text-[11px] text-stone-600 mt-1">
            Payment: {{ completedInvoice.paymentMethod || (paymentMethod === 'cash' ? 'Cash' : 'Scan') }}
          </div>
        </div>

        <div class="text-center mt-3 pt-2 border-t border-dashed border-stone-300">
          <ReceiptCode 
            :value="completedInvoice.invoiceNo || 'PK-INV-001'" 
            :mode="receiptCodeFormat" 
            :barcode-height="30"
            :qr-size="65"
          />
        </div>
      </div>
    </div>

    <!-- SALES HISTORY MODAL -->
    <div 
      v-if="showHistory" 
      role="dialog"
      aria-modal="true"
      aria-labelledby="historyModalHeading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" 
      @click.self="showHistory = false"
    >
      <div class="bg-white dark:bg-atelier-card rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh] border border-atelier-border dark:border-atelier-borderDark">
        <div class="p-4 border-b border-atelier-border dark:border-atelier-borderDark flex justify-between items-center bg-atelier-paper/60 dark:bg-atelier-dark/60">
          <h2 id="historyModalHeading" class="font-serif font-bold text-base">Recent Sales Archive</h2>
          <button type="button" @click="showHistory = false" class="text-stone-400 hover:text-stone-600 cursor-pointer" aria-label="Close sales archive">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="overflow-y-auto p-4 flex-grow space-y-2.5">
          <div v-if="sales.length === 0" class="text-center text-stone-400 py-8 text-xs">
            No sales recorded yet today.
          </div>
          <div v-for="(sale, saleIdx) in sales" :key="'hist-'+sale.id+'-'+saleIdx" class="border border-atelier-border dark:border-atelier-borderDark rounded-2xl p-3 bg-stone-50/50 dark:bg-atelier-dark/50">
            <div class="flex justify-between items-start mb-2">
              <div>
                <p class="font-bold text-xs text-stone-900 dark:text-stone-100">{{ sale.reference_no }}</p>
                <p class="text-[10px] text-stone-400">{{ sale.date }} • {{ sale.customer_name }}</p>
              </div>
              <div class="text-right">
                <p class="font-bold text-atelier-red dark:text-atelier-gold text-xs">${{ sale.total.toFixed(2) }}</p>
                <p class="text-[9px] font-mono text-stone-400">៛{{ formatKHR(sale.totalKHR) }}</p>
              </div>
            </div>
            <button @click="editPastSale(sale)" class="w-full py-1 bg-white dark:bg-atelier-card border border-atelier-gold rounded-lg text-[10px] font-bold text-atelier-goldDark dark:text-atelier-gold hover:bg-atelier-gold/10 transition cursor-pointer">
              Reload Into Order
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const { isSidebarOpen, toggleSidebar } = useLayoutState()
const activeMobileTab = ref('catalog') // 'catalog' | 'cart'

const { products, categories, colors, sales, decrementStock, addSale, receiptCodeFormat, storeSettings, updateStoreSettings } = usePosState()
const { showConfirm } = useUiAlert()

// Print & Store Settings
const activePrintFormat = ref('a5')
const showStoreSettingsModal = ref(false)
const logoFileInput = ref(null)

const editSettingsForm = ref({
  nameEn: '',
  nameKh: '',
  tagline: '',
  logo: '',
  address: '',
  phone: '',
  telegram: '',
  taxId: '',
  footerNote: '',
  printFormat: 'a5',
  cashierName: 'SEANG Kimpheng',
  abaAccount1: '168 388 886',
  abaName1: 'PIDAN KHMER SILK',
  abaAccount2: '000 594 815',
  abaName2: 'PIDAN KHMER SILK'
})

onMounted(() => {
  if (storeSettings.value?.printFormat) {
    activePrintFormat.value = storeSettings.value.printFormat
  }
})

const openStoreSettings = () => {
  editSettingsForm.value = {
    nameEn: storeSettings.value?.nameEn || '',
    nameKh: storeSettings.value?.nameKh || 'ពិដានសូត្រខ្មែរ',
    tagline: storeSettings.value?.tagline || '',
    logo: storeSettings.value?.logo || '',
    address: storeSettings.value?.address || '#18 Samdach Sothearos Blvd, Phnom Penh, Cambodia',
    phone: storeSettings.value?.phone || '+855 23 999 888',
    telegram: storeSettings.value?.telegram || '@pidansilk',
    taxId: storeSettings.value?.taxId || '',
    footerNote: storeSettings.value?.footerNote || 'Thank you!!! សូមអរគុណ!',
    printFormat: storeSettings.value?.printFormat || 'a5',
    cashierName: storeSettings.value?.cashierName || 'SEANG Kimpheng',
    abaAccount1: storeSettings.value?.abaAccount1 || '168 388 886',
    abaName1: storeSettings.value?.abaName1 || 'PIDAN KHMER SILK',
    abaAccount2: storeSettings.value?.abaAccount2 || '000 594 815',
    abaName2: storeSettings.value?.abaName2 || 'PIDAN KHMER SILK'
  }
  showStoreSettingsModal.value = true
}

const triggerLogoInput = () => {
  logoFileInput.value?.click()
}

const handleLogoUpload = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    alert('Logo image should be under 2MB')
    return
  }
  const reader = new FileReader()
  reader.onload = (event) => {
    editSettingsForm.value.logo = event.target?.result || ''
  }
  reader.readAsDataURL(file)
}

const removeLogo = () => {
  editSettingsForm.value.logo = ''
  if (logoFileInput.value) logoFileInput.value.value = ''
}

const saveStoreSettings = () => {
  updateStoreSettings(editSettingsForm.value)
  activePrintFormat.value = editSettingsForm.value.printFormat
  showStoreSettingsModal.value = false
}

// Search and Filter State
const searchInputRef = ref(null)
const searchQuery = ref('')
const activeColorFilter = ref('')
const activeCategory = ref('all')

// Dual Currency Engine
const exchangeRate = ref(4100)
const showRateModal = ref(false)
const tempRate = ref(4100)

const cartTotalKHR = computed(() => {
  return Math.round((cartTotal.value * exchangeRate.value) / 100) * 100
})

const formatKHR = (amount) => {
  return (amount || 0).toLocaleString('en-US')
}

// Category Count Helper
const getCategoryProductCount = (categoryId) => {
  return products.value.filter(p => p.category_id === categoryId).length
}

// Pin Toggle
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
  
  return [...list].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1
    if (!a.isPinned && b.isPinned) return 1
    return a.name.localeCompare(b.name)
  })
})

// Cart State
const cart = ref([])

// Payment Engine (Fast QR Scan vs Optional Cash)
const paymentMethod = ref('scan') // 'scan' (default KHQR) or 'cash'
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

// Client Details & Modals
const showTenderModal = ref(false)
const showCustomerModal = ref(false)
const showShortcutsModal = ref(false)
const showHistory = ref(false)
const isProcessing = ref(false)

const checkoutForm = ref({
  sale_status_id: 1, // 1 = Direct Sale (Handed Over), 2 = Custom Tailoring Order
  payment_status_id: 1,
  payment_method_id: 1,
  customer_name: '',
  customer_phone: '',
  pickup_date: '',
  tailoring_note: ''
})

// Precision Custom Fabric Cutter Modal
const showPrecisionCutter = ref(false)
const precisionItem = ref(null)
const precisionCutLength = ref(1.0)

const openPrecisionCutter = (item) => {
  precisionItem.value = item
  precisionCutLength.value = 1.0
  showPrecisionCutter.value = true
}

const confirmPrecisionCut = () => {
  if (precisionItem.value && precisionCutLength.value > 0) {
    addToCartWithCut(precisionItem.value, precisionCutLength.value)
    showPrecisionCutter.value = false
  }
}

// Discounts & Totals
const globalDiscount = ref(0)
const globalDiscountType = ref('percent')

const cartSubtotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

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

// Stepper Adjusters
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

const setCutLength = (item, preset) => {
  const prod = products.value.find(p => p.id === item.id)
  if (prod && !prod.is_service && preset > prod.stock) {
    item.quantity = prod.stock
    return
  }
  item.quantity = preset
}

// Add to Cart Logic
const addToCartWithCut = (product, cutLength = 1) => {
  if (product.stock <= 0 && !product.is_service) return

  const existingItem = cart.value.find(item => item.id === product.id)
  if (existingItem) {
    const newQty = Math.round((existingItem.quantity + cutLength) * 100) / 100
    if (!product.is_service && newQty > product.stock) {
      existingItem.quantity = product.stock
    } else {
      existingItem.quantity = newQty
    }
  } else {
    const initialQty = (!product.is_service && product.stock < cutLength) ? product.stock : cutLength
    cart.value.push({
      cartItemId: `cit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
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
      discountType: 'percent',
      showDiscount: false
    })
  }
}

// Clear Cart with Confirmation
const confirmClearCart = async () => {
  if (cart.value.length === 0) return
  const result = await showConfirm(`Clear all items from the current order?`, 'Clear Order')
  if (result.isConfirmed) cart.value = []
}

// Tender Modal Trigger with Live Preview Pre-population
const openTenderDrawer = () => {
  if (cart.value.length === 0) return
  const storedCounter = parseInt(localStorage.getItem('bpas_invoice_counter') || '0')
  const invoiceNo = `PK-${String(storedCounter + 1).padStart(5, '0')}`
  const now = new Date()
  completedInvoice.value = {
    invoiceNo,
    date: now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    items: JSON.parse(JSON.stringify(cart.value)),
    subtotal: cartSubtotal.value,
    itemDiscounts: cartItemDiscounts.value,
    globalDiscount: globalDiscount.value,
    globalDiscountType: globalDiscountType.value,
    total: cartTotal.value,
    totalKHR: cartTotalKHR.value,
    paymentMethod: paymentMethod.value === 'cash' ? 'Cash' : 'ABA / KHQR (Scan)',
    customerName: checkoutForm.value.customer_name.trim() || 'Walk-in Client',
    customerPhone: checkoutForm.value.customer_phone.trim() || ''
  }
  showTenderModal.value = true
}

// Receipt Preview
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
  paymentMethod: 'Cash',
  cashTenderedUSD: 0,
  cashTenderedKHR: 0,
  changeUSD: 0,
  changeKHR: 0,
  saleStatus: 'Handed Over',
  customerName: 'Walk-in Client'
})

// Barcode Scan Handler
const handleScan = (e) => {
  const code = e.target.value.trim()
  const product = products.value.find(p => p.code.toLowerCase() === code.toLowerCase())
  if (product) {
    addToCartWithCut(product, 1)
  }
  e.target.value = ''
  searchQuery.value = ''
}

// Global Keyboard Handler (F2 for Tender, / for focus, Laser barcode scanner)
let scanBuffer = ''
let scanTimer = null
const onGlobalKeydown = (e) => {
  if (e.key === 'F2') {
    e.preventDefault()
    if (cart.value.length > 0) showTenderModal.value = true
    return
  }

  if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) {
    e.preventDefault()
    searchInputRef.value?.focus()
    return
  }

  if (e.key === 'Escape') {
    showTenderModal.value = false
    showPrecisionCutter.value = false
    showCustomerModal.value = false
    showRateModal.value = false
    showShortcutsModal.value = false
    showHistory.value = false
    return
  }

  if (e.key === 'Enter' && showTenderModal.value) {
    processCheckout()
    return
  }

  // Laser scanner buffer
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target?.tagName)) return

  if (e.key === 'Enter') {
    if (scanBuffer.length >= 3) {
      const product = products.value.find(p => p.code.toLowerCase() === scanBuffer.toLowerCase())
      if (product) addToCartWithCut(product, 1)
    }
    scanBuffer = ''
    return
  }
  if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
    scanBuffer += e.key
  }
  if (scanTimer) clearTimeout(scanTimer)
  scanTimer = setTimeout(() => { scanBuffer = '' }, 150)
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKeydown))

// Process Checkout & Fast Settlement
const processCheckout = (shouldPrint = true) => {
  if (isProcessing.value || cart.value.length === 0) return
  if (paymentMethod.value === 'cash' && isCashUnderpaid.value) return

  isProcessing.value = true

  const storedCounter = parseInt(localStorage.getItem('bpas_invoice_counter') || '0')
  const newCounter = storedCounter + 1
  localStorage.setItem('bpas_invoice_counter', String(newCounter))
  const invoiceNo = `PK-${String(newCounter).padStart(5, '0')}`
  const createdAt = new Date().toISOString()
  const saleDate = new Date().toLocaleString()
  const custName = checkoutForm.value.customer_name.trim() || 'Walk-in Client'
  const custPhone = checkoutForm.value.customer_phone.trim() || ''
  const isTailoring = checkoutForm.value.sale_status_id === 2

  const finalTotalUSD = cartTotal.value
  const finalTotalKHR = cartTotalKHR.value
  const frozenItems = JSON.parse(JSON.stringify(cart.value))

  const isCash = paymentMethod.value === 'cash'
  const finalPaymentMethod = isCash ? 'Cash' : 'ABA / KHQR (Scan)'
  const tenderedUSD = isCash ? (parseFloat(cashReceivedUSD.value) || 0) : finalTotalUSD
  const tenderedKHR = isCash ? (parseFloat(cashReceivedKHR.value) || 0) : 0
  const changeUSD = isCash ? changeDueUSD.value : 0
  const changeKHR = isCash ? changeDueKHR.value : 0

  // 1. Decrement Stock
  decrementStock(cart.value)

  // 2. Add Sale record
  const saleRecord = {
    id: Date.now(),
    reference_no: invoiceNo,
    date: saleDate,
    createdAt,
    items: frozenItems,
    total: finalTotalUSD,
    totalKHR: finalTotalKHR,
    subtotal: cartSubtotal.value,
    itemDiscounts: cartItemDiscounts.value,
    globalDiscount: globalDiscount.value,
    globalDiscountType: globalDiscountType.value,
    sale_status_id: checkoutForm.value.sale_status_id,
    sale_status: isTailoring ? 'Custom Tailoring Order' : 'Direct Sale (Handed Over)',
    payment_status_id: 1,
    payment_status: 'Paid',
    payment_method_id: isCash ? 1 : 2,
    payment_method: finalPaymentMethod,
    cash_tendered_usd: tenderedUSD,
    cash_tendered_khr: tenderedKHR,
    change_usd: changeUSD,
    change_khr: changeKHR,
    customer_name: custName,
    customer_phone: custPhone,
    pickup_date: checkoutForm.value.pickup_date || '',
    tailoring_note: checkoutForm.value.tailoring_note || '',
    created_by: 'Admin User',
    grand_total: finalTotalUSD
  }

  addSale(saleRecord)

  // 3. Receipt modal data
  completedInvoice.value = {
    invoiceNo,
    date: saleDate,
    items: frozenItems,
    subtotal: cartSubtotal.value,
    itemDiscounts: cartItemDiscounts.value,
    globalDiscount: globalDiscount.value,
    globalDiscountType: globalDiscountType.value,
    total: finalTotalUSD,
    totalKHR: finalTotalKHR,
    paymentMethod: finalPaymentMethod,
    cashTenderedUSD: tenderedUSD,
    cashTenderedKHR: tenderedKHR,
    changeUSD: changeUSD,
    changeKHR: changeKHR,
    saleStatus: isTailoring ? 'Custom Tailoring Order' : 'Direct Sale',
    customerName: custName,
    customerPhone: custPhone
  }

  showTenderModal.value = false

  if (shouldPrint) {
    // Print receipt directly with zero delay
    setTimeout(() => {
      window.print()
      startNewOrder()
    }, 150)
  } else {
    startNewOrder()
  }
}

const triggerPrint = () => {
  window.print()
}

const startNewOrder = () => {
  isProcessing.value = false
  cart.value = []
  globalDiscount.value = 0
  globalDiscountType.value = 'percent'
  checkoutForm.value.customer_name = ''
  checkoutForm.value.customer_phone = ''
  checkoutForm.value.sale_status_id = 1
  checkoutForm.value.pickup_date = ''
  checkoutForm.value.tailoring_note = ''
  paymentMethod.value = 'scan'
  cashReceivedUSD.value = null
  cashReceivedKHR.value = null
  showReceiptModal.value = false
  showTenderModal.value = false
}

const editPastSale = async (pastSale) => {
  if (cart.value.length > 0) {
    const result = await showConfirm("Current order will be replaced with this past sale. Continue?", "Warning")
    if (!result.isConfirmed) return
  }
  cart.value = JSON.parse(JSON.stringify(pastSale.items))
  globalDiscount.value = pastSale.globalDiscount || 0
  checkoutForm.value.customer_name = pastSale.customer_name !== 'Walk-in Client' ? pastSale.customer_name : ''
  checkoutForm.value.customer_phone = pastSale.customer_phone || ''
  showHistory.value = false
}
</script>

<style>
@media print {
  @page {
    size: auto;
    margin: 4mm 6mm;
  }
  html, body {
    background: #ffffff !important;
    color: #000000 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  body * {
    visibility: hidden;
  }
  #printInvoiceContainer, #printInvoiceContainer * {
    visibility: visible;
  }
  #printInvoiceContainer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    margin: 0;
    padding: 0;
    background: #ffffff !important;
  }
  .a5-print-sheet {
    width: 138mm;
    margin: 0 auto;
    box-sizing: border-box;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #111827 !important;
  }
  /* Avoid breaking inside table rows or header/footer sections */
  tr, .grid {
    page-break-inside: avoid;
    break-inside: avoid;
  }
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>