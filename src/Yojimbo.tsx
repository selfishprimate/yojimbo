"use client";

import React, { useEffect } from "react";

const STYLE_ID = "yojimbo-keyframes";

function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
@keyframes yojimbo-trail {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}
@keyframes yojimbo-trail-offset {
  0% { offset-distance: 50%; }
  100% { offset-distance: 150%; }
}`;
  document.head.appendChild(style);
}

export interface YojimboProps {
  /** Color of the light beam. Default: "#3B82F6" */
  color?: string;
  /** Size of the light blob in px. Default: 250 */
  size?: number;
  /** Animation duration in seconds for a full loop. Default: 20 */
  speed?: number;
  /** Border thickness visible through the mask in px. Default: 1 */
  thickness?: number;
  /** Blur amount for the beam in px. Default: 12 */
  blur?: number;
  /** Blur amount for the outer glow in px. Default: 30 */
  glowBlur?: number;
  /** Opacity of the outer glow orbs. Default: 0.7 */
  glowOpacity?: number;
  /** Whether to show the outer glow orbs. Default: true */
  glow?: boolean;
  /** Number of beams (1 or 2). Default: 2 */
  beams?: 1 | 2;
  /** Additional class name for the frame */
  className?: string;
}

export function Yojimbo({
  color = "#3B82F6",
  size = 250,
  speed = 20,
  thickness = 1,
  blur = 12,
  glowBlur = 30,
  glowOpacity = 0.7,
  glow = true,
  beams = 2,
  className,
}: YojimboProps) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const frameStyle: React.CSSProperties = {
    position: "absolute",
    inset: `${-thickness}px`,
    borderRadius: "inherit",
    pointerEvents: "none",
    overflow: "hidden",
    padding: `${thickness}px`,
    WebkitMask:
      "linear-gradient(#fff 0, #fff 0) content-box exclude, linear-gradient(#fff 0, #fff 0)",
    mask: "linear-gradient(#fff 0, #fff 0) content-box exclude, linear-gradient(#fff 0, #fff 0)",
  };

  const lightStyle: React.CSSProperties = {
    position: "absolute",
    width: `${size}px`,
    aspectRatio: "2 / 1",
    background: `radial-gradient(100% 100% at 100% 50%, #fff 0%, #fff 5%, ${color} 35%, transparent 70%)`,
    offsetPath: "border-box",
    offsetAnchor: "100% 50%",
    offsetRotate: "auto 0deg",
    filter: `blur(${blur}px)`,
    mixBlendMode: "plus-lighter",
    pointerEvents: "none",
    animation: `yojimbo-trail ${speed}s linear infinite`,
  };

  const lightStyle2: React.CSSProperties = {
    ...lightStyle,
    animationName: "yojimbo-trail-offset",
  };

  const glowOrbStyle: React.CSSProperties = {
    position: "absolute",
    inset: `${-thickness}px`,
    width: `calc(100% + ${thickness * 2}px)`,
    height: `calc(100% + ${thickness * 2}px)`,
    borderRadius: "inherit",
    pointerEvents: "none",
    mixBlendMode: "plus-lighter",
  };

  const glowDotBase: React.CSSProperties = {
    position: "absolute",
    width: "60px",
    aspectRatio: "2 / 1",
    background: `radial-gradient(circle, #fff 0%, ${color} 40%, transparent 70%)`,
    offsetPath: "border-box",
    offsetAnchor: "60% 50%",
    offsetRotate: "auto 0deg",
    filter: `blur(${glowBlur}px)`,
    opacity: glowOpacity,
    mixBlendMode: "plus-lighter",
  };

  return (
    <>
      {glow && (
        <>
          <div style={glowOrbStyle} className={className}>
            <div style={{ ...glowDotBase, animation: `yojimbo-trail ${speed}s linear infinite` }} />
          </div>
          {beams === 2 && (
            <div style={glowOrbStyle} className={className}>
              <div style={{ ...glowDotBase, animation: `yojimbo-trail-offset ${speed}s linear infinite` }} />
            </div>
          )}
        </>
      )}
      <div style={frameStyle} className={className}>
        <div style={lightStyle} />
        {beams === 2 && <div style={lightStyle2} />}
      </div>
    </>
  );
}
