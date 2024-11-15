import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NewTransactionDialog } from "@/components/transactions/new-transaction-dialog";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 pb-16 md:pb-0 relative">
          {children}
          {/* <ActionButton /> */}
          <div className="fixed right-4 bottom-20 md:hidden">
            <NewTransactionDialog />
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
