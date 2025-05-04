"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { VerticalNavbar } from "@/components/vertical-navbar"
import { CustomCursor } from "@/components/custom-cursor"
import { LoadingScreen } from "@/components/loading-screen"
import { Footer } from "@/components/Footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const router = useRouter()

  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleConnectWallet = () => {
    if (walletConnected) {
      setWalletConnected(false)
      setWalletAddress("")
    } else {
      // Simulate wallet connection
      setWalletConnected(true)
      setWalletAddress("0x1234...5678")
    }
  }

  const handleGetStarted = () => {
    router.push("/explore")
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <CustomCursor />
      <div className="flex min-h-screen bg-[#fcfdfd]">
        {/* Vertical Navbar */}
        <VerticalNavbar />

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {/* Hero Section with Parallax */}
          <section className="relative h-screen overflow-hidden">
            {/* Parallax Background - Updated with travel image */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `translateY(${scrollY * 0.5}px)`,
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
              >
                <motion.h1
                  className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Travel Plans <span className="text-[#e0e5ce]">Powered by Community & AI</span>
                </motion.h1>
                <motion.p
                  className="mt-6 text-xl text-gray-200 md:text-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Get personalized travel itineraries from verified planners and our AI assistant. Pay with crypto, earn
                  rewards, and join our DAO.
                </motion.p>
                <motion.div
                  className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Button
                    variant="default"
                    className="bg-[#415444] text-white hover:bg-[#415444]/90 text-lg px-8 py-6"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                  {/* <Button
                    variant="outline"
                    className="border-2 border-[#415444] bg-transparent text-white hover:bg-[#415444]/20 text-lg px-8 py-6"
                    onClick={handleConnectWallet}
                  >
                    {walletConnected ? `Disconnect (${walletAddress.slice(0, 6)}...)` : "Connect Wallet"}
                  </Button> */}
                </motion.div>
              </motion.div>

              {/* Scroll indicator */}
              <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 5V19M12 19L5 12M12 19L19 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
          </section>
           {/* Enhanced How It Works Section */}
<section id="how-it-works" className="py-24 md:py-32 bg-[#f9f9f5]">
  <div className="mx-auto max-w-7xl px-6 md:px-8">
    <motion.div
      className="mb-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold text-[#415444] md:text-5xl">How It Works</h2>
      <p className="mt-4 text-xl text-gray-600">Transforming travel planning with <span className="text-[#5a7460] font-semibold">blockchain-powered</span> experiences</p>
      
      <motion.div 
        className="flex justify-center mt-6"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#415444] to-transparent rounded-full" />
      </motion.div>
    </motion.div>

    {/* Main workflow cards */}
    {/* <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {[
        // {
        //   step: 1,
        //   title: "Post a Travel Need",
        //   description:
        //     '"I\'m going to Japan in July. Budget: $1,500. Interested in food, culture, and anime."',
        //   image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        // },
        // {
        //   step: 2,
        //   title: "Get Custom Plans",
        //   description: "Verified travel planners respond with unique, tailored itineraries for your trip.",
        //   image: "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        // },
        // {
        //   step: 3,
        //   title: "AI Assistant",
        //   description: "Helps refine trip posts, recommends the best plans, and answers questions instantly.",
        //   image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        // },
        {
          step: 4,
          title: "Choose & Pay",
          description:
            "Pick your favorite plan, pay with crypto, and funds are held safely in smart contract.",
          image: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.8 }}
        >
          <Card className="group h-full border-0 bg-[#e0e5ce] rounded-[24px] overflow-hidden transition-all duration-500 hover:shadow-xl">
            {item.image && (
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
            )}
            <motion.div
              className="p-6 pt-8"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#415444] text-white">
                <span className="text-xl font-bold">{item.step}</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </motion.div>
          </Card>
        </motion.div>
      ))}
    </div> */}

    {/* <motion.div
      className="mt-12 flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8 }}
    >
      <Card className="border-0 bg-[#e7ddd1] rounded-[24px] overflow-hidden transition-all duration-300 hover:shadow-lg max-w-md w-full">
        <div className="h-48 w-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
            alt="Verified travel plans" 
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110" 
          />
        </div>
        <motion.div
          className="p-6 pt-8"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#415444] text-white">
            <span className="text-xl font-bold">5</span>
          </div>
          <h3 className="mb-2 text-xl font-semibold">Verified & Safe</h3>
          <p className="text-gray-700">
            Plans are reviewed by the community (DAO) + AI. Only trusted planners allowed. NFT badges prove
            planner reputation.
          </p>
        </motion.div>
      </Card>
    </motion.div> */}

    {/* User Journey Tabs */}
    <motion.div 
      className="mt-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Tabs defaultValue="traveler" className="w-full">
        <div className="mb-8 flex justify-center">
          <TabsList className="bg-[#e0e5ce] p-1 rounded-full">
            <TabsTrigger 
              value="traveler" 
              className="px-6 py-2 rounded-full data-[state=active]:bg-[#415444] data-[state=active]:text-white"
            >
              Traveler Journey
            </TabsTrigger>
            <TabsTrigger 
              value="agent" 
              className="px-6 py-2 rounded-full data-[state=active]:bg-[#415444] data-[state=active]:text-white"
            >
              Travel Agent Journey
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="traveler" className="mt-4">
          <div className="bg-white rounded-[24px] p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#415444] mb-4 text-center">Complete Traveler Workflow</h3>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Your journey from dream to reality, secured by blockchain technology</p>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
              {[
                {
                  step: 1,
                  title: "Sign Up & Profile Creation",
                  description: "Register with email/crypto wallet. Set your travel preferences including budget, travel style, and dates. Boost your trust score with optional KYC verification.",
                  icon: "👤",
                  image: "https://images.unsplash.com/photo-1484807352052-23338990c6c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                },
                {
                  step: 2,
                  title: "Post Travel Request",
                  description: "Specify destination, dates, budget, and travel interests (beaches, adventure, food). Request only verified/RWA-backed plans for added security.",
                  icon: "✏️",
                  image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                },
                {
                  step: 3,
                  title: "Receive Proposals from Agents",
                  description: "Browse custom plans with day-wise itineraries, price breakdowns, accommodation details, and RWA-backed verification badges.",
                  icon: "📝",
                  image: "https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                },
                {
                  step: 4,
                  title: "Compare & Select a Plan",
                  description: "Filter by price, rating, and RWA verification. Access detailed agent profiles with verified ratings to find your perfect match.",
                  icon: "🔍",
                  image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                },
                {
                  step: 5,
                  title: "Make Payment (Escrow Smart Contract)",
                  description: "Your funds remain secure in our blockchain-based escrow system, visible to the DAO but inaccessible to the agent until trip completion.",
                  icon: "🔐",
                  image: "https://images.unsplash.com/photo-1618044619888-009e412ff12a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                },
                {
                  step: 6,
                  title: "Final Planning & Communication",
                  description: "Fine-tune your experience through our encrypted chat system. Add special requests, confirm details, and prepare for your adventure.",
                  icon: "💬",
                  image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                },
                {
                  step: 7,
                  title: "Complete the Travel",
                  description: "Embark on your journey with confidence, knowing every detail has been carefully planned and secured by our platform.",
                  icon: "✈️",
                  image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                },
                {
                  step: 8,
                  title: "Post-Trip Submission",
                  description: "Share your experiences through photos, satisfaction letters, and optional verified receipts that enhance the community's trust network.",
                  icon: "📸",
                  image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                },
                {
                  step: 9,
                  title: "DAO Review & Agent Payment",
                  description: "Our decentralized community validates your trip experience, automatically triggering smart contract payment to your agent.",
                  icon: "⚖️",
                  image: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                },
                {
                  step: 10,
                  title: "Rate the Agent & Earn Reputation",
                  description: "Contribute to our ecosystem by rating your experience and earning your own soulbound NFT badge that enhances your future travel options.",
                  icon: "⭐",
                  image: "https://images.unsplash.com/photo-1508697014387-db70aad34f4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-[#f8f9f7] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                >
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#415444] text-white flex items-center justify-center mr-3">
                        <span className="font-bold">{item.step}</span>
                      </div>
                      <span className="text-2xl">{item.icon}</span>
                      <h4 className="text-lg font-semibold text-[#415444] ml-2">{item.title}</h4>
                    </div>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="agent" className="mt-4">
          <div className="bg-white rounded-[24px] p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-[#415444] mb-4 text-center">Complete Travel Agent Workflow</h3>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">Turn your travel expertise into a thriving business with our blockchain-powered platform</p>
            
            <div className="relative mb-12 overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[#415444]/70 via-[#415444]/50 to-transparent z-10"></div>
              <img 
                src="https://middleeasttravels.com/wp-content/uploads/2024/04/banner01.png"
                alt="Travel Agent Experience"
                className="w-full h-64 object-cover"
              />
              <motion.div 
                className="absolute inset-0 z-20 flex items-center px-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="max-w-lg">
                  <h4 className="text-2xl font-bold text-white mb-3">Become a Verified Travel Expert</h4>
                  <p className="text-white/90">Our platform transforms how you connect with clients, secure payments, and build your reputation in the travel industry.</p>
                </div>
              </motion.div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: "Sign Up & Verification",
                  description: "Complete KYC verification, link your crypto wallet, and stake tokens to unlock proposal rights. Tokenize your travel assets for added credibility.",
                  icon: "🔐",
                  color: "bg-[#e0e5ce]",
                  iconBg: "bg-[#415444]"
                },
                {
                  step: 2,
                  title: "Browse Travel Requests",
                  description: "Access a marketplace of travel needs filtered by destination, budget, and dates to match your expertise and offerings.",
                  icon: "🔍",
                  color: "bg-[#e7ddd1]",
                  iconBg: "bg-[#415444]"
                },
                {
                  step: 3,
                  title: "Submit Custom Travel Plans",
                  description: "Create personalized itineraries with verified bookings and RWA-backed offers that stand out from the competition.",
                  icon: "✏️",
                  color: "bg-[#e0e5ce]",
                  iconBg: "bg-[#415444]"
                },
                {
                  step: 4,
                  title: "Get Selected by Traveller",
                  description: "Receive selection notifications and use our secure chat to finalize all travel details with your clients.",
                  icon: "🤝",
                  color: "bg-[#e7ddd1]",
                  iconBg: "bg-[#415444]"
                },
                {
                  step: 5,
                  title: "Wait for Travel Completion",
                  description: "Focus on providing excellent service while funds remain securely locked in our blockchain escrow system.",
                  icon: "⏳",
                  color: "bg-[#e0e5ce]",
                  iconBg: "bg-[#415444]"
                },
                {
                  step: 6,
                  title: "Payment Released After DAO Validation",
                  description: "Receive automatic payment to your wallet after our decentralized community verifies trip completion.",
                  icon: "💰",
                  color: "bg-[#e7ddd1]",
                  iconBg: "bg-[#415444]"
                },
                {
                  step: 7,
                  title: "Build Reputation",
                  description: "Grow your business through our transparent review system that rewards quality with higher visibility and opportunities.",
                  icon: "⭐",
                  color: "bg-[#e0e5ce]",
                  iconBg: "bg-[#415444]"
                },
                {
                  step: 8,
                  title: "RWA Collateral Management",
                  description: "Leverage your real-world assets as collateral to gain priority visibility and enhanced credibility with travelers.",
                  icon: "🏨",
                  color: "bg-[#e7ddd1]",
                  iconBg: "bg-[#415444]"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className={`${item.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-center mb-4">
                    <div className={`flex-shrink-0 h-12 w-12 rounded-full ${item.iconBg} text-white flex items-center justify-center mr-3`}>
                      <span className="font-bold">{item.step}</span>
                    </div>
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-[#415444] mb-2">{item.title}</h4>
                  <p className="text-gray-700">{item.description}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-10 p-4 border-l-4 border-[#415444] bg-[#f8f9f7] rounded-r-lg">
              <h4 className="font-semibold text-[#415444]">💡 Pro Tip for Travel Agents</h4>
              <p className="text-gray-700">Agents who back their offerings with tokenized Real World Assets receive 2.5x more bookings and 30% higher reviews on average.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>

    {/* Testimonials */}
    <motion.div
      className="mt-24 mb-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    >
      <h3 className="text-2xl font-bold text-[#415444] text-center mb-10">What Our Community Says</h3>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            quote: "As a traveler, I love how the platform connects me with experts who create experiences I couldn't find anywhere else. The blockchain security made me feel completely safe.",
            author: "Mia Chen",
            role: "Adventure Traveler",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
          },
          {
            quote: "I've been a travel agent for 15 years, and this platform has transformed my business. The escrow system means I can focus on creating amazing trips without payment concerns.",
            author: "James Wilson",
            role: "Travel Expert",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
          },
          {
                quote: "The RWA backing gives me confidence that what I'm booking is real. My Japan trip was flawlessly organized, and the DAO review system ensured everything was as promised.",
                author: "Sophie Rodriguez",
                role: "Digital Nomad",
                avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          </motion.div>
        </div>
      </section>
            {/* Web3 Features */}
          <section id="features" className="bg-[#f8f9fa] py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <div className="grid gap-16 md:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl font-bold text-[#415444] md:text-5xl">Web3 Layer</h2>
                  <div className="mt-8 space-y-8">
                    {[
                      {
                        icon: (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15 9.35L12 6.35L9 9.35"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 18V9"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ),
                        title: "$PLAN Token",
                        description: "Used for bookings, rewards, tipping, and voting in the DAO.",
                        image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      },
                      {
                        icon: (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.5 12.5719L12 16.9999L4.5 12.5719V7.42793L12 3.00793L19.5 7.42793V12.5719Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 17V21"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ),
                        title: "NFTs",
                        description: "Travel plan NFTs, loyalty badges, and collectibles that prove your journey.",
                        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      },
                      {
                        icon: (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 12H16L14 15H10L8 12H2"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ),
                        title: "Smart Contracts",
                        description: "Secure payments and automated planner payouts with blockchain technology.",
                        image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.8 }}
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#415444] text-white">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">{item.title}</h3>
                          <p className="mt-2 text-gray-600">{item.description}</p>
                          {item.image && (
                            <div className="mt-4 h-32 w-full overflow-hidden rounded-lg">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  id="dao"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="text-3xl font-bold text-[#415444] md:text-5xl">PlanDAO Governance</h2>
                  <p className="mt-4 text-gray-600">
                    Travelers and planners stake tokens to join the DAO and participate in governance.
                  </p>
                  
                  <div className="mt-6 h-64 w-full overflow-hidden rounded-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                      alt="Travel community" 
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
                    />
                  </div>

                  <div className="mt-8 space-y-4">
                    {[
                      "Approving new planners",
                      "Platform changes and improvements",
                      "Dispute resolution between travelers and planners",
                      "Earn rewards for contributing to the community",
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index, duration: 0.6 }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M9 18L15 12L9 6"
                            stroke="#338838"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p>{item}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <h3 className="text-2xl font-semibold">Income Streams</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {[
                        "Booking fee (small %)",
                        "Premium AI trip assistant",
                        "Featured planner listings",
                        "Partnerships with hotels, guides, tours",
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * index, duration: 0.6 }}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 18L15 12L9 6"
                              stroke="#338838"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p>{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  )
}