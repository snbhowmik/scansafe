import QRCode from "./components/qr-code"
import { headers } from "next/headers"

export default function Home() {
  const headersList = headers()
  const host = headersList.get("host") || "localhost:3000"
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"
  const fullUrl = `${protocol}://${host}/info`

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">Hacker QR Code Generator</h1>
          <p className="mt-2 text-gray-400">Create QR codes that collect device information</p>
        </div>

        <QRCode url={fullUrl} size={300} />

        <div className="text-center text-sm text-gray-400">
          <p>Scan this QR code to see it in action</p>
          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-cyan-400 font-medium">Developed by Mehbub</p>
            <p className="text-xs text-cyan-600">CyberAnzen</p>
          </div>
        </div>
      </div>
    </div>
  )
}

