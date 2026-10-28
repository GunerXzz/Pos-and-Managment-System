<template>
  <div class="p-4 md:p-8 space-y-8 bg-[#F6F3EE] dark:bg-[#121013] text-stone-900 dark:text-stone-100 min-h-full">
    
    <!-- TOP SECTION: OVERVIEW TITLE & PERIOD FILTER -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 class="text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
          {{ $t('dashboard') }} Overview
        </h2>
        <p class="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
          Live boutique retail metrics, fabric sales, and inventory performance
        </p>
      </div>

      <!-- PERIOD SELECTOR PILL -->
      <div class="flex items-center gap-2">
        <div class="relative">
          <select
            v-model="selectedPeriod"
            class="appearance-none bg-white dark:bg-[#1C181C] text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-800/80 rounded-full pl-5 pr-10 py-2.5 text-xs md:text-sm font-bold shadow-xs hover:border-stone-400 dark:hover:border-stone-600 focus:outline-none focus:ring-2 focus:ring-[#C5A059] cursor-pointer btn-press transition-all"
          >
            <option value="today">Today</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="year">This Year</option>
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-stone-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <NuxtLink
          to="/pos"
          class="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#7A1A24] hover:bg-[#94222E] text-white rounded-full text-xs md:text-sm font-bold shadow-md hover:shadow-lg transition-all btn-press"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>Open POS</span>
        </NuxtLink>
      </div>
    </div>

    <!-- 4 STORE METRIC STAT CARDS (Rounded Modern Cards with Theme Red & Gold Accents) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
      
      <!-- CARD 1: TODAY'S SALES (Theme Red Maroon Accent) -->
      <NuxtLink
        to="/sales"
        class="bg-white dark:bg-[#1C181C] p-6 rounded-3xl border border-stone-200/70 dark:border-stone-800/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 group block relative overflow-hidden"
      >
        <div class="w-12 h-12 rounded-full bg-[#7A1A24]/10 dark:bg-[#7A1A24]/30 text-[#7A1A24] dark:text-[#E6C98A] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <p class="text-xs font-semibold text-stone-500 dark:text-stone-400 capitalize tracking-wide mb-1.5">
          Today's Sales
        </p>
        <p class="text-2xl md:text-3xl font-black text-stone-900 dark:text-white tracking-tight mb-3">
          ${{ todaySalesTotal.toFixed(2) }}
        </p>

        <div class="flex items-center gap-1.5 text-xs font-bold text-[#7A1A24] dark:text-[#E6C98A]">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>Live POS Volume</span>
        </div>
      </NuxtLink>

      <!-- CARD 2: ESTIMATED PROFIT (Champagne Gold Accent) -->
      <NuxtLink
        to="/sales"
        class="bg-white dark:bg-[#1C181C] p-6 rounded-3xl border border-stone-200/70 dark:border-stone-800/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 group block relative overflow-hidden"
      >
        <div class="w-12 h-12 rounded-full bg-[#C5A059]/15 dark:bg-[#C5A059]/30 text-[#C5A059] dark:text-[#E6C98A] flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-xs">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>

        <p class="text-xs font-semibold text-stone-500 dark:text-stone-400 capitalize tracking-wide mb-1.5">
          Estimated Margin
        </p>
        <p class="text-2xl md:text-3xl font-black text-stone-900 dark:text-white tracking-tight mb-3">
          ${{ (todaySalesTotal * 0.35).toFixed(2) }}
        </p>

        <div class="flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>35% Avg Margin</span>
        </div>
      </NuxtLink>

      <!-- CARD 3: TOTAL INVOICES (Real Count) -->
      <NuxtLink
        to="/sales"
        class="bg-white dark:bg-[#1C181C] p-6 rounded-3xl border border-stone-200/70 dark:border-stone-800/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 group block relative overflow-hidden"
      >
        <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-xs">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>

        <p class="text-xs font-semibold text-stone-500 dark:text-stone-400 capitalize tracking-wide mb-1.5">
          Total Invoices
        </p>
        <p class="text-2xl md:text-3xl font-black text-stone-900 dark:text-white tracking-tight mb-3">
          {{ totalInvoicesCount }}
        </p>

        <div class="flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Completed Orders</span>
        </div>
      </NuxtLink>

      <!-- CARD 4: CATALOG PRODUCTS (Real Products Count) -->
      <NuxtLink
        to="/inventory"
        class="bg-white dark:bg-[#1C181C] p-6 rounded-3xl border border-stone-200/70 dark:border-stone-800/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 group block relative overflow-hidden"
      >
        <div class="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-xs">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>

        <p class="text-xs font-semibold text-stone-500 dark:text-stone-400 capitalize tracking-wide mb-1.5">
          Fabric & Product SKUs
        </p>
        <p class="text-2xl md:text-3xl font-black text-stone-900 dark:text-white tracking-tight mb-3">
          {{ totalProductsCount }}
        </p>

        <div class="flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-300">
          <span class="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>Active SKU Catalog</span>
        </div>
      </NuxtLink>

    </div>

    <!-- MIDDLE SECTION: RECENT SALES TRANSACTIONS & STOCK HEALTH GAUGE -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      <!-- LEFT WIDE CARD: RECENT SALES TRANSACTIONS (2 Columns on XL) -->
      <div class="xl:col-span-2 bg-white dark:bg-[#1C181C] rounded-3xl p-6 md:p-7 border border-stone-200/70 dark:border-stone-800/80 shadow-xs flex flex-col justify-between">
        
        <!-- HEADER WITH ACTIONS -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 class="text-lg md:text-xl font-bold text-stone-900 dark:text-white tracking-tight">
              Recent Sales Transactions
            </h3>
            <p class="text-xs text-stone-400 mt-0.5">Real-time receipts and boutique customer orders</p>
          </div>

          <NuxtLink
            to="/sales"
            class="px-4 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800/70 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold transition-all btn-press flex items-center gap-1"
          >
            <span>View All</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- REAL SALES TABLE OR CLEAN EMPTY STATE -->
        <div class="overflow-x-auto -mx-6 px-6">
          <div v-if="sales.length === 0" class="py-12 flex flex-col items-center justify-center text-center">
            <div class="w-14 h-14 rounded-full bg-[#7A1A24]/10 dark:bg-[#7A1A24]/20 flex items-center justify-center text-[#7A1A24] dark:text-[#E6C98A] mb-3 shadow-xs">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a2 2 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-sm font-bold text-stone-800 dark:text-stone-200">No Sales Transactions Recorded Yet</p>
            <p class="text-xs text-stone-400 mt-1 max-w-sm">Completed sales and orders made at the POS terminal will automatically appear here.</p>
            <NuxtLink
              to="/pos"
              class="mt-4 px-5 py-2 bg-[#7A1A24] hover:bg-[#94222E] text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all btn-press inline-flex items-center gap-1.5"
            >
              <span>+ Make First Sale</span>
            </NuxtLink>
          </div>

          <table v-else class="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr class="border-b border-stone-100 dark:border-stone-800/60 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                <th class="pb-3.5 font-bold">Reference</th>
                <th class="pb-3.5 font-bold">Customer</th>
                <th class="pb-3.5 font-bold">Date & Time</th>
                <th class="pb-3.5 font-bold">Status</th>
                <th class="pb-3.5 font-bold text-right">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100/80 dark:divide-stone-800/50 text-xs md:text-sm">
              <tr
                v-for="sale in recentSales"
                :key="sale.id"
                class="hover:bg-stone-50/70 dark:hover:bg-stone-800/30 transition-colors group cursor-pointer"
                @click="navigateTo('/sales')"
              >
                <!-- REFERENCE -->
                <td class="py-4 pr-4 font-mono font-bold text-[#7A1A24] dark:text-[#E6C98A]">
                  {{ sale.reference_no }}
                </td>

                <!-- CUSTOMER -->
                <td class="py-4 pr-4 font-semibold text-stone-800 dark:text-stone-200">
                  {{ sale.customer_name || 'Walk-in Customer' }}
                </td>

                <!-- DATE & TIME -->
                <td class="py-4 pr-4 text-stone-500 dark:text-stone-400 whitespace-nowrap">
                  <span>{{ sale.date }}</span>
                  <span v-if="sale.time" class="text-[11px] ml-1 text-stone-400">({{ sale.time }})</span>
                </td>

                <!-- STATUS PILL -->
                <td class="py-4 pr-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-block px-3 py-1 rounded-full text-xs font-bold capitalize text-center',
                      sale.sale_status === 'Completed' || sale.sale_status === 'Handed Over'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/50'
                    ]"
                  >
                    {{ sale.sale_status || 'Completed' }}
                  </span>
                </td>

                <!-- TOTAL -->
                <td class="py-4 text-right font-black text-stone-900 dark:text-white whitespace-nowrap">
                  ${{ (Number(sale.grand_total ?? sale.total) || 0).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- FOOTER -->
        <div class="pt-4 border-t border-stone-100 dark:border-stone-800/60 flex justify-between items-center text-xs">
          <span class="text-stone-400 font-medium">Boutique POS Records</span>
          <NuxtLink
            to="/sales"
            class="text-[#7A1A24] dark:text-[#C5A059] font-bold hover:underline flex items-center gap-1 btn-press"
          >
            <span>View Full Sales History</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- RIGHT CARD: STORE CATALOG & STOCK HEALTH GAUGE (Dynamic Speedometer) -->
      <div class="bg-white dark:bg-[#1C181C] rounded-3xl p-6 md:p-7 border border-stone-200/70 dark:border-stone-800/80 shadow-xs flex flex-col justify-between">
        
        <!-- HEADER -->
        <div class="flex justify-between items-center mb-4">
          <div>
            <h3 class="text-lg md:text-xl font-bold text-stone-900 dark:text-white tracking-tight">
              Stock Health
            </h3>
            <p class="text-xs text-stone-400 mt-0.5">Catalog inventory threshold status</p>
          </div>
          <span class="px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800/70 text-stone-600 dark:text-stone-300 text-xs font-bold">
            Live
          </span>
        </div>

        <!-- SPEEDOMETER GAUGE VISUAL (Dynamic Calculation from Real Products) -->
        <div class="relative flex flex-col items-center justify-center my-4">
          
          <div class="relative w-64 h-36 flex items-end justify-center overflow-visible">
            <svg viewBox="0 0 220 125" class="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="stockGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#10B981" />
                  <stop offset="60%" stop-color="#C5A059" />
                  <stop offset="100%" stop-color="#7A1A24" />
                </linearGradient>
              </defs>

              <!-- Outer Dashed Tick Marks -->
              <path
                d="M 25 110 A 85 85 0 0 1 195 110"
                fill="none"
                stroke="currentColor"
                stroke-width="6"
                stroke-dasharray="2, 5"
                class="text-stone-300 dark:text-stone-700"
              />

              <!-- Background Gauge Track -->
              <path
                d="M 30 110 A 80 80 0 0 1 190 110"
                fill="none"
                stroke="currentColor"
                stroke-width="10"
                stroke-linecap="round"
                class="text-stone-100 dark:text-stone-800"
              />

              <!-- Dynamic Active Gauge Progress Arc -->
              <path
                d="M 30 110 A 80 80 0 0 1 190 110"
                fill="none"
                stroke="url(#stockGaugeGrad)"
                stroke-width="10"
                stroke-linecap="round"
                stroke-dasharray="251"
                :stroke-dashoffset="gaugeDashOffset"
                class="transition-all duration-1000 ease-out"
              />
            </svg>

            <!-- Numeric Calibration Markers -->
            <span class="absolute left-2 bottom-0 text-[10px] font-bold text-stone-400">0%</span>
            <span class="absolute left-10 top-12 text-[10px] font-bold text-stone-400">25%</span>
            <span class="absolute left-1/2 -translate-x-1/2 -top-1 text-[10px] font-bold text-stone-400">50%</span>
            <span class="absolute right-10 top-12 text-[10px] font-bold text-stone-400">75%</span>
            <span class="absolute right-2 bottom-0 text-[10px] font-bold text-stone-400">100%</span>

            <!-- Center Display -->
            <div class="absolute bottom-1 flex flex-col items-center">
              <span class="text-3xl md:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
                {{ stockHealthPercent }}%
              </span>
              <span class="text-xs font-semibold text-stone-500 dark:text-stone-400">
                Stock Healthy
              </span>
            </div>
          </div>

        </div>

        <!-- BOTTOM REAL NUMBERS BREAKDOWN -->
        <div class="grid grid-cols-4 gap-2 pt-4 border-t border-stone-100 dark:border-stone-800/60 text-center">
          <div>
            <p class="text-base md:text-lg font-black text-stone-800 dark:text-white">{{ totalProductsCount }}</p>
            <p class="text-[10px] font-semibold text-stone-400 uppercase">Catalog</p>
          </div>
          <div>
            <p class="text-base md:text-lg font-black text-emerald-500">{{ totalProductsCount - lowStockProducts.length }}</p>
            <p class="text-[10px] font-semibold text-stone-400 uppercase">Optimal</p>
          </div>
          <div>
            <p class="text-base md:text-lg font-black text-rose-500">{{ lowStockProducts.length }}</p>
            <p class="text-[10px] font-semibold text-stone-400 uppercase">Alerts</p>
          </div>
          <div>
            <p class="text-base md:text-lg font-black text-[#C5A059]">{{ totalInvoicesCount }}</p>
            <p class="text-[10px] font-semibold text-stone-400 uppercase">Sales</p>
          </div>
        </div>

      </div>

    </div>

    <!-- LOWER SECTION: ANALYTICAL SALES REVENUE CHART & LOW STOCK ALERTS -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      <!-- SALES REVENUE CHART (Theme Maroon & Gold) -->
      <div class="xl:col-span-2 bg-white dark:bg-[#1C181C] rounded-3xl p-6 md:p-7 border border-stone-200/70 dark:border-stone-800/80 shadow-xs flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-lg md:text-xl font-bold text-stone-900 dark:text-white tracking-tight">
              Weekly Sales Trajectory
            </h3>
            <p class="text-xs text-stone-400 mt-0.5">Live store transactions vs. previous period comparison</p>
          </div>

          <span class="px-3 py-1 rounded-full bg-[#7A1A24]/10 dark:bg-[#7A1A24]/30 text-[#7A1A24] dark:text-[#E6C98A] text-xs font-bold border border-[#7A1A24]/20">
            Live Stream
          </span>
        </div>

        <div class="flex-grow relative h-72 w-full">
          <ClientOnly>
            <Line :data="chartData" :options="chartOptions" />
          </ClientOnly>
        </div>
      </div>

      <!-- LOW STOCK ALERTS CARD (Real Product Items) -->
      <div class="bg-white dark:bg-[#1C181C] rounded-3xl p-6 md:p-7 border border-stone-200/70 dark:border-stone-800/80 shadow-xs flex flex-col justify-between">
        <div class="flex justify-between items-center mb-5">
          <div>
            <h3 class="text-lg md:text-xl font-bold text-stone-900 dark:text-white tracking-tight">
              Low Stock Alerts
            </h3>
            <p class="text-xs text-stone-400 mt-0.5">Items needing replenishment</p>
          </div>
          <span class="bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full text-xs font-bold">
            {{ lowStockProducts.length }} Items
          </span>
        </div>

        <div v-if="lowStockProducts.length === 0" class="flex-grow flex flex-col items-center justify-center p-6 text-center text-stone-400">
          <div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 mb-2">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-sm font-bold text-stone-800 dark:text-stone-200">Stock Levels Optimal</p>
          <p class="text-xs text-stone-400 mt-0.5">All fabrics and boutique inventory are well stocked.</p>
        </div>

        <div v-else class="flex-grow overflow-y-auto space-y-3 pr-1 max-h-72">
          <div
            v-for="item in lowStockProducts"
            :key="item.id"
            class="flex justify-between items-center p-3 rounded-2xl border border-rose-100 dark:border-rose-950/40 bg-rose-50/40 dark:bg-rose-950/20 hover:scale-[1.01] transition-transform"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-xl border border-stone-200/60 dark:border-stone-700 flex items-center justify-center flex-shrink-0 shadow-2xs"
                :style="{ backgroundColor: item.colorCode ? `${item.colorCode}22` : '#FAF7F2' }"
              >
                <span class="w-3.5 h-3.5 rounded-full border border-black/10 shadow-2xs" :style="{ backgroundColor: item.colorCode || '#C5A059' }"></span>
              </div>
              <div>
                <p class="text-xs font-bold text-stone-900 dark:text-stone-100 truncate max-w-[140px]">{{ item.name }}</p>
                <p class="text-[10px] text-stone-400 font-mono">{{ item.code }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-xs text-rose-600 dark:text-rose-400 font-black">{{ item.stock }} {{ item.unit }}</p>
              <p class="text-[10px] text-stone-400">Min: {{ item.alert_quantity }}</p>
            </div>
          </div>
        </div>

        <NuxtLink
          to="/inventory"
          class="block text-center w-full mt-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-[#7A1A24] hover:text-white text-stone-700 dark:text-stone-200 font-bold transition text-xs btn-press"
        >
          Manage Inventory Stock
        </NuxtLink>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePosState } from '~/composables/usePosState'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
)

const selectedPeriod = ref('today')
const { products, sales } = usePosState()

// Real dynamic calculations from store state
const todaySalesTotal = computed(() => {
  return sales.value.reduce((sum, s) => sum + (Number(s.grand_total ?? s.total) || 0), 0)
})

const totalInvoicesCount = computed(() => sales.value.length)
const totalProductsCount = computed(() => products.value.length)
const lowStockProducts = computed(() => products.value.filter(p => Number(p.stock) <= Number(p.alert_quantity || 5)))

// Real recent sales (sorted newest first, top 5)
const recentSales = computed(() => {
  return [...sales.value].slice(-5).reverse()
})

// Dynamic Stock Health Percentage
const stockHealthPercent = computed(() => {
  if (totalProductsCount.value === 0) return 100
  const optimalCount = totalProductsCount.value - lowStockProducts.value.length
  return Math.round((optimalCount / totalProductsCount.value) * 100)
})

// Speedometer Dashoffset: 251 * (1 - percent / 100)
const gaugeDashOffset = computed(() => {
  const p = Math.min(Math.max(stockHealthPercent.value, 0), 100)
  return Math.round(251 * (1 - p / 100))
})

// Chart.js Configuration with Theme Red & Gold
const chartData = ref({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Store Sales ($)',
      backgroundColor: (context) => {
        const chart = context.chart
        const { ctx, chartArea } = chart
        if (!chartArea) return 'rgba(122, 26, 36, 0.2)'
        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom)
        gradient.addColorStop(0, 'rgba(122, 26, 36, 0.35)')
        gradient.addColorStop(1, 'rgba(122, 26, 36, 0.0)')
        return gradient
      },
      borderColor: '#7A1A24',
      borderWidth: 2.5,
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#7A1A24',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      fill: true,
      tension: 0.4,
      data: [0, 0, 0, 0, 0, 0, todaySalesTotal.value]
    }
  ]
})

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
        font: { size: 11, weight: 'bold' }
      }
    },
    tooltip: {
      backgroundColor: '#1C181C',
      titleColor: '#E6C98A',
      bodyColor: '#fff',
      padding: 10,
      cornerRadius: 12,
      displayColors: true,
      callbacks: {
        label: function(context) {
          return context.dataset.label + ': $' + Number(context.raw).toFixed(2)
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      border: { display: false },
      grid: {
        color: 'rgba(150, 140, 130, 0.15)',
        drawTicks: false
      },
      ticks: {
        color: '#9ca3af',
        font: { size: 11 },
        callback: function(value) {
          return '$' + value
        }
      }
    },
    x: {
      border: { display: false },
      grid: { display: false },
      ticks: {
        color: '#9ca3af',
        font: { size: 11 }
      }
    }
  },
  interaction: {
    mode: 'index',
    intersect: false
  }
})
</script>