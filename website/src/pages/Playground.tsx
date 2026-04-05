import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Yojimbo } from "yojimbo";

interface Props {
  colorFrom: string;
  colorTo: string;
  size: number;
  speed: number;
  thickness: number;
  blur: number;
  glowBlur: number;
  glowOpacity: number;
  glow: boolean;
  beams: 1 | 2;
  direction: "clockwise" | "counterclockwise";
}

const DEFAULTS: Props = {
  colorFrom: "#3B82F6",
  colorTo: "#8B5CF6",
  size: 250,
  speed: 20,
  thickness: 1,
  blur: 12,
  glowBlur: 30,
  glowOpacity: 0.7,
  glow: true,
  beams: 2,
  direction: "clockwise",
};

function generateCode(props: Props): string {
  const lines: string[] = [];
  const diff: string[] = [];

  if (props.colorFrom !== DEFAULTS.colorFrom)
    diff.push(`  colorFrom="${props.colorFrom}"`);
  if (props.colorTo !== DEFAULTS.colorTo)
    diff.push(`  colorTo="${props.colorTo}"`);
  if (props.size !== DEFAULTS.size) diff.push(`  size={${props.size}}`);
  if (props.speed !== DEFAULTS.speed) diff.push(`  speed={${props.speed}}`);
  if (props.thickness !== DEFAULTS.thickness)
    diff.push(`  thickness={${props.thickness}}`);
  if (props.blur !== DEFAULTS.blur) diff.push(`  blur={${props.blur}}`);
  if (props.glowBlur !== DEFAULTS.glowBlur)
    diff.push(`  glowBlur={${props.glowBlur}}`);
  if (props.glowOpacity !== DEFAULTS.glowOpacity)
    diff.push(`  glowOpacity={${props.glowOpacity}}`);
  if (!props.glow) diff.push(`  glow={false}`);
  if (props.beams !== DEFAULTS.beams) diff.push(`  beams={${props.beams}}`);
  if (props.direction !== DEFAULTS.direction)
    diff.push(`  direction="${props.direction}"`);

  if (diff.length === 0) {
    return "<Yojimbo />";
  }

  lines.push("<Yojimbo");
  lines.push(...diff);
  lines.push("/>");
  return lines.join("\n");
}

function Slider({
  label,
  description,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  description?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-0.5">
        <label className="text-xs text-zinc-400">{label}</label>
        <span className="text-xs font-mono text-zinc-500">{value}</span>
      </div>
      {description && (
        <p className="text-[11px] text-zinc-700 mb-1.5">{description}</p>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  );
}

function ColorInput({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs text-zinc-400 block mb-0.5">{label}</label>
      {description && (
        <p className="text-[11px] text-zinc-700 mb-1.5">{description}</p>
      )}
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 rounded border border-zinc-700 bg-transparent cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-300 outline-none focus:border-zinc-600"
        />
      </div>
    </div>
  );
}

export default function Playground() {
  const [props, setProps] = useState<Props>({ ...DEFAULTS });
  const [copied, setCopied] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const set = <K extends keyof Props>(key: K, value: Props[K]) => {
    setProps((p) => ({ ...p, [key]: value }));
    setRefreshKey((k) => k + 1);
  };

  const code = useMemo(() => generateCode(props), [props]);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setProps({ ...DEFAULTS });
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="h-screen bg-zinc-950 flex flex-col lg:flex-row overflow-hidden">
      {/* Left: Header + Controls */}
      <div className="lg:w-80 xl:w-96 border-b lg:border-b-0 lg:border-r border-zinc-900 flex flex-col shrink-0 overflow-y-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-zinc-950 border-b border-zinc-900 px-6 py-3 flex items-center gap-4 shrink-0">
          <Link to="/">
            <img src="/yojimbo-logo.png" alt="Yojimbo" className="h-10" style={{ filter: "hue-rotate(200deg) saturate(1.8) brightness(1.2) drop-shadow(0 0 12px rgba(59,130,246,0.5))" }} />
          </Link>
          <span className="text-zinc-700">/</span>
          <span className="text-sm text-zinc-400">Playground</span>
        </header>

        {/* Controls */}
        <div className="p-6 flex-1">
          <div className="space-y-10">
            {/* Beam */}
            <div>
              <h3 className="text-[11px] uppercase tracking-wider text-zinc-600 font-medium mb-1">
                Beam
              </h3>
              <p className="text-[11px] text-zinc-700 mb-3">
                Colors, size, speed and direction of the light trail.
              </p>
              <div className="space-y-6">
                <ColorInput
                  label="Color From"
                  description="Leading edge color of the beam."
                  value={props.colorFrom}
                  onChange={(v) => set("colorFrom", v)}
                />
                <ColorInput
                  label="Color To"
                  description="Trailing edge color of the beam."
                  value={props.colorTo}
                  onChange={(v) => set("colorTo", v)}
                />
                <Slider
                  label="Size"
                  description="Overall size of the beam effect in pixels."
                  value={props.size}
                  onChange={(v) => set("size", v)}
                  min={50}
                  max={2000}
                  step={10}
                />
                <Slider
                  label="Speed"
                  description="How fast the beam travels. Higher is faster."
                  value={props.speed}
                  onChange={(v) => set("speed", v)}
                  min={2}
                  max={200}
                />
                <Slider
                  label="Thickness"
                  description="Visible border width in pixels."
                  value={props.thickness}
                  onChange={(v) => set("thickness", v)}
                  min={0.5}
                  max={5}
                  step={0.5}
                />
                <Slider
                  label="Blur"
                  description="Softness of the beam edges."
                  value={props.blur}
                  onChange={(v) => set("blur", v)}
                  min={0}
                  max={40}
                />
                {/* Beams */}
                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5">
                    Beams
                  </label>
                  <div className="flex gap-2">
                    {([1, 2] as const).map((n) => (
                      <button
                        key={n}
                        onClick={() => set("beams", n)}
                        className={`flex-1 text-xs py-1.5 rounded-lg border cursor-pointer transition-colors ${
                          props.beams === n
                            ? "border-blue-500 text-blue-400 bg-blue-500/10"
                            : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Direction */}
                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5">
                    Direction
                  </label>
                  <div className="flex gap-2">
                    {(["clockwise", "counterclockwise"] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => set("direction", d)}
                        className={`flex-1 text-xs py-1.5 rounded-lg border cursor-pointer transition-colors ${
                          props.direction === d
                            ? "border-blue-500 text-blue-400 bg-blue-500/10"
                            : "border-zinc-800 text-zinc-500 hover:border-zinc-700"
                        }`}
                      >
                        {d === "clockwise" ? "CW" : "CCW"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Glow */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[11px] uppercase tracking-wider text-zinc-600 font-medium">
                  Glow
                </h3>
                <button
                  onClick={() => set("glow", !props.glow)}
                  className={`w-9 h-5 rounded-full transition-colors cursor-pointer ${
                    props.glow ? "bg-blue-500" : "bg-zinc-700"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full bg-white transition-transform mx-0.5 ${
                      props.glow ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
              <p className="text-[11px] text-zinc-700 mb-3">
                Ambient light effect around the beam.
              </p>
              {props.glow && (
                <div className="space-y-6">
                  <Slider
                    label="Glow Blur"
                    description="Softness of the ambient glow."
                    value={props.glowBlur}
                    onChange={(v) => set("glowBlur", v)}
                    min={0}
                    max={80}
                  />
                  <Slider
                    label="Glow Opacity"
                    description="Intensity of the glow effect."
                    value={props.glowOpacity}
                    onChange={(v) => set("glowOpacity", v)}
                    min={0}
                    max={1}
                    step={0.05}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Right: Preview + Code (fixed) */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-10 relative">
        <button
          onClick={reset}
          className="absolute top-4 right-4 text-xs text-zinc-500 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
        >
          Reset
        </button>
        {/* Preview */}
        <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-10 w-full max-w-md text-center">
          <Yojimbo key={refreshKey} {...props} />
          <h3 className="text-lg font-semibold text-white mb-2">
            Yojimbo
          </h3>
          <p className="text-sm text-zinc-400">
            Animated border beam effect for React projects.
          </p>
        </div>

        {/* Code output */}
        <div className="mt-10 w-full max-w-md">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider text-zinc-600 font-medium">
              Code
            </span>
            <button
              onClick={copy}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm leading-relaxed text-zinc-300 font-mono overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
