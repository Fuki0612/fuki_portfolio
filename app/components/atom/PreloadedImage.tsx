import React from 'react';
import Image, { ImageProps } from 'next/image';

export const PreloadedImage: React.FC<ImageProps> = (props) => {
  return <Image {...props} priority/>;
};