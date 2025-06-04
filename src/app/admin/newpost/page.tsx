"use client";

import dynamic from "next/dynamic";

const TinyEditor = dynamic(() => import("@/components/TinyEditor"), { ssr: false });

// import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// import TinyEditor from "@/components/TinyEditor";

// export const metadata: Metadata = {
//   title: "New Post",
// }

export default function NewPostPage() {
  return (
    <div className="mt-3 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
          >
            Status Bar
          </DropdownMenuItem>
          <DropdownMenuItem
          >
            Activity Bar
          </DropdownMenuItem>
          <DropdownMenuItem
          >
            Panel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <TinyEditor />
    </div>
  );
}