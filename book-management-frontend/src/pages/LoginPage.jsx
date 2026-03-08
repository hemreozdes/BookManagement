import { useAuth0 } from '@auth0/auth0-react'

export default function LoginPage() {
  const { loginWithRedirect, isLoading } = useAuth0()

  return (
    <div className="bg-white flex items-center justify-center min-h-screen">
      <main className="w-full max-w-md px-6 py-12">
        <section className="bg-white p-8 md:p-10 rounded-2xl shadow-md border border-slate-100 flex flex-col items-center">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-slate-50 rounded-full">
              <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Library</h1>
            <p className="mt-3 text-slate-500 text-sm md:text-base">
              Sign in to manage your collection and discover your next great read.
            </p>
          </div>

          <div className="w-full">
            <button
              onClick={() => loginWithRedirect()}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 bg-slate-900 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z" />
                </svg>
              )}
              {isLoading ? 'Connecting...' : 'Login with Auth0'}
            </button>
          </div>

        </section>
      </main>
    </div>
  )
}