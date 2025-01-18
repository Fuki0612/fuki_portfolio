import React from 'react';
import { motion } from 'framer-motion';

const StarBackground: React.FC = () => {
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 + '%',
    y: Math.random() * 100 + '%',
    size: Math.random() * 2 + 1 + 'px',
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-yellow-500 rounded-full"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;