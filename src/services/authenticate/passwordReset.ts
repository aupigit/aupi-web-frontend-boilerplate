import { IRecoveryPassword } from '@/interfaces/user/recoverypassword'
import { post } from '@/providers/api'

export const doRecoveryPasswordEmail = async (
  email: string,
): Promise<IRecoveryPassword> => {
  const result = await post(`management/password_reset/`, {
    body: {
      email,
    },
  })
  return result as unknown as Promise<IRecoveryPassword>
}

export const doResetConfirmPassword = async (
  token: string,
  newPassword: string,
): Promise<IRecoveryPassword> => {
  const result = await post(`management/password_reset/confirm/`, {
    body: {
      token,
      password: newPassword,
    },
  })
  return result as unknown as Promise<IRecoveryPassword>
}
