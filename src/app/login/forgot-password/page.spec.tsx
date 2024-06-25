/* eslint-disable react/display-name */ // Desabilitar regra de exibição de componentes anônimos
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ForgotPasswordForm from './page'

jest.mock('./ForgotPasswordLogin/ForgotPasswordLogin', () => () => (
  <div data-testid="ForgotPasswordForm"></div>
))

describe('ForgotPasswordForm', () => {
  it('renders ForgotPasswordForm component and checks for ForgotPasswordForm', () => {
    render(<ForgotPasswordForm />)
    expect(screen.getByTestId('ForgotPasswordForm')).toBeInTheDocument()
  })

  it('checks if the login message is displayed', () => {
    render(<ForgotPasswordForm />)
    expect(screen.getByText(/Esqueceu sua senha?/i)).toBeInTheDocument()
  })
})
