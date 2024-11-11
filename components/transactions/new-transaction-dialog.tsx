'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { useCategories } from '@/hooks/use-categories'
import { useAccount } from '@/contexts/account-context'
import { TransactionType, type CreateTransactionData } from '@/types/transaction'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"

export function NewTransactionDialog() {
  const { selectedAccount } = useAccount()
  const { data: categories } = useCategories()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  
  const [form, setForm] = useState({
    amount: '',
    type: TransactionType.EXPENSE,
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  })

  const { mutate: createTransaction, isPending } = useMutation({
    mutationFn: async () => {
      const data: CreateTransactionData = {
        amount: Number(form.amount),
        type: form.type,
        description: form.description,
        category: Number(form.category),
        date: form.date
      }

      await api.post(
        `/accounts/${selectedAccount?.id}/transactions`, 
        data
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ 
        queryKey: ['transactions', selectedAccount?.id]
      })
      queryClient.invalidateQueries({
        queryKey: ['dashboard', selectedAccount?.id]
      })
      setOpen(false)
      setForm({
        amount: '',
        type: TransactionType.EXPENSE,
        description: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      })
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createTransaction()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Nova Transação
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tipo</label>
            <Select
              value={form.type}
              onValueChange={(value) => 
                setForm(prev => ({ ...prev, type: value as TransactionType }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={TransactionType.EXPENSE}>Despesa</SelectItem>
                <SelectItem value={TransactionType.INCOME}>Receita</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descrição</label>
            <Input
              value={form.description}
              onChange={(e) => 
                setForm(prev => ({ ...prev, description: e.target.value }))
              }
              placeholder="Descrição da transação"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Valor</label>
            <Input
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(e) => 
                setForm(prev => ({ ...prev, amount: e.target.value }))
              }
              placeholder="0,00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Categoria</label>
            <Select
              value={form.category}
              onValueChange={(value) => 
                setForm(prev => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id?.toString() ?? ''}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Data</label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => 
                setForm(prev => ({ ...prev, date: e.target.value }))
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!form.description || !form.amount || !form.category || isPending}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isPending ? 'Criando...' : 'Criar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}