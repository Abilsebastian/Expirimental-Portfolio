"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spline from "@splinetool/react-spline";

const TEXT = "Creative direction, from spark to story.";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [fading, setFading] = useState(false);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!mounted) return;
    let i = 0;
    const typeInterval = setInterval(() => {
      setDisplayed(TEXT.slice(0, i + 1));
      i++;
      if (i === TEXT.length) clearInterval(typeInterval);
    }, 30);
    return () => clearInterval(typeInterval);
  }, [mounted]);

  // Blinking cursor
  useEffect(() => {
    if (!mounted) return;
    const cursorInterval = setInterval(() => {
      setShowCursor((v) => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, [mounted]);

  // Show enter button after a delay
  useEffect(() => {
    if (!mounted) return;
    const buttonTimer = setTimeout(() => {
      setShowEnterButton(true);
    }, TEXT.length * 10 + 500); // Delay based on text length and additional time
    return () => clearTimeout(buttonTimer);
  }, [mounted]);

  // Split and highlight "Creative direction"
  const highlight = "Creativedirection";
  const highlightIndex = displayed.toLowerCase().indexOf(highlight);
  const before = highlightIndex !== -1 ? displayed.slice(0, highlightIndex) : displayed;
  const bold = highlightIndex !== -1 ? displayed.slice(highlightIndex, highlightIndex + highlight.length) : "";
  const after = highlightIndex !== -1 ? displayed.slice(highlightIndex + highlight.length) : "";

  if (!mounted) return null; // Prevents SSR mismatch

  return (
    <main
      className={`relative w-screen h-screen overflow-hidden ${fading ? "fade-out" : ""}`}
      style={{
        cursor: "crosshair",
        fontFamily: "'Times New Roman', Times, serif"
      }}
    >
      {/* First Spline background (bottom layer) */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <Spline
          scene="https://prod.spline.design/h3g1ev3BJiJvG59J/scene.splinecode"
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      </div>
      {/* Second Spline viewer (middle layer, React Spline component) */}
      <div
        className="absolute inset-0 w-full h-full z-10"
        style={{ pointerEvents: "none" }} // <--- Only overlay will be clickable
      >
        <Spline
          scene="https://prod.spline.design/NthTpZ0LtiXXjzu9/scene.splinecode"
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            inset: 0,
            zIndex: 10,
            pointerEvents: "auto",
          }}
        />
        {/* Overlay clickable area for Enter button */}
        {showEnterButton && (
          <div
            onClick={() => {
              setFading(true);
              setTimeout(() => router.push("/home"), 10); // 100ms fade duration
            }}
            style={{
              position: "absolute",
              left: "50%",
              top: "60%", // adjust as needed
              transform: "translate(-50%, -50%)",
              width: 200, // adjust to match button size
              height: 120, // adjust to match button size
              zIndex: 20,
              cursor: "pointer",
              background: "rgba(0,0,0,0)", // transparent
              pointerEvents: "auto", // <--- Only this area is clickable
            }}
          />
        )}
      </div>
      {/* Centered typewriter text (top layer) */}
      <div className="z-20 relative flex items-center justify-center h-full w-full pointer-events-none">
        <h1
          className="font-serif font-normal whitespace-nowrap"
          style={{
            color: "#fff",
            fontSize: "2vw",
            letterSpacing: "0.02em",
          }}
        >
          {before}
          <b style={{ fontWeight: 700 }}>{bold}</b>
          {after}
          <span
            style={{
              display: "inline-block",
              width: "0.6ch",
              marginLeft: "0.1ch",
              opacity: showCursor ? 1 : 0,
              transition: "opacity 0.1s",
            }}
          >
            |
          </span>
        </h1>
      </div>
      {fading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#000",
            zIndex: 50,
            pointerEvents: "none",
            transition: "opacity 400ms",
            opacity: 1,
          }}
        />
      )}
    </main>
  );
}
