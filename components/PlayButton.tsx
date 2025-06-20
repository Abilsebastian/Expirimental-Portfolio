import React from "react";

interface PlayButtonProps {
  playBtnRef: React.RefObject<HTMLButtonElement>;
  playIconRef: React.RefObject<HTMLSpanElement>;
  onClick: () => void;
  onPointerMove: (e: React.MouseEvent) => void;
  onPointerLeave: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  playBtnRef,
  playIconRef,
  onClick,
  onPointerMove,
  onPointerLeave,
}) => (
  <button
    ref={playBtnRef}
    onClick={onClick}
    className="pointer-events-auto bg-transparent border-none p-0 m-0 shadow-none play-btn"
    style={{
      position: "absolute",
      left: "62%",
      bottom: "-0.2em",
      width: "1.5em",
      height: "1.8em",
      fontSize: "1em",
      lineHeight: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      opacity: 1,
      background: "transparent",
      perspective: "100px",
      scale: "0.25",
    }}
    tabIndex={0}
    aria-label="Play audio"
    onMouseMove={onPointerMove}
    onMouseLeave={onPointerLeave}
  >
    <span
      ref={playIconRef}
      className="play-icon"
      style={{
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "inline-block",
      }}
    >
      ▶
    </span>
  </button>
);

export default PlayButton;
