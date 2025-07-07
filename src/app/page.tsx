import Link from "next/link";
import { homemadeApple } from "@/lib/font"
import { Button } from "@/components/ui/button"
import { BsChevronRight } from "react-icons/bs";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

export default function LoginPage() {
  return (
    <main className="min-h-screen min-w-screen bg-[url('/images/login-background.jpg')] bg-cover bg-center grid place-items-center">
      <form className="flex flex-col items-center">
        <p className={`${homemadeApple.className} text-4xl mb-15 md:text-5xl`}>Log Horizon</p>
        
        <LoginLink className="flex items-center justify-center py-2 w-[80%] border-1 rounded-[5px] mb-3">
          Log In
          <BsChevronRight />
        </LoginLink>
        <RegisterLink className="hover:underline"> or sign up</RegisterLink>
      </form>
    </main>
  )
}