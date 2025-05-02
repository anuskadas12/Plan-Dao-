import { Check, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface UserVerifiedProps {
  count: number
  className?: string
}

export function UserVerified({ count, className }: UserVerifiedProps) {
  return (
    <div className={cn("flex items-center gap-1.5 text-[#415444]", className)}>
      {count > 0 ? (
        <>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e0e5ce]">
            <Check className="h-3.5 w-3.5" />
          </div>
          <span className="text-sm font-medium">
            {count} {count === 1 ? "person" : "people"} verified
          </span>
        </>
      ) : (
        <>
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">No verifications yet</span>
        </>
      )}
    </div>
  )
}
