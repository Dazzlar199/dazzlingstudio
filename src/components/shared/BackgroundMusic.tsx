"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface BackgroundMusicProps {
  src: string;
  autoPlay?: boolean;
}

export default function BackgroundMusic({
  src,
  autoPlay = true,
}: BackgroundMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.loop = true;

    // 강제 자동재생 시도
    if (autoPlay) {
      const tryPlay = () => {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setShowControls(false);
          })
          .catch((error) => {
            console.log("자동재생 재시도 중...", error);
            // 계속 재시도
            setTimeout(tryPlay, 1000);
          });
      };

      // 즉시 재생 시도
      tryPlay();
    }

    // 사용자 상호작용 시 확실히 재생
    const handleUserInteraction = () => {
      if (!isPlaying && autoPlay) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setShowControls(false);
          })
          .catch(() => {
            // 실패해도 계속 시도
            setTimeout(() => {
              audio.play().catch(() => {});
            }, 500);
          });
      }
    };

    // 모든 종류의 사용자 상호작용에 대응
    const events = ["click", "keydown", "touchstart", "mousemove", "scroll"];
    events.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, [autoPlay, volume, isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("재생 실패:", error);
        });
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume;
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadStart={() => console.log("BGM 로딩 시작")}
        onCanPlay={() => console.log("BGM 재생 준비 완료")}
      />

      {/* BGM 컨트롤 */}
      <motion.div
        className="fixed bottom-4 left-4 z-50"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: showControls || !autoPlay ? 1 : 0.7, x: 0 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setShowControls(true)}
        onHoverEnd={() => setShowControls(false)}
      >
        <div className="bg-black/20 backdrop-blur-md rounded-full p-3 flex items-center space-x-3">
          {/* 재생/일시정지 버튼 */}
          <motion.button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5 ml-0.5" />
            )}
          </motion.button>

          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex items-center space-x-3 overflow-hidden"
              >
                {/* 음소거 버튼 */}
                <motion.button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </motion.button>

                {/* 볼륨 슬라이더 */}
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer volume-slider"
                    style={{
                      background: `linear-gradient(to right, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.6) ${
                        volume * 100
                      }%, rgba(255,255,255,0.2) ${
                        volume * 100
                      }%, rgba(255,255,255,0.2) 100%)`,
                    }}
                  />
                  <span className="text-white text-xs font-mono min-w-[2rem]">
                    {Math.round(volume * 100)}%
                  </span>
                </div>

                {/* BGM 라벨 */}
                <span className="text-white text-xs font-light opacity-80">
                  BGM
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style jsx>{`
        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </>
  );
}
