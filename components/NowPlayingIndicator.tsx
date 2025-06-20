import React from "react";

interface NowPlayingIndicatorProps {
  audio: HTMLAudioElement | null;
  setPlayClicked: (v: boolean) => void;
  setImagesLoaded: (v: boolean) => void;
}

const NowPlayingIndicator: React.FC<NowPlayingIndicatorProps> = ({
  audio,
  setPlayClicked,
  setImagesLoaded,
}) => (
  <div
    style={{
      position: "fixed",
      right: "2vw",
      bottom: "2vw",
      background: "rgba(0,0,0,0.6)",
      color: "#fff",
      padding: "0.7em 1.2em",
      borderRadius: "0.7em",
      fontSize: "0.95em",
      fontFamily: "sans-serif",
      zIndex: 100,
      boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
      letterSpacing: "0.02em",
      minWidth: "180px",
      textAlign: "right",
      pointerEvents: "auto",
    }}
  >
    <div style={{ fontWeight: 600, fontSize: "0.95em" }}>Now Playing</div>
    <div style={{ fontWeight: 400, fontSize: "0.9em", marginTop: "0.2em" }}>
      Die Hard
      <br />
      <span style={{ fontWeight: 300, fontSize: "0.85em" }}>
        Kendrick Lamar &amp; SZA
      </span>
    </div>
    {/* Visualizer Bars */}
    <div style={{
      display: "flex",
      alignItems: "flex-end",
      gap: "3px",
      height: "18px",
      marginTop: "0.5em",
      justifyContent: "flex-end"
    }}>
      <span style={{
        display: "inline-block",
        width: "4px",
        height: "100%",
        background: "#fff",
        borderRadius: "2px",
        animation: "visualizerBar1 1s infinite linear"
      }} />
      <span style={{
        display: "inline-block",
        width: "4px",
        height: "70%",
        background: "#fff",
        borderRadius: "2px",
        animation: "visualizerBar2 1s infinite linear"
      }} />
      <span style={{
        display: "inline-block",
        width: "4px",
        height: "50%",
        background: "#fff",
        borderRadius: "2px",
        animation: "visualizerBar3 1s infinite linear"
      }} />
    </div>
    {/* Quit Button */}
    <button
      style={{
        marginTop: "1em",
        background: "#fff",
        color: "#222",
        border: "none",
        borderRadius: "0.5em",
        padding: "0.4em 1.2em",
        fontSize: "1em",
        fontWeight: 500,
        cursor: "pointer",
        float: "right",
      }}
      onClick={() => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
        setPlayClicked(false);
        setImagesLoaded(false);
        // Optionally, re-trigger image loading here if needed
      }}
    >
      Quit
    </button>
  </div>
);

export default NowPlayingIndicator;
