import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import LoginPage from './pages/LoginPage'
import BookListPage from './pages/BookListPage'
import BookFormPage from './pages/BookFormPage'
import BookDetailPage from './pages/BookDetailPage'

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  const { isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/books" replace /> : <LoginPage />} />
      <Route path="/books" element={<ProtectedRoute><BookListPage /></ProtectedRoute>} />
      <Route path="/books/new" element={<ProtectedRoute><BookFormPage /></ProtectedRoute>} />
      <Route path="/books/:id/edit" element={<ProtectedRoute><BookFormPage /></ProtectedRoute>} />
      <Route path="/books/:id" element={<ProtectedRoute><BookDetailPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}