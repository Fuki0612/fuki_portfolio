"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import Navigation from "./components/Navigation"
import HomeSection from "./components/HomeSection"
import AboutSection from "./components/AboutSection"
import HobbySection from "./components/HobbySection"
import WorksSection from "./components/WorksSection"
import SkillSection from "./components/SkillSection"
import ContactSection from "./components/ContactSection"
import { useImagePreloader } from "../hooks/useImagePreloader"
import { IMAGES } from "./constants/images"
import LoadingSpinner from "./components/LoadingSpinner"

const sections = [
  { id: "home", title: "HOME", Component: HomeSection },
  { id: "about", title: "ABOUT", Component: AboutSection },
  { id: "hobby", title: "HOBBY", Component: HobbySection },
  { id: "skill", title: "SKILL", Component: SkillSection },
  { id: "works", title: "WORK", Component: WorksSection },
  { id: "contact", title: "CONTACT", Component: ContactSection },
]

const SCROLL_THRESHOLD = 50

const pageVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction < 0 ? "100%" : "-100%",
    opacity: 0,
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
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollProgress = useMotionValue(0)

  const allImages = [
    ...Object.values(IMAGES.hobbies).flat(),
    ...Object.values(IMAGES.skills),
    ...Object.values(IMAGES.works),
  ]

  const imagesPreloaded = useImagePreloader(allImages)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    setIsScrolling(true)
  }

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isScrolling) return

      const touchY = e.touches[0].clientY
      const diffY = touchStartY.current - touchY

      e.preventDefault()
      const progress = diffY / window.innerHeight
      scrollProgress.set(progress)
    },
    [isScrolling, scrollProgress],
  )

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsScrolling(false)
    const touchEndY = e.changedTouches[0].clientY
    const diffY = touchStartY.current - touchEndY

    if (Math.abs(diffY) >= SCROLL_THRESHOLD) {
      const newDirection = diffY > 0 ? 1 : -1
      const newSection = Math.max(0, Math.min(sections.length - 1, currentSection + newDirection))

      if (newSection !== currentSection) {
        setCurrentSection(newSection)
        setDirection(newDirection)
      }
    }

    scrollProgress.set(0)
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
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.y, velocity.y)

                if (swipe < -SCROLL_THRESHOLD) {
                  scrollToSection(Math.min(sections.length - 1, currentSection + 1))
                } else if (swipe > SCROLL_THRESHOLD) {
                  scrollToSection(Math.max(0, currentSection - 1))
                }
              }}
              style={{
                y: scrollProgress.get() * -100 + "%",
              }}
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

// Determine power of swipe based on velocity
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

