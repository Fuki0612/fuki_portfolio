import React, { useRef, useCallback, useState } from "react";
import Title from "../atom/title";
import SectionDiv from "../atom/sectionDiv";
import Timeline from "../atom/timeline";
import TimelineControls from "../atom/historyControl";

interface HistorySectionProps {
  onTimelineScrollEnd: () => void;
  onTimelineScrollStart?: () => void; 
  onSectionScrollUp?: () => void;  
  onSectionScrollDown?: () => void;  
}

const HistorySection: React.FC<HistorySectionProps> = ({ 
  onTimelineScrollEnd, 
  onTimelineScrollStart,
  onSectionScrollUp,
  onSectionScrollDown 
}) => {
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
  ];

  const [alwaysShowDetail, setAlwaysShowDetail] = useState(false);
  const [isTimelineHovered, setIsTimelineHovered] = useState(false);
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const outerScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const handleOuterWheel = useCallback((event: WheelEvent) => {
    if (isTimelineHovered) return;
    
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
    }, 50);
    
    event.preventDefault();
  }, [isTimelineHovered, onSectionScrollUp, onSectionScrollDown]);

  React.useEffect(() => {
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
      <Title title="My History" />
      
      <TimelineControls 
        alwaysShowDetail={alwaysShowDetail}
        setAlwaysShowDetail={setAlwaysShowDetail}
      />

      <Timeline 
        timelineItems={timeline}
        alwaysShowDetail={alwaysShowDetail}
        onTimelineScrollStart={onTimelineScrollStart}
        onTimelineScrollEnd={onTimelineScrollEnd}
      />
    </SectionDiv>
  );
};

export default HistorySection;