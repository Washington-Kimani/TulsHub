"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  FileText,
  ImageDown,
  Link as LinkIcon,
  ChevronLeft,
} from "lucide-react";
import { Favicon } from "@/app/images";

const navItems = [
  {
    name: "HTML to DOCX",
    href: "/html-to-docx",
    icon: FileText,
  },
  {
    name: "Download Images",
    href: "/images-download",
    icon: ImageDown,
  },
  {
    name: "Extract Links",
    href: "/get-all-urls",
    icon: LinkIcon,
  },
];

export const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <nav
      className={`fixed top-4 left-4 h-[95vh] bg-[#ecebff] rounded-xl shadow-md flex flex-col justify-between transition-all duration-300
      ${collapsed ? "w-[70px]" : "w-[240px]"}`}
    >
      {/* TOP */}
      <div className="flex flex-col justify-between h-full w-full">
        {/* HEADER */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <Image src={Favicon} alt="logo" width={30} height={30} />
            {!collapsed && (
              <span className="font-semibold text-lg">TulsHub</span>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-[#2f27ce]"
          >
            {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* NAV ITEMS */}
        <div className="mt-4 flex flex-col gap-2 px-2">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={i}
                href={item.href}
                className={`group relative flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${active ? "bg-[#2f27ce] text-white" : "hover:bg-[#dddbff]"}`}
              >
                <Icon size={20} />

                {/* TEXT */}
                {!collapsed && <span>{item.name}</span>}

                {/* TOOLTIP */}
                {collapsed && (
                  <span className="absolute left-full ml-3 px-2 py-1 text-xs rounded-md bg-black text-white opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        {/* FOOTER */}
        <div className="p-3 text-xs text-gray-500 text-center">
          {!collapsed ? "© TulsHub" : "©"}
        </div>
      </div>
    </nav>
  );
};
