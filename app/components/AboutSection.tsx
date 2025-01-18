import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PlayfairDisplayFont,ShipporiMinchoFont } from '../font';

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

const AboutSection: React.FC = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center h-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto py-32 md:py-64"
    >
      <motion.div variants={itemVariants} className="md:w-1/3 mb-8 md:mb-0">
        <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden">
          <Image
            src="/me.jpg"
            alt="Fuki Nakamura"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </motion.div>
      <div className="md:w-2/3 text-center md:text-left">
        <motion.h2 variants={itemVariants} className={`${PlayfairDisplayFont.className} text-white text-4xl md:text-6xl font-bold mb-4`}>About Me</motion.h2>
        <motion.h3 variants={itemVariants} className={`${ShipporiMinchoFont.className} text-white text-3xl md:text-4xl font-bold mb-6`}>中村 風稀 <span className='block'>- Fuki Nakamura</span></motion.h3>
        <motion.p variants={itemVariants} className={`${ShipporiMinchoFont.className} text-gray-300 text-lg md:text-xl max-w-3xl space-y-4 text-left`}>
          静岡県磐田市出身（2004年6月生まれ）<br/>
          高校時代、部活でプログラミングに出会い、自作ゲームコンテストで2年連続受賞。その後、名古屋大学情報学部コンピュータ科学科に進学。<br/>
          大学進学後はアプリ開発サークルに入り、大学の講義とサークル活動を通してプログラミングについて日々学習中。
        </motion.p>
      </div>
    </motion.div>
  )
}

export default AboutSection

