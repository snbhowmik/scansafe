"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function CustomizationForm() {
  const router = useRouter()
  const [title, setTitle] = useState("YOU ARE BEEN HACKED")
  const [message, setMessage] = useState(
    "Your device has been compromised. All your information is now exposed. (Just a demo by CyberAnzen)",
  )
  const [logoUrl, setLogoUrl] = useState("")
  const [backgroundColor, setBackgroundColor] = useState("#000000")
  const [textColor, setTextColor] = useState("#ff0000")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create URL with query parameters for customization
    const params = new URLSearchParams()
    params.append("title", title)
    params.append("message", message)
    if (logoUrl) params.append("logo", logoUrl)
    params.append("bg", backgroundColor.replace("#", ""))
    params.append("color", textColor.replace("#", ""))

    // Refresh the page with the new query parameters
    router.push(`/?${params.toString()}`)

    // Store in localStorage for persistence
    localStorage.setItem(
      "hackPageCustomization",
      JSON.stringify({
        title,
        message,
        logoUrl,
        backgroundColor,
        textColor,
      }),
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold text-white">Customize Hack Page</h2>

      <div className="space-y-2">
        <Label htmlFor="title" className="text-white">
          Title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-white">
          Message
        </Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="logoUrl" className="text-white">
          Logo URL (optional)
        </Label>
        <Input
          id="logoUrl"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="https://example.com/logo.png"
          className="bg-gray-700 text-white border-gray-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="backgroundColor" className="text-white">
            Background Color
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              id="backgroundColor"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-12 h-8"
            />
            <Input
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="textColor" className="text-white">
            Text Color
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              id="textColor"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-12 h-8"
            />
            <Input
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
        Update QR Code
      </Button>
    </form>
  )
}

