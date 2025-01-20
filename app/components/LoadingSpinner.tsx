import type React from "react"
import { PlayfairDisplayFont } from "../font"

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 z-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <p className={`${PlayfairDisplayFont.className} text-white text-2xl`}>Loading...</p>
      </div>
    </div>
  )
}

export default LoadingSpinner

