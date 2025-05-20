import Image from "next/image"

export default function Home() {
  return (
    <>
      <Image 
        src={"/Logo.png"}
        width={254}
        height={72}
        alt="Logo"
      />
    </>
  )
}