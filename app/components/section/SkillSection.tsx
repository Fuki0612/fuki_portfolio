import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ShipporiMinchoFont } from '../../font'
import { IMAGES } from '../../constants/images'
import SectionDiv from '../atom/sectionDiv'
import Title from '../atom/title'
import VerticalSkillCard from '../atom/skillCard'

type Skill = {
  name: string;
  icon: string;
  level?: number;      // スキルレベル（1-5など）
  description?: string; // スキルの詳細説明
  experience?: string;  // 経験年数やレベル
  invisible?: boolean;
  category?: string; // カテゴリ（例: 'front', 'back', 'others'など）
};

const skills: Skill[] = [
  { 
    name: 'HTML', 
    icon: IMAGES.skills.html,
    level: 3,
    description: 'セマンティックなHTML構造の設計ができます．アクセシビリティにも配慮したマークアップを心がけています．',
    experience: '2年',
    category: 'language'
  },
  { 
    name: 'CSS', 
    icon: IMAGES.skills.css,
    level: 2,
    description: 'レスポンシブデザインやFlexboxやGridを活用したレイアウト設計ができます．アニメーションは挑戦中です．',
    experience: '2年',
    category: 'language'
  },
  { 
    name: 'JavaScript', 
    icon: IMAGES.skills.javascript,
    level: 3,
    description: 'モダンなES6+の文法を使った開発ができます．DOM操作や非同期処理も実装できます．',
    experience: '2年',
    category: 'language'
  },
  { 
    name: 'TypeScript', 
    icon: IMAGES.skills.typescript,
    level: 4,
    description: '型安全なコードを書くことができます．個人的に1番好きな言語です．',
    experience: '1年半',
    category: 'language'
  },
  { 
    name: 'C', 
    icon: IMAGES.skills.c,
    level: 2,
    description: '大学の講義で触ったのみです．ポインタや構造体など，低レベルのメモリ操作ができます．',
    experience: '1年',
    category: 'language'
  },
  { 
    name: 'C++', 
    icon: IMAGES.skills.cpp,
    level: 2,
    description: 'C同様大学の講義で使用しました．競技プログラミングもC++で行います．',
    experience: '1年',
    category: 'language'
  },
  { 
    name: 'Python', 
    icon: IMAGES.skills.python,
    level: 3,
    description: '簡潔で可読性の高いコードを書くことができます．スクレイピングもこれで実装しました．',
    experience: '2年',
    category: 'language'
  },
  { 
    name: 'Dart', 
    icon: IMAGES.skills.dart,
    level: 2,
    description: 'Flutterアプリの開発を通じた，DartでのUI設計や状態管理の経験があります．',
    experience: '半年',
    category: 'language'
  },
  { 
    name: 'React', 
    icon: IMAGES.skills.react,
    level: 4,
    description: 'Hooksや状態管理を活用できます。ディレクトリ構成に良く悩まされます．',
    experience: '1年半',
    category: 'framework'
  },
  { 
    name: 'Next.js', 
    icon: IMAGES.skills.nextjs,
    level: 3,
    description: '最近のWebアプリ開発は専らこれです．SSRやSSGを活用した開発ができます．',
    experience: '1年',
    category: 'framework'
  },
  { 
    name: 'Tailwind CSS', 
    icon: IMAGES.skills.tailwind,
    level: 3,
    description: 'ユーティリティファーストなスタイリングで．素早く美しいUIを構築できます．',
    experience: '1年',
    category: 'framework'
  },
  { 
    name: 'Flutter', 
    icon: IMAGES.skills.flutter,
    level: 3,
    description: 'マルチプラットフォーム対応のUIを効率的に構築できます．Firebaseとの連携も経験済みです．',
    experience: '1年',
    category: 'framework'
  },
  { 
    name: 'VSCode', 
    icon: IMAGES.skills.vscode,
    level: 4,
    description: '快適な開発環境を目指し，今も拡張機能やショートカットを学んでいます．',
    experience: '2年',
    category: 'others'
  },
  { 
    name: 'Git Github', 
    icon: IMAGES.skills.github,
    level: 4,
    description: '毎チーム開発で使用しています．Gitの基本的なコマンドやGithubのPull Requestの流れを理解しています．',
    experience: '2年',
    category: 'others'
  }  
]

const SkillSection: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [alwaysShowDetail, setAlwaysShowDetail] = useState(false);
  
  const categories = ['all', 'language', 'framework', 'others'];
  
  const filteredSkills = selectedCategory === 'all' 
    ? skills.filter(s => !s.invisible)
    : skills.filter(s => !s.invisible && s.category === selectedCategory);
  
  const skillsPerPageDesktop = 10; // デスクトップは2×5で10個
  const skillsPerPageMobile = 4;   // モバイルは4個
  
  // 総ページ数を計算
  const totalPagesDesktop = Math.ceil(filteredSkills.length / skillsPerPageDesktop);
  const totalPagesMobile = Math.ceil(filteredSkills.length / skillsPerPageMobile);

  // 1ページだけか判定（ボタン無効化用）
  const isSinglePageDesktop = totalPagesDesktop <= 1;
  const isSinglePageMobile = totalPagesMobile <= 1;
  
  // 現在のページに表示するスキル
  const currentDesktopSkills = filteredSkills.slice(
    currentPage * skillsPerPageDesktop, 
    (currentPage + 1) * skillsPerPageDesktop
  );
  
  const currentMobileSkills = filteredSkills.slice(
    currentPage * skillsPerPageMobile, 
    (currentPage + 1) * skillsPerPageMobile
  );

  const nextPage = () => {
    if (totalPagesDesktop <= 1) return;
    setCurrentPage((prev) => (prev + 1) % totalPagesDesktop);
  };
  
  const prevPage = () => {
    if (totalPagesDesktop <= 1) return;
    setCurrentPage((prev) => (prev - 1 + totalPagesDesktop) % totalPagesDesktop);
  };

  return (
    <SectionDiv>
      <Title title="My Skills" />
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={prevPage}
          disabled={isSinglePageDesktop}
          className={`${isSinglePageDesktop ? 'hidden': null} bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-300 border border-gray-700 mr-7`}
          aria-label="前のスキルセットへ"
        >
          <ChevronLeft size={20} />
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(0); // カテゴリ変更時にページリセット
            }}
            className={`px-4 py-2 rounded-full text-sm transition-colors duration-300 ${
              selectedCategory === category 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
        <button 
          onClick={() => setAlwaysShowDetail(prev => !prev)}
          className={`${ShipporiMinchoFont.className} text-white text-sm rounded-full px-4 py-2 transition-colors duration-300 
            ${alwaysShowDetail 
              ? 'bg-yellow-600 text-white' 
              : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
            }`}
        >
          詳細を表示
        </button>
        <button
          onClick={nextPage}
          disabled={isSinglePageDesktop}
          className={`${isSinglePageDesktop ? 'hidden': null}  bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-300 border border-gray-700 ml-7`}
          aria-label="次のスキルセットへ"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="w-full relative">
        {/* モバイル表示: 縦に4つのスキルカード */}
        <div className="md:hidden px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mobile-page-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-6"
            >
              {currentMobileSkills.map((skill, index) => (
                <VerticalSkillCard key={skill.name} skill={skill} alwaysShowDetail={alwaysShowDetail} />
              ))}
            </motion.div>
          </AnimatePresence>
          
          {/* モバイル用ページネーション */}
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={prevPage}
              className="bg-gray-700/50 text-white p-2 rounded-full transition-colors duration-300 hover:bg-gray-600"
              aria-label="Previous skills"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex justify-center space-x-2">
              {Array.from({ length: totalPagesMobile }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentPage ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                  aria-label={`Go to skills page ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextPage}
              className="bg-gray-700/50 text-white p-2 rounded-full transition-colors duration-300 hover:bg-gray-600"
              aria-label="Next skills"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* デスクトップ表示: 2行×5列のグリッドレイアウト */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={`desktop-page-${currentPage}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-5 gap-6 grid-rows-2"
            >
              {currentDesktopSkills.map((skill, index) => (
                <VerticalSkillCard key={skill.name} skill={skill} alwaysShowDetail={alwaysShowDetail} />
              ))}
              
              {/* 不足している場合のダミー要素 */}
              {currentDesktopSkills.length < skillsPerPageDesktop && 
                Array.from({ length: skillsPerPageDesktop - currentDesktopSkills.length }).map((_, i) => (
                  <div 
                    key={`dummy-${i}`} 
                    className="bg-transparent h-full"
                  />
                ))
              }
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionDiv>
  );
};

export default SkillSection;