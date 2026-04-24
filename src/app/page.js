'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import styles from './page.module.css';
import { rooms, lodgeAmenities, testimonials, lodgeInfo } from '@/data/rooms';
import RoomCard from '@/components/RoomCard';

function getSuggestedRoomId(guestCount) {
  const count = Number(guestCount) || 1;
  const eligibleRooms = rooms
    .filter((room) => room.maxGuests >= count)
    .sort((a, b) => a.maxGuests - b.maxGuests);

  return eligibleRooms[0]?.id || rooms[rooms.length - 1]?.id || rooms[0].id;
}

export default function Home() {
  const router = useRouter();
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [booking, setBooking] = useState({
    checkIn: '',
    checkOut: '',
    roomType: getSuggestedRoomId('2'),
    guests: '2',
  });

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBooking((current) => {
      const nextState = { ...current, [name]: value };

      if (name === 'guests') {
        nextState.roomType = getSuggestedRoomId(value);
      }

      return nextState;
    });
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();

    if (booking.checkIn) params.set('checkIn', booking.checkIn);
    if (booking.checkOut) params.set('checkOut', booking.checkOut);
    if (booking.roomType) params.set('room', booking.roomType);
    if (booking.guests) params.set('guests', booking.guests);

    router.push(`/booking${params.toString() ? `?${params.toString()}` : ''}`);
  };

  return (
    <main>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/assets/hero-image.jpg"
            alt={`${lodgeInfo.name} hero`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="100vw"
            priority
          />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.stars} aria-label="5 star rating">
            ★★★★★
          </div>
          <h1 className={styles.heroTitle}>
            {lodgeInfo.name},<br />
            Your Comfortable Stay in Guwahati
          </h1>
          <p style={{ maxWidth: '640px', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', marginBottom: '24px' }}>
            Affordable rooms, easy booking, and a peaceful stay close to the city.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/booking" className="btn btn-primary">
              Book Now
            </Link>
            <Link href="/rooms" className="btn btn-outline" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.4)' }}>
              View Rooms
            </Link>
          </div>
        </div>
      </section>

      {/* BOOKING BAR */}
      <div className={styles.bookingBarWrapper}>
        <div className="container">
          <form className={styles.bookingBar} onSubmit={handleBookingSubmit}>
            <div className={styles.bookingField}>
              <span className={styles.bookingLabel}>Check-in</span>
              <input
                type="date"
                name="checkIn"
                className={styles.bookingInput}
                min={today}
                value={booking.checkIn}
                onChange={handleBookingChange}
                aria-label="Check-in date"
                required
              />
            </div>
            <div className={styles.bookingField}>
              <span className={styles.bookingLabel}>Check-out</span>
              <input
                type="date"
                name="checkOut"
                className={styles.bookingInput}
                min={booking.checkIn || today}
                value={booking.checkOut}
                onChange={handleBookingChange}
                aria-label="Check-out date"
                required
              />
            </div>
            <div className={styles.bookingField}>
              <span className={styles.bookingLabel}>Rooms & Guests</span>
              <div className={styles.bookingSelectRow}>
                <select
                  name="roomType"
                  className={styles.bookingSelect}
                  value={booking.roomType}
                  onChange={handleBookingChange}
                  aria-label="Room type"
                  required
                >
                  {rooms.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name}
                    </option>
                  ))}
                </select>
                <select
                  name="guests"
                  className={styles.bookingSelect}
                  value={booking.guests}
                  onChange={handleBookingChange}
                  aria-label="Guests"
                  required
                >
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                </select>
              </div>
            </div>
            <div className={styles.bookingBtn}>
              <button type="submit" className="btn btn-primary btn-block">
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* OVERVIEW SECTION */}
      <section className={`section ${styles.overviewSection}`}>
        <div className={`container ${styles.overviewGrid}`}>
          <div className={styles.overviewContent}>
            <h2>Stay close to the city center at our lodge in Bangalore</h2>
            <p>
              Set in a tranquil yet accessible sector of Bangalore, the elegant Alohie Lodge offers stellar amenities and a peaceful location a short drive from major city attractions. Located conveniently, our lodge provides easy access to key business hubs, shopping centers, and local sightseeing spots.
            </p>
            <p>
              Whether you're visiting for business or leisure, enjoy our clean, well-appointed rooms designed for your comfort. Experience warm hospitality, seamless connectivity with high-speed Wi-Fi, and 24/7 service ensuring a memorable stay.
            </p>
            <div style={{ marginTop: '32px' }}>
              <Link href="/gallery" className="btn btn-outline">
                See the Gallery
              </Link>
            </div>
          </div>

          <div className={styles.servicesSidebar}>
            <h3>Featured Services</h3>
            <div className={styles.servicesList}>
              {lodgeAmenities.map((item, idx) => (
                <div key={idx} className={styles.serviceItem}>
                  <svg className={styles.serviceIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  {item.name}
                </div>
              ))}
              <div className={styles.serviceItem}>
                <svg className={styles.serviceIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Early check-in (subject to availability)
              </div>
              <div className={styles.serviceItem}>
                <svg className={styles.serviceIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Express check-out
              </div>
            </div>
            <div style={{ marginTop: '24px' }}>
              <Link href="/contact" className="btn btn-outline btn-block">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROOM TYPES */}
      <section className={`section ${styles.roomsSection}`}>
        <div className="container">
          <div className={styles.roomsHeader}>
            <div>
              <h2 style={{ fontSize: '2.25rem', color: 'var(--gray-900)' }}>Room types</h2>
              <p style={{ color: 'var(--gray-600)', marginTop: '8px' }}>Designed for comfort and convenience</p>
            </div>
            <Link href="/rooms" className="btn btn-outline">
              See All Rooms
            </Link>
          </div>

          <div className={styles.roomsGrid}>
            {rooms.slice(0, 3).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className={`section ${styles.testimonialsSection}`}>
        <div className="container">
          <div className="section-header" style={{ margin: '0 auto', textAlign: 'center' }}>
            <span className="section-divider" style={{ margin: '0 auto 20px', background: 'var(--brand-gold)' }}></span>
            <h2>What Our Guests Say</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', margin: '0 auto' }}>Real experiences from real guests.</p>
          </div>

          <div className={styles.testimonialGrid}>
            {testimonials.map((review, idx) => (
              <div key={idx} className={styles.testimonialCard}>
                <div className={styles.stars} style={{ fontSize: '1rem' }}>★★★★★</div>
                <p className={styles.testimonialText}>"{review.text}"</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorAvatar}>
                    {review.name.charAt(0)}
                  </div>
                  <div className={styles.authorInfo}>
                    <h4>{review.name}</h4>
                    <span>{review.date}</span>
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
