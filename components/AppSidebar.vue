<template>
  <div class="contents">
    <!-- MOBILE BACKDROP -->
    <div
      v-if="isOpen"
      @click="closeSidebar()"
      class="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity"
    ></div>

    <!-- SIDEBAR -->
    <aside
      :class="[
        isCollapsed ? 'md:w-20' : 'md:w-64',
        'w-64 bg-themeDarkRed dark:bg-[#1A1D26] border-r border-themeDarkRed dark:border-gray-800 flex flex-col shadow-lg z-30 flex-shrink-0 print:hidden absolute md:relative h-full transition-all duration-300 ease-in-out text-gray-300',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <!-- HEADER & LOGO -->
      <div
        :class="[
          isCollapsed ? 'p-3 flex-col justify-center' : 'p-4 md:p-5 justify-between',
          'border-b border-themeRed/50 dark:border-gray-800 flex items-center gap-2'
        ]"
      >
        <div class="flex items-center gap-3 overflow-hidden">
          <div
            class="w-10 h-10 bg-white/10 rounded-lg flex flex-col items-center justify-center overflow-hidden border border-dashed border-gray-400/50 relative flex-shrink-0"
            :title="isCollapsed ? 'POS - Fabrics & Boutique' : ''"
          >
            <span class="text-[9px] text-themeGold font-black uppercase text-center leading-none">
              POS
            </span>
          </div>

          <div v-if="!isCollapsed" class="flex flex-col min-w-0 transition-opacity duration-200">
            <h1 class="text-lg font-bold text-white leading-none tracking-wider truncate">
              FABRICS
            </h1>
            <span class="text-[10px] text-gray-400 font-medium truncate mt-0.5">
              Boutique POS
            </span>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <!-- DESKTOP COLLAPSE TOGGLE -->
          <button
            type="button"
            @click="isCollapsed = !isCollapsed"
            class="hidden md:flex p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 dark:hover:bg-[#252936] transition items-center justify-center"
            :title="isCollapsed ? 'Expand Sidebar' : 'Collapse to Rail'"
          >
            <svg
              v-if="!isCollapsed"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>

          <!-- MOBILE CLOSE -->
          <button
            type="button"
            @click="closeSidebar()"
            class="md:hidden text-gray-400 hover:text-white p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- NAVIGATION -->
      <nav class="flex-grow p-3 space-y-1 overflow-y-auto">
        <!-- PRIMARY (POS & DASHBOARD) -->
        <div class="mb-3 space-y-2 pb-3 border-b border-gray-700/50 dark:border-gray-800">
          <!-- POS -->
          <NuxtLink
            to="/pos"
            @click="closeSidebar()"
            :class="[
              isCollapsed ? 'justify-center px-2 py-3' : 'justify-center px-4 py-3 gap-2',
              'flex items-center bg-gradient-to-r from-themeGold to-yellow-600 text-gray-900 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all font-black uppercase tracking-wider'
            ]"
            active-class="ring-4 ring-yellow-600/50 shadow-inner"
            :title="$t('pos')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 flex-shrink-0"
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
            <span v-if="!isCollapsed">{{ $t('pos') }}</span>
          </NuxtLink>

          <!-- DASHBOARD -->
          <NuxtLink
            to="/dashboard"
            @click="closeSidebar()"
            :class="[
              isCollapsed ? 'justify-center px-2 py-2.5' : 'px-4 py-2.5 gap-3',
              'flex items-center bg-white/5 border border-white/10 dark:bg-[#252936] dark:border-gray-700 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700 transition font-bold text-white shadow-sm'
            ]"
            active-class="bg-themeRed border-themeRed shadow-inner"
            :title="$t('dashboard')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-themeGold flex-shrink-0"
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
            <span v-if="!isCollapsed">{{ $t('dashboard') }}</span>
          </NuxtLink>
        </div>

        <!-- SECTION: INVENTORY -->
        <div class="pt-1 pb-1">
          <p
            v-if="!isCollapsed"
            class="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
          >
            Inventory
          </p>
          <div v-else class="my-1 border-t border-gray-700/40"></div>
        </div>

        <NuxtLink
          to="/inventory"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2 gap-3',
            'flex items-center rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white'
          ]"
          active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          :title="$t('inventory')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('inventory') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/categories"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2 gap-3',
            'flex items-center rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white'
          ]"
          active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          :title="$t('categories')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('categories') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/units"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2 gap-3',
            'flex items-center rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white'
          ]"
          active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          :title="$t('units')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('units') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/colors"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2 gap-3',
            'flex items-center rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white'
          ]"
          active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          :title="$t('colors')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('colors') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/adjustments"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2 gap-3',
            'flex items-center rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white'
          ]"
          active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          :title="$t('adjustments')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('adjustments') }}</span>
        </NuxtLink>

        <!-- SECTION: MANAGEMENT -->
        <div class="pt-3 pb-1">
          <p
            v-if="!isCollapsed"
            class="px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider"
          >
            Management
          </p>
          <div v-else class="my-1 border-t border-gray-700/40"></div>
        </div>

        <NuxtLink
          to="/sales"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2 gap-3',
            'flex items-center rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white'
          ]"
          active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          :title="$t('sales')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('sales') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/users"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2 gap-3',
            'flex items-center rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white'
          ]"
          active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          :title="$t('users')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('users') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/groups"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2 gap-3',
            'flex items-center rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white'
          ]"
          active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          :title="$t('roles_groups')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('roles_groups') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/activity-logs"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2 gap-3',
            'flex items-center rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white'
          ]"
          active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          :title="$t('activity_logs')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a2 2 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('activity_logs') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/reports"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2 gap-3',
            'flex items-center rounded-lg hover:bg-themeRed transition font-semibold capitalize hover:text-white'
          ]"
          active-class="bg-themeRed text-white border-l-4 border-themeGold rounded-l-none"
          :title="$t('reports')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-75 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a2 2 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('reports') }}</span>
        </NuxtLink>

        <!-- LOGOUT -->
        <div class="mt-6 border-t border-gray-700/50 dark:border-gray-800 pt-3 pb-3">
          <button
            type="button"
            @click="logout"
            :class="[
              isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2 gap-3',
              'w-full flex items-center rounded-lg hover:bg-red-900/50 text-red-400 hover:text-red-300 transition font-bold'
            ]"
            title="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 flex-shrink-0"
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
            <span v-if="!isCollapsed">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits<{ (e: 'update:isOpen', value: boolean): void }>()

const isCollapsed = ref(false)

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
