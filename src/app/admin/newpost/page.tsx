"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";

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

import { RiDeleteBin5Line } from "react-icons/ri";

export default function NewPostPage() {
  const [categoryItems, setCategoryItems] = useState<MinimalTreeItemData[]>([])
  const [category, setCategory] = useState<string>("Select the Category");
  const [title, setTitle] = useState<string>("");
  const [isSaveOpen, setIsSaveOpen] = useState<boolean>(false)
  const [content, setContent] = useState<string>("")

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
      <TinyEditor setContent={setContent} content={content}/>
      <div className="flex justify-end gap-4 mt-5">
        <div className="rounded-full cursor-pointer text-center border flex">
          <div className="pl-7 h-full flex items-center">
            Save |
          </div>
          <div 
            className="text-red-500 pr-7 pl-2 flex items-center"
            onClick={() => {setIsSaveOpen(!isSaveOpen)}}
          >
            2
          </div>
        </div>
        <div 
          className="rounded-full px-7 py-2 cursor-pointer text-center bg-black text-white "
          onClick={() => {
            SubmitNewPost(category, title, content)
          }}
        >
          Submit
        </div>
      </div>

      {/* Overlay */}
      <div className={clsx(
        "left-0 md:left-[304px] top-0 z-99 w-dvw h-dvh bg-white/70",
        {
          "hidden" : !isSaveOpen,
          "fixed" : isSaveOpen
        }
      )} />

      <div className={clsx(
        "w-[100%] fixed left-0 bottom-0 z-99 md:left-[304px] md:w-[calc(100%-304px)] p-5 md:p-10 h-[500px] overflow-hidden bg-white shadow-[0px_-3px_4px_0px_rgba(0,0,0,0.15)] transition-all duration-200 ease-in-out flex flex-col justify-between", 
        {
          "translate-y-[500px]": !isSaveOpen,
          "translate-y-0": isSaveOpen
        }
      )}>
        <div className="flex flex-col">
          <h1 className="text-2xl mb-4 self-center">Saves</h1>
          <div className="h-0.5 bg-[#CAE3FF] mb-4" />
          <ul className="flex flex-col gap-1">
            <li className="flex items-center group">
              <span className="w-[75px] mr-10">23hours ago</span>
              <span className="hover:underline cursor-pointer mr-2">
                Title that working...
              </span>
              <RiDeleteBin5Line className="hidden group-hover:block cursor-pointer"/>
            </li>
            <li className="flex items-center group">
              <span className="w-[75px] mr-10">2025-07-17</span>
              <span className="hover:underline cursor-pointer mr-2">
                Title that working...
              </span>
              <RiDeleteBin5Line className="hidden group-hover:block cursor-pointer"/>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="bg-gray-100 h-0.5 mb-9" />
          <div className="flex self-center gap-4">
            <div 
              className="px-7 py-2 rounded-full cursor-pointer text-center border flex"
              onClick={() => {setIsSaveOpen(!isSaveOpen)}}
            >
              Cancel
            </div>
            <div className="rounded-full px-7 py-2 cursor-pointer text-center bg-black text-white ">
              Temporary Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

async function SubmitNewPost(category: string, title:string, content: string) {
  const data = {
    route: "New Post",
    category,
    title,
    content
  }

  try {
    const result = await fetch('/api/admin/newpost', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const res = await result.json()
    console.log(res.message)
  } catch(error) {
    console.log("Error occured..: ", error);
  }
}