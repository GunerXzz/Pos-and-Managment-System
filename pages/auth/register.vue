<template>
  <div class="w-full max-w-xl p-8 bg-white dark:bg-themeDark rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 my-8">
    <div class="text-center mb-6">
      <div class="w-12 h-12 bg-themeGold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-themeGold/20">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-themeGold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
      </div>
      <h2 class="text-2xl font-extrabold text-gray-900 dark:text-white">Create an Account</h2>
      <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">Register to access the POS system</p>
    </div>

    <!-- Notification -->
    <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg flex gap-3 items-start">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <p class="text-sm text-blue-800 dark:text-blue-300 font-medium">
        <span class="font-bold">Note:</span> New accounts are created without roles. An administrator must assign you a role (group) before you can access the dashboard.
      </p>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div class="mb-4">
        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
        <input type="text" v-model="form.name" required class="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-themeGold transition" placeholder="John Doe" />
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Username</label>
        <input type="text" v-model="form.username" required class="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-themeGold transition" placeholder="johndoe123" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input type="email" v-model="form.email" required class="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-themeGold transition" placeholder="john@example.com" />
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Phone</label>
          <input type="tel" v-model="form.phone" class="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-themeGold transition" placeholder="+123456789" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Password</label>
        <input type="password" v-model="form.password" required class="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-themeGold transition" placeholder="••••••••" />
      </div>

      <button type="submit" class="w-full py-3 mt-6 bg-themeGold hover:bg-yellow-600 text-white font-bold rounded-lg shadow-md transition uppercase tracking-wide">
        Register Account
      </button>
    </form>

    <div class="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
      Already have an account? 
      <NuxtLink to="/auth/login" class="font-bold text-themeRed hover:text-red-800 ml-1">Sign In</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'auth'
})

const router = useRouter()

// Mapping directly to the bpas_users structure you provided
const form = reactive({
  name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  group_id: null, // Default: no role assigned yet
  status_id: 0 // Default: pending activation
})

const handleRegister = async () => {
  const { showAlert } = useUiAlert()
  // In a real app, you would send `form` to your backend API here
  await showAlert(`Account created for ${form.username}!\n\nPlease wait for an administrator to assign your role.`, 'Success', 'success')
  router.push('/auth/login')
}
</script>
