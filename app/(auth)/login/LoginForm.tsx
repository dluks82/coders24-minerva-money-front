'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginData } from '@/lib/schemas/auth'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain } from "lucide-react"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { authService } from '@/services/auth'
import axios from 'axios'
import { useAuth } from '@/contexts/auth-context'

export function LoginForm() {
    const router = useRouter()
    const { setUser } = useAuth()
    const searchParams = useSearchParams()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState<string | null>(null)

    useEffect(() => {
        if (searchParams.get('registered')) {
            setSuccess('Conta criada com sucesso! Faça login para continuar.')
        }
    }, [searchParams])

    useEffect(() => {
      if (searchParams.get('session_expired')) {
        setError('Sua sessão expirou. Por favor, faça login novamente.')
      }
    }, [searchParams])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginData) => {
        try {
            setError('')
            const authResponse = await authService.login(data)
            localStorage.setItem('minerva_token', authResponse.token)
            document.cookie = `minerva_token=${authResponse.token}; path=/`

            const userData = await authService.getProfile()

            setUser(userData)

            router.push('/dashboard')
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.error || 'Email ou senha inválidos')
            } else {
                setError('Ocorreu um erro ao fazer login')
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center justify-center p-4">
            <div className="flex items-center gap-2 mb-8">
                <div className="p-2 bg-purple-600 rounded-lg">
                    <Brain className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Minerva Money
                </span>
            </div>

            <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-center">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {success && (
                            <Alert className="bg-green-50 text-green-700 border-green-200">
                                <AlertDescription>{success}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                {...register('email')}
                                className={errors.email ? 'border-red-500' : ''}
                            />
                            {errors.email && (
                                <span className="text-sm text-red-500">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Senha</label>
                            <Input
                                type="password"
                                {...register('password')}
                                className={errors.password ? 'border-red-500' : ''}
                            />
                            {errors.password && (
                                <span className="text-sm text-red-500">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Entrando...' : 'Entrar'}
                        </Button>

                        <p className="text-center text-sm text-gray-500">
                            Não tem uma conta?{' '}
                            <Link
                                href="/signup"
                                className="text-purple-600 hover:underline"
                            >
                                Cadastre-se
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}