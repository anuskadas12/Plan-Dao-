"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { VerticalNavbar } from "@/components/vertical-navbar"
import { CustomCursor } from "@/components/custom-cursor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Footer } from "@/components/Footer"

// Icons
import { 
  UserCircle, 
  MapPin, 
  Gift, 
  Settings, 
  LogOut, 
  Edit, 
  Wallet, 
  Trophy,
  Star,
  Globe
} from "lucide-react"

export default function UserProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [walletConnected, setWalletConnected] = useState(true)
  const [walletAddress, setWalletAddress] = useState("0x1234...5678")
  const [isEditing, setIsEditing] = useState(false)
  
  // User data - would come from API/database in production
  const [userData, setUserData] = useState({
    name: "Alex Thompson",
    username: "traveler_alex",
    email: "alex@example.com",
    bio: "Digital nomad exploring the world one country at a time. Love culture, food, and sustainability.",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    coverPhoto: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    location: "Currently in: Barcelona, Spain",
    memberSince: "January 2023",
    planTokens: 2450,
    level: "Gold Traveler",
    nextLevelProgress: 75,
    achievements: [
      { id: 1, name: "Early Adopter", description: "Joined during platform beta", icon: "🚀" },
      { id: 2, name: "Globetrotter", description: "Visited 10+ countries", icon: "🌎" },
      { id: 3, name: "Plan Creator", description: "Created a community-approved plan", icon: "📝" },
      { id: 4, name: "DAO Voter", description: "Participated in 5+ governance votes", icon: "🗳️" }
    ]
  })
  
  // Travel history data
  const [travelHistory, setTravelHistory] = useState([
    {
      id: 1,
      destination: "Tokyo, Japan",
      date: "March 2024",
      duration: "12 days",
      plannerName: "JapanExplorer",
      planCost: "1200 $PLAN",
      status: "Completed",
      rating: 5,
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      highlights: ["Robot Restaurant", "Mt. Fuji Day Trip", "Tsukiji Fish Market"],
      nftMinted: true
    },
    {
      id: 2,
      destination: "Barcelona, Spain",
      date: "Current Trip",
      duration: "14 days",
      plannerName: "SpainGuide",
      planCost: "950 $PLAN",
      status: "In Progress",
      rating: null,
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      highlights: ["Sagrada Familia", "Park Güell", "La Boqueria Market"],
      nftMinted: false
    },
    {
      id: 3,
      destination: "Bali, Indonesia",
      date: "November 2023",
      duration: "10 days",
      plannerName: "BaliDreamer",
      planCost: "800 $PLAN",
      status: "Completed",
      rating: 4,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      highlights: ["Ubud Monkey Forest", "Rice Terraces", "Uluwatu Temple"],
      nftMinted: true
    }
  ])
  
  // Rewards history
  const [rewardsHistory, setRewardsHistory] = useState([
    {
      id: 1,
      amount: "+200 $PLAN",
      type: "Earned",
      description: "Completed Tokyo trip and left review",
      date: "April, 2024"
    },
    {
      id: 2,
      amount: "+350 $PLAN",
      type: "Earned",
      description: "Early adopter bonus",
      date: "February, 2024"
    },
    {
      id: 3,
      amount: "-950 $PLAN",
      type: "Spent",
      description: "Barcelona trip plan purchase",
      date: "February, 2024"
    },
    {
      id: 4,
      amount: "+500 $PLAN",
      type: "Earned",
      description: "Created and sold custom Tokyo food tour plan",
      date: "January, 2024"
    },
    {
      id: 5,
      amount: "+100 $PLAN",
      type: "Earned",
      description: "Participated in DAO vote",
      date: "January, 2024"
    },
    {
      id: 6,
      amount: "-800 $PLAN",
      type: "Spent",
      description: "Bali trip plan purchase",
      date: "October, 2023"
    },
  ])
  
  // Handle disconnect wallet
  const handleDisconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress("")
    // In production, would handle actual wallet disconnection
  }
  
  // Handle save profile edits
  const handleSaveProfile = () => {
    setIsEditing(false)
    // In production, would save changes to database
  }

  const handleEditField = (field: keyof typeof userData, value: string) => {
    setUserData({
      ...userData,
      [field]: value
    })
  }

  return (
    <>
      <CustomCursor />
      <div className="flex min-h-screen bg-[#fcfdfd]">
        {/* Vertical Navbar */}
        <VerticalNavbar />

        {/* Main Content */}
        <main className="flex-1">
          {/* Profile Header with Cover Photo */}
          <div 
            className="relative h-64 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${userData.coverPhoto})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            
            {walletConnected ? (
              <div className="absolute right-6 top-6">
                <Button 
                  variant="outline" 
                  className="border-2 border-white bg-transparent text-white hover:bg-white/20"
                  onClick={handleDisconnectWallet}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {walletAddress}
                </Button>
              </div>
            ) : (
              <div className="absolute right-6 top-6">
                <Button 
                  variant="outline" 
                  className="border-2 border-white bg-transparent text-white hover:bg-white/20"
                >
                  Connect Wallet
                </Button>
              </div>
            )}
            
            {/* Profile picture overlay */}
            <div className="absolute -bottom-16 left-6 rounded-full border-4 border-white bg-white p-1 md:left-12">
              <img 
                src={userData.avatar} 
                alt={userData.name} 
                className="h-32 w-32 rounded-full object-cover"
              />
              {isEditing && (
                <button 
                  className="absolute bottom-2 right-2 rounded-full bg-[#415444] p-2 text-white"
                  onClick={() => alert("Upload new photo")}
                >
                  <Edit className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          {/* White space for profile info */}
          <div className="bg-white px-6 pb-6 pt-20 md:px-12">
            <div className="flex flex-col justify-between md:flex-row md:items-end">
              <div>
                {isEditing ? (
                  <input 
                    type="text" 
                    value={userData.name} 
                    onChange={(e) => handleEditField('name', e.target.value)}
                    className="text-3xl font-bold text-[#415444]"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-[#415444]">{userData.name}</h1>
                )}
                <div className="mt-1 flex flex-wrap items-center gap-4">
                  <span className="text-gray-600">@{userData.username}</span>
                  <span className="flex items-center text-gray-600">
                    <MapPin className="mr-1 h-4 w-4" />
                    {isEditing ? (
                      <input 
                        type="text" 
                        value={userData.location.replace("Currently in: ", "")}
                        onChange={(e) => handleEditField('location', `Currently in: ${e.target.value}`)}
                        className="text-sm text-gray-600"
                        placeholder="Your current location"
                      />
                    ) : (
                      userData.location
                    )}
                  </span>
                  <span className="text-gray-600">Member since {userData.memberSince}</span>
                </div>
                {isEditing ? (
                  <textarea 
                    value={userData.bio} 
                    onChange={(e) => handleEditField('bio', e.target.value)}
                    className="mt-2 w-full max-w-lg rounded border border-gray-300 p-2 text-gray-700"
                    rows={3}
                  />
                ) : (
                  <p className="mt-2 max-w-lg text-gray-700">{userData.bio}</p>
                )}
              </div>
              
              <div className="mt-4 flex gap-2 md:mt-0">
                {isEditing ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="border-2 border-[#415444] text-[#415444] hover:bg-[#415444]/10"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="bg-[#415444] text-white hover:bg-[#415444]/90"
                      onClick={handleSaveProfile}
                    >
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="bg-[#415444] text-white hover:bg-[#415444]/90"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
            
            {/* Profile stats cards */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-0 bg-[#e0e5ce] rounded-[18px] shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#415444]">
                      <Trophy className="h-5 w-5 text-white" />
                    </div>
                    <Badge className="bg-[#415444] text-white">{userData.level}</Badge>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">Progress to next level</p>
                  <Progress value={userData.nextLevelProgress} className="mt-2 h-2" />
                  <p className="mt-1 text-xs text-gray-500">{userData.nextLevelProgress}% complete to Platinum</p>
                </div>
              </Card>

              <Card className="border-0 bg-[#e0e5ce] rounded-[18px] shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#415444]">
                      <Wallet className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold">{userData.planTokens}</h3>
                  <p className="text-gray-600">$PLAN tokens</p>
                  <Button 
                    variant="link" 
                    className="mt-2 h-auto p-0 text-[#415444]" 
                    onClick={() => router.push('/earn-tokens')}
                  >
                    How to earn more
                  </Button>
                </div>
              </Card>

              <Card className="border-0 bg-[#e0e5ce] rounded-[18px] shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#415444]">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold">{travelHistory.length}</h3>
                  <p className="text-gray-600">Countries visited</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {travelHistory.map(t => t.destination.split(',')[1]?.trim()).filter(Boolean).join(', ')}
                  </p>
                </div>
              </Card>

              <Card className="border-0 bg-[#e0e5ce] rounded-[18px] shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#415444]">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold">{userData.achievements.length}</h3>
                  <p className="text-gray-600">Achievements</p>
                  <div className="mt-2 flex">
                    {userData.achievements.slice(0, 3).map((achievement) => (
                      <span key={achievement.id} className="mr-1 text-lg" title={achievement.name}>
                        {achievement.icon}
                      </span>
                    ))}
                    {userData.achievements.length > 3 && <span className="text-sm text-gray-500">+{userData.achievements.length - 3} more</span>}
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Tabs for different sections */}
          <div className="px-6 py-6 md:px-12">
            <Tabs defaultValue="travels" className="w-full">
              <TabsList className="mb-6 grid w-full grid-cols-3 bg-[#e0e5ce]">
                <TabsTrigger value="travels">Travel History</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              
              {/* Travel History Tab */}
              <TabsContent value="travels" className="space-y-6">
                <h2 className="text-2xl font-bold text-[#415444]">Your Travel History</h2>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {travelHistory.map((trip) => (
                    <motion.div
                      key={trip.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="group h-full overflow-hidden border-0 bg-white rounded-[18px] shadow-sm transition-all duration-300 hover:shadow-lg">
                        <div className="relative h-48 w-full overflow-hidden">
                          <img 
                            src={trip.image} 
                            alt={trip.destination} 
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <h3 className="text-xl font-bold text-white">{trip.destination}</h3>
                            <p className="text-gray-200">{trip.date} · {trip.duration}</p>
                          </div>
                          <Badge className={`absolute right-3 top-3 ${
                            trip.status === 'Completed' 
                              ? 'bg-green-500' 
                              : trip.status === 'In Progress' 
                                ? 'bg-blue-500' 
                                : 'bg-yellow-500'
                          }`}>
                            {trip.status}
                          </Badge>
                        </div>
                        <div className="p-6">
                          <div className="mb-4 flex justify-between">
                            <div>
                              <p className="text-gray-500">Planner</p>
                              <p className="font-medium">{trip.plannerName}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-gray-500">Cost</p>
                              <p className="font-medium">{trip.planCost}</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="mb-2 font-medium">Trip Highlights:</p>
                            <div className="flex flex-wrap gap-2">
                              {trip.highlights.map((highlight, idx) => (
                                <Badge key={idx} className="bg-[#e0e5ce] text-[#415444]">{highlight}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            {trip.rating ? (
                              <div className="flex items-center">
                                <p className="mr-1">Rating:</p>
                                <div className="flex">
                                  {[...Array(5)].map((_, idx) => (
                                    <Star 
                                      key={idx} 
                                      fill={idx < trip.rating ? "#f59e0b" : "none"} 
                                      stroke={idx < trip.rating ? "#f59e0b" : "#d1d5db"} 
                                      className="h-4 w-4" 
                                    />
                                  ))}
                                </div>
                              </div>
                            ) : trip.status === 'Completed' ? (
                              <Button size="sm" variant="outline" className="text-sm">
                                Leave Rating
                              </Button>
                            ) : (
                              <span className="text-sm text-gray-500">Rating pending</span>
                            )}
                            
                            {trip.nftMinted ? (
                              <Badge className="bg-purple-500">
                                Trip NFT Minted
                              </Badge>
                            ) : trip.status === 'Completed' ? (
                              <Button size="sm" className="bg-purple-500 text-sm hover:bg-purple-600">
                                Mint Trip NFT
                              </Button>
                            ) : null}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Rewards History Tab */}
              <TabsContent value="rewards">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#415444]">Rewards History</h2>
                    <Button className="bg-[#415444] text-white hover:bg-[#415444]/90">
                      Claim Rewards
                    </Button>
                  </div>
                  
                  <Card className="border-0 overflow-hidden rounded-[18px] shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-[#e0e5ce]">
                          <tr>
                            <th className="p-4 text-left font-medium text-[#415444]">Date</th>
                            <th className="p-4 text-left font-medium text-[#415444]">Description</th>
                            <th className="p-4 text-left font-medium text-[#415444]">Type</th>
                            <th className="p-4 text-right font-medium text-[#415444]">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rewardsHistory.map((reward) => (
                            <tr key={reward.id} className="border-t border-gray-100 hover:bg-gray-50">
                              <td className="p-4">{reward.date}</td>
                              <td className="p-4">{reward.description}</td>
                              <td className="p-4">
                                <Badge className={`${
                                  reward.type === 'Earned' ? 'bg-green-500' : 'bg-blue-500'
                                }`}>
                                  {reward.type}
                                </Badge>
                              </td>
                              <td className={`p-4 text-right font-medium ${
                                reward.amount.startsWith('+') ? 'text-green-600' : 'text-blue-600'
                              }`}>
                                {reward.amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-gray-50">
                          <tr>
                            <td colSpan={3} className="p-4 text-right font-medium">Total Balance:</td>
                            <td className="p-4 text-right font-bold text-[#415444]">{userData.planTokens} $PLAN</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </Card>
                  
                  <Card className="border-0 bg-[#e0e5ce] p-6 rounded-[18px] shadow-sm">
                    <h3 className="text-xl font-semibold text-[#415444]">Ways to Earn $PLAN Tokens</h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        { title: "Complete Trips", description: "Earn tokens after completing travels", icon: "🌍" },
                        { title: "Write Reviews", description: "Review trips and planners", icon: "⭐" },
                        { title: "Create Plans", description: "Create and sell your own travel plans", icon: "✍️" },
                        { title: "DAO Participation", description: "Vote on proposals and governance", icon: "🗳️" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#415444] text-xl text-white">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Achievements Tab */}
              <TabsContent value="achievements">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#415444]">Your Achievements</h2>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {userData.achievements.map((achievement) => (
                      <Card key={achievement.id} className="border-0 overflow-hidden rounded-[18px] shadow-sm">
                        <div className="bg-[#e0e5ce] p-6">
                          <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#415444] text-3xl text-white">
                              {achievement.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-semibold">{achievement.name}</h3>
                              <p className="text-gray-600">{achievement.description}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    {/* Locked achievements */}
                    {[
                      { id: 5, name: "Super Reviewer", description: "Leave 10+ detailed reviews", icon: "🌟" },
                      { id: 6, name: "NFT Collector", description: "Mint 5 trip NFTs", icon: "🖼️" },
                      { id: 7, name: "Continent Hopper", description: "Visit 3 different continents", icon: "✈️" },
                      { id: 8, name: "Foodie Explorer", description: "Complete 3 food-focused trips", icon: "🍱" },
                    ].map((achievement) => (
                      <Card key={achievement.id} className="border-0 overflow-hidden rounded-[18px] bg-gray-100/80 shadow-sm opacity-70">
                        <div className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-300 text-3xl text-white">
                              {achievement.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-xl font-semibold">{achievement.name}</h3>
                                <Badge variant="outline" className="ml-2 border-gray-400 text-gray-500">
                                  Locked
                                </Badge>
                              </div>
                              <p className="text-gray-500">{achievement.description}</p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <Footer />
        </main>
      </div>
    </>
  )
}