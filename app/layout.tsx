import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import { QueryProvider } from '@/providers/query-providers';
import { AccountProvider } from '@/contexts/account-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Minerva Money',
  description: 'Controle financeiro inteligente',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR">
      <body>
        <QueryProvider>
          <AuthProvider>
            <AccountProvider>
            {children}
            </AccountProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}