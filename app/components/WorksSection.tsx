import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Images } from 'lucide-react'
import { PlayfairDisplayFont, ShipporiMinchoFont } from '../font'
import Image from 'next/image'
import { IMAGES } from '../constants/images'
import { PreloadedImage } from './PreloadedImage'

const works = [
  {
    title: 'Lights Out',
    description: '自力で作品を作りたいと思い、1年の秋に作製。今見るとお粗末な出来ですね。',
    technologies: ['HTML', 'CSS', 'javascript'],
    icon: IMAGES.works.lightsOut, 
  },
  {
    title: 'OXゲーム',
    description: '大学の講義で作ったC言語のCLIのOXゲームをjavascriptでGUI化したものです。',
    technologies: ['HTML', 'CSS', 'javascript','C'],
    icon: IMAGES.works.oxGame,
  },
  {
    title: 'fifteel',
    description: '1年次に参加したJPhacksで作成した作品。主にchrome拡張機能を作成しました。',
    technologies: ['javascript', 'Python', 'LLM', 'chrome拡張'],
    icon: IMAGES.works.fifteel,
  },
  {
    title: 'FAST PENGUIN',
    description: '2年5月のサークルのハッカソンで作成した作品。Unityを使って作成しました。',
    technologies: ['C#','Unity'],
    icon: IMAGES.works.fastPenguin,
  },
  {
    title: 'POP TURN',
    description: '2年次に参加したJP HACKSで作成した作品。主にフロントエンドを担当しました。',
    technologies: ['firebase', 'chatgpt', 'python', 'typescript','Next.js'],
    icon: IMAGES.works.popTurn,
  },
  //{
  //  title: 'スマート名刺',
  //  description: 'NFCタグにポートフォリオサイトのURLを埋め込み、シールを貼って名刺にしたものです。',
  //  technologies: ['typescript','Next.js'],
  //  icon: '/placeholder.svg',
  //},
]

const WorksSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextWork = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % works.length)
  }

  const prevWork = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + works.length) % works.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center px-4 md:px-6 lg:px-8 h-full flex flex-col justify-center py-32 md:py-64"
    >
      <h2 className={`${PlayfairDisplayFont.className} text-white text-4xl md:text-6xl font-bold mb-4`}>My Works</h2>
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
              className="bg-gray-800 rounded-lg p-6 text-left min-h-[300px] flex flex-col justify-between"
            >
              <div className="px-4">
                <h3 className={`${ShipporiMinchoFont.className} text-white text-2xl mb-2 flex items-center`}>
                  <PreloadedImage
                    src={works[currentIndex].icon || "/placeholder.svg"}
                    alt={`${works[currentIndex].title} icon`}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  {works[currentIndex].title}
                </h3>
                <p className={`${ShipporiMinchoFont.className} text-gray-400 mb-4`}>{works[currentIndex].description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {works[currentIndex].technologies.map((tech, i) => (
                  <span key={i} className="bg-blue-600 text-white text-sm px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between items-center mt-6 mb-4">
            <button
              onClick={prevWork}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Previous work"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextWork}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Next work"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="mt-2 flex justify-center space-x-2 mb-4">
            {works.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-600'
                }`}
                aria-label={`Go to work ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop version with all works displayed */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {works.map((work, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-6 text-left"
            >
              <h3 className="text-white text-2xl mb-2 flex items-center">
                <PreloadedImage
                  src={work.icon || "/placeholder.svg"}
                  alt={`${work.title} icon`}
                  width={24}
                  height={24}
                  className="mr-2"
                />
                {work.title}
              </h3>
              <p className="text-gray-400 mb-4">{work.description}</p>
              <div className="flex flex-wrap gap-2">
                {work.technologies.map((tech, i) => (
                  <span key={i} className="bg-blue-600 text-white text-sm px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default WorksSection

