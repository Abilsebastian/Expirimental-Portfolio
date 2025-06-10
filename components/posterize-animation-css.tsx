import Image from "next/image"

const PosterizeAnimationCSS = () => {
  const imageWidth = 1920
  const imageHeight = 1080

  return (
    <div className="group fixed inset-0 w-screen h-screen cursor-pointer">
      {/* Base Image (Low Posterization) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/posterize-low.png"
          alt="Fullscreen desert scene with low posterization"
          width={imageWidth}
          height={imageHeight}
          priority
          className="object-cover w-full h-full"
        />
      </div>

      {/* Overlay Image (High Posterization) - Animates with CSS on hover */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:animate-crossfade group-hover:opacity-100">
        <Image
          src="/images/posterize-high.png"
          alt="Fullscreen desert scene with high posterization"
          width={imageWidth}
          height={imageHeight}
          priority
          className="object-cover w-full h-full"
        />
      </div>

      {/* Title Overlay */}
      <div className="absolute top-[25%] left-1/2 rigt-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <h1
          className="font-serif text-title-red font-normal select-none whitespace-nowrap" // Changed text-red-700 to text-title-red
          style={{ fontSize: "5vw" }}
        >
          START.
        </h1>
      </div>
    </div>
  )
}

export default PosterizeAnimationCSS
