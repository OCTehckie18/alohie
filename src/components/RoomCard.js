import Link from 'next/link';
import Image from 'next/image';
import styles from './RoomCard.module.css';

export default function RoomCard({ room }) {
  // Use first 3 amenities for the card
  const topAmenities = room.amenities.slice(0, 3);
  const priceLabel = room.price == null ? 'Price coming soon' : `INR ${room.price.toLocaleString('en-IN')}.00 /night`;
  const roomImage = room.images?.[0];

  return (
      <div className={styles.card}>
        <div className={styles.imageArea}>
          {roomImage ? (
            <Image
              src={roomImage}
              alt={room.name}
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
              <span style={{ fontSize: '0.8rem' }}>Image Coming Soon</span>
            </div>
          )}
        </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{room.name}</h3>
        <p style={{ marginTop: '-4px', marginBottom: '12px', color: 'var(--gray-600)', fontSize: '0.9rem' }}>
          {room.count} room{room.count !== 1 ? 's' : ''} available
        </p>
        
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Up to {room.maxGuests} Guests
          </div>
          <div className={styles.metaItem}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>
            {room.bedType}
          </div>
        </div>

        <div className={styles.priceBlock}>
          <span className={styles.priceLabel}>From</span>
          <div className={styles.price}>{priceLabel}</div>
        </div>

        <div className={styles.actions}>
          <Link href={`/rooms#${room.id}`} className={styles.readMore}>
            Read More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
          <Link href={`/booking?room=${room.id}`} className="btn btn-primary btn-sm">
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
