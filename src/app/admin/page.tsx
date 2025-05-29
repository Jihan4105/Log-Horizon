import type { Metadata } from "next";
import { Button } from "@/components/ui/button"

import { HiMiniBars3 } from "react-icons/hi2";

export const metadata: Metadata = {
  title: "AdminDashboard"
}

export default function AdminDashboardPage() {
  return (
    <div className="p-10">
      <Button variant={"ghost"} size={"icon"}>
        <HiMiniBars3 />
      </Button>
      <p>dashboard</p>
    </div>
  )
}