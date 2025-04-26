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
                  <Button
                    variant="outline"
                    className="border-2 border-[#415444] bg-transparent text-white hover:bg-[#415444]/20 text-lg px-8 py-6"
                    onClick={handleConnectWallet}
                  >
                    {walletConnected ? `Disconnect (${walletAddress.slice(0, 6)}...)` : "Connect Wallet"}
                  </Button>
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

          {/* How It Works Section */}
          <section id="how-it-works" className="py-24 md:py-32">
            <div className="mx-auto max-w-7xl px-6 md:px-8">
              <motion.div
                className="mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-[#415444] md:text-5xl">How It Works</h2>
                <p className="mt-4 text-lg text-gray-600">Simple steps to get your perfect travel plan</p>
              </motion.div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: 1,
                    title: "Post a Travel Need",
                    description:
                      '"I\'m going to Japan in July. Budget: $1,500. Interested in food, culture, and anime."',
                    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  },
                  {
                    step: 2,
                    title: "Get Custom Plans",
                    description: "Verified travel planners respond with unique, tailored itineraries for your trip.",
                    image: "https://images.unsplash.com/photo-1504150558240-0b4fd8946624?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  },
                  {
                    step: 3,
                    title: "AI Assistant",
                    description: "Helps refine trip posts, recommends the best plans, and answers questions instantly.",
                    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  },
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
              </div>

              <motion.div
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