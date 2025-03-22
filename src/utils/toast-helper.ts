import toast from 'react-hot-toast'

export const toastHelper = {
  success: (message: string) => {
    toast.success(message)
  },
  error: (message: string) => {
    toast.error(message)
  },
  prepare: () => {
    toast.error('준비중인 기능입니다.')
  }
}
