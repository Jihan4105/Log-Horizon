import Image from 'next/image'

export const metadata = {
  title: "Page Not Found"
}
 
export default function NotFound() {
  return (
    <div className='w-full h-dvh flex justify-center items-center flex-col '>
      <h2 className='text-2xl'>404 Not Found</h2>
      <Image 
        className="m-0 rounded-xl"
        src="/images/not-found.png"
        width={500}
        height={500}
        alt="Page Not Found"
        priority={true}
      />
    </div>
  )
}