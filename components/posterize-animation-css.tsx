"use client"

import Image from "next/image"
import { useState } from "react"

const PosterizeAnimationCSS = () => {
  const imageWidth = 1920
  const imageHeight = 1080
  const [hoveringArt, setHoveringArt] = useState(false)

  return (
    <div className="fixed inset-0 w-screen h-screen">
      {/* Posterize Images Crossfade */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/posterize-low.png"
          alt="Posterize Low"
          width={imageWidth}
          height={imageHeight}
          className={`object-cover w-full h-full transition-opacity duration-700 ease-in-out ${
            hoveringArt ? "opacity-0" : "opacity-100"
          }`}
          priority
        />
        <Image
          src="/images/posterize-high.png"
          alt="Posterize High"
          width={imageWidth}
          height={imageHeight}
          className={`object-cover w-full h-full absolute inset-0 transition-opacity duration-700 ease-in-out ${
            hoveringArt ? "opacity-0" : "opacity-100"
          }`}
          priority
        />
      </div>

      {/* Green Screen Image Fade In On Hover */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/images/green screen 1.png"
          alt="Green Colorful"
          width={imageWidth}
          height={imageHeight}
          className={`object-cover w-full h-full transition-opacity duration-700 ease-in-out ${
            hoveringArt ? "opacity-100" : "opacity-0"
          }`}
          priority
        />
      </div>

      {/* Title Overlay */}
      <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none">
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
