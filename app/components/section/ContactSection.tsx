"use client"

import type React from "react"
import { Mail, Github, Instagram } from "lucide-react"
import Image from "next/image"
import { PlayfairDisplayFont, ShipporiMinchoFont } from "../../font"
import SectionDiv from "../atom/sectionDiv"
import Title from "../atom/title"

const ContactSection: React.FC = () => {
  return (
    <SectionDiv>
      <Title title="Contact me" />
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
            <p className={`${ShipporiMinchoFont.className} text-2xl md:text-3xl font-bold`}>GitHub</p>
          </div>
        </a>
      </div>
      <h3 className={`${PlayfairDisplayFont.className} text-white text-xs md:text-md font-bold pt-5`}>©2025 NAKAMURA FUKI.   All rights resereved</h3>
    </SectionDiv>
  )
}

export default ContactSection

