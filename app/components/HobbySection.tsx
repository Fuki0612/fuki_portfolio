import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PlayfairDisplayFont, ShipporiMinchoFont } from '../font'
import { Card, CardContent } from '@/components/ui/card'
import { min } from 'date-fns'

const hobbies = [
  { 
    name: '読書', 
    description: '小説を愛読。米澤穂信さんや三秋縋さんの作品が好きです。おすすめの小説を教えてほしいです。',
    images: ['/Reading2.jpg', '/Reading1.jpg', '/Reading3.jpg']
  },
  { 
    name: 'ゲーム', 
    description: '小さい頃から遊んでいます。ひどいときはクリアまで寝食を忘れてプレイしてしまいます。',
    images: ['/Game1.jpg', '/Game2.jpg', '/Game3.png']
  },
  { 
    name: '一人旅', 
    description: '大学から国内の様々なところに一人で旅行に行っています。旅行先では水族館に毎回行きます。',
    images: ['/Travel1.jpg', '/Travel2.jpg', '/Travel3.jpg']
  },
  { 
    name: 'カフェ巡り', 
    description: '予定のない休日は基本カフェで本を読んでいます。コーヒーよりはカフェオレが好きです。',
    images: ['/Cafe1.jpg', '/Cafe2.jpg', '/Cafe3.jpg']
  }, 
]

const HobbyCard: React.FC<{ hobby: typeof hobbies[0] }> = ({ hobby }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hobby.images.length)
      }, 2000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isHovered, hobby.images.length])

  return (
    <Card 
      className="w-full max-w-sm bg-slate-900 text-white overflow-hidden relative border-none hover:scale-105 transition-transform duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setCurrentImageIndex(0)
      }}
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
             <Image
                src={hobby.images[currentImageIndex] || "/placeholder.svg"}
                alt={hobby.name}
                width={900}
                height={1600}
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

const HobbySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextHobby = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % hobbies.length)
    setCurrentImageIndex(0)
  }

  const prevHobby = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + hobbies.length) % hobbies.length)
    setCurrentImageIndex(0)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hobbies[currentIndex].images.length)
      }, 2000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentIndex])
  

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
        <div className="md:hidden mx-5">
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col md:flex-row items-center text-center md:text-left">
          <div className="relative w-full md:w-1/2 aspect-square mb-4 md:mb-0 md:mr-6 rounded-lg overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <Image
                    src={hobbies[currentIndex].images[currentImageIndex] || "/placeholder.svg"}
                    alt={hobbies[currentIndex].name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="md:w-1/2 px-4 max--[100px] md:max-h-none">
              <h3 className="text-white text-2xl font-extrabold mb-4">{hobbies[currentIndex].name}</h3>
              <p className="text-gray-300 text-lg leading-relaxed line-clamp-4 h-[5rem]">{hobbies[currentIndex].description}</p>
            </div>
          </div>
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
        <h3 className={`${ShipporiMinchoFont.className} invisible md:visible text-white text-md font-bold mb-2 text-center`}>ホバーすると画像が切り替わります</h3>
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {hobbies.map((hobby, index) => (
            <HobbyCard key={index} hobby={hobby} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default HobbySection

