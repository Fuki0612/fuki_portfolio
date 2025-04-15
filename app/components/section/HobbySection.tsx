"use client";
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { IMAGES } from '../../constants/images'
import Title from '../atom/title';
import SectionDiv from '../atom/sectionDiv';
import HobbyCard from '../atom/hobbyCard';

const hobbies = [
  { 
    name: '読書', 
    description: '小説や漫画を読みます．米澤穂信さんの小説が好きです．おすすめの小説や本を教えてほしいです．',
    images: IMAGES.hobbies.reading,
  },
  { 
    name: 'ゲーム', 
    description: 'RPGを良く遊んでいます．のんびりコツコツ進められるゲームが好きです．',
    images: IMAGES.hobbies.gaming
  },
  { 
    name: '一人旅', 
    description: '大学から国内の様々なところに一人で旅行に行っています。旅行先では水族館に毎回行きます。',
    images: IMAGES.hobbies.travel
  },
  { 
    name: 'カフェ巡り', 
    description: '予定のない休日は基本カフェで本を読んでいます。コーヒーよりはカフェオレが好きです。',
    images: IMAGES.hobbies.cafe
  }, 
]

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
    <SectionDiv>
      <Title title="My Hobby" />

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
            <div className="md:w-1/2 px-4">
              <h3 className="text-white text-2xl font-extrabold mb-4">{hobbies[currentIndex].name}</h3>
              <p className="text-gray-300 text-md leading-relaxed text-left">{hobbies[currentIndex].description}</p>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 mb-4 absolute bottom-0 left-0 right-0 px-10">
            <button
              onClick={prevHobby}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Previous hobby"
            >
              <ChevronLeft size={24} />
            </button>
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
            <button
              onClick={nextHobby}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Next hobby"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        {/* Desktop version with all hobbies displayed */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {hobbies.map((hobby, index) => (
            <HobbyCard key={index} hobby={hobby} />
          ))}
        </div>
      </div>
    </SectionDiv>
  )
}

export default HobbySection

