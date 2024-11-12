// src/components/dashboard/recent-transactions.tsx
import { formatCurrency, parseLocalDate, cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Transaction, TransactionType } from "@/types/transaction";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card className="col-span-full mt-4">
      <CardHeader>
        <CardTitle>Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500">
              Nenhuma transação encontrada
            </p>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={cn(
                  "flex items-center justify-between py-4 border-b last:border-0",
                  transaction.deleted && "opacity-50 bg-gray-50 rounded-lg"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
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
                      <p className={cn(
                        "font-medium",
                        transaction.deleted && "line-through"
                      )}>
                        {transaction.description}
                      </p>
                      {transaction.deleted && (
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                          Excluída
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {transaction.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-medium ${
                      transaction.type === TransactionType.INCOME
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === TransactionType.INCOME ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(parseLocalDate(transaction.date), "d 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}