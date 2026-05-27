import { useState } from 'react'

const CATEGORIES = ['Ropa', 'Electrónica', 'Hogar', 'Deportes', 'Otros']

const EMPTY_FORM = {
  nombre: '',
  precio: '',
  categoria: '',
  stock: '',
  imagen: '',
}

export default function ProductForm({ initialValues = EMPTY_FORM, onSubmit, loading, submitLabel = 'Guardar' }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initialValues })
  const [errors, setErrors] = useState({})

  function validate() {
    const newErrors = {}
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.'
    if (form.precio === '' || form.precio === null) newErrors.precio = 'El precio es obligatorio.'
    else if (Number(form.precio) < 0) newErrors.precio = 'El precio no puede ser negativo.'
    if (!form.categoria) newErrors.categoria = 'Selecciona una categoría.'
    if (form.stock === '' || form.stock === null) newErrors.stock = 'El stock es obligatorio.'
    else if (Number(form.stock) < 0) newErrors.stock = 'El stock no puede ser negativo.'
    return newErrors
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onSubmit({
      nombre: form.nombre.trim(),
      precio: Number(form.precio),
      categoria: form.categoria,
      stock: Number(form.stock),
      imagen: form.imagen.trim() || `https://picsum.photos/seed/${Date.now()}/400/300`,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nombre del producto</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Ej: Camiseta básica negra"
          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white ${errors.nombre ? 'border-red-400' : 'border-gray-200'}`}
        />
        {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
      </div>

      {/* Precio y Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Precio (COP)</label>
          <input
            type="number"
            name="precio"
            value={form.precio}
            onChange={handleChange}
            placeholder="0"
            min="0"
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white ${errors.precio ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="0"
            min="0"
            className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white ${errors.stock ? 'border-red-400' : 'border-gray-200'}`}
          />
          {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
        </div>
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Categoría</label>
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white ${errors.categoria ? 'border-red-400' : 'border-gray-200'}`}
        >
          <option value="">Selecciona una categoría</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        {errors.categoria && <p className="text-red-500 text-xs mt-1">{errors.categoria}</p>}
      </div>

      {/* Imagen */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">URL de imagen <span className="text-gray-400 font-normal">(opcional)</span></label>
        <input
          type="url"
          name="imagen"
          value={form.imagen}
          onChange={handleChange}
          placeholder="https://ejemplo.com/imagen.jpg"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
        />
        <p className="text-gray-400 text-xs mt-1">Si no ingresas URL se usará una imagen placeholder automática.</p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Guardando...
          </>
        ) : submitLabel}
      </button>
    </form>
  )
}
