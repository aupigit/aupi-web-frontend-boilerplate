import '@testing-library/jest-dom'
import React from 'react'
import ForgotPasswordLoginForm from './ForgotPasswordLogin'
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

describe('ForgotPasswordLoginForm', () => {
  const queryClient = new QueryClient()

  it('renders ForgotPasswordLoginForm component', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ForgotPasswordLoginForm />
        </UserProvider>
      </QueryClientProvider>,
    )

    await waitFor(() => {
      const emailInput = screen.getByPlaceholderText('Insira seu e-mail')
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
      expect(emailInput.value).toBe('test@example.com')

      // Testar se o botão é clicável
      const submitButton = screen.getByTestId('submit-button')
      fireEvent.click(submitButton)
    })
  })
})
