"use client";

import { IconDashboard, IconInnerShadowTop } from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Package, ShoppingBag, User } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
  },
  navMain: [
    { title: "Dashboard", key: "dashboard", icon: IconDashboard },
    { title: "Usuarios", key: "users", icon: User },
    { title: "Productos", key: "products", icon: Package },
    { title: "Pedidos", key: "orders", icon: ShoppingBag },
  ],
};

export function AppSidebar({
  onSelectTab,
  selectedKey,
  ...props
}: Omit<React.ComponentProps<typeof Sidebar>, "onSelect"> & {
  onSelectTab: (key: string) => void;
  selectedKey: string;
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Econova Admin</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain
          items={data.navMain}
          onSelectTab={onSelectTab}
          selectedKey={selectedKey}
        />
      </SidebarContent>
    </Sidebar>
  );
}
