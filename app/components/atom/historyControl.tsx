import React from 'react';
import { ShipporiMinchoFont } from '../../font';

interface TimelineControlsProps {
  alwaysShowDetail: boolean;
  setAlwaysShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimelineControls: React.FC<TimelineControlsProps> = ({
  alwaysShowDetail,
  setAlwaysShowDetail
}) => {
  return (
    <div className="hidden md:flex gap-10 mb-4">
      <h3 className={`${ShipporiMinchoFont.className} text-white text-md font-bold my-0 text-center`}>
        私のこれまでを振り返りましょう<br />
        スクロールでタイムラインが移動します
      </h3>
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
    </div>
  );
};

export default TimelineControls;