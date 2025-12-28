import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Toast } from './Toast'

describe('Toast', () => {
  it('renders message with aria-live for accessibility', () => {
    render(<Toast message="Success!" type="success" onClose={vi.fn()} />)
    expect(screen.getByRole('alert')).toHaveTextContent('Success!')
  })

  it('renders success variant with green background', () => {
    render(<Toast message="Success!" type="success" onClose={vi.fn()} />)
    expect(screen.getByRole('alert')).toHaveClass('bg-green-600')
  })

  it('renders error variant with red background', () => {
    render(<Toast message="Error!" type="error" onClose={vi.fn()} />)
    expect(screen.getByRole('alert')).toHaveClass('bg-red-600')
  })

  it('calls onClose when close button clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Toast message="Test" type="info" onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalled()
  })

  it('auto-dismisses after 3 seconds', async () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    render(<Toast message="Test" type="info" onClose={onClose} />)
    
    vi.advanceTimersByTime(3000)
    expect(onClose).toHaveBeenCalled()
    
    vi.useRealTimers()
  })
})