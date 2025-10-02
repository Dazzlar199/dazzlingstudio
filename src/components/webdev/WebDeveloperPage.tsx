"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Code,
  Database,
  Smartphone,
  Globe,
  ExternalLink,
  Mail,
  Linkedin,
  Terminal,
  Zap,
  Cpu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AIConsultant from "@/components/shared/AIConsultant";

// 정적 데이터를 컴포넌트 외부로 이동
const skills = [
  {
    category: "Frontend",
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    icon: <Code className="w-8 h-8" />,
    color: "#00FF88",
  },
  {
    category: "Backend",
    technologies: [
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "API Design",
    ],
    icon: <Database className="w-8 h-8" />,
    color: "#00B4FF",
  },
  {
    category: "DevOps",
    technologies: ["Docker", "AWS", "Vercel", "CI/CD", "Git"],
    icon: <Terminal className="w-8 h-8" />,
    color: "#FF6B6B",
  },
  {
    category: "Mobile",
    technologies: ["React Native", "Flutter", "Progressive Web Apps"],
    icon: <Smartphone className="w-8 h-8" />,
    color: "#FFD93D",
  },
];

const projects = [
  {
    title: "현대 AI 리더십 코칭 플랫폼",
    description: "데이터 기반 개인맞춤 리더십 진단 및 AI 코칭 시스템",
    images: [
      "/web_image/hyundai1.png",
      "/web_image/hyundai2.png",
      "/web_image/hyundai3.jpeg"
    ],
    technologies: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS", "Zustand", "React Hook Form"],
    features: ["AI 리더십 진단", "개인맞춤 코칭", "시나리오 기반 연습", "음성 인터랙션", "데이터 시각화"],
    github: "#",
    demo: "#",
    type: "AI 플랫폼",
    client: "현대자동차",
    duration: "2 weeks",
    summary: "10개 핵심 가치에 따른 리더십 성향 분석과 AI 기반 맞춤형 코칭을 제공하는 엔터프라이즈 솔루션"
  },
  {
    title: "9e 엔터테인먼트 공식 웹사이트",
    description: "K-POP 그룹을 위한 전문 엔터테인먼트 회사 웹사이트",
    images: ["/web_image/entertain.jpeg"],
    technologies: ["Next.js", "Tailwind CSS", "Vercel", "Geist Font"],
    features: ["아티스트 소개", "음악 스트리밍", "스케줄 관리", "회사 소개", "반응형 디자인"],
    github: "#",
    demo: "#",
    type: "엔터테인먼트",
    client: "9e Entertainment",
    duration: "2 weeks",
    summary: "Future of K-POP을 비전으로 하는 엔터테인먼트 회사의 공식 웹사이트. 아티스트 프로필, 음악 컨텐츠, 스케줄 등을 효과적으로 관리하는 종합 플랫폼"
  },
  {
    title: "신과의 대화 (Godai)",
    description: "AI 기반 인터랙티브 상담 및 게임 플랫폼",
    images: [
      "/web_image/god1.png",
      "/web_image/god2.png",
      "/web_image/god3.png",
      "/web_image/god4.png"
    ],
    technologies: ["Three.js", "MediaPipe", "Flask", "Vercel", "JavaScript", "Python"],
    features: ["3D 눈 애니메이션", "운명 카드 선택", "AI 얼굴/손 인식", "별자리 그리기", "오디오 시스템"],
    github: "#",
    demo: "#",
    type: "게임/AI",
    client: "개인 프로젝트",
    duration: "4 weeks",
    summary: "Three.js 3D 애니메이션과 MediaPipe AI 인식 기술을 활용한 인터랙티브 운명 상담 플랫폼. 8개 운명 카드 선택, 별자리 그리기, 얼굴/손 인식 등 창의적 사용자 경험 제공"
  },
  {
    title: "뮤직 스트리밍 모바일 앱",
    description: "독립 아티스트를 위한 크로스 플랫폼 음악 앱",
    images: [],
    technologies: ["React Native", "Firebase", "Expo", "Redux Toolkit", "React Navigation"],
    features: [
      "고음질 스트리밍",
      "오프라인 다운로드",
      "플레이리스트 관리",
      "아티스트 팔로우",
      "실시간 채팅",
      "푸시 알림"
    ],
    github: "#",
    demo: "#",
    type: "모바일 앱",
    client: "개인 프로젝트",
    duration: "6 weeks",
    summary: "독립 아티스트와 팬을 연결하는 크로스 플랫폼 모바일 앱. iOS/Android 네이티브 성능과 오프라인 기능을 제공하는 완전한 음악 스트리밍 솔루션"
  },
];

const services = [
  {
    title: "웹사이트 개발",
    price: "500,000원~",
    description: "반응형 웹사이트 제작",
    features: ["반응형 디자인", "SEO 최적화", "성능 최적화", "CMS 연동"],
    duration: "2-4주",
  },
  {
    title: "웹 애플리케이션",
    price: "1,500,000원~",
    description: "맞춤형 웹 애플리케이션",
    features: [
      "사용자 인증",
      "데이터베이스 설계",
      "API 개발",
      "배포 및 호스팅",
    ],
    duration: "1-3개월",
  },
  {
    title: "모바일 앱",
    price: "2,000,000원~",
    description: "크로스 플랫폼 모바일 앱",
    features: [
      "iOS/Android 대응",
      "네이티브 성능",
      "앱스토어 출시",
      "유지보수",
    ],
    duration: "2-4개월",
  },
];

export default function WebDeveloperPage() {
  const [activeProject, setActiveProject] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoadError, setImageLoadError] = useState(false);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setImageLoadError(false);
  }, [activeProject]);

  // 현재 프로젝트의 메모이제이션
  const currentProject = useMemo(() => projects[activeProject], [activeProject]);


  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/studio_main/DS_LOGO2.png"
                alt="Dazzlar Web Development Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="font-bold text-2xl bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Dazzlar.dev
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link
                href="/main"
                className="hover:text-green-400 transition-colors"
              >
                메인
              </Link>
              <a
                href="#skills"
                className="hover:text-green-400 transition-colors"
              >
                스킬
              </a>
              <a
                href="#projects"
                className="hover:text-green-400 transition-colors"
              >
                프로젝트
              </a>
              <a
                href="#services"
                className="hover:text-green-400 transition-colors"
              >
                서비스
              </a>
              <a
                href="#contact"
                className="hover:text-green-400 transition-colors"
              >
                연락처
              </a>
            </div>
            <a
              href="http://pf.kakao.com/_gxgbxcn/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-black font-semibold hover:scale-105 transition-transform"
            >
              프로젝트 문의
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-20 min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Code Animation */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 font-mono text-green-400 text-sm">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              const developer = {`{`}
              <br />
              &nbsp;&nbsp;name: &apos;Dazzlar&apos;,
              <br />
              &nbsp;&nbsp;skills: [&apos;React&apos;, &apos;Node.js&apos;],
              <br />
              &nbsp;&nbsp;passion: &apos;Innovation&apos;
              <br />
              {`}`}
            </motion.div>
          </div>
          <div className="absolute top-3/4 right-1/4 font-mono text-blue-400 text-sm">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              const buildApp = () {`{`}
              <br />
              &nbsp;&nbsp;return magic
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;.create()
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;.innovate();
              <br />
              {`}`}
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-green-400">{"<"}</span>
              <span>Web & AI</span>
              <span className="text-blue-400">{" />"}</span>
            </div>
            <div className="text-5xl md:text-7xl font-bold">
              <span className="text-green-400">{"<"}</span>
              <span>Developing</span>
              <span className="text-blue-400">{" />"}</span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-300"
          >
            풀스택 개발자 + AI 전문가 + 아티스트의 조합으로
            <br />
            창의적인 디지털 솔루션을 제공합니다
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-black font-semibold text-lg hover:scale-105 transition-transform"
            >
              <ExternalLink className="w-5 h-5 mr-2 inline" />
              프로젝트 보기
            </a>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute top-1/2 left-10 opacity-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Cpu className="w-16 h-16 text-green-400" />
            </motion.div>
          </div>
          <div className="absolute top-1/3 right-10 opacity-20">
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Zap className="w-12 h-12 text-blue-400" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-green-400">기술 스택</span>
            </h2>
            <p className="text-xl text-gray-400">
              현대적인 기술로 최고의 솔루션을 제공합니다
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-black rounded-2xl p-6 border border-gray-800 hover:border-green-400 transition-all"
              >
                <div className="mb-4" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: skill.color }}
                >
                  {skill.category}
                </h3>
                <ul className="space-y-2">
                  {skill.technologies.map((tech, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <div
                        className="w-2 h-2 rounded-full mr-3"
                        style={{ background: skill.color }}
                      ></div>
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-green-400">프로젝트</span>
            </h2>
            <p className="text-xl text-gray-400">
              실제 구현한 프로젝트들을 확인해보세요
            </p>
          </motion.div>

          {/* Project Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2 bg-gray-900 rounded-full p-2">
              {projects.map((project, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all whitespace-nowrap ${
                    activeProject === index
                      ? "bg-gradient-to-r from-green-400 to-blue-500 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {project.type}
                </button>
              ))}
            </div>
          </div>

          {/* Active Project */}
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-green-400 text-black text-sm font-semibold rounded-full">
                  {currentProject.type}
                </span>
                {currentProject.client && (
                  <span className="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
                    {currentProject.client}
                  </span>
                )}
              </div>

              <h3 className="text-3xl font-bold">
                {currentProject.title}
              </h3>

              <p className="text-gray-400 text-lg">
                {currentProject.description}
              </p>

              {currentProject.summary && (
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {currentProject.summary}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-3 text-green-400">핵심 기능</h4>
                <ul className="space-y-2">
                  {currentProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <Zap className="w-4 h-4 mr-3 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-blue-400">기술 스택</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {currentProject.duration && (
                <div className="flex items-center text-gray-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <span>개발 기간: {currentProject.duration}</span>
                </div>
              )}

              {currentProject.demo !== "#" && (
                <div className="flex space-x-4">
                  <a
                    href={currentProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-black font-semibold hover:scale-105 transition-transform"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-2xl p-8">
                <div className="bg-black rounded-xl p-6 border border-gray-800">
                  <div className="flex space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>

                  {/* Image Display */}
                  {projects[activeProject].images && projects[activeProject].images.length > 1 ? (
                    <div className="relative">
                      <div className="h-96 bg-black rounded-lg overflow-hidden flex items-center justify-center">
                        {!imageLoadError ? (
                          <img
                            src={currentProject.images[currentImageIndex]}
                            alt={`${currentProject.title} 스크린샷 ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onLoad={() => setImageLoadError(false)}
                            onError={() => {
                              console.error('Image failed to load:', currentProject.images[currentImageIndex]);
                              setImageLoadError(true);
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <Globe className="w-16 h-16 text-green-400 mx-auto mb-4" />
                              <p className="text-gray-400">이미지를 불러올 수 없습니다</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Navigation Buttons */}
                      <button
                        onClick={() => setCurrentImageIndex(prev =>
                          prev === 0 ? projects[activeProject].images.length - 1 : prev - 1
                        )}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 rounded-full p-3 transition-all z-10"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>

                      <button
                        onClick={() => setCurrentImageIndex(prev =>
                          prev === projects[activeProject].images.length - 1 ? 0 : prev + 1
                        )}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 rounded-full p-3 transition-all z-10"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>

                      {/* Dots Indicator */}
                      <div className="flex justify-center space-x-2 mt-4">
                        {projects[activeProject].images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`w-3 h-3 rounded-full transition-all ${
                              idx === currentImageIndex ? 'bg-green-400' : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="h-96 bg-black rounded-lg overflow-hidden flex items-center justify-center">
                      {currentProject.images && currentProject.images[0] ? (
                        <img
                          src={currentProject.images[0]}
                          alt={`${currentProject.title} 스크린샷`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            console.error('Image failed to load:', currentProject.images[0]);
                            if (e.currentTarget.parentElement) {
                              e.currentTarget.parentElement.innerHTML = `
                                <div class="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                                  <div class="text-center">
                                    <svg class="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9-3-9m-9 9a9 9 0 019-9"></path>
                                    </svg>
                                    <p class="text-gray-400">이미지를 불러올 수 없습니다</p>
                                  </div>
                                </div>
                              `;
                            }
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <Smartphone className="w-16 h-16 text-green-400 mx-auto mb-4" />
                            <p className="text-gray-400">모바일 앱 프로젝트</p>
                            <p className="text-gray-300 text-sm mt-2">개발 중인 프로젝트입니다</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-green-400">개발 서비스</span>
            </h2>
            <p className="text-xl text-gray-400">
              프로젝트 규모에 맞는 최적의 솔루션
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-black rounded-2xl p-8 border border-gray-800 hover:border-green-400 transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-green-400">
                    {service.title}
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{service.price}</div>
                    <div className="text-sm text-gray-400">
                      {service.duration}
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 mb-6">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="http://pf.kakao.com/_gxgbxcn/chat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-black font-semibold hover:scale-105 transition-transform text-center"
                >
                  프로젝트 문의
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-green-400">연락처</span>
            </h2>
            <p className="text-xl text-gray-400">
              프로젝트 문의는 언제든지 환영합니다
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-semibold text-lg mb-2">이메일</h3>
              <p className="text-gray-400">rlackswn2000@naver.com</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Linkedin className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-semibold text-lg mb-2">LinkedIn</h3>
              <p className="text-gray-400">linkedin.com/in/dazzlar</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI 상담사 */}
      <AIConsultant
        consultantType="webdev"
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}
