import { Button } from "@/components/ui/button"

import { HiMiniBars3 } from "react-icons/hi2";

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