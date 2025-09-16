import { Search, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalletConnect } from "@/components/WalletConnect";

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 shadow-card">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-semibold text-card-foreground">Dashboard Overview</h1>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search metrics, customers, or reports..."
            className="pl-9 bg-muted/50 border-0 focus:bg-card"
          />
        </div>

        {/* Actions */}
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Bell className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
          <Settings className="h-4 w-4" />
        </Button>

        {/* Wallet Connection */}
        <WalletConnect />
      </div>
    </header>
  );
}