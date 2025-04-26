"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Settings, User, Wallet, Bell, Moon, Sun, Shield, Globe, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { VerticalNavbar } from "@/components/vertical-navbar"
import { CustomCursor } from "@/components/custom-cursor"
import { Footer } from "@/components/Footer"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [walletConnected, setWalletConnected] = useState(true)
  const [walletAddress, setWalletAddress] = useState("0x1234...5678")
  const [theme, setTheme] = useState("light")
  const [saveSuccess, setSaveSuccess] = useState(false)

  // User profile state
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    bio: "Travel enthusiast and crypto explorer. Always looking for new adventures and experiences.",
    location: "San Francisco, CA",
    language: "English",
    profilePicUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80"
  })

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    plannerResponses: true,
    marketingEmails: false,
    priceAlerts: true,
    newFeatures: true,
    securityAlerts: true
  })

  // Privacy settings state
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showWallet: false,
    dataCollection: true,
    shareActivity: true
  })

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

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setSaveSuccess(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }, 1500)
  }

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handlePrivacyChange = (key: keyof typeof privacy, value: boolean) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleProfileChange = (key: keyof typeof profile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <>
      <CustomCursor />
      <div className="flex min-h-screen bg-[#fcfdfd]">
        {/* Vertical Navbar */}
        <VerticalNavbar />

        {/* Main Content */}
        <main className="flex-1 py-8 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[#415444] md:text-4xl">Settings</h1>
                <p className="text-gray-600 mt-2">Manage your account preferences</p>
              </div>
              <Button
                variant="outline"
                className="border-2 border-[#415444] bg-transparent text-[#415444] hover:bg-[#415444]/20"
                onClick={handleConnectWallet}
              >
                <Wallet className="mr-2 h-4 w-4" />
                {walletConnected ? `${walletAddress}` : "Connect Wallet"}
              </Button>
            </div>

            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-8 bg-[#e0e5ce]">
                <TabsTrigger value="profile" className="data-[state=active]:bg-[#415444] data-[state=active]:text-white">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="wallet" className="data-[state=active]:bg-[#415444] data-[state=active]:text-white">
                  <Wallet className="h-4 w-4 mr-2" />
                  Wallet
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-[#415444] data-[state=active]:text-white">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="data-[state=active]:bg-[#415444] data-[state=active]:text-white">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="appearance" className="data-[state=active]:bg-[#415444] data-[state=active]:text-white">
                  {theme === "light" ? (
                    <Sun className="h-4 w-4 mr-2" />
                  ) : (
                    <Moon className="h-4 w-4 mr-2" />
                  )}
                  Appearance
                </TabsTrigger>
              </TabsList>

              {/* Profile Settings */}
              <TabsContent value="profile">
                <Card className="p-6 border-0 rounded-[24px] bg-white shadow-md">
                  <form onSubmit={handleUpdateProfile}>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex flex-col items-center space-y-4">
                        <Avatar className="h-32 w-32">
                          <AvatarImage src={profile.profilePicUrl} alt="Profile" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm" className="text-sm">
                          Change Photo
                        </Button>
                      </div>
                      
                      <div className="flex-1 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name" 
                              value={profile.name} 
                              onChange={(e) => handleProfileChange("name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={profile.email} 
                              onChange={(e) => handleProfileChange("email", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input 
                              id="location" 
                              value={profile.location} 
                              onChange={(e) => handleProfileChange("location", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Input 
                              id="language" 
                              value={profile.language} 
                              onChange={(e) => handleProfileChange("language", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea 
                            id="bio" 
                            value={profile.bio} 
                            onChange={(e) => handleProfileChange("bio", e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4 mt-8">
                      {saveSuccess && (
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-green-600 self-center"
                        >
                          Changes saved successfully!
                        </motion.p>
                      )}
                      <Button 
                        type="submit" 
                        className="bg-[#415444] hover:bg-[#415444]/90 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </Card>
              </TabsContent>

              {/* Wallet Settings */}
              <TabsContent value="wallet">
                <Card className="p-6 border-0 rounded-[24px] bg-white shadow-md">
                  <h3 className="text-xl font-semibold mb-6">Connected Wallet</h3>
                  
                  <div className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                      <div className="h-32 w-32 flex items-center justify-center rounded-full bg-[#e0e5ce]">
                        <Wallet className="h-16 w-16 text-[#415444]" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="space-y-6">
                          <div>
                            <p className="text-sm text-gray-500">Current Wallet</p>
                            <p className="text-lg font-medium">{walletConnected ? walletAddress : "No wallet connected"}</p>
                          </div>
                          
                          <div className="bg-[#e0e5ce] p-4 rounded-lg">
                            <div className="flex justify-between mb-2">
                              <p className="font-medium">$PLAN Balance</p>
                              <p className="font-bold">2,450 $PLAN</p>
                            </div>
                            <div className="flex justify-between">
                              <p className="font-medium">ETH Balance</p>
                              <p className="font-bold">1.25 ETH</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-4">
                            <Button 
                              variant="default" 
                              className="bg-[#415444] hover:bg-[#415444]/90 text-white"
                              onClick={handleConnectWallet}
                            >
                              {walletConnected ? "Disconnect Wallet" : "Connect Wallet"}
                            </Button>
                            
                            {walletConnected && (
                              <Button variant="outline">
                                View on Explorer
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {walletConnected && (
                      <div className="pt-6 border-t border-gray-200">
                        <h4 className="text-lg font-medium mb-4">DAO Membership</h4>
                        <div className="bg-[#e7ddd1] p-4 rounded-lg mb-6">
                          <div className="flex justify-between mb-2">
                            <p className="font-medium">Status</p>
                            <div className="flex items-center">
                              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                              <p className="font-bold">Active</p>
                            </div>
                          </div>
                          <div className="flex justify-between mb-2">
                            <p className="font-medium">Staked Tokens</p>
                            <p className="font-bold">500 $PLAN</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="font-medium">Voting Power</p>
                            <p className="font-bold">1.2%</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-4">
                          <Button variant="outline">
                            Manage Stake
                          </Button>
                          <Button variant="outline">
                            View DAO Dashboard
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              {/* Notification Settings */}
              <TabsContent value="notifications">
                <Card className="p-6 border-0 rounded-[24px] bg-white shadow-md">
                  <h3 className="text-xl font-semibold mb-6">Notification Preferences</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive notifications via email</p>
                      </div>
                      <Switch 
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      />
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-medium mb-4">Travel Plans</h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Planner Responses</p>
                            <p className="text-sm text-gray-500">When travel planners respond to your requests</p>
                          </div>
                          <Switch 
                            checked={notifications.plannerResponses}
                            onCheckedChange={(checked) => handleNotificationChange("plannerResponses", checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Price Alerts</p>
                            <p className="text-sm text-gray-500">When prices change for your planned trips</p>
                          </div>
                          <Switch 
                            checked={notifications.priceAlerts}
                            onCheckedChange={(checked) => handleNotificationChange("priceAlerts", checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-medium mb-4">Marketing & Updates</h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Marketing Emails</p>
                            <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
                          </div>
                          <Switch 
                            checked={notifications.marketingEmails}
                            onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Features</p>
                            <p className="text-sm text-gray-500">Updates about new platform features</p>
                          </div>
                          <Switch 
                            checked={notifications.newFeatures}
                            onCheckedChange={(checked) => handleNotificationChange("newFeatures", checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Security Alerts</p>
                            <p className="text-sm text-gray-500">Important security notifications</p>
                          </div>
                          <Switch 
                            checked={notifications.securityAlerts}
                            onCheckedChange={(checked) => handleNotificationChange("securityAlerts", checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        className="bg-[#415444] hover:bg-[#415444]/90 text-white"
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Privacy Settings */}
              <TabsContent value="privacy">
                <Card className="p-6 border-0 rounded-[24px] bg-white shadow-md">
                  <h3 className="text-xl font-semibold mb-6">Privacy Settings</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Public Profile</p>
                        <p className="text-sm text-gray-500">Your profile is visible to other users</p>
                      </div>
                      <Switch 
                        checked={privacy.publicProfile}
                        onCheckedChange={(checked) => handlePrivacyChange("publicProfile", checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Wallet Address</p>
                        <p className="text-sm text-gray-500">Display your wallet address on your public profile</p>
                      </div>
                      <Switch 
                        checked={privacy.showWallet}
                        onCheckedChange={(checked) => handlePrivacyChange("showWallet", checked)}
                      />
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-medium mb-4">Data Collection</h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Usage Data</p>
                            <p className="text-sm text-gray-500">Allow us to collect usage data to improve services</p>
                          </div>
                          <Switch 
                            checked={privacy.dataCollection}
                            onCheckedChange={(checked) => handlePrivacyChange("dataCollection", checked)}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Activity Sharing</p>
                            <p className="text-sm text-gray-500">Share your activity with travel planners</p>
                          </div>
                          <Switch 
                            checked={privacy.shareActivity}
                            onCheckedChange={(checked) => handlePrivacyChange("shareActivity", checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-medium mb-4">Account Management</h4>
                      
                      <div className="space-y-4">
                        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-100">
                          Download My Data
                        </Button>
                        
                        <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-100">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        className="bg-[#415444] hover:bg-[#415444]/90 text-white"
                      >
                        Save Privacy Settings
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Appearance Settings */}
              <TabsContent value="appearance">
                <Card className="p-6 border-0 rounded-[24px] bg-white shadow-md">
                  <h3 className="text-xl font-semibold mb-6">Appearance</h3>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-medium mb-4">Theme</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card 
                          className={`p-4 cursor-pointer transition-all hover:shadow-md ${theme === 'light' ? 'ring-2 ring-[#415444]' : ''}`}
                          onClick={() => setTheme('light')}
                        >
                          <div className="h-20 bg-white border border-gray-200 rounded-md mb-2"></div>
                          <p className="text-center font-medium">Light</p>
                        </Card>
                        
                        <Card 
                          className={`p-4 cursor-pointer transition-all hover:shadow-md ${theme === 'dark' ? 'ring-2 ring-[#415444]' : ''}`}
                          onClick={() => setTheme('dark')}
                        >
                          <div className="h-20 bg-gray-800 rounded-md mb-2"></div>
                          <p className="text-center font-medium">Dark</p>
                        </Card>
                        
                        <Card 
                          className={`p-4 cursor-pointer transition-all hover:shadow-md ${theme === 'system' ? 'ring-2 ring-[#415444]' : ''}`}
                          onClick={() => setTheme('system')}
                        >
                          <div className="h-20 bg-gradient-to-r from-white to-gray-800 rounded-md mb-2"></div>
                          <p className="text-center font-medium">System</p>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-4">Language</h4>
                      
                      <div className="flex items-center space-x-2 mb-6">
                        <Globe className="h-5 w-5 text-gray-500" />
                        <p>Current Language: <span className="font-medium">English (US)</span></p>
                      </div>
                      
                      <Button variant="outline">
                        Change Language
                      </Button>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium mb-4">Font Size</h4>
                      
                      <div className="grid grid-cols-4 gap-4">
                        {["Small", "Medium", "Large", "Extra Large"].map((size, index) => (
                          <Card 
                            key={size}
                            className={`p-4 cursor-pointer transition-all hover:shadow-md ${index === 1 ? 'ring-2 ring-[#415444]' : ''}`}
                          >
                            <p className="text-center font-medium">{size}</p>
                          </Card>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        className="bg-[#415444] hover:bg-[#415444]/90 text-white"
                      >
                        Save Appearance Settings
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </main>
      </div>
      <Footer />
    </>
  )
}