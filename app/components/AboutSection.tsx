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
      className="flex flex-col md:flex-row items-center justify-center h-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-8 md:py-64"
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
        <motion.h2 variants={itemVariants} className={`${PlayfairDisplayFont.className} text-white text-3xl md:text-6xl font-bold mb-4`}>About Me</motion.h2>
        <motion.h3 variants={itemVariants} className={`${ShipporiMinchoFont.className} text-white text-2xl md:text-4xl font-bold mb-6`}>中村 風稀 <span className='block'>- Fuki Nakamura</span></motion.h3>
        <motion.p variants={itemVariants} className={`${ShipporiMinchoFont.className} text-gray-300 text-1xl md:text-xl max-w-3xl space-y-4 text-left`}>
          2004年6月12日に静岡県で生まれる．<br />
          幼少期はロボットが好きでロボットを作る仕事に憧れていた．<br />
          やがて機械のハードウェアよりもソフトウェアの分野に惹かれ，システムやプログラミングへの興味を深める．<br />
          その後大学ではコンピュータ科学を専攻する．<br />
        </motion.p>
      </div>
    </motion.div>
  )
}

export default AboutSection

