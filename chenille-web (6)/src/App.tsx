/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  User, 
  Briefcase, 
  FolderKanban, 
  Heart, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink, 
  GraduationCap, 
  Gamepad2, 
  Camera,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Sparkles,
  Circle,
  Square,
  Triangle
} from 'lucide-react';

// --- Types ---
interface Project {
  title: string;
  background: string;
  role: string;
  tasks: string[];
  type: 'internship' | 'personal' | 'course';
  tags: string[];
}

interface InternshipProject {
  name: string;
  role: string;
  description: string;
  responsibilities: string[];
  outcomes: string[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'internship' | 'work';
  projects?: InternshipProject[];
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "复合基底SAW器件温稳探索",
    background: "核心成员。使用PEST分析行业趋势，调研射频器件市场，并构建竞品分析体系。获得校级二等奖。",
    role: "核心成员",
    tasks: [
      "使用PEST模型分析射频器件行业趋势",
      "深度调研射频器件市场竞争格局",
      "构建完整的竞品分析体系与评估维度"
    ],
    type: 'course',
    tags: ["行业分析", "PEST", "射频器件", "校级二等奖"]
  },
  {
    title: "基于STM32的智能仓库出入库系统",
    background: "项目组长。负责产品规划、功能拆解、RFID识别设计，并通过阿里云实现数据可视化。",
    role: "项目组长",
    tasks: [
      "负责整体产品规划与功能模块拆解",
      "设计基于 RFID 的货物自动识别逻辑",
      "对接阿里云平台实现出入库数据实时可视化展示"
    ],
    type: 'course',
    tags: ["智能硬件", "STM32", "物联网"]
  },
  {
    title: "天气预报系统",
    background: "个人项目。完成用户需求调研、UI设计、API接入以及完整开发。",
    role: "独立开发者",
    tasks: [
      "独立完成用户需求调研与功能定义",
      "负责 UI 界面设计与交互逻辑实现",
      "对接第三方天气 API 并完成全栈功能开发"
    ],
    type: 'course',
    tags: ["Web开发", "API集成", "UI设计"]
  }
];

const EXPERIENCES: Experience[] = [
  {
    title: "技术型产品经理",
    company: "北京司索科技有限公司",
    period: "2026.01 - 2026.03",
    description: "作为初创团队唯一的实习产品经理，深度参与并统筹推进了多个从 0 到 1 的 AI 与硬件产品项目。负责全流程产品管理，从市场调研、需求定义到原型设计及跨部门协作，通过引入 AI 工作流显著提升了团队研发效率。",
    type: 'internship',
    projects: [
      {
        name: "Citado 多人分层协作批注系统",
        role: "产品统筹",
        description: "针对团队在文档协作中协作效率低、信息分散与批注混乱的痛点，统筹产品全生命周期管理。",
        responsibilities: [
          "主导从需求调研、原型设计、PRD 撰写到跨部门沟通的完整流程。"
        ],
        outcomes: [
          "通过功能优先级规划，使整体研发周期缩短约 20%。"
        ]
      },
      {
        name: "SeLock 智能门禁锁后台系统",
        role: "核心负责产品文档与 AI 工作流落地",
        description: "设计轻量化小程序后台系统，解决传统门禁后台操作复杂、维护成本高、开发周期长的问题。",
        responsibilities: [
          "独立负责产品文档撰写与需求结构设计，引入 AI 工具优化 PM 工作流。",
          "基于 VSCode Copilot 构建 PM 专属 Agent，实现 PRD 自动生成及 YAML 任务转换。"
        ],
        outcomes: [
          "PRD 编写效率提升约 60%，研发周期缩短约 50%。",
          "15 天内完成 4 个核心模块落地，商户后台管理效率提升约 55%。"
        ]
      },
      {
        name: "Seekcam 台球精彩回放相机",
        role: "核心负责产品调研与需求落地",
        description: "面向台球馆和爱好者，提供自动录制与精彩回放功能的智能硬件产品。",
        responsibilities: [
          "系统分析 10 余款竞品，实地调研 50+ 球馆经营者与 200+ 爱好者，梳理用户画像。",
          "建立研发看板与需求管理机制，推进一键直播、自动精彩回放等核心功能设计。"
        ],
        outcomes: [
          "通过流程优化使团队沟通效率提升约 30%。",
          "为样机研发与产品验证奠定了坚实的需求基础。"
        ]
      }
    ]
  }
];

const CAMPUS_EXPERIENCE = [
  { 
    role: "学生会文化活动部部长", 
    org: "天津科技大学人工智能学院",
    details: ["统筹大型文体活动策划与执行，协调跨部门资源。"]
  },
  { 
    role: "融媒体中心播音主持部副部长", 
    org: "天津科技大学人工智能学院",
    details: ["负责团队管理与成员培训，策划校园品牌活动。"]
  },
  { 
    role: "AI实践基地讲解员", 
    org: "天津科技大学",
    details: ["承担政企接待讲解任务，负责新成员培训与指导。"]
  }
];

const AWARDS = [
  { name: "校级二等奖学金", icon: "🏆" },
  { name: "校级三等奖学金（2次）", icon: "🥈" },
  { name: "社会服务奖学金", icon: "🎗️" },
  { name: "校级金牌讲解员", icon: "🎤" },
  { name: "院级优秀学生干部", icon: "⭐" },
  { name: "院级优秀部员", icon: "✨" },
  { name: "优秀团员（3次）", icon: "🔴" },
];

const AI_CAPABILITIES = [
  { 
    title: "PRD自动生成", 
    desc: "利用大模型能力，通过结构化Prompt快速生成高质量产品需求文档。",
    icon: <Sparkles className="text-accent-pink" />
  },
  { 
    title: "YAML任务生成", 
    desc: "将产品需求自动转换为开发可执行的任务流，实现需求与开发的无缝对接。",
    icon: <Briefcase className="text-accent-blue" />
  },
  { 
    title: "AI Agent Workflow设计", 
    desc: "设计并搭建垂直场景下的AI Agent工作流，优化业务流程，实现自动化办公。",
    icon: <FolderKanban className="text-accent-purple" />
  },
];

const PRODUCT_INSIGHTS = [
  { 
    name: "Citado 多人分层协作批注系统", 
    desc: "如何优化多人实时协作下的信息分层与批注效率，构建高效协作闭环。", 
    img: "./citado0.1.jpg" 
  },
  { 
    name: "SeLock 智能门禁小程序后台", 
    desc: "基于用户权限管理与安全性考量的流程优化，提升B端管理后台的操作体验。", 
    img: "./selock-admin.jpg" 
  },
  { 
    name: "Seekcam 台球精彩回放相机", 
    desc: "从底层算法逻辑到用户交互落地的产品调研，探索AI视觉在垂直体育场景的应用。", 
    img: "./Seekcam.jpg" 
  }
];

const LIFE_IMAGES = [
  "./me.png",
  "./vol.png",
  "./cake.png",
  "https://picsum.photos/seed/life-4/600/800",
  "https://picsum.photos/seed/life-5/600/800",
  "https://picsum.photos/seed/life-6/600/800",
];

// --- Components ---

const IllustrationKittyBow = ({ className = "", style = {}, size = 32 }: { className?: string, style?: React.CSSProperties, size?: number }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} style={{ width: size, height: size, ...style }} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 50 C 30 20 10 30 10 50 C 10 70 30 80 50 50 Z" fill="var(--color-accent-pink)" stroke="black" strokeWidth="4" />
    <path d="M 50 50 C 70 20 90 30 90 50 C 90 70 70 80 50 50 Z" fill="var(--color-accent-pink)" stroke="black" strokeWidth="4" />
    <circle cx="50" cy="50" r="12" fill="var(--color-accent-pink)" stroke="black" strokeWidth="4" />
  </svg>
);

const IllustrationPonyBalloon = ({ className = "", style = {}, size = 32 }: { className?: string, style?: React.CSSProperties, size?: number }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} style={{ width: size, height: size, ...style }} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 10 C 30 10 20 30 20 50 C 20 70 35 85 50 85 C 65 85 80 70 80 50 C 80 30 70 10 50 10 Z" fill="var(--color-accent-blue)" stroke="black" strokeWidth="4" />
    <path d="M 50 85 L 50 95" stroke="black" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const IllustrationSparkleHeart = ({ className = "", style = {}, size = 32 }: { className?: string, style?: React.CSSProperties, size?: number }) => (
  <svg viewBox="0 0 100 100" className={`${className}`} style={{ width: size, height: size, ...style }} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 85 C 50 85 10 60 10 35 C 10 15 30 10 50 30 C 70 10 90 15 90 35 C 90 60 50 85 50 85 Z" fill="var(--color-accent-pink)" stroke="black" strokeWidth="4" />
    <path d="M 20 20 L 25 25 M 75 20 L 80 25" stroke="white" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const DecorativePattern = ({ className = "" }: { className?: string }) => (
  <svg className={`absolute -z-20 opacity-[0.04] pointer-events-none ${className}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
      </pattern>
      <pattern id="cute-dots" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="2" fill="var(--color-accent-pink)" />
        <circle cx="40" cy="40" r="1.5" fill="var(--color-accent-blue)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    <rect width="100%" height="100%" fill="url(#cute-dots)" />
  </svg>
);

const IllustrationRoadmap = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={`w-32 h-32 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="40" width="160" height="120" rx="10" stroke="currentColor" strokeWidth="8" fill="white" />
    <path d="M 40 80 H 160 M 40 120 H 160 M 80 40 V 160" stroke="currentColor" strokeWidth="8" />
    <circle cx="60" cy="100" r="10" fill="var(--color-accent-pink)" stroke="currentColor" strokeWidth="4" />
    <circle cx="120" cy="140" r="10" fill="var(--color-accent-blue)" stroke="currentColor" strokeWidth="4" />
    <path d="M 20 20 L 40 40 M 180 20 L 160 40" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const IllustrationProject = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={`w-32 h-32 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 40 100 L 160 100 M 100 40 L 100 160" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    <circle cx="100" cy="100" r="20" fill="white" stroke="currentColor" strokeWidth="8" />
    <path d="M 60 60 L 140 140 M 140 60 L 60 140" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const IllustrationUser = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={`w-32 h-32 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="70" r="40" stroke="currentColor" strokeWidth="8" fill="white" />
    <path d="M 40 170 C 40 130 70 110 100 110 C 130 110 160 130 160 170" stroke="currentColor" strokeWidth="8" fill="var(--color-brand-blue)" />
    <path d="M 80 140 H 120" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Project', href: '#portfolio' },
    { name: 'Life', href: '#life' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-6 py-4 flex justify-between items-center">
        <div 
          className="text-2xl font-black tracking-tighter flex items-center gap-2"
          style={{ width: '389.628px', height: '6.9775px' }}
        >
          <IllustrationKittyBow className="w-6 h-6" />
          I want to become an excellent AI PM
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 font-bold">
          {navItems.map(item => (
            <a 
              key={item.name} 
              href={item.href} 
              className={`transition-all duration-300 hover:text-accent-blue ${activeSection === item.href.substring(1) ? 'nav-link-active' : ''}`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 brutal-card bg-brand-pink" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-0 w-full bg-white border-4 border-black rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col gap-4 font-bold md:hidden"
          >
            {navItems.map(item => (
              <a 
                key={item.name} 
                href={item.href} 
                onClick={() => setIsOpen(false)}
                className={`hover:text-accent-blue py-3 px-4 rounded-xl transition-colors ${activeSection === item.href.substring(1) ? 'bg-brand-blue/30 text-accent-blue' : 'hover:bg-black/5'}`}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Section = ({ id, children, className = "", bgColor = "", showIllustrations = true, pattern = false }: { id: string, children: React.ReactNode, className?: string, bgColor?: string, showIllustrations?: boolean, pattern?: boolean }) => (
  <section id={id} className={`relative py-24 px-6 md:px-12 overflow-hidden ${bgColor} ${className}`}>
    {pattern && <DecorativePattern className="top-0 left-0 text-black" />}
    {showIllustrations && (
      <>
        <IllustrationSparkleHeart className="floating-shape text-accent-pink top-20 left-10 animate-float opacity-10" />
        <IllustrationKittyBow className="floating-shape text-accent-pink bottom-20 right-10 animate-float opacity-10" style={{ animationDelay: '1s' }} />
        <IllustrationPonyBalloon className="floating-shape text-accent-blue top-1/2 right-20 animate-float opacity-10" style={{ animationDelay: '2s' }} />
        <Sparkles className="floating-shape text-accent-purple top-1/4 right-1/4 animate-float opacity-10" style={{ animationDelay: '3s' }} size={25} />
        <Heart className="floating-shape text-accent-pink bottom-1/4 left-1/4 animate-float opacity-10" style={{ animationDelay: '4.5s' }} size={20} />
      </>
    )}
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto relative z-10"
    >
      {children}
    </motion.div>
  </section>
);

const Ticker = () => (
  <div className="bg-black py-6 overflow-hidden whitespace-nowrap border-y-4 border-black">
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex gap-12 text-white font-black text-3xl uppercase italic"
    >
      {[...Array(10)].map((_, i) => (
        <span key={i} className="flex items-center gap-6">
          Product Manager <Sparkles className="text-accent-pink" /> 
          User Experience <Sparkles className="text-accent-blue" /> 
          Data Driven <Sparkles className="text-accent-pink" /> 
          Creative Solver <Sparkles className="text-accent-blue" />
        </span>
      ))}
    </motion.div>
  </div>
);

const ProductInsightCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrentIndex((prevIndex) => (prevIndex === PRODUCT_INSIGHTS.length - 1 ? 0 : prevIndex + 1)),
      5000
    );

    return () => resetTimeout();
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-[280px] mx-auto group">
      <div className="overflow-hidden brutal-card bg-black aspect-[3/4]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full relative"
          >
            <img 
              src={PRODUCT_INSIGHTS[currentIndex].img} 
              alt={PRODUCT_INSIGHTS[currentIndex].name} 
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 right-4 text-white z-20">
              <div className="text-[10px] font-black uppercase tracking-widest text-accent-yellow mb-1">Product Thinking</div>
              <h4 className="text-lg font-black leading-tight mb-1">{PRODUCT_INSIGHTS[currentIndex].name}</h4>
              <p className="text-white/80 text-[10px] font-bold leading-relaxed">{PRODUCT_INSIGHTS[currentIndex].desc}</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <button 
        onClick={() => setCurrentIndex(prev => (prev === 0 ? PRODUCT_INSIGHTS.length - 1 : prev - 1))}
        className="absolute left-2 top-1/2 -translate-y-1/2 brutal-card p-1 bg-white hover:bg-brand-yellow transition-colors z-30 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={16} />
      </button>
      <button 
        onClick={() => setCurrentIndex(prev => (prev === PRODUCT_INSIGHTS.length - 1 ? 0 : prev + 1))}
        className="absolute right-2 top-1/2 -translate-y-1/2 brutal-card p-1 bg-white hover:bg-brand-yellow transition-colors z-30 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {PRODUCT_INSIGHTS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full border border-black transition-all ${currentIndex === idx ? 'bg-black w-5' : 'bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};

const LifeGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = LIFE_IMAGES.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      <div className="overflow-hidden brutal-card bg-white aspect-[3/4] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full h-full"
          >
            <img 
              src={images[currentIndex]} 
              alt={`Life ${currentIndex}`} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer" 
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-3 border-2 border-black transition-all duration-300 rounded-full ${
              currentIndex === idx ? 'bg-accent-pink w-10' : 'bg-white w-3'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      
      <div className="mt-4 text-center text-black/30 text-[10px] font-black uppercase tracking-widest">
        Auto-playing Gallery
      </div>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const [isRealPhoto, setIsRealPhoto] = useState(false);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="overflow-x-hidden selection:bg-accent-pink selection:text-black">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-2 bg-accent-pink z-[60] origin-left" style={{ scaleX }} />
      
      <Navbar />

      {/* 1. Home Section */}
      <Section id="home" className="min-h-screen flex items-center pt-32" pattern={true}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block px-4 py-1 bg-brand-pink border-2 border-black rounded-full font-bold mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              👋 Hello, I'm Chenille
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black leading-none mb-8">
              你好，我是<br />
              <span className="bg-brand-blue px-2 relative inline-block mt-2">
                李晨璐
                <span className="absolute -bottom-8 left-0 text-xl font-black text-accent-blue tracking-tighter opacity-40">CHENILLE</span>
                <IllustrationPonyBalloon className="absolute -top-10 -right-12 animate-bounce-soft" />
                <Sparkles className="absolute -top-6 -right-8 text-accent-pink animate-bounce" size={40} />
              </span>
            </h1>
            <p className="text-xl text-black/70 mb-10 max-w-lg leading-relaxed font-bold">
              AI产品经理预备役<br />
              正在用产品思维探索AI world
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#portfolio" className="brutal-btn-primary">课程项目</a>
              <a href="#contact" className="brutal-btn-secondary">联系我</a>
            </div>
          </div>
          
          <div className="relative group cursor-pointer" onClick={() => setIsRealPhoto(!isRealPhoto)}>
            <div className="absolute -inset-4 bg-accent-yellow border-4 border-black -rotate-3 transition-transform group-hover:rotate-0"></div>
            <div className="relative w-full aspect-square brutal-card bg-brand-blue overflow-hidden brutal-card-hover z-10">
              <AnimatePresence initial={false}>
                <motion.img 
                  key={isRealPhoto ? 'real' : 'ai'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  src={isRealPhoto ? "./travel.jpg" : "./home-pic.png"} 
                  alt="Avatar" 
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?q=80&w=1000&auto=format&fit=crop";
                  }}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-accent-pink/10 pointer-events-none"></div>
              <div className="absolute bottom-4 right-4 bg-white border-2 border-black px-2 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Click to Switch
              </div>
            </div>
            {/* Floating badges */}
            <div className="absolute -top-12 -right-12 brutal-card p-4 bg-brand-pink font-black rotate-12 hidden md:block animate-float z-20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              🚀 A Vertical Internship
            </div>
            <div className="absolute -bottom-12 -left-12 brutal-card p-4 bg-white font-black -rotate-6 hidden md:block animate-float z-20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" style={{ animationDelay: '1.5s' }}>
              💡 User Centric
            </div>
          </div>
            {/* Background decorative shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border-4 border-dashed border-black/10 rounded-full -z-10 animate-spin-slow"></div>
          </div>

          {/* New Vibe Coding Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-24 max-w-4xl mx-auto relative z-30"
          >
            <div className="brutal-card p-6 md:p-8 bg-brand-purple brutal-card-hover flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-black mb-3">
                  📖 How I built my website with vibe coding
                </h3>
                <p className="text-lg text-black/70 font-bold mb-6">
                  记录我从0到1深度使用AI搭建个人网站的全过程，包括设计思路、AI工作流、产品迭代记录。
                </p>
                <a 
                  href="https://pcn2cjswbr1z.feishu.cn/wiki/WUP5wewKBiaQv0kpgLVcKevGnEd?from=from_copylink" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="brutal-btn-secondary inline-block"
                >
                  查看完整创作记录
                </a>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white border-4 border-black rounded-2xl flex items-center justify-center rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Lightbulb size={64} className="text-accent-yellow" />
                </div>
              </div>
            </div>
          </motion.div>
      </Section>

      {/* Ticker moved up for better visual balance */}
      <Ticker />

      {/* 2. About Section */}
      <Section id="about" bgColor="bg-brand-blue/10" pattern={true}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <h2 className="section-title mb-0">
            <span className="relative z-10 flex items-center gap-3">
              About Me <IllustrationSparkleHeart className="w-10 h-10" />
            </span>
            <div className="absolute bottom-2 left-0 w-full h-4 bg-brand-pink -z-10"></div>
          </h2>
          <IllustrationUser className="text-accent-blue opacity-30 hidden md:block" />
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 brutal-card p-8 bg-white brutal-card-hover relative overflow-hidden">
            <IllustrationKittyBow className="absolute -top-2 -right-2 rotate-12 opacity-40 w-12 h-12" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/20 rounded-full -z-10"></div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <User className="text-accent-blue" /> 个人简介
            </h3>
            <div className="text-lg leading-relaxed text-black/80 mb-8 space-y-4">
              <p>你好，我是李晨璐，一名AI产品经理方向的探索者。</p>
              <p>目前就读于天津科技大学物联网工程专业，专注于AI产品、智能硬件产品以及技术产品方向的实践与学习。</p>
              <p>在过往的实习与项目中，我参与过协作系统、智能门禁、智能相机等产品的调研与需求落地，逐渐建立起产品思维与需求分析能力。</p>
              <p>生活中我喜欢排球、游戏和音乐，是一个典型的ENFJ型人格，喜欢与人交流、组织活动，也热爱探索新的事物。</p>
              <p>最近我也在持续提升自己的英语能力，尤其是口语表达，希望未来能够在更开放的环境中参与产品创新。</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <h4 className="font-black text-sm uppercase tracking-widest text-black/40 mb-4">教育背景</h4>
                <div className="flex gap-4">
                  <div className="p-3 bg-brand-pink border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <GraduationCap className="shrink-0" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">天津科技大学</div>
                    <div className="text-sm text-black/60 font-bold">物联网工程 · 本科</div>
                    <div className="text-sm text-black/40 font-bold">2022.09 - 2026.06</div>
                    <div className="mt-2 text-xs font-black text-accent-blue">专业排名：前30%</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-widest text-black/40 mb-4">兴趣爱好</h4>
                <div className="flex flex-wrap gap-2">
                  {["排球", "书法", "吉他", "唱歌", "游戏"].map(tag => (
                    <span key={tag} className="px-3 py-1 border-2 border-black rounded-lg text-sm font-bold bg-brand-pink/30 hover:bg-brand-pink transition-all hover:scale-110 cursor-default shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* School Experience moved here */}
            <div className="mt-12 pt-12 border-t-4 border-black/5">
              <h4 className="font-black text-sm uppercase tracking-widest text-black/40 mb-6">在校核心经历</h4>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {CAMPUS_EXPERIENCE.map((item, i) => (
                    <div key={i} className="p-4 border-2 border-black rounded-xl bg-brand-blue/5 hover:bg-brand-blue/10 transition-colors">
                      <div className="font-black text-base">{item.role}</div>
                      <div className="text-xs text-black/50 font-bold mb-2">{item.org}</div>
                      <p className="text-xs text-black/70 font-medium leading-relaxed">{item.details[0]}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="brutal-card bg-white aspect-square overflow-hidden">
                    <img src="./mumu.jpg" alt="Activity 1" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="brutal-card bg-white aspect-square overflow-hidden">
                    <img src="./host.jpg" alt="Activity 2" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="brutal-card bg-white aspect-square overflow-hidden">
                    <img src="./bird.jpg" alt="Activity 3" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="brutal-card bg-white aspect-square overflow-hidden">
                    <img src="./vocano.jpg" alt="Activity 4" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="brutal-card p-8 bg-accent-blue text-white brutal-card-hover flex flex-col relative overflow-hidden">
            <IllustrationSparkleHeart className="absolute -bottom-4 -left-4 opacity-20 -rotate-12 w-16 h-16" />
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Heart /> 核心技能
            </h3>
            <div className="space-y-6 flex-grow overflow-y-auto pr-2">
              <div>
                <h4 className="text-xs font-black uppercase text-white/50 mb-2">产品工具</h4>
                <p className="text-sm font-bold">Axure、墨刀</p>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-white/50 mb-2">技术能力</h4>
                <p className="text-sm font-bold">Python、基础前端</p>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-white/50 mb-2">AI工具</h4>
                <p className="text-sm font-bold">Github Copilot、AI Agent 工作流</p>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase text-white/50 mb-2">办公软件</h4>
                <p className="text-sm font-bold">Word、Excel</p>
              </div>
            </div>

            {/* Awards section integrated here - Enhanced Prominence */}
            <div className="mt-10 pt-8 border-t-4 border-black/20">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                <span className="bg-white text-accent-blue px-4 py-1 border-2 border-black rounded-lg rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  🏆 荣誉奖项
                </span>
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {AWARDS.map((award, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02, rotate: idx % 2 === 0 ? 0.5 : -0.5 }}
                    className="text-sm font-black p-4 bg-accent-yellow text-black border-4 border-black rounded-xl flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default group"
                  >
                    <span className="text-2xl bg-white p-2 rounded-lg border-2 border-black group-hover:rotate-12 transition-transform">
                      {award.icon}
                    </span>
                    <span className="leading-tight">{award.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Section>

      {/* 2.5 AI Capability Section */}
      <Section id="ai-capability" bgColor="bg-white" pattern={true}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <h2 className="section-title mb-0">
            <span className="relative z-10 flex items-center gap-3">
              AI 能力 <span className="text-sm font-bold opacity-50 ml-2">(AI Capability)</span> <Sparkles className="text-accent-pink" />
            </span>
            <div className="absolute bottom-2 left-0 w-full h-4 bg-accent-blue -z-10"></div>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {AI_CAPABILITIES.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="brutal-card p-8 bg-white text-black brutal-card-hover"
            >
              <div className="w-12 h-12 bg-brand-blue border-2 border-black rounded-xl flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {cap.icon}
              </div>
              <h3 className="text-xl font-black mb-4">{cap.title}</h3>
              <p className="text-sm text-black/70 font-bold leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 3. Experience Section */}
      <Section id="experience" pattern={true}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="section-title mb-0">
            <span className="relative z-10 flex items-center gap-3">
              Experience <IllustrationPonyBalloon className="w-10 h-10" />
            </span>
            <div className="absolute bottom-2 left-0 w-full h-4 bg-brand-blue -z-10"></div>
          </h2>
          <div className="hidden md:flex gap-4">
            <div className="w-12 h-12 border-4 border-black rounded-full bg-brand-pink flex items-center justify-center animate-bounce">
              <IllustrationKittyBow size={20} />
            </div>
            <div className="w-12 h-12 border-4 border-black rounded-full bg-brand-blue flex items-center justify-center animate-bounce" style={{ animationDelay: '0.2s' }}>
              <Sparkles size={20} />
            </div>
          </div>
        </div>
        
        <div className="relative border-l-8 border-black ml-4 pl-12 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="w-8 h-8 bg-black rounded-full absolute left-[-56px] top-6 border-4 border-white z-10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"></div>
              <div className="brutal-card p-8 bg-white w-full brutal-card-hover group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 -rotate-12 translate-x-10 -translate-y-10 rounded-full group-hover:bg-brand-blue/10 transition-colors"></div>
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6 relative z-10">
                  <div>
                    <h3 className="text-3xl font-black group-hover:text-accent-blue transition-colors">{exp.title}</h3>
                    <div className="text-accent-blue font-bold text-xl mt-1">{exp.company}</div>
                  </div>
                  <div className="px-6 py-2 border-4 border-black rounded-full text-sm font-black bg-brand-blue shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {exp.period}
                  </div>
                </div>
                <div className="text-black/70 leading-relaxed text-lg relative z-10 space-y-8">
                  <p className="font-medium">{exp.description}</p>
                  
                  {exp.projects && (
                    <div className="space-y-8 mt-10">
                      {exp.projects.map((project, pIdx) => (
                        <div key={pIdx} className="p-6 border-4 border-black rounded-2xl bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-transform">
                          <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                            <h4 className="text-xl font-black flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${pIdx === 0 ? 'bg-brand-pink' : pIdx === 1 ? 'bg-brand-blue' : 'bg-brand-yellow'}`}></div>
                              {project.name}
                            </h4>
                            <span className="text-xs font-black px-3 py-1 bg-black text-white rounded-full uppercase tracking-wider">
                              {project.role}
                            </span>
                          </div>
                          
                          <p className="text-sm font-bold text-black/80 mb-4 leading-relaxed">
                            {project.description}
                          </p>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">核心工作</div>
                              <ul className="space-y-2">
                                {project.responsibilities.map((resp, rIdx) => (
                                  <li key={rIdx} className="text-xs flex items-start gap-2">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0"></span>
                                    <span className="font-medium">{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-2">项目成果</div>
                              <ul className="space-y-2">
                                {project.outcomes.map((outcome, oIdx) => (
                                  <li key={oIdx} className="text-xs flex items-start gap-2 text-accent-blue">
                                    <Sparkles size={12} className="mt-0.5 shrink-0" />
                                    <span className="font-black">{outcome}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Campus Experience removed from here as it moved to About */}
        </div>
      </Section>

      {/* 4. Project Section */}
      <Section id="portfolio" bgColor="bg-brand-purple/5" pattern={true}>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="section-title mb-0">
            <span className="relative z-10 flex items-center gap-3">
              项目展示 <span className="text-sm font-bold opacity-50 ml-2">(Projects)</span> <Sparkles className="text-accent-purple" />
            </span>
            <div className="absolute bottom-2 left-0 w-full h-4 bg-brand-blue -z-10"></div>
          </h2>
          <div className="px-6 py-2 border-4 border-black rounded-xl bg-white font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Total Projects: {PROJECTS.length}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`brutal-card bg-white flex flex-col brutal-card-hover group ${
                idx === 0 
                  ? 'md:col-span-2 border-accent-blue border-8 p-6' 
                  : 'md:col-span-1 p-8'
              }`}
            >
              <div className={`flex justify-between items-start ${idx === 0 ? 'mb-4' : 'mb-8'}`}>
                <div className={`${idx === 0 ? 'p-3' : 'p-4'} bg-brand-blue border-4 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-accent-blue group-hover:text-white transition-colors`}>
                  {project.type === 'internship' ? <Briefcase size={idx === 0 ? 24 : 28} /> : <FolderKanban size={idx === 0 ? 24 : 28} />}
                </div>
                <div className="flex flex-wrap gap-2 justify-end">
                  {project.tags.map(tag => (
                    <span key={tag} className={`text-[10px] font-black uppercase tracking-tighter border-2 border-black px-3 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${tag === '校级二等奖' ? 'bg-accent-yellow' : 'bg-white'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <h3 className={`${idx === 0 ? 'text-3xl mb-4' : 'text-3xl mb-6'} font-black group-hover:text-accent-blue transition-colors`}>
                {project.title}
                {idx === 0 && <span className="ml-4 text-xs bg-accent-yellow px-3 py-1 rounded-full border-2 border-black inline-block align-middle">🏆 重点项目</span>}
              </h3>
              
              <div className={`${idx === 0 ? 'space-y-4' : 'space-y-8'} flex-grow`}>
                <div className={`${idx === 0 ? 'p-3' : 'p-4'} bg-black/5 rounded-xl border-2 border-dashed border-black/20 group-hover:border-accent-blue/30 transition-colors`}>
                  <h4 className="font-black text-[10px] uppercase text-black/40 mb-1">项目背景</h4>
                  <p className="text-sm text-black/70 leading-relaxed font-medium">{project.background}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`${idx === 0 ? 'w-10 h-10' : 'w-12 h-12'} rounded-full bg-brand-pink border-4 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>我</div>
                  <div>
                    <h4 className="font-black text-[10px] uppercase text-black/40">我的角色</h4>
                    <p className={`${idx === 0 ? 'text-sm' : 'text-base'} font-black`}>{project.role}</p>
                  </div>
                </div>
                <div>
                  <h4 className={`font-black text-[10px] uppercase text-black/40 ${idx === 0 ? 'mb-2' : 'mb-3'}`}>主要工作</h4>
                  <ul className={`${idx === 0 ? 'space-y-2' : 'space-y-3'}`}>
                    {project.tasks.map((task, i) => (
                      <li key={i} className="text-sm flex gap-3 items-start">
                        <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-accent-pink border-2 border-black shrink-0" />
                        <span className="text-black/80 font-bold">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 5. Life & Contact Section */}
      <Section id="life" bgColor="bg-brand-pink/10">
        <h2 className="section-title">
          <span className="relative z-10 flex items-center gap-3">
            Life & Contact <IllustrationKittyBow className="w-10 h-10" />
          </span>
          <div className="absolute bottom-2 left-0 w-full h-4 bg-brand-pink -z-10"></div>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Life Gallery */}
          <div className="space-y-10">
            <div className="brutal-card p-8 bg-white brutal-card-hover relative overflow-hidden">
              <IllustrationPonyBalloon className="absolute -bottom-4 -right-4 opacity-10 rotate-12 w-24 h-24" />
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <Camera className="text-accent-pink" size={28} /> 生活瞬间
              </h3>
              <LifeGallery />
              <p className="mt-6 text-black/50 text-sm italic font-medium">
                热爱生活，保持好奇，在平凡中发现不平凡。
              </p>
            </div>
            
            <div className="brutal-card p-8 bg-white brutal-card-hover relative overflow-hidden">
              <IllustrationKittyBow className="absolute -top-2 -left-2 -rotate-12 opacity-40 w-12 h-12" />
              <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                <Lightbulb className="text-accent-yellow" size={28} /> Product Thinking
              </h3>
              <ProductInsightCarousel />
              <div className="mt-6 p-4 bg-brand-yellow/10 rounded-xl border-2 border-black/10">
                <p className="text-xs text-black/70 font-bold leading-relaxed">
                  从用户视角出发，拆解复杂业务逻辑，将洞察转化为可落地的产品方案。我热衷于通过技术与设计的结合，解决真实世界中的协作与流程痛点。
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div id="contact" className="brutal-card p-10 bg-brand-blue flex flex-col justify-center brutal-card-hover relative overflow-hidden">
            {/* Background Illustration */}
            <IllustrationKittyBow className="absolute -top-10 -right-10 text-white opacity-20 w-48 h-48 rotate-12" />
            <IllustrationPonyBalloon className="absolute -bottom-10 -left-10 text-white opacity-20 w-48 h-48 -rotate-12" />
            
            {/* AI Showcase - Rapid Prototyping */}
            <div className="mb-12 relative z-10 p-6 bg-white/10 rounded-2xl border-2 border-white/20">
              <div className="text-[10px] font-black uppercase tracking-widest text-black mb-4">AI Rapid Prototyping</div>
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                <div className="w-32 aspect-[3/4] brutal-card bg-white overflow-hidden shrink-0">
                  <img 
                    src="./kkb.png" 
                    alt="AI Mini Program" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-black text-black mb-2">AI 小程序快速原型</h4>
                  <p className="text-xs text-black font-bold leading-relaxed mb-4">
                    使用豆包 AI 花费 15 分钟快速完成的小程序界面展示，体现 AI 辅助下的产品快速迭代与原型构建能力。
                  </p>
                  <a 
                    href="https://docs.qq.com/doc/DYWhKWXJwdnNwa1JL" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-black text-[#0000FF] hover:text-accent-yellow transition-colors underline underline-offset-4"
                  >
                    查看小程序文档 <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            <h3 className="text-5xl font-black mb-10 relative z-10">Let's<br />Connect!</h3>
            <div className="space-y-8 relative z-10">
              <a href="tel:18189542851" className="flex items-center gap-6 p-6 bg-white border-4 border-black rounded-2xl hover:translate-x-2 hover:translate-y-2 transition-transform shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-3 bg-brand-pink border-2 border-black rounded-xl"><Briefcase /></div>
                <div className="font-black text-lg">18189542851</div>
              </a>
              <a href="mailto:Deerlet0921@163.com" className="flex items-center gap-6 p-6 bg-white border-4 border-black rounded-2xl hover:translate-x-2 hover:translate-y-2 transition-transform shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="p-3 bg-brand-pink border-2 border-black rounded-xl"><Mail /></div>
                <div className="font-black text-lg">Deerlet0921@163.com</div>
              </a>
              <div className="flex gap-6">
                <div className="flex-1 flex items-center justify-center gap-3 p-6 bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <span className="font-black">Nice To Meet You</span>
                </div>
              </div>
            </div>
            
            <div className="mt-16 pt-10 border-t-4 border-black/10 text-center relative z-10">
              <p className="font-black text-sm uppercase tracking-widest text-black/40">
                Designed with ❤️ by 李晨璐
              </p>
              <p className="text-xs text-black/30 mt-3 font-bold">
                © 2026 All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Decorative Bottom Illustration */}
      <div className="py-12 flex justify-center items-center gap-8 opacity-10">
        <Circle size={40} />
        <Square size={40} />
        <Triangle size={40} />
        <Sparkles size={40} />
        <Circle size={40} />
      </div>
    </div>
  );
}
