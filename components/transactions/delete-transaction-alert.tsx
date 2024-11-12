// src/components/transactions/delete-transaction-alert.tsx
"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccount } from "@/contexts/account-context";
import { api } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteTransactionAlertProps {
  transactionId: string;
}

export function DeleteTransactionAlert({
  transactionId,
}: DeleteTransactionAlertProps) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const { selectedAccount } = useAccount();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: deleteTransaction, isPending } = useMutation({
    mutationFn: async () => {
      await api.delete(
        `/accounts/${selectedAccount?.id}/transactions/${transactionId}`,
        {
          data: { reason },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      setOpen(false);
      setReason("");
      toast({
        title: "Transação excluída",
        description: "A transação foi excluída com sucesso.",
        variant: "destructive"
      });
    },
    onError: () => {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a transação.",
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir transação</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Por favor, informe o motivo da
              exclusão.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <Input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Motivo da exclusão"
              className="w-full"
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTransaction()}
              disabled={!reason.trim() || isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? "Excluindo..." : "Excluir"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
