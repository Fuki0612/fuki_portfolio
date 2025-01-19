import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PlayfairDisplayFont, ShipporiMinchoFont } from '../font'
import { IMAGES } from '../constants/images'
import { PreloadedImage } from './PreloadedImage'

type Skill = {
  name: string;
  icon: string;
  invisible?: boolean;
};

const skills: Skill[] = [
  { name: 'HTML', icon: IMAGES.skills.html },
  { name: 'CSS', icon: IMAGES.skills.css },
  { name: 'JavaScript', icon: IMAGES.skills.javascript },
  { name: 'TypeScript', icon: IMAGES.skills.typescript },
  { name: 'C', icon: IMAGES.skills.c },
  { name: 'C++', icon: IMAGES.skills.cpp },
  { name: 'Python', icon: IMAGES.skills.python },
  { name: 'Dart', icon: IMAGES.skills.dart },
  { name: 'React', icon: IMAGES.skills.react },
  { name: 'Next.js', icon: IMAGES.skills.nextjs },
  { name: 'Tailwind CSS', icon: IMAGES.skills.tailwind },
  { name: 'Flutter', icon: IMAGES.skills.flutter },
  { name: 'VSCode', icon: IMAGES.skills.vscode },
  { name: 'Git Github', icon: IMAGES.skills.github },
  { name: 'invisible1', icon: '', invisible: true },
  { name: 'invisible2', icon: '', invisible: true },
]

const SkillCard: React.FC<{ skill: Skill; index: number }> = React.memo(({ skill, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-gray-800 rounded-lg p-6 flex flex-col items-center"
    whileHover={{ scale: 1.05, backgroundColor: '#2d3748' }}
  >
    <PreloadedImage
      src={skill.icon || "/placeholder.svg"}
      alt={skill.name}
      width={96}
      height={96}
      className="w-24 h-24 rounded-full mb-4 transition-colors duration-300 bg-gray-800"
    />
    <h3 className="text-white text-xl font-bold">{skill.name}</h3>
  </motion.div>
))

SkillCard.displayName = 'SkillCard'

const SkillSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const skillsPerPage = 4
  const totalPages = Math.ceil(skills.length / skillsPerPage)

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
  }

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages)
  }

  const currentSkills = skills.slice(currentPage * skillsPerPage, (currentPage + 1) * skillsPerPage)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center px-4 md:px-6 lg:px-8 h-full flex flex-col justify-center py-32 md:py-64"
    >
      <h2 className={`${PlayfairDisplayFont.className} text-white text-4xl md:text-6xl font-bold mb-4`}>My Skills</h2>
      <div className="w-full max-w-7xl mx-auto">

        {/* Mobile version with navigation */}
        <div className="md:hidden px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 md:gap-6"
            >
              {currentSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center ${skill.invisible ? 'invisible' : ''}`}
                >
                  <div className="bg-gray-700 rounded-full p-6 mb-3 transition-colors duration-300">
                    <PreloadedImage
                      src={skill.icon || "/placeholder.svg"}
                      alt={skill.name}
                      width={64}
                      height={64}
                      className="w-16 h-16"
                    />
                  </div>
                  <h3 className={`${ShipporiMinchoFont.className} text-white text-lg font-bold`}>{skill.name}</h3>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={prevPage}
              className="bg-gray-70 text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Previous skills"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex justify-center space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentPage ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to skills page ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              className="bg-gray-700 text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Next skills"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Desktop version with all skills displayed */}
        <div className="hidden md:grid grid-cols-3 lg:grid-cols-7 gap-6 md:gap-8">
          {skills.filter(skill => !skill.invisible).map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default SkillSection

