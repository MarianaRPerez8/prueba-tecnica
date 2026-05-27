import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', pin: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authService.isAuthenticated()) {
      navigate('/productos', { replace: true })
    }
  }, [navigate])

  function handleChange(e) {
    setError('')
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.username.trim()) {
      setError('El nombre de usuario es obligatorio.')
      return
    }
    if (!form.pin.trim()) {
      setError('El PIN es obligatorio.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      authService.login(form.username.trim(), form.pin.trim())
      navigate('/productos', { replace: true })
    }, 600)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #6D1130 0%, #9B2148 50%, #C2185B 100%)' }}>
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 py-10 text-center" style={{ background: 'linear-gradient(135deg, #9B2148, #C2185B)' }}>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white">AdminStore</h1>
            <p className="text-sm mt-1" style={{ color: '#F8BBD0' }}>Panel de administración</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#6D1130' }}>
                Nombre de usuario
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Ingresa tu usuario"
                className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                style={{ border: '1.5px solid #F8BBD0', background: '#FFF0F5', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#9B2148'}
                onBlur={e => e.target.style.borderColor = '#F8BBD0'}
                autoComplete="username"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#6D1130' }}>
                PIN de acceso
              </label>
              <input
                type="password"
                name="pin"
                value={form.pin}
                onChange={handleChange}
                placeholder="••••••"
                className="w-full px-4 py-3 rounded-xl text-sm transition-all"
                style={{ border: '1.5px solid #F8BBD0', background: '#FFF0F5', outline: 'none' }}
                onFocus={e => e.target.style.borderColor = '#9B2148'}
                onBlur={e => e.target.style.borderColor = '#F8BBD0'}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm" style={{ color: '#9B2148', background: '#FCE4EC' }}>
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-semibold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
              style={{ background: loading ? '#C2185B99' : '#9B2148' }}
              onMouseEnter={e => { if (!loading) e.target.style.background = '#6D1130' }}
              onMouseLeave={e => { if (!loading) e.target.style.background = '#9B2148' }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Ingresando...
                </>
              ) : (
                'Ingresar al panel'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: '#F8BBD0' }}>
          Ingresa cualquier usuario y PIN para acceder
        </p>
      </div>
    </div>
  )
}
