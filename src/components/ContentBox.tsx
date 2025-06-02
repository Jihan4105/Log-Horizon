export default function ContentBox({
  title,
  children,
  widthClassName,
}: Readonly<{
  title: string;
  children: React.ReactNode;
  widthClassName?: string;
}>) {
  return (
    <div
      className={`bg-[#E2F0FF] p-2 rounded-[5px] ${widthClassName}`}
    >
      <p className="text-[18px]">{title}</p>
      <div className="bg-white rounded-[5px] grid place-items-center">
        {children}
      </div>
    </div>
  )
}