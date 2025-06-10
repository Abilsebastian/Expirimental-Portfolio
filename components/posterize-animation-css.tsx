"use client"

import Image from "next/image"
import { useState } from "react"

const PosterizeAnimationCSS = () => {
  const imageWidth = 1920
  const imageHeight = 1080
  const [hoveringArt, setHoveringArt] = useState(false)
  const [audio] = useState(
    typeof window !== "undefined"
      ? new Audio("/audio/your-audio-file.mp3")
      : null
  )

  const handlePlay = () => {
    if (audio) {
      audio.currentTime = 0
      audio.play()
    }
  }

  return (
    <div className="fixed inset-0 w-screen h-screen">
      {/* Posterize Images Crossfade */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/posterize-low.png"
          alt="Posterize Low"
          width={imageWidth}
          height={imageHeight}
          style={{
            willChange: "opacity",
            transition: "opacity 0.8s cubic-bezier(0.4,0,0.2,1)",
            opacity: hoveringArt ? 0 : 1,
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          priority
        />
        <Image
          src="/images/posterize-high.png"
          alt="Posterize High"
          width={imageWidth}
          height={imageHeight}
          style={{
            willChange: "opacity",
            transition: "opacity 0.8s cubic-bezier(0.4,0,0.2,1)",
            opacity: hoveringArt ? 0 : 1,
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
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
          style={{
            willChange: "opacity",
            transition: "opacity 0.8s cubic-bezier(0.4,0,0.2,1)",
            opacity: hoveringArt ? 1 : 0,
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
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
            className="inline-block pointer-events-auto"
            style={{
              willChange: "opacity",
              transition: "opacity 0.8s cubic-bezier(0.4,0,0.2,1)",
              opacity: hoveringArt ? 0.2 : 1,
            }}
          >
            ST
          </span>
          <span
            className="inline-block pointer-events-auto cursor-pointer relative"
            onMouseEnter={() => setHoveringArt(true)}
            onMouseLeave={() => setHoveringArt(false)}
            style={{
              pointerEvents: "auto",
              transition: "color 0.8s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            ART.
            {/* Play button, only visible on hover */}
            {hoveringArt && (
              <button
                onClick={handlePlay}
                className="pointer-events-auto bg-transparent border-none p-0 m-0 shadow-none play-btn cube-btn"
                style={{
                  position: "absolute",
                  left: "72%",
                  bottom: "-0.2em",
                  width: "1em",
                  height: "1.8em",
                  fontSize: "1em",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  opacity: 1,
                  transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                  perspective: "10000px",
                  background: "none",
                  scale: 0.2,
                }}
                tabIndex={0}
                aria-label="Play audio"
                onMouseEnter={e => {
                  e.currentTarget.classList.add("spin-cube");
                }}
                onMouseLeave={e => {
                  e.currentTarget.classList.remove("spin-cube");
                }}
              >
                <div className="cube">
                  <div className="face front">▶</div>
                  <div className="face back"></div>
                  <div className="face right"></div>
                  <div className="face left"></div>
                  <div className="face top"></div>
                  <div className="face bottom"></div>
                </div>
              </button>
            )}
          </span>
        </h1>
      </div>
    </div>
  )
}

export default PosterizeAnimationCSS
