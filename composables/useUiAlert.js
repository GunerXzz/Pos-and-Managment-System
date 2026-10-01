

export const useUiAlert = () => {
  const showAlert = async (text, title = 'Notification', icon = 'info') => {
    const { default: Swal } = await import('sweetalert2')
    return Swal.fire({
      title,
      text,
      icon,
      background: 'transparent',
      customClass: {
        backdrop: 'backdrop-blur-sm bg-black/40',
        popup: 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl dark:text-gray-100 rounded-3xl border border-white/40 dark:border-gray-700/50 shadow-2xl',
        title: 'text-gray-900 dark:text-white font-extrabold',
        htmlContainer: 'text-gray-700 dark:text-gray-300',
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition transform hover:scale-105',
      },
      buttonsStyling: false
    })
  }

  const showConfirm = async (text, title = 'Are you sure?') => {
    const { default: Swal } = await import('sweetalert2')
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      background: 'transparent',
      customClass: {
        backdrop: 'backdrop-blur-sm bg-black/40',
        popup: 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl dark:text-gray-100 rounded-3xl border border-white/40 dark:border-gray-700/50 shadow-2xl',
        title: 'text-gray-900 dark:text-white font-extrabold',
        htmlContainer: 'text-gray-700 dark:text-gray-300',
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg mr-3 transition transform hover:scale-105',
        cancelButton: 'bg-white/50 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-700/80 text-gray-800 dark:text-gray-200 font-bold py-3 px-8 rounded-xl border border-gray-300 dark:border-gray-600 backdrop-blur-md transition'
      },
      buttonsStyling: false,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    })
  }

  return { showAlert, showConfirm }
}
