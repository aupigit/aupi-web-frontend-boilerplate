'use client'

import React, { useState } from 'react'
import { useForm, FieldError } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUser } from '@/contexts/UserContext'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import LoadingButton from '@/components/LoadingButton'
import { doLogin } from '@/services/authenticate/doLogin'

const authSchema = z.object({
  email: z
    .string({
      required_error: 'E-mail é obrigatório',
      invalid_type_error: 'E-mail precisa ser uma string',
    })
    .email('E-mail inválido'),
  password: z
    .string({
      required_error: 'Password é obrigatório',
      invalid_type_error: 'Senha precisa ser uma string',
    })
    .min(4, 'A senha deve ter pelo menos 4 caracteres'),
})

export type AuthFormData = z.infer<typeof authSchema>

function LoginForm() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  })

  const { loginUser } = useUser()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      const response = await doLogin(data.email, data.password)
      if (response && response.user) {
        loginUser(response.user)
        toast.success('Usuário logado com sucesso.')
        router.push('/')
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
        <Label
          htmlFor="email"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          E-mail
        </Label>
        <Input
          type="text"
          placeholder="Insira seu usuário"
          className="h-[50px] w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
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
      <div className="mb-8">
        <Label
          htmlFor="password"
          className="mb-3 block text-sm text-dark dark:text-white"
        >
          Senha
        </Label>
        <div className="relative">
          <div className="absolute inset-y-0 right-4 flex items-center">
            <button
              type="button"
              data-testid="toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Insira sua senha"
            className="h-[50px] w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
            {...register('password', {
              required: 'Este campo é obrigatório',
            })}
          />
        </div>

        {errors.password && (
          <span
            style={{
              color: '#ff0000',
            }}
          >
            {(errors.password as FieldError).message}
          </span>
        )}
      </div>
      <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
        <div>
          <a
            href="/login/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Esqueceu sua senha?
          </a>
        </div>
      </div>
      <div className="mb-6">
        <LoadingButton
          data-testid="submit-button"
          isLoading={isLoading}
          className="flex h-[50px] w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit transition-colors duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
        >
          Entrar
        </LoadingButton>
      </div>
    </form>
  )
}

export default LoginForm
