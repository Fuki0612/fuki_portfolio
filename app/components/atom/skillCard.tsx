import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { PreloadedImage } from "./PreloadedImage";
import { ShipporiMinchoFont } from "@/app/font";

type Skill = {
  name: string;
  icon: string;
  level?: number;      // スキルレベル（1-5など）
  description?: string; // スキルの詳細説明
  experience?: string;  // 経験年数やレベル
  invisible?: boolean;
  category?: string; // カテゴリ（例: 'front', 'back', 'others'など）
};

const VerticalSkillCard: React.FC<{ skill: Skill; alwaysShowDetail:boolean }> = ({ skill, alwaysShowDetail }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const renderSkillLevel = (level: number = 0) => {
    return (
      <div className="flex items-center mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-3 h-3 mx-1 rounded-full ${i < level ? 'bg-yellow-400' : 'bg-gray-600'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/80 backdrop-blur-sm rounded-lg py-3 px-10 flex flex-col items-center relative"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      whileHover={{ scale: 1.03, backgroundColor: 'rgba(55, 65, 81, 0.9)' }}
    >
      <h3 className={`${ShipporiMinchoFont.className} text-white text-xl font-bold`}>{skill.name}</h3>
      
      <div className="bg-gray-700/50 rounded-full p-4 my-2">
        <PreloadedImage
          src={skill.icon || "/placeholder.svg"}
          alt={skill.name}
          width={64}
          height={64}
          className="w-16 h-16"
          priority={true}
        />
      </div>
      
      {skill.level && renderSkillLevel(skill.level)}
      
      {skill.experience && (
        <div className="text-yellow-300 font-semibold mt-1 text-sm">
          経験: {skill.experience}
        </div>
      )}
      
      <AnimatePresence>
        {((alwaysShowDetail) || (showDetails && !alwaysShowDetail)) && skill.description && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-4 left-0 right-0 bg-gray-900/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-700 z-10 transform translate-y-full"
          >
            <p className={`${ShipporiMinchoFont.className} text-gray-200 text-sm`}>{skill.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VerticalSkillCard;