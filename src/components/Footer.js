import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { lodgeInfo } from '@/data/rooms';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Col */}
          <div className={styles.col}>
            <Link href="/" className={styles.logo}>
              <Image src="/color-logo.png" alt="Alohie Lodge" width={140} height={56} />
            </Link>
            <p className={styles.desc}>
              Alohie Lodge offers stellar amenities and a peaceful location in Bangalore. Experience clean rooms, warm hospitality, and unbeatable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h3>Explore</h3>
            <div className={styles.links}>
              <Link href="/" className={styles.link}>Overview</Link>
              <Link href="/rooms" className={styles.link}>Rooms & Suites</Link>
              <Link href="/gallery" className={styles.link}>Photo Gallery</Link>
              <Link href="/contact" className={styles.link}>Location</Link>
            </div>
          </div>

          {/* Legal / Info */}
          <div className={styles.col}>
            <h3>Information</h3>
            <div className={styles.links}>
              <Link href="/contact" className={styles.link}>Contact Us</Link>
              <Link href="/booking" className={styles.link}>Book a Room</Link>
              <span className={styles.link} style={{ cursor: 'default' }}>Check-in: {lodgeInfo.checkInTime}</span>
              <span className={styles.link} style={{ cursor: 'default' }}>Check-out: {lodgeInfo.checkOutTime}</span>
            </div>
          </div>

          {/* Contact Col */}
          <div className={styles.col}>
            <h3>Contact Us</h3>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>{lodgeInfo.address}</span>
            </div>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <a href={`tel:${lodgeInfo.phone}`} className={styles.link}>{lodgeInfo.phone}</a>
            </div>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <a href={`mailto:${lodgeInfo.email}`} className={styles.link}>{lodgeInfo.email}</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <div className={styles.copyright}>
            © {currentYear} Alohie Lodge. All rights reserved.
          </div>
          <div className={styles.legalLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
