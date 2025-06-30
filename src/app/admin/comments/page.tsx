"use client"

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
import { GrNotes } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineReply } from "react-icons/md";

export default function CommentsPage() {
  const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("title");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="mt-3">
      <h1 className="text-xl font-bold mb-2">
        Comments Management 
        <span className="text-[16px] font-medium ml-2">10</span>
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
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center text-gray-400 text-xs">
                <span className="text-[#7979FF]">John Doe</span>
                <LuDot />
                <span>2026-06-04</span>
              </div>
              This is Comment Bro
              <div className="flex items-center text-gray-400 text-xs">
                <GrNotes className="mr-1"/>
                [NextJS] @heelo-world
              </div>
            </div>
          </div>
          <div className="group-hover:block hidden">
            <div className="hidden lg:flex gap-2">
              <Button variant={"outline"} size={"sm"} className="rounded-none border-[#d2d2d2]">
                <MdOutlineReply /> Reply
              </Button>
              <Button variant={"outline"} size={"sm"}className="rounded-none border-[#d2d2d2]">
                <RiDeleteBin6Line /> Delete
              </Button>
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
                    <MdOutlineReply />Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RiDeleteBin6Line /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </li>
        <li className="group py-5 px-4 flex items-center hover:bg-[#F9F9FF] cursor-pointer justify-between [&:not(:last-child)]:border-b border-gray-200">
          <div className="flex items-center">
            <Checkbox className="data-[state=checked]:bg-black data-[state=checked]:text-white size-[20px] mr-4"/>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center text-gray-400 text-xs">
                <span className="text-[#7979FF]">John Doe</span>
                <LuDot />
                <span>2026-06-04</span>
              </div>
              This is Comment Bro
              <div className="flex items-center text-gray-400 text-xs">
                <GrNotes className="mr-1"/>
                [NextJS] @heelo-world
              </div>
            </div>
          </div>
          <div className="group-hover:block hidden">
            <div className="hidden lg:flex gap-2">
              <Button variant={"outline"} size={"sm"} className="rounded-none border-[#d2d2d2]">
                <MdOutlineReply /> Reply
              </Button>
              <Button variant={"outline"} size={"sm"}className="rounded-none border-[#d2d2d2]">
                <RiDeleteBin6Line /> Delete
              </Button>
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
                    <MdOutlineReply />Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RiDeleteBin6Line /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </li>
        <li className="group py-5 px-4 flex items-center hover:bg-[#F9F9FF] cursor-pointer justify-between [&:not(:last-child)]:border-b border-gray-200">
          <div className="flex items-center">
            <Checkbox className="data-[state=checked]:bg-black data-[state=checked]:text-white size-[20px] mr-4"/>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center text-gray-400 text-xs">
                <span className="text-[#7979FF]">John Doe</span>
                <LuDot />
                <span>2026-06-04</span>
              </div>
              This is Comment Bro
              <div className="flex items-center text-gray-400 text-xs">
                <GrNotes className="mr-1"/>
                [NextJS] @heelo-world
              </div>
            </div>
          </div>
          <div className="group-hover:block hidden">
            <div className="hidden lg:flex gap-2">
              <Button variant={"outline"} size={"sm"} className="rounded-none border-[#d2d2d2]">
                <MdOutlineReply /> Reply
              </Button>
              <Button variant={"outline"} size={"sm"}className="rounded-none border-[#d2d2d2]">
                <RiDeleteBin6Line /> Delete
              </Button>
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
                    <MdOutlineReply />Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RiDeleteBin6Line /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </li>
        <li className="group py-5 px-4 flex items-center hover:bg-[#F9F9FF] cursor-pointer justify-between [&:not(:last-child)]:border-b border-gray-200">
          <div className="flex items-center">
            <Checkbox className="data-[state=checked]:bg-black data-[state=checked]:text-white size-[20px] mr-4"/>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center text-gray-400 text-xs">
                <span className="text-[#7979FF]">John Doe</span>
                <LuDot />
                <span>2026-06-04</span>
              </div>
              This is Comment Bro
              <div className="flex items-center text-gray-400 text-xs">
                <GrNotes className="mr-1"/>
                [NextJS] @heelo-world
              </div>
            </div>
          </div>
          <div className="group-hover:block hidden">
            <div className="hidden lg:flex gap-2">
              <Button variant={"outline"} size={"sm"} className="rounded-none border-[#d2d2d2]">
                <MdOutlineReply /> Reply
              </Button>
              <Button variant={"outline"} size={"sm"}className="rounded-none border-[#d2d2d2]">
                <RiDeleteBin6Line /> Delete
              </Button>
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
                    <MdOutlineReply />Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RiDeleteBin6Line /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </li>
        <li className="group py-5 px-4 flex items-center hover:bg-[#F9F9FF] cursor-pointer justify-between [&:not(:last-child)]:border-b border-gray-200">
          <div className="flex items-center">
            <Checkbox className="data-[state=checked]:bg-black data-[state=checked]:text-white size-[20px] mr-4"/>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center text-gray-400 text-xs">
                <span className="text-[#7979FF]">John Doe</span>
                <LuDot />
                <span>2026-06-04</span>
              </div>
              This is Comment Bro
              <div className="flex items-center text-gray-400 text-xs">
                <GrNotes className="mr-1"/>
                [NextJS] @heelo-world
              </div>
            </div>
          </div>
          <div className="group-hover:block hidden">
            <div className="hidden lg:flex gap-2">
              <Button variant={"outline"} size={"sm"} className="rounded-none border-[#d2d2d2]">
                <MdOutlineReply /> Reply
              </Button>
              <Button variant={"outline"} size={"sm"}className="rounded-none border-[#d2d2d2]">
                <RiDeleteBin6Line /> Delete
              </Button>
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
                    <MdOutlineReply />Reply
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <RiDeleteBin6Line /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </li>
      </ul>
      <Pagination className="mt-5">
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
  );
}