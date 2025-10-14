"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Check, Coins, Gift, Info, MapPin, Plus, Share2, Star, Upload, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { VerticalNavbar } from "@/components/vertical-navbar"
import { CustomCursor } from "@/components/custom-cursor"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"
import { useWriteContract } from "wagmi"
import propAbi from "@/contracts/abi.json"

export default function ReviewPage() {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("0x1234...5678")
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [activeReviewId, setActiveReviewId] = useState<number | null>(null)
  const [commentText, setCommentText] = useState("")
  const [destination, setDestination] = useState("")
  const [rating, setRating] = useState<number>(0)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [viewPhotosDialogOpen, setViewPhotosDialogOpen] = useState(false)
  const [activePhotoIndex, setActivePhotoIndex] = useState(0)
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false)
  const [showVerificationAlert, setShowVerificationAlert] = useState(false)
  const [verificationSuccess, setVerificationSuccess] = useState(false)
  const [tokenConfirmDialogOpen, setTokenConfirmDialogOpen] = useState(false)
  const [tokenStakeDialogOpen, setTokenStakeDialogOpen] = useState(false)
  const [stakeAmount, setStakeAmount] = useState("1")
  const [voteChoice, setVoteChoice] = useState<boolean | null>(null)
  const [userTokens, setUserTokens] = useState(100) // Example value, replace with actual user token balance

  const { address, isConnected } = useAppKitAccount() // AppKit hook to get the address and check if the user is connected
  const { chainId } = useAppKitNetwork() // to get chainid
  const { writeContract, isSuccess } = useWriteContract() // to in

  const contract_address = "0x857417bCd1F1b18e306833c459b4B6c986FeA821"
  const toaddress = "0x9abFF76733c76Eef3f3DC0a44FD8FD3e8e8b4b94"

  // Track verified users for each review
  const [verifiedUsers, setVerifiedUsers] = useState<{ [key: number]: number }>({
    1: 12,
    2: 8,
    3: 3,
  })

  // Track user votes
  const [userVoted, setUserVoted] = useState<{ [key: number]: boolean | null }>({})

  const handleConnectWallet = () => {
    if (walletConnected) {
      setWalletConnected(false)
      setWalletAddress("")
    } else {
      setWalletConnected(true)
      setWalletAddress("0x1234...5678")
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages: string[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string)
          if (newImages.length === files.length) {
            setUploadedImages([...uploadedImages, ...newImages])
          }
        }
      }

      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = [...uploadedImages]
    newImages.splice(index, 1)
    setUploadedImages(newImages)
  }

  // ----------------------------------------------------------------------------------------------------------------------

  const handleSubmitReview = (address: string | undefined, to: string, token: number) => {
    // Add validation

     writeContract({
              abi: propAbi,
              functionName: "post",
              address: contract_address,
              args: [address, to, token],
            })




    if (!destination || !reviewTitle || !reviewText || rating === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (uploadedImages.length === 0) {
      toast({
        title: "No photos",
        description: "Please upload at least one photo for your review",
        variant: "destructive",
      })
      return
    }

    // writeContract({
    //   abi: propAbi, // Replace with the actual ABI of your contract
    //   functionName: "post",
    //   address: contract_address,
    //   args: [address, to, token],
    // })

    // Create a new review and add it to the reviews array
    const newReview = {
      id: reviews.length + 1,
      user: {
        name: "You",
        avatar: "/placeholder.svg?height=100&width=100",
        verified: walletConnected,
      },
      destination: destination,
      title: reviewTitle,
      text: reviewText,
      rating: rating,
      tags: selectedTags,
      images: uploadedImages,
      comments: 0,
      timePosted: "Just now",
    }

    setReviews([newReview, ...reviews])

    // Initialize verification count for the new review
    setVerifiedUsers({
      ...verifiedUsers,
      [newReview.id]: 0,
    })

    setReviewDialogOpen(false)

    // Reset form
    setDestination("")
    setReviewTitle("")
    setReviewText("")
    setRating(0)
    setSelectedTags([])
    setUploadedImages([])

    toast({
      title: "Review posted",
      description: "Your review has been posted successfully!",
    })
  }

  const handleShareReview = (reviewId: number) => {
    setActiveReviewId(reviewId)
    setShareDialogOpen(true)
  }

  const handleOpenVerifyDialog = (reviewId: number) => {
    if (userVoted[reviewId] !== undefined) {
      toast({
        title: "Already voted",
        description: "You have already provided feedback for this review.",
      })
      return
    }

    setActiveReviewId(reviewId)
    setTokenStakeDialogOpen(true)
    setVoteChoice(null)
    setStakeAmount("1")
  }

  const handleVoteConfirm = (address: string | undefined, to: string, amount: number) => {
    if (!activeReviewId || voteChoice === null || amount <= 0 || amount > userTokens) return

    // Call blockchain transaction
    writeContract({
      abi: propAbi,
      functionName: "verify",
      address: contract_address,
      args: [address, to, amount],
    })

    // Update UI state
    setUserVoted({ ...userVoted, [activeReviewId]: voteChoice })

    if (voteChoice) {
      // Update verified count when user votes "Yes"
      setVerifiedUsers({
        ...verifiedUsers,
        [activeReviewId]: (verifiedUsers[activeReviewId] || 0) + 1,
      })

      // Show success verification alert
      setVerificationSuccess(true)
      setShowVerificationAlert(true)
    } else {
      // Show unsuccessful verification alert
      setVerificationSuccess(false)
      setShowVerificationAlert(true)
    }

    setTimeout(() => {
      setShowVerificationAlert(false)
    }, 3000)

    // Deduct tokens from user balance
    setUserTokens((prevTokens) => prevTokens - amount)

    // Close the dialog
    setTokenStakeDialogOpen(false)
  }

  const handleVote = (reviewId: number, satisfied: boolean) => {
    setUserVoted({ ...userVoted, [reviewId]: satisfied })

    if (satisfied) {
      // Update verified count when user votes "Yes"
      setVerifiedUsers({
        ...verifiedUsers,
        [reviewId]: (verifiedUsers[reviewId] || 0) + 1,
      })

      // Show success verification alert
      setVerificationSuccess(true)
      setShowVerificationAlert(true)

      setTimeout(() => {
        setShowVerificationAlert(false)
      }, 3000)
    } else {
      // Show unsuccessful verification alert
      setVerificationSuccess(false)
      setShowVerificationAlert(true)

      setTimeout(() => {
        setShowVerificationAlert(false)
      }, 3000)
    }

    setVerifyDialogOpen(false)
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return

    const updatedReviews = reviews.map((review) => {
      if (review.id === activeReviewId) {
        return {
          ...review,
          comments: review.comments + 1,
        }
      }
      return review
    })

    setReviews(updatedReviews)
    setCommentText("")
    setCommentDialogOpen(false)

    toast({
      title: "Comment added",
      description: "Your comment has been added successfully!",
    })
  }

  const handleViewPhotos = (reviewId: number, initialPhotoIndex = 0) => {
    setActiveReviewId(reviewId)
    setActivePhotoIndex(initialPhotoIndex)
    setViewPhotosDialogOpen(true)
  }

  const handleOpenCommentDialog = (reviewId: number) => {
    setActiveReviewId(reviewId)
    setCommentDialogOpen(true)
  }

  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA6nr6QZlcLX33XOzOazIkGN04DvnE6gzod9qnH53DE2S2IuCQqWLPqEetRwPwWxrGByM&usqp=CAU",
        verified: true,
      },
      destination: "Kyoto, Japan",
      title: "A Magical Week in Kyoto",
      text: "Spent a week exploring the ancient temples and gardens of Kyoto. The fall colors were absolutely stunning, especially at Kiyomizu-dera and the Arashiyama Bamboo Grove. The food scene was incredible - from traditional kaiseki dinners to street food in Nishiki Market. Highly recommend visiting during autumn!",
      rating: 5,
      tags: ["Cultural", "Food", "Nature"],
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGFRGykMeF86XUjm8_1IkelJyLX1cttKyXZw&s",
        "https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/6/2021/02/Kyoto-Japan-old-town-streets-in-the-Higashiyama-district@3x-1024x683.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSijYc6zTKzzWEvx3yRrBGNAwkJVsx7dOaBfQ&s",
        "https://cdn.craft.cloud/101e4579-0e19-46b6-95c6-7eb27e4afc41/assets/uploads/pois/kyoto-japan-frommers.jpg?width=1200&height=630&quality=82&fit=cover&s=kmxdKluB3-i_ntEA7Vpv4uAoEyo4RzcoXlpIiJxEprA",
      ],
      comments: 15,
      timePosted: "2 days ago",
    },
    {
      id: 2,
      user: {
        name: "Maria Garcia",
        avatar: "https://img.freepik.com/premium-photo/woman-black-suit-stands-front-building-with-her-arms-crossed_889227-21778.jpg",
        verified: true,
      },
      destination: "Santorini, Greece",
      title: "Breathtaking Views and Sunsets",
      text: "Santorini exceeded all my expectations! The white-washed buildings against the blue Aegean Sea create a postcard-perfect scene at every turn. We stayed in Oia and the sunsets were absolutely magical. The local cuisine was fresh and delicious - don't miss the fresh seafood and local wines. The only downside was the crowds during peak hours.",
      rating: 4,
      tags: ["Beach", "Romantic", "Food"],
      images: [
        "https://media.istockphoto.com/id/541132240/photo/oia-at-sunset.jpg?s=612x612&w=0&k=20&c=kql4X3tMkOmYsa4PX45WK7-vHzpOk__IeAaHiz4VfyA=",
        "https://www.santorini-island.com/santorini-photos/the-world-famous-sunset-in-santorini-santorini-with-famous-windmill-in-greece-oia-village-135-411d.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRutx19a_KhgF0Wc5ed1abPNwosrP8750BDA&s",
      ],
      comments: 8,
      timePosted: "1 week ago",
    },
    {
      id: 3,
      user: {
        name: "David Kim",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHAP3M1A1tyzATmHSRq8KJ6Hz6bNwPEAt-dqYbYEumL4A9ZNhltwJsEitpnyQBQEEVgMg&usqp=CAU",
        verified: false,
      },
      destination: "Bali, Indonesia",
      title: "A Perfect Mix of Adventure and Relaxation",
      text: "Spent two weeks exploring Bali and it was the perfect balance of adventure and relaxation. The beaches in the south were great for surfing, while Ubud offered cultural experiences and lush rice terraces. The local people were incredibly friendly and welcoming. Don't miss the traditional dance performances and the sacred monkey forest!",
      rating: 5,
      tags: ["Adventure", "Beach", "Cultural"],
      images: ["https://d3sftlgbtusmnv.cloudfront.net/blog/wp-content/uploads/2025/01/Bali-Travel-Guide-Cover-Photo-840x425.jpg", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrt74FXU3n0hgHOu9W9xsGsE_cGdhVPEqHAQ&s"],
      comments: 6,
      timePosted: "2 weeks ago",
    },
  ])

  const activeReview = reviews.find((review) => review.id === activeReviewId)

  return (
    <>
      <CustomCursor />
      <div className="flex min-h-screen bg-[#fcfdfd]">
        {/* Verification Alert */}
        {showVerificationAlert && (
          <div className="fixed right-4 top-4 z-50 w-80">
            <Alert className={verificationSuccess ? "border-green-500 bg-green-50" : "border-orange-500 bg-orange-50"}>
              <AlertDescription className="flex items-center gap-2">
                {verificationSuccess ? (
                  <>
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Thank you for verifying this review!</span>
                  </>
                ) : (
                  <>
                    <span className="text-orange-500">⚠</span>
                    <span>Thank you for your feedback on this review.</span>
                  </>
                )}
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Vertical Navbar */}
        <VerticalNavbar />

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[#415444]">Travel Reviews</h1>
                <p className="mt-2 text-gray-600">Share your experiences and discover new destinations</p>
              </div>

              {/* <div className="mt-4 flex items-center gap-4 md:mt-0">
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
              </div> */}
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Column - Post Dialog Trigger */}
              <div className="lg:col-span-2">
                <Card className="mb-8 border-2 border-dashed border-[#415444]/30 bg-[#f8f9fa]">
                  <CardContent
                    className="flex cursor-pointer flex-col items-center justify-center p-8"
                    onClick={() => setReviewDialogOpen(true)}
                  >
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e0e5ce]">
                      <Plus className="h-8 w-8 text-[#415444]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#415444]">Post a Review</h3>
                    <p className="mt-2 text-center text-gray-600">
                      Share your travel experiences with photos and help others plan their trips
                    </p>
                  </CardContent>
                </Card>

                {/* Review Dialog */}
                <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
                    <DialogHeader>
                      <DialogTitle>Post a Review</DialogTitle>
                      <DialogDescription>
                        Share your travel experience with the community. Add photos, ratings, and details.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 overflow-y-auto">
                      <div className="grid gap-2">
                        <Label htmlFor="destination">Destination</Label>
                        <Input
                          id="destination"
                          placeholder="e.g., Paris, France"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="review-title">Review Title</Label>
                        <Input
                          id="review-title"
                          placeholder="e.g., Amazing Weekend Getaway"
                          value={reviewTitle}
                          onChange={(e) => setReviewTitle(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Rating</Label>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-8 w-8 ${
                                  rating >= star ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="tags">Tags (select multiple)</Label>
                        <Select onValueChange={(value) => setSelectedTags([...selectedTags, value])}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tags" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Adventure">Adventure</SelectItem>
                            <SelectItem value="Beach">Beach</SelectItem>
                            <SelectItem value="Cultural">Cultural</SelectItem>
                            <SelectItem value="Food">Food</SelectItem>
                            <SelectItem value="Luxury">Luxury</SelectItem>
                            <SelectItem value="Nature">Nature</SelectItem>
                            <SelectItem value="Romantic">Romantic</SelectItem>
                            <SelectItem value="Budget">Budget</SelectItem>
                            <SelectItem value="Family">Family</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedTags.map((tag, i) => (
                            <Badge key={i} className="flex items-center gap-1 bg-[#e0e5ce] text-[#415444]">
                              {tag}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0"
                                onClick={() => setSelectedTags(selectedTags.filter((_, index) => index !== i))}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="review-text">Review</Label>
                        <Textarea
                          id="review-text"
                          placeholder="Share your experience, tips, and recommendations..."
                          className="min-h-[120px]"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Photos</Label>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Uploaded ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                          {uploadedImages.length < 8 && (
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="flex aspect-square items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50"
                            >
                              <Upload className="h-6 w-6 text-gray-400" />
                            </button>
                          )}
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        <p className="text-xs text-gray-500">Upload up to 8 photos. Max 5MB each.</p>
                      </div>
                    </div>
                    <div className="fixed bottom-4 right-4 flex justify-end gap-4 pt-4 bg-white rounded-lg shadow-md px-6 py-4 z-20">
                      <Button variant="outline" onClick={() => setReviewDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button
                        className="bg-[#415444] hover:bg-[#415444]/90"
                        onClick={() => setTokenConfirmDialogOpen(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Post Review
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Reviews List */}
                {reviews.map((review) => (
                  <Card key={review.id} className="mb-6 border-[#e0e5ce]">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                            <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{review.user.name}</h3>
                              {review.user.verified && (
                                <Badge
                                  variant="outline"
                                  className="rounded-full border-[#415444] px-2 py-0 text-xs text-[#415444]"
                                >
                                  <Check className="mr-1 h-3 w-3" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{review.timePosted}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => handleShareReview(review.id)}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-xl font-semibold">{review.title}</h3>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mb-3 flex flex-wrap gap-2">
                        <Badge className="bg-[#e0e5ce] text-[#415444]">
                          <MapPin className="mr-1 h-3 w-3" />
                          {review.destination}
                        </Badge>
                        {review.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="border-[#415444]/30 text-[#415444]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <p className="mb-4 text-gray-600">{review.text}</p>

                      {/* Photo Grid */}
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {review.images.slice(0, 4).map((image, index) => (
                          <div
                            key={index}
                            className="relative aspect-square cursor-pointer overflow-hidden rounded-md"
                            onClick={() => handleViewPhotos(review.id, index)}
                          >
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Review ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                            {index === 3 && review.images.length > 4 && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                                <span className="text-lg font-medium">+{review.images.length - 4}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>

                    <CardFooter className="flex items-center justify-between border-t border-[#e0e5ce] pt-3">
                      <div className="flex items-center gap-4">
                        {/* Verification count display */}
                        <div className="flex items-center gap-1.5 text-[#415444]">
                          {verifiedUsers[review.id] > 0 ? (
                            <>
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e0e5ce]">
                                <Check className="h-3.5 w-3.5" />
                              </div>
                              <span className="text-sm font-medium">
                                {verifiedUsers[review.id]} {verifiedUsers[review.id] === 1 ? "person" : "people"}{" "}
                                verified
                              </span>
                            </>
                          ) : (
                            <>
                              <User className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-500">No verifications yet</span>
                            </>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleOpenCommentDialog(review.id)}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                          >
                            <path
                              d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{review.comments}</span>
                        </Button>
                      </div>

                      {/* Verify button */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className={`border-[#415444] text-[#415444] ${
                            userVoted[review.id] === true ? "bg-[#e0e5ce]" : "hover:bg-[#415444] hover:text-white"
                          }`}
                          onClick={() => handleOpenVerifyDialog(review.id)}
                        >
                          {userVoted[review.id] === true ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Verified
                            </>
                          ) : (
                            "Verify Review"
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#415444] text-[#415444] hover:bg-[#415444] hover:text-white"
                          onClick={() => handleViewPhotos(review.id)}
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          View Photos
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Popular Destinations Card */}
                <Card className="border-[#e0e5ce]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-[#415444]">Popular Destinations</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      {[
                        { name: "Kyoto, Japan", count: 42 },
                        { name: "Santorini, Greece", count: 36 },
                        { name: "Bali, Indonesia", count: 28 },
                        { name: "Paris, France", count: 24 },
                        { name: "Machu Picchu, Peru", count: 19 },
                      ].map((destination, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#415444]" />
                            <span>{destination.name}</span>
                          </div>
                          <Badge variant="outline" className="border-[#415444]/30 text-[#415444]">
                            {destination.count} reviews
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Tags Card */}
                <Card className="border-[#e0e5ce]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-[#415444]">Popular Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: "Beach", count: 87 },
                        { name: "Food", count: 65 },
                        { name: "Cultural", count: 54 },
                        { name: "Nature", count: 48 },
                        { name: "Adventure", count: 42 },
                        { name: "Romantic", count: 36 },
                        { name: "Budget", count: 31 },
                        { name: "Luxury", count: 27 },
                        { name: "Family", count: 23 },
                      ].map((tag, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="flex items-center border-[#415444]/30 px-2 py-1 text-sm text-[#415444]"
                        >
                          {tag.name}
                          <span className="ml-1 rounded-full bg-[#e0e5ce] px-1.5 py-0.5 text-xs">{tag.count}</span>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Information Card */}
                <Card className="border-[#e0e5ce]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl text-[#415444]">About Verifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Travel reviews on our platform are verified by other travelers who have visited the same
                      destination. This helps ensure authenticity and builds trust within our community.
                    </p>
                    <div className="mt-4 rounded-md bg-[#e0e5ce]/50 p-3">
                      <h4 className="flex items-center gap-2 font-medium text-[#415444]">
                        <Check className="h-4 w-4" />
                        How verification works
                      </h4>
                      <ul className="mt-2 space-y-2 text-sm text-gray-600">
                        <li>• Connect your wallet to verify your identity</li>
                        <li>• Verify reviews of places you've visited</li>
                        <li>• Each verification is recorded on the blockchain</li>
                        <li>• Earn reputation for helpful contributions</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Photo Gallery Dialog */}
      <Dialog open={viewPhotosDialogOpen} onOpenChange={setViewPhotosDialogOpen}>
        <DialogContent className="max-w-3xl p-0">
          <div className="relative aspect-video">
            {activeReview && (
              <img
                src={activeReview.images[activePhotoIndex] || "/placeholder.svg"}
                alt={`Review photo ${activePhotoIndex + 1}`}
                className="h-full w-full object-contain"
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-1.5 text-white hover:bg-black/40"
              onClick={() =>
                setActivePhotoIndex((prev) => (prev === 0 ? (activeReview?.images.length || 1) - 1 : prev - 1))
              }
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/20 p-1.5 text-white hover:bg-black/40"
              onClick={() =>
                setActivePhotoIndex((prev) => (prev === (activeReview?.images.length || 1) - 1 ? 0 : prev + 1))
              }
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {activeReview?.title} - Photo {activePhotoIndex + 1} of {activeReview?.images.length}
              </h3>
              <Button variant="outline" size="sm" onClick={() => setViewPhotosDialogOpen(false)}>
                Close
              </Button>
            </div>
            <div className="mt-3 grid grid-cols-6 gap-2">
              {activeReview?.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square cursor-pointer overflow-hidden rounded-md border-2 ${
                    index === activePhotoIndex ? "border-[#415444]" : "border-transparent"
                  }`}
                  onClick={() => setActivePhotoIndex(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Comment Dialog */}
      <Dialog open={commentDialogOpen} onOpenChange={setCommentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Comment</DialogTitle>
            <DialogDescription>Share your thoughts about this review.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="comment">Your Comment</Label>
              <Textarea
                id="comment"
                placeholder="Write your comment here..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setCommentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddComment}>Post Comment</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Share Review</DialogTitle>
            <DialogDescription>Share this review with others</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="share-link">Review Link</Label>
              <div className="flex gap-2">
                <Input id="share-link" value={`https://travelreview.example/review/${activeReviewId}`} readOnly />
                <Button
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(`https://travelreview.example/review/${activeReviewId}`)
                    toast({
                      title: "Copied!",
                      description: "Link copied to clipboard",
                    })
                  }}
                >
                  Copy
                </Button>
              </div>
            </div>
            <div className="mt-2 flex justify-center gap-4">
              <Button variant="outline" className="flex-1 gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" className="text-blue-600">
                  <path
                    fill="currentColor"
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
                Facebook
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" className="text-sky-500">
                  <path
                    fill="currentColor"
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
                Twitter
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Token Stake Dialog */}
      <Dialog open={tokenStakeDialogOpen} onOpenChange={setTokenStakeDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Stake Plan Tokens</DialogTitle>
            <DialogDescription>
              Stake tokens to verify this plan. Your feedback helps improve our community recommendations.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <Label htmlFor="tokenAmount" className="mb-2 block text-sm font-medium">
                Number of Plan Tokens to Stake
              </Label>
              <div className="flex items-center">
                <Input
                  id="tokenAmount"
                  type="number"
                  min="1"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  className="border-[#e0e5ce] focus-visible:ring-[#415444]"
                />
                <Coins className="ml-2 h-5 w-5 text-amber-500" />
              </div>
              <p className="mt-1 text-xs text-gray-500">Available: {userTokens} tokens</p>
            </div>

            <div className="mb-4">
              <Label htmlFor="voteChoice" className="mb-2 block text-sm font-medium">
                Are you satisfied with this plan?
              </Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => setVoteChoice(true)}
                  className={`flex-1 ${
                    voteChoice === true ? "bg-[#415444] text-white" : "bg-white text-[#415444] border border-[#415444]"
                  }`}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Yes
                </Button>
                <Button
                  type="button"
                  onClick={() => setVoteChoice(false)}
                  className={`flex-1 ${
                    voteChoice === false ? "bg-[#415444] text-white" : "bg-white text-[#415444] border border-[#415444]"
                  }`}
                >
                  <X className="mr-2 h-4 w-4" />
                  No
                </Button>
              </div>
            </div>

            <div className="rounded-md bg-[#f8f9f4] p-3">
              <div className="flex items-center gap-2 text-sm">
                <Info className="h-4 w-4 text-[#415444]" />
                <span className="text-gray-700">
                  {voteChoice
                    ? "Staking tokens on a positive verification helps support quality travel plans."
                    : "Staking tokens on a rejection helps filter out low-quality travel plans."}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setTokenStakeDialogOpen(false)}
              className="border-[#415444] text-[#415444] hover:bg-[#415444]/10"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleVoteConfirm(address, toaddress, Number(stakeAmount))}
              className="bg-[#415444] hover:bg-[#415444]/90"
              disabled={
                !stakeAmount || Number(stakeAmount) <= 0 || Number(stakeAmount) > userTokens || voteChoice === null
              }
            >
              Confirm Stake
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Token Confirmation Dialog */}
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
            <Button
              className="bg-[#415444] hover:bg-[#415444]/90"
              onClick={() => handleSubmitReview(address, toaddress, 5)}
            >
              Confirm & Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
