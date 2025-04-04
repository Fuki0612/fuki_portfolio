import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { PlayfairDisplayFont } from '../font'
import { useRouter } from 'next/navigation'
import { IoArrowBackOutline } from "react-icons/io5";

export const BookHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop Navigation */}
      <div className="hidden md:block bg-gray-900 bg-opacity-80 p-4">
        <ul className="flex justify-center space-x-4 items-center">
          <li>
            <IoArrowBackOutline size={30} onClick={() => router.back()}/>
          </li>
          <li>
            <Image src="/icon-72x72.png" alt="Portfolio Icon" width={40} height={40} className="rounded-full hover:cursor-pointer" onClick={() => router.push("/")}/>
          </li>
          <li>
            <div className={`${PlayfairDisplayFont.className} text-xl text-white px-4 py-1 rounded-full transition-all duration-300 hover:bg-gray-700`}>
              About my hobby of reading
            </div>
          </li>
        </ul>
      </div>
      </nav>
  )
}