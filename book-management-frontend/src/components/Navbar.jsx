import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { logout, user } = useAuth0()
  const navigate = useNavigate()

  return (
    <nav className="bg-white border-b border-slate-100 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate('/books')}
        >
          <div className="inline-flex items-center justify-center w-8 h-8 bg-slate-50 rounded-full">
            <svg className="w-4 h-4 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
          <span className="text-lg font-bold text-slate-900">My Library</span>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-slate-500 hidden sm:block">
              {user.email}
            </span>
          )}
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors duration-200"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  )
}