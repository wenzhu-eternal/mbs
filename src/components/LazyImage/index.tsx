import { useState, useEffect, useRef } from 'react';
import { Image, Spin } from 'antd';

interface LazyImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  placeholder?: React.ReactNode;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  placeholder,
}: LazyImageProps) {
  const [isInView, setIsInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} style={{ width, height }}>
      {isInView ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          placeholder={placeholder || <Spin />}
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? 'none' : 'block' }}
        />
      ) : (
        placeholder || <Spin />
      )}
    </div>
  );
}
