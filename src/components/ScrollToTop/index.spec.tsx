import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import ScrollToTop from './index' // Adjust the import path as necessary

// Mock window.scrollTo to avoid errors in a non-browser environment
Object.defineProperty(window, 'scrollTo', { value: jest.fn(), writable: true })

describe('ScrollToTop', () => {
  it('it should not be visible when the page is at the top', () => {
    render(<ScrollToTop />)
    expect(screen.queryByLabelText('scroll to top')).toBeNull()
  })

  it('it should become visible when the page is scrolled down', () => {
    render(<ScrollToTop />)
    // Simulate window scroll
    fireEvent.scroll(window, { target: { pageYOffset: 500 } })
    expect(screen.getByLabelText('scroll to top')).toBeInTheDocument()
  })

  it('it should scroll to top when clicked', () => {
    render(<ScrollToTop />)
    // Simulate window scroll
    fireEvent.scroll(window, { target: { pageYOffset: 500 } })
    fireEvent.click(screen.getByLabelText('scroll to top'))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })
})
