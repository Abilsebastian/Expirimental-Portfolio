"use client"

import Image from "next/image"
import { useState } from "react"

const PosterizeAnimationCSS = () => {
  const imageWidth = 1920
  const imageHeight = 1080
  const [hoveringArt, setHoveringArt] = useState(false)

  return (
    <div className="fixed inset-0 w-screen h-screen">
      {/* Base Image (Low Posterization) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/posterize-low.png"
          alt="Fullscreen desert scene with low posterization"
          width={imageWidth}
          height={imageHeight}
          priority
          className="object-cover w-full h-full transition-opacity duration-700 opacity-0"
          style={{ opacity: 0 }}
        />
      </div>

      {/* Overlay Image (High Posterization) - Always visible */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/posterize-high.png"
          alt="Fullscreen desert scene with high posterization"
          width={imageWidth}
          height={imageHeight}
          priority
          className="object-cover w-full h-full transition-opacity duration-700 opacity-100"
          style={{ opacity: 1 }}
        />
      </div>

      {/* Title Overlay */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none">
        <h1
          className="font-serif text-title-red font-normal whitespace-nowrap"
          style={{ fontSize: "5vw" }}
        >
          <span
            className="inline-block pointer-events-auto transition-opacity duration-700 ease-in-out"
            style={{
              opacity: hoveringArt ? 0.2 : 1,
            }}
          >
            ST
          </span>
          <span
            className="inline-block pointer-events-auto cursor-pointer"
            onMouseEnter={() => setHoveringArt(true)}
            onMouseLeave={() => setHoveringArt(false)}
            style={{ pointerEvents: "auto" }}
          >
            ART.
          </span>
        </h1>
      </div>
    </div>
  )
}

export default PosterizeAnimationCSS
