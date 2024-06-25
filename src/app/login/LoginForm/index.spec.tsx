import '@testing-library/jest-dom'
import React from 'react'
import LoginForm from './index'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserProvider } from '@/contexts/UserContext'

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

describe('LoginForm', () => {
  const queryClient = new QueryClient()

  it('renders LoginForm component', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <LoginForm />
        </UserProvider>
      </QueryClientProvider>,
    )

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('Insira seu usuário')
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      expect(emailInput.value).toBe('test@example.com')

      const passwordInput = screen.getByPlaceholderText('Insira sua senha')
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      expect(passwordInput.value).toBe('password123')

      const toggleVisibilityButton = screen.getByTestId('toggle-visibility')
      fireEvent.click(toggleVisibilityButton)
      expect(passwordInput).toHaveAttribute('type', 'text')
      fireEvent.click(toggleVisibilityButton)

      expect(passwordInput).toHaveAttribute('type', 'password')

      // Verificar a presença do link "Esqueceu sua senha?"
      const forgotPasswordLink = screen.getByText('Esqueceu sua senha?')
      expect(forgotPasswordLink).toBeInTheDocument()
      expect(forgotPasswordLink).toHaveAttribute(
        'href',
        '/login/forgot-password',
      )

      // Testar se o botão é clicável
      const submitButton = screen.getByTestId('submit-button')
      fireEvent.click(submitButton)
    })
  })
})
