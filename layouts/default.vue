<template>
  <div
    class="h-screen w-screen print:h-auto print:w-auto flex print:block bg-[#F6F3EE] dark:bg-[#121013] text-stone-900 dark:text-stone-100 font-sans transition-colors duration-300 overflow-hidden print:overflow-visible relative"
  >
    <AppSidebar v-model:isOpen="isSidebarOpen" />

    <!-- MAIN WRAPPER -->
    <main
      class="flex-grow flex flex-col min-w-0 bg-[#F6F3EE] dark:bg-[#121013] print:block print:overflow-visible"
    >
      <!-- MODERN TOP HEADER (Matches screenshot top bar) -->
      <header
        v-if="!isPosPage"
        class="relative z-30 h-20 bg-transparent flex items-center justify-between px-4 md:px-8 flex-shrink-0 print:hidden pt-2"
      >
        <!-- LEFT: MOBILE TOGGLE & PAGE TITLE -->
        <div class="flex items-center gap-3">
          <!-- MOBILE DRAWER BUTTON -->
          <button
            type="button"
            @click="isSidebarOpen = true"
            class="md:hidden w-10 h-10 rounded-full bg-white dark:bg-[#1C181C] border border-stone-200/80 dark:border-stone-800 flex items-center justify-center shadow-xs text-stone-700 dark:text-stone-200 btn-press cursor-pointer"
            aria-label="Open sidebar menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- PAGE TITLE -->
          <div>
            <h1 class="text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
              {{ pageTitle }}
            </h1>
          </div>
        </div>

        <!-- RIGHT: SEARCH PILL, NOTIFICATIONS, SETTINGS & USER PROFILE -->
        <div class="flex items-center gap-2 md:gap-3.5">
          <!-- SEARCH PILL (Matches Screenshot Pill) -->
          <div class="relative hidden sm:flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute left-3.5 h-4 w-4 text-stone-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search fabrics, invoices, customers..."
              class="bg-white dark:bg-[#1C181C] border border-stone-200/80 dark:border-stone-800 rounded-full pl-9.5 pr-4 py-2 text-xs md:text-sm text-stone-800 dark:text-stone-200 placeholder-stone-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:border-transparent w-44 md:w-64 focus:w-72 transition-all duration-300"
            />
          </div>

          <!-- NOTIFICATION BELL (Matches Screenshot Circular Button) -->
          <button
            type="button"
            class="relative w-10 h-10 rounded-full bg-white dark:bg-[#1C181C] border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-all btn-press cursor-pointer"
            aria-label="Notifications"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <!-- Pulsing Notification Dot -->
            <span class="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#1C181C] pulse-dot"></span>
          </button>

          <!-- DARK / LIGHT MODE SWITCH -->
          <button
            type="button"
            @click.stop="toggleColorMode"
            class="w-10 h-10 rounded-full bg-white dark:bg-[#1C181C] border border-stone-200/80 dark:border-stone-800 shadow-xs flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-all btn-press cursor-pointer"
            aria-label="Toggle dark mode"
          >
            <svg v-if="colorMode.preference === 'dark'" xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-[#E6C98A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>

          <!-- LANGUAGE SELECTOR PILL -->
          <select
            :value="locale"
            @change="changeLocale"
            aria-label="Select display language"
            class="hidden md:block bg-white dark:bg-[#1C181C] text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-800 text-xs font-bold rounded-full px-3 py-2 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#C5A059] cursor-pointer btn-press"
          >
            <option value="en">EN</option>
            <option value="km">KM</option>
            <option value="zh">ZH</option>
          </select>

          <!-- USER PROFILE PILL -->
          <div
            class="bg-white dark:bg-[#1C181C] border border-stone-200/80 dark:border-stone-800 rounded-full px-2.5 py-1.5 flex items-center gap-2.5 shadow-xs hover:shadow-md transition-all cursor-pointer btn-press"
          >
            <!-- User Avatar -->
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7A1A24] to-[#C5A059] flex items-center justify-center text-white font-bold text-xs shadow-xs">
              AD
            </div>
            <!-- Name & Role -->
            <div class="hidden sm:flex flex-col text-left pr-1">
              <span class="text-xs font-bold text-stone-900 dark:text-stone-100 leading-tight">
                Admin User
              </span>
              <span class="text-[10px] text-stone-400 font-medium leading-none mt-0.5">
                Boutique Cashier
              </span>
            </div>
            <!-- Dropdown Chevron -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </header>

      <!-- PAGE CONTENT AREA -->
      <div class="flex-grow overflow-auto relative print:overflow-visible">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()
const isPosPage = computed(() => route.path === '/pos')

const colorMode = useColorMode()
const { locale, setLocale, t } = useI18n()
const { isSidebarOpen } = useLayoutState()

const pageTitle = computed(() => {
  const path = route.path
  if (path === '/dashboard' || path === '/') return 'Dashboard'
  if (path === '/inventory') return 'Inventory Catalog'
  if (path === '/categories') return 'Categories'
  if (path === '/units') return 'Units of Measurement'
  if (path === '/colors') return 'Color Palette'
  if (path === '/adjustments') return 'Stock Adjustments'
  if (path === '/sales') return 'Sales & Orders'
  if (path === '/reports') return 'Reports & Analytics'
  if (path === '/users') return 'Users & Staff'
  if (path === '/groups') return 'Roles & Groups'
  if (path === '/activity-logs') return 'Activity Logs'
  return 'Dashboard'
})

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const changeLocale = async (event: Event) => {
  const target = event.target as HTMLSelectElement
  const value = target.value

  if (value === 'en' || value === 'km' || value === 'zh') {
    await setLocale(value)
  }
}
</script>