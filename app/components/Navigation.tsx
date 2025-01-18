import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

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
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                className={`text-white px-4 py-2 rounded-full transition-all duration-300 ${
                  currentSection === index 
                    ? 'bg-blue-600 shadow-lg' 
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
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <div className={`fixed inset-y-0 right-0 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} w-64 bg-transparent overflow-y-auto transition duration-300 ease-in-out z-40`}>
          <div className="p-6">
            <ul className="space-y-4">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <button
                    className={`text-white w-full text-left px-4 py-2 rounded-full transition-all duration-300 ${
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
