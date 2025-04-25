"use client"

import { motion } from "framer-motion"
import { Globe } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#fcfdfd]">
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="mb-8 flex items-center gap-2"
        >
          <Globe className="h-12 w-12 text-[#415444]" />
          <span className="text-3xl font-bold text-[#415444]">PlanDAO</span>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 300 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="h-1 bg-[#415444] rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 text-gray-600"
        >
          Loading your travel experience...
        </motion.p>
      </div>
    </div>
  )
}
