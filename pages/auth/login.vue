<template>
  <div class="w-full max-w-md p-8 bg-white dark:bg-themeDark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
    <div class="text-center mb-8">
      <div class="w-16 h-16 bg-themeRed/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-themeRed/20">
        <h1 class="text-2xl font-bold text-themeRed">POS</h1>
      </div>
      <h2 class="text-2xl font-extrabold text-gray-900 dark:text-white">Welcome Back</h2>
      <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Sign in to your account</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-5">
      <div>
        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Username or Email</label>
        <input type="text" v-model="form.username" required class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-themeGold transition" placeholder="Enter username or email" />
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Password</label>
        <input type="password" v-model="form.password" required class="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-themeGold transition" placeholder="••••••••" />
      </div>

      <div class="flex items-center justify-between">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" class="rounded text-themeRed focus:ring-themeRed" />
          <span class="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
        </label>
        <a href="#" class="text-sm font-bold text-themeGold hover:text-yellow-600">Forgot Password?</a>
      </div>

      <button type="submit" class="w-full py-3 bg-themeRed hover:bg-red-800 text-white font-bold rounded-lg shadow-md transition uppercase tracking-wide">
        Sign In
      </button>
    </form>

    <div class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
      Don't have an account? 
      <NuxtLink to="/auth/register" class="font-bold text-themeGold hover:text-yellow-600 ml-1">Create Account</NuxtLink>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'auth'
})

const router = useRouter()
const form = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  const { showAlert } = useUiAlert()
  // Mock login process
  await showAlert(`Logging in with ${form.username}...`, 'Success', 'success')
  router.push('/dashboard')
}
</script>
