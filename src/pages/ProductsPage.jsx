import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { productService } from '../services/productService'
import ProductCard from '../components/ProductCard'
import Spinner from '../components/Spinner'

const CATEGORIES = ['Todas', 'Ropa', 'Electrónica', 'Hogar', 'Deportes', 'Libros', 'Otros']

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      setLoading(true)
      setError('')
      const data = await productService.getAll()
      setProducts(data)
    } catch {
      setError('No se pudieron cargar los productos. Verifica la conexión con la API.')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(product) {
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      html: `<span class="text-gray-600">Estás a punto de eliminar <strong>${product.nombre}</strong>. Esta acción no se puede deshacer.</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9B2148',
      cancelButtonColor: '#F48FB1',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (!result.isConfirmed) return

    try {
      await productService.remove(product.id)
      setProducts(prev => prev.filter(p => p.id !== product.id))
      await Swal.fire({
        title: '¡Eliminado!',
        text: `${product.nombre} fue eliminado del catálogo.`,
        icon: 'success',
        confirmButtonColor: '#9B2148',
        timer: 2000,
        timerProgressBar: true,
      })
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar el producto. Inténtalo de nuevo.',
        icon: 'error',
        confirmButtonColor: '#9B2148',
      })
    }
  }

  const filtered = products.filter(p => {
    const matchesSearch =
      p.nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.categoria.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      selectedCategory === 'Todas' || p.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#6D1130' }}>Inventario</h1>
          <p className="text-sm mt-1" style={{ color: '#C2185B' }}>
            {loading ? 'Cargando...' : `${products.length} productos registrados`}
          </p>
        </div>
        <Link
          to="/productos/nuevo"
          className="inline-flex items-center gap-2 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
          style={{ background: '#9B2148' }}
          onMouseEnter={e => e.currentTarget.style.background = '#6D1130'}
          onMouseLeave={e => e.currentTarget.style.background = '#9B2148'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo producto
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#F48FB1' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre o categoría..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm"
            style={{ border: '1.5px solid #F8BBD0', background: 'white', outline: 'none' }}
            onFocus={e => e.target.style.borderColor = '#9B2148'}
            onBlur={e => e.target.style.borderColor = '#F8BBD0'}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap"
              style={
                selectedCategory === cat
                  ? { background: '#9B2148', color: 'white', border: '1.5px solid #9B2148' }
                  : { background: 'white', color: '#9B2148', border: '1.5px solid #F8BBD0' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <Spinner message="Cargando inventario..." />
      ) : error ? (
        <div className="text-center py-16">
          <div className="mb-3" style={{ color: '#F48FB1' }}>
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadProducts}
            className="px-5 py-2 text-white rounded-xl text-sm font-medium transition-colors"
            style={{ background: '#9B2148' }}
          >
            Reintentar
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-3" style={{ color: '#F8BBD0' }}>
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <p className="text-gray-500">No se encontraron productos{search ? ` para "${search}"` : ''}.</p>
          {search && (
            <button onClick={() => setSearch('')} className="mt-2 text-sm hover:underline" style={{ color: '#9B2148' }}>
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
