import { render, screen } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('renders with pulse animation', () => {
    render(<Skeleton />)
    const skeleton = screen.getByRole('status', { hidden: true })
    expect(skeleton).toHaveClass('animate-pulse')
  })

  it('renders as text variant by default', () => {
    render(<Skeleton />)
    const skeleton = screen.getByRole('status', { hidden: true })
    expect(skeleton).toHaveClass('rounded')
  })

  it('accepts custom width and height', () => {
    render(<Skeleton width="100px" height="20px" />)
    const skeleton = screen.getByRole('status', { hidden: true })
    expect(skeleton).toHaveStyle({ width: '100px', height: '20px' })
  })

  it('renders as circular variant', () => {
    render(<Skeleton variant="circular" />)
    const skeleton = screen.getByRole('status', { hidden: true })
    expect(skeleton).toHaveClass('rounded-full')
  })
})