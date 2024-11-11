// src/app/(dashboard)/accounts/page.tsx
'use client'

import { useAccounts } from "@/hooks/use-accounts"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"
import { Account } from "@/types/accounts"

export default function AccountsPage() {
  const { data: accounts, isLoading } = useAccounts()

  if (isLoading) {
    return (
      <div className="p-8">
        <p>Carregando contas...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Contas</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {accounts?.map((account: Account) => (
          <Card key={account.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-purple-600" />
                  <span className="capitalize">
                    {account.name === 'default' ? 'Principal' : account.name}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Saldo atual</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(account.currentBalance)}
                </p>
              </div>
              
              {account.name === 'default' && (
                <p className="mt-4 text-xs text-gray-500 bg-purple-50 p-2 rounded">
                  Esta é sua conta principal e não pode ser alterada.
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {accounts?.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            <p>Nenhuma conta encontrada.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}