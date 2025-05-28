import type { Metadata } from "next";
import { homemadeApple } from "@/lib/font";
import Link from "next/link";

// Icons
import { IoHomeOutline } from "react-icons/io5";

export const metadata: Metadata = {
  title: "AdminDashboard"
}

export default function AdminLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(children)
  return (
    <main className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[304px] md:flex flex-col p-10 shadow-[2px_0px_15px_0px_rgba(0,0,0,0.25)] relative z-100 translate-x-[-304px] md:translate-x-0 hidden">
        <span className="mb-10">
          <Link href="/admin" className={`${homemadeApple.className} text-[25px]`}>Log Horizon</Link>
        </span>

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

      {/* Contents */}
      {children}
    </main>
  )
}