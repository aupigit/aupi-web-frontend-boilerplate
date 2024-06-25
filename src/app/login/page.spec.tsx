/* eslint-disable react/display-name */ // Desabilitar regra de exibição de componentes anônimos
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LoginPage from './page'

jest.mock('./LoginForm', () => () => <div data-testid="LoginForm"></div>)

describe('LoginPage', () => {
  it('renders LoginPage component and checks for LoginForm', () => {
    render(<LoginPage />)
    expect(screen.getByTestId('LoginForm')).toBeInTheDocument()
  })

  it('checks if the login message is displayed', () => {
    render(<LoginPage />)
    expect(screen.getByText(/Entre com sua conta/i)).toBeInTheDocument()
  })
})
