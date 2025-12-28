import { useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  }

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColor[type]} text-white px-4 py-3 rounded-lg shadow-lg`}
      role="alert"
      aria-live="polite"
    >
      {message}
      <button onClick={onClose} className="ml-4" aria-label="Close">×</button>
    </div>
  )
}