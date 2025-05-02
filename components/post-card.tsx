"use client"

import { Check, CalendarDays, Gift, MapPin, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { UserVerified } from "./user-verified"

interface Post {
  id: number
  user: {
    name: string
    avatar: string
    verified: boolean
  }
  timePosted: string
  destination: string
  dates: string
  budget: string
  interests: string[]
  description: string
  verifiedCount: number
  responses: number
}

interface PostCardProps {
  post: Post
  onSharePost: (id: number) => void
  onViewPlans: (id: number) => void
}

export function PostCard({ post, onSharePost, onViewPlans }: PostCardProps) {
  return (
    <Card className="mb-6 border-[#e0e5ce]">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
              <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{post.user.name}</h3>
                {post.user.verified && (
                  <Badge variant="outline" className="rounded-full border-[#415444] px-2 py-0 text-xs text-[#415444]">
                    <Check className="mr-1 h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-500">{post.timePosted}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onSharePost(post.id)}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-4 flex flex-wrap gap-3">
          <Badge className="bg-[#e0e5ce] text-[#415444]">
            <MapPin className="mr-1 h-3 w-3" />
            {post.destination}
          </Badge>
          <Badge className="bg-[#e0e5ce] text-[#415444]">
            <CalendarDays className="mr-1 h-3 w-3" />
            {post.dates}
          </Badge>
          <Badge className="bg-[#e0e5ce] text-[#415444]">
            <Gift className="mr-1 h-3 w-3" />
            {post.budget}
          </Badge>
        </div>
        <div className="mb-3 flex flex-wrap gap-2">
          {post.interests.map((interest, i) => (
            <Badge key={i} variant="outline" className="border-[#415444]/30 text-[#415444]">
              {interest}
            </Badge>
          ))}
        </div>
        <p className="text-gray-600">{post.description}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-[#e0e5ce] pt-3">
        <div className="flex items-center gap-2">
          <UserVerified count={post.verifiedCount} />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-[#415444] text-[#415444] hover:bg-[#415444] hover:text-white"
          onClick={() => onViewPlans(post.id)}
        >
          View {post.responses} Plans
        </Button>
      </CardFooter>
    </Card>
  )
}
