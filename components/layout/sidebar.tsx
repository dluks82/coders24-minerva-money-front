'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CircleDollarSign,
  Wallet,
  Tags,
  ChevronLeft,
} from "lucide-react";

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Transações', icon: CircleDollarSign, path: '/transactions' },
  { name: 'Contas', icon: Wallet, path: '/accounts' },
  { name: 'Categorias', icon: Tags, path: '/categories' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col border-r bg-white w-64 min-h-screen">
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100",
              pathname === item.path && "bg-purple-50 text-purple-600"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}