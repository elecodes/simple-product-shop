import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { DiscountCouponInput } from './DiscountCouponInput'

describe('DiscountCouponInput', () => {
  const INPUT_PLACEHOLDER = 'Enter coupon code'
  const BUTTON_TEXT = 'Apply'
  const VALID_COUPON = 'SAVE10'

  it('renders input and apply button', () => {
    render(<DiscountCouponInput onApply={vi.fn()} />)
    
    expect(screen.getByPlaceholderText(INPUT_PLACEHOLDER)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: BUTTON_TEXT })).toBeInTheDocument()
  })

  it('calls onApply with coupon code when button is clicked', async () => {
    const onApply = vi.fn()
    const user = userEvent.setup()
    
    render(<DiscountCouponInput onApply={onApply} />)
    
    const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER)
    const button = screen.getByRole('button', { name: BUTTON_TEXT })
    
    await user.type(input, VALID_COUPON)
    await user.click(button)
    
    expect(onApply).toHaveBeenCalledWith(VALID_COUPON)
  })

  it('calls onApply when Enter key is pressed in input', async () => {
    const onApply = vi.fn()
    const user = userEvent.setup()
    
    render(<DiscountCouponInput onApply={onApply} />)
    
    const input = screen.getByPlaceholderText(INPUT_PLACEHOLDER)
    
    await user.type(input, `${VALID_COUPON}{Enter}`)
    
    expect(onApply).toHaveBeenCalledWith(VALID_COUPON)
  })

  it('does not call onApply with empty coupon code', async () => {
    const onApply = vi.fn()
    const user = userEvent.setup()
    
    render(<DiscountCouponInput onApply={onApply} />)
    
    const button = screen.getByRole('button', { name: BUTTON_TEXT })
    
    await user.click(button)
    
    expect(onApply).not.toHaveBeenCalled()
  })
})