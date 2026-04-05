import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Yojimbo } from "yojimbo";
import { CodeBlock } from "../CodeBlock";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("npm install yojimbo");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Hero */}
      <header className="max-w-3xl mx-auto px-6 pt-24 pb-16 text-center">
        <div
          className="glitch h-28 mx-auto mb-4 w-72"
          style={{ backgroundImage: "url(/yojimbo-logo.png)", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
        >
          <img
            src="/yojimbo-logo.png"
            alt="Yojimbo"
            className="h-28 mx-auto"
            style={{ filter: "hue-rotate(200deg) saturate(1.8) brightness(1.2) drop-shadow(0 0 20px rgba(59,130,246,0.6))" }}
          />
        </div>
        <p className="text-lg text-zinc-400 max-w-xl mx-auto">
          Animated border beam effect for React. A glowing light trail that
          travels along the border of any element.
        </p>

        <div className="flex items-center justify-center gap-8 mt-8">
          <Link
            to="/playground"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Playground
          </Link>
          <a
            href="https://github.com/selfishprimate/yojimbo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* Install snippet */}
        <button
          onClick={copyInstall}
          className="relative mt-8 inline-flex items-center justify-between gap-6 bg-zinc-900 border border-zinc-800 rounded-xl px-6 py-4 text-base text-zinc-300 font-mono hover:border-zinc-700 transition-colors cursor-pointer min-w-[320px]"
        >
          <Yojimbo />
          <span>npm install yojimbo</span>
          {copied ? (
            <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </header>

      {/* Examples */}
      <main className="max-w-3xl mx-auto px-6 pb-24 space-y-20">
        {/* Inspiration */}
        <p className="text-sm text-zinc-600 text-center max-w-lg mx-auto">
          Inspired by Akira Kurosawa's 1961 film{" "}
          <a href="https://en.wikipedia.org/wiki/Yojimbo_(film)" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">Yojimbo</a>
          {", "}the gleam of{" "}
          <a href="https://en.wikipedia.org/wiki/Toshiro_Mifune" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">Toshiro Mifune</a>'s samurai blade catching light.
          {" "}Built by{" "}
          <a href="https://linkedin.com/in/selfishprimate" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">selfishprimate</a>.
        </p>

        {/* Button */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Button</h2>
          <p className="text-sm text-zinc-500 mb-6">
            Add a beam effect to any button.
          </p>

          <div className="flex flex-wrap gap-6 mb-6">
            <button className="relative rounded-xl bg-zinc-900 border border-zinc-800 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-colors cursor-pointer">
              <Yojimbo />
              Get Started
            </button>

            <button className="relative rounded-xl bg-zinc-900 border border-zinc-800 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-colors cursor-pointer">
              <Yojimbo colorFrom="#F97316" colorTo="#EF4444" speed={12} />
              Subscribe
            </button>

            <button className="relative rounded-full bg-zinc-900 border border-zinc-800 px-6 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition-colors cursor-pointer">
              <Yojimbo beams={1} colorFrom="#10B981" colorTo="#06B6D4" speed={8} />
              Join Now
            </button>
          </div>

          <CodeBlock
            code={`<button className="relative rounded-xl bg-zinc-900 border border-zinc-800 px-6 py-3">
  <Yojimbo />
  Get Started
</button>

{/* Custom colors */}
<button className="relative rounded-xl bg-zinc-900 border border-zinc-800 px-6 py-3">
  <Yojimbo colorFrom="#F97316" colorTo="#EF4444" speed={12} />
  Subscribe
</button>

{/* Single beam, pill shape */}
<button className="relative rounded-full bg-zinc-900 border border-zinc-800 px-6 py-3">
  <Yojimbo beams={1} colorFrom="#10B981" colorTo="#06B6D4" speed={8} />
  Join Now
</button>`}
          />
        </section>

        {/* Card */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">Card</h2>
          <p className="text-sm text-zinc-500 mb-6">
            Works great on cards with any border-radius.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
              <Yojimbo thickness={1.5} />
              <h3 className="text-base font-semibold text-white mb-2">
                Default Beam
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Drop the component inside any relatively positioned element with
                a border-radius.
              </p>
            </div>

            <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
              <Yojimbo
                colorFrom="#F59E0B"
                colorTo="#EF4444"
                thickness={1.5}
                speed={15}
                glowOpacity={0.9}
              />
              <h3 className="text-base font-semibold text-white mb-2">
                Warm Glow
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Customize colors, speed and glow to match your brand palette.
              </p>
            </div>
          </div>

          <CodeBlock
            code={`<div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
  <Yojimbo thickness={1.5} />
  <h3>Default Beam</h3>
  <p>Your content here.</p>
</div>

{/* Warm colors with stronger glow */}
<div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
  <Yojimbo
    colorFrom="#F59E0B"
    colorTo="#EF4444"
    thickness={1.5}
    speed={15}
    glowOpacity={0.9}
  />
  <h3>Warm Glow</h3>
  <p>Your content here.</p>
</div>`}
          />
        </section>

        {/* Input */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-2">
            Search Input
          </h2>
          <p className="text-sm text-zinc-500 mb-6">
            A search bar with animated border — perfect for hero sections.
          </p>

          <div className="mb-6">
            <div className="relative rounded-xl bg-zinc-900 border border-zinc-800 flex items-center px-4 py-3 max-w-lg">
              <Yojimbo
                colorFrom="#8B5CF6"
                colorTo="#EC4899"
                thickness={1.5}
                speed={16}
                blur={14}
              />
              <svg
                className="w-5 h-5 text-zinc-500 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none flex-1"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] text-zinc-600 border border-zinc-800 rounded px-1.5 py-0.5 ml-3">
                /
              </kbd>
            </div>
          </div>

          <CodeBlock
            code={`<div className="relative rounded-xl bg-zinc-900 border border-zinc-800 flex items-center px-4 py-3">
  <Yojimbo
    colorFrom="#8B5CF6"
    colorTo="#EC4899"
    thickness={1.5}
    speed={16}
    blur={14}
  />
  <svg className="w-5 h-5 text-zinc-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
  <input
    type="text"
    placeholder="Search anything..."
    className="bg-transparent text-sm text-white placeholder-zinc-500 outline-none flex-1"
  />
</div>`}
          />
        </section>

        {/* Props Table */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6">Props</h2>
          <div className="overflow-x-auto border border-zinc-800 rounded-xl">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="px-4 py-3 font-medium">Prop</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Default</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {[
                  ["colorFrom", "string", '"#3B82F6"'],
                  ["colorTo", "string", '"#8B5CF6"'],
                  ["size", "number", "250"],
                  ["colorFromSize", "number", "size / 3"],
                  ["colorToSize", "number", "size / 3"],
                  ["speed", "number", "20"],
                  ["thickness", "number", "1"],
                  ["blur", "number", "12"],
                  ["glowBlur", "number", "30"],
                  ["glowOpacity", "number", "0.7"],
                  ["glow", "boolean", "true"],
                  ["beams", "1 | 2", "2"],
                  ["direction", '"cw" | "ccw"', '"clockwise"'],
                  ["className", "string", "—"],
                ].map(([prop, type, def]) => (
                  <tr key={prop} className="border-b border-zinc-800/50 last:border-0">
                    <td className="px-4 py-2.5 font-mono text-xs text-blue-400">
                      {prop}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs text-zinc-500">
                      {type}
                    </td>
                    <td className="px-4 py-2.5 font-mono text-xs">{def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-10 text-center text-sm text-zinc-500">
        Made with ❤️ by{" "}
        <a
          href="https://linkedin.com/in/selfishprimate"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 hover:text-white transition-colors"
        >
          selfishprimate
        </a>
        {" "}for the design community.
      </footer>
    </div>
  );
}
