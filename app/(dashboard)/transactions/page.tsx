'use client'

import { useTransactions } from "@/hooks/use-transactions"
import { formatCurrency, parseLocalDate } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { 
 ArrowDownCircle, 
 ArrowUpCircle,
 ChevronLeft,
 ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAccount } from "@/contexts/account-context"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { TransactionType } from "@/types/transaction"
import { NewTransactionDialog } from "@/components/transactions/new-transaction-dialog"

export default function TransactionsPage() {
 const { selectedAccount } = useAccount()
 const [currentPage, setCurrentPage] = useState(0)
 const { data, isLoading, error } = useTransactions(currentPage)

 if (!selectedAccount) {
   return (
     <div className="p-8">
       <p>Selecione uma conta para visualizar as transações.</p>
     </div>
   )
 }

 if (isLoading) {
   return (
     <div className="p-8">
       <p>Carregando transações...</p>
     </div>
   )
 }

 if (error) {
   return (
     <div className="p-8">
       <p>Erro ao carregar transações.</p>
     </div>
   )
 }

 return (
   <div className="p-8 space-y-6">
     <div className="flex justify-between items-center">
       <h1 className="text-2xl font-bold">Transações</h1>
       <NewTransactionDialog />
     </div>

     <Card>
       <CardHeader>
         <CardTitle>Todas as Transações</CardTitle>
       </CardHeader>
       <CardContent>
         {/* Tabela de Transações */}
         <div className="overflow-x-auto">
           <table className="w-full">
             <thead>
               <tr className="border-b">
                 <th className="text-left p-3">Data</th>
                 <th className="text-left p-3">Descrição</th>
                 <th className="text-left p-3">Categoria</th>
                 <th className="text-right p-3">Valor</th>
               </tr>
             </thead>
             <tbody>
               {data?.content.map((transaction) => (
                 <tr 
                   key={transaction.id} 
                   className="border-b hover:bg-gray-50"
                 >
                   <td className="p-3">
                     {format(parseLocalDate(transaction.date), "d 'de' MMMM, yyyy", {
                       locale: ptBR
                     })}
                   </td>
                   <td className="p-3">
                     <div className="flex items-center gap-2">
                       <div className={`p-1 rounded-full ${
                         transaction.type === TransactionType.INCOME 
                           ? 'bg-green-100' 
                           : 'bg-red-100'
                       }`}>
                         {transaction.type === TransactionType.INCOME ? (
                           <ArrowUpCircle className="w-4 h-4 text-green-600" />
                         ) : (
                           <ArrowDownCircle className="w-4 h-4 text-red-600" />
                         )}
                       </div>
                       {transaction.description}
                     </div>
                   </td>
                   <td className="p-3">{transaction.category}</td>
                   <td className={`p-3 text-right ${
                     transaction.type === TransactionType.INCOME 
                       ? 'text-green-600' 
                       : 'text-red-600'
                   }`}>
                     {transaction.type === TransactionType.INCOME ? '+' : '-'}
                     {formatCurrency(transaction.amount)}
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>

         {/* Paginação */}
         {data && (
           <div className="mt-4 flex items-center justify-between">
             <p className="text-sm text-gray-500">
               Mostrando {data.numberOfElements} de {data.totalElements} transações
             </p>
             <div className="flex gap-2">
               <Button
                 variant="outline"
                 size="sm"
                 onClick={() => setCurrentPage(prev => prev - 1)}
                 disabled={data.first}
               >
                 <ChevronLeft className="h-4 w-4" />
                 Anterior
               </Button>
               <Button
                 variant="outline"
                 size="sm"
                 onClick={() => setCurrentPage(prev => prev + 1)}
                 disabled={data.last}
               >
                 Próxima
                 <ChevronRight className="h-4 w-4" />
               </Button>
             </div>
           </div>
         )}
       </CardContent>
     </Card>
   </div>
 )
}