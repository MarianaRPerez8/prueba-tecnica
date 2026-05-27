import { Link } from 'react-router-dom'

const CATEGORY_COLORS = {
  Ropa: { background: '#FCE4EC', color: '#880E4F' },
  Electrónica: { background: '#FCE4EC', color: '#9B2148' },
  Hogar: { background: '#F8BBD0', color: '#6D1130' },
  Deportes: { background: '#FCE4EC', color: '#AD1457' },
  Libros: { background: '#F8BBD0', color: '#880E4F' },
  default: { background: '#FCE4EC', color: '#9B2148' },
}

export default function ProductCard({ product, onDelete }) {
  const categoryStyle = CATEGORY_COLORS[product.categoria] || CATEGORY_COLORS.default
  const stockStyle =
    product.stock === 0
      ? { color: '#9B2148', background: '#FCE4EC' }
      : product.stock <= 5
      ? { color: '#B71C1C', background: '#FFEBEE' }
      : { color: '#2E7D32', background: '#E8F5E9' }

  return (
    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-md transition-shadow flex flex-col" style={{ border: '1.5px solid #F8BBD0', boxShadow: '0 1px 4px rgba(155,33,72,0.07)' }}>
      {/* Image */}
      <div className="relative h-48 overflow-hidden" style={{ background: '#FFF0F5' }}>
        <img
          src={product.Imagen || `https://picsum.photos/seed/${product.id}/400/300`}
          alt={product.nombre}
          className="w-full h-full object-cover"
          onError={e => {
            e.target.src = `https://picsum.photos/seed/${product.id}/400/300`
          }}
        />
        <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full" style={categoryStyle}>
          {product.categoria}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 mb-2" style={{ color: '#3D0017' }}>
          {product.nombre}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: '1px solid #FCE4EC' }}>
          <span className="text-lg font-bold" style={{ color: '#9B2148' }}>
            ${Number(product.precio).toLocaleString('es-CO')}
          </span>
          <span className="text-xs font-medium px-2 py-1 rounded-lg" style={stockStyle}>
            Stock: {product.stock}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <Link
            to={`/productos/editar/${product.id}`}
            className="flex-1 text-center text-sm font-medium py-2 rounded-xl transition-colors"
            style={{ background: '#FCE4EC', color: '#9B2148' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8BBD0'}
            onMouseLeave={e => e.currentTarget.style.background = '#FCE4EC'}
          >
            Editar
          </Link>
          <button
            onClick={() => onDelete(product)}
            className="flex-1 text-sm font-medium py-2 rounded-xl transition-colors"
            style={{ background: '#FCE4EC', color: '#6D1130' }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8BBD0'}
            onMouseLeave={e => e.currentTarget.style.background = '#FCE4EC'}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
