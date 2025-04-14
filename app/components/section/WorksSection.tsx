import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Images } from 'lucide-react'
import { PlayfairDisplayFont, ShipporiMinchoFont } from '../../font'
import Image from 'next/image'
import { IMAGES } from '../../constants/images'
import { PreloadedImage } from '../atom/PreloadedImage'
import SectionDiv from '../atom/sectionDiv'
import Title from '../atom/title'

interface WorksSectionProps {
  onSectionScrollUp?: () => void;
  onSectionScrollDown?: () => void;
}

const works = [
  {
    title: 'ポートフォリオ',
    description: '本サイトです．デザインが気に食わず試行錯誤した結果，v0というAIによるUI作製サービスを使ったプロトタイプをもとに作りました．画面遷移にこだわった結果，余計にレイアウトやUXに苦労しています．',
    technologies: ['typescript','Next.js','tailwindcss','v0'],
    icon: '/favicon_ico.ico',
    link: 'https://fuki-portfolio.vercel.app/',
    images: []
  },
  {
    title: 'Lights Out',
    description: '1年生の時にHTML,CSS,javascriptを学んだあとに作成した作品．だいぶお粗末なコードと雑なUIですが，初めて作った作品なので思い入れがあります．',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    icon: IMAGES.works.lightsOut,
    link: '',
    images: [] 
  },
  {
    title: 'OXゲーム',
    description: '大学の講義で作成した，C言語によるCLIベースのOXゲームをJavaScriptを用いてGUI化したものです．とても苦労した講義で課題に徹夜して取り組んだことを覚えています．',
    technologies: ['HTML', 'CSS', 'javascript','C'],
    icon: IMAGES.works.oxGame,
    link: '',
    images: []
  },
  {
    title: 'fifteel',
    description: '1年次に参加したJPhacksで作成した作品．主にchrome拡張機能を作成しました．初めてのハッカソンで多くの刺激を受けました．',
    technologies: ['javascript', 'Python', 'LLM', 'chrome拡張'],
    icon: IMAGES.works.fifteel,
    link: '',
    images: []
  },
  {
    title: 'FAST PENGUIN',
    description: '2年生5月のサークルのハッカソンで作成した作品．Unityを使って作成し，実際に学園祭に出展しました．多くの人に遊んでもらえて嬉しかったです．',
    technologies: ['C#','Unity'],
    icon: IMAGES.works.fastPenguin,
    link: '',
    images: []
  },
  {
    title: 'POP TURN',
    description: '2年次に参加したJPHACKSで作成した作品．主にフロントエンドを担当しました．1年間の成長を実感しました．',
    technologies: ['firebase', 'chatgpt', 'python', 'typescript','Next.js','tailwindcss'],
    icon: IMAGES.works.popTurn,
    link: '',
    images: []
  },
  {
    title: 'TubeGraph',
    description: '2年生の春休みに参加したSysHacksで作成した作品．チームリーダーとして後輩と開発し，団体賞を受賞できました．',
    technologies: ['Next.js', 'chatgpt', 'typescript','tailwindcss'],
    icon: IMAGES.works.tubegraph,
    link: '',
    images: []
  }
]

const WorkDetail: React.FC<{ work: typeof works[0] }> = ({ work }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-700/80 backdrop-blur-sm rounded-lg p-6 text-left h-full flex flex-col"
    >
      <div className="flex items-center mb-6">
        <PreloadedImage
          src={work.icon || "/placeholder.svg"}
          alt={`${work.title} icon`}
          width={48}
          height={48}
          className="mr-4 rounded-lg"
        />
        <h3 className={`${ShipporiMinchoFont.className} text-white text-2xl font-bold`}>
          {work.title}
        </h3>
      </div>

      <div className="mb-6 flex-grow">
        <p className={`${ShipporiMinchoFont.className} text-gray-300 text-lg mb-6 leading-relaxed`}>
          {work.description}
        </p>
        
        {/* 作品画像があれば表示 */}
        {work.images && work.images.length > 0 && (
          <div className="mt-6 mb-8">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <PreloadedImage
                src={work.images[0]}
                alt={`${work.title} screenshot`}
                width={600}
                height={400}
                className="w-full h-auto rounded-md object-cover"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <h4 className="text-white text-sm mb-2 font-semibold uppercase tracking-wider">使用技術</h4>
        <div className="flex flex-wrap gap-2 mb-4">
          {work.technologies.map((tech, i) => (
            <span key={i} className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        {work.link && (
          <a 
            href={work.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mt-4"
          >
            <Github size={16} />
            <span>リポジトリを見る</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

const WorksSection: React.FC<WorksSectionProps> = ({ onSectionScrollUp, onSectionScrollDown }) => {
  const [detailIndex, setDetailIndex] = useState(0);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const [isTimelineHovered, setIsTimelineHovered] = useState(false);
  const outerScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const WorkList: React.FC<{ 
    name: string; 
    icon: string; 
    isActive: boolean;
    index: number;
  }> = ({ name, icon, isActive, index }) => {
    return (
      <motion.div 
        className={`flex items-center p-3 gap-3 rounded-lg cursor-pointer transition-colors duration-300 relative ${
          isActive 
            ? 'bg-gray-700 shadow-lg' 
            : 'bg-gray-800 hover:bg-gray-700/70'
        }`}
        onClick={() => setDetailIndex(index)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <PreloadedImage
          src={icon || "/placeholder.svg"}
          alt={`${name} icon`}
          width={32}
          height={32}
          className="rounded-md w-7 h-7"
        />
        <div className={`${ShipporiMinchoFont.className} text-white text-lg`}>
          {name}
        </div>
        {isActive && (
          <div 
            className="absolute right-0 top-0 bottom-0 h-full"
          >
            <div className="w-1 h-full bg-yellow-600 rounded-r-sm" />
          </div>
        )}
      </motion.div>
    )
  }

  const nextWork = useCallback(() => {
    if (detailIndex < works.length - 1) {
      setDetailIndex((prevIndex) => prevIndex + 1);
    } else {
      setDetailIndex(0);
    }
  }, [detailIndex, works.length]);
  
  const prevWork = useCallback(() => {
    if (detailIndex > 0) {
      setDetailIndex((prevIndex) => prevIndex - 1);
    } else {
      setDetailIndex(works.length - 1);
    }
  }, [detailIndex, works.length]);

  const handleWorkListScroll = useCallback((e: WheelEvent) => {
    
    e.preventDefault();
    e.stopPropagation();
    
    const scrollThreshold = 25;
    if (Math.abs(e.deltaY) > scrollThreshold) {
      if (e.deltaY > 0) {
        nextWork();
      } else if (e.deltaY < 0) {
        prevWork();
      }
    }
  }, [nextWork, prevWork]);
  
  const handleOuterWheel = useCallback((event: WheelEvent) => {
    if (isTimelineHovered) return;

    event.preventDefault();
    
    if (outerScrollTimeout.current) {
      clearTimeout(outerScrollTimeout.current);
    }
    
    outerScrollTimeout.current = setTimeout(() => {
      if (event.deltaY < 0 && onSectionScrollUp) {
        onSectionScrollUp();
      } else if (event.deltaY > 0 && onSectionScrollDown) {
        onSectionScrollDown();
      }
      outerScrollTimeout.current = null;
    }, 50); // デバウンス処理
  }, [isTimelineHovered, onSectionScrollUp, onSectionScrollDown]);

  // イベントリスナーのクリーンアップを修正
  useEffect(() => {
    const listContainer = listContainerRef.current;
    
    if (listContainer) {
      listContainer.addEventListener('wheel', handleWorkListScroll, { passive: false });
    }
    
    return () => {
      if (listContainer) {
        listContainer.removeEventListener('wheel', handleWorkListScroll);
      }
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleWorkListScroll]);

  useEffect(() => {
    const outerContainer = outerContainerRef.current;
    if (!outerContainer) return;
    
    outerContainer.addEventListener('wheel', handleOuterWheel, { passive: false });
    
    return () => {
      outerContainer.removeEventListener('wheel', handleOuterWheel);
      if (outerScrollTimeout.current) {
        clearTimeout(outerScrollTimeout.current);
      }
    };
  }, [handleOuterWheel]);

  return (
    <SectionDiv ref={outerContainerRef}>
      <Title title="My Works" />
      <div className="w-full h-2/3 mx-auto">
        {/* モバイル表示 */}
        <div className="md:hidden px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`work-${detailIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800 rounded-lg py-6 text-left w-full min-h-[300px] flex flex-col justify-between"
            >
              <div className="px-4">
                <h3 className={`${ShipporiMinchoFont.className} text-white text-2xl mb-2 flex items-center`}>
                  <PreloadedImage
                    src={works[detailIndex].icon || "/placeholder.svg"}
                    alt={`${works[detailIndex].title} icon`}
                    width={24}
                    height={24}
                    className="mr-2"
                  />
                  {works[detailIndex].title}
                </h3>
                <p className={`${ShipporiMinchoFont.className} text-gray-400 mb-4 flex-grow`}>
                  {works[detailIndex].description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {works[detailIndex].technologies.map((tech, i) => (
                  <span key={i} className="bg-blue-600 text-white text-sm px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between items-center mt-6 mb-4">
            <button
              onClick={prevWork}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Previous work"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextWork}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300"
              aria-label="Next work"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className="mt-2 flex justify-center space-x-2 mb-4">
            {works.map((_, index) => (
              <button
                key={index}
                onClick={() => setDetailIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === detailIndex ? 'bg-blue-600' : 'bg-gray-600'
                }`}
                aria-label={`Go to work ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* デスクトップ表示 - リストと詳細ビュー */}
        <div className="hidden md:grid grid-cols-3 gap-8 w-full h-full px-16">
          {/* 左側：作品リスト */}
          <div
            ref={listContainerRef}
            className="col-span-1 grid gap-4 pr-2 p-4 h-full"
            onMouseEnter={() => setIsTimelineHovered(true)}
            onMouseLeave={() => setIsTimelineHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {works.map((work, index) => (
              <WorkList 
                key={index} 
                name={work.title} 
                icon={work.icon} 
                isActive={detailIndex === index}
                index={index}
              />
            ))}
          </div>
          
          {/* 右側：選択された作品の詳細 */}
          <div className="col-span-2 h-full pb-8">
            <AnimatePresence mode="wait">
              <WorkDetail key={`work-${detailIndex}`} work={works[detailIndex]} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SectionDiv>
  )
}

export default WorksSection

