"use client";

import { Favicon } from "@/app/images/index";
import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
      <div className="p-3 flex items-center gap-2">
        <Image
          src={Favicon}
          alt="logo image"
          width={30}
          height={30}
          className="shadow-lg"
        />
        <h3 className="text-xl">TulsHub</h3>
      </div>

      <Link
        href="/html-to-docx"
        className="bg-[#2f27ce] text-white px-4 py-2 rounded-lg hover:bg-[#443dff] transition"
      >
        Get Started
      </Link>
    </nav>
  );
};
