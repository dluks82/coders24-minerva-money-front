'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CircleDollarSign,
  Wallet,
  Tags,
} from "lucide-react";

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Transações', icon: CircleDollarSign, path: '/transactions' },
  { name: 'Contas', icon: Wallet, path: '/accounts' },
  { name: 'Categorias', icon: Tags, path: '/categories' },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-white">
      <div className="flex items-center justify-around h-16">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 text-sm",
              pathname === item.path 
                ? "text-purple-600" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}