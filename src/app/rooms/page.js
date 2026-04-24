import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { rooms } from '@/data/rooms';

export const metadata = {
  title: 'Rooms & Suites | Alohie Lodge',
  description: 'Explore our comfortable and affordable rooms. From solo travelers to families, we have the right accommodation for your stay in Bangalore.',
};

export default function RoomsPage() {
  return (
    <main>
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Rooms & Suites</h1>
          <p className={styles.subtitle}>
            Discover our well-appointed accommodations designed for your comfort and convenience.
          </p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className={styles.roomsList}>
            {rooms.map((room) => (
              <div key={room.id} id={room.id} className={styles.roomCardDetailed}>

                <div className={styles.roomImage}>
                  {room.images?.[0] ? (
                    <Image
                      src={room.images[0]}
                      alt={room.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '48px', height: '48px', opacity: 0.5 }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      <span>Image Coming Soon</span>
                    </div>
                  )}
                </div>

                <div className={styles.roomInfo}>
                  <h2 className={styles.roomTitle}>{room.name}</h2>
                  <p style={{ marginTop: '-4px', marginBottom: '16px', color: 'var(--gray-600)' }}>
                    {room.count} room{room.count !== 1 ? 's' : ''} available
                  </p>
                  <p className={styles.roomDesc}>{room.description}</p>

                  <div className={styles.specsList}>
                    <div className={styles.specItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                      Up to {room.maxGuests} Guests
                    </div>
                    <div className={styles.specItem}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>
                      {room.bedType}
                    </div>
                  </div>

                  <div className={styles.amenities}>
                    <h4>Key Amenities</h4>
                    <div className={styles.amenitiesGrid}>
                      {room.amenities.map((amenity, idx) => (
                        <div key={idx} className={styles.amenityItem}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          {amenity}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.footer}>
                    <div className={styles.priceBlock}>
                      <span className={styles.priceLabel}>From</span>
                      <div className={styles.price}>
                        {room.price == null ? 'Price coming soon' : `INR ${room.price.toLocaleString('en-IN')}.00 /night`}
                      </div>
                    </div>
                    <Link href={`/booking?room=${room.id}`} className="btn btn-primary">
                      Book Now
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
