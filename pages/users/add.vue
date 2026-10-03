<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100 overflow-y-auto">
    <div class="flex items-center justify-between mb-6 md:mb-8 border-b-2 border-themeGold pb-4">
      <div class="flex items-center gap-4">
        <NuxtLink to="/users" class="w-10 h-10 bg-gray-200 dark:bg-themeDark rounded-full flex items-center justify-center hover:bg-themeGold hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">Add User</h1>
          <p class="text-xs md:text-sm text-gray-500 mt-1">Create a new system user</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-4xl">
      <form @submit.prevent="submitForm" class="space-y-6">
        
        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2">Profile Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="col-span-1 md:col-span-2">
            <label class="block text-sm font-bold mb-2">Full Name <span class="text-themeRed">*</span></label>
            <input type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" placeholder="e.g. Sok Chea" required />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Username <span class="text-themeRed">*</span></label>
            <input type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" placeholder="e.g. sokchea" required />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Password <span class="text-themeRed">*</span></label>
            <input type="password" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" placeholder="••••••••" required />
          </div>
        </div>

        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2 mt-8">Contact Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Email Address</label>
            <input type="email" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" placeholder="e.g. sokchea@fabricshop.com" />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Phone Number</label>
            <input type="tel" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" placeholder="e.g. +855 98 765 432" />
          </div>
        </div>

        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2 mt-8">Access & Permissions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Role (Group) <span class="text-themeRed">*</span></label>
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" required>
              <option value="">Select Role</option>
              <option value="1">Admin</option>
              <option value="2">Cashier</option>
              <option value="3">Manager</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Status <span class="text-themeRed">*</span></label>
            <select class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" required>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <NuxtLink to="/users" class="px-6 py-2 rounded-lg font-bold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Cancel
          </NuxtLink>
          <button type="submit" class="bg-themeRed hover:bg-red-800 text-white px-8 py-2 rounded-lg font-bold shadow-md transition">
            Save User
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const submitForm = () => {
  router.push('/users')
}
</script>
