"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarDays, Clock, Gift, Heart, MapPin, MessageSquare, Plus, Share2, User, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { VerticalNavbar } from "@/components/vertical-navbar"
import { CustomCursor } from "@/components/custom-cursor"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function ExplorePage() {
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("0x1234...5678")
  const [postDialogOpen, setPostDialogOpen] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [activePostId, setActivePostId] = useState<number | null>(null)
  const [viewPlansDialogOpen, setViewPlansDialogOpen] = useState(false)
  const [topPlannersDialogOpen, setTopPlannersDialogOpen] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [destination, setDestination] = useState("")
  const [budget, setBudget] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [description, setDescription] = useState("")
  const [rewardsClaimed, setRewardsClaimed] = useState(false)

  const handleConnectWallet = () => {
    if (walletConnected) {
      setWalletConnected(false)
      setWalletAddress("")
    } else {
      setWalletConnected(true)
      setWalletAddress("0x1234...5678")
    }
  }

  const handleSubmitPost = () => {
    // Add validation
    if (!destination || !budget || !startDate || !endDate || !description) {
      alert("Please fill in all required fields")
      return
    }

    // Create a new post and add it to the travelPosts array
    const newPost = {
      id: travelPosts.length + 1,
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=100&width=100",
        verified: walletConnected,
      },
      destination: destination,
      dates: `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`,
      budget: budget,
      interests: selectedInterests,
      description: description,
      likes: 0,
      comments: 0,
      responses: 0,
      timePosted: "Just now",
      liked: false,
      plans: []
    }

    setTravelPosts([newPost, ...travelPosts])
    setPostDialogOpen(false)
    
    // Reset form
    setDestination("")
    setBudget("")
    setStartDate("")
    setEndDate("")
    setSelectedInterests([])
    setDescription("")
    
    // Show success toast
    alert("Travel need posted successfully!")
  }

  const handleSharePost = (postId: number) => {
    setActivePostId(postId)
    setShareDialogOpen(true)
  }

  const handleClaimRewards = () => {
    setRewardsClaimed(true)
    alert("Rewards claimed successfully! 25 $PLAN tokens added to your wallet.")
  }

  const handleViewPlans = (postId: number) => {
    setActivePostId(postId)
    setViewPlansDialogOpen(true)
  }

  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) return
    
    const updatedPosts = travelPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1
        }
      }
      return post
    })
    
    setTravelPosts(updatedPosts)
    setCommentText("")
    alert("Comment added successfully!")
  }

  const handleLikePost = (postId: number) => {
    const updatedPosts = travelPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1,
          liked: true
        }
      }
      return post
    })
    
    setTravelPosts(updatedPosts)
  }

  const [travelPosts, setTravelPosts] = useState([
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=100&width=100",
        verified: true,
      },
      destination: "Japan",
      dates: "July 15-30, 2023",
      budget: "$1,500",
      interests: ["Food", "Culture", "Anime"],
      description:
        "Looking for a comprehensive itinerary for my solo trip to Japan. I'm particularly interested in exploring food markets, cultural sites, and anime-related attractions.",
      likes: 24,
      comments: 8,
      responses: 3,
      timePosted: "2 hours ago",
      liked: false,
      plans: [
        {
          planner: "Emma Wilson",
          title: "10-Day Tokyo & Kyoto Adventure",
          highlights: ["Tsukiji Fish Market", "Ghibli Museum", "Fushimi Inari"],
          budget: "$1,450",
          rating: 4.9
        },
        {
          planner: "Michael Chen",
          title: "Japan Anime & Food Tour",
          highlights: ["Akihabara Electric Town", "Izakaya Hopping", "TeamLab Borderless"],
          budget: "$1,380",
          rating: 4.7
        },
        {
          planner: "Sophia Rodriguez",
          title: "Cultural Japan Experience",
          highlights: ["Tea Ceremony", "Mt. Fuji Day Trip", "Nara Deer Park"],
          budget: "$1,520",
          rating: 4.8
        }
      ]
    },
    {
      id: 2,
      user: {
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=100&width=100",
        verified: true,
      },
      destination: "Italy",
      dates: "September 5-20, 2023",
      budget: "$2,200",
      interests: ["History", "Food", "Art"],
      description:
        "Planning a honeymoon trip to Italy. We want to visit Rome, Florence, and Venice. Looking for romantic restaurants, historical sites, and art museums recommendations.",
      likes: 42,
      comments: 15,
      responses: 7,
      timePosted: "5 hours ago",
      liked: false,
      plans: [
        {
          planner: "Emma Wilson",
          title: "Romantic Italian Getaway",
          highlights: ["Private Gondola Ride", "Tuscan Winery Tour", "Vatican After Hours"],
          budget: "$2,150",
          rating: 4.9
        },
        {
          planner: "David Kim",
          title: "Art & History Tour of Italy",
          highlights: ["Skip-the-line Uffizi", "Hidden Rome Tour", "Venice Mask Workshop"],
          budget: "$2,300",
          rating: 4.6
        }
      ]
    },
    {
      id: 3,
      user: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=100&width=100",
        verified: false,
      },
      destination: "Thailand",
      dates: "December 10-30, 2023",
      budget: "$1,800",
      interests: ["Beaches", "Nightlife", "Food"],
      description:
        "Planning a month-long backpacking trip through Thailand with friends. We want to experience the best beaches, nightlife, and food. Any recommendations for off-the-beaten-path locations?",
      likes: 18,
      comments: 6,
      responses: 2,
      timePosted: "1 day ago",
      liked: false,
      plans: [
        {
          planner: "Sophia Rodriguez",
          title: "Thailand Beach & Party Tour",
          highlights: ["Full Moon Party", "Secret Beach Camping", "Street Food Safari"],
          budget: "$1,750",
          rating: 4.8
        },
        {
          planner: "Michael Chen",
          title: "Authentic Thailand Experience",
          highlights: ["Cooking Class", "Hidden Waterfalls", "Local Homestay"],
          budget: "$1,600",
          rating: 4.7
        }
      ]
    },
    {
      id: 4,
      user: {
        name: "Sarah Wilson",
        avatar: "/placeholder.svg?height=100&width=100",
        verified: true,
      },
      destination: "Iceland",
      dates: "February 5-15, 2024",
      budget: "$3,000",
      interests: ["Nature", "Northern Lights", "Hot Springs"],
      description:
        "Planning a winter trip to Iceland to see the Northern Lights. Also interested in hot springs, glacier tours, and unique accommodations. Any tips for winter driving?",
      likes: 36,
      comments: 12,
      responses: 5,
      timePosted: "2 days ago",
      liked: false,
      plans: [
        {
          planner: "Emma Wilson",
          title: "Iceland Winter Wonderland",
          highlights: ["Northern Lights Hunt", "Blue Lagoon VIP", "Ice Cave Tour"],
          budget: "$2,950",
          rating: 4.9
        },
        {
          planner: "Michael Chen",
          title: "Golden Circle & South Coast",
          highlights: ["Glacier Hike", "Secret Lagoon", "Bubble Hotel Stay"],
          budget: "$3,100",
          rating: 4.8
        },
        {
          planner: "David Kim",
          title: "Iceland Adventure Tour",
          highlights: ["Snowmobile Tour", "Hot Spring Hopping", "4x4 Winter Driving"],
          budget: "$2,850",
          rating: 4.7
        }
      ]
    },
  ])

  const topPlanners = [
    {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.9,
      plans: 124,
      specialties: ["Europe", "Luxury", "Cultural"],
      bio: "Professional travel planner with 8 years of experience. Specializes in custom European itineraries with a focus on cultural immersion and unique experiences."
    },
    {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      plans: 98,
      specialties: ["Asia", "Budget", "Food"],
      bio: "Food and travel blogger turned planner. Expert in Asian destinations with insider knowledge of the best local eateries and hidden gems."
    },
    {
      name: "Sophia Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.7,
      plans: 87,
      specialties: ["Adventure", "Beaches", "Solo Travel"],
      bio: "Adventure travel specialist with experience in over 50 countries. Creates unique, off-the-beaten-path itineraries for thrill-seekers."
    },
    {
      name: "David Kim",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.6,
      plans: 76,
      specialties: ["Family", "Nature", "Photography"],
      bio: "Family travel expert and professional photographer. Designs itineraries that balance kid-friendly activities with breathtaking photo opportunities."
    },
    {
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      plans: 92,
      specialties: ["Honeymoon", "Islands", "Wellness"],
      bio: "Specializes in romantic getaways and wellness retreats. Known for creating personalized experiences that combine luxury and authentic local culture."
    },
    {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.5,
      plans: 65,
      specialties: ["Road Trips", "National Parks", "Hiking"],
      bio: "Outdoor enthusiast and former park ranger. Expert in planning detailed road trips and hiking adventures across national parks."
    }
  ]

  const activePost = travelPosts.find(post => post.id === activePostId)

  return (
    <>
      <CustomCursor />
      <div className="flex min-h-screen bg-[#fcfdfd]">
        {/* Vertical Navbar */}
        <VerticalNavbar />

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#415444]">Explore Travel Plans</h1>
                <p className="mt-2 text-gray-600">Discover travel needs and create custom plans</p>
              </div>

              <div className="mt-4 flex items-center gap-4 md:mt-0">
                {walletConnected ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border border-[#415444]">
                      <AvatarFallback className="bg-[#e0e5ce] text-[#415444]">
                        {walletAddress.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{walletAddress}</span>
                  </div>
                ) : (
                  <Button variant="outline" className="gap-2 border-2" onClick={handleConnectWallet}>
                    Connect Wallet
                  </Button>
                )}
              </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Column - Post Dialog Trigger */}
              <div className="lg:col-span-2">
                <Card className="mb-8 border-2 border-dashed border-[#415444]/30 bg-[#f8f9fa]">
                  <CardContent
                    className="flex cursor-pointer flex-col items-center justify-center p-8"
                    onClick={() => setPostDialogOpen(true)}
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e0e5ce]">
                      <Plus className="h-8 w-8 text-[#415444]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#415444]">Post Your Travel Need</h3>
                    <p className="mt-2 text-center text-gray-600">
                      Share your travel plans and get personalized itineraries from verified planners
                    </p>
                  </CardContent>
                </Card>

                {/* Post Dialog */}
                <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Post Your Travel Need</DialogTitle>
                      <DialogDescription>
                        Share details about your trip to get personalized itineraries from verified planners.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="destination">Destination</Label>
                          <Input 
                            id="destination" 
                            placeholder="e.g., Japan, Italy, Thailand" 
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="budget">Budget</Label>
                          <Input 
                            id="budget" 
                            placeholder="e.g., $1,500" 
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="start-date">Start Date</Label>
                          <Input 
                            id="start-date" 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="end-date">End Date</Label>
                          <Input 
                            id="end-date" 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="interests">Interests (select multiple)</Label>
                        <Select onValueChange={(value) => setSelectedInterests([...selectedInterests, value])}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select interests" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Food">Food</SelectItem>
                            <SelectItem value="Culture">Culture</SelectItem>
                            <SelectItem value="History">History</SelectItem>
                            <SelectItem value="Nature">Nature</SelectItem>
                            <SelectItem value="Adventure">Adventure</SelectItem>
                            <SelectItem value="Relaxation">Relaxation</SelectItem>
                            <SelectItem value="Nightlife">Nightlife</SelectItem>
                            <SelectItem value="Shopping">Shopping</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedInterests.map((interest, i) => (
                            <Badge key={i} className="flex items-center gap-1 bg-[#e0e5ce] text-[#415444]">
                              {interest}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0"
                                onClick={() => setSelectedInterests(selectedInterests.filter((_, index) => index !== i))}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your travel plans, preferences, and what you're looking for..."
                          className="min-h-[120px]"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-4">
                      <Button variant="outline" onClick={() => setPostDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-[#415444] hover:bg-[#415444]/90" onClick={handleSubmitPost}>
                        Post Travel Need
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Travel Posts */}
                <div className="space-y-6">
                  <AnimatePresence>
                    {travelPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <Card className="overflow-hidden border-0 bg-white shadow-md hover:shadow-lg transition-all duration-300">
                          <CardHeader className="bg-[#f8f9fa] pb-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                                  <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium">{post.user.name}</span>
                                    {post.user.verified && (
                                      <Badge variant="outline" className="bg-[#e0e5ce] text-[#415444] border-0">
                                        Verified
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock className="h-3 w-3" />
                                    <span>{post.timePosted}</span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => handleSharePost(post.id)}>
                                <Share2 className="h-5 w-5" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="mb-4 flex flex-wrap gap-2">
                              <div className="flex items-center gap-1 rounded-full bg-[#e0e5ce] px-3 py-1 text-sm text-[#415444]">
                                <MapPin className="h-4 w-4" />
                                <span>{post.destination}</span>
                              </div>
                              <div className="flex items-center gap-1 rounded-full bg-[#e0e5ce] px-3 py-1 text-sm text-[#415444]">
                                <CalendarDays className="h-4 w-4" />
                                <span>{post.dates}</span>
                              </div>
                              <div className="flex items-center gap-1 rounded-full bg-[#e0e5ce] px-3 py-1 text-sm text-[#415444]">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M12 1V23"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span>{post.budget}</span>
                              </div>
                            </div>

                            <p className="mb-4 text-gray-700">{post.description}</p>

                            <div className="flex flex-wrap gap-2">
                              {post.interests.map((interest, i) => (
                                <Badge key={i} variant="secondary" className="bg-[#f8f9fa]">
                                  {interest}
                                </Badge>
                              ))}
                            </div>
                            
                            {/* Comment input */}
                            <div className="mt-4 flex items-center gap-2">
                              <Input 
                                placeholder="Add a plan..." 
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                              />
                              <Button 
                                size="sm" 
                                className="bg-[#415444] hover:bg-[#415444]/90"
                                onClick={() => handleAddComment(post.id)}
                              >
                                Add Plan 
                              </Button>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t bg-[#f8f9fa] px-6 py-3">
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center gap-6">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className={`flex items-center gap-1 px-2 ${post.liked ? 'text-red-500' : ''}`}
                                  onClick={() => handleLikePost(post.id)}
                                >
                                  <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                                  <span>{post.likes}</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                                  <MessageSquare className="h-4 w-4" />
                                  <span>{post.comments}</span>
                                </Button>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">{post.responses} planner responses</span>
                                <Button 
                                  size="sm" 
                                  className="bg-[#415444] hover:bg-[#415444]/90"
                                  onClick={() => handleViewPlans(post.id)}
                                >
                                  View Plans
                                </Button>
                              </div>
                            </div>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column - Daily Claim Box */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card className="sticky top-8 border-0 bg-gradient-to-br from-[#415444] to-[#338838] text-white overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Gift className="h-5 w-5" />
                        Daily Rewards
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6 flex flex-col items-center">
                        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/20 p-2">
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-white/20">
                            {rewardsClaimed ? (
                              <Check className="h-12 w-12 text-white" />
                            ) : (
                              <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M15 9.35L12 6.35L9 9.35"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M12 18V9"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold">25 $PLAN</h3>
                        <p className="mt-1 text-sm text-white/80">
                          {rewardsClaimed ? "Claimed today" : "Available to claim"}
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                        <span>Streak Bonus</span>
                          <span>+5 $PLAN</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Referral Bonus</span>
                          <span>+10 $PLAN</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Activity Reward</span>
                          <span>+10 $PLAN</span>
                        </div>
                        <Separator className="bg-white/20" />
                        <div className="flex items-center justify-between font-semibold">
                          <span>Total</span>
                          <span>25 $PLAN</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className={`w-full ${rewardsClaimed ? 'bg-white/30 cursor-not-allowed' : 'bg-white hover:bg-white/90'} text-[#415444]`}
                        onClick={handleClaimRewards}
                        disabled={rewardsClaimed}
                      >
                        {rewardsClaimed ? 'Rewards Claimed' : 'Claim Rewards'}
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="mt-6 border-0 bg-[#e0e5ce] overflow-hidden">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-[#415444]">
                        <User className="h-5 w-5" />
                        Top Planners
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topPlanners.slice(0, 3).map((planner, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={planner.avatar || "/placeholder.svg"} alt={planner.name} />
                              <AvatarFallback>{planner.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{planner.name}</span>
                                <div className="flex items-center gap-1">
                                  <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="text-sm">{planner.rating}</span>
                                </div>
                              </div>
                              <div className="text-sm text-gray-600">{planner.plans} plans created</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full border-[#415444] text-[#415444]"
                        onClick={() => setTopPlannersDialogOpen(true)}
                      >
                        View All Planners
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share this travel plan</DialogTitle>
            <DialogDescription>
              Share this travel need with friends or on social media
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-3">
              <Button className="flex items-center justify-start gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"></path>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.246 16.945c-.833 1.245-1.841 2.247-3.083 3.176-1.25.934-2.595 1.628-4.09 2.102a12.316 12.316 0 01-4.57.519c-1.454-.156-2.867-.566-4.22-1.249l-.18-.107c-1.176-.725-2.185-1.614-3.033-2.674-.844-1.058-1.458-2.251-1.873-3.603-.415-1.352-.573-2.76-.425-4.22.156-1.454.566-2.867 1.249-4.22l.107-.18c.725-1.176 1.614-2.185 2.674-3.033 1.058-.844 2.251-1.458 3.603-1.873 1.352-.415 2.76-.573 4.22-.425 1.454.156 2.867.566 4.22 1.249l.18.107c1.176.725 2.185 1.614 3.033 2.674.844 1.058 1.458 2.251 1.873 3.603.415 1.352.573 2.76.425 4.22-.156 1.454-.566 2.867-1.249 4.22l-.107.18c-.464.751-.991 1.43-1.58 2.034z"></path>
                </svg>
                Share on WhatsApp
              </Button>
              <Button className="flex items-center justify-start gap-2 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                </svg>
                Share on Twitter
              </Button>
              <Button className="flex items-center justify-start gap-2 bg-[#4267B2] hover:bg-[#4267B2]/90 text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                </svg>
                Share on Facebook
              </Button>
              <Button className="flex items-center justify-start gap-2 bg-[#E60023] hover:bg-[#E60023]/90 text-white">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"></path>
                </svg>
                Share on Pinterest
              </Button>
              <div className="relative mt-2">
                <Input 
                  value={`https://travelplanner.com/post/${activePostId}`} 
                  readOnly 
                  className="pr-24"
                />
                <Button 
                  className="absolute right-1 top-1 h-8 bg-[#415444] hover:bg-[#415444]/90"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://travelplanner.com/post/${activePostId}`);
                    alert("Link copied to clipboard!");
                  }}
                >
                  Copy Link
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Plans Dialog */}
      <Dialog open={viewPlansDialogOpen} onOpenChange={setViewPlansDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Travel Plans for {activePost?.destination}</DialogTitle>
            <DialogDescription>
              View customized travel plans created by verified planners
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Tabs defaultValue="plans" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="plans">Available Plans ({activePost?.plans?.length || 0})</TabsTrigger>
                <TabsTrigger value="request">Request New Plan</TabsTrigger>
              </TabsList>
              <TabsContent value="plans" className="max-h-[400px] overflow-y-auto">
                {activePost?.plans?.map((plan, index) => (
                  <Card key={index} className="mb-4 border bg-white hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{plan.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-600">By {plan.planner}</span>
                            <div className="flex items-center gap-1">
                              <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-sm font-medium">{plan.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-[#e0e5ce] text-[#415444] border-0">
                          {plan.budget}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Highlights</p>
                        <div className="flex flex-wrap gap-2">
                          {plan.highlights.map((highlight, i) => (
                            <Badge key={i} variant="secondary" className="bg-[#f8f9fa]">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button className="w-full bg-[#415444] hover:bg-[#415444]/90">
                        View Full Itinerary
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="request">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label>What type of plan are you looking for?</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select plan type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="budget">Budget-friendly</SelectItem>
                            <SelectItem value="luxury">Luxury experience</SelectItem>
                            <SelectItem value="family">Family-friendly</SelectItem>
                            <SelectItem value="adventure">Adventure-focused</SelectItem>
                            <SelectItem value="cultural">Cultural immersion</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Additional preferences</Label>
                        <Textarea placeholder="Share any specific preferences or requirements for your trip" />
                      </div>
                      <div className="grid gap-2">
                        <Label>Budget range</Label>
                        <div className="flex items-center gap-2">
                          <Input placeholder="Min" type="number" className="w-1/2" />
                          <span>-</span>
                          <Input placeholder="Max" type="number" className="w-1/2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setViewPlansDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-[#415444] hover:bg-[#415444]/90" onClick={() => {
                      alert("Request sent! Planners will be notified of your request.");
                      setViewPlansDialogOpen(false);
                    }}>
                      Request Plans
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {/* Top Planners Dialog */}
      <Dialog open={topPlannersDialogOpen} onOpenChange={setTopPlannersDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Top Travel Planners</DialogTitle>
            <DialogDescription>
              Discover experienced travel planners and their specialties
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 grid gap-4 max-h-[400px] overflow-y-auto">
            {topPlanners.map((planner, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="py-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={planner.avatar || "/placeholder.svg"} alt={planner.name} />
                      <AvatarFallback>{planner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{planner.name}</h3>
                        <div className="flex items-center gap-1">
                          <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium">{planner.rating}</span>
                          <span className="text-sm text-gray-600">({planner.plans} plans)</span>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{planner.bio}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {planner.specialties.map((specialty, i) => (
                          <Badge key={i} variant="secondary" className="bg-[#f8f9fa]">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-[#f8f9fa] py-2">
                  <div className="flex w-full justify-end gap-2">
                    <Button variant="outline" size="sm">
                      See Plans
                    </Button>
                    <Button size="sm" className="bg-[#415444] hover:bg-[#415444]/90">
                      Contact Planner
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}