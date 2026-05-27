const AUTH_KEY = 'ecommerce_admin_user'

export const authService = {
  login(username, pin) {
    const userData = { username, pin, loginAt: new Date().toISOString() }
    localStorage.setItem(AUTH_KEY, JSON.stringify(userData))
    return userData
  },

  logout() {
    localStorage.removeItem(AUTH_KEY)
  },

  getUser() {
    try {
      const data = localStorage.getItem(AUTH_KEY)
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  },

  isAuthenticated() {
    return this.getUser() !== null
  },
}
