'use client'

import React, { useState } from 'react'
import { useForm, FieldError } from 'react-hook-form'
import { z } from 'zod'
// import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
// import { useUser } from '@/contexts/UserContext'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/LoadingButton'
import { doRecoveryPasswordEmail } from '@/services/authenticate/passwordReset'

const authSchema = z.object({
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
      invalid_type_error: 'E-mail precisa ser uma string',
    })
    .email('E-mail inválido'),
})

export type AuthFormData = z.infer<typeof authSchema>

function ForgotPasswordLoginForm() {
  // const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  })

  // const { loginUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      const response = await doRecoveryPasswordEmail(data.email)
      if (response && response.status === 'success') {
        // loginUser(response.user)
        toast.success('E-mail enviado com sucesso.')
        // router.push('/')
      }
    } catch (error) {
      console.error(error)
      toast.error('Login falhou! Verifique suas credenciais.')
      setIsLoading(false)
    }
  })
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-8">
        <Label className="mb-3 block text-sm text-dark dark:text-white">
          E-mail
        </Label>
        <Input
          type="text"
          placeholder="Insira seu e-mail"
          className="h-[50px] w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#191919] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
          {...register('email', {
            required: 'Este campo é obrigatório',
          })}
        />
        {errors.email && (
          <span
            style={{
              color: '#ff0000',
            }}
          >
            {(errors.email as FieldError).message}
          </span>
        )}
      </div>
      <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <a
            href="/login"
            className="text-sm font-medium text-primary hover:underline"
          >
            Voltar para o login
          </a>
        </div>
      </div>
      <div className="mb-6">
        <LoadingButton
          data-testid="submit-button"
          label="Enviar e-mail"
          isLoading={isLoading}
          className="flex h-[50px] w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit transition-colors duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
        />
      </div>
    </form>
  )
}

export default ForgotPasswordLoginForm
