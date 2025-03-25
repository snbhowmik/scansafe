import UserInfoCollector from "./user-info-collector"
import { headers } from "next/headers"

export default function InfoPage() {
  const headersList = headers()
  const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "Unable to determine IP"

  // Use default values since we removed the customization form
  const title = "YOU ARE BEEN HACKED"
  const message = "Your device has been compromised. All your information is now exposed. (Just a demo by CyberAnzen)"
  const backgroundColor = "#000000"
  const textColor = "#ff0000"

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor }}>
      <div className="max-w-md mx-auto bg-black/80 rounded-xl shadow-lg overflow-hidden md:max-w-2xl m-4 border-2 border-red-600">
        <div className="p-8">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CyberAnzen-logo-SWITIXzNzqtISM0QdwaBS9phHp23mv.jpeg"
                alt="CyberAnzen Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
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

