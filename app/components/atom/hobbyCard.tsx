import { Card, CardContent } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { PreloadedImage } from "./PreloadedImage"
import { ShipporiMinchoFont } from "../../font"

const HobbyCard: React.FC<{ hobby: {name : string, description: string, images: string[]} }> = ({ hobby }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hobby.images.length)
    }, 3000) // ホバー時は2秒、非ホバー時は4秒間隔で切り替え
    
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Card 
      className="w-[300px] bg-slate-900 text-white overflow-hidden relative border-none hover:scale-105 transition-transform duration-300"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 rounded-lg flex flex-col items-center h-[400px] relative w-full"
      >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
             <PreloadedImage
                src={hobby.images[currentImageIndex] || "/placeholder.svg"}
                alt={hobby.name}
                width={500}
                height={700}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                  className="w-full object-cover object-position: center"
              />
            </motion.div>
          </AnimatePresence>
        <CardContent className="absolute bottom-0 p-6 space-y-3 flex flex-col justify-end h-1/2 bg-gradient-to-t from-black to-transparent">
          <h3 className={`${ShipporiMinchoFont.className} text-white text-xl font-extrabold mb-2`}>{hobby.name}</h3>
          <p className={`${ShipporiMinchoFont.className} text-gray-300 text-sm text-left line-clamp-3`}>{hobby.description}</p>
        </CardContent>
      </motion.div>
    </Card>
  )
}

export default HobbyCard