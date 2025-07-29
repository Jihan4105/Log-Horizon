"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { AdminPostSkeleton } from "@/components/skeletons/AdminPostSkeleton";

import { IoChevronDown } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { LuDot } from "react-icons/lu";
import { RiEditLine } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiChevronLeft, FiChevronsRight } from "react-icons/fi";
import { FiChevronsLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";

import { PostData } from "@/lib/types";

const POSTS_PER_PAGE = 5;
const MAX_PAGE_BUTTONS = 4;

export default function PostsManagementPage() {
  const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("title");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [posts, setPosts] = useState<PostData[]>([]);
  const [pagedPosts, setPagedPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    async function getPostsData() {
      try {
        const res = await fetch("/api/admin/posts")
        const data = await res.json()
        setPosts(data)
        setPagedPosts(data.slice(0, 5))
        // setTotalPages(Math.ceil(data.length / POST_PER_PAGE));
        setTotalPages(10)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch posts data:", error);
      }
    }

    getPostsData()
  }, [])

  useEffect(() => {
    if (isLoading || posts.length === 0) return;

    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    setPagedPosts(posts.slice(startIndex, endIndex));
    setTotalPages(Math.ceil(posts.length / POSTS_PER_PAGE));
  }, [currentPage, totalPages, isLoading, posts])

  console.log(pagedPosts)

  return (
    <div className="mt-3">
      <h1 className="text-xl font-bold mb-2">
        Posts Management 
        <span className="text-[16px] font-medium ml-2">35</span>
      </h1>

      {/* Search Bar */}
      <div className="flex justify-between items-center border-1 border-gray-200 py-1 px-4">
        {!isSearchEnabled ? 
          <>
            <div className="flex items-center">
              <Checkbox className="data-[state=checked]:bg-black data-[state=checked]:text-white size-[20px] mr-4"/>
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled>
                  <Button variant={"ghost"} className="focus-visible:border-0 p-0! mr-2" disabled>
                    change
                    <IoChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-[#d2d2d2]">
                  <DropdownMenuLabel className="text-gray-400">
                    Status Change
                  </DropdownMenuLabel>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      public
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      private
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuLabel className="text-gray-400">
                    Category Change
                  </DropdownMenuLabel>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      no category
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      IT
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      ㄴ HTML
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      Write
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className="focus-visible:border-0 p-0! mr-2">
                    QuickSearch
                    <IoChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-[#d2d2d2]">
                  <DropdownMenuItem>
                    View all posts
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200"/>
                  <DropdownMenuLabel className="text-gray-400">Status view</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      all
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      public
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      private
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuLabel className="text-gray-400">Category view</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      view all categories
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      no category
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      IT
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      ㄴ HTML
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="ml-3">
                      Write
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                variant={"ghost"} 
                onClick={() => setIsSearchEnabled(!isSearchEnabled)}
                className="p-0!"
              >
                Search
                <IoSearch />
              </Button>
            </div>
          </>
        : 
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="mr-2">{searchFilter} <IoChevronDown /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[60px] border-[#d2d2d2] bg-white" align="center">
                <DropdownMenuItem
                  onSelect={() => setSearchFilter("title")}
                  className="hover:bg-gray-100"
                >
                  title
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setSearchFilter("content")}
                  className="hover:bg-gray-100"
                >
                  content
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div></div>
            <input 
              id="search" 
              name="search" 
              type="text" 
              className="outline-none border-[#d2d2d2] w-full"
              placeholder="Search here"
              autoCorrect="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IoSearch className="cursor-pointer"/>
            <Button variant={"ghost"} onClick={() => setIsSearchEnabled(!isSearchEnabled)}>
              close
            </Button>
          </>
        }
      </div>

      {/* Posts List */}
      <ul className={clsx(
        "flex flex-col border-gray-200 mt-3",
        isLoading && "border-none",
        !isLoading && "border-1"
      )}>
        {isLoading ? 
          <>
            <AdminPostSkeleton />
            <AdminPostSkeleton />
            <AdminPostSkeleton />
            <AdminPostSkeleton />
            <AdminPostSkeleton />
          </>
          :
          posts.map((post) => {
            return (
              <li 
                key={post.id}
                className="group py-5 px-4 flex items-center hover:bg-[#F9F9FF] cursor-pointer justify-between [&:not(:last-child)]:border-b border-gray-200"
              >
                <div className="flex items-center">
                  <Checkbox className="data-[state=checked]:bg-black data-[state=checked]:text-white size-[20px] mr-4"/>
                  <div>
                    {post.title}
                    <div className="flex items-center text-gray-400 text-xs">
                      <span className="text-[#7979FF] mr-1">
                        {post.category === "None" ? "No Category" : post.category}
                      </span>
                      <LuDot className="mr-1"/>
                      <span>{toLocalTime(post.updatedAt)}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="group-hover:opacity-100 opacity-0 hidden lg:flex gap-2">
                    <Button variant={"outline"} size={"icon"} className="rounded-none border-[#d2d2d2]">
                      <RiEditLine />
                    </Button>
                    <Button variant={"outline"} size={"icon"}className="rounded-none border-[#d2d2d2]">
                      <RiDeleteBin6Line />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild className="border-[#d2d2d2]">
                        <Button variant="outline" className="rounded-none">Public</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="min-w-[80px] border-[#d2d2d2] bg-white text-gray-600">
                        <DropdownMenuItem
                          className="hover:bg-gray-100"
                        >
                          Public
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-gray-100"
                        >
                          Private
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="group-hover:opacity-100 opacity-0 lg:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="ml-4 rounded-full bg-[#F0F8FF]">
                          <span className="sr-only">Actions</span>
                          ⋮
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-[120px] border-[#d2d2d2] bg-white text-gray-600">
                        <DropdownMenuItem>
                          <RiEditLine /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <RiDeleteBin6Line /> delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-[#d2d2d2]"/>
                        <DropdownMenuLabel className="text-gray-400">Status</DropdownMenuLabel>
                        <DropdownMenuItem>
                          Public
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Private
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </li>
            )
          })
        }
      </ul>
      <Pagination className="mt-5">
        <PaginationContent>
          {/* To First Page */}
          <PaginationItem 
            onClick={() => setCurrentPage(1)}
            className={clsx(
              currentPage === 1 && "pointer-events-none"
            )}
          >
            <FiChevronsLeft className={clsx(
              "m-2",
              currentPage === 1 && "pointer-events-none opacity-25"
            )}/>
          </PaginationItem>

          {/* To Previous Page */}
          <PaginationItem 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className={clsx(
              "m-2",
              currentPage === 1 && "pointer-events-none"
            )}
          >
            <FiChevronLeft />
          </PaginationItem>

          {/* Dynamic Pages */}
          {[...Array(totalPages)].map((_, idx) => (
            <PaginationItem
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={clsx(
                "w-[36px] h-[36px] grid place-content-center cursor-pointer rounded-[5px]",
                currentPage === idx + 1 && "border-1"
              )}
            >
              {idx + 1}
            </PaginationItem>
          ))}

          {/* To Next Page */}
          <PaginationItem
            onClick={() => setCurrentPage(totalPages)}
            className={clsx(currentPage === totalPages && "pointer-events-none")}
          >
            <FiChevronRight className="m-2"/>
          </PaginationItem>
          <PaginationItem
            onClick={() => setCurrentPage(totalPages)}
            className={clsx(currentPage === totalPages && "pointer-events-none")}
          >
            <FiChevronsRight className="m-2"/>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

function toLocalTime(upatedAt: string): string {
  const lastUpdatedDate = new Date(upatedAt);
  const now = new Date();
  const localizedDate = new Date(lastUpdatedDate.getTime() - (now.getTimezoneOffset() * 60 * 1000))

  const yyyy = localizedDate.getFullYear();
  const mm = String(localizedDate.getMonth() + 1).padStart(2, '0');
  const dd = String(localizedDate.getDate()).padStart(2, '0');
  const hh = String(localizedDate.getHours()).padStart(2, '0');
  const mi = String(localizedDate.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}