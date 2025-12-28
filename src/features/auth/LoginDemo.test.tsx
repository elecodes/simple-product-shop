import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginDemo } from './LoginDemo'

describe('LoginDemo', () => {
  it('renders email and password inputs', () => {
    render(<LoginDemo />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('disables submit when form is invalid', () => {
    render(<LoginDemo />)
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled()
  })

  it('enables submit when form is valid', async () => {
    const user = userEvent.setup()
    render(<LoginDemo />)

    await user.type(screen.getByLabelText(/email/i), 'demo@example.com')
    await user.type(screen.getByLabelText(/password/i), 'ValidPass123!')

    expect(screen.getByRole('button', { name: /sign in/i })).toBeEnabled()
  })

  it('shows success message on valid submit', async () => {
    const user = userEvent.setup()
    render(<LoginDemo />)

    await user.type(screen.getByLabelText(/email/i), 'demo@example.com')
    await user.type(screen.getByLabelText(/password/i), 'ValidPass123!')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText(/welcome/i)).toBeInTheDocument()
  })

  it('shows error after 3 failed attempts', async () => {
    const user = userEvent.setup()
    render(<LoginDemo />)

    // Simular 3 intentos fallidos con credenciales "incorrectas"
    // IMPORTANTE: Limpiar campos ANTES de que el form se bloquee (en el 3er intento)
    for (let i = 0; i < 3; i++) {
      await user.type(screen.getByLabelText(/email/i), 'wrong@example.com')
      await user.type(screen.getByLabelText(/password/i), 'WrongPass123!')
      await user.click(screen.getByRole('button', { name: /sign in/i }))
      
      // Solo limpiar si NO es el último intento (el form se bloquea después del 3ro)
      if (i < 2) {
        await user.clear(screen.getByLabelText(/email/i))
        await user.clear(screen.getByLabelText(/password/i))
      }
    }

    expect(screen.getByText(/too many attempts/i)).toBeInTheDocument()
  })
})