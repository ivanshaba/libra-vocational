export interface AuthUser {
  id: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null,
  createdBy: string | null,
  updatedBy: string | null,
  version: number,
  isDeleted: false,
  email: string
  password: string
  roles: string[]
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  confirmPassword: string
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string
    user: AuthUser
  }
}
