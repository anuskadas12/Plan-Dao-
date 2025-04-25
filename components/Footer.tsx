"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Twitter, Instagram, Github, Mail, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      // Here you would typically handle the newsletter subscription
      setTimeout(() => {
        setIsSubscribed(false)
      }, 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <footer className="bg-[#415444] text-white">
      <div className="relative">
        {/* Scroll to top button */}
        <div className="absolute left-1/2 -top-6 -translate-x-1/2 transform">
          <motion.button 
            onClick={scrollToTop}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e0e5ce] text-[#415444] shadow-lg hover:bg-[#d0d5be]"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronUp size={24} />
          </motion.button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold">PlanDAO</h3>
            <p className="mb-6 text-gray-300">
              Community-powered travel planning with Web3 and AI integration.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="rounded-full p-2 hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="rounded-full p-2 hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                href="#" 
                className="rounded-full p-2 hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a 
                href="mailto:info@plandao.xyz" 
                className="rounded-full p-2 hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Explore", "How It Works", "DAO", "About Us"].map((item, index) => (
                <li key={index}>
                  <Link href={`/${item.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-[#e0e5ce] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="mb-4 text-xl font-bold">Legal</h3>
            <ul className="space-y-2">
              {["Terms of Service", "Privacy Policy", "Cookie Policy", "Disclaimer"].map((item, index) => (
                <li key={index}>
                  <Link href={`/legal/${item.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-[#e0e5ce] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-xl font-bold">Newsletter</h3>
            <p className="mb-4 text-gray-300">
              Subscribe to our newsletter for the latest updates and travel tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-[#e0e5ce] bg-white/10 text-white placeholder:text-gray-300"
              />
              <Button 
                type="submit" 
                className="bg-[#e0e5ce] text-[#415444] hover:bg-[#d0d5be]"
              >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>&copy; {new Date().getFullYear()} PlanDAO. All rights reserved.</p>
            <div className="flex items-center space-x-2">
             
             
             </div>
          </div>
        </div>
      </div>
    </footer>
  )
}