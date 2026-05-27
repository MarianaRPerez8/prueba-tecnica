import { Link } from 'react-router-dom'

const CATEGORY_COLORS = {
  Ropa: 'bg-pink-100 text-pink-700',
  Electrónica: 'bg-blue-100 text-blue-700',
  Hogar: 'bg-amber-100 text-amber-700',
  Deportes: 'bg-green-100 text-green-700',
  default: 'bg-gray-100 text-gray-600',
}

export default function ProductCard({ product, onDelete }) {
  const categoryClass = CATEGORY_COLORS[product.categoria] || CATEGORY_COLORS.default
  const stockColor =
    product.stock === 0
      ? 'text-red-600 bg-red-50'
      : product.stock <= 5
      ? 'text-amber-600 bg-amber-50'
      : 'text-green-600 bg-green-50'

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
   
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={product.Imagen || `https://picsum.photos/seed/${product.id}/400/300`}
          alt={product.nombre}
          className="w-full h-full object-cover"
          onError={e => {
            e.target.src = `https://picsum.photos/seed/${product.id}/400/300`
          }}
        />
        <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryClass}`}>
          {product.categoria}
        </span>
      </div>

    
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 mb-2">
          {product.nombre}
        </h3>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <span className="text-lg font-bold text-indigo-700">
            ${Number(product.precio).toLocaleString('es-CO')}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${stockColor}`}>
            Stock: {product.stock}
          </span>
        </div>

        
        <div className="flex gap-2 mt-3">
          <Link
            to={`/productos/editar/${product.id}`}
            className="flex-1 text-center text-sm font-medium py-2 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
          >
            
          </Link>
          <button
            onClick={() => onDelete(product)}
            className="flex-1 text-sm font-medium py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          >
            
          </button>
        </div>
      </div>
    </div>
  )
}
