"use client";

import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";

import { MinimalTreeItemData } from "@/lib/types";

const TinyEditor = dynamic(() => import("@/components/TinyEditor"), { ssr: false });

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NewPostPage() {
  const [categoryItems, setCategoryItems] = useState<MinimalTreeItemData[]>([])
  const [category, setCategory] = useState<string>("Select the Category");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    async function getCategory() {
      try {
        const res = await fetch("/api/admin/category")
        const data = await res.json()
        console.log(data)
        setCategoryItems(data)
      } catch(error) {
        console.log("Failed to fetch category items: ", error)
      }
    }
    getCategory()
  }, [])

  return (
    <div className="mt-3">
      <div className="mb-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="border-[#d2d2d2]">
            <Button variant="outline" className="text-gray-600 outline-none">{category}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border-[#d2d2d2] bg-white text-gray-600" align="start">
            {categoryItems.map((rootItem) => (
              <React.Fragment key={rootItem.id}>
                <DropdownMenuItem
                  onSelect={() => setCategory(rootItem.value)}
                  className="hover:bg-gray-100"
                >
                  {rootItem.value}
                </DropdownMenuItem>

                {rootItem.children?.map((child) => (
                  <DropdownMenuItem
                    key={child.id}
                    onSelect={() => setCategory(child.value)}
                    className="hover:bg-gray-100"
                  >
                    - {child.value}
                  </DropdownMenuItem>
                ))}
              </React.Fragment>
            ))}
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