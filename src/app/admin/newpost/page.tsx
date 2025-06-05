"use client";

import { useState } from "react";

import dynamic from "next/dynamic";

const TinyEditor = dynamic(() => import("@/components/TinyEditor"), { ssr: false });

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NewPostPage() {
  const [category, setCategory] = useState<string>("category");
  const [title, setTitle] = useState<string>("");

  return (
    <div className="mt-3">
      <div className="mb-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="border-[#d2d2d2]">
            <Button variant="outline" className="text-gray-600">{category}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border-[#d2d2d2] bg-white text-gray-600" align="start">
            <DropdownMenuItem
              onSelect={() => setCategory("Category1")}
              className="hover:bg-gray-100"
            >
              One
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setCategory("Category2")}
              className="hover:bg-gray-100"
            >
              - Nested One
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setCategory("Category3")}
              className="hover:bg-gray-100"
            >
              Three
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <input 
        id="title" 
        name="title" 
        type="text" 
        className="outline-none p-3 border-b border-[#d2d2d2] w-full mb-5 text-[25px]"
        placeholder="Title here" 
        value={title} 
        onChange={(e) => {setTitle(e.target.value)}}
      />
      <TinyEditor />
      <div className="flex justify-end gap-4 mt-5">
        <div className="rounded-full px-7 py-2 cursor-pointer text-center border ">
          Save |
          <span className="text-red-500"> 2</span>
        </div>
        <div className="rounded-full px-7 py-2 cursor-pointer text-center bg-black text-white ">
          Submit
        </div>
      </div>
    </div>
  );
}