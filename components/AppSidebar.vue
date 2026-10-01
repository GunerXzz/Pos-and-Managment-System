<template>
  <div class="contents">
      <!-- MOBILE -->
      <div
        v-if="isOpen"
        @click="closeSidebar()"
        class="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
      ></div>
  
      <!-- SIDEBAR -->
      <aside
        :class="[
          'w-64 bg-themeDarkRed border-r border-themeDarkRed dark:bg-themeDark flex flex-col shadow-lg z-30 flex-shrink-0 print:hidden absolute md:relative h-full transition-transform duration-300 ease-in-out text-gray-300',
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        ]"
      >
        <!-- LOGO -->
        <div
          class="p-6 border-b border-themeRed flex justify-between items-center"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 bg-white/5 rounded-lg flex flex-col items-center justify-center overflow-hidden border border-dashed border-gray-500/50 relative flex-shrink-0"
            >
              <span
                class="text-[8px] text-gray-400 font-bold uppercase text-center absolute leading-tight"
              >
                Logo<br />Here
              </span>
  
              <!-- img -->
            </div>
  
            <div class="flex flex-col">
              <h1
                class="text-xl font-bold text-white leading-none tracking-wider"
              >
                POS
              </h1>
  
              <span class="text-[10px] text-gray-400 font-medium">
                Point of Sale
              </span>
            </div>
          </div>
  
          <!-- MOBILE -->
          <button
            type="button"
            @click="closeSidebar()"
            class="md:hidden text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
  
        <!-- NAVIGATION -->
        <nav class="flex-grow p-4 space-y-1 overflow-y-auto">
  
          <!-- PRIMARY -->
          <div class="mb-4 space-y-3 pb-4 border-b border-gray-700/50">
  
            <!-- POS -->
            <NuxtLink
              to="/pos"
              @click="closeSidebar()"
              class="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-themeGold to-yellow-600 text-gray-900 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all font-black uppercase tracking-wider"
              active-class="ring-4 ring-yellow-600/50 shadow-inner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
  
              {{ $t('pos') }}
            </NuxtLink>
  
            <!-- DASHBOARD -->
            <NuxtLink
              to="/dashboard"
              @click="closeSidebar()"
              class="flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition font-bold text-white shadow-sm"
              active-class="bg-themeRed border-themeRed shadow-inner"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-themeGold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
  
              {{ $t('dashboard') }}
            </NuxtLink>
          </div>
  
          <!-- INVENTORY -->
          <div class="pb-2">
            <p
              class="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider"
            >
              Inventory
            </p>
          </div>
  
          <!-- INVENTORY -->
          <NuxtLink
            to="/inventory"
            @click="closeSidebar()"
            class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white"
            active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
  
            {{ $t('inventory') }}
          </NuxtLink>
  
          <!-- CATEGORIES -->
          <NuxtLink
            to="/categories"
            @click="closeSidebar()"
            class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white"
            active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
  
            {{ $t('categories') }}
          </NuxtLink>
  
          <!-- UNITS -->
          <NuxtLink
            to="/units"
            @click="closeSidebar()"
            class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white"
            active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
  
            {{ $t('units') }}
          </NuxtLink>
  
          <!-- COLORS -->
          <NuxtLink
            to="/colors"
            @click="closeSidebar()"
            class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white"
            active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
              />
            </svg>
  
            {{ $t('colors') }}
          </NuxtLink>
  
          <!-- ADJUSTMENTS -->
          <NuxtLink
            to="/adjustments"
            @click="closeSidebar()"
            class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white"
            active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
  
            {{ $t('adjustments') }}
          </NuxtLink>
  
          <!-- MANAGEMENT -->
          <div class="pt-4 pb-2">
            <p
              class="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider"
            >
              Management
            </p>
          </div>
  
          <!-- SALES -->
          <NuxtLink
            to="/sales"
            @click="closeSidebar()"
            class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white"
            active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
  
            {{ $t('sales') }}
          </NuxtLink>
  
          <!-- USERS -->
          <NuxtLink
            to="/users"
            @click="closeSidebar()"
            class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white"
            active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
  
            {{ $t('users') }}
          </NuxtLink>
  
          <!-- GROUPS -->
          <NuxtLink
            to="/groups"
            @click="closeSidebar()"
            class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white"
            active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
  
            {{ $t('roles_groups') }}
          </NuxtLink>
  
          <!-- ACTIVITY -->
          <NuxtLink
            to="/activity-logs"
            @click="closeSidebar()"
            class="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white"
            active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 opacity-75"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a2 2 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
  
            {{ $t('activity_logs') }}
          </NuxtLink>
  
          <!-- LOGOUT -->
          <div class="mt-8 border-t border-gray-700/50 pt-4 pb-4">
            <button
              type="button"
              @click="logout"
              class="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-900/50 text-red-400 hover:text-red-300 transition font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
  
              Logout
            </button>
          </div>
        </nav>
      </aside>
  
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ (e: 'update:isOpen', value: boolean): void }>()

const closeSidebar = () => {
  emit('update:isOpen', false)
}

const logout = async () => {
  const { showConfirm } = useUiAlert()
  const result = await showConfirm(
    'Are you sure you want to log out?',
    'Logout'
  )
  if (result.isConfirmed) {
    await navigateTo('/auth/login')
  }
}
</script>
