import { IAuthenticatedUser } from '@/interfaces/user/authenticateduser'
import { post } from '@/providers/api'
import { setCookie } from 'nookies'

export const doLogin = async (
  email: string,
  password: string,
): Promise<IAuthenticatedUser | undefined> => {
  const body = {
    email,
    password,
  }
  try {
    const data = await post('token/', { body })
    const { user, access, refresh } = data

    const authenticatedUser: IAuthenticatedUser = {
      user: {
        id: user.id,
        email: user.email,
      },
      token: access,
      refresh,
    }

    setCookie(undefined, 'userId', user.id, {
      maxAge: 60 * 60 * 1, // 1 hour
    })

    localStorage.setItem('token', access)
    localStorage.setItem('refresh', refresh)

    return authenticatedUser
  } catch (error) {
    console.error(error)
    throw error
  }
}
