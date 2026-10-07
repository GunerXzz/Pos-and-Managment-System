<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl font-bold dark:text-white">{{ $t('users') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage system access and staff profiles</p>
      </div>
      <div class="flex relative w-full md:w-auto gap-2 md:gap-4">
        <button @click="showFilter = !showFilter" class="px-4 py-2 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition" title="Smart Filter">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
        </button>

        <!-- Smart Filter Dropdown -->
        <div v-if="showFilter" class="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-themeDark rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 z-50 p-4 animate-fade-in">
          <h3 class="text-sm font-bold border-b border-gray-200 dark:border-gray-800 pb-2 mb-3 text-themeGold">Smart Filter</h3>
          <div class="space-y-3 text-left">
            <div>
              <label class="block text-xs font-bold text-gray-500 mb-1">Group (Role)</label>
              <select class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900 focus:outline-none">
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Staff">Staff</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-500 mb-1">Status</label>
              <select class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900 focus:outline-none">
                <option value="">All Statuses</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
            <div class="pt-2">
              <button @click="showFilter = false" class="w-full bg-themeRed text-white py-1.5 rounded text-sm font-bold hover:bg-red-800 transition">Apply Filters</button>
            </div>
          </div>
        </div>

        <NuxtLink to="/users/add" class="w-full md:w-auto bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-md transition border border-red-900 whitespace-nowrap text-center">+ Add User</NuxtLink>
      </div>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-themeDark text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
            <tr>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Name</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Username</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Contact</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Role (Group)</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Status</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="mockUsers.length === 0">
              <td colspan="6" class="p-8 text-center text-gray-400 dark:text-gray-500 text-sm">
                No users found. Click "+ Add User" to create a user account.
              </td>
            </tr>
            <tr v-for="user in mockUsers" :key="user.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-3 md:p-4 font-bold text-gray-800 dark:text-gray-100">{{ user.name }}</td>
              <td class="p-3 md:p-4 font-mono text-sm text-gray-600 dark:text-gray-400">@{{ user.username }}</td>
              <td class="p-3 md:p-4">
                <div class="text-sm text-gray-800 dark:text-gray-200">{{ user.email }}</div>
                <div class="text-xs text-gray-500 font-mono">{{ user.phone }}</div>
              </td>
              <td class="p-3 md:p-4">
                <span class="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-bold border border-gray-200 dark:border-gray-600">
                  {{ mockGroups[user.group_id]?.name || 'Unknown' }}
                </span>
              </td>
              <td class="p-3 md:p-4">
                <span :class="[user.status_id === 1 ? 'text-themeGold bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'text-red-600 bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800']" class="px-2 py-1 rounded text-xs font-bold uppercase border">
                  {{ user.status_id === 1 ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="p-3 md:p-4 text-right">
                <NuxtLink to="/users/edit" class="text-themeGold hover:text-yellow-600  hover:underline mr-4 text-sm font-semibold uppercase">Edit Permissions</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showFilter = ref(false)

const mockGroups = {
  1: { id: 1, name: 'Administrator' },
  2: { id: 2, name: 'Cashier' }
}

// ERD matches: bpas_users and bpas_user_profiles
const mockUsers = ref([
  { id: 1, group_id: 1, name: 'Admin User', username: 'admin', email: 'admin@fabricshop.com', phone: '+855 12 345 678', status_id: 1 }
])

</script>