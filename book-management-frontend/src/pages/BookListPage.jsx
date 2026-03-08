import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Navbar from '../components/Navbar'
import { getAllBooks, deleteBook, searchBooks } from '../services/bookService'

export default function BookListPage() {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState('title')

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const token = await getAccessTokenSilently()
      const data = await getAllBooks(token)
      setBooks(data)
    } catch (error) {
      console.error('Kitaplar yüklenemedi:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const handleSearch = async (e) => {
    const value = e.target.value
    setSearchQuery(value)
    try {
      const token = await getAccessTokenSilently()
      if (value.trim() === '') {
        const data = await getAllBooks(token)
        setBooks(data)
      } else {
        const data = await searchBooks(token, { [searchType]: value })
        setBooks(data)
      }
    } catch (error) {
      console.error('Arama hatası:', error)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bu kitabı silmek istediğinize emin misiniz?')) return
    try {
      const token = await getAccessTokenSilently()
      await deleteBook(token, id)
      setBooks(books.filter(book => book.id !== id))
    } catch (error) {
      console.error('Silme hatası:', error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">Bookshelf</h2>
            <p className="text-slate-500 mt-1">Manage your personal collection of titles.</p>
          </div>
          <button
            onClick={() => navigate('/books/new')}
            className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all"
          >
            + Add Book
          </button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder:text-slate-400"
            />
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm font-medium text-slate-700 cursor-pointer"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="genre">Genre</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Your shelf is empty</h3>
            <p className="text-slate-500 mt-2 mb-6">Start building your collection by adding your first book.</p>
            <button
              onClick={() => navigate('/books/new')}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold"
            >
              Add Your First Book
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map(book => (
              <div
                key={book.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg text-slate-900 leading-snug line-clamp-1">{book.title}</h3>
                    {book.genre && (
                      <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded ml-2 whitespace-nowrap">
                        {book.genre}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-slate-600">{book.author}</p>
                  {book.publishedYear && (
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center text-xs text-slate-400">
                      Published {book.publishedYear}
                    </div>
                  )}
                  <div className="mt-3 flex gap-2" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => navigate(`/books/${book.id}/edit`)}
                      className="flex-1 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="flex-1 py-1.5 text-sm font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="mt-auto py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">© 2024 My Library App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}