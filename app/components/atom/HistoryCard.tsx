import { useEffect, useState } from "react";
import { ShipporiMinchoFont } from "../../font";

const HistoryCard: React.FC<{
  year: string;
  title: string;
  detail: string;
  index: number;
  alwaysShowDetail: boolean;
  isLast?: boolean;
}> = ({ year, title, detail, index, alwaysShowDetail, isLast = false }) => {
  const [isHovering, setIsHovering] = useState(alwaysShowDetail);
    
  useEffect(() => {
    setIsHovering(alwaysShowDetail);
  }, [alwaysShowDetail]);
  
  return (
    <>
    {index % 2 === 0 ? (
      <div className="relative flex flex-col items-center"
        onMouseEnter={() => !alwaysShowDetail && setIsHovering(true)}
        onMouseLeave={() => !alwaysShowDetail && setIsHovering(false)}
      >
        {index === 0 ? (
          <div className="absolute top-1/2 left-1/2 bg-yellow-300 w-48 h-1" />
        ) : isLast ? (
          <div className="absolute top-1/2 right-1/2 bg-yellow-300 w-48 h-1" />
        ) : (
          <div className="absolute top-1/2 bg-yellow-300 w-96 h-1" />
        )}
        <div className="w-96 h-32"/>
        <div className="w-5 h-5 bg-yellow-400 shadow-lg shadow-yellow-400/50 rounded-full my-3 z-10" />
        <div className="flex flex-col items-center w-72 h-32">
          <div className={`${ShipporiMinchoFont.className} text-white text-xl md:text-2xl font-bold`}>
            {year}
          </div>
          <div className={`${ShipporiMinchoFont.className} text-white text-lg md:text-xl font-bold text-center`}>
            {title}
          </div>
        </div>
        <div 
          className={`absolute bottom-1/2 -translate-y-10 bg-gray-800/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-xl border border-yellow-500/30 w-72 z-30 transition-all duration-300 ${
          isHovering ? 'opacity-100 ' : 'opacity-0 translate-y-0 pointer-events-none'
          }`}
        >
          <p className={`${ShipporiMinchoFont.className} text-white/90 text-sm`}>{detail}</p>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 border-b border-l border-yellow-500/30 -rotate-45"></div>
        </div>
      </div>
    ):(
      <div className="relative flex flex-col items-center"
        onMouseEnter={() => !alwaysShowDetail && setIsHovering(true)}
        onMouseLeave={() => !alwaysShowDetail && setIsHovering(false)}
      >
        <div className="flex flex-col-reverse items-center w-80 h-32">
          <div className={`${ShipporiMinchoFont.className} text-white text-xl md:text-2xl font-bold`}>
            {year}
          </div>
          <div className={`${ShipporiMinchoFont.className} text-white text-lg md:text-xl font-bold text-center`}>
            {title}
          </div>
        </div>
        {index === 0 ? (
          <div className="absolute top-1/2 left-1/2 bg-yellow-300 w-48 h-1" />
        ) : isLast ? (
          <div className="absolute top-1/2 right-1/2 bg-yellow-300 w-48 h-1" />
        ) : (
          <div className="absolute top-1/2 bg-yellow-300 w-96 h-1" />
        )}
        <div className="w-5 h-5 bg-yellow-400 shadow-lg shadow-yellow-400/50 rounded-full my-3 z-10" />
        <div className="w-96 h-32"/>
        <div 
          className={`absolute top-1/2 translate-y-10 bg-gray-800/90 backdrop-blur-sm px-4 py-3 rounded-lg shadow-xl border border-yellow-500/30 w-72 z-30 transition-all duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0 translate-y-0 pointer-events-none'
          }`}
        >
          <p className={`${ShipporiMinchoFont.className} text-white/90 text-sm`}>{detail}</p>
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 border-t border-l border-yellow-500/30 rotate-45"></div>
        </div>
      </div>
    )}
    </>
  );
};

export default HistoryCard;