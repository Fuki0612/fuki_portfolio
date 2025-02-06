"use client"
import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
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
const scrollCooldown = 800 // 切り替え後の待機時間 (ミリ秒)

const pageVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "50%" : "-50%",
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    y: direction < 0 ? "50%" : "-50%",
    opacity: 0,
    scale: 0.8,
  }),
}

const pageTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const [direction, setDirection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollProgress = useMotionValue(0)
  const lastScrollTime = useRef(0)

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

      const progress = Math.max(0, Math.min(1, diffY / window.innerHeight))
      scrollProgress.set(progress)
    },
    [isScrolling, scrollProgress],
  )

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsScrolling(false)
    const touchEndY = e.changedTouches[0].clientY
    const diffY = touchStartY.current - touchEndY

    const currentTime = Date.now()
    if (currentTime - lastScrollTime.current < scrollCooldown) {
      scrollProgress.set(0)
      return
    }

    if (Math.abs(diffY) >= SCROLL_THRESHOLD) {
      const newDirection = diffY > 0 ? 1 : -1
      const newSection = Math.max(0, Math.min(sections.length - 1, currentSection + newDirection))

      if (newSection !== currentSection) {
        setCurrentSection(newSection)
        setDirection(newDirection)
        lastScrollTime.current = currentTime
      }
    }

    scrollProgress.set(0)
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault()

      const currentTime = Date.now()
      if (currentTime - lastScrollTime.current < scrollCooldown) {
        return
      }

      if (Math.abs(e.deltaY) >= SCROLL_THRESHOLD) {
        const newDirection = e.deltaY > 0 ? 1 : -1
        const newSection = Math.max(0, Math.min(sections.length - 1, currentSection + newDirection))

        if (newSection !== currentSection) {
          setCurrentSection(newSection)
          setDirection(newDirection)
          lastScrollTime.current = currentTime
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

  useEffect(() => {
    const preventPullToRefresh = (e: TouchEvent) => {
      if (window.scrollY === 0 && e.touches[0].clientY > e.touches[0].screenY) {
        e.preventDefault() // 上スワイプ時のデフォルト動作を防ぐ
      }
    }

    document.addEventListener("touchmove", preventPullToRefresh, { passive: false })

    return () => {
      document.removeEventListener("touchmove", preventPullToRefresh)
    }
  }, [])

  const scrollToSection = (index: number) => {
    const currentTime = Date.now()
    if (currentTime - lastScrollTime.current < scrollCooldown) {
      return
    }

    setCurrentSection(index)
    setDirection(index > currentSection ? 1 : -1)
    lastScrollTime.current = currentTime
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
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSection}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
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

