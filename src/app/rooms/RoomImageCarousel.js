'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function RoomImageCarousel({ images, alt }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length < 2) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3500);

    return () => window.clearInterval(interval);
  }, [images]);

  if (!images?.length) {
    return null;
  }

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <div className={styles.roomImageCarousel} aria-label={`${alt} image carousel`}>
      {images.map((image, index) => (
        <div
          key={image}
          className={`${styles.roomImageSlide} ${index === activeIndex ? styles.roomImageSlideActive : ''}`}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
