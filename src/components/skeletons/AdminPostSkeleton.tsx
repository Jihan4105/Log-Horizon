import { Skeleton } from "@/components/ui/skeleton";

export function AdminPostSkeleton() {
  return (
    <div className="flex flex-col py-5 px-4">
      <div className="flex items-center">
        <Skeleton className="w-[23px] h-[23px] mr-3" />
        <div>
          <Skeleton className="h-6 w-[200px] rounded-xl mb-1" />
          <div className="flex">
            <Skeleton className="h-4 w-[50px] mr-3" />
            <Skeleton className="h-4 w-[77px]" />
          </div>
        </div>
      </div>
    </div>
  )
}