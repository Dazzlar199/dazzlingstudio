'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function LazyImage({
  src,
  alt,
  className = '',
  width,
  height,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <div ref={imgRef} className="w-full h-full">
        {!isInView && (
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        )}

        {isInView && (
          <motion.div
            className="w-full h-full relative"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              scale: isLoaded ? 1 : 1.1
            }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setIsLoaded(true)}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}