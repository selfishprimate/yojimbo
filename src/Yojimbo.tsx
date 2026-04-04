"use client";

import React, { useEffect } from "react";

const STYLE_ID = "yojimbo-keyframes";
const TRAIL_OFFSET = 4;

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
}
@keyframes yojimbo-trail-tail {
  0% { offset-distance: -${TRAIL_OFFSET}%; }
  100% { offset-distance: ${100 - TRAIL_OFFSET}%; }
}
@keyframes yojimbo-trail-offset-tail {
  0% { offset-distance: ${50 - TRAIL_OFFSET}%; }
  100% { offset-distance: ${150 - TRAIL_OFFSET}%; }
}`;
  document.head.appendChild(style);
}

export interface YojimboProps {
  /** Start color of the beam (leading edge). Default: "#3B82F6" */
  colorFrom?: string;
  /** End color of the beam (trailing edge). Default: "#8B5CF6" */
  colorTo?: string;
  /** Size of the overall beam in px. Default: 250 */
  size?: number;
  /** Size of the leading color blob in px. Defaults to size / 3 */
  colorFromSize?: number;
  /** Size of the trailing color blob in px. Defaults to size / 3 */
  colorToSize?: number;
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
  /** Direction of the beam. Default: "clockwise" */
  direction?: "clockwise" | "counterclockwise";
  /** Additional class name for the frame */
  className?: string;
}

export function Yojimbo({
  colorFrom = "#3B82F6",
  colorTo = "#8B5CF6",
  size = 250,
  colorFromSize,
  colorToSize,
  speed = 20,
  thickness = 1,
  blur = 12,
  glowBlur = 30,
  glowOpacity = 0.7,
  glow = true,
  beams = 2,
  direction = "clockwise",
  className,
}: YojimboProps) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const defaultBlobSize = size / 3;
  const fromSize = colorFromSize ?? defaultBlobSize;
  const toSize = colorToSize ?? defaultBlobSize;
  const animDir = direction === "counterclockwise" ? "reverse" as const : "normal" as const;

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

  const blobBase: React.CSSProperties = {
    position: "absolute",
    borderRadius: "50%",
    offsetPath: "border-box",
    offsetAnchor: "50% 50%",
    offsetRotate: "0deg",
    mixBlendMode: "screen",
    pointerEvents: "none",
    animationDirection: animDir,
  };

  const leadStyle1: React.CSSProperties = {
    ...blobBase,
    width: `${fromSize}px`,
    height: `${fromSize}px`,
    background: `radial-gradient(circle, ${colorFrom} 0%, ${colorFrom} 20%, transparent 70%)`,
    filter: `blur(${blur}px)`,
    animation: `yojimbo-trail ${speed}s linear infinite`,
  };

  const tailStyle1: React.CSSProperties = {
    ...blobBase,
    width: `${toSize}px`,
    height: `${toSize}px`,
    background: `radial-gradient(circle, ${colorTo} 0%, ${colorTo} 20%, transparent 70%)`,
    filter: `blur(${blur * 1.2}px)`,
    animation: `yojimbo-trail-tail ${speed}s linear infinite`,
  };

  const leadStyle2: React.CSSProperties = {
    ...leadStyle1,
    animationName: "yojimbo-trail-offset",
  };

  const tailStyle2: React.CSSProperties = {
    ...tailStyle1,
    animationName: "yojimbo-trail-offset-tail",
  };

  const glowOrbStyle: React.CSSProperties = {
    position: "absolute",
    inset: `${-thickness}px`,
    width: `calc(100% + ${thickness * 2}px)`,
    height: `calc(100% + ${thickness * 2}px)`,
    borderRadius: "inherit",
    pointerEvents: "none",
    mixBlendMode: "screen",
  };

  const glowDot: React.CSSProperties = {
    position: "absolute",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${colorFrom} 0%, ${colorFrom} 30%, transparent 100%)`,
    offsetPath: "border-box",
    offsetAnchor: "50% 50%",
    offsetRotate: "0deg",
    filter: `blur(${glowBlur}px)`,
    opacity: glowOpacity,
    mixBlendMode: "screen",
    animationDirection: animDir,
  };

  return (
    <>
      {glow && (
        <>
          <div style={glowOrbStyle} className={className}>
            <div style={{ ...glowDot, animation: `yojimbo-trail ${speed}s linear infinite` }} />
          </div>
          {beams === 2 && (
            <div style={glowOrbStyle} className={className}>
              <div style={{ ...glowDot, animation: `yojimbo-trail-offset ${speed}s linear infinite` }} />
            </div>
          )}
        </>
      )}
      <div style={frameStyle} className={className}>
        <div style={tailStyle1} />
        <div style={leadStyle1} />
        {beams === 2 && (
          <>
            <div style={tailStyle2} />
            <div style={leadStyle2} />
          </>
        )}
      </div>
    </>
  );
}
