"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { Music, Code, ArrowRight, Sparkles, Zap } from "lucide-react";
import AIConsultant from "./AIConsultant";

interface ModeSelectorProps {
  onModeSelect: (mode: "audio" | "webdev") => void;
}

export default function ModeSelectorNew({ onModeSelect }: ModeSelectorProps) {
  const { setThemeMode } = useTheme();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [hoveredSide, setHoveredSide] = useState<"audio" | "webdev" | null>(null);

  // Fixed particle positions to avoid hydration mismatch
  const webdevParticles = [
    { left: 15, top: 20 }, { left: 85, top: 40 }, { left: 25, top: 60 },
    { left: 70, top: 15 }, { left: 45, top: 80 }, { left: 90, top: 70 },
    { left: 10, top: 45 }, { left: 55, top: 25 }, { left: 35, top: 90 },
    { left: 75, top: 55 }, { left: 20, top: 75 }, { left: 65, top: 35 },
    { left: 40, top: 50 }, { left: 80, top: 85 }, { left: 30, top: 10 },
    { left: 50, top: 65 }, { left: 95, top: 30 }, { left: 5, top: 95 },
    { left: 60, top: 48 }, { left: 12, top: 82 }
  ];

  const audioParticles = [
    { left: 22, top: 18 }, { left: 78, top: 42 }, { left: 32, top: 68 },
    { left: 68, top: 12 }, { left: 48, top: 78 }, { left: 88, top: 72 },
    { left: 12, top: 48 }, { left: 58, top: 28 }, { left: 38, top: 88 },
    { left: 72, top: 58 }, { left: 28, top: 72 }, { left: 62, top: 38 },
    { left: 42, top: 52 }, { left: 82, top: 82 }, { left: 28, top: 15 },
    { left: 52, top: 62 }, { left: 92, top: 35 }, { left: 8, top: 92 },
    { left: 58, top: 45 }, { left: 18, top: 85 }
  ];

  const handleModeSelect = useCallback(
    (mode: "audio" | "webdev") => {
      setThemeMode(mode);
      setTimeout(() => {
        onModeSelect(mode);
      }, 300);
    },
    [onModeSelect, setThemeMode]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "1") handleModeSelect("webdev");
      if (e.key === "2") handleModeSelect("audio");
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleModeSelect]);

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-950" />

        {/* Subtle animated orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main split container */}
      <div className="relative z-10 w-full h-screen flex flex-col md:flex-row">
        {/* Header - Mobile only */}
        <motion.div
          className="md:hidden absolute top-0 left-0 right-0 z-50 p-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2 font-[family-name:var(--font-space)]">
            DAZZLING STUDIO
          </h1>
          <p className="text-gray-400 text-sm">Choose Your Path</p>
        </motion.div>

        {/* Left Side - Web Development */}
        <motion.button
          onClick={() => handleModeSelect("webdev")}
          onMouseEnter={() => setHoveredSide("webdev")}
          onMouseLeave={() => setHoveredSide(null)}
          className="relative group flex-1 overflow-hidden cursor-pointer"
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            flex: hoveredSide === "webdev" ? 1.2 : hoveredSide === "audio" ? 0.8 : 1
          }}
          transition={{
            x: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
            opacity: { duration: 0.8 },
            flex: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
          }}
        >
          {/* Background image - blurred */}
          <div className="absolute inset-0 opacity-75 group-hover:opacity-85 transition-opacity duration-700">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center scale-105"
              style={{
                backgroundImage: "url('/web_image/web_background.png')",
                filter: "blur(8px)",
              }}
            />
          </div>

          {/* Gradient overlay - lighter to let image show through */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/50 via-blue-950/30 to-slate-950/50 group-hover:from-cyan-900/60 group-hover:via-blue-900/40 transition-all duration-700" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {webdevParticles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/40 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: (i % 5) * 0.4,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-white">
            <motion.div
              animate={{ scale: hoveredSide === "webdev" ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full"
                  animate={{
                    scale: hoveredSide === "webdev" ? [1, 1.5, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm p-6 rounded-2xl border border-cyan-500/30">
                  <Code className="w-16 h-16 text-cyan-400" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="text-center space-y-4"
              animate={{ y: hoveredSide === "webdev" ? -10 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm font-mono">
                  <Zap className="w-4 h-4" />
                  <span>WEB DEVELOPMENT</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-[family-name:var(--font-space)]">
                  웹 개발
                </h2>
              </div>

              <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
                최신 기술로 구현하는<br />혁신적인 디지털 경험
              </p>

              <div className="pt-6 space-y-3">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <span className="text-sm">React · Next.js · TypeScript</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <span className="text-sm">AI Integration · Full Stack</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                  <span className="text-sm">15+ Projects Completed</span>
                </div>
              </div>

              <motion.div
                className="pt-8 flex items-center justify-center gap-2 text-cyan-400"
                animate={{ x: hoveredSide === "webdev" ? [0, 10, 0] : 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-sm font-semibold">Explore Portfolio</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Keyboard hint */}
            <motion.div
              className="absolute bottom-8 left-8 font-mono text-xs text-cyan-400/50 bg-cyan-950/30 px-3 py-2 rounded-lg border border-cyan-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Press <kbd className="font-bold text-cyan-400">1</kbd>
            </motion.div>
          </div>
        </motion.button>

        {/* Center divider */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
          <motion.div
            className="relative"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 w-24 h-24 rounded-full border-2 border-white/20"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Logo circle */}
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl">
              <div className="text-center">
                <Sparkles className="w-8 h-8 text-white mb-1 mx-auto" />
                <p className="text-xs font-bold text-white font-[family-name:var(--font-space)]">DAZZLING</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Audio Engineering */}
        <motion.button
          onClick={() => handleModeSelect("audio")}
          onMouseEnter={() => setHoveredSide("audio")}
          onMouseLeave={() => setHoveredSide(null)}
          className="relative group flex-1 overflow-hidden cursor-pointer"
          initial={{ x: 100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            flex: hoveredSide === "audio" ? 1.2 : hoveredSide === "webdev" ? 0.8 : 1
          }}
          transition={{
            x: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
            opacity: { duration: 0.8 },
            flex: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
          }}
        >
          {/* Background image - blurred */}
          <div className="absolute inset-0 opacity-75 group-hover:opacity-85 transition-opacity duration-700">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center scale-105"
              style={{
                backgroundImage: "url('/web_image/music_background.png')",
                filter: "blur(8px)",
              }}
            />
          </div>

          {/* Gradient overlay - lighter to let image show through */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950/50 group-hover:from-amber-900/60 group-hover:via-orange-900/40 transition-all duration-700" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(251, 191, 36, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.3) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {audioParticles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: (i % 5) * 0.4,
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-white">
            <motion.div
              animate={{ scale: hoveredSide === "audio" ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full"
                  animate={{
                    scale: hoveredSide === "audio" ? [1, 1.5, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/30">
                  <Music className="w-16 h-16 text-amber-400" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="text-center space-y-4"
              animate={{ y: hoveredSide === "audio" ? -10 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-amber-400 text-sm font-mono">
                  <Sparkles className="w-4 h-4" />
                  <span>RECORDING & MUSIC ENGINEERING</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-[family-name:var(--font-space)]">
                  음향 엔지니어링
                </h2>
              </div>

              <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
                전문 스튜디오에서 탄생하는<br />완벽한 사운드 경험
              </p>

              <div className="pt-6 space-y-3">
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-amber-400 rounded-full" />
                  <span className="text-sm">Mixing · Mastering · Production</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-amber-400 rounded-full" />
                  <span className="text-sm">AI Music Creation · Cover Recording</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-400">
                  <div className="w-2 h-2 bg-amber-400 rounded-full" />
                  <span className="text-sm">100+ Projects Completed</span>
                </div>
              </div>

              <motion.div
                className="pt-8 flex items-center justify-center gap-2 text-amber-400"
                animate={{ x: hoveredSide === "audio" ? [0, 10, 0] : 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-sm font-semibold">Explore Portfolio</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Keyboard hint */}
            <motion.div
              className="absolute bottom-8 right-8 font-mono text-xs text-amber-400/50 bg-amber-950/30 px-3 py-2 rounded-lg border border-amber-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Press <kbd className="font-bold text-amber-400">2</kbd>
            </motion.div>
          </div>
        </motion.button>
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center hidden md:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-gray-500 text-xs font-[family-name:var(--font-mono)]">
          DAZZLING STUDIO © 2025 · Full Stack Developer + Audio Engineer
        </p>
      </motion.div>

      {/* AI Consultant */}
      <AIConsultant
        consultantType="general"
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}
