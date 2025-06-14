import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, LogOut, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Criar QrCode", href: "/create-qrcode", icon: QrCode },
  // { name: 'Analytics', href: '/analytics', icon: BarChart },
  // { name: 'Users', href: '/users', icon: Users },
  // { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="flex h-full w-64 flex-col bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center space-x-2">
          <LayoutDashboard className="h-6 w-6" />
          <span className="font-semibold">Dashboard</span>
        </Link>
      </div>
      <div className="flex-1 space-y-1 p-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent",
              location.pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
      <div className="border-t p-2">
        <Button
          variant="ghost"
          className="w-full justify-start space-x-2"
          onClick={() => logout()}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
