import { homemadeApple } from "@/lib/font"
import { Button } from "@/components/ui/button"
import { BsChevronRight } from "react-icons/bs";

export default function Home() {
  return (
    <main className="min-h-screen min-w-screen bg-[url('/images/login-background.jpg')] bg-cover bg-center grid place-items-center">
      <form className="flex flex-col items-center xl:mb-40 mb-60">
        <p className={`${homemadeApple.className} text-4xl mb-20 md:text-5xl`}>Log Horizon</p>

        <p className={`${homemadeApple.className} text-[25px]`}>Email</p>
        <input id="email" className="outline-none p-3 border-b border-black mb-24" type="text" name="email"/>

        <p className={`${homemadeApple.className} text-[25px]`}>Password</p>
        <input id="password" className="outline-none p-3 border-b border-black mb-10" type="password" name="password"/>
        
        <Button type="submit" className="bg-transparent border-black hover:bg-transparent" variant="outline">
          Log In
          <BsChevronRight />
        </Button>
      </form>
    </main>
  )
}