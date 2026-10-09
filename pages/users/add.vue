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
          <p class="text-xs md:text-sm text-gray-500 mt-1">Create a new system user or cashier</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-4xl">
      <form @submit.prevent="submitForm" class="space-y-6">
        
        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2">Profile Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="col-span-1 md:col-span-2">
            <label class="block text-sm font-bold mb-2">Full Name <span class="text-themeRed">*</span></label>
            <input 
              v-model="form.name" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
              placeholder="e.g. Sok Chea" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Username <span class="text-themeRed">*</span></label>
            <input 
              v-model="form.username" 
              type="text" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark font-mono" 
              placeholder="e.g. sokchea" 
              required 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Role (Group) <span class="text-themeRed">*</span></label>
            <select 
              v-model="form.group_id" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
              required
            >
              <option v-for="g in groups" :key="g.id" :value="g.id">{{ g.name }}</option>
            </select>
          </div>
        </div>

        <h2 class="text-xl font-bold text-themeGold border-b border-gray-200 dark:border-gray-800 pb-2 mt-8">Contact & Access</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-bold mb-2">Email Address</label>
            <input 
              v-model="form.email" 
              type="email" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
              placeholder="e.g. sokchea@fabricshop.com" 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Phone Number</label>
            <input 
              v-model="form.phone" 
              type="tel" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark font-mono" 
              placeholder="e.g. +855 98 765 432" 
            />
          </div>
          <div>
            <label class="block text-sm font-bold mb-2">Account Status <span class="text-themeRed">*</span></label>
            <select 
              v-model="form.status_id" 
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
              required
            >
              <option :value="1">Active</option>
              <option :value="0">Inactive</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <NuxtLink to="/users" class="px-6 py-2 rounded-lg font-bold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Cancel
          </NuxtLink>
          <button type="submit" class="bg-themeRed hover:bg-red-800 text-white px-8 py-2 rounded-lg font-bold shadow-md transition cursor-pointer">
            Save User
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePosState } from '~/composables/usePosState'

const router = useRouter()
const { groups, addUser } = usePosState()
const { showAlert } = useUiAlert()

const form = ref({
  name: '',
  username: '',
  group_id: 2, // Default: Cashier
  email: '',
  phone: '',
  status_id: 1
})

const submitForm = () => {
  if (!form.value.name || !form.value.username) return

  const newUser = {
    id: Date.now(),
    name: form.value.name.trim(),
    username: form.value.username.trim().toLowerCase(),
    group_id: Number(form.value.group_id),
    email: form.value.email.trim(),
    phone: form.value.phone.trim(),
    status_id: Number(form.value.status_id)
  }

  addUser(newUser)
  showAlert(`User "${newUser.name}" added successfully!`, "Success", "success")
  router.push('/users')
}
</script>
