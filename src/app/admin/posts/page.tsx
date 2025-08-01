"use client";

import React from "react";
import { useEffect, useState, useMemo } from "react";
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
  PaginationItem,
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

import { MinimalTreeItemData, PostData } from "@/lib/types";

const POSTS_PER_PAGE = 5;
const MAX_PAGE_BUTTONS = 4;

export default function PostsManagementPage() {
  const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(false);

  // Datas State
  const [posts, setPosts] = useState<PostData[]>([]);
  const [categories, setCategories] = useState<MinimalTreeItemData[]>([]);

  // Search by Text 
  const [searchFilter, setSearchFilter] = useState<string>("title");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Search By Filter
  const [quickSearch, setQuickSearch] = useState<
    "all" | 
    "status_public" | "status_private" |
    "category_none" | string
  >("all");

  // Loading State
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // quickSearch 필터
    if (quickSearch !== "all") {
      if (quickSearch === "status_public") filtered = filtered.filter(post => post.status === "Public");
      else if (quickSearch === "status_private") filtered = filtered.filter(post => post.status === "Private");
      else if (quickSearch === "category_none") filtered = filtered.filter(post => post.category === "None");
      else filtered = filtered.filter(post => post.category === quickSearch);
    }

    // 텍스트 검색
    if (isSearchEnabled && searchQuery) {
      filtered = filtered.filter(post =>
        (searchFilter === "title"
          ? post.title?.toLowerCase()
          : post.content?.toLowerCase()
        )?.includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [posts, quickSearch, isSearchEnabled, searchFilter, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const { start, end } = useMemo(
    () => getPageRange(currentPage, totalPages, MAX_PAGE_BUTTONS),
    [currentPage, totalPages]
  );
  const pagedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, isSearchEnabled, searchFilter, quickSearch]);

  useEffect(() => {
    async function fetchAll() {
      setIsLoading(true);
      const [postRes, catRes] = await Promise.all([
        fetch("/api/admin/posts"),
        fetch("/api/admin/category"),
      ]);
      setPosts(await postRes.json());
      setCategories(await catRes.json());
      setIsLoading(false);
    }
    fetchAll();
  }, []);

  return (
    <div className="mt-3">
      <h1 className="text-xl font-bold mb-2">
        Posts Management 
      </h1>

      {/* Search Bar */}
      <div className={clsx(
        "flex justify-between items-center border-1 py-1 px-4",
        isSearchEnabled && "border-black",
        !isSearchEnabled && "border-gray-200"
      )}>
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
                      No category
                    </span>
                  </DropdownMenuItem>
                  {categories.map((rootItem) => (
                    <React.Fragment key={rootItem.id}>
                      <DropdownMenuItem
                        className="hover:bg-gray-100"
                      >
                        {rootItem.value}
                      </DropdownMenuItem>
      
                      {rootItem.children?.map((child) => (
                        <DropdownMenuItem
                          key={child.id}
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
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} className="focus-visible:border-0 p-0! mr-2">
                    QuickSearch
                    <IoChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-[#d2d2d2]">
                  <DropdownMenuItem
                    onSelect={() => {setQuickSearch("all");}}
                  >
                    View all posts
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200"/>
                  <DropdownMenuLabel className="text-gray-400">Status view</DropdownMenuLabel>
                  <DropdownMenuItem
                    onSelect={() => {setQuickSearch("status_public");}}
                  >
                    <span className="ml-3">
                      public
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => {setQuickSearch("status_private");}}
                  >
                    <span className="ml-3">
                      private
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuLabel className="text-gray-400">Category view</DropdownMenuLabel>
                  <DropdownMenuItem
                    onSelect={() => {setQuickSearch("category_none");}}
                  >
                    <span className="ml-3">
                      no category
                    </span>
                  </DropdownMenuItem>
                  {categories.map((rootItem) => (
                    <React.Fragment key={rootItem.id}>
                      <DropdownMenuItem
                        className="hover:bg-gray-100"
                        onSelect={() => {setQuickSearch(rootItem.value)}}
                      >
                        <span className="ml-3">
                          {rootItem.value}
                        </span>
                      </DropdownMenuItem>
      
                      {rootItem.children?.map((child) => (
                        <DropdownMenuItem
                          key={child.id}
                          className="hover:bg-gray-100"
                          onSelect={() => {setQuickSearch(child.value)}}
                        >
                          <span className="ml-3">
                            ㄴ {child.value}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </React.Fragment>
                  ))}
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
            <IoSearch className="cursor-pointer min-h-[16px] min-w-[16px]"/>
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
          Array.from({ length: POSTS_PER_PAGE }).map((_, idx) => <AdminPostSkeleton key={idx} />)
          :
          pagedPosts.map((post) => {
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
                        <Button variant="outline" className="rounded-none">
                          {post.status}
                        </Button>
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
                  <div className="lg:hidden">
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
            onClick={() => setCurrentPage((1))}
            className={clsx(
              "cursor-pointer",
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
              "cursor-pointer",
              currentPage === 1 && "pointer-events-none"
            )}
          >
            <FiChevronLeft className={clsx(
              "m-2",
              currentPage === 1 && "pointer-events-none opacity-25"
            )} />
          </PaginationItem>

          {/* Dynamic Pages */}
          {Array.from({length: end - start + 1}, (_, idx) => {
            const pageNum = start + idx;
            return (
              <PaginationItem
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={clsx(
                  "w-[36px] h-[36px] grid place-content-center cursor-pointer rounded-[5px]",
                  currentPage === pageNum && "border-1"
                )}
              >
                {pageNum}
              </PaginationItem>
            );
          })}

          {/* To Next Page */}
          <PaginationItem
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className={clsx(
              "cursor-pointer",
              currentPage === totalPages && "pointer-events-none opacity-25"
            )}
          >
            <FiChevronRight className="m-2"/>
          </PaginationItem>

          {/* To Last Page */}
          <PaginationItem
            onClick={() => setCurrentPage(totalPages)}
            className={clsx(
              "cursor-pointer",
              currentPage === totalPages && "pointer-events-none opacity-25"
            )}
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

function getPageRange(currentPage: number, totalPages: number, maxButtons: number) {
  const group = Math.floor((currentPage - 1) / maxButtons);
  const start = group * maxButtons + 1;
  const end = Math.min(start + maxButtons - 1, totalPages);
  return { start, end };
}