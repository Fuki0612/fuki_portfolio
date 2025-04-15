import React, { useRef, useState, useEffect, useCallback } from "react";
import HistoryCard from "./HistoryCard";

type TimelineItem = {
  year: string;
  title: string;
  detail: string;
};

interface TimelineProps {
  timelineItems: TimelineItem[];
  alwaysShowDetail: boolean;
  onTimelineScrollStart?: () => void;
  onTimelineScrollEnd: () => void;
}

const Timeline: React.FC<TimelineProps> = ({ 
  timelineItems, 
  alwaysShowDetail, 
  onTimelineScrollStart, 
  onTimelineScrollEnd 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const startReached = useRef(false);
  const endReached = useRef(false);
  const [isStop, setIsStop] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const lastWheelEvent = useRef<WheelEvent | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const scrollVelocity = useRef(0);
  const [isTimelineHovered, setIsTimelineHovered] = useState(false);
  
  const updateElementsVisibility = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const cards = container.querySelectorAll('.history-card');
    
    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      
      let opacity = 1;
      
      // 左端に近づくほど透明に
      if (cardCenter < containerRect.left + containerRect.width * 0.15) {
        opacity = (cardCenter - containerRect.left) / (containerRect.width * 0.15);
      } 

      // 右端に近づくほど透明に
      else if (cardCenter > containerRect.right - containerRect.width * 0.15) {
        opacity = (containerRect.right - cardCenter) / (containerRect.width * 0.15);
      }
      
      opacity = Math.max(0.1, Math.min(1, opacity));
      
      (card as HTMLElement).style.opacity = opacity.toString();
    });
  }, []);
  
  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const container = scrollContainerRef.current;
    if (!container || isAnimating) return;
    
    // イベントを保存して重複処理を防止
    lastWheelEvent.current = event;
    
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    animationFrameId.current = requestAnimationFrame(() => {
      if (!lastWheelEvent.current) return;
      
      // スクロール量を計算
      const impulse = lastWheelEvent.current.deltaY * 4.0;
      
      // 現在の速度に新しい入力を加える
      scrollVelocity.current = scrollVelocity.current * 0.5 + impulse * 0.5;
      
      const startPos = container.scrollLeft;
      const targetPos = startPos + scrollVelocity.current;
      const startTime = performance.now();
      const duration = 100;
      
      const smoothScroll = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentPosition = startPos + (targetPos - startPos) * easeProgress;
        
        container.scrollLeft = currentPosition;
        
        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(smoothScroll);
        } else {
          animationFrameId.current = null;
          scrollVelocity.current *= 0.5;
          
          if (currentPosition <= 0) {
            handleLeftEdge();
          } else if (currentPosition >= container.scrollWidth - container.clientWidth) {
            handleRightEdge();
          }
          
          if (currentPosition > 30) startReached.current = false;
          if (currentPosition < container.scrollWidth - container.clientWidth - 30) endReached.current = false;
        }
      };
    
      // 左端と右端の処理
      const handleLeftEdge = () => {
        if (!isStop) {
          container.scrollLeft = 0
          setIsStop(true)
          setIsAnimating(true)
          container.classList.add('pulse-left')
          setTimeout(() => {
            container.classList.remove('pulse-left')
            setIsAnimating(false)
          }, 500)
        } else {
          if (!isAnimating) {
            setIsStop(false)
            container.scrollLeft = 0
            if (!startReached.current) {
              startReached.current = true
              onTimelineScrollStart?.()
            }
          }
        }
      }

      const handleRightEdge = () => {
        if (!isStop) {
          container.scrollLeft = container.scrollWidth - container.clientWidth
          setIsStop(true)
          setIsAnimating(true)
          container.classList.add('pulse-right')
          setTimeout(() => {
            container.classList.remove('pulse-right')
            setIsAnimating(false)
          }, 500)
        } else {
          if (!isAnimating) {
            setIsStop(false)
            container.scrollLeft = container.scrollWidth - container.clientWidth
            if (!endReached.current) {
              endReached.current = true
              onTimelineScrollEnd()
            }
          }
        }
      }
  
      // 即座に端に達する場合は直接処理
      if (targetPos <= 0) {
        handleLeftEdge();
        scrollVelocity.current = 0;
        return;
      } else if (targetPos >= container.scrollWidth - container.clientWidth) {
        handleRightEdge();
        scrollVelocity.current = 0;
        return;
      }
    
      animationFrameId.current = requestAnimationFrame(smoothScroll);
      setIsStop(false);
      lastWheelEvent.current = null;
    });
  }, [isAnimating, updateElementsVisibility, onTimelineScrollStart, onTimelineScrollEnd]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
  
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      updateElementsVisibility();
    };
    
    container.addEventListener('scroll', handleScroll);
    
    updateElementsVisibility();
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [updateElementsVisibility]);

  return (
    <div 
      ref={scrollContainerRef} 
      className="hidden md:block relative w-[100vw] overflow-x-auto pt-20 rounded-lg cursor-grab active:cursor-grabbing mx-0 border-y border-dashed"
      style={{ 
        maxWidth: '100%',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        willChange: 'scroll-position',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
      }}
      onMouseEnter={() => setIsTimelineHovered(true)}
      onMouseLeave={() => setIsTimelineHovered(false)}
    >
      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
        
        .timeline-fade-overlay {
          pointer-events: none;
          z-index: 20;
          position: absolute;
          top: 0;
          bottom: 0;
          width: 15%;
          background: linear-gradient(to right, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0));
        }
        
        .timeline-fade-overlay-right {
          right: 0;
          background: linear-gradient(to left, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0));
        }
        
        @keyframes pulseLeft {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(0); }
          75% { transform: translateX(-3px); }
          100% { transform: translateX(0); }
        }
        
        @keyframes pulseRight {
          0% { transform: translateX(0); }
          25% { transform: translateX(5px); }
          50% { transform: translateX(0); }
          75% { transform: translateX(3px); }
          100% { transform: translateX(0); }
        }
        
        .pulse-left {
          animation: pulseLeft 0.5s ease-out;
        }
        
        .pulse-right {
          animation: pulseRight 0.5s ease-out;
        }
        
        .history-card {
          transition: opacity 0.3s ease;
        }
      `}</style>
      <div className="relative w-max flex flex-row items-center justify-start px-16">
        <div className="h-40 w-[30vw]"/>
          {timelineItems.map((item, index) => (
            <HistoryCard
              key={index}
              year={item.year}
              title={item.title}
              detail={item.detail}
              index={index}
              alwaysShowDetail={alwaysShowDetail}
              isLast={index === timelineItems.length - 1}
            />
          ))}
        <div className="h-40 w-[30vw]"/>
      </div>
    </div>
  )
}

export default Timeline;