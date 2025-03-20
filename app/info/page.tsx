import UserInfoCollector from "./user-info-collector"
import { headers } from "next/headers"

export default function InfoPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const headersList = headers()
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unable to determine IP"

  // Get customization parameters from URL
  const title = typeof searchParams.title === "string" ? searchParams.title : "YOU ARE BEEN HACKED"
  const message =
    typeof searchParams.message === "string"
      ? searchParams.message
      : "Your device has been compromised. All your information is now exposed. (Just a demo by CyberAnzen)"
  const logoUrl = typeof searchParams.logo === "string" ? searchParams.logo : ""
  const backgroundColor = typeof searchParams.bg === "string" ? `#${searchParams.bg}` : "#000000"
  const textColor = typeof searchParams.color === "string" ? `#${searchParams.color}` : "#ff0000"

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor }}>
      <div className="max-w-md mx-auto bg-black/80 rounded-xl shadow-lg overflow-hidden md:max-w-2xl m-4 border-2 border-red-600">
        <div className="p-8">
          <div className="text-center mb-6">
            {logoUrl && (
              <div className="flex justify-center mb-4">
                <img
                  src={logoUrl || "/placeholder.svg"}
                  alt="Hacker Logo"
                  className="h-24 w-auto object-contain"
                  onError={(e) => {
                    // Hide the image if it fails to load
                    ;(e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              </div>
            )}
            <h1 className="text-4xl font-bold mb-4 animate-pulse" style={{ color: textColor }}>
              {title}
            </h1>
            <p className="text-gray-400">{message}</p>
          </div>

          <UserInfoCollector serverIp={ip} textColor={textColor} />
        </div>
      </div>
    </div>
  )
}

