import { api } from '@/lib/axios'
import { LoginData, SignUpData } from '@/lib/schemas/auth'
import { AuthResponse } from '@/types/auth'
import { User } from '@/types/user'

export const authService = {
  async login(credentials: LoginData): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials)
    return data
  },

  async getProfile(): Promise<User> {
    const { data } = await api.get<User>('/users/me')
    return data
  },

  async register(credentials: SignUpData) {
    const { data } = await api.post('/auth/signup', credentials)
    return data
  }
}