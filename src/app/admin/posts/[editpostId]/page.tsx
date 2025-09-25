"use client";

import React, { useState, useEffect, useRef } from "react";
import { useStateEffect } from "@/lib/hooks/useStateEffect";
import clsx from "clsx";

import dynamic from "next/dynamic";

import { MinimalTreeItemData, SavedPostsData } from "@/lib/types";

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

import { RiDeleteBin5Line } from "react-icons/ri";

export default function  EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [categoryItems, setCategoryItems] = useState<MinimalTreeItemData[]>([])
  const [savedPosts, setSavedPosts] = useState<SavedPostsData[]>([])
  const [category, setCategory] = useState<string>("None");
  const [title, setTitle] = useState<string>("");
  const [isSaveOpen, setIsSaveOpen] = useState<boolean>(false)
  const [content, setContent] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isRefreshRequire, setIsRefreshRequire] = useState<boolean>(false)
  const categoryRef = useRef(category);
  const titleRef = useRef(title);
  const contentRef = useRef(content);

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

    async function getSavedPost() {
      try {
        const res = await fetch("/api/admin/newpost")
        const data = await res.json()
        setSavedPosts(data)
      } catch(error) {
        console.log("Failed to fetch saved posts: ", error)
      }
    }

    async function getPostData() {
      const { id } = await params
      try {
        const res = await fetch(`/api/admin/posts/${id}`)
        const postData = await res.json()
        console.log(postData)
        setTitle(postData.title)
        setContent(postData.content)
        setCategory(postData.category)
      } catch(error) {
        console.log("Failed to fetch post data: ", error)
      }
    }

    getSavedPost()
    getCategory()
    getPostData()
  }, [])

  // Fetch savedPosts after post saved
  useStateEffect(() => {
    if(isRefreshRequire) {
      async function getSavedPost() {
        try {
          const res = await fetch("/api/admin/newpost")
          const data = await res.json()
          setSavedPosts(data)
        } catch(error) {
          console.log("Failed to fetch saved posts: ", error)
        }
      }

      getSavedPost()
      setIsRefreshRequire(false)
    }
  }, [isRefreshRequire])

  // Make newpost and init input field
  useEffect(() => {
    async function MakeNewPost() {
      if(isSubmitting) {
        const res = await EditPost( ,category, title, content, setIsSubmitting)
        if(res !== "fail") {
          setCategory("None")
          setTitle("")
          setContent("")
        }
      }
    }
    MakeNewPost()
  }, [isSubmitting, category, content, title])

  // Ref save the newestValue for Autosaving.
  useEffect(() => {
    categoryRef.current = category;
    titleRef.current = title;
    contentRef.current = content;
  }, [category, title, content]);

  // Autosaving every 60s
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (
  //       categoryRef.current.trim() !== "" ||
  //       titleRef.current.trim() !== "" ||
  //       contentRef.current.trim() !== ""
  //     ) {
  //       SavePost("AutoSave", categoryRef.current, titleRef.current, contentRef.current)
  //         .then(() => setIsRefreshRequire(true))
  //         .catch(console.error);
  //     }
  //   }, 60 * 1000);

  //   return () => clearInterval(interval);
  // }, [])

  return (
    <div className="mt-3">
      <div className="mb-5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="border-[#d2d2d2]">
            <Button variant="outline" className="text-gray-600 outline-none">{category === "None" ? 'Selecte the Category' : category}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border-[#d2d2d2] bg-white text-gray-600" align="start">
            <DropdownMenuItem
              onSelect={() => setCategory("None")}
              className="hover:bg-gray-100"
            >
              {category === "None" ? "No Category" : category}
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
        <div className="rounded-full cursor-pointer text-center border flex">
          <div 
            className="pl-7 h-full flex items-center"
            onClick={async () => {
              await SavePost("Save Post", category, title, content)
              setIsRefreshRequire(true)
            }}
          >
            Save |
          </div>
          <div 
            className="text-red-500 pr-7 pl-2 flex items-center"
            onClick={() => {setIsSaveOpen(!isSaveOpen)}}
          >
            {savedPosts.length}
          </div>
        </div>
        <div 
          className="rounded-full px-7 py-2 cursor-pointer text-center bg-black text-white "
          onClick={() => {
            setIsSubmitting(true)
          }}
        >
          {isSubmitting ?
            <Spinner size={20} />
            :
            "Submit"
          }
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
            {
              savedPosts.map((savedPost) => {
                return (
                  <li key={savedPost.id} className="flex items-center group">
                    <span className="w-[90px] mr-8">
                      {savedPost.id === 0 ?
                        "AutoSaved"
                        :
                        getTimeDiff(savedPost.createdAt)
                      }
                    </span>
                    <span 
                      className="hover:underline cursor-pointer mr-2"
                      onClick={() => {
                        setCategory(savedPost.category)
                        setTitle(savedPost.title)
                        setContent(savedPost.content)
                        setIsSaveOpen(false)
                      }}
                    >
                      {savedPost.title === "" ? "Untitled" : savedPost.title}
                    </span>
                    {savedPost.id !== 0 && 
                      <RiDeleteBin5Line 
                        className="hidden group-hover:block cursor-pointer"
                        onClick={() => {
                          DeletePost(savedPost.id)
                            .then(() => setIsRefreshRequire(true))
                            .catch(console.error)
                        }}
                      />
                    }
                  </li>
                )
              })
            }
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
      <Toaster />
    </div>
  );
}

async function EditPost(
  category: string, 
  title:string, 
  content: string, 
  setIsSubmitting: (loading: boolean) => void
) {
  const data = {
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

async function SavePost(
  method: "Save Post" | "AutoSave",
  category: string, 
  title:string, 
  content: string
) {
  const data = method === "Save Post" ? 
    {
      route: "Save Post",
      category,
      title,
      content
    }
    :
    {
      route: "AutoSave",
      category,
      title,
      content,
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
    if(method === "AutoSave") {
      toast.success("Autosaved Successfully!")
    }else {
      toast.success("Post Saved Successfully!")
    }
  } catch(error) {
    console.error("Error occured..: ", error);
    toast.error("Something went wrong while saving post...")
  }
}

async function DeletePost(postId: number) {
  const data = {
    route: "Delete Save",
    postId: postId
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
    console.error("Error occured..: ", error);
    toast.error("Something went wrong while saving post...")
  }
}

function getTimeDiff(createdAt: string): string {
  const createdTime = new Date(createdAt)
  const now = new Date()
  const createdDate = new Date(createdTime.getTime() - (now.getTimezoneOffset() * 60 * 1000))
  const diffMs = now.getTime() - createdDate.getTime()

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 60) {
    return `${diffSec}sec Ago`;
  } else if (diffMin < 60) {
    return `${diffMin}min Ago`;
  } else if (diffHours < 24) {
    return `${diffHours}hours Ago`;
  } else {
    return `${diffDays}days Ago`;
  }
}