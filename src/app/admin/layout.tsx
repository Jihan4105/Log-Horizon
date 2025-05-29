"use client";
import clsx from "clsx";
import { useState } from "react";
import { homemadeApple } from "@/lib/font";
import Link from "next/link";

// Icons
import { IoHomeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

export default function AdminLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarStatus, setSidebarStatus] = useState(false);

  return (
    <main className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={clsx(
        "min-w-[304px] md:flex flex-col p-10 shadow-[2px_0px_15px_0px_rgba(0,0,0,0.25)] relative z-100 translate-x-[-304px] md:translate-x-0 hidden",
        {
          "max-md:translate-x-[-304px] max-md:hidden": !sidebarStatus,
          "max-md:translate-x-0 max-md:flex": sidebarStatus,
        }
        )}>
        <span className="mb-10">
          <Link href="/admin" className={`${homemadeApple.className} text-[25px]`}>Log Horizon</Link>
        </span>

        <div className="absolute right-10 top-12">
          <IoMdClose size={25}/>
        </div>

        <Link href="/admin/newpost" className="bg-[#E2F0FF] cursor-pointer rounded-[5px] py-2 text-center">
          New Post
        </Link>

        <li className="flex flex-col gap-5">
          <ul>
            <Link href="/dashboard" className="flex gap-2 mt-10 items-center">
              <IoHomeOutline className="size-[30px]"/>
              <span className="text-[20px]">Blog Home</span>
            </Link>
          </ul>
        </li>
      </aside>

      {/* Toggle Button */}
      <button 
        className="md:hidden p-4 text-[30px] top-0 left-0 border relative" 
        onClick={() => setSidebarStatus(!sidebarStatus)}>
          Toggle
      </button>

      {/* Contents */}
      {children}
    </main>
  )
}