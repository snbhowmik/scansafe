"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, MapPin, Monitor, Skull, Shield } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import CyberAnzenLogo from "../components/cyberanzenlogo"
import Image from "next/image"

interface UserInfoCollectorProps {
  serverIp: string
  textColor?: string
}

export default function UserInfoCollector({ serverIp, textColor = "#ff0000" }: UserInfoCollectorProps) {
  const [location, setLocation] = useState<GeolocationPosition | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [locationRequested, setLocationRequested] = useState(false)
  const [browserInfo, setBrowserInfo] = useState<{
    userAgent: string
    language: string
    platform: string
    screenSize: string
    timeZone: string
    plugins: number
    cookiesEnabled: boolean
  } | null>(null)
  const [countdown, setCountdown] = useState(0)
  const [showCountdown, setShowCountdown] = useState(true)

  useEffect(() => {
    // Countdown effect
    if (countdown > 0 && showCountdown) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setShowCountdown(false)
    }
  }, [countdown, showCountdown])

  useEffect(() => {
    // Collect browser information
    setBrowserInfo({
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      plugins: navigator.plugins.length,
      cookiesEnabled: navigator.cookieEnabled,
    })

    // Request location automatically for a more intimidating experience
    requestLocation()

    // Add glitch effect to the page
    const glitchEffect = setInterval(() => {
      const body = document.body
      body.classList.add("glitch")
      setTimeout(() => body.classList.remove("glitch"), 200)
    }, 3000)

    return () => clearInterval(glitchEffect)
  }, [])

  const requestLocation = () => {
    setLocationRequested(true)

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position)
        setLocationError(null)
      },
      (error) => {
        let errorMessage = "Unknown error occurred"
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for geolocation"
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable"
            break
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out"
            break
        }
        setLocationError(errorMessage)
      },
    )
  }

  const cardStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    border: `1px solid ${textColor}`,
    color: "white",
    marginBottom: "1rem",
  }

  const titleStyle = {
    color: textColor,
  }

  if (showCountdown) {
    return (
      <div className="flex flex-col items-center justify-center h-40">
        <div className="text-6xl font-bold animate-pulse" style={{ color: textColor }}>
          {countdown}
        </div>
        <p className="text-gray-400 mt-4">Collecting your information...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <style jsx global>{`
        .glitch {
          animation: glitch 0.2s linear;
        }
        
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-5px, 5px) }
          40% { transform: translate(-5px, -5px) }
          60% { transform: translate(5px, 5px) }
          80% { transform: translate(5px, -5px) }
          100% { transform: translate(0) }
        }
      `}</style>

      <Card style={cardStyle}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={titleStyle}>
            <Skull className="h-5 w-5" />
            IP Address Exposed
          </CardTitle>
          <CardDescription className="text-gray-400">Your current IP address has been logged</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-mono text-white">{serverIp}</p>
        </CardContent>
      </Card>

      <Card style={cardStyle}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={titleStyle}>
            <Monitor className="h-5 w-5" />
            System Information Compromised
          </CardTitle>
          <CardDescription className="text-gray-400">Your device details have been exposed</CardDescription>
        </CardHeader>
        <CardContent>
          {browserInfo && (
            <div className="space-y-2">
              <div>
                <span className="font-semibold text-white">User Agent:</span>
                <p className="text-sm text-gray-400 break-words">{browserInfo.userAgent}</p>
              </div>
              <div>
                <span className="font-semibold text-white">Language:</span>
                <p className="text-sm text-gray-400">{browserInfo.language}</p>
              </div>
              <div>
                <span className="font-semibold text-white">Platform:</span>
                <p className="text-sm text-gray-400">{browserInfo.platform}</p>
              </div>
              <div>
                <span className="font-semibold text-white">Screen Size:</span>
                <p className="text-sm text-gray-400">{browserInfo.screenSize}</p>
              </div>
              <div>
                <span className="font-semibold text-white">Time Zone:</span>
                <p className="text-sm text-gray-400">{browserInfo.timeZone}</p>
              </div>
              <div>
                <span className="font-semibold text-white">Plugins:</span>
                <p className="text-sm text-gray-400">{browserInfo.plugins} detected</p>
              </div>
              <div>
                <span className="font-semibold text-white">Cookies:</span>
                <p className="text-sm text-gray-400">{browserInfo.cookiesEnabled ? "Enabled" : "Disabled"}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card style={cardStyle}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2" style={titleStyle}>
            <MapPin className="h-5 w-5" />
            Location Tracked
          </CardTitle>
          <CardDescription className="text-gray-400">Your geographical position has been identified</CardDescription>
        </CardHeader>
        <CardContent>
          {!locationRequested ? (
            <div className="text-center">
              <Button onClick={requestLocation} className="bg-red-600 hover:bg-red-700 text-white">
                Reveal My Location
              </Button>
            </div>
          ) : locationError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Location Hidden</AlertTitle>
              <AlertDescription>{locationError}</AlertDescription>
            </Alert>
          ) : location ? (
            <div className="space-y-2">
              <Alert className="bg-red-900 border-red-600 text-white">
                <Skull className="h-4 w-4" />
                <AlertTitle>Location Exposed</AlertTitle>
                <AlertDescription>Your precise location has been compromised</AlertDescription>
              </Alert>
              <div>
                <span className="font-semibold text-white">Latitude:</span>
                <p className="text-sm text-gray-400">{location.coords.latitude}</p>
              </div>
              <div>
                <span className="font-semibold text-white">Longitude:</span>
                <p className="text-sm text-gray-400">{location.coords.longitude}</p>
              </div>
              <div>
                <span className="font-semibold text-white">Accuracy:</span>
                <p className="text-sm text-gray-400">{location.coords.accuracy} meters</p>
              </div>
              {location.coords.altitude !== null && (
                <div>
                  <span className="font-semibold text-white">Altitude:</span>
                  <p className="text-sm text-gray-400">{location.coords.altitude} meters</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-white">Tracking your location...</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center mt-8 p-4 border border-red-600 rounded-lg bg-black/50">
        <h2 className="text-2xl font-bold mb-4" style={{ color: textColor }}>
          Just kidding, it's CyberAnzen
        </h2>

          <CyberAnzenLogo />
          

        <div className="w-full max-w-xs mx-auto mb-4 border-b border-gray-600 pb-4">
          <p className="text-white text-sm mb-2">This is a demonstration only.</p>
          <p className="text-gray-400 text-xs">No information is being stored or transmitted to any third parties.</p>
        </div>

        <div className="animate-bounce mb-4">
          <span className="text-lg font-semibold text-white">Stay safe online!</span>
        </div>

        <a
          href="https://forms.gle/ew3VKmjg9ecW8HEH6"
          target="_blank'
          rel="noopener noreferrer"
          className="inline-block"
        >

        <Button className="mt-2 bg-gray-800 hover:bg-gray-700 text-white" onClick={() => window.history.back()}>
          <Shield className="h-4 w-4 mr-2" />
          Return to Safety
        </Button>
        </a>
      <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="flex items-center justify-center gap-2 text-cyan-400">
            <Code className="h-4 w-4" />
            Developed by Mehbub
          </p>
        </div>
      </div>
    </div>
  )
}

