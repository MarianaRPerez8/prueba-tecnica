import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import { authService } from '../services/authService'

export default function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = authService.getUser()

  function handleLogout() {
    authService.logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#FFF0F5' }}>
      
      <nav style={{ background: '#6D1130' }} className="text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
           
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F48FB1' }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                </svg>
              </div>
              <span className="font-bold text-lg tracking-tight">AdminStore</span>
            </div>

        
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/productos"
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={
                  location.pathname.startsWith('/productos')
                    ? { background: '#9B2148', color: 'white' }
                    : { color: '#F8BBD0' }
                }
                onMouseEnter={e => {
                  if (!location.pathname.startsWith('/productos'))
                    e.target.style.background = '#7D1535'
                }}
                onMouseLeave={e => {
                  if (!location.pathname.startsWith('/productos'))
                    e.target.style.background = 'transparent'
                }}
              >
                Inventario
              </Link>
            </div>

           
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold uppercase" style={{ background: '#F48FB1' }}>
                  {user?.username?.[0] || 'U'}
                </div>
                <span className="text-sm hidden sm:block" style={{ color: '#F8BBD0' }}>
                  {user?.username || 'Usuario'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{ color: '#F8BBD0' }}
                onMouseEnter={e => e.currentTarget.style.background = '#9B2148'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:block">Cerrar sesión</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}
