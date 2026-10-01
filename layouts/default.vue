<template>
  <div
    class="h-screen w-screen print:h-auto print:w-auto flex print:block bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300 overflow-hidden print:overflow-visible relative"
  >
    <AppSidebar v-model:isOpen="isSidebarOpen" />

    <!-- MAIN -->
    <main
      class="flex-grow flex flex-col min-w-0 bg-gray-50 dark:bg-gray-950 print:block print:overflow-visible"
    >
      <!-- TOP -->
      <header
        class="relative z-50 h-16 bg-white dark:bg-themeDark border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6 shadow-sm flex-shrink-0 print:hidden"
      >
        <div class="flex items-center gap-4">

          <!-- MOBILE -->
          <button
            type="button"
            @click="isSidebarOpen = true"
            class="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <span
            class="text-sm font-semibold text-gray-500 capitalize hidden sm:inline"
          >
            {{ $t('logged_in') }}

            <span class="text-themeRed dark:text-themeGold font-bold">
              Admin User
            </span>
          </span>
        </div>

        <div class="flex items-center gap-2 md:gap-4">

          <!-- LANGUAGE -->
          <select
            :value="locale"
            @change="changeLocale"
            class="bg-gray-100 dark:bg-themeDark border-none text-sm font-bold rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-themeGold cursor-pointer"
          >
            <option value="en">🇬🇧 EN</option>
            <option value="km">🇰🇭 KM</option>
            <option value="zh">🇨🇳 ZH</option>
          </select>

          <!-- DARK -->
          <button
            type="button"
            @click.stop="toggleColorMode"
            class="relative z-50 p-2 rounded-lg bg-gray-100 dark:bg-themeDark hover:bg-gray-200 dark:hover:bg-gray-700 transition w-10 h-10 flex items-center justify-center text-lg cursor-pointer"
            aria-label="Toggle dark mode"
          >
            <span v-if="colorMode.preference === 'dark'">
              🌙
            </span>

            <span v-else>
              ☀️
            </span>
          </button>

        </div>
      </header>

      <!-- PAGE -->
      <div
        class="flex-grow overflow-auto relative print:overflow-visible"
      >
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const colorMode = useColorMode()
const { locale, setLocale } = useI18n()
const isSidebarOpen = ref(false)

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