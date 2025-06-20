import Image from "next/image";

interface Props {
  playClicked: boolean;
  hoveringArt: boolean;
  parallax: { x: number; y: number };
  imageWidth: number;
  imageHeight: number;
}

const PosterizeBackground = ({
  playClicked,
  hoveringArt,
  parallax,
  imageWidth,
  imageHeight,
}: Props) => {
  const bgTransform = playClicked
    ? `scale(1.15) translate3d(${parallax.x * 8}px, ${parallax.y * 8}px, 0)`
    : "scale(1.2)";

  return (
    <div className="absolute inset-0 z-0">
      <Image
        src="/images/posterize-low.png"
        alt="Posterize Low"
        width={imageWidth}
        height={imageHeight}
        style={{
          willChange: "opacity, transform",
          transition: playClicked
            ? "none"
            : "opacity 2.5s cubic-bezier(0.4,0,0.2,1), transform 0.15s cubic-bezier(0.4,0,0.2,1)",
          opacity: playClicked ? 0 : 1,
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: bgTransform,
        }}
        priority
      />
      <Image
        src="/images/posterize-high.png"
        alt="Posterize High"
        width={imageWidth}
        height={imageHeight}
        style={{
          willChange: "opacity, transform",
          transition: playClicked
            ? "none"
            : "opacity 2.5s cubic-bezier(0.4,0,0.2,1), transform 0.15s cubic-bezier(0.4,0,0.2,1)",
          opacity: playClicked ? 0 : 1,
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: bgTransform,
        }}
        priority
      />
      <Image
        src="/images/green screen 1.png"
        alt="Green Colorful"
        width={imageWidth}
        height={imageHeight}
        style={{
          willChange: "opacity, transform",
          transition: "opacity 2.5s cubic-bezier(0.4,0,0.2,1), transform 0.15s cubic-bezier(0.4,0,0.2,1)",
          opacity: playClicked ? 0 : hoveringArt ? 1 : 0,
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          transform: bgTransform,
        }}
        priority
      />
      <Image
        src="/images/zoomout.png"
        alt="Zoomout"
        width={imageWidth}
        height={imageHeight}
        style={{
          willChange: "opacity, transform",
          transition: "opacity 2.5s cubic-bezier(0.4,0,0.2,1), transform 0.15s cubic-bezier(0.4,0,0.2,1)",
          opacity: playClicked ? 1 : 0,
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: bgTransform,
        }}
        priority
      />
    </div>
  );
};

export default PosterizeBackground;