"use client";

import { useTransactions } from "@/hooks/use-transactions";
import { formatCurrency, parseLocalDate } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccount } from "@/contexts/account-context";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TransactionType } from "@/types/transaction";
import { NewTransactionDialog } from "@/components/transactions/new-transaction-dialog";
import { DeleteTransactionAlert } from "@/components/transactions/delete-transaction-alert";
import { cn } from "@/lib/utils";

export default function TransactionsPage() {
  const { selectedAccount } = useAccount();
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading, error } = useTransactions(currentPage);

  if (!selectedAccount) {
    return (
      <div className="p-8">
        <p>Selecione uma conta para visualizar as transações.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <p>Carregando transações...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p>Erro ao carregar transações.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transações</h1>
        <NewTransactionDialog />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Todas as Transações</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Tabela para Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Data</th>
                  <th className="text-left p-3">Descrição</th>
                  <th className="text-left p-3">Categoria</th>
                  <th className="text-right p-3">Valor</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {data?.content.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className={cn(
                      "border-b hover:bg-gray-50",
                      transaction.deleted && "opacity-50 bg-gray-50"
                    )}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {transaction.deleted && (
                          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                            Excluída
                          </span>
                        )}
                        {format(
                          parseLocalDate(transaction.date),
                          "d 'de' MMMM, yyyy",
                          {
                            locale: ptBR,
                          }
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1 rounded-full ${
                            transaction.type === TransactionType.INCOME
                              ? "bg-green-100"
                              : "bg-red-100"
                          }`}
                        >
                          {transaction.type === TransactionType.INCOME ? (
                            <ArrowUpCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <ArrowDownCircle className="w-4 h-4 text-red-600" />
                          )}
                        </div>
                        <span
                          className={transaction.deleted ? "line-through" : ""}
                        >
                          {transaction.description}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">{transaction.category}</td>
                    <td
                      className={`p-3 text-right ${
                        transaction.type === TransactionType.INCOME
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === TransactionType.INCOME ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="p-3 text-right">
                      {!transaction.deleted && (
                        <DeleteTransactionAlert
                          transactionId={transaction.id}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lista para Mobile */}
          <div className="md:hidden space-y-4">
            {data?.content.map((transaction) => (
              <div
                key={transaction.id}
                className={cn(
                  "p-4 border rounded-lg",
                  transaction.deleted && "opacity-50 bg-gray-50"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-1 rounded-full ${
                        transaction.type === TransactionType.INCOME
                          ? "bg-green-100"
                          : "bg-red-100"
                      }`}
                    >
                      {transaction.type === TransactionType.INCOME ? (
                        <ArrowUpCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "font-medium",
                            transaction.deleted && "line-through"
                          )}
                        >
                          {transaction.description}
                        </span>
                        {transaction.deleted && (
                          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                            Excluída
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">
                        {format(
                          parseLocalDate(transaction.date),
                          "d 'de' MMMM, yyyy",
                          {
                            locale: ptBR,
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`text-right ${
                      transaction.type === TransactionType.INCOME
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === TransactionType.INCOME ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-2 pt-2 border-t">
                  <span className="text-sm text-gray-500">
                    {transaction.category}
                  </span>
                  {!transaction.deleted && (
                    <DeleteTransactionAlert transactionId={transaction.id} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Paginação */}
          {data && (
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 text-center sm:text-left">
                Mostrando {data.numberOfElements} de {data.totalElements}{" "}
                transações
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={data.first}
                >
                  <ChevronLeft className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Anterior</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={data.last}
                >
                  <span className="hidden sm:inline">Próxima</span>
                  <ChevronRight className="h-4 w-4 ml-1 sm:ml-2" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
