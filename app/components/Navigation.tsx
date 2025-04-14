import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

interface NavigationProps {
  sections: { id: string; title: string }[]
  currentSection: number
  scrollToSection: (index: number) => void
}

const Navigation: React.FC<NavigationProps> = ({ sections, currentSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Desktop Navigation */}
      <div className="hidden md:block bg-gray-900 bg-opacity-80 p-4">
        <ul className="flex justify-center space-x-4">
          <li>
            <Image src="/icons/icon-72x72.png" alt="Portfolio Icon" width={40} height={40} className="rounded-full" />
          </li>
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                className={`text-white px-4 py-2 rounded-full transition-all duration-300 ${
                  currentSection === index 
                    ? 'bg-blue-700 shadow-lg' 
                    : 'hover:bg-gray-700'
                }`}
                onClick={() => scrollToSection(index)}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="fixed top-4 right-4 bg-gray-800 text-white p-2 rounded-full z-50"
          aria-label="Open menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <div className={`fixed inset-y-0 right-0 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} w-64 bg-transparent overflow-y-auto transition duration-300 ease-in-out z-40`}>
          <div className="p-6 bg-gray-900 bg-opacity-80 h-screen">
          <div className="flex justify-between items-center mb-6">
              <Image src="/icons/icon-72x72.png" alt="Portfolio Icon" width={40} height={40} className="rounded-full" />
              <button onClick={toggleMenu} className="bg-gray-800 p-2 rounded-full" aria-label="Close menu">
                <X size={24} />
              </button>
            </div>
            <ul className="space-y-4">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <button
                    className={`text-yellow-500 w-full text-left px-4 py-2 rounded-full transition-all duration-300 ${
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
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
