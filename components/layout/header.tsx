'use client'

import { Brain, ChevronDown, User, LogOut, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/auth-context";
import { useLogout } from "@/lib/auth";

export function Header() {
  const { user } = useAuth()
  const logout = useLogout()

  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Minerva Money
          </span>
        </div>

        {/* Seletor de Conta */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <Wallet className="h-5 w-5 text-gray-500" />
            <span>Conta Default</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem>Conta Default</DropdownMenuItem>
            <DropdownMenuItem>Conta Pessoal</DropdownMenuItem>
            <DropdownMenuItem>Conta Negócios</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Menu Usuário */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <span>{user?.fullName}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}