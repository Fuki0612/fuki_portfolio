import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { PlayfairDisplayFont, ShipporiMinchoFont } from '../font';

interface NavigationProps {
  sections: { id: string; title: string }[]
  currentSection: number
  scrollToSection: (index: number) => void
}

const Navigation: React.FC<NavigationProps> = ({ sections, currentSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="fixed top-0 right-0 p-4 z-50">
      <button
        onClick={toggleMenu}
        className="md:hidden bg-gray-800 text-white p-2 rounded-full"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col space-y-2 mt-2 md:mt-0 bg-gray-800 md:bg-transparent p-2 rounded-lg`}>
        {sections.map((section, index) => (
          <li key={section.id}>
            <button
              className={`text-white px-4 py-2 rounded-full transition-all duration-300 ${
                PlayfairDisplayFont.className,
                currentSection === index 
                  ? 'bg-blue-600 shadow-lg' 
                  : 'hover:bg-gray-700'
              }`}
              onClick={() => {
                scrollToSection(index)
                setIsMenuOpen(false)
              }}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation