import { homemadeApple } from "@/lib/font"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen min-w-screen bg-[url('/images/login-background.jpg')] bg-cover bg-center grid place-items-center">
      <div className="flex flex-col items-center">
        <p className={`${homemadeApple.className} text-5xl mb-20`}>Log Horizon</p>

        <p className={`${homemadeApple.className} text-[25px]`}>Email</p>
        <input id="email" className="outline-none p-3 border-b border-black mb-24" type="text" name="email"/>

        <p className={`${homemadeApple.className} text-[25px]`}>Password</p>
        <input id="password" className="outline-none p-3 border-b border-black mb-10" type="text" name="password"/>
        
        <Button className="bg-transparent border-black hover:bg-transparent" variant="outline">
          Log In
        </Button>
      </div>
      <p>aklsdjflaskdfjlksadf</p>
    </main>
  )
}