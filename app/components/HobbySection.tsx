import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PlayfairDisplayFont, ShipporiMinchoFont } from '../font'
import { Card, CardContent } from '@/components/ui/card'

const hobbies = [
  { name: '読書', description: '小説を愛読．米澤穂信さんや三秋縋さんの作品が好きです．おすすめの小説を教えてほしいです．',image: '/book.jpg' },
  { name: 'ゲーム', description: '小さい頃から遊んでいます ひどいときはクリアまで寝食を忘れてプレイしてしまいます',image: '/game.jpg' },
  { name: '一人旅', description: '大学から国内の様々なところに一人で旅行に行きます',image: '20240823_144419.jpg' },
  { name: 'カフェ巡り', description: '予定のない休日は基本カフェで本を読んでいます コーヒーよりはカフェオレが好きです',image: '/cafe2.jpg' }, 
]

const HobbySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextHobby = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hobbies.length)
  }

  const prevHobby = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + hobbies.length) % hobbies.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full px-4 md:px-6 lg:px-8 py-32 md:py-64"
    >
      <h2 className={`${PlayfairDisplayFont.className} text-white text-4xl md:text-6xl font-bold mb-8`}>My Hobbies</h2>

      <div className="w-full max-w-7xl mx-auto">
        {/* Mobile version with navigation */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-lg p-6 flex flex-col md:flex-row items-center text-center md:text-left"
            >
              <div className="relative w-full md:w-1/2 aspect-square mb-4 md:mb-0 md:mr-6 rounded-lg overflow-hidden">
                <Image
                  src={hobbies[currentIndex].image || "/placeholder.svg"}
                  alt={hobbies[currentIndex].name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="md:w-1/2 px-4 max--[100px] md:max-h-none">
                <h3 className="text-white text-2xl font-extrabold mb-4">{hobbies[currentIndex].name}</h3>
                <p className="text-gray-300 text-lg line-clamp-4">{hobbies[currentIndex].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between items-center mt-6 mb-4">
            <button
              onClick={prevHobby}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Previous hobby"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextHobby}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Next hobby"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="mt-2 flex justify-center space-x-2 mb-4">
            {hobbies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-600'
                }`}
                aria-label={`Go to hobby ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop version with all hobbies displayed */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {hobbies.map((hobby, index) => (
            <Card className="w-full max-w-sm bg-slate-900 text-white overflow-hidden relative border-none hover:scale-105 transition-transform duration-300">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg flex flex-col items-center h-[400px] relative w-full"
            >
              <Image
                src={hobby.image || "/placeholder.svg"}
                alt={hobby.name}
                width={400}
                height={300}
                className="w-full object-cover object-position: center"
              />
              <div className="absolute inset-0 bg-black/40" />
              <CardContent className="absolute inset-0 p-6 space-y-3 flex flex-col justify-end">
                <h3 className={`${ShipporiMinchoFont.className} text-white text-xl font-extrabold mb-2`}>{hobby.name}</h3>
                <p className={`${ShipporiMinchoFont.className} text-gray-300 text-sm text-left`}>{hobby.description}</p>
              </CardContent>
            </motion.div>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default HobbySection

