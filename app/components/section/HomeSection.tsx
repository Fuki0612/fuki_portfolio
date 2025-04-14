import React from 'react'
import { motion } from 'framer-motion'
import { PlayfairDisplayFont, ShipporiMinchoFont} from '../../font'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const HomeSection: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center flex flex-col items-center justify-center h-full px-4 md:px-6 lg:px-8 py-32 md:py-64"
    >
      <motion.h2 
        variants={itemVariants}
        className={`${PlayfairDisplayFont.className} text-white text-6xl md:text-9xl font-extrabold mb-6 tracking-tight leading-tight`}
      >
        {['Welcome to', 'Fuki Nakamura', 'Portfolio'].map((line, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.5 }}
            className="block"
          >
            {line}
          </motion.span>
        ))}
      </motion.h2>
      <motion.p 
        variants={itemVariants}
        className={`${ShipporiMinchoFont.className} text-white text-xl md:text-2xl mb-8 max-w-4xl mx-auto`}
      >
        Thank you for visiting my portfolio site.
      </motion.p>
      <motion.p 
        variants={itemVariants}
        className={`${ShipporiMinchoFont.className} text-gray-400 text-lg md:text-xl animate-bounce`}
      >
        ↓ Please Scroll Down ↓
      </motion.p>
    </motion.div>
  )
}

export default HomeSection

