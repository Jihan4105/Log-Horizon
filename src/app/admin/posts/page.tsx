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

import { IoChevronUp } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { LuDot } from "react-icons/lu";

export default function PostsManagementPage() {
  const [isQuickSearchEnabled, setIsQuickSearchEnabled] = useState<boolean>(false);
  const [isSearchEnabled, setIsSearchEnabled] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>("title");

  return (
    <div className="mt-3">
      <h1 className="text-xl font-semibold">Post Management <span className="text-[16px] font-medium">35</span></h1>
      <div className="flex justify-between">
        {!isSearchEnabled ? 
          <>
            <div>
              <Checkbox />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"} onClick={() => setIsQuickSearchEnabled(!isQuickSearchEnabled)}>
                    Quick Search
                    {isQuickSearchEnabled ? <IoChevronUp /> : <IoChevronDown />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent >
                  <DropdownMenuItem>
                    View all posts
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Status view</DropdownMenuLabel>
                  <DropdownMenuItem>
                    all
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    public
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    private
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Category view</DropdownMenuLabel>
                  <DropdownMenuItem>
                    view all categories
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    no category
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    IT
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    ㄴ HTML
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Write
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button variant={"ghost"} onClick={() => setIsSearchEnabled(!isSearchEnabled)}>
              Search
              <IoSearch />
            </Button>
          </>
        : 
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="border-[#d2d2d2]">
                <Button variant="outline" className="text-gray-600">{searchFilter}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 border-[#d2d2d2] bg-white text-gray-600" align="start">
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
              className="outline-none p-3 border-b border-[#d2d2d2] w-full mb-5 text-[25px]"
              placeholder="Search here"
            />
            <Button variant={"ghost"} onClick={() => setIsSearchEnabled(!isSearchEnabled)}>
              close
            </Button>
          </>
        }
      </div>
      <ul>
        <li className="group">
          <div>
            <Checkbox />
            <div>
              Title of the post
              <div>
                <span>IT/NextJS</span>
                <LuDot />
                <span>2025-04-05 22:18</span>
              </div>
            </div>
            <div className="hidden group-hover:flex">
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