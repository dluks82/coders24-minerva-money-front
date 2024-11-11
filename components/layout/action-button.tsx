'use client';

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ActionButton() {
 return (
   <>
     {/* Mobile: FAB */}
     <Button
       className="md:hidden fixed right-4 bottom-20 h-14 w-14 rounded-full shadow-lg"
       onClick={() => {/* Abrir modal/form de nova transação */}}
     >
       <Plus className="h-6 w-6" />
     </Button>

     {/* Desktop: Botão normal */}
     <Button
       className="hidden md:flex items-center gap-2 absolute right-8 top-4"
       onClick={() => {/* Abrir modal/form de nova transação */}}
     >
       <Plus className="h-5 w-5" />
       Nova Transação
     </Button>
   </>
 );
}