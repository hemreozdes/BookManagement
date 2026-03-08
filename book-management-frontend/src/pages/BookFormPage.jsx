import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Navbar from '../components/Navbar'
import { getBookById, createBook, updateBook } from '../services/bookService'

export default function BookFormPage() {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id

  const [form, setForm] = useState({ title: '', author: '' })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEditMode)

  useEffect(() => {
    if (!isEditMode) return
    const fetchBook = async () => {
      try {
        const token = await getAccessTokenSilently()
        const data = await getBookById(token, id)
        setForm({ title: data.title, author: data.author })
      } catch (error) {
        console.error('Kitap yüklenemedi:', error)
      } finally {
        setFetching(false)
      }
    }
    fetchBook()
  }, [id])

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.author.trim()) return
    try {
      setLoading(true)
      const token = await getAccessTokenSilently()
      if (isEditMode) {
        await updateBook(token, id, form)
      } else {
        await createBook(token, form)
      }
      navigate('/books')
    } catch (error) {
      console.error('Kaydetme hatası:', error)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <div className="flex justify-center py-24">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-start py-12 px-4">
        <div className="w-full max-w-xl">

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {isEditMode ? 'Edit Book' : 'Add Book'}
            </h2>
            <p className="text-slate-500">
              {isEditMode ? 'Update your book information' : 'Add a new book to your collection'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-8 space-y-6">

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 ml-1">
                  Book Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. The Great Gatsby"
                  className="w-full px-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 ml-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="e.g. F. Scott Fitzgerald"
                  className="w-full px-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all placeholder:text-slate-400"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-700 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    isEditMode ? 'Update Book' : 'Save Book'
                  )}
                </button>
              </div>

            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate('/books')}
              className="text-slate-400 hover:text-slate-600 text-sm font-medium transition-colors"
            >
              ← Back to library
            </button>
          </div>

        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-xs">
        <p>© 2024 My Library Management System</p>
      </footer>
    </div>
  )
}