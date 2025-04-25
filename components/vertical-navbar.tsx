"use client"

import { useState, useEffect, JSX } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ChevronRight, Compass, Globe, Home, Wallet, Menu, MessageSquare, Settings, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
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
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
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
    { name: "Home", icon: <Home className={cn(expanded ? "h-5 w-5" : "h-6 w-6")} />, href: "/" },
    { name: "Explore", icon: <Compass className={cn(expanded ? "h-5 w-5" : "h-6 w-6")} />, href: "/explore" },
    { name: "Messages", icon: <MessageSquare className={cn(expanded ? "h-5 w-5" : "h-6 w-6")} />, href: "/messages" },
    { name: "Profile", icon: <User className={cn(expanded ? "h-5 w-5" : "h-6 w-6")} />, href: "/profile" },
    { name: "Settings", icon: <Settings className={cn(expanded ? "h-5 w-5" : "h-6 w-6")} />, href: "/settings" },
  ]

  return (
    <>
      {/* Mobile overlay when nav is expanded */}
      {isMobile && expanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setExpanded(false)}
        />
      )}

      <motion.aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full flex-col border-r bg-white transition-all duration-300",
          expanded ? "w-64" : "w-16",
          isMobile && !expanded && "w-0 border-r-0"
        )}
        initial={{ x: isMobile ? -100 : -10, opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          width: isMobile ? (expanded ? 256 : 0) : (expanded ? 256 : 64)
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div 
            className={cn("flex items-center gap-2 transition-all cursor-pointer", !expanded && "justify-center w-full")}
            onClick={toggleNavbar}
          >
            <Globe className={cn("text-[#415444]", expanded ? "h-8 w-8" : "h-10 w-10")} />
            {expanded && <span className="text-xl font-bold text-[#415444]">PlanDAO</span>}
          </div>
          
          {expanded && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
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
                      isActive ? "bg-[#e0e5ce] text-[#415444]" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                      !expanded && "justify-center"
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

          <div className="mt-auto">
            {expanded ? (
              <Button
                variant="outline"
                className="w-full flex items-center gap-2 justify-center rounded-lg px-3 py-2 text-[#415444] border-[#415444] hover:bg-[#e0e5ce] transition-colors"
                onClick={handleConnectWallet}
              >
                <Wallet className="h-5 w-5 text-[#415444]" />
                <span>{isWalletConnected ? "0x1a2...3b4c" : "Connect Wallet"}</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full p-2 flex items-center justify-center rounded-lg text-[#415444] border-[#415444] hover:bg-[#e0e5ce] transition-colors"
                onClick={handleConnectWallet}
              >
                <Wallet className="h-7 w-7 text-[#415444]" />
              </Button>
            )}
          </div>
        </div>
      </motion.aside>
      
      {/* Mobile menu toggle button - only shows when navbar is collapsed on mobile */}
      {isMobile && !expanded && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-50 h-10 w-10 rounded-full bg-white shadow-md border"
          onClick={() => setExpanded(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      {/* Page content wrapper with dynamic margin */}
      <div className={cn(
        "min-h-screen transition-all duration-300",
        expanded ? "ml-64" : isMobile ? "ml-0" : "ml-16"
      )}>
        {/* Your page content goes here */}
      </div>
    </>
  )
}