import { Moon, Sun } from "lucide-react";

import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuItem
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        {theme}
      </DropdownMenuItem>
    </DropdownMenu>
  );
}
