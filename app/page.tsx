// src/app/page.tsx
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function Home() {
    const cookieStore = await cookies()
    const token = cookieStore.get('minerva_token')

    if (token) {
        redirect('/dashboard')
    }

    redirect('/login')
}