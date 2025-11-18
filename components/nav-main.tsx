"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
  onSelectTab,
  selectedKey,
}: {
  items: { title: string; key: string; icon?: React.ElementType }[];
  onSelectTab: (key: string) => void;
  selectedKey: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => onSelectTab(item.key)}
                className={`flex items-center gap-2 ${
                  selectedKey === item.key
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
