import { post } from '@/providers/api'
import { destroyCookie } from 'nookies'

export const doLogout = async () => {
  try {
    await post('management/logout/')
  } catch (error) {
    console.error(error)
    throw error
  } finally {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    destroyCookie(undefined, 'userId')
  }
}
