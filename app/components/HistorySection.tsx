import React, { useRef, useCallback, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { PlayfairDisplayFont, ShipporiMinchoFont } from "../font"
import HistoryCard from "./HistoryCard";

interface HistorySectionProps {
  onTimelineScrollEnd: () => void;
  onTimelineScrollStart?: () => void; // 左端に達した時のコールバック
}

const HistorySection: React.FC<HistorySectionProps> = ({ onTimelineScrollEnd, onTimelineScrollStart }) => {
  const timeline = [
    { year: "2004.6",  title: "誕生", detail: "静岡県磐田市で生まれる．名前は風が稀に吹くような穏やかな人生を歩んでほしいという思いからつけてもらいました．" },
    { year: "2020.4",  title: "磐田南高等学校 入学", detail: "静岡県立磐田南高等学校の理数科に入学しました．入学早々コロナで休学と波乱の幕開けでした．" },
    { year: "2020.4",  title: "同学 科学技術部 入部", detail: "高校で科学技術部に入部し，初めてプログラミングに触りました．HSPという分かりやすく使いづらい言語を使いました．" },
    { year: "2020.11", title: "HSPコンテスト2020学生賞 受賞", detail: "HSPで作った自作ゲームのコンテストで学生賞を受賞しました．人生で初めて賞をもらいとても嬉しかったです．" },
    { year: "2021.11", title: "HSPコンテスト2021学生賞 受賞", detail: "昨年に続き学生賞を受賞しました．より上の賞を目指していたので昨年とは違い悔しかったことを覚えています．" },
    { year: "2023.3",  title: "磐田南高等学校 卒業", detail: "コロナのせいでバラ色とは言い難い高校生活でしたが，笑顔で悔いはないと思える高校生活でした．" },
    { year: "2023.4",  title: "名古屋大学 入学", detail: "情報学部コンピュータ科学科へ進学．進路を悩んだ結果，高校時代に好きになったプログラミングを専攻しようと思い，この学科を選びました．" },
    { year: "2023.4",  title: "アプリ開発サークル jack 入会", detail: "プログラミングで創作活動をしたいと思い入会しました．サークル内に高い技術力の人が多く良い刺激になっています．" },
    { year: "2023.10", title: "JPHacks2023 BestHackDayAward 受賞", detail: "サークルの先輩と参加しました．名古屋会場のBestHackDayAwardを受賞できましたが，先輩の足を引っ張り自らの不勉強を痛感しました．" },
    { year: "2023.12", title: "ITパスポート 取得", detail: "夏からコツコツ勉強して無事に取得できました．" },
    { year: "2024.10", title: "JPHacks2024 参加", detail: "サークルの人と参加しました．主にフロントエンドを担当しました．苦しくも賞は逃しましたが昨年よりはチームに貢献できたと感じました．" },
    { year: "2024.12", title: "基本情報技術者 取得", detail: "ずるずると試験日を延ばし続け年末にやっと受験して合格しました．" },
    { year: "2025.1",  title: "長期インターン 開始", detail: "株式会社DRAGON AGENCYで長期インターンを開始しました．今もまだ勤務しています．" },
    { year: "2025.3",  title: "Syshack 団体賞受賞", detail: "サークルの後輩と同じチームで参加しました．チームリーダーとしてチームを率い，スポンサー団体の賞を受賞できました，" },
  ]

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const startReached = useRef(false);
  const endReached = useRef(false)
  const [isStop, setIsStop] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const lastWheelEvent = useRef<WheelEvent | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const scrollVelocity = useRef(0);
  const [alwaysShowDetail, setAlwaysShowDetail] = useState(false);
  
  const updateElementsVisibility = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const cards = container.querySelectorAll('.history-card');
    
    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      
      // 画面の端からの距離に応じて透明度を計算
      let opacity = 1;
      
      // 左端に近づくほど透明に
      if (cardCenter < containerRect.left + containerRect.width * 0.15) {
        opacity = (cardCenter - containerRect.left) / (containerRect.width * 0.15);
      } 
      // 右端に近づくほど透明に
      else if (cardCenter > containerRect.right - containerRect.width * 0.15) {
        opacity = (containerRect.right - cardCenter) / (containerRect.width * 0.15);
      }
      
      // 透明度を制限（0.1〜1.0の範囲に）
      opacity = Math.max(0.1, Math.min(1, opacity));
      
      // カードのスタイルを更新
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
    
    // すでに実行中のアニメーションフレームがあればキャンセル
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    // アニメーション処理を一度だけ予約
    animationFrameId.current = requestAnimationFrame(() => {
      if (!lastWheelEvent.current) return;
      
      // スクロール量を計算 - 加速度を調整
      const impulse = lastWheelEvent.current.deltaY * 4.0;
      
      // 現在の速度に新しい入力を加える (70% 現在の速度, 30% 新しい入力)
      scrollVelocity.current = scrollVelocity.current * 0.5 + impulse * 0.5;
      
      // スムーズスクロールのアニメーション
      const startPos = container.scrollLeft;
      const targetPos = startPos + scrollVelocity.current;
      const startTime = performance.now();
      const duration = 100; // アニメーション時間を長くする
      
      const smoothScroll = (timestamp: number) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // イージング関数
        const easeProgress = 1 - Math.pow(1 - progress, 3); // 5次から3次に変更して軽量化
        const currentPosition = startPos + (targetPos - startPos) * easeProgress;
        
        // 変換を使用してスクロール位置を更新（GPUアクセラレーション）
        container.scrollLeft = currentPosition;
        
        // アニメーション続行
        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(smoothScroll);
        } else {
          // アニメーション完了後の処理
          animationFrameId.current = null;
          scrollVelocity.current *= 0.5; // 速度減衰
          
          // エッジ検出
          if (currentPosition <= 0) {
            handleLeftEdge();
          } else if (currentPosition >= container.scrollWidth - container.clientWidth) {
            handleRightEdge();
          }
          
          // エッジフラグリセット
          if (currentPosition > 30) startReached.current = false;
          if (currentPosition < container.scrollWidth - container.clientWidth - 30) endReached.current = false;
        }
      };
    
      // 左端と右端の処理を関数化して見通しを良くする
      const handleLeftEdge = () => {
        if (!isStop) {
          container.scrollLeft = 0
          setIsStop(true)
          setIsAnimating(true)
          container.classList.add('pulse-left')
          setTimeout(() => {
            container.classList.remove('pulse-left')
            setIsAnimating(false)
          }, 500) // 700msから500msに短縮
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
          }, 500) // 700msから500msに短縮
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
    
      // アニメーション開始
      animationFrameId.current = requestAnimationFrame(smoothScroll);
      setIsStop(false);
      lastWheelEvent.current = null;
    });
  }, [isAnimating, updateElementsVisibility]);
  
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
    
    // 初期表示時にも一度実行
    updateElementsVisibility();
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [updateElementsVisibility]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-full px-0 pt-8 md:py-64"
    >
      <h2 className={`${PlayfairDisplayFont.className} text-white text-4xl md:text-6xl font-bold mb-8`}>My History</h2>
      <div className="flex gap-10">
        <h3 className={`${ShipporiMinchoFont.className} text-white text-md font-bold my-0 text-center`}>私のこれまでを振り返りましょう <br/>ホバーで詳細が表示されます</h3>
        <button 
          onClick={() => setAlwaysShowDetail(prev => !prev)}
          className={`${ShipporiMinchoFont.className} text-white text-sm rounded-md px-4 py-2 transition-colors duration-300 
            ${alwaysShowDetail 
              ? 'bg-yellow-600 hover:bg-yellow-700' 
              : 'bg-yellow-800/60 hover:bg-yellow-800'
            }`}
        >
          {alwaysShowDetail ? '通常表示に戻す' : '詳細を常に表示'}
        </button>
      </div>

      <div 
        ref={scrollContainerRef} 
        className="relative w-[100vw] min-h-96 overflow-x-auto py-20 rounded-lg cursor-grab active:cursor-grabbing mx-0"
        style={{ 
          maxWidth: '100%',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          willChange: 'scroll-position',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
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

          {timeline.map((item, index) => (
            <HistoryCard
              key={index}
              year={item.year}
              title={item.title}
              detail={item.detail}
              index={index}
              alwaysShowDetail={alwaysShowDetail}
              isLast={index === timeline.length - 1}
            />
          ))}
          
          <div className="h-40 w-[30vw]"/>
        </div>
      </div>
      </motion.div>
      )
}

export default HistorySection