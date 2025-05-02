"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CalendarDays, Gift, Heart, MapPin, Plus, Share2, User, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { VerticalNavbar } from "@/components/vertical-navbar"
import { CustomCursor } from "@/components/custom-cursor"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

export default function ExplorePage() {
  const { toast } = useToast()
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
  const [tokenConfirmDialogOpen, setTokenConfirmDialogOpen] = useState(false)
  const [fullItineraryDialogOpen, setFullItineraryDialogOpen] = useState(false)
  const [activeItinerary, setActiveItinerary] = useState<any>(null)
  const [connectPlannerDialogOpen, setConnectPlannerDialogOpen] = useState(false)
  const [activePlanner, setActivePlanner] = useState("")
  const [plannerMessageText, setPlannerMessageText] = useState("")
  // 1. First, add a new state for tracking verified users
  const [verifiedUsers, setVerifiedUsers] = useState<{ [key: number]: number }>({
    1: 12,
    2: 8,
    3: 3,
    4: 15,
  })
  const [userVoted, setUserVoted] = useState<{ [key: number]: boolean | null }>({})

  // 2. Add a function to handle voting
  const handleVote = (postId: number, satisfied: boolean) => {
    setUserVoted({ ...userVoted, [postId]: satisfied })

    if (satisfied) {
      // Update verified count when user votes "Yes"
      setVerifiedUsers({
        ...verifiedUsers,
        [postId]: (verifiedUsers[postId] || 0) + 1,
      })

      toast({
        title: "Plan Verified",
        description: "Thank you for verifying this travel plan!",
      })
    }
  }

  const handleSendPlannerMessage = () => {
    setConnectPlannerDialogOpen(false)
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${activePlanner}.`,
    })
  }

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

    // Open token confirmation dialog
    setTokenConfirmDialogOpen(true)
  }

  const handleConfirmPostSubmission = () => {
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
      plans: [],
    }

    setTravelPosts([newPost, ...travelPosts])
    setTokenConfirmDialogOpen(false)
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

  const handleViewFullItinerary = (plan: any) => {
    setActiveItinerary(plan)
    setFullItineraryDialogOpen(true)
  }

  const handleConnectWithPlanner = (plannerName: string) => {
    alert(`Request to connect with ${plannerName} sent successfully!`)
    setFullItineraryDialogOpen(false)
  }

  const handleAddComment = (postId: number) => {
    if (!commentText.trim()) return

    const updatedPosts = travelPosts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1,
        }
      }
      return post
    })

    setTravelPosts(updatedPosts)
    setCommentText("")
    alert("Comment added successfully!")
  }

  const handleLikePost = (postId: number) => {
    const updatedPosts = travelPosts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1,
          liked: true,
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
          rating: 4.9,
          fullItinerary: {
            days: [
              {
                day: 1,
                title: "Tokyo Arrival & Orientation",
                activities: [
                  "Airport pickup and transfer to hotel in Shinjuku",
                  "Evening walk through Shinjuku's neon districts",
                  "Welcome dinner at local izakaya",
                ],
              },
              {
                day: 2,
                title: "Tokyo Food & Culture",
                activities: [
                  "Early morning visit to Tsukiji Outer Market",
                  "Sushi making workshop",
                  "Afternoon visit to Meiji Shrine",
                ],
              },
              {
                day: 3,
                title: "Anime & Pop Culture Day",
                activities: [
                  "Morning visit to Ghibli Museum",
                  "Explore Akihabara Electric Town",
                  "Maid cafe experience",
                ],
              },
            ],
          },
        },
        {
          planner: "Michael Chen",
          title: "Japan Anime & Food Tour",
          highlights: ["Akihabara Electric Town", "Izakaya Hopping", "TeamLab Borderless"],
          budget: "$1,380",
          rating: 4.7,
          fullItinerary: {
            days: [
              {
                day: 1,
                title: "Tokyo Arrival & Anime Districts",
                activities: [
                  "Check-in at anime-themed hotel in Ikebukuro",
                  "Visit Sunshine City Pokemon Center",
                  "Dinner at themed restaurant",
                ],
              },
              {
                day: 2,
                title: "Otaku Culture Immersion",
                activities: [
                  "Full day in Akihabara with private guide",
                  "Anime merchandise shopping",
                  "Maid cafe lunch experience",
                ],
              },
              {
                day: 3,
                title: "Modern Art & Technology",
                activities: [
                  "TeamLab Borderless digital art museum",
                  "Odaiba entertainment district",
                  "Tokyo skyline views from Mori Tower",
                ],
              },
            ],
          },
        },
        {
          planner: "Sophia Rodriguez",
          title: "Cultural Japan Experience",
          highlights: ["Tea Ceremony", "Mt. Fuji Day Trip", "Nara Deer Park"],
          budget: "$1,520",
          rating: 4.8,
          fullItinerary: {
            days: [
              {
                day: 1,
                title: "Tokyo Traditional Culture",
                activities: [
                  "Morning visit to Asakusa & Senso-ji Temple",
                  "Traditional tea ceremony experience",
                  "Japanese calligraphy class",
                ],
              },
              {
                day: 2,
                title: "Mt. Fuji Adventure",
                activities: ["Full day trip to Mt. Fuji area", "Lake Kawaguchi scenic spots", "Hot spring experience"],
              },
              {
                day: 3,
                title: "Kyoto & Nara Cultural Tour",
                activities: [
                  "Bullet train to Kyoto",
                  "Fushimi Inari shrine visit",
                  "Afternoon with Nara's friendly deer",
                ],
              },
            ],
          },
        },
      ],
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
          rating: 4.9,
          fullItinerary: {
            days: [
              {
                day: 1,
                title: "Rome Arrival & Ancient History",
                activities: [
                  "Private airport transfer to luxury hotel near Spanish Steps",
                  "Evening walking tour of illuminated Rome",
                  "Romantic dinner in Trastevere",
                ],
              },
              {
                day: 2,
                title: "Vatican & Roman Romance",
                activities: [
                  "Early access Vatican Museums & Sistine Chapel tour",
                  "Lunch at rooftop restaurant with city views",
                  "Sunset Colosseum and Forum private tour",
                ],
              },
              {
                day: 3,
                title: "Florence Art & Culture",
                activities: [
                  "First class train to Florence",
                  "Skip-the-line Uffizi Gallery tour",
                  "Evening cooking class with local chef",
                ],
              },
            ],
          },
        },
        {
          planner: "David Kim",
          title: "Art & History Tour of Italy",
          highlights: ["Skip-the-line Uffizi", "Hidden Rome Tour", "Venice Mask Workshop"],
          budget: "$2,300",
          rating: 4.6,
          fullItinerary: {
            days: [
              {
                day: 1,
                title: "Rome's Hidden Treasures",
                activities: [
                  "Off-the-beaten-path Rome walking tour",
                  "Secret passages of Castel Sant'Angelo",
                  "Dinner at historic restaurant",
                ],
              },
              {
                day: 2,
                title: "Florence Renaissance Immersion",
                activities: [
                  "Early morning Duomo climb",
                  "Extended Uffizi Gallery art tour with expert",
                  "Artisan workshop visit in Oltrarno district",
                ],
              },
              {
                day: 3,
                title: "Venice Art & Crafts",
                activities: [
                  "Traditional Venetian mask-making workshop",
                  "Private art collection visits",
                  "Exclusive after-hours Doge's Palace tour",
                ],
              },
            ],
          },
        },
      ],
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
          rating: 4.8,
          fullItinerary: {
            days: [
              {
                day: 1,
                title: "Bangkok Arrival & Nightlife",
                activities: [
                  "Check in at trendy hostel in Bangkok",
                  "Street food tour in Chinatown",
                  "Khao San Road party experience",
                ],
              },
              {
                day: 2,
                title: "Island Paradise: Koh Phangan",
                activities: [
                  "Flight to Koh Samui and boat to Koh Phangan",
                  "Beach relaxation and snorkeling",
                  "Legendary Full Moon Party (or Half Moon if dates don't align)",
                ],
              },
              {
                day: 3,
                title: "Hidden Gems of South Thailand",
                activities: [
                  "Exclusive beach camping experience",
                  "Local fishing village visit",
                  "Sunset BBQ with fresh seafood",
                ],
              },
            ],
          },
        },
        {
          planner: "Michael Chen",
          title: "Authentic Thailand Experience",
          highlights: ["Cooking Class", "Hidden Waterfalls", "Local Homestay"],
          budget: "$1,600",
          rating: 4.7,
          fullItinerary: {
            days: [
              {
                day: 1,
                title: "Chiang Mai Cultural Immersion",
                activities: [
                  "Local homestay in traditional northern Thai house",
                  "Thai cooking class with market visit",
                  "Evening street food crawl and night market",
                ],
              },
              {
                day: 2,
                title: "Nature & Adventure Day",
                activities: [
                  "Hidden waterfall trek with local guide",
                  "Natural hot springs visit",
                  "Traditional Khan Toke dinner",
                ],
              },
              {
                day: 3,
                title: "Island Life: Koh Lanta",
                activities: [
                  "Transfer to quieter Koh Lanta",
                  "Kayaking in mangrove forests",
                  "Sunset beach BBQ with local musicians",
                ],
              },
            ],
          },
        },
      ],
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
          rating: 4.9,
          fullItinerary: {
            days: [
              {
                day: 1,
                title: "Reykjavik & Blue Lagoon",
                activities: [
                  "Airport pickup in 4x4 vehicle",
                  "Blue Lagoon VIP entrance with private changing room",
                  "Northern Lights evening hunt with photographer",
                ],
              },
              {
                day: 2,
                title: "South Coast Wonders",
                activities: [
                  "Seljalandsfoss and Skógafoss waterfalls",
                  "Black beach at Reynisfjara",
                  "Ice cave exploration with specialist equipment",
                ],
              },
              {
                day: 3,
                title: "Golden Circle & Geothermal Experience",
                activities: [
                  "Þingvellir National Park tectonic plates",
                  "Geysir and Gullfoss waterfall",
                  "Secret Lagoon hot spring with floating experience",
                ],
              },
            ],
          },
        },
        {
          planner: "Michael Chen",
          title: "Golden Circle & South Coast",
          highlights: ["Glacier Hike", "Secret Lagoon", "Bubble Hotel Stay"],
          budget: "$3,100",
          rating: 4.8,
          fullItinerary: {
            days: [
              {
                day: 1,
                title: "Golden Circle Highlights",
                activities: [
                  "Þingvellir National Park with hidden waterfall spot",
                  "Extended visit to Geysir geothermal area",
                  "Overnight in transparent bubble hotel for Northern Lights",
                ],
              },
              {
                day: 2,
                title: "Glacier Adventure",
                activities: [
                  "Full day glacier hike expedition with all equipment",
                  "Ice climbing intro for beginners",
                  "Hot chocolate by glacier lagoon",
                ],
              },
              {
                day: 3,
                title: "Hot Spring Hunt",
                activities: [
                  "Secret Lagoon morning relaxation",
                  "Off-road adventure to hidden hot springs",
                  "Traditional Icelandic lamb dinner",
                ],
              },
            ],
          },
        },
        {
          planner: "David Kim",
          title: "Iceland Adventure Tour",
          highlights: ["Snowmobile Tour", "Hot Spring Hopping", "4x4 Winter Driving"],
          budget: "$2,850",
          rating: 4.7,
          fullItinerary: {
            days: [
              {
                day: 1,
                title: "4x4 Driving & Winter Skills",
                activities: [
                  "Winter driving course with experienced instructor",
                  "Snowmobile tour on glacier",
                  "Evening at local hot pot with Icelandic beer tasting",
                ],
              },
              {
                day: 2,
                title: "South Coast Adventure",
                activities: [
                  "Self-drive with prepared GPS coordinates",
                  "Hidden waterfalls accessible only by 4x4",
                  "Northern Lights photography workshop",
                ],
              },
              {
                day: 3,
                title: "Hot Spring Road Trip",
                activities: [
                  "Guided tour of multiple natural hot springs",
                  "Traditional Icelandic farm visit",
                  "Farewell dinner in revolving restaurant",
                ],
              },
            ],
          },
        },
      ],
    },
  ])

  const topPlanners = [
    {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.9,
      plans: 124,
      specialties: ["Europe", "Luxury", "Cultural"],
      bio: "Professional travel planner with 8 years of experience. Specializes in custom European itineraries with a focus on cultural immersion and unique experiences.",
    },
    {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      plans: 98,
      specialties: ["Asia", "Budget", "Food"],
      bio: "Food and travel blogger turned planner. Expert in Asian destinations with insider knowledge of the best local eateries and hidden gems.",
    },
    {
      name: "Sophia Rodriguez",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.7,
      plans: 87,
      specialties: ["Adventure", "Beaches", "Solo Travel"],
      bio: "Adventure travel specialist with experience in over 50 countries. Creates unique, off-the-beaten-path itineraries for thrill-seekers.",
    },
    {
      name: "David Kim",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.6,
      plans: 76,
      specialties: ["Family", "Nature", "Photography"],
      bio: "Family travel expert and professional photographer. Designs itineraries that balance kid-friendly activities with breathtaking photo opportunities.",
    },
    {
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      plans: 92,
      specialties: ["Honeymoon", "Islands", "Wellness"],
      bio: "Specializes in romantic getaways and wellness retreats. Known for creating personalized experiences that combine luxury and authentic local culture.",
    },
    {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.5,
      plans: 65,
      specialties: ["Road Trips", "National Parks", "Hiking"],
      bio: "Outdoor enthusiast and former park ranger. Expert in planning detailed road trips and hiking adventures across national parks.",
    },
  ]

  const activePost = travelPosts.find((post) => post.id === activePostId)

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
                                onClick={() =>
                                  setSelectedInterests(selectedInterests.filter((_, index) => index !== i))
                                }
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

                <Dialog open={tokenConfirmDialogOpen} onOpenChange={setTokenConfirmDialogOpen}>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Confirm Posting</DialogTitle>
                      <DialogDescription>
                        Posting your travel need requires 5 $PLAN tokens. You currently have 100 $PLAN tokens.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <div className="flex items-center justify-between rounded-lg bg-[#e0e5ce] p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#415444]">
                            <Gift className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-[#415444]">5 $PLAN tokens</p>
                            <p className="text-sm text-[#415444]/70">Will be deducted from your wallet</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 rounded-lg bg-white px-3 text-xs font-medium text-[#415444]"
                        >
                          View Balance
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4">
                      <Button variant="outline" onClick={() => setTokenConfirmDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-[#415444] hover:bg-[#415444]/90" onClick={handleConfirmPostSubmission}>
                        Confirm & Post
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Travel Posts List */}
                {travelPosts.map((post) => (
                  <Card key={post.id} className="mb-6 border-[#e0e5ce]">
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
                                <Badge
                                  variant="outline"
                                  className="rounded-full border-[#415444] px-2 py-0 text-xs text-[#415444]"
                                >
                                  <Check className="mr-1 h-3 w-3" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{post.timePosted}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleSharePost(post.id)}>
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
                        <div className="flex items-center gap-1.5 text-[#415444]">
                          {verifiedUsers[post.id] > 0 ? (
                            <>
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e0e5ce]">
                                <Check className="h-3.5 w-3.5" />
                              </div>
                              <span className="text-sm font-medium">
                                {verifiedUsers[post.id]} {verifiedUsers[post.id] === 1 ? "person" : "people"} verified
                              </span>
                            </>
                          ) : (
                            <>
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-500">No verifications yet</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#415444] text-[#415444] hover:bg-[#415444] hover:text-white"
                        onClick={() => handleViewPlans(post.id)}
                      >
                        View {post.responses} Plans
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Rewards Card */}
                <Card className="border-[#e0e5ce]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-[#415444]">Earn $PLAN Tokens</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-between rounded-lg bg-[#f8f9fa] p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0e5ce]">
                            <Gift className="h-4 w-4 text-[#415444]" />
                          </div>
                          <span className="text-sm">Create a travel plan</span>
                        </div>
                        <Badge className="bg-[#e0e5ce] text-[#415444]">+10 $PLAN</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-[#f8f9fa] p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0e5ce]">
                            <Heart className="h-4 w-4 text-[#415444]" />
                          </div>
                          <span className="text-sm">Get likes on your plan</span>
                        </div>
                        <Badge className="bg-[#e0e5ce] text-[#415444]">+2 $PLAN</Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-[#f8f9fa] p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0e5ce]">
                            <User className="h-4 w-4 text-[#415444]" />
                          </div>
                          <span className="text-sm">Refer a friend</span>
                        </div>
                        <Badge className="bg-[#e0e5ce] text-[#415444]">+25 $PLAN</Badge>
                      </div>
                    </div>
                    <Button
                      className={`w-full gap-2 ${
                        rewardsClaimed ? "bg-gray-300" : "bg-[#415444] hover:bg-[#415444]/90"
                      }`}
                      disabled={rewardsClaimed}
                      onClick={handleClaimRewards}
                    >
                      {rewardsClaimed ? "Rewards Claimed" : "Claim 25 $PLAN Tokens"}
                      {rewardsClaimed && <Check className="h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>

                {/* Top Planners Card */}
                <Card className="border-[#e0e5ce]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-[#415444]">Top Planners</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      {topPlanners.slice(0, 3).map((planner, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={planner.avatar || "/placeholder.svg"} alt={planner.name} />
                              <AvatarFallback>{planner.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{planner.name}</p>
                              <div className="flex items-center gap-1 text-amber-500">
                                <span className="text-xs">{planner.rating}</span>
                                <span className="text-xs">★</span>
                                <span className="text-xs text-gray-400">• {planner.plans} plans</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 text-xs text-[#415444]">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="mt-4 w-full text-[#415444]"
                      onClick={() => setTopPlannersDialogOpen(true)}
                    >
                      View All Planners
                    </Button>
                  </CardContent>
                </Card>

                {/* How It Works Card */}
                <Card className="border-[#e0e5ce]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-[#415444]">How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-5">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e0e5ce] text-[#415444]">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Post Your Travel Need</p>
                          <p className="text-sm text-gray-500">Share details about your upcoming trip</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e0e5ce] text-[#415444]">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Receive Custom Plans</p>
                          <p className="text-sm text-gray-500">Get personalized itineraries from verified planners</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e0e5ce] text-[#415444]">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Choose Your Favorite</p>
                          <p className="text-sm text-gray-500">Select the plan that best fits your travel style</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e0e5ce] text-[#415444]">
                          4
                        </div>
                        <div>
                          <p className="font-medium">Travel & Earn Tokens</p>
                          <p className="text-sm text-gray-500">Enjoy your trip and earn $PLAN tokens by contributing</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Travel Need</DialogTitle>
            <DialogDescription>Share this travel need with friends or on social media.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                    stroke="#1D1D1D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Share on Facebook
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 4.01C21 4.5 20.02 4.69 19 5C17.879 3.735 16.119 3.665 14.38 4.53C12.64 5.395 11.759 7.007 12.02 9H12C7.9 9 5.2 6.8 3 3C1.3 6 2.4 9.1 5 11C4.21 11.02 3.42 10.8 2.69 10.4C2.72 12.96 4.18 15.05 6.58 15.58C5.95 15.77 5.31 15.83 4.69 15.77C5.26 17.64 6.99 18.94 9 19C7.07 20.43 4.97 21.17 3 21C5.07 22.14 7.35 22.73 9.69 22.73C16.69 22.73 21.21 16.78 20.96 9.73C21.99 9.09 22.88 8.25 23.5 7.23C22.61 7.59 21.66 7.79 20.7 7.83C21.73 7.23 22.53 6.26 22.9 5.09C21.93 5.68 20.88 6.08 19.8 6.3C18.83 5.24 17.72 4.74 16.32 4.74C14.98 4.74 13.86 5.16 12.97 6C12.08 6.84 11.64 7.86 11.64 9.06C11.64 9.46 11.69 9.84 11.79 10.2C8.5 10.03 5.48 8.33 2.73 5.09C2.25 5.92 2.01 6.77 2.01 7.66C2.01 8.5 2.21 9.27 2.61 9.97C3.01 10.67 3.56 11.23 4.26 11.63C3.55 11.6 2.85 11.42 2.17 11.09V11.14C2.17 12.2 2.5 13.13 3.16 13.93C3.82 14.73 4.66 15.25 5.66 15.47C5.21 15.58 4.76 15.63 4.31 15.63C4.01 15.63 3.7 15.6 3.37 15.54C3.69 16.39 4.23 17.07 4.98 17.59C5.73 18.11 6.56 18.38 7.47 18.41C5.81 19.72 3.95 20.38 1.89 20.38C1.5 20.38 1.12 20.36 0.75 20.32C2.81 21.7 5.08 22.38 7.56 22.38C9.39 22.38 11.1 22.07 12.67 21.45C14.24 20.83 15.59 20.01 16.7 18.99C17.82 17.97 18.73 16.81 19.44 15.5C20.15 14.19 20.64 12.85 20.92 11.48C21.2 10.11 21.34 8.77 21.34 7.46C21.34 7.19 21.33 7 21.32 6.89C22.31 6.21 23.15 5.42 23.84 4.5L22 4.01Z"
                    stroke="#1D1D1D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Share on Twitter
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22 11.7424C22 17.1231 17.5108 21.4846 12 21.4846C10.9243 21.4846 9.88773 21.3332 8.91549 21.0509C7.21584 21.9508 5.27768 22.4285 3.27446 22.4998C3.06619 22.5091 2.89487 22.3337 2.92323 22.1274C3.07673 20.8952 2.97588 19.1494 2.45549 17.5157C1.37524 15.4338 0.770935 13.0602 0.770935 11.0137C0.770935 5.97178 5.3134 1.76923 11 1.76923"
                    stroke="#1D1D1D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.9792 11.7143C10.9792 14.5143 13.2537 16.7857 16.0569 16.7857C17.4593 16.7857 18.732 16.2402 19.6569 15.3568C20.566 14.4891 21.1345 13.2791 21.1345 11.9429C21.1345 9.14286 18.86 6.87143 16.0569 6.87143C13.2537 6.87143 10.9792 9.14286 10.9792 11.7143Z"
                    stroke="#1D1D1D"
                    strokeWidth="1.5"
                  />
                </svg>
                Send as Message
              </Button>
              <div className="flex flex-col gap-2">
                <Label htmlFor="share-link">Copy Link</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="share-link"
                    value={`https://travelplans.io/post/${activePostId}`}
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="outline" className="shrink-0">
                    Copy
                  </Button>
                </div>
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
            <DialogDescription>Compare custom itineraries created by verified travel planners.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <Tabs defaultValue="plans" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="plans">Travel Plans ({activePost?.plans.length || 0})</TabsTrigger>
                <TabsTrigger value="comments">Verify Plan</TabsTrigger>
              </TabsList>
              <TabsContent value="plans" className="mt-4 space-y-4">
                {activePost?.plans.map((plan, i) => (
                  <Card key={i} className="border-[#e0e5ce]">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{plan.planner.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{plan.planner}</h3>
                            <div className="flex items-center gap-1 text-amber-500">
                              <span className="text-xs">{plan.rating}</span>
                              <span className="text-xs">★</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-[#415444] text-[#415444]">
                          {plan.budget}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <h4 className="mb-2 text-lg font-medium">{plan.title}</h4>
                      <div className="mb-4 space-y-1">
                        {plan.highlights.map((highlight, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm">
                            <Check className="h-4 w-4 text-[#415444]" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        className="w-full bg-[#415444] hover:bg-[#415444]/90"
                        onClick={() => handleViewFullItinerary(plan)}
                      >
                        View Full Itinerary
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="comments" className="mt-4">
                <div className="space-y-4">
                  {userVoted[activePostId || 0] !== undefined ? (
                    <Card className="border-[#e0e5ce] bg-[#f8f9f4]">
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        {userVoted[activePostId || 0] ? (
                          <>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.5 }}
                              className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#415444]"
                            >
                              <Check className="h-10 w-10 text-white" />
                            </motion.div>
                            <p className="text-center text-lg font-medium text-[#415444]">
                              Thank you for verifying this plan!
                            </p>
                            <p className="mt-2 text-center text-sm text-gray-500">
                              Your feedback helps improve our community recommendations.
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0f0f0]">
                              <X className="h-10 w-10 text-gray-400" />
                            </div>
                            <p className="text-center text-lg font-medium text-gray-700">
                              We'll work on improving this plan.
                            </p>
                            <p className="mt-2 text-center text-sm text-gray-500">Thank you for your feedback.</p>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-[#e0e5ce]">
                      <CardContent className="p-6">
                        <h3 className="mb-4 text-center text-lg font-medium">Are you satisfied with this plan?</h3>
                        <div className="flex justify-center gap-4">
                          <Button
                            onClick={() => handleVote(activePostId || 0, true)}
                            className="bg-[#415444] px-6 hover:bg-[#415444]/90"
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Yes
                          </Button>
                          <Button
                            onClick={() => handleVote(activePostId || 0, false)}
                            variant="outline"
                            className="border-[#415444] px-6 text-[#415444] hover:bg-[#415444]/10"
                          >
                            <X className="mr-2 h-4 w-4" />
                            No
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Itinerary Dialog */}
      <Dialog open={fullItineraryDialogOpen} onOpenChange={setFullItineraryDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{activeItinerary?.title}</DialogTitle>
            <DialogDescription className="flex items-center justify-between">
              <span>Created by {activeItinerary?.planner}</span>
              <Badge variant="outline" className="border-[#415444] text-[#415444]">
                {activeItinerary?.budget}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-6">
              {activeItinerary?.fullItinerary?.days.map((day: any, i: number) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-[#e0e5ce] text-[#415444]">Day {day.day}</Badge>
                    <h4 className="font-medium">{day.title}</h4>
                  </div>
                  <ul className="ml-6 list-disc space-y-1 text-gray-600">
                    {day.activities.map((activity: string, j: number) => (
                      <li key={j}>{activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline">Save Itinerary</Button>
            <Button
              className="bg-[#415444] hover:bg-[#415444]/90"
              onClick={() => handleConnectWithPlanner(activeItinerary?.planner)}
            >
              Connect with Planner
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Top Planners Dialog */}
      <Dialog open={topPlannersDialogOpen} onOpenChange={setTopPlannersDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Top Travel Planners</DialogTitle>
            <DialogDescription>Connect with verified travel planners to create custom itineraries.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {topPlanners.map((planner, i) => (
                <Card key={i} className="border-[#e0e5ce]">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={planner.avatar || "/placeholder.svg"} alt={planner.name} />
                        <AvatarFallback>{planner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{planner.name}</h3>
                          <div className="flex items-center gap-1 text-amber-500">
                            <span>{planner.rating}</span>
                            <span>★</span>
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{planner.plans} plans created</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {planner.specialties.map((specialty, j) => (
                            <Badge key={j} variant="outline" className="border-[#415444]/30 text-xs text-[#415444]">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-gray-600">{planner.bio}</p>
                        <Button className="mt-3 w-full bg-[#415444] hover:bg-[#415444]/90">Connect</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {/* Connect With Planner Dialog */}
      <Dialog open={connectPlannerDialogOpen} onOpenChange={setConnectPlannerDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect with {activePlanner}</DialogTitle>
            <DialogDescription>Send a message to start planning your perfect trip.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Hi! I'm interested in your travel plan. Can you help customize it for my needs?"
                rows={4}
                value={plannerMessageText}
                onChange={(e) => setPlannerMessageText(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="share-contact" />
              <Label htmlFor="share-contact" className="text-sm">
                Share my contact information with this planner
              </Label>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setConnectPlannerDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#415444] hover:bg-[#415444]/90" onClick={handleSendPlannerMessage}>
              Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
