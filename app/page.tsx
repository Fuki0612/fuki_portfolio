"use client"
import React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "./components/Navigation"
import HomeSection from "./components/HomeSection"
import AboutSection from "./components/AboutSection"
import HobbySection from "./components/HobbySection"
import WorksSection from "./components/WorksSection"
import SkillSection from "./components/SkillSection"
import ContactSection from "./components/ContactSection"
import { useImagePreloader } from "../hooks/useImagePreloader"
import { IMAGES } from "./constants/images"
import { PlayfairDisplayFont } from "./font"
import LoadingSpinner from "./components/LoadingSpinner"

const sections = [
  { id: "home", title: "HOME", Component: HomeSection },
  { id: "about", title: "ABOUT", Component: AboutSection },
  { id: "hobby", title: "HOBBY", Component: HobbySection },
  { id: "skill", title: "SKILL", Component: SkillSection },
  { id: "works", title: "WORK", Component: WorksSection },
  { id: "contact", title: "CONTACT", Component: ContactSection },
]

const SCROLL_THRESHOLD = 100

const pageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? "100%" : "-100%",
  }),
  in: {
    opacity: 1,
    y: 0,
  },
  out: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? "-100%" : "100%",
  }),
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const [direction, setDirection] = useState(0)

  const allImages = [
    ...Object.values(IMAGES.hobbies).flat(),
    ...Object.values(IMAGES.skills),
    ...Object.values(IMAGES.works),
  ]

  const imagesPreloaded = useImagePreloader(allImages)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touchY = e.touches[0].clientY
      const diff = touchStartY.current - touchY

      if (diff > 0) {
        return
      }

      if (currentSection == 0) {
        e.preventDefault()
      }
    },
    [currentSection],
  )

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY

    if (Math.abs(diff) >= SCROLL_THRESHOLD) {
      const newDirection = diff > 0 ? 1 : -1
      const newSection = Math.max(0, Math.min(sections.length - 1, currentSection + newDirection))

      if (newSection !== currentSection) {
        setCurrentSection(newSection)
        setDirection(newDirection)
      }
    }
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()

      if (Math.abs(e.deltaY) >= SCROLL_THRESHOLD) {
        const newDirection = e.deltaY > 0 ? 1 : -1
        const newSection = Math.max(0, Math.min(sections.length - 1, currentSection + newDirection))

        if (newSection !== currentSection) {
          setCurrentSection(newSection)
          setDirection(newDirection)
        }
      }
    },
    [currentSection],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("wheel", handleWheel, { passive: false })
    document.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      container.removeEventListener("wheel", handleWheel)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [handleWheel, handleTouchMove])

  const scrollToSection = (index: number) => {
    setCurrentSection(index)
    setDirection(index > currentSection ? 1 : -1)
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      {imagesPreloaded && (
        <Navigation sections={sections} currentSection={currentSection} scrollToSection={scrollToSection} />
      )}
      <div
        ref={containerRef}
        className="h-full relative pt-0 md:pt-16"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {!imagesPreloaded && <LoadingSpinner />}
        {imagesPreloaded && (
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSection}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
              className="absolute inset-0 flex items-center justify-center py-16 md:py-32"
            >
              {React.createElement(sections[currentSection].Component)}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}

