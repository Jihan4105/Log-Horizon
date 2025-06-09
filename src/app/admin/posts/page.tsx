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

import { IoChevronUp } from "react-icons/io5";
import { IoChevronDown } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";

export default function PostsManagementPage() {
  const [searchFilterStatus, setSearchFilterStatus] = useState<boolean>(false);

  return (
    <div>
      <h1>Post Management <span>35</span></h1>
      <div>
        <Checkbox />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} onClick={() => setSearchFilterStatus(!searchFilterStatus)}>
              Quick Search
              {searchFilterStatus ? <IoChevronUp /> : <IoChevronDown />}
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
        <Button variant={"ghost"}>
          Search
          <IoSearch />
        </Button>
      </div>
    </div>
  )
}