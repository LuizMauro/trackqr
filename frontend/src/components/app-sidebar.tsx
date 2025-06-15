import * as React from "react";
import { GalleryVerticalEnd, QrCode } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";

const data = {
  user: {
    name: "",
    email: "",
    avatar: "",
  },
  teams: [
    {
      name: "TrackQr",
      logo: GalleryVerticalEnd,
      plan: "TrackQr",
    },
  ],
  navMain: [
    // {
    //   title: "Usuários",
    //   url: "#",
    //   icon: Users,
    //   isActive: true,
    //   items: [
    //     {
    //       title: "Criar",
    //       url: "#",
    //     },
    //     {
    //       title: "Listar",
    //       url: "#",
    //     },
    //   ],
    // },
    {
      title: "QRCode",
      url: "#",
      icon: QrCode,
      isActive: true,
      items: [
        {
          title: "Lista",
          url: "/list-qrcode",
        },
        {
          title: "Criar",
          url: "/create-qrcode",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      data.user.email = user.email;
      data.user.name = user.name;
    }
  }, [user]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center gap-2">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground w-lg">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">TrackQR</span>
              {/* <span className="truncate text-xs">Dashboard boilerplate</span> */}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ ...data.user, ...user }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
