"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Search,
  UserPlus,
  Send,
  User,
  Check,
  X,
  Bell,
  Users,
  Lightbulb,
  PanelRightOpen,
  CreditCard,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { VerticalNavbar } from "@/components/vertical-navbar"
import { CustomCursor } from "@/components/custom-cursor"
import { LoadingScreen } from "@/components/loading-screen"
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"
import { useWriteContract } from "wagmi"
import propAbi from "@/contracts/abi.json"

export default function MessagesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  interface Contact {
    id: number
    name: string
    avatar: string
    lastMessage: string
    lastMessageTime: string
    unread: number
    online: boolean
  }

  const [currentChat, setCurrentChat] = useState<Contact | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [activeTab, setActiveTab] = useState("messages")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showTravelPlan, setShowTravelPlan] = useState(false)





  const { address ,isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected
  const { chainId } = useAppKitNetwork() // to get chainid
  const { writeContract, isSuccess } = useWriteContract() // to in




  // Mock data
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      lastMessage: "Hey, any recommendations for Japan?",
      lastMessageTime: "10:25 AM",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Sam Mendez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      lastMessage: "Thanks for the itinerary!",
      lastMessageTime: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      name: "Taylor Kim",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      lastMessage: "Looking forward to the trip next month",
      lastMessageTime: "Wed",
      unread: 0,
      online: true,
    },
  ])

  const [friendRequests, setFriendRequests] = useState([
    {
      id: 101,
      name: "Jordan Lee",
      avatar:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      mutualFriends: 3,
    },
    {
      id: 102,
      name: "Casey Morgan",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      mutualFriends: 1,
    },
  ])

  const [peopleSuggestions, setPeopleSuggestions] = useState([
    {
      id: 201,
      name: "Riley Patel",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      mutualFriends: 5,
      bio: "Travel planner specializing in Southeast Asia",
    },
    {
      id: 202,
      name: "Quinn Zhang",
      avatar:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      mutualFriends: 2,
      bio: "Food tour expert in Tokyo",
    },
    {
      id: 203,
      name: "Jamie Wilson",
      avatar:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      mutualFriends: 4,
      bio: "Adventure travel specialist",
    },
  ])

  const [travelPlans, setTravelPlans] = useState([
    {
      id: 1,
      title: "Japan Trip",
      startDate: "July 15, 2025",
      endDate: "July 25, 2025",
      totalCost: 2850,
      paidAmount: 1500,
      remainingAmount: 1350,
      dueDate: "June 1, 2025",
      locations: ["Tokyo", "Kyoto", "Osaka"],
      payments: [
        { date: "Jan 15, 2025", amount: 500, status: "Paid" },
        { date: "Mar 10, 2025", amount: 1000, status: "Paid" },
        { date: "Jun 1, 2025", amount: 1350, status: "Pending" },
      ],
    },
    {
      id: 2,
      title: "Barcelona Weekend",
      startDate: "August 5, 2025",
      endDate: "August 8, 2025",
      totalCost: 1200,
      paidAmount: 600,
      remainingAmount: 600,
      dueDate: "July 1, 2025",
      locations: ["Barcelona"],
      payments: [
        { date: "Apr 20, 2025", amount: 600, status: "Paid" },
        { date: "Jul 1, 2025", amount: 600, status: "Pending" },
      ],
    },
  ])

  interface Message {
    id: number
    sender: string
    text: string
    time: string
  }

  interface Conversations {
    [key: string]: Message[]
  }

  const [conversations, setConversations] = useState<Conversations>({
    "1": [
      { id: 1, sender: "them", text: "Hi there! I'm planning a trip to Japan in July.", time: "10:10 AM" },
      { id: 2, sender: "me", text: "That sounds amazing! Japan is beautiful in July.", time: "10:15 AM" },
      { id: 3, sender: "them", text: "Do you have any recommendations for places to visit?", time: "10:18 AM" },
      {
        id: 4,
        sender: "me",
        text: "Definitely check out Tokyo, Kyoto, and if you have time, Osaka! I can help you plan an itinerary.",
        time: "10:20 AM",
      },
      { id: 5, sender: "them", text: "Hey, any recommendations for Japan?", time: "10:25 AM" },
    ],
    "2": [
      { id: 1, sender: "me", text: "Here's the itinerary for your trip to Barcelona!", time: "Yesterday" },
      {
        id: 2,
        sender: "them",
        text: "This looks perfect! Thanks for putting this together so quickly.",
        time: "Yesterday",
      },
      { id: 3, sender: "them", text: "Thanks for the itinerary!", time: "Yesterday" },
    ],
    "3": [
      { id: 1, sender: "them", text: "Hi! I'm getting ready for our Greece trip next month.", time: "Wed" },
      { id: 2, sender: "me", text: "That's great! Have you started packing yet?", time: "Wed" },
      {
        id: 3,
        sender: "them",
        text: "Not yet, but I'm making a list. Looking forward to the trip next month",
        time: "Wed",
      },
    ],
  })

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    // Show travel plan panel when specific contacts are selected
    if (currentChat) {
      // Show travel plan for Alex Johnson (Japan trip) or Sam Mendez (Barcelona)
      setShowTravelPlan(currentChat.id === 1 || currentChat.id === 2)
    } else {
      setShowTravelPlan(false)
    }
  }, [currentChat])

  const handleSendMessage = () => {
    if (!messageInput.trim() || !currentChat) return

    const newMessage = {
      id: conversations[currentChat.id].length + 1,
      sender: "me",
      text: messageInput,
      time: "Just now",
    }

    setConversations((prev) => ({
      ...prev,
      [currentChat.id]: [...prev[currentChat.id], newMessage],
    }))

    // Update last message in contacts
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === currentChat.id
          ? { ...contact, lastMessage: messageInput, lastMessageTime: "Just now", unread: 0 }
          : contact,
      ),
    )

    setMessageInput("")
    setShowSuggestions(false)
  }

  const acceptFriendRequest = (id: number) => {
    const request = friendRequests.find((req) => req.id === id)
    if (!request) return

    setFriendRequests((prev) => prev.filter((req) => req.id !== id))

    // Add to contacts
    const newContact = {
      id: request.id,
      name: request.name,
      avatar: request.avatar,
      lastMessage: "",
      lastMessageTime: "New contact",
      unread: 0,
      online: Math.random() > 0.5, // Random online status for demo
    }

    setContacts((prev) => [...prev, newContact])
    setConversations((prev) => ({
      ...prev,
      [request.id]: [],
    }))
  }

  const rejectFriendRequest = (id: number) => {
    setFriendRequests((prev) => prev.filter((req) => req.id !== id))
  }

  const sendFriendRequest = (id: number) => {
    setPeopleSuggestions((prev) => prev.filter((suggestion) => suggestion.id !== id))
    // In a real app, this would send the request to the backend
  }

  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const generateSuggestions = () => {
    if (!currentChat) return

    setLoadingSuggestions(true)

    // Simulate API call to generate suggestions
    setTimeout(() => {
      const lastMessage = conversations[currentChat.id][conversations[currentChat.id].length - 1]

      let generatedSuggestions = []

      // Generate contextual suggestions based on the last message
      if (lastMessage.text.includes("Japan")) {
        generatedSuggestions = [
          "I can recommend some great places in Tokyo if you're interested!",
          "Have you considered visiting during cherry blossom season?",
          "Would you like me to share a sample itinerary for Japan?",
        ]
      } else if (lastMessage.text.includes("itinerary")) {
        generatedSuggestions = [
          "Is there anything specific you'd like to modify in the itinerary?",
          "Let me know if you need any restaurant recommendations to add to the plan.",
          "Would you like me to include some local hidden gems in the itinerary?",
        ]
      } else if (lastMessage.text.includes("trip next month")) {
        generatedSuggestions = [
          "Are you looking for any last-minute recommendations before your trip?",
          "Do you need help with currency exchange information?",
          "Would you like me to check the weather forecast for your travel dates?",
        ]
      } else {
        generatedSuggestions = [
          "What type of travel experiences are you most interested in?",
          "Would you like recommendations for your next destination?",
          "How can I help with your travel plans today?",
        ]
      }

      setSuggestions(generatedSuggestions)
      setLoadingSuggestions(false)
      setShowSuggestions(true)
    }, 800)
  }

  const useSuggestion = (suggestion: string) => {
    setMessageInput(suggestion)
    setShowSuggestions(false)
  }

  const getCurrentTravelPlan = () => {
    if (!currentChat) return null
    return currentChat.id === 1 ? travelPlans[0] : currentChat.id === 2 ? travelPlans[1] : null
  }

  const contract_address = "0x2bC015cD3f61c0A5F51B2475D871a269FE6c7815"
  const toaddress = "0x9abFF76733c76Eef3f3DC0a44FD8FD3e8e8b4b94"
  // Replace with actual address

  const handlePaymentConfirm = (address: string | undefined, to: string, token: number) => {
    
    writeContract({
          abi: propAbi,
          functionName: "post",
          address: contract_address,
          args: [address, to, token],
        })



    // window.alert(
    //   "Your payment of 14.5 PLAN tokens will be stored in the contract. After successful visiting of the place and verification of user reviews, the travel planner will be paid.",
    // )
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
        <main className="flex-1">
          <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-80 border-r border-gray-200 bg-white">
              <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold text-[#415444]">Messages</h1>
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search contacts..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Tabs defaultValue="messages" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="messages">Chats</TabsTrigger>
                    <TabsTrigger value="requests" className="relative">
                      Requests
                      {friendRequests.length > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                          {friendRequests.length}
                        </span>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="suggestions">Discover</TabsTrigger>
                  </TabsList>

                  <TabsContent value="messages" className="mt-4">
                    <div className="space-y-2">
                      {filteredContacts.length > 0 ? (
                        filteredContacts.map((contact) => (
                          <motion.div
                            key={contact.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex cursor-pointer items-center rounded-lg p-3 transition-colors ${
                              currentChat?.id === contact.id ? "bg-[#e0e5ce]" : "hover:bg-gray-100"
                            }`}
                            onClick={() => {
                              setCurrentChat(contact)
                              setShowSuggestions(false)
                              // Mark as read when opening chat
                              setContacts((prev) => prev.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c)))
                            }}
                          >
                            <div className="relative mr-3 h-12 w-12 overflow-hidden rounded-full">
                              <img
                                src={contact.avatar || "/placeholder.svg"}
                                alt={contact.name}
                                className="h-full w-full object-cover"
                              />
                              {contact.online && (
                                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></span>
                              )}
                            </div>
                            <div className="flex-1 truncate">
                              <div className="flex items-center justify-between">
                                <h3 className="font-medium">{contact.name}</h3>
                                <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                              </div>
                              <p className="truncate text-sm text-gray-500">{contact.lastMessage}</p>
                            </div>
                            {contact.unread > 0 && (
                              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#415444] text-xs text-white">
                                {contact.unread}
                              </span>
                            )}
                          </motion.div>
                        ))
                      ) : (
                        <p className="text-center text-gray-500">No contacts found</p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="requests" className="mt-4">
                    <div className="space-y-3">
                      {friendRequests.length > 0 ? (
                        friendRequests.map((request) => (
                          <motion.div
                            key={request.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-lg border border-gray-200 bg-white p-4"
                          >
                            <div className="flex items-center">
                              <div className="mr-3 h-12 w-12 overflow-hidden rounded-full">
                                <img
                                  src={request.avatar || "/placeholder.svg"}
                                  alt={request.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium">{request.name}</h3>
                                <p className="text-sm text-gray-500">
                                  {request.mutualFriends} mutual connection{request.mutualFriends !== 1 ? "s" : ""}
                                </p>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-500 text-red-500 hover:bg-red-50"
                                onClick={() => rejectFriendRequest(request.id)}
                              >
                                <X className="mr-1 h-4 w-4" />
                                Decline
                              </Button>
                              <Button
                                size="sm"
                                className="bg-[#415444] hover:bg-[#415444]/90"
                                onClick={() => acceptFriendRequest(request.id)}
                              >
                                <Check className="mr-1 h-4 w-4" />
                                Accept
                              </Button>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10">
                          <Bell className="mb-2 h-12 w-12 text-gray-300" />
                          <p className="text-center text-gray-500">No pending friend requests</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="suggestions" className="mt-4">
                    <div className="space-y-3">
                      {peopleSuggestions.map((suggestion) => (
                        <motion.div
                          key={suggestion.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="rounded-lg border border-gray-200 bg-white p-4"
                        >
                          <div className="flex items-center">
                            <div className="mr-3 h-12 w-12 overflow-hidden rounded-full">
                              <img
                                src={suggestion.avatar || "/placeholder.svg"}
                                alt={suggestion.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{suggestion.name}</h3>
                              <p className="text-sm text-gray-500">{suggestion.bio}</p>
                              <p className="text-xs text-gray-400">
                                {suggestion.mutualFriends} mutual connection{suggestion.mutualFriends !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 flex justify-end">
                            <Button
                              size="sm"
                              className="bg-[#415444] hover:bg-[#415444]/90"
                              onClick={() => sendFriendRequest(suggestion.id)}
                            >
                              <UserPlus className="mr-1 h-4 w-4" />
                              Connect
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex flex-1 flex-col">
              {currentChat ? (
                <>
                  {/* Chat Header */}
                  <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center">
                      <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
                        <img
                          src={currentChat.avatar || "/placeholder.svg"}
                          alt={currentChat.name}
                          className="h-full w-full object-cover"
                        />
                        {currentChat.online && (
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
                        )}
                      </div>
                      <div>
                        <h2 className="font-medium">{currentChat.name}</h2>
                        <p className="text-xs text-gray-500">{currentChat.online ? "Online" : "Offline"}</p>
                      </div>
                    </div>
                    {/* Toggle Travel Plan Button */}
                    {(currentChat.id === 1 || currentChat.id === 2) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-[#e0e5ce] border-0 text-[#415444] hover:bg-[#e0e5ce]/80"
                        onClick={() => setShowTravelPlan(!showTravelPlan)}
                      >
                        <PanelRightOpen className="h-4 w-4 mr-1" />
                        {showTravelPlan ? "Hide Plan" : "View Travel Plan"}
                      </Button>
                    )}
                  </div>

                  {/* Chat Area with Flex */}
                  <div className="flex flex-1">
                    {/* Chat Messages */}
                    <div className={`${showTravelPlan ? "w-1/2" : "w-full"} flex-col flex overflow-hidden`}>
                      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
                        <div className="space-y-4">
                          {conversations[currentChat.id].map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-xs rounded-lg p-3 ${
                                  message.sender === "me" ? "bg-[#415444] text-white" : "bg-white"
                                }`}
                              >
                                <p>{message.text}</p>
                                <p
                                  className={`mt-1 text-right text-xs ${
                                    message.sender === "me" ? "text-gray-300" : "text-gray-500"
                                  }`}
                                >
                                  {message.time}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Message Suggestions */}
                      {showSuggestions && suggestions.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-200 bg-[#e0e5ce] p-3"
                        >
                          <div className="flex items-center mb-2">
                            <Lightbulb className="mr-2 h-4 w-4 text-[#415444]" />
                            <h4 className="text-sm font-medium text-gray-700">Suggested responses:</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 text-sm"
                                onClick={() => useSuggestion(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Message Input */}
                      <div className="border-t border-gray-200 bg-white p-4">
                        <div className="flex items-center">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="mr-2 bg-[#e0e5ce] border-0 hover:bg-[#e0e5ce]/80"
                              >
                                <Lightbulb className="h-5 w-5 text-[#415444]" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <div className="space-y-2">
                                <h4 className="font-medium">AI Message Suggestions</h4>
                                <p className="text-sm text-gray-500">
                                  Get context-aware suggestions to help you respond quickly.
                                </p>
                                <Button
                                  className="w-full bg-[#415444] hover:bg-[#415444]/90"
                                  onClick={generateSuggestions}
                                  disabled={loadingSuggestions}
                                >
                                  {loadingSuggestions ? "Generating..." : "Generate Suggestions"}
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>

                          <Input
                            placeholder="Type a message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSendMessage()
                              }
                            }}
                            className="flex-1"
                          />
                          <Button
                            className="ml-2 bg-[#415444] hover:bg-[#415444]/90"
                            onClick={handleSendMessage}
                            disabled={!messageInput.trim()}
                          >
                            <Send className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Travel Plan Panel */}
                    {showTravelPlan && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-1/2 border-l border-gray-200 bg-white overflow-y-auto"
                      >
                        <div className="p-6">
                          <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#415444]">10-Day Tokyo & Kyoto Adventure</h2>
                            <div className="flex items-center mt-1 text-gray-600">
                              <User className="h-4 w-4 mr-1" />
                              <span className="text-sm">Created by Emma Wilson</span>
                            </div>
                            <div className="mt-4 text-2xl font-bold text-[#415444]">14.5 PLAN</div>
                          </div>

                          <div className="space-y-6 mb-8">
                            <div className="bg-[#e0e5ce] rounded-lg p-4">
                              <h3 className="font-semibold text-[#415444] mb-2">Day 1</h3>
                              <h4 className="font-medium text-[#415444]">Tokyo Arrival & Orientation</h4>
                              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                                <li>• Airport pickup and transfer to hotel in Shinjuku</li>
                                <li>• Evening walk through Shinjuku's neon districts</li>
                                <li>• Welcome dinner at local izakaya</li>
                              </ul>
                            </div>

                            <div className="bg-[#e0e5ce] rounded-lg p-4">
                              <h3 className="font-semibold text-[#415444] mb-2">Day 2</h3>
                              <h4 className="font-medium text-[#415444]">Tokyo Food & Culture</h4>
                              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                                <li>• Early morning visit to Tsukiji Outer Market</li>
                                <li>• Sushi making workshop</li>
                                <li>• Afternoon visit to Meiji Shrine</li>
                              </ul>
                            </div>

                            <div className="bg-[#e0e5ce] rounded-lg p-4">
                              <h3 className="font-semibold text-[#415444] mb-2">Day 3</h3>
                              <h4 className="font-medium text-[#415444]">Anime & Pop Culture Day</h4>
                              <ul className="mt-2 space-y-1 text-sm text-gray-700">
                                <li>• Morning visit to Ghibli Museum</li>
                                <li>• Explore Akihabara Electric Town</li>
                                <li>• Maid cafe experience</li>
                              </ul>
                            </div>
                          </div>

                          {/* Payment Summary */}
                          <Card className="p-4 mb-6">
                            <h3 className="font-semibold text-lg mb-4">Payment Summary</h3>
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between">
                                <span>Base package (per person)</span>
                                <span>12 PLAN</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Sushi workshop</span>
                                <span>0.85 PLAN</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Ghibli Museum tickets</span>
                                <span>0.45 PLAN</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Airport transfer</span>
                                <span>1.2 PLAN</span>
                              </div>
                              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold">
                                <span>Total</span>
                                <span>14.5 PLAN</span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">1 PLAN token = $100</div>
                            </div>

                            <Button
                              className="w-full bg-[#415444] hover:bg-[#415444]/90"
                              onClick={() => handlePaymentConfirm(address,toaddress,5)} // Replace with actual address and token amount
                                // Show payment confirmation popup
                                
                              
                            >
                              <CreditCard className="h-4 w-4 mr-2" />
                              Confirm Payment
                            </Button>
                          </Card>

                          <div className="text-xs text-gray-500">
                            <p>
                              By confirming payment, you agree to our terms and conditions. Payment will be held in
                              escrow until your trip is completed and verified.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </>
              ) : (
                // Empty state when no chat is selected
                <div className="flex h-full flex-col items-center justify-center bg-gray-50">
                  <Users className="mb-4 h-16 w-16 text-gray-300" />
                  <h2 className="mb-2 text-2xl font-medium text-gray-700">No conversation selected</h2>
                  <p className="text-center text-gray-500">
                    Select a contact to start messaging or connect with new travelers
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      {/* <Footer /> */}
    </>
  )
}
