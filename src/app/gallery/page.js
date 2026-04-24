'use client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

// Placeholder data - replace with real image paths later
const galleryItems = [
  { id: 1, category: 'rooms', title: 'Couple Bed Room', image: '/assets/rooms/couple-104.jpg' },
  { id: 2, category: 'bathroom', title: 'Bathroom', image: '/assets/bathrooms/bathroom-104.jpg' },
  { id: 3, category: 'exterior', title: 'Dining Area', image: '/assets/facilities/dining.jpg' },
  { id: 4, category: 'exterior', title: 'Carrom Area', image: '/assets/facilities/carrom.jpg' },
];

const categories = [
  { id: 'all', label: 'All Photos' },
  { id: 'rooms', label: 'Rooms & Suites' },
  { id: 'bathroom', label: 'Bathrooms' },
  { id: 'exterior', label: 'Facilities & Exterior' },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <main>
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Photo Gallery</h1>
          <p className={styles.subtitle}>
            Take a visual tour of our rooms, facilities, and surroundings.
          </p>
        </div>
      </section>

      <section className={`section ${styles.gallerySection}`}>
        <div className="container">

          <div className={styles.filters}>
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`${styles.filterBtn} ${activeFilter === cat.id ? styles.active : ''}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className={styles.grid}>
            {filteredItems.map(item => (
              <div
                key={item.id}
                className={styles.galleryItem}
                onClick={() => setSelectedImage(item)}
              >
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span>Image Coming Soon</span>
                  </div>
                )}
                <div className={styles.itemLabel}>{item.title}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            {selectedImage.image ? (
              <div className={styles.imagePlaceholder} style={{ color: 'var(--gray-600)' }}>
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ) : (
              <div className={styles.imagePlaceholder} style={{ color: 'var(--gray-600)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '64px', height: '64px', opacity: 0.3 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <span>{selectedImage.title}</span>
              </div>
            )}
            <div className={styles.modalLabel}>{selectedImage.title}</div>
          </div>
        </div>
      )}
    </main>
  );
}
