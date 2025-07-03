import React from "react";
import PlayButton from "./PlayButton";

interface TitleGlitchProps {
  showDamn: boolean;
  glitching: boolean;
  hoveringArt: boolean;
  handleArtEnter: () => void;
  handleArtLeave: () => void;
  playBtnRef: React.RefObject<HTMLButtonElement>;
  playIconRef: React.RefObject<HTMLSpanElement>;
  handlePlay: () => void;
  handlePointerMove: (e: React.MouseEvent) => void;
  handlePointerLeave: () => void;
}

const TitleGlitch: React.FC<TitleGlitchProps> = ({
  showDamn,
  glitching,
  hoveringArt,
  handleArtEnter,
  handleArtLeave,
  playBtnRef,
  playIconRef,
  handlePlay,
  handlePointerMove,
  handlePointerLeave,
}) => (
  <div className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none select-none">
    <h1
      className={`font-serif text-title-red font-normal whitespace-nowrap ${glitching ? "glitch" : ""}`}
      style={{ fontSize: "5vw" }}
    >
      {showDamn ? (
        <span
          className="glitch-tv inline-block pointer-events-auto"
          style={{
            color: "#720000",
            pointerEvents: "auto",
            transition: "color 0.8s cubic-bezier(0.4,0,0.2,1)",
          }}
          data-text="DAMN."
        >
          DAMN.
        </span>
      ) : (
        <>
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
            onMouseEnter={handleArtEnter}
            onMouseLeave={handleArtLeave}
            style={{
              pointerEvents: "auto",
              transition: "color 0.8s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            ART.
            {hoveringArt && (
              <PlayButton
                playBtnRef={playBtnRef}
                playIconRef={playIconRef}
                onClick={handlePlay}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              />
            )}
          </span>
        </>
      )}
    </h1>
  </div>
);

export default TitleGlitch;
