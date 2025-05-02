"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface VotingSystemProps {
  postId: number
  onVote: (postId: number, satisfied: boolean) => void
}

export function VotingSystem({ postId, onVote }: VotingSystemProps) {
  const [voted, setVoted] = useState<boolean | null>(null)
  const [showAnimation, setShowAnimation] = useState(false)

  const handleVote = (satisfied: boolean) => {
    setVoted(satisfied)
    onVote(postId, satisfied)

    if (satisfied) {
      setShowAnimation(true)
      setTimeout(() => setShowAnimation(false), 2000)
    }
  }

  if (voted !== null) {
    return (
      <Card className="border-[#e0e5ce] bg-[#f8f9f4]">
        <CardContent className="flex flex-col items-center justify-center p-6">
          {voted ? (
            <>
              {showAnimation && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#415444]"
                >
                  <Check className="h-10 w-10 text-white" />
                </motion.div>
              )}
              <p className="text-center text-lg font-medium text-[#415444]">Thank you for verifying this plan!</p>
              <p className="mt-2 text-center text-sm text-gray-500">
                Your feedback helps improve our community recommendations.
              </p>
            </>
          ) : (
            <>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f0f0]">
                <X className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-center text-lg font-medium text-gray-700">We'll work on improving this plan.</p>
              <p className="mt-2 text-center text-sm text-gray-500">Thank you for your feedback.</p>
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-[#e0e5ce]">
      <CardContent className="p-6">
        <h3 className="mb-4 text-center text-lg font-medium">Are you satisfied with this plan?</h3>
        <div className="flex justify-center gap-4">
          <Button onClick={() => handleVote(true)} className="bg-[#415444] px-6 hover:bg-[#415444]/90">
            <Check className="mr-2 h-4 w-4" />
            Yes
          </Button>
          <Button
            onClick={() => handleVote(false)}
            variant="outline"
            className="border-[#415444] px-6 text-[#415444] hover:bg-[#415444]/10"
          >
            <X className="mr-2 h-4 w-4" />
            No
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
