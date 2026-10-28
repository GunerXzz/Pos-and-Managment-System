<template>
  <div class="contents">
    <!-- MOBILE BACKDROP -->
    <div
      v-if="isOpen"
      @click="closeSidebar()"
      class="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity"
    ></div>

    <!-- SIDEBAR -->
    <aside
      :class="[
        isCollapsed ? 'md:w-20' : 'md:w-64',
        'w-64 bg-[#230A0E] dark:bg-[#150E12] border-r border-[#3E1218] dark:border-stone-800/80 flex flex-col shadow-2xl z-50 flex-shrink-0 print:hidden absolute md:relative h-full transition-all duration-300 ease-in-out text-stone-300 select-none',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      ]"
    >
      <!-- HEADER & BRAND LOGO -->
      <div
        :class="[
          isCollapsed ? 'p-3 flex-col justify-center gap-3' : 'px-5 py-5 justify-between',
          'border-b border-[#3E1218] dark:border-stone-800/80 flex items-center gap-2'
        ]"
      >
        <div class="flex items-center gap-3 overflow-hidden">
          <!-- Stylized Pidan Khmer Silk Brand Emblem -->
          <div
            class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7A1A24] to-[#C5A059] p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.3)] relative flex-shrink-0 group cursor-pointer"
            :title="isCollapsed ? 'Pidan Khmer Silk POS' : ''"
          >
            <div class="w-full h-full bg-[#230A0E] dark:bg-[#150E12] rounded-[14px] flex items-center justify-center">
              <span class="text-xs font-serif font-black text-[#C5A059] tracking-wider uppercase">
                PK
              </span>
            </div>
          </div>

          <div v-if="!isCollapsed" class="flex flex-col min-w-0 transition-opacity duration-200">
            <h1 class="text-sm font-serif font-black text-white tracking-widest uppercase truncate leading-tight">
              PIDAN KHMER
            </h1>
            <span class="text-[10px] text-[#C5A059] font-medium tracking-wide truncate mt-0.5">
              ពិតានសូត្រខ្មែរ • Boutique POS
            </span>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <!-- COLLAPSE TOGGLE (Circular < > Button) -->
          <button
            type="button"
            @click="isCollapsed = !isCollapsed"
            class="hidden md:flex w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-all items-center justify-center cursor-pointer btn-press border border-white/10 shadow-xs"
            :title="isCollapsed ? 'Expand Sidebar' : 'Collapse to Rail'"
            :aria-label="isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar to Rail'"
          >
            <svg
              v-if="!isCollapsed"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- MOBILE CLOSE BUTTON -->
          <button
            type="button"
            @click="closeSidebar()"
            class="md:hidden text-stone-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 cursor-pointer"
            aria-label="Close sidebar menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- PROMINENT POS BUTTON (Theme Gold Brand Pill) -->
      <div class="p-4 pb-2">
        <NuxtLink
          to="/pos"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'w-12 h-12 justify-center mx-auto' : 'w-full py-3 px-4 justify-start gap-3',
            'flex items-center bg-gradient-to-r from-[#C5A059] to-[#E6C98A] text-stone-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 btn-press group'
          ]"
          :title="$t('pos')"
        >
          <div class="w-7 h-7 rounded-full bg-[#7A1A24] flex items-center justify-center text-[#E6C98A] flex-shrink-0 shadow-xs group-hover:rotate-90 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div v-if="!isCollapsed" class="flex flex-col text-left">
            <span class="text-xs font-black uppercase tracking-wider text-stone-900 leading-none">
              {{ $t('pos') }}
            </span>
            <span class="text-[10px] text-stone-800/80 font-bold mt-0.5">
              Point of Sale Terminal
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- NAVIGATION -->
      <nav class="flex-grow p-3 space-y-1.5 overflow-y-auto">
        <!-- PRIMARY: DASHBOARD -->
        <NuxtLink
          to="/dashboard"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-2.5 gap-3.5',
            'flex items-center rounded-2xl transition-all duration-200 btn-press font-semibold text-sm',
            $route.path === '/dashboard' || $route.path === '/'
              ? 'bg-[#7A1A24] text-white shadow-md font-bold'
              : 'text-stone-300 hover:text-white hover:bg-white/10 hover:translate-x-1'
          ]"
          :title="$t('dashboard')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            :class="[
              'h-5 w-5 flex-shrink-0 transition-colors',
              $route.path === '/dashboard' || $route.path === '/' ? 'text-[#E6C98A]' : 'text-stone-400'
            ]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span v-if="!isCollapsed">{{ $t('dashboard') }}</span>
        </NuxtLink>

        <!-- SECTION: INVENTORY -->
        <div class="pt-3 pb-1">
          <p
            v-if="!isCollapsed"
            class="px-4 text-[11px] font-bold text-stone-400 uppercase tracking-wider"
          >
            Fabric & Inventory
          </p>
          <div v-else class="my-1 border-t border-white/10"></div>
        </div>

        <NuxtLink
          to="/inventory"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-2.5 gap-3.5',
            'flex items-center rounded-2xl transition-all duration-200 btn-press font-semibold text-sm',
            $route.path === '/inventory'
              ? 'bg-[#7A1A24] text-white shadow-md font-bold'
              : 'text-stone-300 hover:text-white hover:bg-white/10 hover:translate-x-1'
          ]"
          :title="$t('inventory')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5 flex-shrink-0', $route.path === '/inventory' ? 'text-[#E6C98A]' : 'text-stone-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('inventory') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/categories"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-2.5 gap-3.5',
            'flex items-center rounded-2xl transition-all duration-200 btn-press font-semibold text-sm',
            $route.path === '/categories'
              ? 'bg-[#7A1A24] text-white shadow-md font-bold'
              : 'text-stone-300 hover:text-white hover:bg-white/10 hover:translate-x-1'
          ]"
          :title="$t('categories')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5 flex-shrink-0', $route.path === '/categories' ? 'text-[#E6C98A]' : 'text-stone-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('categories') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/units"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-2.5 gap-3.5',
            'flex items-center rounded-2xl transition-all duration-200 btn-press font-semibold text-sm',
            $route.path === '/units'
              ? 'bg-[#7A1A24] text-white shadow-md font-bold'
              : 'text-stone-300 hover:text-white hover:bg-white/10 hover:translate-x-1'
          ]"
          :title="$t('units')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5 flex-shrink-0', $route.path === '/units' ? 'text-[#E6C98A]' : 'text-stone-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('units') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/colors"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-2.5 gap-3.5',
            'flex items-center rounded-2xl transition-all duration-200 btn-press font-semibold text-sm',
            $route.path === '/colors'
              ? 'bg-[#7A1A24] text-white shadow-md font-bold'
              : 'text-stone-300 hover:text-white hover:bg-white/10 hover:translate-x-1'
          ]"
          :title="$t('colors')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5 flex-shrink-0', $route.path === '/colors' ? 'text-[#E6C98A]' : 'text-stone-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('colors') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/adjustments"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-2.5 gap-3.5',
            'flex items-center rounded-2xl transition-all duration-200 btn-press font-semibold text-sm',
            $route.path === '/adjustments'
              ? 'bg-[#7A1A24] text-white shadow-md font-bold'
              : 'text-stone-300 hover:text-white hover:bg-white/10 hover:translate-x-1'
          ]"
          :title="$t('adjustments')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5 flex-shrink-0', $route.path === '/adjustments' ? 'text-[#E6C98A]' : 'text-stone-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('adjustments') }}</span>
        </NuxtLink>

        <!-- SECTION: MANAGEMENT -->
        <div class="pt-3 pb-1">
          <p
            v-if="!isCollapsed"
            class="px-4 text-[11px] font-bold text-stone-400 uppercase tracking-wider"
          >
            Orders & Management
          </p>
          <div v-else class="my-1 border-t border-white/10"></div>
        </div>

        <NuxtLink
          to="/sales"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-2.5 gap-3.5',
            'flex items-center rounded-2xl transition-all duration-200 btn-press font-semibold text-sm',
            $route.path === '/sales'
              ? 'bg-[#7A1A24] text-white shadow-md font-bold'
              : 'text-stone-300 hover:text-white hover:bg-white/10 hover:translate-x-1'
          ]"
          :title="$t('sales')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5 flex-shrink-0', $route.path === '/sales' ? 'text-[#E6C98A]' : 'text-stone-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('sales') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/reports"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-2.5 gap-3.5',
            'flex items-center rounded-2xl transition-all duration-200 btn-press font-semibold text-sm',
            $route.path === '/reports'
              ? 'bg-[#7A1A24] text-white shadow-md font-bold'
              : 'text-stone-300 hover:text-white hover:bg-white/10 hover:translate-x-1'
          ]"
          :title="$t('reports')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5 flex-shrink-0', $route.path === '/reports' ? 'text-[#E6C98A]' : 'text-stone-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('reports') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/users"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-2.5 gap-3.5',
            'flex items-center rounded-2xl transition-all duration-200 btn-press font-semibold text-sm',
            $route.path === '/users'
              ? 'bg-[#7A1A24] text-white shadow-md font-bold'
              : 'text-stone-300 hover:text-white hover:bg-white/10 hover:translate-x-1'
          ]"
          :title="$t('users')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5 flex-shrink-0', $route.path === '/users' ? 'text-[#E6C98A]' : 'text-stone-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('users') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/groups"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-2.5 gap-3.5',
            'flex items-center rounded-2xl transition-all duration-200 btn-press font-semibold text-sm',
            $route.path === '/groups'
              ? 'bg-[#7A1A24] text-white shadow-md font-bold'
              : 'text-stone-300 hover:text-white hover:bg-white/10 hover:translate-x-1'
          ]"
          :title="$t('roles_groups')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5 flex-shrink-0', $route.path === '/groups' ? 'text-[#E6C98A]' : 'text-stone-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('roles_groups') }}</span>
        </NuxtLink>

        <NuxtLink
          to="/activity-logs"
          @click="closeSidebar()"
          :class="[
            isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-2.5 gap-3.5',
            'flex items-center rounded-2xl transition-all duration-200 btn-press font-semibold text-sm',
            $route.path === '/activity-logs'
              ? 'bg-[#7A1A24] text-white shadow-md font-bold'
              : 'text-stone-300 hover:text-white hover:bg-white/10 hover:translate-x-1'
          ]"
          :title="$t('activity_logs')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" :class="['h-5 w-5 flex-shrink-0', $route.path === '/activity-logs' ? 'text-[#E6C98A]' : 'text-stone-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span v-if="!isCollapsed">{{ $t('activity_logs') }}</span>
        </NuxtLink>

        <!-- LOGOUT -->
        <div class="mt-6 border-t border-white/10 pt-3 pb-3">
          <button
            type="button"
            @click="logout"
            :class="[
              isCollapsed ? 'justify-center px-2 py-3' : 'px-4 py-2.5 gap-3.5',
              'w-full flex items-center rounded-2xl hover:bg-rose-950/40 text-rose-300 hover:text-rose-200 transition-all font-semibold text-sm btn-press cursor-pointer'
            ]"
            title="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span v-if="!isCollapsed">Sign Out</span>
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
    'Are you sure you want to sign out?',
    'Logout'
  )
  if (result?.isConfirmed) {
    await navigateTo('/auth/login')
  }
}
</script>
