import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'

export function useLogout() {
  const { setUser } = useAuth()
  const router = useRouter()

  const logout = () => {
    // 1. Limpar tokens
    localStorage.removeItem('minerva_token')
    document.cookie = 'minerva_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'

    // 2. Limpar estado do usuário
    setUser(null)

    // 3. Limpar cache do React Query
    // queryClient.clear()

    // 4. Redirecionar para login
    router.push('/login')
  }

  return logout
}

export function logout() {
  // 1. Limpar tokens
  localStorage.removeItem('minerva_token')
  document.cookie = 'minerva_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'

  // 2. Redirecionar para login com mensagem
  window.location.href = '/login?session_expired=true'
}