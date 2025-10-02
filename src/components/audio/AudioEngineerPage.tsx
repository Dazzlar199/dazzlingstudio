"use client";

import { motion } from "framer-motion";
import { useState, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  Calendar,
  Star,
  Mail,
  MapPin,
  Clock,
  Music,
  Mic,
  Heart,
  Award,
  CheckCircle,
  ArrowRight,
  Volume2,
  Zap,
  Headphones,
  Settings,
  MessageCircle,
} from "lucide-react";
import AIConsultant from "@/components/shared/AIConsultant";

export default function AudioEngineerPage() {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [revealedPrices, setRevealedPrices] = useState<Set<number>>(new Set());
  const [showKakaoModal, setShowKakaoModal] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState<number | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );
  const [sampleIndices, setSampleIndices] = useState<{ [key: number]: number }>(
    {
      1: 0, // 축가 녹음 서비스
      2: 0, // 커버 녹음 서비스
      3: 0, // AI 서비스
      4: 0, // Pro Mixing & Mastering 서비스
    }
  );

  // 스튜디오 메인 이미지들 - useMemo로 최적화
  const studioImages = useMemo(
    () => [
      "/studio_main/firstmain.jpeg",
      "/studio_main/main4.png",
      "/studio_main/main2.jpeg",
      "/studio_main/main1.jpeg",
    ],
    []
  );

  // 4개 메인 서비스 - useMemo로 최적화
  const mainServices = useMemo(
    () => [
      {
        id: 1,
        title: "축가 녹음 패키지",
        subtitle: "평생 간직할 특별한 순간",
        description: "결혼식을 더욱 감동적으로 만들어 드립니다",
        icon: Heart,
        color: "from-rose-600 to-red-700",
        bgColor: "bg-rose-50",
        textColor: "text-rose-700",
        image: "/studio_main/wedding.png", // 축가 녹음 실제 이미지
        audioSamples: [
          {
            title: "나를 사랑하는 그대에게",
            file: "/music/wedding1_나를 사랑하는 그대에게.mp3",
          },
          {
            title: "진심이 담긴 노래",
            file: "/music/wedding2_진심이 담긴 노래.mp3",
          },
          { title: "넌 감동이었어", file: "/music/wedding3_넌 감동이었어.mp3" },
        ],
        features: [
          "🎤 녹음 1시간 + 디렉팅 + 보정 (믹싱/마스터링) **추가 1시간당 50,000원**",
          "🎵 MR 제공",
          "🎤 고급 스튜디오 녹음",
          "💿 고음질 파일 제공",
          "🎁 립싱크 AR, 라이브 AR 제공",
        ],
        process: [
          "상담 & 곡 선정",
          "녹음 진행",
          "믹싱 & 마스터링",
          "최종 파일 전달",
        ],
        priceRange: "150,000원 ~ 800,000원",
        originalPrice: "200,000원",
        discountPrice: "100,000원",
        duration: "3일 이내",
        popular: true,
        discount: true,
        requestCount: "100회 이상",
        ctaText: "축가 녹음 상담하기",
      },
      {
        id: 2,
        title: "커버 녹음 패키지",
        subtitle: "좋아하는 곡을 내 목소리로",
        description: "인기곡을 나만의 스타일로 재탄생시켜 드립니다",
        icon: Mic,
        color: "from-slate-600 to-slate-800",
        bgColor: "bg-slate-50",
        textColor: "text-slate-700",
        image: "/studio_main/cover.png", // 커버 녹음 실제 이미지
        audioSamples: [
          { title: "피차일반", file: "/music/cover1_피차일반.mp3" },
          { title: "넌 감동이었어", file: "/music/cover2_넌 감동이었어.mp3" },
          { title: "보도지침", file: "/music/cover3_보도지침.mp3" },
        ],
        features: [
          "🎤 녹음 1시간 + 디렉팅 + 보정 (믹싱/마스터링) **추가 1시간당 50,000원**",
          "🎵 MR 제공",
          "🎤 고급 스튜디오 녹음",
          "💿 고음질 파일 제공",
          "🎬 촬영 서비스 제공",
        ],
        process: [
          "곡 선택 & 스타일 논의",
          "보컬 녹음",
          "믹싱 & 마스터링",
          "최종 파일 전달",
        ],
        priceRange: "150,000원 ~ 500,000원",
        originalPrice: "200,000원",
        discountPrice: "100,000원",
        duration: "3일 이내",
        discount: true,
        requestCount: "60회 이상",
        ctaText: "커버 녹음 상담하기",
      },
      {
        id: 3,
        title: "AI로 나만의 노래 만들기 (음원 발매 포함)",
        subtitle: "음원 발매까지 원스톱 서비스",
        description:
          "AI를 활용한 작곡부터 유통까지, 당신의 음악을 세상에 알려드립니다",
        icon: Star,
        color: "from-yellow-500 to-amber-600",
        bgColor: "bg-yellow-50",
        textColor: "text-yellow-700",
        image: "/studio_main/ai_produce.png", // 사진 자리
        audioSamples: [
          { title: "한잔하고 걷자", file: "/music/ai1_한잔하고 걷자.mp3" },
          { title: "나의 작은 우주", file: "/music/ai2_나의 작은 우주.mp3" },
          { title: "시간이야", file: "/music/ai3_시간이야.mp3" },
        ],
        features: [
          "🎼 컨셉 회의 및 AI 작곡",
          "🎹 완전 창작 멜로디",
          "📝 가사 작업 지원",
          "🎵 풀 프로덕션",
          "🌐 음원 플랫폼 유통",
        ],
        process: [
          "컨셉 기획",
          "프리프로덕션",
          "본 녹음",
          "믹싱 & 마스터링",
          "음원 유통",
        ],
        priceRange: "700,000원",
        originalPrice: "700,000원",
        discountPrice: "400,000원",
        duration: "2주 이내",
        premium: true,
        discount: true,
        requestCount: "20회 이상",
        ctaText: "AI 음원 제작 상담하기",
      },
      {
        id: 4,
        title: "Pro Mixing & Mastering",
        subtitle: "상업 음악 수준의 완성도",
        description: "프로 수준의 사운드로 업그레이드해 드립니다",
        icon: Settings,
        color: "from-slate-700 to-gray-800",
        bgColor: "bg-gray-50",
        textColor: "text-gray-700",
        image: "/studio_main/pro_mixing.png", // 사진 자리
        audioSamples: [
          { title: "On My Way", file: "/music/PRO1_On My Way.mp3" },
          {
            title: "KEEPING THE FIRE",
            file: "/music/PRO2_KEEPING THE FIRE (2024 rock ver.).mp3",
          },
          { title: "Sarr", file: "/music/PRO3_Sarr.mp3" },
        ],
        features: [
          "🎛️ 프로 장비 믹싱",
          "🔊 라우드니스 최적화",
          "🎚️ 멀티트랙 밸런싱",
          "✨ 사운드 보정 & 향상",
          "📀 배포용 마스터링",
        ],
        process: [
          "트랙 분석",
          "믹싱 작업",
          "클라이언트 피드백",
          "수정 작업",
          "마스터링",
          "최종 파일",
        ],
        priceRange: "400,000원 ~",
        duration: "3-7일",
        requestCount: "50회 이상",
        ctaText: "Pro Mixing & Mastering 상담하기",
      },
    ],
    []
  );

  // 서브 서비스 (간단한 서비스들) - useMemo로 최적화
  const subServices = useMemo(
    () => [
      {
        title: "Recording",
        description: "간단한 보컬 녹음 서비스",
        price: "50,000원",
        duration: "1시간 당",
        icon: Headphones,
      },
      {
        title: "Mixing",
        description: "보컬 튠, 멀티 트랙 믹싱 등",
        price: "100,000원~",
        duration: "3일 이내",
        icon: Music,
      },
      {
        title: "Mastering",
        description: "믹싱 음원 마스터링",
        price: "100,000원",
        duration: "1일 이내",
        icon: Volume2,
      },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        name: "이** 고객님",
        date: "2025.07",
        rating: 5,
        comment:
          "진짜 친절한 응대에 한번 감동, 실제 녹음 때도 너무 편안하게 잘 해주셔서 긴장 1도 안 하고 재밌게 즐기며 하고 돌아왔습니다!! 작업실 도 너무 깔끔하니 좋습니다! 무조건 예식이나 특별한 날 부를 노래 녹음이 필요하다면 이곳 강추 드립니다!! 가격도 너무 저렴한데 퀄리티도 높고 심지어 급하게 요 청드렸는데도 작업 속도도 빠르셔서 바로 다다음날에 작업본도 받 아볼 수 있었어요! 정말 감사합니닷!!",
        service: "축가 녹음 패키지",
        image: "/studio_main/review/wedding_review.jpeg",
      },
      {
        name: "김** 고객님",
        date: "2025.03",
        rating: 5,
        comment:
          "프로포즈 영상에 넣을려고 녹음실 찾아갔는데, 처음 녹음하는거라 긴장됐음에도 편하게 하시라고 안심시켜주시더라구여! 녹음 시작되 고 너무 어색하고 노래방과 사뭇다른 이 오글거림을 참고 무사히 녹 음을 마쳤습니다! 결과물도 빨리 만들어주셨고 훨씬 깔끔해지고 듣 기 좋아져서 영상 이제 빨리 만들어야겠어요!!하ㅎ감사합니다!!",
        service: "커버 녹음 패키지",
        image: "/studio_main/review/cover_review.jpeg",
      },
      {
        name: "S** 고객님",
        date: "2025.05",
        rating: 5,
        comment:
          "첫 녹음이라 떨렸는데 선생님께서 처음부터 친절하게 안내해주고 이끌어주셔서 정말 맘 편하게 했어요!!! 시간도 잘 맞춰주시는데다 작업물도 빨리 받아볼 수 있어서 좋았어용 그리고 비용 측면에서도 다른 데에 비해 훨씬 더 합리적이니 참고하세용 ~~",
        service: "AI로 나만의 노래 만들기",
        image: "/studio_main/review/ai_review.jpeg",
      },
      {
        name: "김** 고객님",
        date: "2025.08",
        rating: 5,
        comment:
          "전문가분과 작업해보는 것은 이번이 처음이었는데, 대학생이라는 신분에 있어 전문성과 가격을 모두 고려했을 때 최고의 선택이었던 의뢰였습니다. 많은 견적을 받았지만 같은 서비스를 기준으로 저렴하지만 최고의 결과물을 받을 수 있어 매우 만족스러웠고, 친절하게 안내해주셔서 작업이 즐거웠습니다. 마지막으로 아마추어다보니 음악적 감이 부족해 요청드리지 못했던 이펙트까지 감각적으로 넣어주셔서 곡의 완성도를 올려주셨습니다. 다시 한 번 감사드리고, 다음에 또 이용하겠습니다",
        service: "Pro Mixing & Mastering",
        image: "/studio_main/review/promixing_review.jpeg",
      },
    ],
    []
  );

  // 오디오 재생 핸들러 (1분 제한)
  const handlePlaySample = useCallback(
    (id: string) => {
      // 현재 재생 중인 오디오가 같은 것이면 정지
      if (isPlaying === id) {
        if (audioElement) {
          audioElement.pause();
          audioElement.currentTime = 0;
        }
        setIsPlaying(null);
        return;
      }

      // 이전 오디오 정지
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }

      // 새 오디오 재생
      let audioSrc = "";

      // Wedding 샘플인지 확인
      if (id.startsWith("wedding-sample-")) {
        const weddingService = mainServices.find((s) => s.id === 1);
        const currentIndex = sampleIndices[1] || 0;
        if (weddingService?.audioSamples?.[currentIndex]) {
          audioSrc = weddingService.audioSamples[currentIndex].file;
        }
      } else if (id.startsWith("cover-sample-")) {
        // Cover 샘플인지 확인
        const coverService = mainServices.find((s) => s.id === 2);
        const currentIndex = sampleIndices[2] || 0;
        if (coverService?.audioSamples?.[currentIndex]) {
          audioSrc = coverService.audioSamples[currentIndex].file;
        }
      } else if (id.startsWith("ai-sample-")) {
        // AI 샘플인지 확인
        const aiService = mainServices.find((s) => s.id === 3);
        const currentIndex = sampleIndices[3] || 0;
        if (aiService?.audioSamples?.[currentIndex]) {
          audioSrc = aiService.audioSamples[currentIndex].file;
        }
      } else if (id.startsWith("pro-sample-")) {
        // Pro 샘플인지 확인
        const proService = mainServices.find((s) => s.id === 4);
        const currentIndex = sampleIndices[4] || 0;
        if (proService?.audioSamples?.[currentIndex]) {
          audioSrc = proService.audioSamples[currentIndex].file;
        }
      }
      // 모든 서비스가 audioSamples를 사용하므로 이 부분은 더 이상 필요 없음

      if (audioSrc) {
        const audio = new Audio(audioSrc);

        // 오디오 로딩 에러 처리
        audio.addEventListener("error", (e) => {
          console.error("Audio loading failed:", audioSrc, e);
          setIsPlaying(null);
          alert("오디오 파일을 불러올 수 없습니다.");
        });

        // 1분 제한 설정
        audio.addEventListener("loadedmetadata", () => {
          if (audio.duration > 60) {
            audio.currentTime = 0; // 처음부터 시작
          }
        });

        // 1분 후 자동 정지
        audio.addEventListener("timeupdate", () => {
          if (audio.currentTime >= 60) {
            audio.pause();
            audio.currentTime = 0;
            setIsPlaying(null);
          }
        });

        // 재생 완료 시 정지
        audio.addEventListener("ended", () => {
          setIsPlaying(null);
        });

        audio.play().catch((error) => {
          console.error("Audio play failed:", error);
          setIsPlaying(null);
        });
        setAudioElement(audio);
        setIsPlaying(id);
      }
    },
    [isPlaying, audioElement, mainServices, sampleIndices]
  );

  const handleCopyEmail = useCallback(async () => {
    const email = "rlackswn2000@naver.com";
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // 폴백: 텍스트 선택으로 복사 유도
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      } catch (fallbackErr) {
        console.error("복사 실패:", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  }, []);

  // 가격 공개 핸들러
  const handleRevealPrice = useCallback((serviceId: number) => {
    setCurrentServiceId(serviceId);
    setShowKakaoModal(true);
  }, []);

  // 카카오톡 친구추가 완료 핸들러
  const handleKakaoFriendAdded = useCallback(() => {
    if (currentServiceId !== null) {
      setRevealedPrices((prev) => new Set(prev).add(currentServiceId));
      setShowKakaoModal(false);
      setCurrentServiceId(null);
    }
  }, [currentServiceId]);

  // 모달 닫기 핸들러
  const handleCloseModal = useCallback(() => {
    setShowKakaoModal(false);
    setCurrentServiceId(null);
  }, []);

  // 샘플 인덱스 변경 핸들러
  const handleSampleIndexChange = useCallback(
    (serviceId: number, direction: "prev" | "next", maxLength: number) => {
      // 현재 재생 중인지 확인
      let sampleType = "";
      if (serviceId === 1) sampleType = "wedding";
      else if (serviceId === 2) sampleType = "cover";
      else if (serviceId === 3) sampleType = "ai";
      else if (serviceId === 4) sampleType = "pro";

      const currentPlayingId = `${sampleType}-sample-${serviceId}`;
      const wasPlaying = isPlaying === currentPlayingId;

      // 이전 오디오 정지
      if (audioElement && wasPlaying) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }

      setSampleIndices((prev) => {
        const currentIndex = prev[serviceId] || 0;
        let newIndex;

        if (direction === "prev") {
          newIndex = currentIndex > 0 ? currentIndex - 1 : maxLength - 1;
        } else {
          newIndex = currentIndex < maxLength - 1 ? currentIndex + 1 : 0;
        }

        // 인덱스 업데이트 후 재생 중이었다면 새 샘플 재생
        if (wasPlaying) {
          setTimeout(() => {
            handlePlaySample(currentPlayingId);
          }, 100);
        }

        return { ...prev, [serviceId]: newIndex };
      });
    },
    [isPlaying, audioElement, handlePlaySample]
  );

  // 스튜디오 이미지 자동 슬라이더 - 메모리 최적화
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % studioImages.length);
    }, 4000); // 4초마다 변경

    return () => {
      clearInterval(interval);
    };
  }, [studioImages.length]);

  // 컴포넌트 언마운트 시 오디오 정리
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    };
  }, [audioElement]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background)", color: "var(--text)" }}
    >
      {/* Premium Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-gray-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* 로고 영역 */}
            <div className="flex items-center space-x-3">
              <Image
                src="/studio_main/DS_LOGO.png"
                alt="DAZZLING STUDIO Logo"
                width={120}
                height={48}
                className="h-12 w-auto"
                priority
              />
              <div>
                <span className="font-bold text-2xl bg-gradient-to-r from-slate-800 to-yellow-600 bg-clip-text text-transparent">
                  DAZZLING STUDIO
                </span>
                <div className="text-xs text-gray-500 font-medium">
                  RECORDING & ENGINEERING
                </div>
              </div>
            </div>

            {/* 네비게이션 메뉴 + CTA 버튼 - 오른쪽 그룹 */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="/main"
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-base relative group"
              >
                메인
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a
                href="#services"
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-base relative group"
              >
                서비스
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-base relative group"
              >
                후기
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium text-base relative group"
              >
                연락처
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-300 group-hover:w-full"></span>
              </a>

              {/* CTA 버튼 */}
              <motion.a
                href="http://pf.kakao.com/_gxgbxcn/chat"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-slate-800 to-yellow-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4 mr-2 inline" />
                무료 상담 예약
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - 클래식 네이비-골드 디자인 */}
      <section className="pt-20 min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-yellow-50">
        {/* 고급스러운 배경 패턴 */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(71,85,105,0.08),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(202,138,4,0.08),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-slate-300 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-18 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* 왼쪽: 텍스트 컨텐츠 */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-slate-800 text-sm font-medium">
                    <Award className="w-4 h-4 mr-2" />
                    전문 오디오 엔지니어링
                  </div>

                  <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-slate-800 to-yellow-600 bg-clip-text text-transparent">
                      나만의 음악
                    </span>
                    <br />
                    <span className="text-gray-900">프로의 손길로</span>
                    <br />
                    <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                      완성하다
                    </span>
                  </h1>

                  <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                    축가부터 창작곡까지, 당신의 특별한 순간을 더욱 감동적으로
                    만들어드립니다. 전문 장비와 다년간의 노하우로 최고의 음질을
                    보장합니다.
                  </p>
                </motion.div>

                {/* CTA 버튼들 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <motion.a
                    href="http://pf.kakao.com/_gxgbxcn/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-gradient-to-r from-slate-800 to-yellow-600 text-white rounded-full font-semibold text-lg shadow-lg"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px -12px rgba(71,85,105,0.35)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Calendar className="w-5 h-5 mr-2 inline" />
                    무료 상담 받기
                  </motion.a>

                  <motion.a
                    href="/studio_main/Dazzlar_portfolio.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border-2 border-slate-800 text-slate-800 rounded-full font-semibold text-lg hover:bg-slate-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5 mr-2 inline" />
                    포트폴리오 보기
                  </motion.a>
                </motion.div>

                {/* 통계 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-yellow-600 bg-clip-text text-transparent">
                      300+
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      완성된 프로젝트
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-yellow-600 bg-clip-text text-transparent">
                      99%
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      고객 만족도
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-yellow-600 bg-clip-text text-transparent">
                      7년+
                    </div>
                    <div className="text-sm text-gray-600 mt-1">전문 경력</div>
                  </div>
                </motion.div>
              </div>

              {/* 오른쪽: 비주얼 컨텐츠 */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* 스튜디오 메인 이미지 슬라이더 */}
                <div className="relative">
                  <div className="w-full h-96 rounded-3xl shadow-2xl overflow-hidden relative">
                    {/* 이미지 슬라이더 */}
                    <div className="relative w-full h-full">
                      {studioImages.map((image, index) => (
                        <motion.div
                          key={index}
                          className="absolute inset-0"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: currentImageIndex === index ? 1 : 0,
                            scale: currentImageIndex === index ? 1 : 1.05,
                          }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                          <Image
                            src={image}
                            alt={`스튜디오 이미지 ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            onError={() => {
                              // Error handling for Next.js Image
                              console.error('Image failed to load:', image);
                            }}
                          />
                          {/* 오버레이 그라데이션 */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        </motion.div>
                      ))}
                    </div>

                    {/* 이미지 인디케이터 */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {studioImages.map((_, index) => (
                        <motion.button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentImageIndex === index
                              ? "bg-white shadow-lg"
                              : "bg-white/50 hover:bg-white/80"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        />
                      ))}
                    </div>

                    {/* 스튜디오 정보 오버레이 */}
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                      <p className="text-white text-sm font-medium">
                        DAZZLING STUDIO
                      </p>
                      <p className="text-white/80 text-xs">
                        Professional Recording Environment
                      </p>
                    </div>
                  </div>

                  {/* 플로팅 카드들 */}
                  <motion.div
                    className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-lg"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ willChange: "transform" }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                        <Heart className="w-4 h-4 text-rose-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          축가 녹음
                        </div>
                        <div className="text-xs text-gray-500">최고 인기</div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                    style={{ willChange: "transform" }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Star className="w-4 h-4 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          창작곡 제작
                        </div>
                        <div className="text-xs text-gray-500">프리미엄</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </section>

      {/* Main Services Section - 4개 핵심 서비스 */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 섹션 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 text-slate-800 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              프리미엄 서비스
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-800 to-yellow-600 bg-clip-text text-transparent">
                전문 오디오 서비스
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              축가부터 창작곡까지, 당신의 특별한 순간을 완벽하게 완성해
              드립니다. 프로 장비와 전문 엔지니어의 노하우로 최고의 품질을
              보장합니다.
            </p>
          </motion.div>

          {/* 4개 메인 서비스 카드 */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div
                    className={`rounded-3xl p-8 h-full transition-all duration-300 group-hover:shadow-2xl border-2 border-gray-100 group-hover:border-gray-200 ${service.bgColor}`}
                  >
                    {/* 배지 */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center flex-wrap gap-2">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${service.textColor} ${service.bgColor}`}
                        >
                          {service.popular && "🔥 인기"}
                          {service.premium && "⭐ 프리미엄"}
                          {!service.popular && !service.premium && "✨ 추천"}
                        </div>
                        {service.discount && (
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 animate-pulse">
                            ⚡ 특가 이벤트
                          </div>
                        )}
                        {service.requestCount && (
                          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800 font-semibold">
                            {`✅ ${service.requestCount} 완료`}
                          </div>
                        )}
                      </div>
                      <div
                        className={`p-3 rounded-2xl bg-gradient-to-br ${service.color} flex-shrink-0 ml-2`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* 서비스 정보 */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium mb-3">
                        {service.subtitle}
                      </p>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* 가격 정보 */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-full">
                          {service.discount &&
                          service.originalPrice &&
                          service.discountPrice ? (
                            <div className="space-y-1">
                              <div className="flex items-center space-x-3">
                                {/* 혜택가 블러 처리 */}
                                <div className="relative">
                                  <div
                                    className={`text-2xl font-bold text-red-600 transition-all duration-300 ${
                                      revealedPrices.has(service.id)
                                        ? ""
                                        : "blur-sm select-none"
                                    }`}
                                  >
                                    {service.discountPrice}
                                  </div>
                                  {!revealedPrices.has(service.id) && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="text-sm bg-yellow-500 text-white px-2 py-1 rounded-full font-bold animate-pulse">
                                        혜택가
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="text-lg text-gray-400 line-through">
                                  {service.originalPrice}
                                </div>
                                <div className="text-sm bg-red-500 text-white px-2 py-1 rounded-full font-bold">
                                  {`${Math.round(
                                    ((parseInt(
                                      service.originalPrice.replace(
                                        /[^0-9]/g,
                                        ""
                                      )
                                    ) -
                                      parseInt(
                                        service.discountPrice.replace(
                                          /[^0-9]/g,
                                          ""
                                        )
                                      )) /
                                      parseInt(
                                        service.originalPrice.replace(
                                          /[^0-9]/g,
                                          ""
                                        )
                                      )) *
                                      100
                                  )}% OFF`}
                                </div>
                              </div>
                              {!revealedPrices.has(service.id) && (
                                <button
                                  onClick={() => handleRevealPrice(service.id)}
                                  className="mt-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-semibold rounded-full transition-colors flex items-center space-x-2"
                                >
                                  <MessageCircle className="w-4 h-4" />
                                  <span>카카오톡 추가하고 혜택가 확인</span>
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div
                                className={`text-2xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                              >
                                {service.priceRange}
                              </div>
                              {/* 높이 맞추기 위한 빈 공간 */}
                              <div className="h-10"></div>
                            </div>
                          )}
                          <div className="text-sm text-gray-500 flex items-center mt-2">
                            <Clock className="w-4 h-4 mr-1" />
                            {service.duration}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 이미지 플레이스홀더 */}
                    <div className="mb-6">
                      <div
                        className={`w-full h-48 rounded-2xl overflow-hidden relative group-hover:scale-105 transition-transform duration-300`}
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        {/* 오버레이 그라데이션 */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-20`}
                        ></div>

                        {/* 오디오 플레이어 오버레이 */}
                        <div className="absolute bottom-4 left-4 right-4">
                          {/* 모든 서비스용 슬라이더 플레이어 */}
                          <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 flex items-center space-x-3">
                            {/* 이전 버튼 */}
                            <motion.button
                              className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleSampleIndexChange(
                                  service.id,
                                  "prev",
                                  service.audioSamples.length
                                )
                              }
                            >
                              <ArrowRight className="w-3 h-3 text-white rotate-180" />
                            </motion.button>

                            {/* 재생 버튼 */}
                            <motion.button
                              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                let sampleType = "";
                                if (service.id === 1) sampleType = "wedding";
                                else if (service.id === 2) sampleType = "cover";
                                else if (service.id === 3) sampleType = "ai";
                                else if (service.id === 4) sampleType = "pro";
                                handlePlaySample(
                                  `${sampleType}-sample-${service.id}`
                                );
                              }}
                            >
                              {(() => {
                                let sampleType = "";
                                if (service.id === 1) sampleType = "wedding";
                                else if (service.id === 2) sampleType = "cover";
                                else if (service.id === 3) sampleType = "ai";
                                else if (service.id === 4) sampleType = "pro";
                                return isPlaying ===
                                  `${sampleType}-sample-${service.id}` ? (
                                  <Pause className="w-4 h-4 text-gray-700" />
                                ) : (
                                  <Play className="w-4 h-4 text-gray-700 ml-0.5" />
                                );
                              })()}
                            </motion.button>

                            {/* 다음 버튼 */}
                            <motion.button
                              className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleSampleIndexChange(
                                  service.id,
                                  "next",
                                  service.audioSamples.length
                                )
                              }
                            >
                              <ArrowRight className="w-3 h-3 text-white" />
                            </motion.button>

                            {/* 곡 정보 */}
                            <div className="flex-1 min-w-0">
                              <div className="text-white text-xs font-medium truncate">
                                {
                                  service.audioSamples[
                                    sampleIndices[service.id] || 0
                                  ]?.title
                                }
                              </div>
                              <div className="text-white/70 text-xs truncate">
                                {(sampleIndices[service.id] || 0) + 1} /{" "}
                                {service.audioSamples.length}
                              </div>
                            </div>

                            <Volume2 className="w-4 h-4 text-white/70" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 특징 */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                        포함 서비스:
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-sm text-gray-700"
                          >
                            <CheckCircle
                              className={`w-4 h-4 mr-2 ${service.textColor}`}
                            />
                            <span
                              dangerouslySetInnerHTML={{
                                __html: feature.replace(
                                  /\*\*(.*?)\*\*/g,
                                  '<strong class="font-bold text-red-600">$1</strong>'
                                ),
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 작업 과정 미리보기 */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">
                        작업 과정:
                      </h4>
                      <div className="flex flex-wrap items-center gap-y-1">
                        {service.process.map((step, idx) => (
                          <div key={idx} className="flex items-center">
                            <div
                              className={`w-2 h-2 rounded-full ${service.textColor.replace(
                                "text-",
                                "bg-"
                              )}`}
                            ></div>
                            <span className="text-xs text-gray-600 ml-1">
                              {step}
                            </span>
                            {idx < service.process.length - 1 && (
                              <ArrowRight className="w-3 h-3 text-gray-400 mx-2" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA 버튼 */}
                    <motion.a
                      href="http://pf.kakao.com/_gxgbxcn/chat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full text-center py-4 bg-gradient-to-r ${service.color} text-white rounded-2xl font-semibold shadow-lg transition-all duration-300 group-hover:shadow-xl`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {service.ctaText}
                    </motion.a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 서브 서비스 섹션 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="border-t border-gray-200 pt-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                추가 서비스
              </h3>
              <p className="text-gray-600">간단한 녹음부터 전문 세션까지</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {subServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center p-6 rounded-2xl border border-gray-200 hover:border-yellow-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-slate-700" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {service.description}
                    </p>
                    <div className="text-lg font-bold text-yellow-600 mb-1">
                      {service.price}
                    </div>
                    <div className="text-xs text-gray-500">
                      {service.duration}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span style={{ color: "var(--primary)" }}>고객 후기</span>
            </h2>
            <p className="text-xl opacity-70">
              DAZZLING STUDIO를 방문해 주신 소중한 고객님의 이야기
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-8 rounded-2xl shadow-lg h-full flex flex-col"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-current"
                      style={{ color: "var(--primary)" }}
                    />
                  ))}
                </div>

                <p className="text-lg mb-6 italic flex-grow">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm opacity-60">
                      {testimonial.service}
                    </div>
                  </div>
                  <div className="text-sm opacity-60">{testimonial.date}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20"
        style={{ background: "var(--card-bg)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span style={{ color: "var(--primary)" }}>연락처</span>
            </h2>
            <p className="text-xl opacity-70">언제든지 문의해주세요</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.a
              href="http://pf.kakao.com/_gxgbxcn/chat"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center p-6"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "var(--gradient)" }}
              >
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">카카오톡 상담</h3>
              <p className="opacity-70">실시간 문의 바로가기</p>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center p-6 cursor-pointer"
              onClick={handleCopyEmail}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "var(--gradient)" }}
              >
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">이메일</h3>
              <p className="opacity-70">
                {copied ? "복사 완료!" : "rlackswn2000@naver.com"}
              </p>
            </motion.div>

            <motion.a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                "강남구 역삼로 14길 12"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center p-6"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "var(--gradient)" }}
              >
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">스튜디오</h3>
              <p className="opacity-70">강남구 역삼로 14길 12</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* AI 상담사 */}
      {typeof window !== "undefined" && (
        <AIConsultant
          consultantType="audio"
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          onToggle={() => setIsChatOpen(!isChatOpen)}
        />
      )}

      {/* 카카오톡 친구추가 모달 */}
      {showKakaoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl"
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                혜택가 확인하기
              </h3>
              <p className="text-gray-600">
                카카오톡을 추가하시면 특별 혜택가를 확인하실 수 있습니다!
              </p>
            </div>

            <div className="space-y-4">
              <motion.a
                href="http://pf.kakao.com/_gxgbxcn/friend"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleKakaoFriendAdded}
                className="block w-full px-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-2xl transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>카카오톡 친구 추가하기</span>
                </div>
                <div className="text-sm text-gray-700 mt-1">
                  친구추가 후 혜택가가 공개됩니다
                </div>
              </motion.a>

              {/* 전체 혜택가 확인 버튼 */}
              <motion.button
                onClick={() => {
                  setRevealedPrices(new Set([1, 2, 3])); // 할인 있는 서비스들
                  setShowKakaoModal(false);
                  setCurrentServiceId(null);
                }}
                className="w-full px-6 py-3 bg-gradient-to-r from-slate-800 to-yellow-600 text-white font-semibold rounded-2xl transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                전체 혜택가 한번에 확인하기
              </motion.button>

              <button
                onClick={handleCloseModal}
                className="w-full px-6 py-3 text-gray-500 hover:text-gray-700 transition-colors"
              >
                나중에 하기
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
