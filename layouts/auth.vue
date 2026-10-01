<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-4">
    <!-- ClientOnly -->
    <div class="absolute top-4 right-4">
      <ClientOnly>
        <button @click="toggleColorMode" class="p-2 rounded-lg bg-white dark:bg-themeDark hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 transition w-10 h-10 flex items-center justify-center text-lg cursor-pointer">
          <span v-if="colorMode.value === 'dark'">🌙</span>
          <span v-else>☀️</span>
        </button>
        <template #fallback>
          <div class="w-10 h-10"></div>
        </template>
      </ClientOnly>
    </div>
    <slot />
  </div>
</template>

<script setup>
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
