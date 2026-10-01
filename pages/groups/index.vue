<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b-2 border-themeGold pb-4 gap-4">
      <div>
        <h1 class="text-3xl md:text-4xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">{{ $t('roles_groups') }}</h1>
        <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">Manage user roles and permissions</p>
      </div>
      <NuxtLink to="/groups/add" class="w-full md:w-auto bg-themeRed hover:bg-red-800 text-white px-6 py-2 rounded-lg font-bold shadow-md transition border border-red-900 whitespace-nowrap text-center">
        + Add Group
      </NuxtLink>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 flex-grow overflow-hidden">
      <div class="overflow-x-auto h-full">
        <table class="w-full text-left border-collapse whitespace-nowrap">
          <thead class="bg-white dark:bg-themeDark text-gray-500 border-b-2 border-gray-100 dark:border-gray-800 sticky top-0 z-10">
            <tr>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs w-1/4">Name</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs">Description</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs w-32">Status</th>
              <th class="p-3 md:p-4 font-bold uppercase tracking-wider text-xs text-right w-48">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="group in mockGroups" :key="group.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-red-50 dark:hover:bg-red-900/10 transition">
              <td class="p-3 md:p-4 font-bold text-gray-800 dark:text-gray-100">{{ group.name }}</td>
              <td class="p-3 md:p-4 text-sm text-gray-600 dark:text-gray-300">{{ group.description }}</td>
              <td class="p-3 md:p-4">
                <span :class="group.status === 1 ? 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700' : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'" class="px-2 py-1 rounded text-xs font-bold uppercase border">
                  {{ group.status === 1 ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="p-3 md:p-4 text-right">
                <NuxtLink to="/groups/edit" class="text-themeGold hover:text-yellow-600  hover:underline mr-4 text-sm font-semibold uppercase">Edit Role</NuxtLink>
                <button @click="deleteGroup(group)" class="text-red-500 hover:underline text-sm font-semibold uppercase">Delete</button>
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

// ERD matches: bpas_groups
const mockGroups = ref([
  { id: 1, name: 'Admin', description: 'Administrator with full access', status: 1 },
  { id: 2, name: 'Cashier', description: 'Point of sale access only', status: 1 },
  { id: 3, name: 'Manager', description: 'Managerial access without system config', status: 0 },
])

const deleteGroup = async (group) => {
  const { showConfirm } = useUiAlert()
  const result = await showConfirm(`Are you sure you want to delete group ${group.name}?`, "Delete Group")
  if (result.isConfirmed) {
    mockGroups.value = mockGroups.value.filter(g => g.id !== group.id)
  }
}
</script>
