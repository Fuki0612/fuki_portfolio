import { useState, useEffect } from 'react';

const preloadImage = (src: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Store the loaded image in the browser's cache
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      tempCanvas.getContext('2d')?.drawImage(img, 0, 0);
      resolve();
    };
    img.onerror = reject;
    img.src = src;
  });

export const useImagePreloader = (imageSources: string[]) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const preloadImages = async () => {
      try {
        const imagePromises = imageSources.map(preloadImage);
        await Promise.all(imagePromises);
        if (isMounted) {
          setImagesPreloaded(true);
        }
      } catch (error) {
        console.error('Failed to preload images:', error);
      }
    };

    preloadImages();

    return () => {
      isMounted = false;
    };
  }, [imageSources]);

  return imagesPreloaded;
};

