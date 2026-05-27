import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { productService } from '../services/productService'
import ProductForm from '../components/ProductForm'

export default function AddProductPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(productData) {
    try {
      setLoading(true)
      await productService.create(productData)
      await Swal.fire({
        title: '¡Producto creado!',
        text: `"${productData.nombre}" fue agregado al catálogo.`,
        icon: 'success',
        confirmButtonColor: '#9B2148',
        timer: 2000,
        timerProgressBar: true,
      })
      navigate('/productos')
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo crear el producto. Inténtalo de nuevo.',
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
        <h1 className="text-xl font-bold mb-6" style={{ color: '#6D1130' }}>Nuevo producto</h1>
        <ProductForm onSubmit={handleSubmit} loading={loading} submitLabel="Crear producto" />
      </div>
    </div>
  )
}
