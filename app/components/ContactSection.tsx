"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Mail, Github, Instagram } from "lucide-react"
import Image from "next/image"
import { PlayfairDisplayFont, ShipporiMinchoFont } from "../font"

const ContactSection: React.FC = () => {
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="text-center px-4 md:px-6 lg:px-8 py-32 md:py-64 "
    >
      <h2 className={`${PlayfairDisplayFont.className} text-white text-4xl md:text-6xl font-bold mb-4`}>Contact Me</h2>
      <div className="mt-8">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <a
            href="mailto:fukimax0612@gmail.com"
            className="text-white hover:text-gray-300 hover:bg-black/30 hover:opacity-50 p-2 rounded-lg"
          >
            <div className="flex gap-4 items-center">
              <Mail size={48} />
              <div>
                <p className={`${ShipporiMinchoFont.className} text-2xl md:text-3xl font-bold`}>Email</p>
                <p className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                  fukimax0612@gmail.com
                </p>
              </div>
            </div>
          </a>
          <a
            href="https://line.me/ti/p/FZeMViLtax"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 hover:bg-black/30 hover:opacity-50 p-2 rounded-lg"
          >
            <div className="flex gap-4 items-center">
              <Image src="/icons/line.png" alt="LINE" width={48} height={48} />
              <p className={`${ShipporiMinchoFont.className} text-2xl md:text-3xl font-bold`}>LINE</p>
            </div>
          </a>
          <a
            href="https://www.instagram.com/kaza_mare?igsh=MWw2bGNra2s5czRkdg=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 hover:bg-black/30 hover:opacity-50 p-2 rounded-lg"
          >
            <div className="flex gap-4 items-center">
              <Instagram size={48} />
              <p className={`${ShipporiMinchoFont.className} text-2xl md:text-3xl font-bold`}>Instagram</p>
            </div>
          </a>
          <a
            href="https://github.com/Fuki0612"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 hover:bg-black/30 hover:opacity-50 p-2 rounded-lg"
          >
            <div className="flex gap-4 items-center">
              <Github size={48} />
              <p className={`${ShipporiMinchoFont.className} text-2xl md:text-3xl font-bold`}>Github</p>
            </div>
          </a>
        </div>
      </div>
    </motion.div>
    <h3 className={`${PlayfairDisplayFont.className} text-white text-xs font-bold mb-1 bottom-0 right-1 absolute`}>©2024 NAKAMURA FUKI.   All rights resereved</h3>
    </>
  )
}

export default ContactSection

