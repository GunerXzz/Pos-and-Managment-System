<template>
  <div class="p-6 md:p-8 space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-themeDark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{{ $t('activity_logs') }}</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">Monitor user actions and system events in real-time.</p>
      </div>
      <div class="flex gap-3 w-full md:w-auto">
        <div class="relative w-full md:w-64">
          <input type="text" placeholder="Search logs..." class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-themeRed outline-none transition text-sm">
          <svg class="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div class="relative">
          <button @click="showFilter = !showFilter" class="h-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl transition font-semibold flex items-center gap-2 border border-gray-200 dark:border-gray-700" title="Smart Filter">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            Filter
          </button>
          
          <!-- Smart Filter Dropdown -->
          <div v-if="showFilter" class="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-themeDark rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 z-50 p-4 animate-fade-in">
            <h3 class="text-sm font-bold border-b border-gray-200 dark:border-gray-800 pb-2 mb-3 text-themeGold">Smart Filter</h3>
            <div class="space-y-3 text-left">
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1">Action Type</label>
                <select class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900 focus:outline-none">
                  <option value="">All Actions</option>
                  <option value="create">Create</option>
                  <option value="update">Update</option>
                  <option value="delete">Delete</option>
                  <option value="login">Login/Logout</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1">Date Range</label>
                <select class="w-full p-2 border border-gray-300 dark:border-gray-700 rounded text-sm bg-white dark:bg-gray-900 focus:outline-none">
                  <option value="">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                </select>
              </div>
              <div class="pt-2">
                <button @click="showFilter = false" class="w-full bg-themeRed text-white py-1.5 rounded text-sm font-bold hover:bg-red-800 transition">Apply Filters</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white dark:bg-themeDark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
              <th class="py-4 px-6 font-bold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
              <th class="py-4 px-6 font-bold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
              <th class="py-4 px-6 font-bold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
              <th class="py-4 px-6 font-bold text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
            <tr v-for="log in mockLogs" :key="log.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition duration-150">
              <td class="py-4 px-6 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ log.created_at }}</td>
              <td class="py-4 px-6 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-themeRed/10 text-themeRed flex items-center justify-center text-xs font-bold border border-themeRed/20">
                  {{ log.user_name.charAt(0) }}
                </div>
                {{ log.user_name }}
              </td>
              <td class="py-4 px-6">
                <span :class="getActionBadgeClass(log.action)" class="px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm">
                  {{ log.action }}
                </span>
              </td>
              <td class="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">{{ log.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination -->
      <div class="py-4 px-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div>Showing 1 to 5 of 142 logs</div>
        <div class="flex gap-2">
          <button class="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 transition" disabled>Previous</button>
          <button class="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showFilter = ref(false)
import { useHead } from '#imports'

useHead({
  title: 'Activity Logs - BPAS POS'
})

const mockLogs = ref([
  { id: 1, user_id: 1, user_name: 'Admin', action: 'LOGIN', description: 'User successfully logged in', created_at: '2026-09-28 08:00 AM' },
  { id: 2, user_id: 2, user_name: 'Manager', action: 'CREATE_PRODUCT', description: 'Created product: Khmer Traditional Hol', created_at: '2026-09-28 08:45 AM' },
  { id: 3, user_id: 2, user_name: 'Manager', action: 'DELETE_PRODUCT', description: 'Deleted product: Thread', created_at: '2026-09-28 09:12 AM' },
  { id: 4, user_id: 3, user_name: 'Staff 1', action: 'SALE_COMPLETED', description: 'Completed Sale INV-260920-001 (Total: $61.00)', created_at: '2026-09-28 10:45 AM' },
  { id: 5, user_id: 3, user_name: 'Staff 1', action: 'LOGOUT', description: 'User manually logged out', created_at: '2026-09-28 05:00 PM' },
])

const getActionBadgeClass = (action) => {
  switch (action) {
    case 'LOGIN':
    case 'LOGOUT':
      return 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
    case 'SALE_COMPLETED':
      return 'bg-themeGold/20 text-yellow-800 dark:text-themeGold border border-themeGold/50'
    case 'DELETE_PRODUCT':
      return 'bg-themeRed/20 text-red-800 dark:text-red-400 border border-themeRed/50'
    case 'CREATE_PRODUCT':
    case 'UPDATE_PRODUCT':
      return 'bg-themeDarkRed/20 text-red-900 dark:text-red-300 border border-themeDarkRed/50'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
  }
}
</script>
