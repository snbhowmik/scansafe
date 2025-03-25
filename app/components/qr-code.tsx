"use client"

import { useRef, useState } from "react"
import QRCodeLib from "qrcode"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface QRCodeProps {
  url: string
  size?: number
}

export default function QRCode({ url, size = 200 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [inputUrl, setInputUrl] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateQRCode = () => {
    if (canvasRef.current) {
      setIsGenerating(true)

      // Ensure the canvas is cleared before generating new QR code
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      context?.clearRect(0, 0, canvas.width, canvas.height)

      // Use setTimeout to simulate loading effect
      setTimeout(() => {
        QRCodeLib.toCanvas(
          canvasRef.current,
          url, // Always use the predefined URL
          {
            width: size,
            margin: 2,
            color: {
              dark: "#000000",
              light: "#ffffff",
            },
          },
          (error) => {
            if (error) console.error("Error generating QR code:", error)
            setIsGenerating(false)
          }
        )
      }, 800)
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="bg-white p-4 rounded-lg mb-4">
        <canvas ref={canvasRef} />
      </div>

      <div className="space-y-3 mt-4">
        <Label htmlFor="custom-url" className="text-white">
          Generate QR Code for Website:
        </Label>
        <div className="flex gap-2">
          <Input
            id="custom-url"
            type="url"
            placeholder="https://example.com"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="bg-gray-700 text-white border-gray-600"
          />
          <Button
            onClick={generateQRCode}
            disabled={isGenerating}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>
        <p className="text-xs text-gray-400">Enter any website URL to generate a QR code</p>
      </div>
    </div>
  )
}

