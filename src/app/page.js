'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.css';
import { rooms, lodgeAmenities, testimonials } from '@/data/rooms';
import RoomCard from '@/components/RoomCard';

const lodgeWords = [
  { text: 'Alohie Lodge', lang: 'English' },
  {
    text: "আলোহি ল'জ", lang: 'Assamese'
  },
  { text: 'আলোহি লজ', lang: 'Bengali' },
  { text: 'अलोहि लॉज', lang: 'Hindi' },
];

const heroSlides = [
  {
    src: '/assets/carousel/hero-image.jpg',
    alt: 'Alohie Lodge exterior view',
    caption: 'Signature exterior',
    position: 'center center',
  },
  {
    src: '/assets/facilities/dining%20(2).jpg',
    alt: 'Dining area for guests',
    caption: 'Dining space',
    position: 'center center',
  },
  {
    src: '/assets/facilities/exterior%20(2).jpg',
    alt: 'Alohie Lodge exterior area',
    caption: 'Exterior view',
    position: 'center 35%',
  },
  {
    src: '/assets/facilities/exterior%20(3).jpg',
    alt: 'Alohie Lodge reception area',
    caption: 'Reception view',
    position: 'center 35%',
  },
  {
    src: '/assets/facilities/exterior%20(5).jpg',
    alt: 'Alohie Lodge reception desk',
    caption: 'Reception desk',
    position: 'center 30%',
  },
  {
    src: '/assets/facilities/exterior%20(6).jpg',
    alt: 'Alohie Lodge common area',
    caption: 'Common area',
    position: 'center 40%',
  },
  {
    src: '/assets/rooms/deluxe-109%20(2).jpg',
    alt: 'Deluxe room with sofa and bed',
    caption: 'Premium deluxe room',
    position: 'center center',
  },
  {
    src: '/assets/rooms/triple-108.jpg',
    alt: 'Triple bed room',
    caption: 'Triple room',
    position: 'center center',
  },
];

function getSuggestedRoomId(guestCount) {
  const count = Number(guestCount) || 1;
  const eligibleRooms = rooms
    .filter((room) => room.maxGuests >= count)
    .sort((a, b) => a.maxGuests - b.maxGuests);

  return eligibleRooms[0]?.id || rooms[rooms.length - 1]?.id || rooms[0].id;
}

function LodgeTypewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const activeWord = lodgeWords[wordIndex].text;
    const typingDelay = 120;
    const deletingDelay = 65;
    const pauseDelay = 1100;

    let timer = deleting ? deletingDelay : typingDelay;

    if (!deleting && text === activeWord) {
      timer = pauseDelay;
    }

    if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((current) => (current + 1) % lodgeWords.length);
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      if (!deleting && text === activeWord) {
        setDeleting(true);
        return;
      }

      if (deleting) {
        setText(activeWord.slice(0, Math.max(0, text.length - 1)));
        return;
      }

      setText(activeWord.slice(0, text.length + 1));
    }, timer);

    return () => window.clearTimeout(timeout);
  }, [deleting, text, wordIndex]);

  return (
    <span className={styles.typewriterWrap} aria-live="polite" aria-atomic="true">
      <span className={styles.typewriterWord}>{text}</span>
      <span className={styles.typewriterCursor} aria-hidden="true">
        |
      </span>
    </span>
  );
}

function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length < 2) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  const goToPrevious = () => {
    setActiveSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  };

  return (
    <div className={styles.heroCarousel} aria-roledescription="carousel" aria-label="Hero image carousel">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.src}
          className={`${styles.heroSlide} ${index === activeSlide ? styles.heroSlideActive : ''}`}
          aria-hidden={index !== activeSlide}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            style={{ objectFit: 'cover', objectPosition: slide.position }}
            sizes="100vw"
            priority={index === 0}
          />
          <div className={styles.heroSlideCaption}>{slide.caption}</div>
        </div>
      ))}

      <div className={styles.heroCarouselControls}>
        <button
          type="button"
          className={styles.heroCarouselButton}
          onClick={goToPrevious}
          aria-label="Previous hero image"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className={styles.heroCarouselDots} role="tablist" aria-label="Select hero slide">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              className={`${styles.heroCarouselDot} ${index === activeSlide ? styles.heroCarouselDotActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={index === activeSlide}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.heroCarouselButton}
          onClick={goToNext}
          aria-label="Next hero image"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
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
          <HeroCarousel />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.stars} aria-label="5 star rating">
            ★★★★★
          </div>
          <h1 className={styles.heroTitle}>
            {<LodgeTypewriter />}<br />
            Your Comfortable Stay at Guwahati
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
            <h2>Stay close to the city at Alohie Lodge</h2>
            <p>
              Set in a tranquil yet accessible sector of Guwahati, the elegant Alohie Lodge offers stellar amenities and a peaceful location a short drive from major city attractions. Located conveniently, our lodge provides easy access to key tourism, shopping centers, and local sightseeing spots.
            </p>
            <p>
              The most accesible for the magnificent visit to <b>Kamakhya Devalaya</b> is a must from the lodge, offering other services such as family vehicles, guidance and assist for early wake-up for early morning Darshan.
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
