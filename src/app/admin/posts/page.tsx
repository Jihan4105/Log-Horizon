"use client";

import { useState } from "react";

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

import { IoChevronDown } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { LuDot } from "react-icons/lu";

export default function PostsManagementPage() {
  const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("title");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="mt-3">
      <h1 className="text-xl font-semibold mb-2">
        Post Management 
        <span className="text-[16px] font-medium ml-2">35</span>
      </h1>
      <div className="flex justify-between items-center border-1 border-gray-200 py-1 px-4">
        {!isSearchEnabled ? 
          <>
            <Checkbox className="data-[state=checked]:bg-black data-[state=checked]:text-white size-[20px]"/>
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
                <Button variant="ghost" className="p-0! mr-2">{searchFilter} <IoChevronDown /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[60px] border-[#d2d2d2] bg-white" align="start">
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
            <Button variant={"ghost"} onClick={() => setIsSearchEnabled(!isSearchEnabled)}>
              close
            </Button>
          </>
        }
      </div>
      <ul className="flex flex-col border-1 border-gray-200 mt-3">
        <li className="group py-5 px-4 flex items-center hover:bg-[#F9F9FF] cursor-pointer justify-between [&:not(:last-child)]:border-b border-gray-200">
          <div className="flex items-center">
            <Checkbox className="data-[state=checked]:bg-black data-[state=checked]:text-white size-[20px] mr-4"/>
            <div>
              Title of the post
              <div className="flex items-center text-gray-400 text-xs">
                <span className="text-[#7979FF] mr-1">IT/NextJS</span>
                <LuDot className="mr-1"/>
                <span>2025-04-05 22:18</span>
              </div>
            </div>
          </div>
          <div className="sm:justify-self-end group-hover:flex group-hover:visible">
            <div className="hidden lg:flex gap-2">
              <Button variant={"destructive"}>edit</Button>
              <Button variant={"outline"}>delete</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="border-[#d2d2d2]">
                  <Button variant="outline" className="text-gray-600">Public</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[80px] border-[#d2d2d2] bg-white text-gray-600" side="right">
                  <DropdownMenuItem
                    className="hover:bg-gray-100"
                  >
                    Publice
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
                  <Button variant="ghost" className="ml-4 ">
                    <span className="sr-only">Actions</span>
                    ⋮
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[120px] border-[#d2d2d2] bg-white text-gray-600">
                  <DropdownMenuItem>
                    edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    delete
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
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
        <li className="group py-5 px-4 flex items-center hover:bg-[#F9F9FF] cursor-pointer justify-between [&:not(:last-child)]:border-b border-gray-200">
          <div className="flex items-center">
            <Checkbox className="data-[state=checked]:bg-black data-[state=checked]:text-white size-[20px] mr-4"/>
            <div>
              Title of the post
              <div className="flex items-center text-gray-400 text-xs">
                <span className="text-[#7979FF] mr-1">IT/NextJS</span>
                <LuDot className="mr-1"/>
                <span>2025-04-05 22:18</span>
              </div>
            </div>
          </div>
          <div className="sm:justify-self-end group-hover:flex group-hover:visible">
            <div className="hidden lg:flex gap-2">
              <Button variant={"destructive"}>edit</Button>
              <Button variant={"outline"}>delete</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="border-[#d2d2d2]">
                  <Button variant="outline" className="text-gray-600">Public</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[80px] border-[#d2d2d2] bg-white text-gray-600" side="right">
                  <DropdownMenuItem
                    className="hover:bg-gray-100"
                  >
                    Publice
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
                  <Button variant="ghost" className="ml-4 ">
                    <span className="sr-only">Actions</span>
                    ⋮
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[120px] border-[#d2d2d2] bg-white text-gray-600">
                  <DropdownMenuItem>
                    edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    delete
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
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
        <li className="group py-5 px-4 flex items-center hover:bg-[#F9F9FF] cursor-pointer justify-between [&:not(:last-child)]:border-b border-gray-200">
          <div className="flex items-center">
            <Checkbox className="data-[state=checked]:bg-black data-[state=checked]:text-white size-[20px] mr-4"/>
            <div>
              Title of the post
              <div className="flex items-center text-gray-400 text-xs">
                <span className="text-[#7979FF] mr-1">IT/NextJS</span>
                <LuDot className="mr-1"/>
                <span>2025-04-05 22:18</span>
              </div>
            </div>
          </div>
          <div className="sm:justify-self-end group-hover:flex group-hover:visible">
            <div className="hidden lg:flex gap-2">
              <Button variant={"destructive"}>edit</Button>
              <Button variant={"outline"}>delete</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="border-[#d2d2d2]">
                  <Button variant="outline" className="text-gray-600">Public</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[80px] border-[#d2d2d2] bg-white text-gray-600" side="right">
                  <DropdownMenuItem
                    className="hover:bg-gray-100"
                  >
                    Publice
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
                  <Button variant="ghost" className="ml-4 ">
                    <span className="sr-only">Actions</span>
                    ⋮
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[120px] border-[#d2d2d2] bg-white text-gray-600">
                  <DropdownMenuItem>
                    edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    delete
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
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
        <li className="group py-5 px-4 flex items-center hover:bg-[#F9F9FF] cursor-pointer justify-between [&:not(:last-child)]:border-b border-gray-200">
          <div className="flex items-center">
            <Checkbox className="data-[state=checked]:bg-black data-[state=checked]:text-white size-[20px] mr-4"/>
            <div>
              Title of the post
              <div className="flex items-center text-gray-400 text-xs">
                <span className="text-[#7979FF] mr-1">IT/NextJS</span>
                <LuDot className="mr-1"/>
                <span>2025-04-05 22:18</span>
              </div>
            </div>
          </div>
          <div className="sm:justify-self-end group-hover:flex group-hover:visible">
            <div className="hidden lg:flex gap-2">
              <Button variant={"destructive"}>edit</Button>
              <Button variant={"outline"}>delete</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="border-[#d2d2d2]">
                  <Button variant="outline" className="text-gray-600">Public</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[80px] border-[#d2d2d2] bg-white text-gray-600" side="right">
                  <DropdownMenuItem
                    className="hover:bg-gray-100"
                  >
                    Publice
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
                  <Button variant="ghost" className="ml-4 ">
                    <span className="sr-only">Actions</span>
                    ⋮
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[120px] border-[#d2d2d2] bg-white text-gray-600">
                  <DropdownMenuItem>
                    edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    delete
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
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
        <li className="group py-5 px-4 flex items-center hover:bg-[#F9F9FF] cursor-pointer justify-between [&:not(:last-child)]:border-b border-gray-200">
          <div className="flex items-center">
            <Checkbox className="data-[state=checked]:bg-black data-[state=checked]:text-white size-[20px] mr-4"/>
            <div>
              Title of the post
              <div className="flex items-center text-gray-400 text-xs">
                <span className="text-[#7979FF] mr-1">IT/NextJS</span>
                <LuDot className="mr-1"/>
                <span>2025-04-05 22:18</span>
              </div>
            </div>
          </div>
          <div className="sm:justify-self-end group-hover:flex group-hover:visible">
            <div className="hidden lg:flex gap-2">
              <Button variant={"destructive"}>edit</Button>
              <Button variant={"outline"}>delete</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="border-[#d2d2d2]">
                  <Button variant="outline" className="text-gray-600">Public</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-[80px] border-[#d2d2d2] bg-white text-gray-600" side="right">
                  <DropdownMenuItem
                    className="hover:bg-gray-100"
                  >
                    Publice
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
                  <Button variant="ghost" className="ml-4 ">
                    <span className="sr-only">Actions</span>
                    ⋮
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[120px] border-[#d2d2d2] bg-white text-gray-600">
                  <DropdownMenuItem>
                    edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    delete
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Status</DropdownMenuLabel>
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
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}