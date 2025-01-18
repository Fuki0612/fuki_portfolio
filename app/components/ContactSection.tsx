import React from 'react'
import { motion } from 'framer-motion'
import { Github, Instagram } from 'lucide-react'
import Image from 'next/image'
import { PlayfairDisplayFont, ShipporiMinchoFont } from '../font'

const ContactSection: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center px-4 md:px-6 lg:px-8 py-32 md:py-64"
    >
      <h2 className={`${PlayfairDisplayFont.className} text-white text-4xl md:text-6xl font-bold mb-4`}>Contact Me</h2>
      <div className="max-w-xl mx-auto">
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:outline-none"
          ></textarea>
          <button
            type="submit"
            className={`${ShipporiMinchoFont.className} w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300`}
          >
            Send Message
          </button>
        </form>
      </div>
      <div className="mt-8">
        <h2 className={`${PlayfairDisplayFont.className} text-white text-3xl font-bold mb-4`}>My SNS Links</h2>
        <div className="flex justify-center space-x-6">
          <a href="https://line.me/your-line-id" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
          <Image src="LINE.png" alt="LINE" width={48} height={48} />
          </a>
          <a href="https://www.instagram.com/your-instagram-handle" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <Instagram size={48} />
          </a>
          <a href="https://github.com/your-github-username" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
            <Github size={48} />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default ContactSection

