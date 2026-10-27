'use client';

import Image from 'next/image';
import { getImageKitUrl } from '@/lib/imagekit';

interface ImageKitImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  fill?: boolean;
  priority?: boolean;
}

export default function ImageKitImage({ src, alt, width, height, className, style, fill, priority }: ImageKitImageProps) {
  const imageSrc = src?.includes('ik.imagekit.io') ? src : getImageKitUrl(src);
  
  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        style={style}
        priority={priority}
        unoptimized={imageSrc.includes('ik.imagekit.io')}
      />
    );
  }
  
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      style={style}
      priority={priority}
      unoptimized={imageSrc.includes('ik.imagekit.io')}
    />
  );
}
