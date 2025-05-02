"use client"

import type React from "react"

import { useState, useEffect, type JSX } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ChevronRight, Compass, Globe, Home, Menu, MessageSquare, Settings, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  icon: React.ReactNode
  href: string
}

export function VerticalNavbar(): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(true)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)
  const pathname = usePathname()

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = (): void => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setExpanded(false)
      }
    }

    // Initial check
    checkScreenSize()

    // Listen for resize events
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const toggleNavbar = (): void => setExpanded(!expanded)

  // Simulate wallet connection (replace with actual RainbowKit implementation later)
  const handleConnectWallet = (): void => {
    setIsWalletConnected(!isWalletConnected)

    // Display a message for now
    if (!isWalletConnected) {
      console.log("Please configure WagmiProvider to use RainbowKit")
    }
  }

  const navItems: NavItem[] = [
    { name: "Home", icon: <Home className={cn(expanded ? "h-5 w-5" : "h-7 w-7")} />, href: "/" },
    { name: "Explore", icon: <Compass className={cn(expanded ? "h-5 w-5" : "h-7 w-7")} />, href: "/explore" },
    { name: "Messages", icon: <MessageSquare className={cn(expanded ? "h-5 w-5" : "h-7 w-7")} />, href: "/messages" },
    { name: "Profile", icon: <User className={cn(expanded ? "h-5 w-5" : "h-7 w-7")} />, href: "/profile" },
    { name: "Settings", icon: <Settings className={cn(expanded ? "h-5 w-5" : "h-7 w-7")} />, href: "/settings" },
  ]

  return (
    <>
      {/* Mobile overlay when nav is expanded */}
      {isMobile && expanded && <div className="fixed inset-0 bg-black/20 z-30" onClick={() => setExpanded(false)} />}

      <motion.aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full flex-col border-r border-green-900/20 bg-[#1a3a2a] transition-all duration-300",
          expanded ? "w-64" : "w-16",
          isMobile && !expanded && "w-0 border-r-0",
        )}
        initial={{ x: isMobile ? -100 : -10, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          width: isMobile ? (expanded ? 256 : 0) : expanded ? 256 : 64,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex h-16 items-center justify-between border-b border-green-900/30 px-4">
          <div
            className={cn(
              "flex items-center gap-2 transition-all cursor-pointer",
              !expanded && "justify-center w-full",
            )}
            onClick={toggleNavbar}
          >
            <Globe className={cn("text-green-200", expanded ? "h-8 w-8" : "h-10 w-10")} />
            {expanded && <span className="text-xl font-bold text-green-100">PlanDAO</span>}
          </div>

          {expanded && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-green-200 hover:bg-green-800/30 hover:text-white"
              onClick={() => setExpanded(false)}
            >
              {isMobile ? <X className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                      isActive
                        ? "bg-green-800/60 text-green-100"
                        : "text-green-300 hover:bg-green-800/30 hover:text-green-100",
                      !expanded && "justify-center py-3", // Added more padding when collapsed
                    )}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.icon}
                    {expanded && <span>{item.name}</span>}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          <appkit-button balance="hide"/>
        </div>
      </motion.aside>

      {/* Mobile menu toggle button - only shows when navbar is collapsed on mobile */}
      {isMobile && !expanded && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-50 h-10 w-10 rounded-full bg-[#1a3a2a] text-green-100 shadow-md border border-green-900/20"
          onClick={() => setExpanded(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Page content wrapper with dynamic margin */}
      <div className={cn("min-h-screen transition-all duration-300", expanded ? "ml-64" : isMobile ? "ml-0" : "ml-16")}>
        {/* Your page content goes here */}
      </div>
    </>
  )
}
