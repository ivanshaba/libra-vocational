export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'admin'
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: AuthUser
  token: string
}
