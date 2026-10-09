<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-[#0F1117] text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl font-bold dark:text-white">{{ $t('users') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage system access, cashiers, and staff profiles</p>
      </div>
      <div class="flex relative w-full md:w-auto gap-2 md:gap-4">
        <NuxtLink to="/users/add" class="w-full md:w-auto bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-md transition whitespace-nowrap text-center">+ Add User</NuxtLink>
      </div>
    </div>

    <div class="bg-white dark:bg-[#1A1D26] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-[#1A1D26] text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
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
            <tr v-if="users.length === 0">
              <td colspan="6" class="p-8 text-center text-gray-400 dark:text-gray-500 text-sm">
                No users found. Click "+ Add User" to create a user account.
              </td>
            </tr>
            <tr v-for="user in users" :key="user.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-3 md:p-4 font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-themeRed/10 text-themeRed flex items-center justify-center text-xs font-bold border border-themeRed/20">
                  {{ user.name.charAt(0) }}
                </div>
                {{ user.name }}
              </td>
              <td class="p-3 md:p-4 font-mono text-sm text-gray-600 dark:text-gray-400">@{{ user.username }}</td>
              <td class="p-3 md:p-4">
                <div class="text-sm text-gray-800 dark:text-gray-200">{{ user.email }}</div>
                <div class="text-xs text-gray-500 font-mono">{{ user.phone }}</div>
              </td>
              <td class="p-3 md:p-4">
                <span class="bg-gray-100 text-gray-800 dark:bg-[#252936] dark:text-gray-300 px-2 py-1 rounded text-xs font-bold border border-gray-200 dark:border-gray-700">
                  {{ getGroupName(user.group_id) }}
                </span>
              </td>
              <td class="p-3 md:p-4">
                <span :class="[user.status_id === 1 ? 'text-themeGold bg-gray-100 dark:bg-[#252936] border-gray-200 dark:border-gray-700' : 'text-red-600 bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800']" class="px-2 py-1 rounded text-xs font-bold uppercase border">
                  {{ user.status_id === 1 ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="p-3 md:p-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink :to="'/users/edit?id=' + user.id" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Edit
                  </NuxtLink>
                  <button v-if="user.id !== 1" @click="handleDeleteUser(user)" class="px-2.5 py-1 text-xs font-bold rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20 transition inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePosState } from '~/composables/usePosState'

const { users, groups, deleteUser } = usePosState()
const { showConfirm, showAlert } = useUiAlert()

const getGroupName = (groupId) => {
  const g = groups.value.find(group => group.id === groupId)
  return g ? g.name : (groupId === 1 ? 'Administrator' : 'Cashier')
}

const handleDeleteUser = async (user) => {
  const result = await showConfirm(`Are you sure you want to delete user "${user.name}"?`, "Delete User")
  if (result.isConfirmed) {
    deleteUser(user.id)
    showAlert(`User "${user.name}" removed successfully!`, "Deleted", "success")
  }
}
</script>