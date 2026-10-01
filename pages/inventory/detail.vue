<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100 overflow-y-auto">
    <div class="flex items-center justify-between mb-6 md:mb-8 border-b-2 border-themeGold pb-4">
      <div class="flex items-center gap-4">
        <NuxtLink to="/inventory" class="w-10 h-10 bg-gray-200 dark:bg-themeDark rounded-full flex items-center justify-center hover:bg-themeGold hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">Product Details</h1>
          <p class="text-xs md:text-sm text-gray-500 mt-1">Viewing information for PRD-1001</p>
        </div>
      </div>
      <NuxtLink to="/inventory/edit" class="bg-themeGold hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-bold shadow-md transition">
        Edit Product
      </NuxtLink>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
      <div class="flex flex-col md:flex-row gap-8">
        
        <!-- Image -->
        <div class="w-full md:w-1/3 flex flex-col items-center border-r-0 md:border-r border-gray-200 dark:border-gray-800 pr-0 md:pr-8">
          <img src="https://placehold.co/300x300/DC143C/white?text=Silk" alt="Product Image" class="w-48 h-48 rounded-xl object-cover border border-gray-300 shadow-sm mb-6" />
          <div class="w-full text-center p-4 bg-gray-50 dark:bg-themeDark rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 class="font-bold text-gray-500 uppercase text-xs tracking-wider mb-2">Barcode</h3>
            <div class="font-mono text-xl font-bold tracking-widest">PRD-1001</div>
            <div class="text-xs text-gray-400 mt-1">Symbology: CODE128</div>
          </div>
        </div>

        <!-- Details -->
        <div class="w-full md:w-2/3 space-y-6">
          <div>
            <h2 class="text-2xl font-black text-gray-800 dark:text-white">Premium Red Silk</h2>
            <div class="flex items-center gap-2 mt-2">
              <span class="bg-themeRed text-white px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm">Category ID: 2</span>
              <div class="flex items-center gap-1 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded-full bg-white dark:bg-themeDark">
                <span class="w-3 h-3 rounded-full bg-[#DC143C]"></span>
                <span class="text-xs font-bold text-gray-600 dark:text-gray-300">Color ID: 1 (Crimson)</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Cost Price</p>
              <p class="text-xl font-bold text-gray-800 dark:text-gray-200">$10.00</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Selling Price</p>
              <p class="text-xl font-bold text-themeGold">$15.50</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Current Stock</p>
              <p class="text-xl font-bold text-themeGold">45.5 m</p>
            </div>
            
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Base Unit</p>
              <p class="font-bold text-gray-800 dark:text-gray-200">ID: 1 (Meter)</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Purchase Unit</p>
              <p class="font-bold text-gray-800 dark:text-gray-200">ID: 1 (Meter)</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Sale Unit</p>
              <p class="font-bold text-gray-800 dark:text-gray-200">ID: 1 (Meter)</p>
            </div>
          </div>
          
          <div class="pt-4 border-t border-gray-100 dark:border-gray-800">
            <p class="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Stock Alerts</p>
            <p class="text-sm font-semibold">Alert when stock falls below: <span class="text-themeRed font-bold">10</span></p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
