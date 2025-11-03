'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './BrandCarousel.module.css'

interface Brand {
  id: number
  name: string
  logo: string
  description: string
}

interface BrandCarouselProps {
  brands: Brand[]
  autoScroll?: boolean
  autoScrollInterval?: number
}

export default function BrandCarousel({
  brands,
  autoScroll = true,
  autoScrollInterval = 3000
}: BrandCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [activeBrand, setActiveBrand] = useState<number | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const carouselRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null)

  const updateArrowVisibility = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
      setScrollPosition(scrollLeft)
    }
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      const newPosition = direction === 'left'
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, brandId: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActiveBrand(activeBrand === brandId ? null : brandId)
    }
  }

  const handleArrowKeyDown = (e: React.KeyboardEvent, direction: 'left' | 'right') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      scroll(direction)
    }
  }

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const brandId = parseInt(entry.target.getAttribute('data-brand-id') || '0')
            setLoadedImages(prev => {
              const newSet = new Set(prev)
              newSet.add(brandId)
              return newSet
            })
          }
        })
      },
      { rootMargin: '50px' }
    )

    const brandCards = document.querySelectorAll('[data-brand-id]')
    brandCards.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    if (autoScroll && !isPaused) {
      autoScrollTimerRef.current = setInterval(() => {
        if (scrollContainerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current

          if (scrollLeft >= scrollWidth - clientWidth - 10) {
            // Reset to beginning
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
          } else {
            // Scroll to next item
            scroll('right')
          }
        }
      }, autoScrollInterval)
    }

    return () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current)
      }
    }
  }, [autoScroll, isPaused, autoScrollInterval])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateArrowVisibility)
      updateArrowVisibility()

      return () => scrollContainer.removeEventListener('scroll', updateArrowVisibility)
    }
  }, [])

  // Handle resize
  useEffect(() => {
    const handleResize = () => updateArrowVisibility()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div
      className={styles.carouselWrapper}
      ref={carouselRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Brand showcase carousel"
      role="region"
    >
      <button
        className={`${styles.arrowButton} ${styles.leftArrow} ${!showLeftArrow ? styles.hidden : ''}`}
        onClick={() => scroll('left')}
        onKeyDown={(e) => handleArrowKeyDown(e, 'left')}
        aria-label="Scroll to previous brands"
        disabled={!showLeftArrow}
        tabIndex={showLeftArrow ? 0 : -1}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div
        className={styles.scrollContainer}
        ref={scrollContainerRef}
        role="list"
      >
        {brands.map((brand) => (
          <div
            key={brand.id}
            className={styles.brandCard}
            data-brand-id={brand.id}
            role="listitem"
            tabIndex={0}
            aria-label={`${brand.name}: ${brand.description}`}
            onClick={() => setActiveBrand(activeBrand === brand.id ? null : brand.id)}
            onKeyDown={(e) => handleKeyDown(e, brand.id)}
          >
            <div className={styles.logoContainer}>
              {loadedImages.has(brand.id) ? (
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className={styles.logo}
                  loading="lazy"
                />
              ) : (
                <div className={styles.logoPlaceholder} />
              )}
            </div>

            <div
              className={`${styles.description} ${activeBrand === brand.id ? styles.active : ''}`}
              role="tooltip"
              aria-hidden={activeBrand !== brand.id}
            >
              <h3>{brand.name}</h3>
              <p>{brand.description}</p>
            </div>

            <div className={styles.hoverOverlay} aria-hidden="true" />
          </div>
        ))}
      </div>

      <button
        className={`${styles.arrowButton} ${styles.rightArrow} ${!showRightArrow ? styles.hidden : ''}`}
        onClick={() => scroll('right')}
        onKeyDown={(e) => handleArrowKeyDown(e, 'right')}
        aria-label="Scroll to next brands"
        disabled={!showRightArrow}
        tabIndex={showRightArrow ? 0 : -1}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {isPaused && (
        <div className={styles.pausedIndicator} aria-live="polite" aria-atomic="true">
          Carousel paused
        </div>
      )}
    </div>
  )
}
