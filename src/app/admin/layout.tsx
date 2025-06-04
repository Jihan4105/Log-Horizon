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
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LuUserRoundCog } from "react-icons/lu";


export default function AdminLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [overlayStatus, setOverlayStatus] = useState(false);

  function switchSidebarStatus() {
    setSidebarStatus(!sidebarStatus);
    setOverlayStatus(!overlayStatus);
  }

  return (
    <main className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={clsx(
        "min-w-[304px] min-h-screen flex flex-col p-10 shadow-[2px_0px_15px_0px_rgba(0,0,0,0.25)] fixed z-100 translate-x-[-304px] md:translate-x-0 bg-[#ffffff] transition-all duration-300 ease-in-out",
        {
          "max-md:translate-x-[-304px] max-md:invisible": !sidebarStatus,
          "max-md:translate-x-0": sidebarStatus,
        }
        )}>
        <span className="mb-10">
          <Link href="/admin" className={`${homemadeApple.className} text-[25px]`} onClick={() => { switchSidebarStatus();}}>Log Horizon</Link>
        </span>

        <div 
          className="absolute right-10 top-12 rounded-full cursor-pointer md:hidden"
          onClick={() => { switchSidebarStatus();}}
        >
          <IoMdClose size={25}/>
        </div>

        <Link 
          href="/admin/newpost" 
          className="bg-[#E2F0FF] cursor-pointer rounded-[5px] py-2 text-center" onClick={() => { switchSidebarStatus();}}
        >
          New Post
        </Link>

        <div className="flex flex-col gap-5">
          <div className="flex items-center mt-10">
            <Link href="/dashboard" className="flex gap-2 items-center" onClick={() => { switchSidebarStatus();}}>
              <IoHomeOutline className="size-[30px]"/>
              <span className="text-[20px]">Blog Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <IoClipboardOutline className="size-[30px]"/>
            <span className="text-[20px]">Contents</span>
          </div>
          <div className="flex flex-col gap-3 pl-6">
            <span><Link href="/admin/posts" onClick={() => { switchSidebarStatus();}}>Post Management</Link></span>
            <span><Link href="/admin/category" onClick={() => { switchSidebarStatus();}}>Category Management</Link></span>
          </div>
          <div className="flex items-center gap-2">
            <IoChatbubbleEllipsesOutline className="size-[30px]"/>
            <span className="text-[20px]">Comments</span>
          </div>
          <div className="flex flex-col gap-3 pl-6">
            <span><Link href="/admin/comment" onClick={() => { switchSidebarStatus();}}>Post Management</Link></span>
          </div>
          <div className="flex items-center gap-2">
            <LuUserRoundCog className="size-[30px]"/>
            <span className="text-[20px]">User</span>
          </div>
          <div className="flex flex-col gap-3 pl-6">
            <span><Link href="/admin/user" onClick={() => { switchSidebarStatus();}}>User Management</Link></span>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      <div className={
        clsx(
          "fixed top-0 left-0 min-w-full min-h-screen bg-black/50 z-50 transition-transform duration-300 ease-in-out md:hidden",
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
  
      <div className="flex-col p-5 md:p-10 w-full h-full md:ml-[304px]">
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