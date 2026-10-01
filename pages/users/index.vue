<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl font-bold dark:text-white">{{ $t('users') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage system access and staff profiles</p>
      </div>
      <NuxtLink to="/users/add" class="w-full md:w-auto bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-md transition border border-red-900 whitespace-nowrap text-center">+ Add User</NuxtLink>
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
            <tr v-for="user in mockUsers" :key="user.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-3 md:p-4 font-bold text-gray-800 dark:text-gray-100">{{ user.first_name }} {{ user.last_name }}</td>
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
                <span :class="[user.active === 1 ? 'text-themeGold bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700' : 'text-red-600 bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800']" class="px-2 py-1 rounded text-xs font-bold uppercase border">
                  {{ user.active === 1 ? 'Active' : 'Inactive' }}
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

const mockGroups = {
  1: { id: 1, name: 'Administrator' },
  2: { id: 2, name: 'Cashier' }
}

// ERD matches: bpas_users
const mockUsers = ref([
  { id: 1, group_id: 1, first_name: 'Admin', last_name: 'User', username: 'admin', email: 'admin@fabricshop.com', phone: '+855 12 345 678', active: 1 },
  { id: 2, group_id: 2, first_name: 'Sok', last_name: 'Chea', username: 'sokchea', email: 'cashier1@fabricshop.com', phone: '+855 98 765 432', active: 1 },
  { id: 3, group_id: 2, first_name: 'Chan', last_name: 'Dara', username: 'chandara', email: 'cashier2@fabricshop.com', phone: '+855 11 222 333', active: 0 },
])

</script>