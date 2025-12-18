import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar.tsx";
import { AppSidebar } from "@/widgets/sidebar/ui";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
