"use client";
import clsx from "clsx";
import { useState } from "react";
import { homemadeApple } from "@/lib/font";
import Link from "next/link";

// Icons
import { IoHomeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoClipboardOutline } from "react-icons/io5";

export default function AdminLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [overlayStatus, setOverlayStatus] = useState(false);

  return (
    <main className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={clsx(
        "min-w-[304px] min-h-full flex flex-col p-10 shadow-[2px_0px_15px_0px_rgba(0,0,0,0.25)] absolute md:relative z-100 translate-x-[-304px] md:translate-x-0 bg-[#ffffff] transition-all duration-300 ease-in-out",
        {
          "max-md:translate-x-[-304px] max-md:invisible": !sidebarStatus,
          "max-md:translate-x-0": sidebarStatus,
        }
        )}>
        <span className="mb-10">
          <Link href="/admin" className={`${homemadeApple.className} text-[25px]`}>Log Horizon</Link>
        </span>

        <div 
          className="absolute right-10 top-12 rounded-full cursor-pointer md:hidden"
          onClick={() => {
            setSidebarStatus(!sidebarStatus) 
            setOverlayStatus(!overlayStatus)
          }}
        >
          <IoMdClose size={25}/>
        </div>

        <Link href="/admin/newpost" className="bg-[#E2F0FF] cursor-pointer rounded-[5px] py-2 text-center">
          New Post
        </Link>

        <div className="flex flex-col gap-5">
          <div className="flex items-center mt-10">
            <Link href="/dashboard" className="flex gap-2 items-center">
              <IoHomeOutline className="size-[30px]"/>
              <span className="text-[20px]">Blog Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <IoClipboardOutline className="size-[30px]"/>
            <span className="text-[20px]">Contents</span>
          </div>
          <div className="flex flex-col gap-3 pl-6">
            <span><Link href="/admin/posts">Post Management</Link></span>
            <span><Link href="/admin/category">Category Management</Link></span>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      <div className={
        clsx(
          "absolute top-0 left-0 min-w-full min-h-full bg-black/50 z-50 transition-transform duration-300 ease-in-out md:hidden",
          {
            "invisible": !overlayStatus,
            "visible": overlayStatus,
          }
        )}
        onClick={() => {
          setSidebarStatus(!sidebarStatus); 
          setOverlayStatus(!overlayStatus);
        }}
      />
  
      <div className="flex-col p-10">
        {/* Toggle Button */}
        <button 
          className="md:hidden p-2 text-[20px] top-0 left-0 relative transition-colors duration-300 ease-in-out hover:bg-gray-100 rounded-[5px] cursor-pointer" 
          onClick={() => {
            setSidebarStatus(!sidebarStatus) 
            setOverlayStatus(!overlayStatus)
          }}
        >
          <HiMiniBars3 />
        </button>
        {/* Contents */}
        {children}
      </div>

    </main>
  )
}