// MockAPI endpoint — replace with your own MockAPI URL after creating it
const BASE_URL = 'https://6a162f391b90031f81b0c0db.mockapi.io'

export const productService = {
  async getAll() {
    const res = await fetch(`${BASE_URL}/productos`)
    if (!res.ok) throw new Error('Error al cargar productos')
    return res.json()
  },

  async getById(id) {
    const res = await fetch(`${BASE_URL}/productos/${id}`)
    if (!res.ok) throw new Error('Producto no encontrado')
    return res.json()
  },

  async create(product) {
    const res = await fetch(`${BASE_URL}/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    if (!res.ok) throw new Error('Error al crear producto')
    return res.json()
  },

  async update(id, product) {
    const res = await fetch(`${BASE_URL}/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    if (!res.ok) throw new Error('Error al actualizar producto')
    return res.json()
  },

  async remove(id) {
    const res = await fetch(`${BASE_URL}/productos/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Error al eliminar producto')
    return res.json()
  },
}
