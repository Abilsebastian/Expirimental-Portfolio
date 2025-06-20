"use client";

import React, { useRef, useState, useEffect } from "react";
import PosterizeBackground from "./PosterizeBackground";
import TitleGlitch from "./TitleGlitch";
import NowPlayingIndicator from "./NowPlayingIndicator";

const PosterizeAnimationCSS = () => {
  const imageWidth = 1920;
  const imageHeight = 1080;
  const [hoveringArt, setHoveringArt] = useState(false);
  const [audio] = useState(
    typeof window !== "undefined"
      ? new Audio("/audio/your-audio-file.mp3")
      : null
  );
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const playIconRef = useRef<HTMLSpanElement>(null);
  const [spinning, setSpinning] = useState(false);
  const spinAxis = useRef({ x: 0, y: 1, z: 0 });
  const spinAngle = useRef(0);
  const animationFrame = useRef<number>();
  const spinSpeed = useRef(0.07);
  const [playClicked, setPlayClicked] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [showDamn, setShowDamn] = useState(false);
  const glitchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Parallax state
  const parallaxTargetRef = useRef({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Preload all images before showing UI
  useEffect(() => {
    const sources = [
      "/images/posterize-low.png",
      "/images/posterize-high.png",
      "/images/green screen 1.png",
      "/images/zoomout.png",
    ];
    let loaded = 0;
    sources.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === sources.length) setImagesLoaded(true);
      };
    });
  }, []);

  // Mouse parallax effect after playClicked
  useEffect(() => {
    if (!playClicked) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 2;
      const y = ((e.clientY / innerHeight) - 0.5) * 2;
      parallaxTargetRef.current = { x, y };
    };
    const handleMouseLeave = () => {
      parallaxTargetRef.current = { x: 0, y: 0 };
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [playClicked]);

  // Spring animation for parallax effect
  useEffect(() => {
    if (!playClicked) return;
    let frame: number;
    let velocity = { x: 0, y: 0 };
    const stiffness = 0.06;
    const damping = 0.9;

    function animate() {
      setParallax(prev => {
        const dx = parallaxTargetRef.current.x - prev.x;
        const dy = parallaxTargetRef.current.y - prev.y;
        velocity.x = velocity.x * damping + dx * stiffness;
        velocity.y = velocity.y * damping + dy * stiffness;
        return {
          x: prev.x + velocity.x,
          y: prev.y + velocity.y,
        };
      });
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [playClicked]);

  // Glitch effect for DAMN. text
  useEffect(() => {
    if (hoveringArt || playClicked) {
      if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
      return;
    }

    let timeout: NodeJS.Timeout;

    const triggerGlitch = () => {
      setGlitching(true);
      setShowDamn(true);
      setTimeout(() => {
        setShowDamn(false);
        setGlitching(false);
      }, 180);
      // Schedule next glitch in 6s
      timeout = setTimeout(triggerGlitch, 6000);
      glitchTimeout.current = timeout;
    };

    // First glitch after 3s
    timeout = setTimeout(() => {
      triggerGlitch();
    }, 3000);

    glitchTimeout.current = timeout;

    return () => {
      if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
    };
  }, [hoveringArt, playClicked]);

  const handlePlay = () => {
    setPlayClicked(true);
    setSpinning(false);
    spinAngle.current = 0;
    if (playIconRef.current) playIconRef.current.style.transform = "";
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  // Start spinning when hovering ART.
  const handleArtEnter = () => {
    setHoveringArt(true);
    if (!spinning) setSpinning(true);
  };
  const handleArtLeave = () => {
    setHoveringArt(false);
  };

  // Update axis and speed from mouse position over the button
  const handlePointerMove = (e: React.MouseEvent) => {
    const btn = playBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const len = Math.sqrt(x * x + y * y);
    const maxDist = Math.max(rect.width, rect.height) / 2;

    // Axis
    if (len > 0.01) {
      spinAxis.current = {
        x: y / len,
        y: -x / len,
        z: 0,
      };
    } else {
      spinAxis.current = { x: 0, y: 1, z: 0 };
    }

    // Speed: closer = faster, farther = slower, stop if too far
    const distNorm = Math.min(len / maxDist, 1.2);
    if (distNorm >= 1) {
      spinSpeed.current = 0;
      setSpinning(false);
      spinAngle.current = 0;
      if (playIconRef.current) playIconRef.current.style.transform = "";
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    } else {
      const speed = 0.35 - distNorm * 0.28;
      spinSpeed.current = Math.max(0.12, Math.min(speed, 0.28));
      if (!spinning) setSpinning(true);
    }
  };

  const handlePointerLeave = () => {
    setSpinning(false);
    spinAngle.current = 0;
    if (playIconRef.current) playIconRef.current.style.transform = "";
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
  };

  // Animate spinning
  useEffect(() => {
    if (!spinning) {
      if (playIconRef.current) playIconRef.current.style.transform = "";
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      return;
    }
    let running = true;
    const animate = () => {
      if (!running) return;
      spinAngle.current += spinSpeed.current;
      const { x, y, z } = spinAxis.current;
      if (playIconRef.current) {
        playIconRef.current.style.transform = `rotate3d(${x},${y},${z},${spinAngle.current}rad)`;
      }
      animationFrame.current = requestAnimationFrame(animate);
    };
    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [spinning]);

  // Show nothing until images are loaded
  if (!imagesLoaded) {
    return <div className="fixed inset-0 w-screen h-screen bg-black" />;
  }

  return (
    <div className="fixed inset-0 w-screen h-screen">
      <PosterizeBackground
        playClicked={playClicked}
        hoveringArt={hoveringArt}
        parallax={parallax}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
      />
      <TitleGlitch
        showDamn={showDamn}
        glitching={glitching}
        hoveringArt={hoveringArt}
        handleArtEnter={handleArtEnter}
        handleArtLeave={handleArtLeave}
        playBtnRef={playBtnRef}
        playIconRef={playIconRef}
        handlePlay={handlePlay}
        handlePointerMove={handlePointerMove}
        handlePointerLeave={handlePointerLeave}
      />
      {playClicked && (
        <NowPlayingIndicator
          audio={audio}
          setPlayClicked={setPlayClicked}
          setImagesLoaded={setImagesLoaded}
        />
      )}
    </div>
  );
};

export default PosterizeAnimationCSS;