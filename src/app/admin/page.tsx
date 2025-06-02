import type { Metadata } from "next";
import ContentBox from "@/components/ContentBox";

export const metadata: Metadata = {
  title: "AdminDashboard"
}

export default function AdminDashboardPage() {
  return (
    <>
      <h1 className="mt-3 md:mt-0 text-[25px] mb-2">DashBoard</h1>
      <div className="grid gap-3 sm:grid-cols-2 xs:grid-cols-2">
        <ContentBox title="Today's visitors">
          <div className="flex gap-2 text-2xl py-8 items-center">
            12
            <span className="text-green-400 text-[16px]">+4</span>
          </div>
        </ContentBox>
        <ContentBox title="Today's visitors">
          <div className="flex gap-2 text-2xl py-8 items-center">
            12
            <span className="text-green-400 text-[16px]">+4</span>
          </div>
        </ContentBox>
        <ContentBox title="Today's visitors">
          <div className="flex gap-2 text-2xl py-8 items-center">
            12
            <span className="text-green-400 text-[16px]">+4</span>
          </div>
        </ContentBox>
        <ContentBox title="Today's visitors">
          <div className="flex gap-2 text-2xl py-8 items-center">
            12
            <span className="text-green-400 text-[16px]">+4</span>
          </div>
        </ContentBox>
      </div>
    </>
  )
}