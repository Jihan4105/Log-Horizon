"use client"

import { ColumnDef } from "@tanstack/react-table"
import { UserData } from "@/lib/types"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "comments",
    header: "Comments",
  },
  {
    accessorKey: "likes",
    header: "Likes",
  },
  {
    accessorKey: "hmms",
    header: "Hmms",
  },
  {
    accessorKey: "unlikes",
    header: "Unlikes",
  },
]