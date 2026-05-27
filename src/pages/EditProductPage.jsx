import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { productService } from '../services/productService'
import ProductForm from '../components/ProductForm'
import Spinner from '../components/Spinner'

export default function EditProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getById(id)
        setProduct(data)
      } catch {
        setError('No se pudo cargar el producto.')
      } finally {
        setFetching(false)
      }
    }
    load()
  }, [id])

  async function handleSubmit(productData) {
    try {
      setLoading(true)
      await productService.update(id, productData)
      await Swal.fire({
        title: '¡Actualizado!',
        text: `"${productData.nombre}" fue actualizado correctamente.`,
        icon: 'success',
        confirmButtonColor: '#9B2148',
        timer: 2000,
        timerProgressBar: true,
      })
      navigate('/productos')
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el producto.',
        icon: 'error',
        confirmButtonColor: '#9B2148',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/productos"
        className="inline-flex items-center gap-1.5 text-sm transition-colors mb-6"
        style={{ color: '#9B2148' }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver al inventario
      </Link>

      <div className="bg-white rounded-2xl shadow-sm p-8" style={{ border: '1.5px solid #F8BBD0' }}>
        <h1 className="text-xl font-bold mb-6" style={{ color: '#6D1130' }}>Editar producto</h1>

        {fetching ? (
          <Spinner message="Cargando producto..." />
        ) : error ? (
          <div className="text-center py-8">
            <p className="mb-4" style={{ color: '#9B2148' }}>{error}</p>
            <Link to="/productos" className="text-sm hover:underline" style={{ color: '#9B2148' }}>
              Volver al inventario
            </Link>
          </div>
        ) : (
          <ProductForm
            initialValues={product}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="Guardar cambios"
          />
        )}
      </div>
    </div>
  )
}
