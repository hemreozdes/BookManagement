import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Navbar from '../components/Navbar'
import { getBookById, deleteBook } from '../services/bookService'

export default function BookDetailPage() {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const { id } = useParams()

  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = await getAccessTokenSilently()
        const data = await getBookById(token, id)
        setBook(data)
      } catch (error) {
        console.error('Kitap yüklenemedi:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Bu kitabı silmek istediğinize emin misiniz?')) return
    try {
      const token = await getAccessTokenSilently()
      await deleteBook(token, id)
      navigate('/books')
    } catch (error) {
      console.error('Silme hatası:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex justify-center py-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex justify-center py-24">
          <p className="text-slate-500">Kitap bulunamadı.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:py-12 w-full">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">

          <div className="p-8 sm:p-10 space-y-10">

            <div className="border-b border-slate-100 pb-8">
              <h1 className="text-4xl font-black text-slate-900 leading-tight mb-2">{book.title}</h1>
              <p className="text-slate-500 text-lg font-medium">{book.author}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-slate-100 pb-8">
              {book.genre && (
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-50 text-orange-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">Genre</p>
                    <p className="text-lg font-semibold text-slate-900">{book.genre}</p>
                  </div>
                </div>
              )}
              {book.publishedYear && (
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-orange-50 text-orange-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-slate-400 mb-1">Published Year</p>
                    <p className="text-lg font-semibold text-slate-900">{book.publishedYear}</p>
                  </div>
                </div>
              )}
            </div>

            {book.description && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900">Description</h3>
                <p className="text-slate-600 leading-relaxed">{book.description}</p>
              </div>
            )}

            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
              <button
                onClick={() => navigate(`/books/${id}/edit`)}
                className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
              >
                Edit Book
              </button>
              <button
                onClick={handleDelete}
                className="w-full sm:w-auto px-8 py-3 border-2 border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all flex items-center justify-center gap-2"
              >
                Delete Book
              </button>
            </div>

          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
        <p>© 2024 My Library App. All rights reserved.</p>
      </footer>
    </div>
  )
}