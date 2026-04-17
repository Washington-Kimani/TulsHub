
import React from "react";
import { SideBar } from "@/app/components/sidebar/index";

export default function ToolsLayout({ children }: {children: React.ReactNode}) {
  return (
    <div className="flex">
      <SideBar />

      <main className="ml-[260px] w-full p-6">{children}</main>
    </div>
  );
}
