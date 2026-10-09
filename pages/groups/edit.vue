<template>
  <div class="p-4 md:p-8 h-full flex flex-col bg-themeWhite dark:bg-themeDark text-gray-900 dark:text-gray-100 overflow-y-auto">
    <div class="flex items-center justify-between mb-6 md:mb-8 border-b-2 border-themeGold pb-4">
      <div class="flex items-center gap-4">
        <NuxtLink to="/groups" class="w-10 h-10 bg-gray-200 dark:bg-themeDark rounded-full flex items-center justify-center hover:bg-themeGold hover:text-white transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-3xl font-extrabold text-themeRed dark:text-red-500 uppercase tracking-widest">Edit Group / Role</h1>
          <p class="text-xs md:text-sm text-gray-500 mt-1">Modify role {{ form.name }}</p>
        </div>
      </div>
    </div>

    <div class="bg-white dark:bg-themeDark rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 max-w-3xl">
      <form @submit.prevent="submitForm" class="space-y-6">
        
        <div>
          <label class="block text-sm font-bold mb-2">Group Name <span class="text-themeRed">*</span></label>
          <input 
            v-model="form.name" 
            type="text" 
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
            required 
          />
        </div>

        <div>
          <label class="block text-sm font-bold mb-2">Description</label>
          <textarea 
            v-model="form.description" 
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark h-24" 
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-bold mb-2">Status <span class="text-themeRed">*</span></label>
          <select 
            v-model="form.status" 
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeGold dark:bg-themeDark" 
            required
          >
            <option :value="1">Active</option>
            <option :value="0">Inactive</option>
          </select>
        </div>

        <div class="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <NuxtLink to="/groups" class="px-6 py-2 rounded-lg font-bold border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            Cancel
          </NuxtLink>
          <button type="submit" class="bg-themeRed hover:bg-red-800 text-white px-8 py-2 rounded-lg font-bold shadow-md transition cursor-pointer">
            Save Changes
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePosState } from '~/composables/usePosState'

const router = useRouter()
const route = useRoute()
const { groups, updateGroup } = usePosState()
const { showAlert } = useUiAlert()

const groupId = computed(() => Number(route.query.id))

const form = ref({
  name: '',
  description: '',
  status: 1
})

onMounted(() => {
  const g = groups.value.find(group => group.id === groupId.value)
  if (g) {
    form.value = {
      name: g.name,
      description: g.description,
      status: g.status
    }
  }
})

const submitForm = () => {
  if (!form.value.name) return

  updateGroup(groupId.value, {
    name: form.value.name.trim(),
    description: form.value.description.trim(),
    status: Number(form.value.status)
  })

  showAlert(`Role "${form.value.name}" updated successfully!`, "Updated", "success")
  router.push('/groups')
}
</script>
