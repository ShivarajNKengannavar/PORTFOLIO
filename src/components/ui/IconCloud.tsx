"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

interface IconCloudProps {
  images: string[]
  skills: string[]
  activeSkills?: string[]
}

export function IconCloud({ images, skills, activeSkills }: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        duration: 60,
        repeat: Infinity,
        ease: "linear",
      },
    })
  }, [controls])

  // Filter images and skills based on activeSkills if provided
  const filteredImages = activeSkills 
    ? images.filter((_, index) => activeSkills.includes(skills[index]))
    : images

  const filteredSkills = activeSkills || skills

  // Handle image loading errors
  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index))
  }

  // Fallback icon URL (using a generic icon or text)
  const getFallbackIcon = (skill: string) => {
    // Try different fallback strategies
    const fallbacks = [
      `https://cdn.simpleicons.org/${skill.toLowerCase()}/${skill.toLowerCase()}`,
      `https://cdn.simpleicons.org/${skill.toLowerCase()}`,
      `https://ui-avatars.com/api/?name=${encodeURIComponent(skill)}&background=random&color=fff`,
      `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23667EE8"><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="12">${skill.charAt(0).toUpperCase()}</text></svg>`
    ]
    return fallbacks[0]
  }

  // Remove duplicates from filteredSkills for display
  const uniqueFilteredSkills = [...new Set(filteredSkills)]
  const uniqueFilteredImages = uniqueFilteredSkills.map((skill, index) => {
    // Find the first occurrence of this skill in the original skills array
    const originalIndex = skills.findIndex(s => s === skill)
    if (originalIndex !== -1) {
      return images[originalIndex]
    }
    return getFallbackIcon(skill)
  })

  return (
    <TooltipProvider delayDuration={0}>
      <motion.div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        animate={controls}
      >
        {uniqueFilteredImages.map((image, index) => {
          const angle = (index / uniqueFilteredImages.length) * 2 * Math.PI
          const radius = 200 // Increased radius to place icons outside rings
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius

          const hasError = imageErrors.has(index)
          const displayImage = hasError ? getFallbackIcon(uniqueFilteredSkills[index]) : image

          return (
            <motion.div
              key={`${uniqueFilteredSkills[index]}-${index}`}
              className="absolute"
              style={{
                x,
                y,
                translateX: "-50%",
                translateY: "-50%",
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.img
                    src={displayImage}
                    alt={`Skill ${uniqueFilteredSkills[index]}`}
                    onError={() => handleImageError(index)}
                    className={`rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
                      hoveredIndex === index ? 'w-16 h-16 p-3 z-50' : 'w-10 h-10 p-2'
                    } ${hasError ? 'bg-gradient-to-br from-primary/20 to-accent/20' : 'bg-white'}`}
                    style={{
                      objectFit: hasError ? 'contain' : 'cover',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ 
                      scale: 1.5, 
                      zIndex: 50,
                      transition: { duration: 0 }
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  />
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  align="center"
                  className="bg-card/95 backdrop-blur-sm border-primary/20 text-foreground font-medium px-3 py-1.5 text-sm shadow-lg"
                  sideOffset={8}
                >
                  <span className="inline-block" style={{ transform: 'rotate(0deg)' }}>
                    {uniqueFilteredSkills[index]}
                  </span>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          )
        })}
      </motion.div>
    </TooltipProvider>
  )
}
