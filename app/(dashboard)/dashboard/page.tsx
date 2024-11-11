'use client'

import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccount } from "@/contexts/account-context";
import { useDashboard } from "@/hooks/use-dashboard";
import { formatCurrency } from "@/lib/utils";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export default function Dashboard() {
  const { selectedAccount } = useAccount();
  const { data: dashboard, isLoading, error } = useDashboard();

  if (!selectedAccount) {
    return (
      <div className="p-8">
        <p>Selecione uma conta para visualizar o dashboard.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p>Erro ao carregar dados do dashboard.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Card de Saldo */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <Wallet className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(dashboard?.summary.balance ?? 0)}
            </div>
          </CardContent>
        </Card>

        {/* Card de Receitas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receitas do Mês
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(dashboard?.summary.income ?? 0)}
            </div>
          </CardContent>
        </Card>

        {/* Card de Despesas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Despesas do Mês
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(dashboard?.summary.expenses ?? 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de transações recentes */}
      <RecentTransactions transactions={dashboard?.recentTransactions ?? []} />
    </div>
  );
}
