import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { PasswordInput } from './PasswordInput'

describe('PasswordInput', () => {
  it('renders password input field', () => {
    render(<PasswordInput value="" onChange={vi.fn()} showRequirements={false} />)
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('calls onChange when typing', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<PasswordInput value="" onChange={handleChange} showRequirements={false} />)
    await user.type(screen.getByLabelText(/password/i), 'test')
    expect(handleChange).toHaveBeenCalled()
  })

  it('shows requirements when showRequirements is true', () => {
    render(<PasswordInput value="weak" onChange={vi.fn()} showRequirements={true} />)
    expect(screen.getByText(/at least 12 characters/i)).toBeInTheDocument()
  })

  it('shows strength meter', () => {
    render(<PasswordInput value="ValidPass123!" onChange={vi.fn()} showRequirements={true} />)
    expect(screen.getByText(/medium/i)).toBeInTheDocument()
  })
})