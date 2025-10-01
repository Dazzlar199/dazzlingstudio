"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Music,
  Code,
  Headphones,
  Monitor,
  Sun,
  Moon,
  SkipForward,
} from "lucide-react";
import AIConsultant from "./AIConsultant";

interface ModeSelectorProps {
  onModeSelect: (mode: "audio" | "webdev") => void;
}

// 성능 최적화: 정적 데이터를 컴포넌트 외부로 이동
const CLOUD_COUNT = 8;
const PARTICLE_COUNT = 25;
const AIRPLANE_COUNT = 3;
const BIRD_COUNT = 5;
const STAR_COUNT = 100;
const SHOOTING_STAR_COUNT = 3;
const CONSTELLATION_COUNT = 8;

// 파티클 색상 배열
const PARTICLE_COLORS = [
  "bg-blue-200/60",
  "bg-sky-300/50",
  "bg-cyan-200/40",
  "bg-indigo-200/55",
  "bg-blue-300/45",
  "bg-sky-200/60",
];

// 애니메이션 설정을 함수로 분리하여 재사용
const generateCloudAnimation = (i: number) => ({
  topPercent: 15 + ((i * 8.5) % 45),
  baseSize: 120 + ((i * 20) % 180),
  duration: 30 + (i % 20),
  delay: (i % 6) * 5,
  cloudOpacity: 0.6 - (i % 3) * 0.15,
});

const generateParticleAnimation = (i: number) => ({
  leftPercent: (i * 17.3) % 100,
  topPercent: (i * 23.7) % 100,
  duration: 8 + (i % 5),
  delay: (i % 6) * 1.5,
  particleSize: 1 + (i % 3) * 0.5,
  colorClass: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
});

const generateAirplaneAnimation = (i: number) => ({
  topPercent: 20 + i * 25,
  duration: 15 + i * 5,
  delay: i * 8,
  size: 40 + i * 15,
});

const generateStarAnimation = (i: number) => ({
  leftPercent: (i * 17.13) % 100,
  topPercent: (i * 23.47) % 100,
  size: Math.random() * 3 + 1,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 5,
});

export default function ModeSelector({ onModeSelect }: ModeSelectorProps) {
  const { setThemeMode } = useTheme();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [screenWidth, setScreenWidth] = useState(1200); // 기본값

  // 음악 플레이어 상태
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [showAirplane, setShowAirplane] = useState(false);

  // 음악 리스트 - 메모이제이션으로 불필요한 재생성 방지
  const musicTracks = useMemo(
    () => [
      { name: "Studio BGM 1", file: "/1page_bgm.mp3" },
      { name: "Studio BGM 2", file: "/1page_bgm2.mp3" },
      { name: "Studio BGM 3", file: "/1page_bgm3.mp3" },
      { name: "Studio BGM 4", file: "/1page_bgm4.mp3" },
    ],
    []
  );


  // 화면 크기 감지
  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    // 초기 설정
    updateScreenWidth();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', updateScreenWidth);

    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, []);

  // 음악 초기화 - 랜덤 선택
  useEffect(() => {
    const randomTrack = Math.floor(Math.random() * musicTracks.length);
    setCurrentTrack(randomTrack);
  }, [musicTracks.length]);

  // 오디오 볼륨 조절
  useEffect(() => {
    if (audioRef) {
      audioRef.volume = volume;
    }
  }, [volume, audioRef]);

  // 이벤트 핸들러 최적화
  const handleModeSelect = useCallback(
    (mode: "audio" | "webdev") => {
      setThemeMode(mode);
      setTimeout(() => onModeSelect(mode), 300);
    },
    [setThemeMode, onModeSelect]
  );

  const handleTrackChange = useCallback((index: number) => {
    setCurrentTrack(index);
  }, []);

  const handleNextTrack = useCallback(() => {
    setCurrentTrack((prev) => (prev + 1) % musicTracks.length);
  }, [musicTracks.length]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVolume(parseFloat(e.target.value));
    },
    []
  );

  const togglePlayerExpanded = useCallback(() => {
    setIsPlayerExpanded(!isPlayerExpanded);
  }, [isPlayerExpanded]);

  // 비행기 애니메이션 트리거 함수
  const triggerAirplaneAnimation = useCallback(() => {
    setShowAirplane(true);

    // 비행기 소리 재생 (볼륨 50%)
    const airplaneAudio = new Audio("/studio_main/airplane.mp3");
    airplaneAudio.volume = 0.5;
    airplaneAudio.play().catch(console.error);

    // 3초 후 비행기 애니메이션 종료
    setTimeout(() => {
      setShowAirplane(false);
    }, 3000);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode);
  }, [isDarkMode]);

  return (
    <motion.div
      className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden"
      animate={{
        backgroundColor: isDarkMode ? "#000000" : "#3b82f6",
      }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Background - Conditional */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {!isDarkMode ? (
          // Light Mode - Blue Sky Background
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-300 via-sky-400 to-blue-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/30 via-blue-600/15 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/40 via-transparent to-indigo-800/25"></div>
          </motion.div>
        ) : (
          // Dark Mode - Night Sky Background
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-indigo-950/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-transparent to-indigo-950/40"></div>
          </motion.div>
        )}
      </motion.div>

      {/* Animation System - Conditional */}
      <div className="absolute inset-0 overflow-hidden">
        {!isDarkMode ? (
          // Light Mode - Clouds and Sky Elements
          <>
            {/* Layered Realistic Clouds */}
            {Array.from({ length: CLOUD_COUNT }).map((_, i) => {
              const animation = generateCloudAnimation(i);

              return (
                <motion.div
                  key={`cloud-${i}`}
                  className="absolute"
                  style={{
                    top: animation.topPercent + "%",
                    opacity: animation.cloudOpacity,
                    willChange: "transform", // GPU 가속 활성화
                  }}
                  animate={{
                    x: [-300, screenWidth + 300],
                  }}
                  transition={{
                    duration: animation.duration,
                    repeat: Infinity,
                    delay: animation.delay,
                    ease: "linear",
                  }}
                >
                  {/* Multi-part Cloud Shape */}
                  <div className="relative">
                    {/* Main cloud body */}
                    <div
                      className="bg-gradient-to-br from-white/95 to-blue-50/85 rounded-full absolute"
                      style={{
                        width: animation.baseSize + "px",
                        height: animation.baseSize * 0.55 + "px",
                        filter: "blur(0.5px)",
                      }}
                    />
                    {/* Cloud bumps for realism */}
                    <div
                      className="bg-gradient-to-br from-white/90 to-sky-50/80 rounded-full absolute"
                      style={{
                        width: animation.baseSize * 0.7 + "px",
                        height: animation.baseSize * 0.4 + "px",
                        left: animation.baseSize * 0.6 + "px",
                        top: animation.baseSize * 0.1 + "px",
                        filter: "blur(0.3px)",
                      }}
                    />
                    <div
                      className="bg-gradient-to-br from-white/85 to-cyan-50/75 rounded-full absolute"
                      style={{
                        width: animation.baseSize * 0.5 + "px",
                        height: animation.baseSize * 0.35 + "px",
                        left: animation.baseSize * 0.1 + "px",
                        top: animation.baseSize * -0.05 + "px",
                        filter: "blur(0.4px)",
                      }}
                    />
                    {/* Soft edge wisps */}
                    <div
                      className="bg-gradient-to-r from-white/60 to-transparent rounded-full absolute"
                      style={{
                        width: animation.baseSize * 0.3 + "px",
                        height: animation.baseSize * 0.2 + "px",
                        left: animation.baseSize * 1.2 + "px",
                        top: animation.baseSize * 0.15 + "px",
                        filter: "blur(1px)",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Sky Dust Particles */}
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
              const particle = generateParticleAnimation(i);

              return (
                <motion.div
                  key={`particle-${i}`}
                  className={`absolute ${particle.colorClass} rounded-full`}
                  style={{
                    left: particle.leftPercent + "%",
                    top: particle.topPercent + "%",
                    width: particle.particleSize + "px",
                    height: particle.particleSize + "px",
                    filter: "blur(0.5px)",
                    boxShadow: "0 0 4px rgba(59, 130, 246, 0.4)",
                    willChange: "transform, opacity", // GPU 가속 활성화
                  }}
                  animate={{
                    y: [0, -40, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.5, 1.2, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

            {/* Flying Airplanes */}
            {Array.from({ length: AIRPLANE_COUNT }).map((_, i) => {
              const airplane = generateAirplaneAnimation(i);

              return (
                <motion.div
                  key={`airplane-${i}`}
                  className="absolute"
                  style={{
                    top: airplane.topPercent + "%",
                    willChange: "transform", // GPU 가속 활성화
                  }}
                  animate={{
                    x: [-150, screenWidth + 150],
                    rotate: [0, 2, -1, 1, 0],
                  }}
                  transition={{
                    x: {
                      duration: airplane.duration,
                      repeat: Infinity,
                      delay: airplane.delay,
                      ease: "linear",
                    },
                    rotate: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  {/* Airplane Shape */}
                  <div
                    className="relative"
                    style={{
                      width: airplane.size + "px",
                      height: airplane.size * 0.6 + "px",
                    }}
                  >
                    {/* Main Body */}
                    <div
                      className="absolute bg-white/80 rounded-full"
                      style={{
                        width: airplane.size * 0.8 + "px",
                        height: airplane.size * 0.15 + "px",
                        left: airplane.size * 0.1 + "px",
                        top: airplane.size * 0.225 + "px",
                        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                      }}
                    />
                    {/* Wings */}
                    <div
                      className="absolute bg-white/70 rounded-full"
                      style={{
                        width: airplane.size * 0.6 + "px",
                        height: airplane.size * 0.08 + "px",
                        left: airplane.size * 0.2 + "px",
                        top: airplane.size * 0.26 + "px",
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                      }}
                    />
                    {/* Tail */}
                    <div
                      className="absolute bg-white/60"
                      style={{
                        width: airplane.size * 0.12 + "px",
                        height: airplane.size * 0.25 + "px",
                        left: airplane.size * 0.05 + "px",
                        top: airplane.size * 0.175 + "px",
                        clipPath: "polygon(0% 50%, 100% 0%, 100% 100%)",
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                      }}
                    />
                    {/* Contrail */}
                    <div
                      className="absolute bg-gradient-to-r from-white/40 to-transparent rounded-full"
                      style={{
                        width: airplane.size * 2 + "px",
                        height: airplane.size * 0.04 + "px",
                        left: -airplane.size * 1.5 + "px",
                        top: airplane.size * 0.28 + "px",
                        filter: "blur(1px)",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Flying Birds */}
            {Array.from({ length: BIRD_COUNT }).map((_, i) => {
              const topPercent = 15 + i * 15;
              const duration = 20 + i * 3;
              const delay = i * 6;

              return (
                <motion.div
                  key={`bird-${i}`}
                  className="absolute text-white/60 text-lg"
                  style={{
                    top: topPercent + "%",
                    willChange: "transform", // GPU 가속 활성화
                  }}
                  animate={{
                    x: [-50, screenWidth + 50],
                    y: [0, -10, 5, -5, 0],
                  }}
                  transition={{
                    x: {
                      duration,
                      repeat: Infinity,
                      delay,
                      ease: "linear",
                    },
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  🕊️
                </motion.div>
              );
            })}

            {/* Interactive Airplane - Light Mode */}
            {showAirplane && (
              <motion.div
                className="absolute z-50"
                style={{
                  top: "30%",
                  left: "-100px",
                }}
                initial={{ x: -100, opacity: 0 }}
                animate={{
                  x: screenWidth + 100,
                  opacity: 1,
                  rotate: [0, 2, -1, 1, 0],
                }}
                transition={{
                  x: { duration: 3, ease: "easeInOut" },
                  opacity: { duration: 0.5 },
                  rotate: {
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                onAnimationComplete={() => setShowAirplane(false)}
              >
                {/* White Airplane for Light Mode */}
                <div
                  className="relative"
                  style={{ width: "120px", height: "72px" }}
                >
                  {/* Main Body - 더 길고 현실적으로 */}
                  <div
                    className="absolute bg-gradient-to-r from-white to-gray-100 rounded-full"
                    style={{
                      width: "96px",
                      height: "18px",
                      left: "12px",
                      top: "27px",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
                    }}
                  />

                  {/* Main Wings - 더 넓고 현실적으로 */}
                  <div
                    className="absolute bg-gradient-to-r from-white/95 to-gray-50/90 rounded-full"
                    style={{
                      width: "72px",
                      height: "12px",
                      left: "24px",
                      top: "31px",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                    }}
                  />

                  {/* Vertical Stabilizer (꼬리날개) */}
                  <div
                    className="absolute bg-gradient-to-b from-white/90 to-gray-100/80 rounded-full"
                    style={{
                      width: "8px",
                      height: "24px",
                      left: "6px",
                      top: "21px",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                    }}
                  />

                  {/* Horizontal Stabilizer (수평꼬리날개) */}
                  <div
                    className="absolute bg-gradient-to-r from-white/85 to-gray-100/75 rounded-full"
                    style={{
                      width: "24px",
                      height: "6px",
                      left: "0px",
                      top: "30px",
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                    }}
                  />

                  {/* Propeller */}
                  <div
                    className="absolute bg-gradient-to-br from-gray-400 to-gray-600 rounded-full"
                    style={{
                      width: "16px",
                      height: "16px",
                      left: "104px",
                      top: "28px",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                    }}
                  />

                  {/* Propeller Blades */}
                  <div
                    className="absolute bg-gray-500 rounded-full"
                    style={{
                      width: "2px",
                      height: "20px",
                      left: "111px",
                      top: "24px",
                      transform: "rotate(45deg)",
                    }}
                  />
                  <div
                    className="absolute bg-gray-500 rounded-full"
                    style={{
                      width: "2px",
                      height: "20px",
                      left: "111px",
                      top: "24px",
                      transform: "rotate(-45deg)",
                    }}
                  />

                  {/* Cockpit */}
                  <div
                    className="absolute bg-gradient-to-b from-blue-200 to-blue-300 rounded-full"
                    style={{
                      width: "12px",
                      height: "8px",
                      left: "84px",
                      top: "29px",
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </>
        ) : (
          // Dark Mode - Stars and Night Elements
          <>
            {/* Twinkling Stars */}
            {Array.from({ length: STAR_COUNT }).map((_, i) => {
              const star = generateStarAnimation(i);

              return (
                <motion.div
                  key={`star-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: star.leftPercent + "%",
                    top: star.topPercent + "%",
                    width: star.size + "px",
                    height: star.size + "px",
                    boxShadow: `0 0 ${
                      star.size * 3
                    }px rgba(255, 255, 255, 0.8)`,
                    willChange: "transform, opacity", // GPU 가속 활성화
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: star.duration,
                    repeat: Infinity,
                    delay: star.delay,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

            {/* Shooting Stars */}
            {Array.from({ length: SHOOTING_STAR_COUNT }).map((_, i) => (
              <motion.div
                key={`shooting-star-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: 20 + i * 30 + "%",
                  left: "-10px",
                  boxShadow:
                    "0 0 10px rgba(255, 255, 255, 1), 2px 0 20px rgba(255, 255, 255, 0.5)",
                  willChange: "transform, opacity", // GPU 가속 활성화
                }}
                animate={{
                  x: [0, screenWidth + 100],
                  y: [0, 50],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 10 + 2,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Constellation Lines */}
            {Array.from({ length: CONSTELLATION_COUNT }).map((_, i) => {
              const angle = (i * 45) % 360;
              const length = 80 + ((i * 20) % 100);

              return (
                <motion.div
                  key={`constellation-${i}`}
                  className="absolute opacity-20"
                  style={{
                    left: 30 + ((i * 12) % 40) + "%",
                    top: 20 + ((i * 15) % 60) + "%",
                    width: length + "px",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: "left center",
                    willChange: "opacity", // GPU 가속 활성화
                  }}
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 4 + (i % 3),
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              );
            })}

            {/* Interactive Airplane - Dark Mode */}
            {showAirplane && (
              <motion.div
                className="absolute z-50"
                style={{
                  top: "30%",
                  left: "-100px",
                }}
                initial={{ x: -100, opacity: 0 }}
                animate={{
                  x: screenWidth + 100,
                  opacity: 1,
                  rotate: [0, 2, -1, 1, 0],
                }}
                transition={{
                  x: { duration: 3, ease: "easeInOut" },
                  opacity: { duration: 0.5 },
                  rotate: {
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                onAnimationComplete={() => setShowAirplane(false)}
              >
                {/* Lit Airplane for Dark Mode */}
                <div
                  className="relative"
                  style={{ width: "120px", height: "72px" }}
                >
                  {/* Main Body with Light - 더 길고 현실적으로 */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "96px",
                      height: "18px",
                      left: "12px",
                      top: "27px",
                      background:
                        "linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)",
                      filter:
                        "drop-shadow(0 4px 8px rgba(251, 191, 36, 0.3)) drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))",
                    }}
                  />

                  {/* Main Wings with Light - 더 넓고 현실적으로 */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "72px",
                      height: "12px",
                      left: "24px",
                      top: "31px",
                      background:
                        "linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)",
                      filter:
                        "drop-shadow(0 2px 4px rgba(251, 191, 36, 0.2)) drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))",
                    }}
                  />

                  {/* Vertical Stabilizer with Light (꼬리날개) */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "8px",
                      height: "24px",
                      left: "6px",
                      top: "21px",
                      background:
                        "linear-gradient(180deg, #fbbf24, #f59e0b, #fbbf24)",
                      filter:
                        "drop-shadow(0 2px 4px rgba(251, 191, 36, 0.2)) drop-shadow(0 0 6px rgba(251, 191, 36, 0.4))",
                    }}
                  />

                  {/* Horizontal Stabilizer with Light (수평꼬리날개) */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "24px",
                      height: "6px",
                      left: "0px",
                      top: "30px",
                      background:
                        "linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24)",
                      filter:
                        "drop-shadow(0 1px 2px rgba(251, 191, 36, 0.2)) drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))",
                    }}
                  />

                  {/* Propeller with Light */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "16px",
                      height: "16px",
                      left: "104px",
                      top: "28px",
                      background: "linear-gradient(45deg, #fbbf24, #f59e0b)",
                      filter:
                        "drop-shadow(0 2px 4px rgba(251, 191, 36, 0.3)) drop-shadow(0 0 8px rgba(251, 191, 36, 0.7))",
                    }}
                  />

                  {/* Propeller Blades with Light */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "2px",
                      height: "20px",
                      left: "111px",
                      top: "24px",
                      transform: "rotate(45deg)",
                      background: "linear-gradient(180deg, #fbbf24, #f59e0b)",
                      filter: "drop-shadow(0 0 4px rgba(251, 191, 36, 0.6))",
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "2px",
                      height: "20px",
                      left: "111px",
                      top: "24px",
                      transform: "rotate(-45deg)",
                      background: "linear-gradient(180deg, #fbbf24, #f59e0b)",
                      filter: "drop-shadow(0 0 4px rgba(251, 191, 36, 0.6))",
                    }}
                  />

                  {/* Cockpit with Light */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "12px",
                      height: "8px",
                      left: "84px",
                      top: "29px",
                      background: "linear-gradient(180deg, #fbbf24, #f59e0b)",
                      filter:
                        "drop-shadow(0 1px 2px rgba(251, 191, 36, 0.3)) drop-shadow(0 0 6px rgba(251, 191, 36, 0.5))",
                    }}
                  />

                  {/* Navigation Lights - 더 현실적인 위치 */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "4px",
                      height: "4px",
                      left: "90px",
                      top: "25px",
                      background: "#ef4444",
                      filter:
                        "drop-shadow(0 0 4px rgba(239, 68, 68, 0.8)) drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))",
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "4px",
                      height: "4px",
                      left: "90px",
                      top: "35px",
                      background: "#22c55e",
                      filter:
                        "drop-shadow(0 0 4px rgba(34, 197, 94, 0.8)) drop-shadow(0 0 8px rgba(34, 197, 94, 0.6))",
                    }}
                  />

                  {/* Wing Tip Lights */}
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "3px",
                      height: "3px",
                      left: "18px",
                      top: "28px",
                      background: "#3b82f6",
                      filter: "drop-shadow(0 0 3px rgba(59, 130, 246, 0.8))",
                    }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: "3px",
                      height: "3px",
                      left: "99px",
                      top: "28px",
                      background: "#3b82f6",
                      filter: "drop-shadow(0 0 3px rgba(59, 130, 246, 0.8))",
                    }}
                  />
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Atmospheric Depth Layers - Conditional */}
      {!isDarkMode ? (
        // Light Mode Atmosphere
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/15 via-transparent to-cyan-200/10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-sky-300/8 to-indigo-500/12"></div>
        </>
      ) : (
        // Dark Mode Atmosphere
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 via-transparent to-indigo-950/10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-900/5 to-black/15"></div>
        </>
      )}

      {/* Theme Toggle Button - Top Left */}
      <motion.button
        className="absolute top-6 left-6 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        onClick={toggleDarkMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </motion.div>
      </motion.button>

      {/* Advanced Music Player - Top Right */}
      <motion.div
        className="absolute top-6 right-6 z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg overflow-hidden"
          animate={{
            width: isPlayerExpanded ? 320 : 240,
            height: isPlayerExpanded ? 180 : 60,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* 컴팩트 플레이어 뷰 */}
          <motion.div
            className="p-3 cursor-pointer"
            onClick={togglePlayerExpanded}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center space-x-3">
              {/* 앨범 아트 */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="text-sm"
                >
                  🎵
                </motion.div>
              </div>

              {/* 곡 정보 */}
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold text-xs truncate">
                  Now Playing
                </div>
                <div className="text-white/70 text-xs truncate">
                  {musicTracks[currentTrack]?.name}
                </div>
              </div>

              {/* 음파 애니메이션 */}
              <div className="flex items-center space-x-0.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-white/70 rounded-full"
                    animate={{
                      height: [6, 16, 6],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* 다음 곡 버튼 */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextTrack();
                }}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SkipForward className="w-4 h-4 text-white" />
              </motion.button>

              {/* 확장/축소 아이콘 */}
              <motion.div
                animate={{ rotate: isPlayerExpanded ? 180 : 0 }}
                className="text-white/60 text-xs"
              >
                ▼
              </motion.div>
            </div>
          </motion.div>

          {/* 확장된 플레이어 뷰 */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isPlayerExpanded ? 1 : 0,
              height: isPlayerExpanded ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="px-3 pb-3"
          >
            {/* 볼륨 조절 */}
            <div className="mb-3">
              <div className="text-white/70 text-xs mb-2">Volume</div>
              <div className="flex items-center space-x-2">
                <span className="text-white/60 text-xs">🔉</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) ${
                      volume * 100
                    }%, rgba(255,255,255,0.2) ${
                      volume * 100
                    }%, rgba(255,255,255,0.2) 100%)`,
                  }}
                />
                <span className="text-white/60 text-xs">🔊</span>
              </div>
            </div>

            {/* 트랙 선택 */}
            <div>
              <div className="text-white/70 text-xs mb-2">Select Track</div>
              <div className="space-y-1 max-h-16 overflow-y-auto">
                {musicTracks.map((track, index) => (
                  <motion.button
                    key={index}
                    className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                      currentTrack === index
                        ? "bg-white/20 text-white"
                        : "text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                    onClick={() => handleTrackChange(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {currentTrack === index && "▶ "}
                    {track.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 커스텀 슬라이더 스타일 */}
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            cursor: pointer;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
          }
          .slider::-moz-range-thumb {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            cursor: pointer;
            border: none;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-[900] mb-8 leading-tight tracking-wider font-space">
            <span className="relative inline-block">
              <span
                className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent"
                style={{
                  WebkitTextStroke: "2px rgba(120, 53, 15, 0.2)",
                  textShadow:
                    "0 0 40px rgba(251, 191, 36, 1), 0 0 80px rgba(249, 115, 22, 0.8), 0 8px 16px rgba(120, 53, 15, 0.6)",
                  filter: "drop-shadow(0 4px 8px rgba(120, 53, 15, 0.4))",
                }}
              >
                DAZZLING
              </span>
              <br />
              <span
                className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 bg-clip-text text-transparent"
                style={{
                  WebkitTextStroke: "2px rgba(6, 78, 59, 0.2)",
                  textShadow:
                    "0 0 40px rgba(52, 211, 153, 1), 0 0 80px rgba(20, 184, 166, 0.8), 0 8px 16px rgba(6, 78, 59, 0.6)",
                  filter: "drop-shadow(0 4px 8px rgba(6, 78, 59, 0.4))",
                }}
              >
                MUSIC
              </span>
              <br />
              <span
                className="bg-gradient-to-r from-white via-yellow-100 to-orange-100 bg-clip-text text-transparent text-3xl md:text-5xl lg:text-6xl font-nunito font-bold"
                style={{
                  WebkitTextStroke: "1px rgba(120, 53, 15, 0.2)",
                  textShadow:
                    "0 0 30px rgba(255, 255, 255, 1), 0 0 60px rgba(251, 191, 36, 0.7), 0 6px 12px rgba(120, 53, 15, 0.4)",
                  filter: "drop-shadow(0 3px 6px rgba(120, 53, 15, 0.3))",
                }}
              >
                & AI CONTENTS STUDIO
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Audio Engineer Mode */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleModeSelect("audio")}
            className="group cursor-pointer"
          >
            <div className="relative bg-gradient-to-br from-orange-300 via-amber-400 to-yellow-500 rounded-3xl p-8 md:p-12 shadow-lg overflow-hidden backdrop-blur-sm h-full flex flex-col justify-between">
              {/* Floating Music Notes */}
              <div className="absolute inset-0 opacity-20">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-white text-2xl"
                    style={{
                      left: `${15 + i * 12}%`,
                      top: `${20 + (i % 3) * 25}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 3 + (i % 2),
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    ♪
                  </motion.div>
                ))}
              </div>

              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-white/20">
                    <Headphones className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-space drop-shadow-lg">
                  Recording & Engineering
                </h2>
                <p className="text-white/95 text-lg mb-6 font-nunito font-medium leading-relaxed drop-shadow-md">
                  • 전문 녹음 스튜디오
                  <br />
                  • 프리미엄 믹싱 & 마스터링
                  <br />
                  • 맞춤형 음악 제작
                </p>

                <motion.div
                  className="inline-flex items-center text-white font-semibold font-nunito bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/30"
                  whileHover={{ x: 10, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Music className="w-5 h-5 mr-2" />
                  입장하기
                </motion.div>
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-yellow-200/30 to-orange-300/30 opacity-0 group-hover:opacity-100 rounded-3xl"
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Web Developer Mode */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleModeSelect("webdev")}
            className="group cursor-pointer"
          >
            <div className="relative bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 rounded-3xl p-8 md:p-12 shadow-lg overflow-hidden backdrop-blur-sm h-full flex flex-col justify-between">
              {/* Floating Code Elements */}
              <div className="absolute inset-0 opacity-20">
                {["&lt;/&gt;", "{ }", "&lt;Html&gt;", "CSS", "JS", "React"].map(
                  (code, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-white font-mono text-sm"
                      style={{
                        left: `${10 + i * 15}%`,
                        top: `${15 + (i % 4) * 20}%`,
                      }}
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.2, 0.5, 0.2],
                        scale: [0.9, 1.1, 0.9],
                      }}
                      transition={{
                        duration: 2.5 + (i % 3) * 0.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                      }}
                    >
                      {code}
                    </motion.div>
                  )
                )}
              </div>

              <div className="relative z-10">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm border border-white/20">
                    <Monitor className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-space drop-shadow-lg">
                  Web & AI Developing
                </h2>
                <p className="text-white/95 text-lg mb-6 font-nunito font-medium leading-relaxed drop-shadow-md">
                  • 전문 웹 개발
                  <br />
                  • 혁신적인 디지털 솔루션
                  <br />
                  • 맞춤형 AI 서비스
                </p>

                <motion.div
                  className="inline-flex items-center text-white font-semibold font-nunito bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm border border-white/30"
                  whileHover={{ x: 10, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Code className="w-5 h-5 mr-2" />
                  입장하기
                </motion.div>
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-teal-200/30 to-cyan-300/30 opacity-0 group-hover:opacity-100 rounded-3xl"
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <motion.div
            className="text-lg md:text-xl font-space font-semibold text-white relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* 배경 글로우 효과 */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-xl blur-xl"></div>

            {/* 메인 텍스트 */}
            <div
              className="relative px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-300"
              onClick={() => {
                const audio = new Audio("/studio_main/welcome_aboard.mp3");
                audio.volume = 0.5;
                audio.play().catch(console.error);
                triggerAirplaneAnimation();
              }}
            >
              {"Welcome aboard the Dazzling Studio!"
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.9 + index * 0.08,
                      ease: "easeOut",
                    }}
                    whileHover={{
                      scale: 1.1,
                      color: "#fbbf24",
                      textShadow: "0 0 12px rgba(251, 191, 36, 0.8)",
                      transition: { duration: 0.2 },
                    }}
                    style={{
                      display: char === " " ? "inline" : "inline-block",
                      marginRight: char === " " ? "0.4rem" : "0",
                      textShadow:
                        "0 2px 4px rgba(0, 0, 0, 0.8), 0 0 15px rgba(59, 130, 246, 0.6)",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}

              {/* 언더라인 애니메이션 */}
              <motion.div
                className="absolute bottom-1 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 2.5, ease: "easeInOut" }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Background Music - Advanced Player */}
      <audio
        ref={(el) => setAudioRef(el)}
        src={musicTracks[currentTrack]?.file}
        autoPlay
        loop
        style={{ display: "none" }}
        onLoadedData={() => {
          if (audioRef) {
            audioRef.volume = volume;
          }
        }}
      />

      {/* AI 상담사 */}
      <AIConsultant
        consultantType="general"
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </motion.div>
  );
}
