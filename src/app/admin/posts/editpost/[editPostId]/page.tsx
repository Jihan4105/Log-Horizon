"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, redirect } from "next/navigation";

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
import { Spinner } from "@/components/ui/spinner";
import { toast, Toaster } from "sonner";

export default function  EditPostPage() {
  const [categoryItems, setCategoryItems] = useState<MinimalTreeItemData[]>([])
  const [category, setCategory] = useState<string>("None");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const categoryRef = useRef(category);
  const titleRef = useRef(title);
  const contentRef = useRef(content);
  const params = useParams<{ editPostId: string; }>()
  const { editPostId } = params

  // Init Fetch
  useEffect(() => {
    async function getCategory() {
      try {
        const res = await fetch("/api/admin/category")
        const data = await res.json()
        setCategoryItems(data)
      } catch(error) {
        console.log("Failed to fetch category items: ", error)
      }
    }

    async function getPostDataById() {
      try {
        const res = await fetch(`/api/admin/posts/${editPostId}`)
        const postData = await res.json()
        setTitle(postData.title)
        setContent(postData.content)
        setCategory(postData.category)
      } catch(error) {
        console.log("Failed to fetch post data: ", error)
      }
    }

    getCategory()
    getPostDataById()
  }, [])

  // Save Changes
  useEffect(() => {
    async function SaveChanges() {
      if(isSubmitting) {
        const res = await EditPost(editPostId, category, title, content, setIsSubmitting)
        if(res !== "fail") {
          redirect('/admin/posts')
        }
      }
    }
    SaveChanges()
  }, [isSubmitting, category, content, title])

  // Ref save the newestValue for Autosaving.
  useEffect(() => {
    categoryRef.current = category;
    titleRef.current = title;
    contentRef.current = content;
  }, [category, title, content]);

  return (
    <div className="mt-3">
      <div className="mb-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="border-[#d2d2d2]">
            <Button variant="outline" className="text-gray-600 outline-none">
              {category === "None" ? 'Selecte the Category' : category}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border-[#d2d2d2] bg-white text-gray-600" align="start">
            <DropdownMenuItem
              onSelect={() => setCategory("None")}
              className="hover:bg-gray-100"
            >
              No Category
            </DropdownMenuItem>
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
        <div 
          className="rounded-full px-7 py-2 cursor-pointer text-center bg-black text-white "
          onClick={() => {
            setIsSubmitting(true)
          }}
        >
          {isSubmitting ?
            <Spinner size={20} />
            :
            "Edit Submit"
          }
        </div>
      </div>
      <Toaster />
    </div>
  );
}

async function EditPost(
  editPostId: string,
  category: string, 
  title:string, 
  content: string, 
  setIsSubmitting: (loading: boolean) => void
) {
  const data = {
    editPostId,
    category,
    title,
    content
  }

  try {
    const result = await fetch(`/api/admin/posts/editpost`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const res = await result.json()
    console.log(res.message)
    toast.success("New Post Submitted Successfully!")
    setIsSubmitting(false)
    return "success"
  } catch(error) {
    console.error("Error occured..: ", error);
    toast.error("Something went wrong while submitting post...")
    setIsSubmitting(false)
    return "fail"
  }
}