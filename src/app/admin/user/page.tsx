"use client";

import { useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { IoChevronDown } from "react-icons/io5";
import { UserData } from "@/lib/types";

const tableDatas: UserData[] = [
  {
    userid: "user_001",
    username: "sunny_bird",
    userprofile: "https://example.com/profiles/sunny_bird.jpg",
    email: "sunny_bird@example.com",
    createdAt: "2024-12-15T10:23:00Z",
    comments: 24,
    likes: 134,
    hmms: 12,
    unlikes: 4,
  },
  {
    userid: "user_002",
    username: "tech_sage",
    userprofile: "https://example.com/profiles/tech_sage.jpg",
    email: "tech_sage@example.com",
    createdAt: "2025-01-03T08:45:00Z",
    comments: 58,
    likes: 212,
    hmms: 34,
    unlikes: 9,
  },
  {
    userid: "user_003",
    username: "ocean_waves",
    userprofile: "https://example.com/profiles/ocean_waves.jpg",
    email: "ocean_waves@example.com",
    createdAt: "2025-03-21T17:12:00Z",
    comments: 14,
    likes: 98,
    hmms: 22,
    unlikes: 3,
  },
  {
    userid: "user_004",
    username: "mountain_peak",
    userprofile: "https://example.com/profiles/mountain_peak.jpg",
    email: "mountain_peak@example.com",
    createdAt: "2025-02-11T11:05:00Z",
    comments: 31,
    likes: 167,
    hmms: 18,
    unlikes: 6,
  },
  {
    userid: "user_005",
    username: "nightowl_dev",
    userprofile: "https://example.com/profiles/nightowl_dev.jpg",
    email: "nightowl_dev@example.com",
    createdAt: "2024-11-28T20:40:00Z",
    comments: 47,
    likes: 190,
    hmms: 27,
    unlikes: 5,
  }
];



export default function UserManagementPage() {
  const [searchFilter, setSearchFilter] = useState<string>("username");
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div className="mt-3">
      <h1 className="text-xl font-bold mb-2">User Management</h1>
      <div className="flex items-center p-1 border border-gray-200">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className=" mr-2">{searchFilter} <IoChevronDown /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[60px] border-[#d2d2d2] bg-white" align="start">
            <DropdownMenuItem
              onSelect={() => setSearchFilter("username")}
              className="hover:bg-gray-100"
            >
              Username
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setSearchFilter("email")}
              className="hover:bg-gray-100"
            >
              Email
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div></div>
        <input 
          id="search" 
          name="search" 
          type="text" 
          className="outline-none border-gray-200 pl-3 w-full border-l-1"
          placeholder="Search here"
          autoCorrect="off"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Table>
          <TableHeader>
              <TableRow>
                <TableHead>
                  name
                </TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}