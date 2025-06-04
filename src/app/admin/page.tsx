import Link from "next/link";
import type { Metadata } from "next";
import ContentBox from "@/components/ContentBox";
import DashboardChart from "@/components/DashboardChart";

// Icons
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiThumbsDown } from "react-icons/pi";

export const metadata: Metadata = {
  title: "AdminDashboard"
}

export default function AdminDashboardPage() {
  return (
    <>
      <h1 className="mt-3 md:mt-0 text-[25px] mb-2">DashBoard</h1>
      <div className="grid gap-3 sm:grid-cols-2 xs:grid-cols-2 lg:grid-cols-4 xl:gap-10">
        <ContentBox title="Today's visitors">
          <div className="flex gap-2 text-2xl py-8 items-center">
            12
            <span className="text-green-400 text-[16px]">+4</span>
          </div>
        </ContentBox>
        <ContentBox title="Number of visitors">
          <div className="flex gap-2 text-2xl py-8 items-center">
            562
            {/* <span className="text-green-400 text-[16px]">+4</span> */}
          </div>
        </ContentBox>
        <ContentBox title="Today's views">
          <div className="flex gap-2 text-2xl py-8 items-center">
            104
            <span className="text-red-400 text-[16px]">-12</span>
          </div>
        </ContentBox>
        <ContentBox title="Number of views">
          <div className="flex gap-2 text-2xl py-8 items-center">
            1738
            {/* <span className="text-green-400 text-[16px]">+4</span> */}
          </div>
        </ContentBox>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 mt-3">
        <DashboardChart />
        <div>
          <h1 className="mt-5 lg:mt-0 mb-1 text-[25px]">Weekly Posts</h1>
          <ContentBox title="Most Popular Posts">
            <div className="flex flex-col w-full p-5 cursor-pointer hover:bg-[#f5f5f5] transition-all duration-300 ease-in-out">
              <div className="flex flex-col">
                <h3 className="text-[18px]">Lorem Ipsum Title</h3>
                <div className="flex gap-2 items-center text-[12px]">
                  <span>2025.01.02</span>
                  <span className="flex items-center"><IoChatbubbleOutline className="mr-1"/>12</span>
                  <span>1024views</span>
                  <span className="flex items-center"><IoMdHeartEmpty className="mr-1"/> 5</span>
                  <span className="flex items-center"><PiThumbsDown className="mr-1"/> 4</span>
                </div>
              </div>
            </div>
            <hr className="w-[90%] border-[#D9D9D9]"/>
            <div className="flex flex-col w-full p-5 cursor-pointer hover:bg-[#f5f5f5] transition-all duration-300 ease-in-out">
              <div className="flex flex-col">
                <h3 className="text-[18px]">Lorem Ipsum Title</h3>
                <div className="flex gap-2 items-center text-[12px]">
                  <span>2025.01.02</span>
                  <span className="flex items-center"><IoChatbubbleOutline className="mr-1"/>12</span>
                  <span>1024views</span>
                  <span className="flex items-center"><IoMdHeartEmpty className="mr-1"/> 5</span>
                  <span className="flex items-center"><PiThumbsDown className="mr-1"/> 4</span>
                </div>
              </div>
            </div>
            <hr className="w-[90%] border-[#D9D9D9]" />
            <div className="flex flex-col w-full p-5 cursor-pointer hover:bg-[#f5f5f5] transition-all duration-300 ease-in-out">
              <div className="flex flex-col">
                <h3 className="text-[18px]">Lorem Ipsum Title</h3>
                <div className="flex gap-2 items-center text-[12px]">
                  <span>2025.01.02</span>
                  <span className="flex items-center"><IoChatbubbleOutline className="mr-1"/>12</span>
                  <span>1024views</span>
                  <span className="flex items-center"><IoMdHeartEmpty className="mr-1"/> 5</span>
                  <span className="flex items-center"><PiThumbsDown className="mr-1"/> 4</span>
                </div>
              </div>
            </div>
          </ContentBox>
          <div className="mt-5">
            <div className="flex flex-col items-center w-fit">
              <div className="flex items-center gap-2">
                <IoMdHeartEmpty className="text-[30px]"/>
                <p className="text-[18px]">Most Liked Post</p>
              </div>
              <Link href={"#post"} className="hover:underline">Lorem Ipsum Title</Link>
            </div>
            <div className="mt-5 flex flex-col items-center w-fit">
              <div className="flex items-center gap-2">
                <PiThumbsDown className="text-[30px]"/>
                <p className="text-[18px]">Most Unliked Post</p>
              </div>
              <Link href={"#post"} className="hover:underline">Lorem Ipsum Title</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}